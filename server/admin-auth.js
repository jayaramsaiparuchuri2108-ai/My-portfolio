import { createHmac, timingSafeEqual } from "node:crypto";

const cookieName = "portfolio_admin_session";
const sessionLifetime = 8 * 60 * 60;

function signature(value) {
  return createHmac("sha256", process.env.SESSION_SECRET).update(value).digest("base64url");
}

function safeEqual(left, right) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function configured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32);
}

export function verifyCredentials(username, password) {
  return safeEqual(String(username ?? ""), process.env.ADMIN_USERNAME ?? "") && safeEqual(String(password ?? ""), process.env.ADMIN_PASSWORD ?? "");
}

export function createSession() {
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + sessionLifetime })).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function hasSession(request) {
  const cookie = request.headers.cookie ?? "";
  const token = cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
  if (!token) return false;
  const [payload, suppliedSignature] = token.split(".");
  if (!payload || !suppliedSignature || !safeEqual(suppliedSignature, signature(payload))) return false;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString()).exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function setSessionCookie(response, token, secure = true) {
  response.setHeader("Set-Cookie", `${cookieName}=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${sessionLifetime}${secure ? "; Secure" : ""}`);
}

export function clearSessionCookie(response, secure = true) {
  response.setHeader("Set-Cookie", `${cookieName}=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0${secure ? "; Secure" : ""}`);
}

export function rejectMethod(response, allowed) {
  response.setHeader("Allow", allowed.join(", "));
  response.status(405).json({ error: "Method not allowed" });
}
