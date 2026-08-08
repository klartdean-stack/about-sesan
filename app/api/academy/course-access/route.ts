import {academyBuyer, academyCourseDocument, paidAcademyPurchase} from "@/lib/academy-server";

export async function POST(request: Request) {
  const input = await request.json().catch(() => ({})) as {idToken?: string; courseId?: string};
  const buyer = await academyBuyer(input.idToken);
  if (!buyer || !input.courseId) return Response.json({owned: false}, {status: 401});
  const owned = await paidAcademyPurchase(buyer.localId, input.courseId);
  if (!owned) return Response.json({owned: false});
  const fields = await academyCourseDocument(input.courseId);
  if (!fields) return Response.json({owned: false}, {status: 404});
  return Response.json({owned: true, course: {
    id: input.courseId,
    titleKm: fields.titleKm?.stringValue || "",
    titleEn: fields.titleEn?.stringValue || "",
    descriptionKm: fields.descriptionKm?.stringValue || "",
    descriptionEn: fields.descriptionEn?.stringValue || "",
    creatorName: fields.creatorName?.stringValue || "",
    coverImage: fields.coverImage?.stringValue || "",
    durationSeconds: Number(fields.durationSeconds?.integerValue || 0),
  }});
}
