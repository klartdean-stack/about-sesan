import {createSign} from "node:crypto";

const projectId = process.env.NEXT_PUBLIC_ACADEMY_FIREBASE_PROJECT_ID ?? "sesan-academy";
export const academyFirestoreBase = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

let cachedToken: {value: string; expiresAt: number} | null = null;

function base64Url(value: string | Buffer) {
  return Buffer.from(value).toString("base64url");
}

function serviceAccount() {
  const raw = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON?.trim();
  if (!raw) throw new Error("MISSING_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON");
  const parsed = JSON.parse(raw) as {client_email?: string; private_key?: string};
  if (!parsed.client_email || !parsed.private_key) throw new Error("INVALID_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON");
  return {clientEmail: parsed.client_email, privateKey: parsed.private_key.replace(/\\n/g, "\n")};
}

async function adminAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  const account = serviceAccount();
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({alg: "RS256", typ: "JWT"}));
  const payload = base64Url(JSON.stringify({
    iss: account.clientEmail,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const assertion = `${unsigned}.${base64Url(signer.sign(account.privateKey))}`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: new URLSearchParams({grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion}),
    cache: "no-store",
  });
  const data = await response.json() as {access_token?: string; expires_in?: number; error_description?: string};
  if (!response.ok || !data.access_token) throw new Error(data.error_description || "FIREBASE_ADMIN_AUTH_FAILED");
  cachedToken = {value: data.access_token, expiresAt: Date.now() + (data.expires_in || 3600) * 1000};
  return cachedToken.value;
}

export async function academyAdminFetch(url: string, init: RequestInit = {}) {
  const token = await adminAccessToken();
  return fetch(url, {
    ...init,
    headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...init.headers},
    cache: "no-store",
  });
}
