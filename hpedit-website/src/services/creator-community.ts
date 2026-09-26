import { createHash } from "crypto";
import { getPrisma } from "@/lib/prisma";
import { ensurePortfolioSchema } from "@/lib/portfolio-cms";

export type CreatorCommunityState = {
  resourceId: string;
  email: string;
  source: string;
  createdAt: Date;
  active: boolean;
};

type PreferenceDetails = { email?: string; source?: string };

export function creatorCommunityId(email: string) {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

export async function getCreatorCommunityState(email: string) {
  await ensurePortfolioSchema();
  const resourceId = creatorCommunityId(email);
  const row = await getPrisma().auditLog.findFirst({
    where: {
      resource: "CreatorCommunity",
      resourceId,
      action: { in: ["NEWSLETTER_SIGNUP", "NEWSLETTER_UNSUBSCRIBE"] },
    },
    orderBy: { createdAt: "desc" },
    select: { action: true, details: true, createdAt: true },
  });
  if (!row) return null;
  const details = row.details && typeof row.details === "object" && !Array.isArray(row.details) ? row.details as PreferenceDetails : {};
  return {
    resourceId,
    email: details.email || email.trim().toLowerCase(),
    source: details.source || "public",
    createdAt: row.createdAt,
    active: row.action === "NEWSLETTER_SIGNUP",
  } satisfies CreatorCommunityState;
}

export async function setCreatorCommunityPreference(emailInput: string, active: boolean, source: string) {
  await ensurePortfolioSchema();
  const email = emailInput.trim().toLowerCase();
  const resourceId = creatorCommunityId(email);
  const current = await getCreatorCommunityState(email);
  if (current?.active === active) return { changed: false, state: current };

  const created = await getPrisma().auditLog.create({
    data: {
      actor: "public",
      action: active ? "NEWSLETTER_SIGNUP" : "NEWSLETTER_UNSUBSCRIBE",
      resource: "CreatorCommunity",
      resourceId,
      details: { email, source },
    },
    select: { createdAt: true },
  });

  return {
    changed: true,
    state: { resourceId, email, source, createdAt: created.createdAt, active } satisfies CreatorCommunityState,
  };
}

export async function listCreatorCommunityStates(limit = 5000) {
  await ensurePortfolioSchema();
  const rows = await getPrisma().auditLog.findMany({
    where: {
      resource: "CreatorCommunity",
      action: { in: ["NEWSLETTER_SIGNUP", "NEWSLETTER_UNSUBSCRIBE"] },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: { action: true, resourceId: true, details: true, createdAt: true },
  });

  const latest = new Map<string, CreatorCommunityState>();
  for (const row of rows) {
    if (!row.resourceId || latest.has(row.resourceId)) continue;
    const details = row.details && typeof row.details === "object" && !Array.isArray(row.details) ? row.details as PreferenceDetails : {};
    latest.set(row.resourceId, {
      resourceId: row.resourceId,
      email: details.email || "Unavailable",
      source: details.source || "public",
      createdAt: row.createdAt,
      active: row.action === "NEWSLETTER_SIGNUP",
    });
  }

  return [...latest.values()];
}
