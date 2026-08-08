import {academyBuyer, academyCourseDocument} from "@/lib/academy-server";
import {academyAdminFetch, academyFirestoreBase} from "@/lib/firebase-admin";

export async function POST(request: Request) {
  const input = await request.json().catch(() => ({})) as {idToken?: string};
  const buyer = await academyBuyer(input.idToken);
  if (!buyer) return Response.json({error: "LOGIN_REQUIRED"}, {status: 401});
  const response = await academyAdminFetch(`${academyFirestoreBase}:runQuery`, {
    method: "POST",
    body: JSON.stringify({structuredQuery: {
      from: [{collectionId: "academyPurchases"}],
      where: {compositeFilter: {op: "AND", filters: [
        {fieldFilter: {field: {fieldPath: "buyerUid"}, op: "EQUAL", value: {stringValue: buyer.localId}}},
        {fieldFilter: {field: {fieldPath: "status"}, op: "EQUAL", value: {stringValue: "paid"}}},
      ]}},
    }}),
  });
  const rows = await response.json() as Array<{document?: {fields?: Record<string, {stringValue?: string}>}}>;
  if (!response.ok) return Response.json({error: "COURSE_LIST_FAILED"}, {status: 500});
  const courseIds = [...new Set(rows.map((row) => row.document?.fields?.courseId?.stringValue).filter(Boolean))] as string[];
  const courses = (await Promise.all(courseIds.map(async (id) => ({id, fields: await academyCourseDocument(id)}))))
    .filter((item) => item.fields)
    .map(({id, fields}) => ({
      id,
      titleKm: fields?.titleKm?.stringValue || "",
      titleEn: fields?.titleEn?.stringValue || "",
      creatorName: fields?.creatorName?.stringValue || "",
      coverImage: fields?.coverImage?.stringValue || "",
    }));
  return Response.json({courses});
}
