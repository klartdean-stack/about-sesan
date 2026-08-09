import {academyBuyer, paidAcademyPurchase} from "@/lib/academy-server";
import {academyAdminFetch, academyFirestoreBase} from "@/lib/firebase-admin";

export async function POST(request: Request) {
  const input = await request.json().catch(() => ({})) as {idToken?: string; courseId?: string};
  const buyer = await academyBuyer(input.idToken);
  if (!buyer || !input.courseId) return Response.json({error: "LOGIN_REQUIRED"}, {status: 401});
  if (await paidAcademyPurchase(buyer.localId, input.courseId)) return Response.json({status: "approved"});

  const paymentId = `${buyer.localId}_${input.courseId}`;
  const response = await academyAdminFetch(
    `${academyFirestoreBase}/academyManualPayments/${encodeURIComponent(paymentId)}`,
  );
  if (!response.ok) return Response.json({status: "none"});
  const document = await response.json() as {fields?: Record<string, {stringValue?: string}>};
  return Response.json({
    status: document.fields?.status?.stringValue || "none",
    adminNote: document.fields?.adminNote?.stringValue || "",
  });
}
