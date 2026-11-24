import { configured, createSession, rejectMethod, setSessionCookie, verifyCredentials } from "../../server/admin-auth.js";

export default function handler(request, response) {
  if (request.method !== "POST") return rejectMethod(response, ["POST"]);
  if (!configured()) return response.status(503).json({ error: "Admin login is not configured. Add ADMIN_USERNAME, ADMIN_PASSWORD, and a 32+ character SESSION_SECRET in Vercel." });
  const { username, password } = request.body ?? {};
  if (!verifyCredentials(username, password)) return response.status(401).json({ error: "The username or password is incorrect." });
  setSessionCookie(response, createSession(), Boolean(process.env.VERCEL));
  return response.status(200).json({ authenticated: true });
}
