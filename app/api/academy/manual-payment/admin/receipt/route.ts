import {academyAdministrator} from "@/lib/academy-server";
import {academyAdminAccessToken, academyAdminFetch, academyFirestoreBase} from "@/lib/firebase-admin";

const bucket = process.env.NEXT_PUBLIC_ACADEMY_FIREBASE_STORAGE_BUCKET ?? "sesan-academy.firebasestorage.app";

export async function POST(request: Request) {
  const input = await request.json().catch(() => ({})) as {idToken?: string; paymentId?: string};
  const admin = await academyAdministrator(input.idToken);
  if (!admin || !input.paymentId) return Response.json({error: "NOT_ACADEMY_ADMIN"}, {status: 403});
  const paymentResponse = await academyAdminFetch(
    `${academyFirestoreBase}/academyManualPayments/${encodeURIComponent(input.paymentId)}`,
  );
  const payment = await paymentResponse.json() as {fields?: Record<string, {stringValue?: string}>};
  const path = payment.fields?.receiptPath?.stringValue;
  if (!paymentResponse.ok || !path) return Response.json({error: "RECEIPT_NOT_FOUND"}, {status: 404});
  const token = await academyAdminAccessToken();
  const url = `https://storage.googleapis.com/download/storage/v1/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(path)}?alt=media`;
  const response = await fetch(url, {headers: {Authorization: `Bearer ${token}`}, cache: "no-store"});
  if (!response.ok) return Response.json({error: "RECEIPT_NOT_FOUND"}, {status: 404});
  return new Response(await response.arrayBuffer(), {
    headers: {
      "Content-Type": payment.fields?.receiptContentType?.stringValue || "image/jpeg",
      "Cache-Control": "private, no-store",
    },
  });
}
