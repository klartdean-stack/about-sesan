import {randomBytes} from "node:crypto";
import {createPayWayCheckout} from "@/lib/payway";

const firebaseApiKey = process.env.NEXT_PUBLIC_ACADEMY_FIREBASE_API_KEY ?? "AIzaSyAn2AB1Lx0z2zf1GGkfdq2SCa7hC8nzJgM";
const projectId = process.env.NEXT_PUBLIC_ACADEMY_FIREBASE_PROJECT_ID ?? "sesan-academy";
const firestoreBase = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

type FirestoreDocument = {fields?: Record<string, {stringValue?: string; integerValue?: string}>};

export async function POST(request: Request) {
  try {
    const input = await request.json() as {idToken?: string; courseId?: string; locale?: string};
    if (!input.idToken || !input.courseId) return Response.json({error: "MISSING_CHECKOUT_DATA"}, {status: 400});
    const authResponse = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseApiKey}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({idToken: input.idToken}),
      cache: "no-store",
    });
    const auth = await authResponse.json() as {users?: Array<{localId: string; email?: string}>};
    const buyer = auth.users?.[0];
    if (!authResponse.ok || !buyer) return Response.json({error: "LOGIN_REQUIRED"}, {status: 401});

    const courseResponse = await fetch(`${firestoreBase}/academyCourses/${encodeURIComponent(input.courseId)}`, {cache: "no-store"});
    const course = await courseResponse.json() as FirestoreDocument;
    const status = course.fields?.status?.stringValue;
    const amountRiel = Number(course.fields?.priceRiel?.integerValue || 0);
    if (!courseResponse.ok || status !== "published" || amountRiel < 100) {
      return Response.json({error: "COURSE_NOT_AVAILABLE"}, {status: 404});
    }
    const locale = input.locale === "en" ? "en" : "km";
    const title = (locale === "km" ? course.fields?.titleKm?.stringValue : course.fields?.titleEn?.stringValue)
      || course.fields?.titleKm?.stringValue || "Sesan Academy course";
    const transactionId = `SA${Date.now()}${randomBytes(3).toString("hex")}`.slice(0, 20);
    const origin = new URL(request.url).origin;
    const now = new Date().toISOString();
    const orderResponse = await fetch(`${firestoreBase}/academyPaymentTransactions/${encodeURIComponent(transactionId)}`, {
      method: "PATCH",
      headers: {Authorization: `Bearer ${input.idToken}`, "Content-Type": "application/json"},
      body: JSON.stringify({fields: {
        transactionId: {stringValue: transactionId},
        buyerUid: {stringValue: buyer.localId},
        buyerEmail: {stringValue: buyer.email || ""},
        courseId: {stringValue: input.courseId},
        amountRiel: {integerValue: String(amountRiel)},
        currency: {stringValue: "KHR"},
        status: {stringValue: "pending"},
        createdAt: {stringValue: now},
        updatedAt: {stringValue: now},
      }}),
      cache: "no-store",
    });
    if (!orderResponse.ok) {
      console.error("Could not save pending Academy payment", await orderResponse.text());
      return Response.json({error: "PAYMENT_RECORD_DENIED"}, {status: 403});
    }
    return Response.json(createPayWayCheckout({
      origin,
      locale,
      transactionId,
      buyerEmail: buyer.email || "buyer@sesan.academy",
      buyerUid: buyer.localId,
      courseId: input.courseId,
      courseTitle: title,
      amountRiel,
    }));
  } catch (error) {
    const message = error instanceof Error ? error.message : "CHECKOUT_FAILED";
    console.error("PayWay checkout failed", message);
    return Response.json({error: message.startsWith("MISSING_") ? message : "CHECKOUT_FAILED"}, {status: 500});
  }
}
