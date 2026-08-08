import {NextResponse} from "next/server";
import {academyBuyer, paidAcademyPurchase} from "@/lib/academy-server";
import {academyAdminFetch, academyFirestoreBase} from "@/lib/firebase-admin";

type FirestoreDocument = {name: string; fields?: Record<string, {stringValue?: string; integerValue?: string}>};

export async function POST(request: Request) {
  try {
    const body = await request.json() as {idToken?: string; courseId?: string; rating?: number};
    const courseId = String(body.courseId || "").trim();
    const buyer = await academyBuyer(body.idToken);
    if (!buyer?.localId || !courseId) return NextResponse.json({error: "LOGIN_REQUIRED"}, {status: 401});
    if (!await paidAcademyPurchase(buyer.localId, courseId)) return NextResponse.json({error: "PURCHASE_REQUIRED"}, {status: 403});

    const ratingId = `${buyer.localId}_${courseId}`;
    if (body.rating === undefined) {
      const existing = await academyAdminFetch(`${academyFirestoreBase}/academyRatings/${encodeURIComponent(ratingId)}`);
      const document = await existing.json().catch(() => ({})) as FirestoreDocument;
      return NextResponse.json({rating: Number(document.fields?.rating?.integerValue || 0)});
    }

    const rating = Math.round(Number(body.rating));
    if (rating < 1 || rating > 5) return NextResponse.json({error: "INVALID_RATING"}, {status: 400});
    const now = new Date().toISOString();
    await academyAdminFetch(`${academyFirestoreBase}/academyRatings/${encodeURIComponent(ratingId)}`, {
      method: "PATCH",
      body: JSON.stringify({fields: {
        buyerUid: {stringValue: buyer.localId},
        courseId: {stringValue: courseId},
        rating: {integerValue: String(rating)},
        updatedAt: {timestampValue: now},
      }}),
    });

    const query = await academyAdminFetch(`${academyFirestoreBase}:runQuery`, {
      method: "POST",
      body: JSON.stringify({structuredQuery: {
        from: [{collectionId: "academyRatings"}],
        where: {fieldFilter: {field: {fieldPath: "courseId"}, op: "EQUAL", value: {stringValue: courseId}}},
      }}),
    });
    const rows = await query.json() as Array<{document?: FirestoreDocument}>;
    const ratings = rows.flatMap(row => row.document?.fields?.rating?.integerValue ? [Number(row.document.fields.rating.integerValue)] : []);
    const average = ratings.length ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length : 0;
    const updateMask = new URLSearchParams();
    updateMask.append("updateMask.fieldPaths", "ratingAverage");
    updateMask.append("updateMask.fieldPaths", "ratingCount");
    updateMask.append("updateMask.fieldPaths", "updatedAt");
    await academyAdminFetch(`${academyFirestoreBase}/academyCourses/${encodeURIComponent(courseId)}?${updateMask}`, {
      method: "PATCH",
      body: JSON.stringify({fields: {
        ratingAverage: {integerValue: String(Math.round(average * 100))},
        ratingCount: {integerValue: String(ratings.length)},
        updatedAt: {stringValue: now},
      }}),
    });
    return NextResponse.json({rating, average, count: ratings.length});
  } catch (error) {
    console.error("Academy rating failed", error);
    return NextResponse.json({error: "RATING_FAILED"}, {status: 500});
  }
}
