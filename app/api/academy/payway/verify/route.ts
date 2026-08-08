import {checkPayWayTransaction} from "@/lib/payway";

const firebaseApiKey = process.env.NEXT_PUBLIC_ACADEMY_FIREBASE_API_KEY ?? "AIzaSyAn2AB1Lx0z2zf1GGkfdq2SCa7hC8nzJgM";
const projectId = process.env.NEXT_PUBLIC_ACADEMY_FIREBASE_PROJECT_ID ?? "sesan-academy";
const firestoreBase = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

type Value = {stringValue?: string; integerValue?: string};
type Document = {fields?: Record<string, Value>};

export async function POST(request: Request) {
  try {
    const input = await request.json() as {idToken?: string; transactionId?: string};
    if (!input.idToken || !input.transactionId) return Response.json({error: "MISSING_VERIFY_DATA"}, {status: 400});

    const authResponse = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseApiKey}`, {
      method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({idToken: input.idToken}), cache: "no-store",
    });
    const auth = await authResponse.json() as {users?: Array<{localId: string}>};
    const buyerUid = auth.users?.[0]?.localId;
    if (!authResponse.ok || !buyerUid) return Response.json({error: "LOGIN_REQUIRED"}, {status: 401});

    const headers = {Authorization: `Bearer ${input.idToken}`, "Content-Type": "application/json"};
    const orderUrl = `${firestoreBase}/academyPaymentTransactions/${encodeURIComponent(input.transactionId)}`;
    const orderResponse = await fetch(orderUrl, {headers, cache: "no-store"});
    const order = await orderResponse.json() as Document;
    if (!orderResponse.ok || order.fields?.buyerUid?.stringValue !== buyerUid) {
      return Response.json({error: "PAYMENT_NOT_FOUND"}, {status: 404});
    }
    const courseId = order.fields.courseId?.stringValue || "";
    const expectedAmount = Number(order.fields.amountRiel?.integerValue || 0);
    const result = await checkPayWayTransaction(input.transactionId);
    const approved = result.status?.code === "00"
      && result.data?.payment_status === "APPROVED"
      && Number(result.data.payment_amount) === expectedAmount
      && result.data.payment_currency === "KHR";
    if (!approved) return Response.json({status: "pending", paymentStatus: result.data?.payment_status || "PENDING"});

    const now = new Date().toISOString();
    const purchaseId = `${buyerUid}_${courseId}`;
    const purchaseResponse = await fetch(`${firestoreBase}/academyPurchases/${encodeURIComponent(purchaseId)}`, {
      method: "PATCH", headers, cache: "no-store",
      body: JSON.stringify({fields: {
        buyerUid: {stringValue: buyerUid}, courseId: {stringValue: courseId}, transactionId: {stringValue: input.transactionId},
        amountRiel: {integerValue: String(expectedAmount)}, currency: {stringValue: "KHR"}, status: {stringValue: "paid"},
        purchasedAt: {stringValue: now}, updatedAt: {stringValue: now},
      }}),
    });
    if (!purchaseResponse.ok) return Response.json({error: "PURCHASE_RECORD_DENIED"}, {status: 403});
    await fetch(orderUrl, {
      method: "PATCH", headers, cache: "no-store",
      body: JSON.stringify({fields: {...order.fields, status: {stringValue: "paid"}, updatedAt: {stringValue: now}}}),
    });
    return Response.json({status: "paid", courseId});
  } catch (error) {
    console.error("PayWay verification failed", error);
    return Response.json({error: "VERIFY_FAILED"}, {status: 500});
  }
}
