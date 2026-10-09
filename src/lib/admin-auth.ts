import { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "admin_auth";
const AUTH_SALT = "|nour-admin-v1";

async function tokenFor(secret: string): Promise<string> {
  const data = new TextEncoder().encode(secret + AUTH_SALT);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function isAdminAuthed(request: NextRequest): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const cookieToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!adminPassword || !cookieToken) return false;
  return timingSafeEqual(cookieToken, await tokenFor(adminPassword));
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !password) return false;
  return timingSafeEqual(await tokenFor(password), await tokenFor(adminPassword));
}

export async function makeAdminCookieValue(): Promise<string | null> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return null;
  return tokenFor(adminPassword);
}

export function setAdminCookie(response: NextResponse, value: string) {
  response.cookies.set(ADMIN_COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
