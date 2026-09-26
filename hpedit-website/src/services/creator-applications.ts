import crypto from "node:crypto";
import { getPrisma } from "@/lib/prisma";

export const APPLICATION_STATUSES = [
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "INFO_REQUIRED",
  "APPROVED",
  "BUILDING",
  "CREATOR_REVIEW",
  "PUBLISHED",
  "REJECTED",
  "ARCHIVED",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export type CreatorApplicationInput = {
  fullName: string;
  creatorName?: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  city?: string;
  state?: string;
  country?: string;
  languages?: string[];
  primaryCategory?: string;
  secondaryCategories?: string[];
  headline?: string;
  bio?: string;
  instagram?: string;
  youtube?: string;
  facebook?: string;
  linkedin?: string;
  otherSocials?: string;
  followers?: number | null;
  monthlyReach?: number | null;
  averageViews?: number | null;
  audienceNotes?: string;
  notableCollaborations?: string;
  achievements?: string;
  services?: string[];
  goals?: string[];
  hpeditNeeds?: string[];
  preferredStyle?: string;
  preferredColours?: string;
  showRates?: boolean;
  showAudienceMetrics?: boolean;
  publicWhatsapp?: boolean;
  publicEmail?: boolean;
  additionalNotes?: string;
  consentPortfolio: boolean;
  consentPrivacy: boolean;
  consentMarketing?: boolean;
};

function applicationId() {
  return `ca_${crypto.randomUUID().replace(/-/g, "")}`;
}

function consentId() {
  return `cc_${crypto.randomUUID().replace(/-/g, "")}`;
}

function assetId() {
  return `cas_${crypto.randomUUID().replace(/-/g, "")}`;
}

export function newResumeToken() {
  return crypto.randomBytes(32).toString("base64url");
}

function hashSecret(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export async function ensureCreatorApplicationSchema() {
  const prisma = getPrisma();
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "CreatorApplication" (
      "id" TEXT PRIMARY KEY,
      "status" TEXT NOT NULL DEFAULT 'DRAFT',
      "email" TEXT NOT NULL,
      "fullName" TEXT NOT NULL,
      "creatorName" TEXT,
      "city" TEXT,
      "primaryCategory" TEXT,
      "completion" INTEGER NOT NULL DEFAULT 0,
      "data" JSONB NOT NULL DEFAULT '{}'::jsonb,
      "submittedAt" TIMESTAMPTZ,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await prisma.$executeRawUnsafe(`ALTER TABLE "CreatorApplication" ADD COLUMN IF NOT EXISTS "draftTokenHash" TEXT`);
  await prisma.$executeRawUnsafe(`ALTER TABLE "CreatorApplication" ADD COLUMN IF NOT EXISTS "emailVerifiedAt" TIMESTAMPTZ`);
  await prisma.$executeRawUnsafe(`ALTER TABLE "CreatorApplication" ADD COLUMN IF NOT EXISTS "verificationTokenHash" TEXT`);
  await prisma.$executeRawUnsafe(`ALTER TABLE "CreatorApplication" ADD COLUMN IF NOT EXISTS "verificationExpiresAt" TIMESTAMPTZ`);
  await prisma.$executeRawUnsafe(`ALTER TABLE "CreatorApplication" ADD COLUMN IF NOT EXISTS "lastSavedAt" TIMESTAMPTZ`);
  await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "CreatorApplication_draftTokenHash_key" ON "CreatorApplication"("draftTokenHash") WHERE "draftTokenHash" IS NOT NULL`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "CreatorApplication_status_updatedAt_idx" ON "CreatorApplication"("status", "updatedAt" DESC)`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "CreatorApplication_email_idx" ON "CreatorApplication"("email")`);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "CreatorConsent" (
      "id" TEXT PRIMARY KEY,
      "applicationId" TEXT NOT NULL REFERENCES "CreatorApplication"("id") ON DELETE CASCADE,
      "consentType" TEXT NOT NULL,
      "granted" BOOLEAN NOT NULL,
      "version" TEXT NOT NULL DEFAULT '2026-09-13',
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "CreatorConsent_applicationId_idx" ON "CreatorConsent"("applicationId")`);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "CreatorApplicationAsset" (
      "id" TEXT PRIMARY KEY,
      "applicationId" TEXT NOT NULL REFERENCES "CreatorApplication"("id") ON DELETE CASCADE,
      "kind" TEXT NOT NULL DEFAULT 'OTHER',
      "fileName" TEXT NOT NULL,
      "contentType" TEXT NOT NULL,
      "size" INTEGER NOT NULL,
      "data" BYTEA NOT NULL,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "CreatorApplicationAsset_applicationId_idx" ON "CreatorApplicationAsset"("applicationId", "createdAt" DESC)`);
}

export function applicationCompletion(input: CreatorApplicationInput) {
  const checks = [
    input.fullName,
    input.email,
    input.city,
    input.primaryCategory,
    input.headline,
    input.bio,
    input.instagram || input.youtube || input.facebook || input.linkedin,
    (input.services || []).length > 0,
    (input.goals || []).length > 0,
    (input.hpeditNeeds || []).length > 0,
    input.preferredStyle,
    input.consentPortfolio && input.consentPrivacy,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

async function writeConsents(applicationIdValue: string, input: CreatorApplicationInput) {
  const prisma = getPrisma();
  await prisma.$executeRaw`DELETE FROM "CreatorConsent" WHERE "applicationId"=${applicationIdValue}`;
  const consents = [
    ["PORTFOLIO_CONTENT", input.consentPortfolio],
    ["PRIVACY_POLICY", input.consentPrivacy],
    ["MARKETING", Boolean(input.consentMarketing)],
  ] as const;
  for (const [consentType, granted] of consents) {
    await prisma.$executeRaw`
      INSERT INTO "CreatorConsent" ("id","applicationId","consentType","granted")
      VALUES (${consentId()},${applicationIdValue},${consentType},${granted})
    `;
  }
}

export async function createCreatorApplication(input: CreatorApplicationInput) {
  await ensureCreatorApplicationSchema();
  const prisma = getPrisma();
  const id = applicationId();
  const completion = applicationCompletion(input);
  const submittedAt = new Date();
  const data = JSON.stringify(input);

  await prisma.$executeRaw`
    INSERT INTO "CreatorApplication"
      ("id","status","email","fullName","creatorName","city","primaryCategory","completion","data","submittedAt","updatedAt")
    VALUES
      (${id},'SUBMITTED',${input.email.toLowerCase().trim()},${input.fullName.trim()},${input.creatorName?.trim() || null},${input.city?.trim() || null},${input.primaryCategory?.trim() || null},${completion},${data}::jsonb,${submittedAt},${submittedAt})
  `;

  await writeConsents(id, input);
  return { id, completion, submittedAt };
}

export async function saveCreatorApplicationDraft(input: CreatorApplicationInput, existingId?: string, resumeToken?: string) {
  await ensureCreatorApplicationSchema();
  const prisma = getPrisma();
  const completion = applicationCompletion(input);
  const now = new Date();
  const data = JSON.stringify(input);

  if (existingId && resumeToken) {
    const tokenHash = hashSecret(resumeToken);
    const rows = await prisma.$queryRaw<Array<{ id: string }>>`
      SELECT "id" FROM "CreatorApplication"
      WHERE "id"=${existingId} AND "draftTokenHash"=${tokenHash} AND "status"='DRAFT'
      LIMIT 1
    `;
    if (!rows.length) throw new Error("DRAFT_ACCESS_DENIED");
    await prisma.$executeRaw`
      UPDATE "CreatorApplication"
      SET "email"=${input.email.toLowerCase().trim()},
          "fullName"=${input.fullName.trim()},
          "creatorName"=${input.creatorName?.trim() || null},
          "city"=${input.city?.trim() || null},
          "primaryCategory"=${input.primaryCategory?.trim() || null},
          "completion"=${completion},
          "data"=${data}::jsonb,
          "lastSavedAt"=${now},
          "updatedAt"=${now}
      WHERE "id"=${existingId}
    `;
    return { id: existingId, completion, resumeToken: null as string | null, created: false };
  }

  const id = applicationId();
  const token = newResumeToken();
  const tokenHash = hashSecret(token);
  await prisma.$executeRaw`
    INSERT INTO "CreatorApplication"
      ("id","status","email","fullName","creatorName","city","primaryCategory","completion","data","draftTokenHash","lastSavedAt","updatedAt")
    VALUES
      (${id},'DRAFT',${input.email.toLowerCase().trim()},${input.fullName.trim()},${input.creatorName?.trim() || null},${input.city?.trim() || null},${input.primaryCategory?.trim() || null},${completion},${data}::jsonb,${tokenHash},${now},${now})
  `;
  return { id, completion, resumeToken: token, created: true };
}

export async function getCreatorApplicationDraft(id: string, resumeToken: string) {
  await ensureCreatorApplicationSchema();
  const tokenHash = hashSecret(resumeToken);
  const rows = await getPrisma().$queryRaw<Array<CreatorApplicationRow & { emailVerifiedAt: Date | null; lastSavedAt: Date | null }>>`
    SELECT "id","status","email","fullName","creatorName","city","primaryCategory","completion","data","submittedAt","createdAt","updatedAt","emailVerifiedAt","lastSavedAt"
    FROM "CreatorApplication"
    WHERE "id"=${id} AND "draftTokenHash"=${tokenHash} AND "status"='DRAFT'
    LIMIT 1
  `;
  return rows[0] || null;
}

export async function finalizeCreatorApplicationDraft(id: string, resumeToken: string, input: CreatorApplicationInput) {
  await ensureCreatorApplicationSchema();
  const prisma = getPrisma();
  const tokenHash = hashSecret(resumeToken);
  const rows = await prisma.$queryRaw<Array<{ id: string }>>`
    SELECT "id" FROM "CreatorApplication"
    WHERE "id"=${id} AND "draftTokenHash"=${tokenHash} AND "status"='DRAFT'
    LIMIT 1
  `;
  if (!rows.length) throw new Error("DRAFT_ACCESS_DENIED");

  const completion = applicationCompletion(input);
  const submittedAt = new Date();
  const data = JSON.stringify(input);
  await prisma.$executeRaw`
    UPDATE "CreatorApplication"
    SET "status"='SUBMITTED',
        "email"=${input.email.toLowerCase().trim()},
        "fullName"=${input.fullName.trim()},
        "creatorName"=${input.creatorName?.trim() || null},
        "city"=${input.city?.trim() || null},
        "primaryCategory"=${input.primaryCategory?.trim() || null},
        "completion"=${completion},
        "data"=${data}::jsonb,
        "submittedAt"=${submittedAt},
        "lastSavedAt"=${submittedAt},
        "updatedAt"=${submittedAt}
    WHERE "id"=${id}
  `;
  await writeConsents(id, input);
  return { id, completion, submittedAt };
}

export type CreatorApplicationAssetRow = {
  id: string;
  applicationId: string;
  kind: string;
  fileName: string;
  contentType: string;
  size: number;
  createdAt: Date;
};

export async function listCreatorApplicationAssets(applicationIdValue: string, resumeToken?: string) {
  await ensureCreatorApplicationSchema();
  const prisma = getPrisma();
  if (resumeToken) {
    const tokenHash = hashSecret(resumeToken);
    const access = await prisma.$queryRaw<Array<{ id: string }>>`
      SELECT "id" FROM "CreatorApplication"
      WHERE "id"=${applicationIdValue} AND "draftTokenHash"=${tokenHash}
      LIMIT 1
    `;
    if (!access.length) throw new Error("DRAFT_ACCESS_DENIED");
  }
  return prisma.$queryRaw<CreatorApplicationAssetRow[]>`
    SELECT "id","applicationId","kind","fileName","contentType","size","createdAt"
    FROM "CreatorApplicationAsset"
    WHERE "applicationId"=${applicationIdValue}
    ORDER BY "createdAt" DESC
  `;
}

export async function addCreatorApplicationAsset(input: { applicationId: string; resumeToken: string; kind: string; fileName: string; contentType: string; data: Buffer }) {
  await ensureCreatorApplicationSchema();
  const prisma = getPrisma();
  const tokenHash = hashSecret(input.resumeToken);
  const access = await prisma.$queryRaw<Array<{ id: string }>>`
    SELECT "id" FROM "CreatorApplication"
    WHERE "id"=${input.applicationId} AND "draftTokenHash"=${tokenHash} AND "status"='DRAFT'
    LIMIT 1
  `;
  if (!access.length) throw new Error("DRAFT_ACCESS_DENIED");

  const totals = await prisma.$queryRaw<Array<{ count: bigint; bytes: bigint }>>`
    SELECT COUNT(*) AS count, COALESCE(SUM("size"),0) AS bytes
    FROM "CreatorApplicationAsset" WHERE "applicationId"=${input.applicationId}
  `;
  const count = Number(totals[0]?.count || 0);
  const bytes = Number(totals[0]?.bytes || 0);
  if (count >= 20) throw new Error("ASSET_COUNT_LIMIT");
  if (bytes + input.data.byteLength > 25_000_000) throw new Error("ASSET_TOTAL_LIMIT");

  const id = assetId();
  await prisma.$executeRaw`
    INSERT INTO "CreatorApplicationAsset" ("id","applicationId","kind","fileName","contentType","size","data")
    VALUES (${id},${input.applicationId},${input.kind},${input.fileName},${input.contentType},${input.data.byteLength},${input.data})
  `;
  await prisma.$executeRaw`UPDATE "CreatorApplication" SET "updatedAt"=${new Date()} WHERE "id"=${input.applicationId}`;
  return { id };
}

export async function deleteCreatorApplicationAsset(input: { applicationId: string; resumeToken: string; assetId: string }) {
  await ensureCreatorApplicationSchema();
  const tokenHash = hashSecret(input.resumeToken);
  const prisma = getPrisma();
  const access = await prisma.$queryRaw<Array<{ id: string }>>`
    SELECT "id" FROM "CreatorApplication"
    WHERE "id"=${input.applicationId} AND "draftTokenHash"=${tokenHash} AND "status"='DRAFT'
    LIMIT 1
  `;
  if (!access.length) throw new Error("DRAFT_ACCESS_DENIED");
  await prisma.$executeRaw`DELETE FROM "CreatorApplicationAsset" WHERE "id"=${input.assetId} AND "applicationId"=${input.applicationId}`;
}

export type CreatorApplicationRow = {
  id: string;
  status: ApplicationStatus;
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
};

export async function listCreatorApplications() {
  await ensureCreatorApplicationSchema();
  return getPrisma().$queryRaw<CreatorApplicationRow[]>`
    SELECT "id","status","email","fullName","creatorName","city","primaryCategory","completion","data","submittedAt","createdAt","updatedAt"
    FROM "CreatorApplication"
    ORDER BY "updatedAt" DESC
    LIMIT 250
  `;
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  if (!APPLICATION_STATUSES.includes(status)) throw new Error("Invalid status");
  await ensureCreatorApplicationSchema();
  await getPrisma().$executeRaw`
    UPDATE "CreatorApplication"
    SET "status"=${status}, "updatedAt"=${new Date()}
    WHERE "id"=${id}
  `;
}
