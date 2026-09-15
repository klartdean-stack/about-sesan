import type {FirebaseSession} from "@/lib/firebase-rest";

export type NewsStatus = "draft" | "published";
export type NewsArticleRecord = {
  id: string;
  titleKm: string;
  titleEn: string;
  summaryKm: string;
  summaryEn: string;
  contentKm: string;
  contentEn: string;
  category: string;
  coverImage: string;
  status: NewsStatus;
  featured: boolean;
  views: number;
  publishedAt: string;
  updatedAt: string;
};

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "sesan-my-app";
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "sesan-my-app.firebasestorage.app";
const firestoreBase = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

type FirestoreValue = {stringValue: string} | {booleanValue: boolean} | {integerValue: string} | {timestampValue: string};
type FirestoreDocument = {name: string; fields?: Record<string, FirestoreValue>};

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const data = (await response.json().catch(() => ({}))) as T & {error?: {message?: string}};
  if (!response.ok) throw new Error(data.error?.message || "Firebase request failed");
  return data;
}

function stringField(fields: FirestoreDocument["fields"], key: string) {
  const value = fields?.[key];
  return value && "stringValue" in value ? value.stringValue : "";
}
function boolField(fields: FirestoreDocument["fields"], key: string) {
  const value = fields?.[key];
  return value && "booleanValue" in value ? value.booleanValue : false;
}
function intField(fields: FirestoreDocument["fields"], key: string) {
  const value = fields?.[key];
  return value && "integerValue" in value ? Number(value.integerValue) || 0 : 0;
}
function timeField(fields: FirestoreDocument["fields"], key: string) {
  const value = fields?.[key];
  return value && "timestampValue" in value ? value.timestampValue : "";
}

function fromDocument(doc: FirestoreDocument): NewsArticleRecord {
  const fields = doc.fields;
  return {
    id: doc.name.split("/").pop() ?? "",
    titleKm: stringField(fields, "titleKm"), titleEn: stringField(fields, "titleEn"),
    summaryKm: stringField(fields, "summaryKm"), summaryEn: stringField(fields, "summaryEn"),
    contentKm: stringField(fields, "contentKm"), contentEn: stringField(fields, "contentEn"),
    category: stringField(fields, "category"), coverImage: stringField(fields, "coverImage"),
    status: stringField(fields, "status") === "published" ? "published" : "draft",
    featured: boolField(fields, "featured"), views: intField(fields, "views"),
    publishedAt: timeField(fields, "publishedAt"), updatedAt: timeField(fields, "updatedAt") || new Date().toISOString(),
  };
}

function fieldsFor(article: NewsArticleRecord) {
  return {
    titleKm: {stringValue: article.titleKm}, titleEn: {stringValue: article.titleEn},
    summaryKm: {stringValue: article.summaryKm}, summaryEn: {stringValue: article.summaryEn},
    contentKm: {stringValue: article.contentKm}, contentEn: {stringValue: article.contentEn},
    category: {stringValue: article.category}, coverImage: {stringValue: article.coverImage},
    status: {stringValue: article.status}, featured: {booleanValue: article.featured},
    views: {integerValue: String(article.views)},
    publishedAt: {timestampValue: article.publishedAt || article.updatedAt},
    updatedAt: {timestampValue: article.updatedAt},
  };
}

export async function listNewsArticles(session: FirebaseSession) {
  const data = await requestJson<{documents?: FirestoreDocument[]}>(`${firestoreBase}/newsArticles?pageSize=1000`, {headers: {Authorization: `Bearer ${session.idToken}`}});
  return (data.documents ?? []).map(fromDocument).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
export async function listPublishedNewsArticles() {
  const data = await requestJson<{documents?: FirestoreDocument[]}>(`${firestoreBase}/newsArticles?pageSize=1000`, {cache: "no-store"});
  return (data.documents ?? []).map(fromDocument).filter((x) => x.status === "published").sort((a, b) => (b.publishedAt || b.updatedAt).localeCompare(a.publishedAt || a.updatedAt));
}
export async function getPublishedNewsArticle(id: string) {
  const doc = await requestJson<FirestoreDocument>(`${firestoreBase}/newsArticles/${encodeURIComponent(id)}`, {cache: "no-store"});
  const article = fromDocument(doc);
  return article.status === "published" ? article : null;
}
export async function saveNewsArticle(session: FirebaseSession, article: NewsArticleRecord) {
  await requestJson(`${firestoreBase}/newsArticles/${encodeURIComponent(article.id)}`, {method: "PATCH", headers: {Authorization: `Bearer ${session.idToken}`, "Content-Type": "application/json"}, body: JSON.stringify({fields: fieldsFor(article)})});
}
export async function deleteNewsArticle(session: FirebaseSession, id: string) {
  const response = await fetch(`${firestoreBase}/newsArticles/${encodeURIComponent(id)}`, {method: "DELETE", headers: {Authorization: `Bearer ${session.idToken}`}});
  if (!response.ok) throw new Error("Unable to delete news article");
}
export async function uploadNewsCover(session: FirebaseSession, file: File) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const objectName = `news-covers/${session.uid}/${Date.now()}-${safeName}`;
  const data = await requestJson<{name: string}>(`https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o?uploadType=media&name=${encodeURIComponent(objectName)}`, {method: "POST", headers: {Authorization: `Bearer ${session.idToken}`, "Content-Type": file.type}, body: file});
  return `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(data.name)}?alt=media`;
}
export async function incrementNewsViews(id: string) {
  await requestJson(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:commit`, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({writes: [{transform: {document: `projects/${projectId}/databases/(default)/documents/newsArticles/${id}`, fieldTransforms: [{fieldPath: "views", increment: {integerValue: "1"}}]}}]})});
}
