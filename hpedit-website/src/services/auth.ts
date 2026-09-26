import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "hpedit_influencers_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;
const SESSION_MAX_AGE_MS = SESSION_MAX_AGE_SECONDS * 1000;
const CLOCK_SKEW_MS = 5 * 60 * 1000;

function secret() {
  return process.env.AUTH_SECRET || "";
}

function sign(value: string) {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

export function createSessionToken() {
  const value = `admin:${Date.now()}`;
  return `${value}.${sign(value)}`;
}

export function verifySessionToken(token?: string | null) {
  if (!token || !secret()) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const value = token.slice(0, dot);
  const supplied = token.slice(dot + 1);
  const expected = sign(value);
  if (supplied.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) return false;

  const match = /^admin:(\d{13})$/.exec(value);
  if (!match) return false;
  const issuedAt = Number(match[1]);
  if (!Number.isFinite(issuedAt)) return false;
  const age = Date.now() - issuedAt;
  if (age < -CLOCK_SKEW_MS || age > SESSION_MAX_AGE_MS) return false;
  return true;
}

export async function isAuthenticated() {
  const store = await cookies();
  return verifySessionToken(store.get(COOKIE_NAME)?.value);
}

export async function setSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected || password.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(password), Buffer.from(expected));
}
