import { createHmac } from "node:crypto";
import { cookies } from "next/headers";

const SECRET =
  process.env.SESSION_SECRET || "fidel-tutorial-session-secret-change-me";

/**
 * Create a signed session token containing a timestamp and admin username.
 */
export function createSessionToken(username: string): string {
  const payload = `${username}:${Date.now()}`;
  const signature = createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex");
  return Buffer.from(`${payload}:${signature}`).toString("base64");
}

/**
 * Verify a session token and return the username if valid.
 */
export function verifySessionToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length !== 3) return null;

    const [username, timestampStr, signature] = parts;
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) return null;

    // Check expiration (24 hours)
    const maxAge = 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > maxAge) return null;

    // Verify signature
    const payload = `${username}:${timestampStr}`;
    const expectedSig = createHmac("sha256", SECRET)
      .update(payload)
      .digest("hex");

    if (signature !== expectedSig) return null;

    return username;
  } catch {
    return null;
  }
}

/**
 * Next.js specific helper to check the admin session in server contexts
 */
export async function getAdminSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
