import crypto from "node:crypto";
import { getPrisma } from "@/lib/prisma";
import { ensurePortfolioSchema } from "@/lib/portfolio-cms";

export const ANALYTICS_COOKIE = "hpedit_pf_session";

export function newAnalyticsSessionId() { return crypto.randomUUID(); }

function browserFromAgent(agent: string) {
  if (/Edg\//i.test(agent)) return "Edge";
  if (/Chrome\//i.test(agent)) return "Chrome";
  if (/Safari\//i.test(agent) && !/Chrome\//i.test(agent)) return "Safari";
  if (/Firefox\//i.test(agent)) return "Firefox";
  return "Other";
}

function deviceFromAgent(agent: string) {
  if (/iPad|Tablet|Android(?!.*Mobile)/i.test(agent)) return "Tablet";
  if (/Mobile|iPhone|Android/i.test(agent)) return "Mobile";
  return "Desktop";
}

function safeReferrer(value: string | null) {
  if (!value) return null;
  try { const url = new URL(value); return `${url.hostname}${url.pathname === "/" ? "" : url.pathname.slice(0, 120)}`; }
  catch { return value.slice(0, 160); }
}

export async function ensureAnalyticsSchema() {
  await ensurePortfolioSchema();
  const prisma = getPrisma();
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "PortfolioEvent" ("id" TEXT PRIMARY KEY,"portfolioId" TEXT NOT NULL REFERENCES "Portfolio"("id") ON DELETE CASCADE,"sessionId" TEXT NOT NULL,"eventType" TEXT NOT NULL,"target" TEXT,"engagedSeconds" INTEGER,"inviteRef" TEXT,"referrer" TEXT,"device" TEXT,"browser" TEXT,"country" TEXT,"region" TEXT,"createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP)`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "PortfolioEvent_portfolioId_createdAt_idx" ON "PortfolioEvent"("portfolioId", "createdAt")`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "PortfolioEvent_portfolioId_sessionId_idx" ON "PortfolioEvent"("portfolioId", "sessionId")`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "PortfolioEvent_eventType_createdAt_idx" ON "PortfolioEvent"("eventType", "createdAt")`);
}

export async function recordPortfolioEvent(input: { portfolioId: string; sessionId: string; eventType: string; request: Request; target?: string | null; engagedSeconds?: number | null; inviteRef?: string | null }) {
  await ensureAnalyticsSchema();
  const agent = input.request.headers.get("user-agent") || "";
  const referrer = safeReferrer(input.request.headers.get("referer"));
  const country = input.request.headers.get("x-vercel-ip-country")?.slice(0, 8) || null;
  const region = input.request.headers.get("x-vercel-ip-country-region")?.slice(0, 32) || null;
  const device = deviceFromAgent(agent);
  const browser = browserFromAgent(agent);
  const id = `pe_${crypto.randomUUID().replace(/-/g, "")}`;
  const target = input.target?.slice(0, 500) || null;
  const inviteRef = input.inviteRef?.slice(0, 120) || null;
  const engagedSeconds = input.engagedSeconds == null ? null : Math.max(0, Math.min(3600, Math.round(input.engagedSeconds)));
  await getPrisma().$executeRaw`INSERT INTO "PortfolioEvent" ("id","portfolioId","sessionId","eventType","target","engagedSeconds","inviteRef","referrer","device","browser","country","region") VALUES (${id},${input.portfolioId},${input.sessionId},${input.eventType},${target},${engagedSeconds},${inviteRef},${referrer},${device},${browser},${country},${region})`;
}

export function injectAnalyticsTag(html: string, slug: string, inviteRef?: string | null) {
  const query = new URLSearchParams({ slug });
  if (inviteRef) query.set("invite", inviteRef);
  const tag = `<script defer src="/api/portfolio-tracker?${query.toString()}"></script>`;
  if (/<\/body>/i.test(html)) return html.replace(/<\/body>/i, `${tag}</body>`);
  return `${html}${tag}`;
}

export type PortfolioMetric = {
  slug: string;
  title: string | null;
  access: string;
  views: bigint;
  sessions: bigint;
  clicks: bigint;
  engaged: bigint;
  last_view: Date | null;
};

export type PortfolioEventRow = {
  id: string;
  slug: string;
  event_type: string;
  session_id: string;
  target: string | null;
  engaged_seconds: number | null;
  invite_ref: string | null;
  referrer: string | null;
  device: string | null;
  browser: string | null;
  country: string | null;
  region: string | null;
  created_at: Date;
};

export type DimensionRow = { label: string; count: bigint };
export type DailyRow = { day: Date; views: bigint; sessions: bigint; clicks: bigint };

export async function getPortfolioMetrics() {
  await ensureAnalyticsSchema();
  return getPrisma().$queryRaw<PortfolioMetric[]>`
    SELECT p."slug", p."title", p."access"::text AS access,
      COUNT(*) FILTER (WHERE e."eventType"='PAGE_VIEW') AS views,
      COUNT(DISTINCT e."sessionId") FILTER (WHERE e."eventType"='PAGE_VIEW') AS sessions,
      COUNT(*) FILTER (WHERE e."eventType"='CLICK') AS clicks,
      COALESCE(SUM(e."engagedSeconds") FILTER (WHERE e."eventType"='ENGAGEMENT'),0) AS engaged,
      MAX(e."createdAt") FILTER (WHERE e."eventType"='PAGE_VIEW') AS last_view
    FROM "Portfolio" p LEFT JOIN "PortfolioEvent" e ON e."portfolioId"=p."id"
    GROUP BY p."id",p."slug",p."title",p."access" ORDER BY last_view DESC NULLS LAST, p."updatedAt" DESC
  `;
}

export async function getRecentPortfolioEvents(slug?: string, limit = 80) {
  await ensureAnalyticsSchema();
  const safeLimit = Math.max(1, Math.min(200, Math.floor(limit)));
  if (slug) {
    return getPrisma().$queryRaw<PortfolioEventRow[]>`
      SELECT e."id", p."slug", e."eventType" AS event_type, e."sessionId" AS session_id,
        e."target", e."engagedSeconds" AS engaged_seconds, e."inviteRef" AS invite_ref,
        e."referrer", e."device", e."browser", e."country", e."region", e."createdAt" AS created_at
      FROM "PortfolioEvent" e JOIN "Portfolio" p ON p."id"=e."portfolioId"
      WHERE p."slug"=${slug}
      ORDER BY e."createdAt" DESC LIMIT ${safeLimit}
    `;
  }
  return getPrisma().$queryRaw<PortfolioEventRow[]>`
    SELECT e."id", p."slug", e."eventType" AS event_type, e."sessionId" AS session_id,
      e."target", e."engagedSeconds" AS engaged_seconds, e."inviteRef" AS invite_ref,
      e."referrer", e."device", e."browser", e."country", e."region", e."createdAt" AS created_at
    FROM "PortfolioEvent" e JOIN "Portfolio" p ON p."id"=e."portfolioId"
    ORDER BY e."createdAt" DESC LIMIT ${safeLimit}
  `;
}

export async function getAnalyticsDimensions(slug?: string) {
  await ensureAnalyticsSchema();
  const prisma = getPrisma();
  const filter = slug ? `AND p."slug" = $1` : "";
  const values = slug ? [slug] : [];
  const devices = await prisma.$queryRawUnsafe<DimensionRow[]>(`SELECT COALESCE(e."device",'Unknown') AS label, COUNT(*)::bigint AS count FROM "PortfolioEvent" e JOIN "Portfolio" p ON p."id"=e."portfolioId" WHERE e."eventType"='PAGE_VIEW' ${filter} GROUP BY 1 ORDER BY count DESC`, ...values);
  const browsers = await prisma.$queryRawUnsafe<DimensionRow[]>(`SELECT COALESCE(e."browser",'Unknown') AS label, COUNT(*)::bigint AS count FROM "PortfolioEvent" e JOIN "Portfolio" p ON p."id"=e."portfolioId" WHERE e."eventType"='PAGE_VIEW' ${filter} GROUP BY 1 ORDER BY count DESC`, ...values);
  const countries = await prisma.$queryRawUnsafe<DimensionRow[]>(`SELECT COALESCE(e."country",'Unknown') AS label, COUNT(*)::bigint AS count FROM "PortfolioEvent" e JOIN "Portfolio" p ON p."id"=e."portfolioId" WHERE e."eventType"='PAGE_VIEW' ${filter} GROUP BY 1 ORDER BY count DESC LIMIT 10`, ...values);
  const invites = await prisma.$queryRawUnsafe<DimensionRow[]>(`SELECT COALESCE(NULLIF(e."inviteRef",''),'Direct / untagged') AS label, COUNT(*)::bigint AS count FROM "PortfolioEvent" e JOIN "Portfolio" p ON p."id"=e."portfolioId" WHERE e."eventType"='PAGE_VIEW' ${filter} GROUP BY 1 ORDER BY count DESC LIMIT 10`, ...values);
  return { devices, browsers, countries, invites };
}

export async function getDailyAnalytics(slug?: string, days = 14) {
  await ensureAnalyticsSchema();
  const safeDays = Math.max(1, Math.min(90, Math.floor(days)));
  if (slug) {
    return getPrisma().$queryRaw<DailyRow[]>`
      SELECT date_trunc('day', e."createdAt") AS day,
        COUNT(*) FILTER (WHERE e."eventType"='PAGE_VIEW') AS views,
        COUNT(DISTINCT e."sessionId") FILTER (WHERE e."eventType"='PAGE_VIEW') AS sessions,
        COUNT(*) FILTER (WHERE e."eventType"='CLICK') AS clicks
      FROM "PortfolioEvent" e JOIN "Portfolio" p ON p."id"=e."portfolioId"
      WHERE p."slug"=${slug} AND e."createdAt" >= NOW() - (${safeDays} * INTERVAL '1 day')
      GROUP BY 1 ORDER BY 1 ASC
    `;
  }
  return getPrisma().$queryRaw<DailyRow[]>`
    SELECT date_trunc('day', e."createdAt") AS day,
      COUNT(*) FILTER (WHERE e."eventType"='PAGE_VIEW') AS views,
      COUNT(DISTINCT e."sessionId") FILTER (WHERE e."eventType"='PAGE_VIEW') AS sessions,
      COUNT(*) FILTER (WHERE e."eventType"='CLICK') AS clicks
    FROM "PortfolioEvent" e
    WHERE e."createdAt" >= NOW() - (${safeDays} * INTERVAL '1 day')
    GROUP BY 1 ORDER BY 1 ASC
  `;
}
