import { getPrisma } from "@/lib/prisma";
import { ensurePortfolioSchema } from "@/lib/portfolio-cms";

export type SiteSettings = {
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImageUrl: string;
  heroVideoUrl: string;
  ctaImageUrl: string;
  primaryCtaLabel: string;
  primaryCtaVisible: boolean;
  hpeditCtaLabel: string;
  hpeditCtaVisible: boolean;
  hpeditUrl: string;
};

const LEGACY_SITE_COPY = {
  eyebrow: "HPEDIT · CREATOR PORTFOLIOS",
  heroTitle: "A useful digital gift for creators we would like to know better.",
  heroDescription: "HPEDIT creates and hosts bespoke creator portfolios at no cost. Creators can now apply directly, tell us about their work and goals, and request a portfolio for review by the HPEDIT team.",
} as const;

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  eyebrow: "Turn your passion into a",
  heroTitle: "Beautiful Online Home",
  heroDescription: "Stunning portfolio websites for creators, built around your work, your story and the way you want to be seen.",
  heroImageUrl: "https://images.unsplash.com/photo-1556231604-3b10052bd88a?auto=format&fit=crop&q=88&w=2200",
  heroVideoUrl: "",
  ctaImageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=88&w=2200",
  primaryCtaLabel: "Apply for a free portfolio",
  primaryCtaVisible: true,
  hpeditCtaLabel: "Visit HPEDIT",
  hpeditCtaVisible: true,
  hpeditUrl: "https://www.hpedit.com",
};

function normalizeLegacyHomepageCopy(settings: SiteSettings): SiteSettings {
  return {
    ...settings,
    eyebrow: settings.eyebrow === LEGACY_SITE_COPY.eyebrow ? DEFAULT_SITE_SETTINGS.eyebrow : settings.eyebrow,
    heroTitle: settings.heroTitle === LEGACY_SITE_COPY.heroTitle ? DEFAULT_SITE_SETTINGS.heroTitle : settings.heroTitle,
    heroDescription: settings.heroDescription === LEGACY_SITE_COPY.heroDescription ? DEFAULT_SITE_SETTINGS.heroDescription : settings.heroDescription,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  await ensurePortfolioSchema();
  const row = await getPrisma().auditLog.findFirst({
    where: { resource: "SiteSettings", action: "SITE_SETTINGS_UPDATED" },
    orderBy: { createdAt: "desc" },
    select: { details: true },
  });
  const details = row?.details && typeof row.details === "object" && !Array.isArray(row.details) ? row.details as Partial<SiteSettings> : {};
  return normalizeLegacyHomepageCopy({ ...DEFAULT_SITE_SETTINGS, ...details });
}

export async function saveSiteSettings(settings: SiteSettings) {
  await ensurePortfolioSchema();
  await getPrisma().auditLog.create({
    data: {
      actor: "admin",
      action: "SITE_SETTINGS_UPDATED",
      resource: "SiteSettings",
      resourceId: "public-homepage",
      details: settings,
    },
  });
}
