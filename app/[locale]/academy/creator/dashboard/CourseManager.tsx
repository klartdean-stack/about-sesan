"use client";

import {FormEvent, useEffect, useState} from "react";
import {BookOpen, CheckCircle2, Clock3, Play, Plus, Upload, Video, XCircle} from "lucide-react";
import {AcademySession, AcademyCourseRecord, CreatorApplication, getAcademyVideoBlobUrl, listCreatorCourses, readableAcademyError, submitAcademyCourse, uploadAcademyCourseFile} from "@/lib/academy-firebase-rest";

const categories = [
  ["ai-coding", "AI Coding"], ["ai-video", "AI Video"],
  ["agriculture", "កសិកម្ម / Agriculture"], ["food-production", "ផលិតអាហារ / Food Production"],
  ["home-products", "ផលិតផលប្រើប្រាស់ / Home Products"], ["technical-repair", "ជំនាញជួសជុល / Technical Repair"],
  ["business", "អាជីវកម្ម / Business"],
];

export default function CourseManager({session, application, locale}: {session: AcademySession; application: CreatorApplication; locale: "km" | "en"}) {
  const t = (en: string, km: string) => locale === "km" ? km : en;
  const [courses, setCourses] = useState<AcademyCourseRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<{courseId: string; url: string} | null>(null);

  useEffect(() => {listCreatorCourses(session).then(setCourses).catch(error => setMessage(readableAcademyError(error))).finally(() => setLoading(false));}, [session]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const cover = data.get("cover") as File;
    const video = data.get("video") as File;
    if (!cover?.size || !video?.size) {setMessage(t("Please select a cover and video.", "សូមជ្រើសរូបគម្រប និងវីដេអូ។")); setLoading(false); return;}
    if (cover.size > 5 * 1024 * 1024) {setMessage(t("Cover must be under 5MB.", "រូបគម្របត្រូវតូចជាង 5MB។")); setLoading(false); return;}
    if (video.size > 500 * 1024 * 1024) {setMessage(t("Video must be under 500MB.", "វីដេអូត្រូវតូចជាង 500MB។")); setLoading(false); return;}
    try {
      setMessage(t("Uploading cover…", "កំពុង Upload រូបគម្រប…"));
      const uploadedCover = await uploadAcademyCourseFile(session, cover, "cover");
      setMessage(t("Uploading video… Please keep this page open.", "កំពុង Upload វីដេអូ… សូមកុំបិទទំព័រនេះ។"));
      const uploadedVideo = await uploadAcademyCourseFile(session, video, "video");
      const course = await submitAcademyCourse(session, {
        creatorName: application.fullName,
        titleKm: String(data.get("titleKm") || "").trim(),
        titleEn: String(data.get("titleEn") || "").trim(),
        descriptionKm: String(data.get("descriptionKm") || "").trim(),
        descriptionEn: String(data.get("descriptionEn") || "").trim(),
        category: String(data.get("category") || ""),
        priceRiel: Number(data.get("priceRiel")) || 0,
        coverImage: uploadedCover.publicUrl,
        coverPath: uploadedCover.path,
        videoPath: uploadedVideo.path,
        videoFileName: video.name,
      });
      setCourses(items => [course, ...items]); form.reset(); setShowForm(false);
      setMessage(t("Course submitted for admin review.", "បានផ្ញើមេរៀនទៅ Admin ពិនិត្យរួចរាល់។"));
    } catch (error) {setMessage(readableAcademyError(error));} finally {setLoading(false);}
  }

  async function previewVideo(course: AcademyCourseRecord) {
    if (preview?.courseId === course.id) {URL.revokeObjectURL(preview.url); setPreview(null); return;}
    setLoading(true); setMessage(t("Preparing video…", "កំពុងរៀបចំវីដេអូ…"));
    try {
      const url = await getAcademyVideoBlobUrl(session, course.videoPath);
      if (preview) URL.revokeObjectURL(preview.url);
      setPreview({courseId: course.id, url}); setMessage("");
    } catch (error) {setMessage(readableAcademyError(error));} finally {setLoading(false);}
  }

  return <div>
    <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-3xl font-black">{t("My courses", "មេរៀនរបស់ខ្ញុំ")}</h2><p className="mt-2 text-sm text-slate-500">{t("Upload a course and send it to Academy Admin for review.", "Upload មេរៀន ហើយផ្ញើទៅ Academy Admin ពិនិត្យ។")}</p></div><button onClick={() => setShowForm(value => !value)} className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 font-black text-white"><Plus className="h-5 w-5" />{t("Add course", "បន្ថែមមេរៀន")}</button></div>
    {message && <p className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm font-bold text-amber-800">{message}</p>}
    {showForm && <form onSubmit={submit} className="mt-6 grid gap-4 rounded-[26px] bg-slate-50 p-5 md:grid-cols-2">
      <Field name="titleKm" label="ចំណងជើងខ្មែរ" required /><Field name="titleEn" label="English title" required />
      <TextArea name="descriptionKm" label="សេចក្ដីពិពណ៌នាខ្មែរ" required /><TextArea name="descriptionEn" label="English description" required />
      <label className="text-sm font-bold text-slate-700">{t("Category", "ប្រភេទ")}<select name="category" required className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3">{categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <Field name="priceRiel" type="number" min="1000" step="500" label={t("Price (Riel)", "តម្លៃ (រៀល)")} placeholder="5000" required />
      <FileField name="cover" accept="image/*" icon={Upload} label={t("Cover image (max 5MB)", "រូបគម្រប (អតិបរមា 5MB)")} />
      <FileField name="video" accept="video/*" icon={Video} label={t("Lesson video (max 500MB)", "វីដេអូមេរៀន (អតិបរមា 500MB)")} />
      <button disabled={loading} className="md:col-span-2 rounded-2xl bg-slate-950 px-5 py-4 font-black text-white disabled:opacity-50">{loading ? t("Uploading…", "កំពុង Upload…") : t("Submit for review", "ផ្ញើឱ្យ Admin ពិនិត្យ")}</button>
    </form>}
    <div className="mt-6 grid gap-4 md:grid-cols-2">{courses.map(course => <article key={course.id} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white"><img src={course.coverImage} alt="" className="h-36 w-full object-cover" /><div className="p-5"><div className="flex items-start justify-between gap-3"><h3 className="font-black">{locale === "km" ? course.titleKm : course.titleEn}</h3><CourseStatus status={course.status} /></div><p className="mt-3 text-lg font-black text-green-700">{course.priceRiel.toLocaleString()}៛</p><button disabled={loading} onClick={() => previewVideo(course)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white"><Play className="h-4 w-4" />{preview?.courseId === course.id ? t("Close video", "បិទវីដេអូ") : t("Watch my video", "មើលវីដេអូរបស់ខ្ញុំ")}</button>{preview?.courseId === course.id && <video src={preview.url} controls playsInline className="mt-3 w-full rounded-xl bg-black" />}{course.adminNote && <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">Admin: {course.adminNote}</p>}</div></article>)}{!loading && courses.length === 0 && <div className="md:col-span-2 rounded-[24px] border border-dashed border-slate-300 py-14 text-center text-slate-400"><BookOpen className="mx-auto h-10 w-10" /><p className="mt-3 font-bold">{t("No courses yet.", "មិនទាន់មានមេរៀន។")}</p></div>}</div>
  </div>;
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & {label: string}) {const {label, ...input} = props; return <label className="text-sm font-bold text-slate-700">{label}<input {...input} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-green-500" /></label>;}
function TextArea({name, label, required}: {name: string; label: string; required?: boolean}) {return <label className="text-sm font-bold text-slate-700">{label}<textarea name={name} required={required} rows={4} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-green-500" /></label>;}
function FileField({name, accept, icon: Icon, label}: {name: string; accept: string; icon: typeof Upload; label: string}) {return <label className="rounded-2xl border border-dashed border-green-300 bg-green-50 p-4 text-sm font-black text-green-800"><Icon className="mb-2 h-6 w-6" />{label}<input name={name} type="file" accept={accept} required className="mt-3 block w-full text-xs" /></label>;}
function CourseStatus({status}: {status: AcademyCourseRecord["status"]}) {const Icon = status === "published" ? CheckCircle2 : status === "rejected" ? XCircle : Clock3; const style = status === "published" ? "bg-green-100 text-green-700" : status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"; return <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black ${style}`}><Icon className="h-3.5 w-3.5" />{status}</span>;}
