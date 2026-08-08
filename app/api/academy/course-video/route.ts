import {academyAdminAccessToken} from "@/lib/firebase-admin";
import {academyBuyer, academyCourseDocument, paidAcademyPurchase} from "@/lib/academy-server";

const storageBucket = process.env.NEXT_PUBLIC_ACADEMY_FIREBASE_STORAGE_BUCKET ?? "sesan-academy.firebasestorage.app";

export async function POST(request: Request) {
  const input = await request.json().catch(() => ({})) as {idToken?: string; courseId?: string};
  const buyer = await academyBuyer(input.idToken);
  if (!buyer || !input.courseId) return Response.json({error: "LOGIN_REQUIRED"}, {status: 401});
  if (!await paidAcademyPurchase(buyer.localId, input.courseId)) return Response.json({error: "PURCHASE_REQUIRED"}, {status: 403});
  const fields = await academyCourseDocument(input.courseId);
  const path = fields?.videoPath?.stringValue;
  if (!path) return Response.json({error: "VIDEO_NOT_FOUND"}, {status: 404});
  const token = await academyAdminAccessToken();
  const video = await fetch(`https://storage.googleapis.com/download/storage/v1/b/${encodeURIComponent(storageBucket)}/o/${encodeURIComponent(path)}?alt=media`, {
    headers: {Authorization: `Bearer ${token}`}, cache: "no-store",
  });
  if (!video.ok || !video.body) return Response.json({error: "VIDEO_LOAD_FAILED"}, {status: 502});
  return new Response(video.body, {headers: {
    "Content-Type": video.headers.get("content-type") || "video/mp4",
    "Content-Length": video.headers.get("content-length") || "",
    "Cache-Control": "private, no-store",
  }});
}
