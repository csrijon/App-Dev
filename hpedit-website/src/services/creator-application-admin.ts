import crypto from "node:crypto";
import { getPrisma } from "@/lib/prisma";
import { ensureCreatorApplicationSchema, type CreatorApplicationInput } from "@/lib/creator-applications";

export type AdminApplicationAsset = {
  id: string;
  applicationId: string;
  kind: string;
  fileName: string;
  contentType: string;
  size: number;
  createdAt: Date;
};

export type AdminApplicationDetail = {
  id: string;
  status: string;
  email: string;
  fullName: string;
  creatorName: string | null;
  city: string | null;
  primaryCategory: string | null;
  completion: number;
  data: CreatorApplicationInput;
  submittedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  emailVerifiedAt: Date | null;
};

export type ApplicationReviewNote = {
  id: string;
  applicationId: string;
  noteType: string;
  body: string;
  actor: string;
  createdAt: Date;
};

async function ensureAdminReviewSchema() {
  await ensureCreatorApplicationSchema();
  const prisma = getPrisma();
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "CreatorApplicationReviewNote" ("id" TEXT PRIMARY KEY,"applicationId" TEXT NOT NULL REFERENCES "CreatorApplication"("id") ON DELETE CASCADE,"noteType" TEXT NOT NULL DEFAULT 'INTERNAL_NOTE',"body" TEXT NOT NULL,"actor" TEXT NOT NULL DEFAULT 'admin',"createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP)`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "CreatorApplicationReviewNote_applicationId_createdAt_idx" ON "CreatorApplicationReviewNote"("applicationId","createdAt" DESC)`);
}

export async function listApplicationAssetsForAdmin() {
  await ensureCreatorApplicationSchema();
  return getPrisma().$queryRaw<AdminApplicationAsset[]>`
    SELECT "id","applicationId","kind","fileName","contentType","size","createdAt"
    FROM "CreatorApplicationAsset"
    ORDER BY "createdAt" DESC
    LIMIT 1000
  `;
}

export async function getApplicationAssetForAdmin(id: string) {
  await ensureCreatorApplicationSchema();
  const rows = await getPrisma().$queryRaw<Array<AdminApplicationAsset & { data: Buffer }>>`
    SELECT "id","applicationId","kind","fileName","contentType","size","createdAt","data"
    FROM "CreatorApplicationAsset"
    WHERE "id"=${id}
    LIMIT 1
  `;
  return rows[0] || null;
}

export async function getApplicationForAdmin(id: string) {
  await ensureCreatorApplicationSchema();
  const rows = await getPrisma().$queryRaw<AdminApplicationDetail[]>`
    SELECT "id","status","email","fullName","creatorName","city","primaryCategory","completion","data","submittedAt","createdAt","updatedAt","emailVerifiedAt"
    FROM "CreatorApplication"
    WHERE "id"=${id}
    LIMIT 1
  `;
  return rows[0] || null;
}

export async function listApplicationAssetsForOne(applicationId: string) {
  await ensureCreatorApplicationSchema();
  return getPrisma().$queryRaw<AdminApplicationAsset[]>`
    SELECT "id","applicationId","kind","fileName","contentType","size","createdAt"
    FROM "CreatorApplicationAsset"
    WHERE "applicationId"=${applicationId}
    ORDER BY "createdAt" DESC
  `;
}

export async function listApplicationReviewNotes(applicationId: string) {
  await ensureAdminReviewSchema();
  return getPrisma().$queryRaw<ApplicationReviewNote[]>`
    SELECT "id","applicationId","noteType","body","actor","createdAt"
    FROM "CreatorApplicationReviewNote"
    WHERE "applicationId"=${applicationId}
    ORDER BY "createdAt" DESC
    LIMIT 200
  `;
}

export async function addApplicationReviewNote(input: { applicationId: string; noteType: string; body: string; actor?: string }) {
  await ensureAdminReviewSchema();
  const allowedTypes = new Set(["INTERNAL_NOTE","REQUEST_INFO","DECISION","FOLLOW_UP"]);
  const noteType = allowedTypes.has(input.noteType) ? input.noteType : "INTERNAL_NOTE";
  const body = input.body.trim().slice(0,5000);
  if (!body) throw new Error("EMPTY_NOTE");
  const exists = await getPrisma().$queryRaw<Array<{ id: string }>>`SELECT "id" FROM "CreatorApplication" WHERE "id"=${input.applicationId} LIMIT 1`;
  if (!exists.length) throw new Error("APPLICATION_NOT_FOUND");
  const id = `arn_${crypto.randomUUID().replace(/-/g,"")}`;
  await getPrisma().$executeRaw`INSERT INTO "CreatorApplicationReviewNote" ("id","applicationId","noteType","body","actor") VALUES (${id},${input.applicationId},${noteType},${body},${input.actor || "admin"})`;
  if (noteType === "REQUEST_INFO") {
    await getPrisma().$executeRaw`UPDATE "CreatorApplication" SET "status"='INFO_REQUIRED',"updatedAt"=${new Date()} WHERE "id"=${input.applicationId} AND "status" NOT IN ('PUBLISHED','ARCHIVED','REJECTED')`;
  } else {
    await getPrisma().$executeRaw`UPDATE "CreatorApplication" SET "updatedAt"=${new Date()} WHERE "id"=${input.applicationId}`;
  }
  return { id };
}

type ApplicationForConversion = {
  id: string;
  status: string;
  email: string;
  fullName: string;
  creatorName: string | null;
  city: string | null;
  primaryCategory: string | null;
  data: Record<string, unknown>;
};

function text(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function convertApplicationToCreator(applicationId: string) {
  await ensureCreatorApplicationSchema();
  const prisma = getPrisma();
  const rows = await prisma.$queryRaw<ApplicationForConversion[]>`
    SELECT "id","status","email","fullName","creatorName","city","primaryCategory","data"
    FROM "CreatorApplication"
    WHERE "id"=${applicationId}
    LIMIT 1
  `;
  const application = rows[0];
  if (!application) throw new Error("APPLICATION_NOT_FOUND");
  if (!["APPROVED", "BUILDING", "CREATOR_REVIEW", "PUBLISHED"].includes(application.status)) throw new Error("APPLICATION_NOT_APPROVED");

  const data = application.data || {};
  const instagram = text(data.instagram);
  const youtube = text(data.youtube);
  const facebook = text(data.facebook);
  const linkedin = text(data.linkedin);
  const profileUrl = instagram || youtube || facebook || linkedin;
  const platform = instagram ? "Instagram" : youtube ? "YouTube" : facebook ? "Facebook" : linkedin ? "LinkedIn" : null;
  const followersRaw = Number(data.followers || 0);
  const followers = Number.isFinite(followersRaw) && followersRaw >= 0 ? Math.round(followersRaw) : 0;
  const approvedPhone = data.publicWhatsapp === true ? text(data.whatsapp) || text(data.phone) : null;
  const approvedEmail = data.publicEmail === true ? application.email : null;
  const country = text(data.country) || "India";
  const handle = application.creatorName || text(data.creatorName);

  const creator = await prisma.creator.upsert({
    where: { externalId: application.id },
    update: { name: application.fullName, handle, niche: application.primaryCategory, city: application.city, country, platform, profileUrl, publicEmail: approvedEmail, publicPhone: approvedPhone, followers, sourceUrl: `/app/applications/${application.id}`, notes: `Created from HPEDIT creator application ${application.id}.`, lastVerifiedAt: new Date() },
    create: { externalId: application.id, name: application.fullName, handle, niche: application.primaryCategory, city: application.city, country, platform, profileUrl, publicEmail: approvedEmail, publicPhone: approvedPhone, followers, status: "NEW", sourceUrl: `/app/applications/${application.id}`, notes: `Created from HPEDIT creator application ${application.id}.`, lastVerifiedAt: new Date() },
  });

  await prisma.$executeRaw`UPDATE "CreatorApplication" SET "status"=CASE WHEN "status"='APPROVED' THEN 'BUILDING' ELSE "status" END,"updatedAt"=${new Date()} WHERE "id"=${application.id}`;
  return creator;
}