import {academyAdministrator} from "@/lib/academy-server";
import {academyAdminFetch, academyFirestoreBase} from "@/lib/firebase-admin";

type Value = {stringValue?: string; integerValue?: string};
const projectId = process.env.NEXT_PUBLIC_ACADEMY_FIREBASE_PROJECT_ID ?? "sesan-academy";

export async function POST(request: Request) {
  const input = await request.json().catch(() => ({})) as {
    idToken?: string; paymentId?: string; decision?: "approved" | "rejected"; adminNote?: string;
  };
  const admin = await academyAdministrator(input.idToken);
  if (!admin || !input.paymentId || !["approved", "rejected"].includes(input.decision || "")) {
    return Response.json({error: "NOT_ACADEMY_ADMIN"}, {status: 403});
  }
  const paymentUrl = `${academyFirestoreBase}/academyManualPayments/${encodeURIComponent(input.paymentId)}`;
  const paymentResponse = await academyAdminFetch(paymentUrl);
  const payment = await paymentResponse.json() as {fields?: Record<string, Value>};
  const fields = payment.fields;
  if (!paymentResponse.ok || !fields) return Response.json({error: "PAYMENT_NOT_FOUND"}, {status: 404});
  const buyerUid = fields.buyerUid?.stringValue || "";
  const courseId = fields.courseId?.stringValue || "";
  if (!buyerUid || !courseId) return Response.json({error: "INVALID_PAYMENT"}, {status: 400});

  const now = new Date().toISOString();
  const updatedFields = {
    ...fields,
    status: {stringValue: input.decision || "rejected"},
    adminNote: {stringValue: String(input.adminNote || "").slice(0, 500)},
    reviewedBy: {stringValue: admin.localId},
    updatedAt: {stringValue: now},
  };
  if (input.decision === "rejected") {
    const response = await academyAdminFetch(paymentUrl, {
      method: "PATCH", body: JSON.stringify({fields: updatedFields}),
    });
    return Response.json({status: response.ok ? "rejected" : "error"}, {status: response.ok ? 200 : 500});
  }

  const purchaseId = `${buyerUid}_${courseId}`;
  const commitResponse = await academyAdminFetch(`${academyFirestoreBase}:commit`, {
    method: "POST",
    body: JSON.stringify({writes: [
      {update: {name: `projects/${projectId}/databases/(default)/documents/academyPurchases/${purchaseId}`, fields: {
        buyerUid: {stringValue: buyerUid}, courseId: {stringValue: courseId}, transactionId: {stringValue: input.paymentId},
        amountRiel: {integerValue: fields.amountRiel?.integerValue || "0"}, currency: {stringValue: "KHR"},
        status: {stringValue: "paid"}, paymentMethod: {stringValue: "aba_manual_qr"},
        purchasedAt: {stringValue: now}, updatedAt: {stringValue: now},
      }}},
      {update: {name: `projects/${projectId}/databases/(default)/documents/academyManualPayments/${input.paymentId}`, fields: updatedFields}},
    ]}),
  });
  if (!commitResponse.ok) return Response.json({error: "APPROVAL_FAILED"}, {status: 500});
  return Response.json({status: "approved"});
}
