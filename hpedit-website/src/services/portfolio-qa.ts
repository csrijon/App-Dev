import { getPrisma } from "@/lib/prisma";
import { ensurePortfolioSchema, normalizePortfolioSlug } from "@/lib/portfolio-cms";

export type PortfolioQaLevel = "PASS" | "WARNING" | "FAIL";

export type PortfolioQaCheck = {
  key: string;
  label: string;
  level: PortfolioQaLevel;
  detail: string;
};

type PortfolioRow = {
  id: string;
  slug: string;
  title: string | null;
  entryPath: string;
  access: "PUBLIC" | "PASSWORD" | "HIDDEN";
  passwordHash: string | null;
  updatedAt: Date;
};

type AssetRow = {
  path: string;
  contentType: string;
  size: number;
  data: Buffer;
};

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function localReferences(html: string) {
  const refs = new Set<string>();
  const regex = /(?:src|href)\s*=\s*["']([^"']+)["']/gi;
  for (const match of html.matchAll(regex)) {
    const raw = match[1]?.trim();
    if (!raw || raw.startsWith("#") || raw.startsWith("data:") || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("javascript:") || /^https?:\/\//i.test(raw) || raw.startsWith("//")) continue;
    const clean = raw.split(/[?#]/)[0].replace(/^\.\//, "").replace(/^\/+/, "");
    if (clean) refs.add(safeDecode(clean));
  }
  return [...refs];
}

function referencePath(reference: string, slug: string) {
  const prefix = `${slug}/`;
  return reference.startsWith(prefix) ? reference.slice(prefix.length) : reference;
}

function missingAltCount(html: string) {
  const tags = html.match(/<img\b[^>]*>/gi) || [];
  return tags.filter((tag) => !/\balt\s*=\s*["'][^"']*["']/i.test(tag)).length;
}

export async function getPortfolioQa(slugInput: string) {
  await ensurePortfolioSchema();
  const slug = normalizePortfolioSlug(slugInput);
  const prisma = getPrisma();
  const portfolios = await prisma.$queryRaw<PortfolioRow[]>`
    SELECT "id","slug","title","entryPath","access","passwordHash","updatedAt"
    FROM "Portfolio" WHERE "slug"=${slug} LIMIT 1
  `;
  const portfolio = portfolios[0];
  if (!portfolio) return null;

  const assets = await prisma.$queryRaw<AssetRow[]>`
    SELECT "path","contentType","size","data"
    FROM "PortfolioAsset" WHERE "portfolioId"=${portfolio.id}
    ORDER BY "path" ASC
  `;

  const checks: PortfolioQaCheck[] = [];
  const assetPaths = new Set(assets.map((asset) => asset.path));
  const entry = assets.find((asset) => asset.path === portfolio.entryPath);

  checks.push({
    key: "entry",
    label: "Entry document",
    level: entry ? "PASS" : "FAIL",
    detail: entry ? `${portfolio.entryPath} is present.` : `${portfolio.entryPath} is missing from the stored package.`,
  });

  if (portfolio.access === "PASSWORD") {
    checks.push({ key: "password", label: "Password protection", level: portfolio.passwordHash ? "PASS" : "FAIL", detail: portfolio.passwordHash ? "Password hash is configured." : "Portfolio is password-protected but no password hash is stored." });
  } else {
    checks.push({ key: "access", label: "Visibility mode", level: "PASS", detail: `Portfolio access is ${portfolio.access.toLowerCase()}.` });
  }

  const totalSize = assets.reduce((sum, asset) => sum + asset.size, 0);
  checks.push({ key: "package-size", label: "Stored package size", level: totalSize > 20_000_000 ? "FAIL" : totalSize > 10_000_000 ? "WARNING" : "PASS", detail: `${(totalSize / 1_000_000).toFixed(1)} MB across ${assets.length} stored assets.` });

  const largeImages = assets.filter((asset) => asset.contentType.startsWith("image/") && asset.size > 2_000_000);
  checks.push({ key: "images", label: "Image optimisation", level: largeImages.length ? "WARNING" : "PASS", detail: largeImages.length ? `${largeImages.length} image(s) exceed 2 MB: ${largeImages.slice(0, 5).map((asset) => asset.path).join(", ")}${largeImages.length > 5 ? "…" : ""}` : "No stored image exceeds 2 MB." });

  if (entry && entry.contentType.startsWith("text/html")) {
    const html = entry.data.toString("utf8");
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const titleText = titleMatch?.[1]?.replace(/<[^>]+>/g, "").trim() || "";
    checks.push({ key: "title", label: "Page title", level: titleText ? "PASS" : "WARNING", detail: titleText ? `Title found: ${titleText.slice(0, 100)}` : "No non-empty <title> was found in the entry page." });

    const hasDescription = /<meta\s+[^>]*name=["']description["'][^>]*content=["'][^"']+["'][^>]*>/i.test(html) || /<meta\s+[^>]*content=["'][^"']+["'][^>]*name=["']description["'][^>]*>/i.test(html);
    checks.push({ key: "description", label: "Meta description", level: hasDescription ? "PASS" : "WARNING", detail: hasDescription ? "A meta description is present." : "Add a concise meta description for search and link previews." });

    const hasH1 = /<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(html);
    checks.push({ key: "h1", label: "Primary heading", level: hasH1 ? "PASS" : "WARNING", detail: hasH1 ? "At least one H1 is present." : "No H1 was found in the entry page." });

    const altMissing = missingAltCount(html);
    checks.push({ key: "alt", label: "Image alt text", level: altMissing ? "WARNING" : "PASS", detail: altMissing ? `${altMissing} image tag(s) are missing an alt attribute.` : "All image tags in the entry page include alt attributes." });

    const insecure = [...html.matchAll(/(?:src|href)\s*=\s*["'](http:\/\/[^"']+)["']/gi)].map((match) => match[1]);
    checks.push({ key: "https", label: "Secure external resources", level: insecure.length ? "WARNING" : "PASS", detail: insecure.length ? `${insecure.length} HTTP resource/link(s) found. Prefer HTTPS.` : "No insecure HTTP asset references found." });

    const references = localReferences(html);
    const checkedReferences = references.map((reference) => referencePath(reference, slug)).filter((reference) => reference.length > 0);
    const missing = checkedReferences.filter((reference) => !assetPaths.has(reference) && reference !== portfolio.entryPath);
    checks.push({ key: "references", label: "Local asset references", level: missing.length ? "FAIL" : "PASS", detail: missing.length ? `${missing.length} referenced local file(s) are missing: ${missing.slice(0, 8).join(", ")}${missing.length > 8 ? "…" : ""}` : `${checkedReferences.length} local reference(s) checked with no obvious missing files.` });

    const viewport = /<meta\s+[^>]*name=["']viewport["']/i.test(html);
    checks.push({ key: "viewport", label: "Mobile viewport", level: viewport ? "PASS" : "WARNING", detail: viewport ? "Viewport metadata is present." : "No viewport meta tag found; mobile rendering may be incorrect." });
  }

  const failed = checks.filter((check) => check.level === "FAIL").length;
  const warnings = checks.filter((check) => check.level === "WARNING").length;
  const status: PortfolioQaLevel = failed ? "FAIL" : warnings ? "WARNING" : "PASS";
  return { portfolio, assets: assets.map(({ data: _data, ...asset }) => asset), checks, failed, warnings, status };
}
