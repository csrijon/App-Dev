import crypto from "node:crypto";
import { getPrisma } from "@/lib/prisma";
import { getPortfolioProductionLink, ensurePortfolioProductionLinkSchema } from "@/lib/portfolio-production-link";

export type CreatorPortfolioReviewDecision = "APPROVED" | "CHANGES_REQUESTED";

export type CreatorPortfolioReview = {
  id: string;
  applicationId: string;
  portfolioId: string;
  decision: CreatorPortfolioReviewDecision;
  note: string | null;
  portfolioRevision: Date;
  createdAt: Date;
};

let reviewSchemaPromise: Promise<void> | null = null;

export async function ensureCreatorPortfolioReviewSchema() {
  if (reviewSchemaPromise) return reviewSchemaPromise;
  reviewSchemaPromise = (async () => {
    await ensurePortfolioProductionLinkSchema();
    const prisma = getPrisma();
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "CreatorPortfolioReview" (
        "id" TEXT PRIMARY KEY,
        "applicationId" TEXT NOT NULL REFERENCES "CreatorApplication"("id") ON DELETE CASCADE,
        "portfolioId" TEXT NOT NULL REFERENCES "Portfolio"("id") ON DELETE CASCADE,
        "decision" TEXT NOT NULL,
        "note" TEXT,
        "portfolioRevision" TIMESTAMPTZ NOT NULL,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "CreatorPortfolioReview_application_created_idx" ON "CreatorPortfolioReview"("applicationId","createdAt" DESC)`);
  })().catch((error) => {
    reviewSchemaPromise = null;
    throw error;
  });
  return reviewSchemaPromise;
}

export async function getLatestCreatorPortfolioReview(applicationId: string) {
  await ensureCreatorPortfolioReviewSchema();
  const rows = await getPrisma().$queryRaw<CreatorPortfolioReview[]>`
    SELECT "id","applicationId","portfolioId","decision","note","portfolioRevision","createdAt"
    FROM "CreatorPortfolioReview"
    WHERE "applicationId"=${applicationId}
    ORDER BY "createdAt" DESC
    LIMIT 1
  `;
  return rows[0] || null;
}

export async function recordCreatorPortfolioReview(input: { applicationId: string; decision: CreatorPortfolioReviewDecision; note?: string }) {
  if (input.decision !== "APPROVED" && input.decision !== "CHANGES_REQUESTED") throw new Error("INVALID_REVIEW_DECISION");
  await ensureCreatorPortfolioReviewSchema();
  const link = await getPortfolioProductionLink(input.applicationId);
  if (!link) throw new Error("PORTFOLIO_LINK_REQUIRED");
  const prisma = getPrisma();
  const portfolios = await prisma.$queryRaw<Array<{ id: string; updatedAt: Date }>>`
    SELECT "id","updatedAt" FROM "Portfolio" WHERE "id"=${link.portfolioId} LIMIT 1
  `;
  const portfolio = portfolios[0];
  if (!portfolio) throw new Error("PORTFOLIO_NOT_FOUND");

  const id = `cpr_${crypto.randomUUID().replace(/-/g, "")}`;
  const note = input.note?.trim().slice(0, 4000) || null;
  await prisma.$executeRaw`
    INSERT INTO "CreatorPortfolioReview" ("id","applicationId","portfolioId","decision","note","portfolioRevision")
    VALUES (${id},${input.applicationId},${portfolio.id},${input.decision},${note},${portfolio.updatedAt})
  `;
  await prisma.auditLog.create({
    data: {
      actor: "admin",
      action: input.decision === "APPROVED" ? "CREATOR_PORTFOLIO_APPROVAL_RECORDED" : "CREATOR_PORTFOLIO_CHANGES_REQUESTED",
      resource: "CreatorApplication",
      resourceId: input.applicationId,
      details: { slug: link.slug, portfolioRevision: portfolio.updatedAt.toISOString(), note },
    },
  });
  return getLatestCreatorPortfolioReview(input.applicationId);
}

export async function creatorApprovalIsCurrent(applicationId: string) {
  await ensureCreatorPortfolioReviewSchema();
  const [link, review] = await Promise.all([
    getPortfolioProductionLink(applicationId),
    getLatestCreatorPortfolioReview(applicationId),
  ]);
  if (!link || !review || review.decision !== "APPROVED" || review.portfolioId !== link.portfolioId) return false;
  const portfolios = await getPrisma().$queryRaw<Array<{ updatedAt: Date }>>`
    SELECT "updatedAt" FROM "Portfolio" WHERE "id"=${link.portfolioId} LIMIT 1
  `;
  const portfolio = portfolios[0];
  if (!portfolio) return false;
  return review.portfolioRevision.getTime() >= portfolio.updatedAt.getTime();
}
