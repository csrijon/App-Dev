import crypto from "node:crypto";
import { getPrisma } from "@/lib/prisma";

const RESERVED_SLUGS = new Set([
  "app",
  "api",
  "login",
  "logout",
  "apply",
  "about",
  "showcase",
  "faq",
  "privacy",
  "terms",
  "cookies",
  "disclaimer",
  "content-guidelines",
  "accessibility",
  "takedown",
  "unsubscribe",
  "_next",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "manifest.webmanifest",
  "opengraph-image",
]);

const PORTFOLIO_ACCESS_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const PORTFOLIO_ACCESS_CLOCK_SKEW_MS = 5 * 60 * 1000;

let schemaPromise: Promise<void> | null = null;

export function normalizePortfolioSlug(value: string) {
  return value.trim().toLowerCase().replace(/^@/, "");
}

export function validatePortfolioSlug(value: string) {
  const slug = normalizePortfolioSlug(value);
  if (!/^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$/.test(slug)) {
    return { ok: false as const, error: "Use 3–64 lowercase letters, numbers or hyphens." };
  }
  if (RESERVED_SLUGS.has(slug)) {
    return { ok: false as const, error: "That slug is reserved by the application." };
  }
  return { ok: true as const, slug };
}

export function normalizeAssetPath(value: string) {
  const path = value.replace(/\\/g, "/").replace(/^\/+/, "");
  if (!path || path.includes("../") || path.startsWith("../") || path.includes("\0")) {
    throw new Error("Unsafe asset path");
  }
  return path;
}

export function contentTypeFor(path: string) {
  const ext = path.split(".").pop()?.toLowerCase();
  return ({
    html: "text/html; charset=utf-8",
    htm: "text/html; charset=utf-8",
    css: "text/css; charset=utf-8",
    js: "text/javascript; charset=utf-8",
    mjs: "text/javascript; charset=utf-8",
    json: "application/json; charset=utf-8",
    txt: "text/plain; charset=utf-8",
    xml: "application/xml; charset=utf-8",
    svg: "image/svg+xml",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
    ico: "image/x-icon",
    avif: "image/avif",
    woff: "font/woff",
    woff2: "font/woff2",
    ttf: "font/ttf",
    otf: "font/otf",
    pdf: "application/pdf",
    mp4: "video/mp4",
    webm: "video/webm",
  } as Record<string, string>)[ext || ""] || "application/octet-stream";
}

export function injectPortfolioBase(html: string, slug: string) {
  const base = `<base href="/${slug}/">`;
  if (/<base\s/i.test(html)) return html;
  return html.replace(/<head([^>]*)>/i, (match) => `${match}\n  ${base}`);
}

export function portfolioEtag(data: Uint8Array) {
  return `\"${crypto.createHash("sha256").update(data).digest("hex")}\"`;
}

export function hashPortfolioPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPortfolioPassword(password: string, stored?: string | null) {
  if (!stored) return false;
  const [salt, expected] = stored.split(":");
  if (!salt || !expected) return false;
  const actual = crypto.scryptSync(password, salt, 64).toString("hex");
  if (actual.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}

export function portfolioAccessCookie(slug: string) {
  return `hpedit_portfolio_${crypto.createHash("sha256").update(slug).digest("hex").slice(0, 16)}`;
}

function signPortfolioAccessToken(slug: string, passwordHash: string, issuedAt: number) {
  const secret = process.env.AUTH_SECRET || "";
  const payload = `${slug}:${passwordHash}:${issuedAt}`;
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function createPortfolioAccessToken(slug: string, passwordHash: string) {
  const issuedAt = Date.now();
  return `${issuedAt}.${signPortfolioAccessToken(slug, passwordHash, issuedAt)}`;
}

export function verifyPortfolioAccessToken(slug: string, passwordHash: string, token?: string | null) {
  if (!token || !process.env.AUTH_SECRET) return false;
  const dot = token.indexOf(".");
  if (dot < 1) return false;
  const issuedAtText = token.slice(0, dot);
  const supplied = token.slice(dot + 1);
  if (!/^\d{13}$/.test(issuedAtText)) return false;
  const issuedAt = Number(issuedAtText);
  if (!Number.isFinite(issuedAt)) return false;
  const age = Date.now() - issuedAt;
  if (age < -PORTFOLIO_ACCESS_CLOCK_SKEW_MS || age > PORTFOLIO_ACCESS_MAX_AGE_MS) return false;

  const expected = signPortfolioAccessToken(slug, passwordHash, issuedAt);
  if (supplied.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}

export async function ensurePortfolioSchema() {
  if (schemaPromise) return schemaPromise;
  schemaPromise = (async () => {
    const prisma = getPrisma();
    await prisma.$executeRawUnsafe(`DO $$ BEGIN
      CREATE TYPE "PortfolioAccess" AS ENUM ('PUBLIC', 'PASSWORD', 'HIDDEN');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;`);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Portfolio" (
        "id" TEXT PRIMARY KEY,
        "slug" TEXT NOT NULL UNIQUE,
        "title" TEXT,
        "entryPath" TEXT NOT NULL DEFAULT 'index.html',
        "sourceFileName" TEXT,
        "access" "PortfolioAccess" NOT NULL DEFAULT 'PUBLIC',
        "passwordHash" TEXT,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await prisma.$executeRawUnsafe(`ALTER TABLE "Portfolio" ADD COLUMN IF NOT EXISTS "access" "PortfolioAccess" NOT NULL DEFAULT 'PUBLIC'`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "Portfolio" ADD COLUMN IF NOT EXISTS "passwordHash" TEXT`);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "PortfolioAsset" (
        "id" TEXT PRIMARY KEY,
        "portfolioId" TEXT NOT NULL REFERENCES "Portfolio"("id") ON DELETE CASCADE,
        "path" TEXT NOT NULL,
        "contentType" TEXT NOT NULL,
        "size" INTEGER NOT NULL,
        "data" BYTEA NOT NULL,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "PortfolioAsset_portfolioId_path_key" UNIQUE ("portfolioId", "path")
      )
    `);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "AuditLog" (
        "id" TEXT PRIMARY KEY,
        "actor" TEXT NOT NULL,
        "action" TEXT NOT NULL,
        "resource" TEXT NOT NULL,
        "resourceId" TEXT,
        "details" JSONB,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Portfolio_access_idx" ON "Portfolio"("access")`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "PortfolioAsset_portfolioId_idx" ON "PortfolioAsset"("portfolioId")`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "AuditLog_resource_resourceId_idx" ON "AuditLog"("resource", "resourceId")`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "AuditLog_createdAt_idx" ON "AuditLog"("createdAt")`);
  })().catch((error) => {
    schemaPromise = null;
    throw error;
  });
  return schemaPromise;
}
