import {academyBuyer, academyCourseDocument, paidAcademyPurchase} from "@/lib/academy-server";
import {academyAdminAccessToken, academyAdminFetch, academyFirestoreBase} from "@/lib/firebase-admin";

const bucket = process.env.NEXT_PUBLIC_ACADEMY_FIREBASE_STORAGE_BUCKET ?? "sesan-academy.firebasestorage.app";
const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const idToken = String(form.get("idToken") || "");
    const courseId = String(form.get("courseId") || "");
    const receipt = form.get("receipt");
    const buyer = await academyBuyer(idToken);
    if (!buyer || !courseId) return Response.json({error: "LOGIN_REQUIRED"}, {status: 401});
    if (!(receipt instanceof File)) return Response.json({error: "RECEIPT_REQUIRED"}, {status: 400});
    const extension = allowedTypes.get(receipt.type);
    if (!extension || receipt.size <= 0 || receipt.size > 5 * 1024 * 1024) {
      return Response.json({error: "INVALID_RECEIPT"}, {status: 400});
    }
    if (await paidAcademyPurchase(buyer.localId, courseId)) {
      return Response.json({status: "approved"});
    }

    const fields = await academyCourseDocument(courseId);
    const amountRiel = Number(fields?.priceRiel?.integerValue || 0);
    if (!fields || fields.status?.stringValue !== "published" || amountRiel < 100) {
      return Response.json({error: "COURSE_NOT_AVAILABLE"}, {status: 404});
    }

    const paymentId = `${buyer.localId}_${courseId}`;
    const existingResponse = await academyAdminFetch(
      `${academyFirestoreBase}/academyManualPayments/${encodeURIComponent(paymentId)}`,
    );
    if (existingResponse.ok) {
      const existing = await existingResponse.json() as {fields?: Record<string, {stringValue?: string}>};
      if (existing.fields?.status?.stringValue === "pending") return Response.json({status: "pending"});
    }

    const objectName = `manual-payment-receipts/${buyer.localId}/${courseId}-${Date.now()}.${extension}`;
    const token = await academyAdminAccessToken();
    const uploadUrl = new URL(`https://storage.googleapis.com/upload/storage/v1/b/${encodeURIComponent(bucket)}/o`);
    uploadUrl.searchParams.set("uploadType", "media");
    uploadUrl.searchParams.set("name", objectName);
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {Authorization: `Bearer ${token}`, "Content-Type": receipt.type},
      body: Buffer.from(await receipt.arrayBuffer()),
    });
    if (!uploadResponse.ok) throw new Error("RECEIPT_UPLOAD_FAILED");

    const now = new Date().toISOString();
    const saveResponse = await academyAdminFetch(
      `${academyFirestoreBase}/academyManualPayments/${encodeURIComponent(paymentId)}`,
      {method: "PATCH", body: JSON.stringify({fields: {
        paymentId: {stringValue: paymentId},
        buyerUid: {stringValue: buyer.localId},
        buyerEmail: {stringValue: buyer.email || ""},
        courseId: {stringValue: courseId},
        courseTitle: {stringValue: fields.titleKm?.stringValue || fields.titleEn?.stringValue || "Sesan Academy"},
        amountRiel: {integerValue: String(amountRiel)},
        currency: {stringValue: "KHR"},
        receiverName: {stringValue: "KLART DEAN"},
        receiptPath: {stringValue: objectName},
        receiptContentType: {stringValue: receipt.type},
        status: {stringValue: "pending"},
        adminNote: {stringValue: ""},
        createdAt: {stringValue: now},
        updatedAt: {stringValue: now},
      }})},
    );
    if (!saveResponse.ok) throw new Error("PAYMENT_SAVE_FAILED");
    return Response.json({status: "pending"});
  } catch (error) {
    console.error("Manual Academy payment submission failed", error);
    return Response.json({error: "SUBMIT_FAILED"}, {status: 500});
  }
}
