import { clearSessionCookie, rejectMethod } from "../../server/admin-auth.js";

export default function handler(request, response) {
  if (request.method !== "POST") return rejectMethod(response, ["POST"]);
  clearSessionCookie(response, Boolean(process.env.VERCEL));
  return response.status(200).json({ authenticated: false });
}
