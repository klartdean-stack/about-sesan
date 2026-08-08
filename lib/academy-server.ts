import {academyAdminFetch, academyFirestoreBase} from "@/lib/firebase-admin";

const firebaseApiKey = process.env.NEXT_PUBLIC_ACADEMY_FIREBASE_API_KEY ?? "AIzaSyAn2AB1Lx0z2zf1GGkfdq2SCa7hC8nzJgM";

export async function academyBuyer(idToken?: string) {
  if (!idToken) return null;
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseApiKey}`, {
    method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({idToken}), cache: "no-store",
  });
  const data = await response.json() as {users?: Array<{localId: string; email?: string}>};
  return response.ok ? data.users?.[0] ?? null : null;
}

export async function paidAcademyPurchase(uid: string, courseId: string) {
  const id = `${uid}_${courseId}`;
  const response = await academyAdminFetch(`${academyFirestoreBase}/academyPurchases/${encodeURIComponent(id)}`);
  const document = await response.json() as {fields?: Record<string, {stringValue?: string; integerValue?: string}>};
  return response.ok && document.fields?.buyerUid?.stringValue === uid && document.fields?.courseId?.stringValue === courseId && document.fields?.status?.stringValue === "paid";
}

export async function academyCourseDocument(courseId: string) {
  const response = await academyAdminFetch(`${academyFirestoreBase}/academyCourses/${encodeURIComponent(courseId)}`);
  const document = await response.json() as {fields?: Record<string, {stringValue?: string; integerValue?: string}>};
  return response.ok ? document.fields ?? null : null;
}
