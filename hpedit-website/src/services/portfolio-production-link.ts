import { getPrisma } from "@/lib/prisma";
import { ensureCreatorApplicationSchema } from "@/lib/creator-applications";
import { ensurePortfolioSchema, normalizePortfolioSlug, validatePortfolioSlug } from "@/lib/portfolio-cms";

export type PortfolioProductionLink = {
  applicationId: string;
  portfolioId: string;
  slug: string;
  title: string | null;
  access: "PUBLIC" | "PASSWORD" | "HIDDEN";
  updatedAt: Date;
};

export type PortfolioLinkCandidate = {
  id: string;
  slug: string;
  title: string | null;
  access: "PUBLIC" | "PASSWORD" | "HIDDEN";
  linkedApplicationId: string | null;
};

export type PortfolioProductionStage = {
  applicationId: string;
  status: string;
};

const LOCKED_RELATIONSHIP_STATUSES = new Set(["CREATOR_REVIEW", "PUBLISHED"]);

let linkSchemaPromise: Promise<void> | null = null;

export async function ensurePortfolioProductionLinkSchema() {
  if (linkSchemaPromise) return linkSchemaPromise;
  linkSchemaPromise = (async () => {
    await Promise.all([ensureCreatorApplicationSchema(), ensurePortfolioSchema()]);
    const prisma = getPrisma();
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "PortfolioProductionLink" (
        "applicationId" TEXT PRIMARY KEY REFERENCES "CreatorApplication"("id") ON DELETE CASCADE,
        "portfolioId" TEXT NOT NULL REFERENCES "Portfolio"("id") ON DELETE CASCADE,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "PortfolioProductionLink_portfolioId_key" ON "PortfolioProductionLink"("portfolioId")`);
  })().catch((error) => {
    linkSchemaPromise = null;
    throw error;
  });
  return linkSchemaPromise;
}

async function getApplicationStatus(applicationId: string) {
  const rows = await getPrisma().$queryRaw<Array<{ status: string }>>`
    SELECT "status"::text AS "status"
    FROM "CreatorApplication"
    WHERE "id"=${applicationId}
    LIMIT 1
  `;
  return rows[0]?.status || null;
}

export async function getPortfolioProductionStageByPortfolioId(portfolioId: string) {
  await ensurePortfolioProductionLinkSchema();
  const rows = await getPrisma().$queryRaw<PortfolioProductionStage[]>`
    SELECT l."applicationId",a."status"::text AS "status"
    FROM "PortfolioProductionLink" l
    JOIN "CreatorApplication" a ON a."id"=l."applicationId"
    WHERE l."portfolioId"=${portfolioId}
    LIMIT 1
  `;
  return rows[0] || null;
}

export async function getPortfolioProductionLink(applicationId: string) {
  await ensurePortfolioProductionLinkSchema();
  const rows = await getPrisma().$queryRaw<PortfolioProductionLink[]>`
    SELECT l."applicationId",l."portfolioId",p."slug",p."title",p."access",l."updatedAt"
    FROM "PortfolioProductionLink" l
    JOIN "Portfolio" p ON p."id"=l."portfolioId"
    WHERE l."applicationId"=${applicationId}
    LIMIT 1
  `;
  return rows[0] || null;
}

export async function listPortfolioProductionLinks() {
  await ensurePortfolioProductionLinkSchema();
  return getPrisma().$queryRaw<PortfolioProductionLink[]>`
    SELECT l."applicationId",l."portfolioId",p."slug",p."title",p."access",l."updatedAt"
    FROM "PortfolioProductionLink" l
    JOIN "Portfolio" p ON p."id"=l."portfolioId"
    ORDER BY l."updatedAt" DESC
  `;
}

export async function listPortfolioLinkCandidates() {
  await ensurePortfolioProductionLinkSchema();
  return getPrisma().$queryRaw<PortfolioLinkCandidate[]>`
    SELECT p."id",p."slug",p."title",p."access",l."applicationId" AS "linkedApplicationId"
    FROM "Portfolio" p
    LEFT JOIN "PortfolioProductionLink" l ON l."portfolioId"=p."id"
    ORDER BY COALESCE(p."title",p."slug") ASC
  `;
}

export async function setPortfolioProductionLink(applicationId: string, slugInput: string) {
  await ensurePortfolioProductionLinkSchema();
  const slugResult = validatePortfolioSlug(slugInput);
  if (!slugResult.ok) throw new Error("INVALID_PORTFOLIO_SLUG");
  const slug = normalizePortfolioSlug(slugResult.slug);
  const prisma = getPrisma();
  const previous = await getPortfolioProductionLink(applicationId);
  const status = await getApplicationStatus(applicationId);
  if (!status) throw new Error("APPLICATION_NOT_FOUND");
  if (LOCKED_RELATIONSHIP_STATUSES.has(status)) {
    if (previous?.slug === slug) return previous;
    throw new Error("PORTFOLIO_RELATIONSHIP_LOCKED_STAGE");
  }

  const portfolios = await prisma.$queryRaw<Array<{ id: string }>>`
    SELECT "id" FROM "Portfolio" WHERE "slug"=${slug} LIMIT 1
  `;
  const portfolio = portfolios[0];
  if (!portfolio) throw new Error("PORTFOLIO_NOT_FOUND");

  await prisma.$executeRaw`
    INSERT INTO "PortfolioProductionLink" ("applicationId","portfolioId","updatedAt")
    VALUES (${applicationId},${portfolio.id},${new Date()})
    ON CONFLICT ("applicationId") DO UPDATE SET "portfolioId"=EXCLUDED."portfolioId","updatedAt"=EXCLUDED."updatedAt"
  `;

  const linked = await getPortfolioProductionLink(applicationId);
  await prisma.auditLog.create({
    data: {
      actor: "admin",
      action: previous ? "CREATOR_PORTFOLIO_RELINKED" : "CREATOR_PORTFOLIO_LINKED",
      resource: "CreatorApplication",
      resourceId: applicationId,
      details: { previousSlug: previous?.slug || null, slug: linked?.slug || slug },
    },
  });
  return linked;
}

export async function clearPortfolioProductionLink(applicationId: string) {
  await ensurePortfolioProductionLinkSchema();
  const prisma = getPrisma();
  const status = await getApplicationStatus(applicationId);
  if (!status) throw new Error("APPLICATION_NOT_FOUND");
  if (LOCKED_RELATIONSHIP_STATUSES.has(status)) throw new Error("PORTFOLIO_RELATIONSHIP_LOCKED_STAGE");

  const previous = await getPortfolioProductionLink(applicationId);
  await prisma.$executeRaw`DELETE FROM "PortfolioProductionLink" WHERE "applicationId"=${applicationId}`;
  if (previous) {
    await prisma.auditLog.create({
      data: {
        actor: "admin",
        action: "CREATOR_PORTFOLIO_UNLINKED",
        resource: "CreatorApplication",
        resourceId: applicationId,
        details: { slug: previous.slug },
      },
    });
  }
}
