import crypto from "node:crypto";
import { headers } from "next/headers";
import { getPrisma } from "@/lib/prisma";
import { ensurePortfolioSchema } from "@/lib/portfolio-cms";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 8;

async function requestFingerprint() {
  const store = await headers();
  const forwarded = store.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwarded || store.get("x-real-ip")?.trim() || "unknown";
  const secret = process.env.AUTH_SECRET || "";
  return crypto.createHmac("sha256", secret).update(address).digest("hex");
}

async function context() {
  await ensurePortfolioSchema();
  return { prisma: getPrisma(), resourceId: await requestFingerprint() };
}

export async function adminLoginIsThrottled() {
  const { prisma, resourceId } = await context();
  const windowStart = new Date(Date.now() - WINDOW_MS);
  const latestSuccess = await prisma.auditLog.findFirst({
    where: {
      resource: "LoginSecurity",
      resourceId,
      action: "ADMIN_LOGIN_SUCCEEDED",
      createdAt: { gte: windowStart },
    },
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });
  const failureStart = latestSuccess?.createdAt && latestSuccess.createdAt > windowStart ? latestSuccess.createdAt : windowStart;
  const failures = await prisma.auditLog.count({
    where: {
      resource: "LoginSecurity",
      resourceId,
      action: "ADMIN_LOGIN_FAILED",
      createdAt: { gt: failureStart },
    },
  });
  return failures >= MAX_FAILURES;
}

export async function recordAdminLoginFailure() {
  const { prisma, resourceId } = await context();
  await prisma.auditLog.create({
    data: {
      actor: "anonymous",
      action: "ADMIN_LOGIN_FAILED",
      resource: "LoginSecurity",
      resourceId,
      details: { windowMinutes: WINDOW_MS / 60_000 },
    },
  });
}

export async function recordAdminLoginSuccess() {
  const { prisma, resourceId } = await context();
  await prisma.auditLog.create({
    data: {
      actor: "admin",
      action: "ADMIN_LOGIN_SUCCEEDED",
      resource: "LoginSecurity",
      resourceId,
      details: { resetFailures: true },
    },
  });
}
