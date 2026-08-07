export type FirebaseSession = {
  idToken: string;
  uid: string;
  email: string;
  expiresAt: number;
};

export type KnowledgeArticleRecord = {
  id: string;
  titleKm: string;
  titleEn: string;
  summaryKm: string;
  summaryEn: string;
  contentKm: string;
  contentEn: string;
  category: string;
  coverImage: string;
  status: "draft" | "published";
  featured: boolean;
  updatedAt: string;
};

const apiKey =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY ??
  "AIzaSyDSoROCsVP-wAwvOJxmS3ZM6i3v8WKf7nQ";
const projectId =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "sesan-my-app";
const storageBucket =
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
  "sesan-my-app.firebasestorage.app";

const firestoreBase = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

export function firebaseIsConfigured() {
  return Boolean(apiKey && projectId && storageBucket);
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const data = (await response.json().catch(() => ({}))) as T & {
    error?: {message?: string};
  };

  if (!response.ok) {
    throw new Error(data.error?.message || "Firebase request failed");
  }

  return data;
}

export async function signInAdmin(email: string, password: string) {
  const auth = await requestJson<{
    idToken: string;
    localId: string;
    email: string;
    expiresIn: string;
  }>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password, returnSecureToken: true}),
    },
  );

  const session: FirebaseSession = {
    idToken: auth.idToken,
    uid: auth.localId,
    email: auth.email,
    expiresAt: Date.now() + Number(auth.expiresIn) * 1000,
  };

  const adminDocument = await requestJson<{
    fields?: {active?: {booleanValue?: boolean}};
  }>(
    `${firestoreBase}/knowledgeAdmins/${encodeURIComponent(session.uid)}`,
    {headers: {Authorization: `Bearer ${session.idToken}`}},
  );

  if (adminDocument.fields?.active?.booleanValue !== true) {
    throw new Error("NOT_KNOWLEDGE_ADMIN");
  }

  return session;
}

type FirestoreValue =
  | {stringValue: string}
  | {booleanValue: boolean}
  | {timestampValue: string};

type FirestoreDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
};

function fieldString(fields: FirestoreDocument["fields"], name: string) {
  const value = fields?.[name];
  return value && "stringValue" in value ? value.stringValue : "";
}

function fieldBoolean(fields: FirestoreDocument["fields"], name: string) {
  const value = fields?.[name];
  return value && "booleanValue" in value ? value.booleanValue : false;
}

function fieldTimestamp(fields: FirestoreDocument["fields"], name: string) {
  const value = fields?.[name];
  return value && "timestampValue" in value
    ? value.timestampValue
    : new Date().toISOString();
}

function fromDocument(document: FirestoreDocument): KnowledgeArticleRecord {
  const fields = document.fields;
  return {
    id: document.name.split("/").pop() ?? "",
    titleKm: fieldString(fields, "titleKm"),
    titleEn: fieldString(fields, "titleEn"),
    summaryKm: fieldString(fields, "summaryKm"),
    summaryEn: fieldString(fields, "summaryEn"),
    contentKm: fieldString(fields, "contentKm"),
    contentEn: fieldString(fields, "contentEn"),
    category: fieldString(fields, "category"),
    coverImage: fieldString(fields, "coverImage"),
    status: fieldString(fields, "status") === "published" ? "published" : "draft",
    featured: fieldBoolean(fields, "featured"),
    updatedAt: fieldTimestamp(fields, "updatedAt"),
  };
}

function articleFields(article: KnowledgeArticleRecord) {
  return {
    titleKm: {stringValue: article.titleKm},
    titleEn: {stringValue: article.titleEn},
    summaryKm: {stringValue: article.summaryKm},
    summaryEn: {stringValue: article.summaryEn},
    contentKm: {stringValue: article.contentKm},
    contentEn: {stringValue: article.contentEn},
    category: {stringValue: article.category},
    coverImage: {stringValue: article.coverImage},
    status: {stringValue: article.status},
    featured: {booleanValue: article.featured},
    updatedAt: {timestampValue: article.updatedAt},
  };
}

export async function listKnowledgeArticles(session: FirebaseSession) {
  const data = await requestJson<{documents?: FirestoreDocument[]}>(
    `${firestoreBase}/knowledgeArticles?pageSize=1000`,
    {headers: {Authorization: `Bearer ${session.idToken}`}},
  );

  return (data.documents ?? [])
    .map(fromDocument)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function listPublishedKnowledgeArticles() {
  const data = await requestJson<{documents?: FirestoreDocument[]}>(
    `${firestoreBase}/knowledgeArticles?pageSize=1000`,
    {cache: "no-store"},
  );

  return (data.documents ?? [])
    .map(fromDocument)
    .filter((article) => article.status === "published")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getPublishedKnowledgeArticle(id: string) {
  const document = await requestJson<FirestoreDocument>(
    `${firestoreBase}/knowledgeArticles/${encodeURIComponent(id)}`,
    {cache: "no-store"},
  );
  const article = fromDocument(document);
  return article.status === "published" ? article : null;
}

export async function saveKnowledgeArticle(
  session: FirebaseSession,
  article: KnowledgeArticleRecord,
) {
  await requestJson(
    `${firestoreBase}/knowledgeArticles/${encodeURIComponent(article.id)}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({fields: articleFields(article)}),
    },
  );
}

export async function deleteKnowledgeArticle(
  session: FirebaseSession,
  id: string,
) {
  const response = await fetch(
    `${firestoreBase}/knowledgeArticles/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: {Authorization: `Bearer ${session.idToken}`},
    },
  );
  if (!response.ok) throw new Error("Unable to delete article");
}

export async function uploadKnowledgeCover(
  session: FirebaseSession,
  file: File,
) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const objectName = `knowledge-covers/${session.uid}/${Date.now()}-${safeName}`;
  const response = await requestJson<{name: string}>(
    `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o?uploadType=media&name=${encodeURIComponent(objectName)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.idToken}`,
        "Content-Type": file.type,
      },
      body: file,
    },
  );

  return `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(response.name)}?alt=media`;
}

export function readableFirebaseError(error: unknown) {
  const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";
  if (message.includes("INVALID_LOGIN_CREDENTIALS")) return "អ៊ីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវ។";
  if (message.includes("TOO_MANY_ATTEMPTS")) return "បានសាកល្បងច្រើនដងពេក។ សូមរង់ចាំបន្តិច។";
  if (message.includes("PERMISSION_DENIED")) return "គណនីនេះមិនមានសិទ្ធិជា Admin ទេ។";
  if (message.includes("NOT_KNOWLEDGE_ADMIN")) return "គណនីនេះមិនមានសិទ្ធិជា Knowledge Admin ទេ។";
  if (message.includes("Firebase request failed")) return "មិនអាចភ្ជាប់ Firebase បានទេ។";
  return message;
}
