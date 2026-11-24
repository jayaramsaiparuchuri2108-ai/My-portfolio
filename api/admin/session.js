import { configured, hasSession, rejectMethod } from "../../server/admin-auth.js";

export default function handler(request, response) {
  if (request.method !== "GET") return rejectMethod(response, ["GET"]);
  if (!configured()) return response.status(503).json({ configured: false, authenticated: false });
  return response.status(200).json({ configured: true, authenticated: hasSession(request) });
}
