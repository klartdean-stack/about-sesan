"use client";

import {useEffect, useState} from "react";
import {BadgeCheck, BookOpen, Play, RefreshCw, XCircle} from "lucide-react";
import {AcademyCourseRecord, AcademySession, getAcademyVideoBlobUrl, listAllAcademyCourses, readableAcademyError, reviewAcademyCourse} from "@/lib/academy-firebase-rest";

export default function CourseReview({session, locale}: {session: AcademySession; locale: "km" | "en"}) {
  const t = (en: string, km: string) => locale === "km" ? km : en;
  const [courses, setCourses] = useState<AcademyCourseRecord[]>([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<{courseId: string; url: string} | null>(null);

  async function load() {setLoading(true); try {setCourses(await listAllAcademyCourses(session));} catch (error) {setMessage(readableAcademyError(error));} finally {setLoading(false);}}
  useEffect(() => {load();}, [session]);

  async function review(course: AcademyCourseRecord, status: "published" | "rejected") {
    const note = window.prompt(t("Admin note (optional)", "កំណត់ចំណាំ Admin (មិនបង្ខំ)"), course.adminNote) ?? course.adminNote;
    setLoading(true); setMessage("");
    try {const updated = await reviewAcademyCourse(session, course, status, note); setCourses(items => items.map(item => item.id === updated.id ? updated : item));}
    catch (error) {setMessage(readableAcademyError(error));} finally {setLoading(false);}
  }

  async function previewVideo(course: AcademyCourseRecord) {
    if (preview?.courseId === course.id) {URL.revokeObjectURL(preview.url); setPreview(null); return;}
    setLoading(true); setMessage(t("Preparing secure video preview…", "កំពុងរៀបចំវីដេអូសម្រាប់មើល…"));
    try {const url = await getAcademyVideoBlobUrl(session, course.videoPath); if (preview) URL.revokeObjectURL(preview.url); setPreview({courseId: course.id, url}); setMessage("");}
    catch (error) {setMessage(readableAcademyError(error));} finally {setLoading(false);}
  }

  const visible = courses.filter(course => filter === "all" || course.status === filter);
  const pending = courses.filter(course => course.status === "pending").length;
  return <section className="mt-12 border-t border-slate-200 pt-10">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[0.18em] text-violet-700">COURSE REVIEW</p><h2 className="mt-2 text-3xl font-black">{t("Course approvals", "ការអនុម័តមេរៀន")}</h2><p className="mt-2 text-sm text-slate-500">{pending} {t("courses waiting", "មេរៀនកំពុងរង់ចាំ")}</p></div><div className="flex gap-2"><button onClick={load} className="rounded-xl border border-slate-200 p-3"><RefreshCw className="h-5 w-5" /></button><select value={filter} onChange={event => setFilter(event.target.value)} className="rounded-xl border border-slate-200 px-4 font-bold"><option value="pending">Pending</option><option value="published">Published</option><option value="rejected">Rejected</option><option value="all">All</option></select></div></div>
    {message && <p className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm font-bold text-amber-800">{message}</p>}
    <div className="mt-6 grid gap-5 lg:grid-cols-2">{visible.map(course => <article key={course.id} className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm"><img src={course.coverImage} alt="" className="h-48 w-full object-cover" /><div className="p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-wider text-green-700">{course.category}</p><h3 className="mt-2 text-xl font-black">{course.titleKm}</h3><p className="mt-1 text-sm font-bold text-slate-500">{course.titleEn}</p></div><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-700">{course.status}</span></div><p className="mt-4 text-sm leading-6 text-slate-600">{course.descriptionKm}</p><div className="mt-4 flex items-center justify-between"><p className="text-sm font-bold text-slate-500">Creator: {course.creatorName}</p><strong className="text-xl text-green-700">{course.priceRiel.toLocaleString()}៛</strong></div><button disabled={loading} onClick={() => previewVideo(course)} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 font-black text-white"><Play className="h-4 w-4" />{preview?.courseId === course.id ? t("Close preview", "បិទវីដេអូ") : t("Secure video preview", "មើលវីដេអូសុវត្ថិភាព")}</button>{preview?.courseId === course.id && <video src={preview.url} controls playsInline className="mt-3 w-full rounded-xl bg-black" />}{course.adminNote && <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">Admin: {course.adminNote}</p>}<div className="mt-4 grid grid-cols-2 gap-3"><button disabled={loading} onClick={() => review(course, "rejected")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 font-black text-red-700"><XCircle className="h-4 w-4" />{t("Reject", "បដិសេធ")}</button><button disabled={loading} onClick={() => review(course, "published")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-black text-white"><BadgeCheck className="h-4 w-4" />{t("Publish", "អនុម័ត")}</button></div></div></article>)}{!loading && visible.length === 0 && <div className="lg:col-span-2 rounded-[26px] border border-dashed border-slate-300 py-16 text-center text-slate-400"><BookOpen className="mx-auto h-10 w-10" /><p className="mt-3 font-bold">{t("No courses in this list.", "មិនមានមេរៀនក្នុងបញ្ជីនេះ។")}</p></div>}</div>
  </section>;
}
