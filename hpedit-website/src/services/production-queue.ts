import { getPrisma } from "@/lib/prisma";
import { ensureCreatorApplicationSchema } from "@/lib/creator-applications";
import { ensurePortfolioProductionLinkSchema } from "@/lib/portfolio-production-link";
import { ensureCreatorPortfolioReviewSchema } from "@/lib/creator-portfolio-review";

export type ProductionQueueItem = {
  id: string;
  status: string;
  email: string;
  fullName: string;
  creatorName: string | null;
  city: string | null;
  primaryCategory: string | null;
  completion: number;
  updatedAt: Date;
  submittedAt: Date | null;
  portfolioSlug: string | null;
  portfolioTitle: string | null;
  portfolioAccess: "PUBLIC" | "PASSWORD" | "HIDDEN" | null;
  reviewDecision: "APPROVED" | "CHANGES_REQUESTED" | null;
  creatorApprovalCurrent: boolean;
};

const PRODUCTION_STATUSES = ["APPROVED", "BUILDING", "CREATOR_REVIEW", "PUBLISHED"] as const;

export async function listProductionQueue() {
  await Promise.all([ensureCreatorApplicationSchema(), ensurePortfolioProductionLinkSchema(), ensureCreatorPortfolioReviewSchema()]);
  return getPrisma().$queryRaw<ProductionQueueItem[]>`
    SELECT a."id",a."status",a."email",a."fullName",a."creatorName",a."city",a."primaryCategory",a."completion",a."updatedAt",a."submittedAt",
           p."slug" AS "portfolioSlug",p."title" AS "portfolioTitle",p."access" AS "portfolioAccess",
           r."decision" AS "reviewDecision",
           CASE WHEN r."decision"='APPROVED' AND r."portfolioId"=p."id" AND r."portfolioRevision">=p."updatedAt" THEN TRUE ELSE FALSE END AS "creatorApprovalCurrent"
    FROM "CreatorApplication" a
    LEFT JOIN "PortfolioProductionLink" l ON l."applicationId"=a."id"
    LEFT JOIN "Portfolio" p ON p."id"=l."portfolioId"
    LEFT JOIN LATERAL (
      SELECT "portfolioId","decision","portfolioRevision"
      FROM "CreatorPortfolioReview"
      WHERE "applicationId"=a."id"
      ORDER BY "createdAt" DESC
      LIMIT 1
    ) r ON TRUE
    WHERE a."status" IN ('APPROVED','BUILDING','CREATOR_REVIEW','PUBLISHED')
    ORDER BY CASE a."status"
      WHEN 'APPROVED' THEN 1
      WHEN 'BUILDING' THEN 2
      WHEN 'CREATOR_REVIEW' THEN 3
      WHEN 'PUBLISHED' THEN 4
      ELSE 5
    END, a."updatedAt" DESC
    LIMIT 500
  `;
}

export function productionStatuses() {
  return PRODUCTION_STATUSES;
}
