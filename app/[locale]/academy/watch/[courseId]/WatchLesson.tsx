"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {ArrowLeft, LoaderCircle, LockKeyhole} from "lucide-react";
import type {AcademySession} from "@/lib/academy-firebase-rest";
import RatingPanel from "./RatingPanel";

const SESSION_KEY = "sesan-academy-buyer-session";
type Course = {titleKm: string; titleEn: string; descriptionKm: string; descriptionEn: string; creatorName: string};

export default function WatchLesson({locale, courseId}: {locale: "km" | "en"; courseId: string}) {
  const km = locale === "km";
  const [course, setCourse] = useState<Course | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    let objectUrl = "";
    async function load() {
      try {
        const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null") as AcademySession | null;
        if (!session?.idToken) throw new Error("LOGIN_REQUIRED");
        const access = await fetch("/api/academy/course-access", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({idToken: session.idToken, courseId})});
        const accessData = await access.json() as {owned?: boolean; course?: Course};
        if (!access.ok || !accessData.owned || !accessData.course) throw new Error("PURCHASE_REQUIRED");
        setCourse(accessData.course);
        const video = await fetch("/api/academy/course-video", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({idToken: session.idToken, courseId})});
        if (!video.ok) throw new Error("VIDEO_LOAD_FAILED");
        objectUrl = URL.createObjectURL(await video.blob()); setVideoUrl(objectUrl);
      } catch {setError(km ? "មិនអាចបើកវីដេអូបានទេ។ សូមចូលគណនីដែលបានទិញ។" : "Could not open this video. Sign in with the purchasing account.");}
    }
    load(); return () => {if (objectUrl) URL.revokeObjectURL(objectUrl);};
  }, [courseId, km]);
  const title = course ? (km ? course.titleKm : course.titleEn) : "";
  const description = course ? (km ? course.descriptionKm : course.descriptionEn) : "";
  return <main className="min-h-screen bg-slate-950 text-white"><header className="border-b border-white/10 px-5 py-5"><div className="mx-auto flex max-w-6xl items-center justify-between"><Link href={`/${locale}/academy`} className="inline-flex items-center gap-2 font-bold"><ArrowLeft className="h-5 w-5" />{km ? "ត្រឡប់ទៅ Academy" : "Back to Academy"}</Link><span className="font-black text-green-400">SESAN ACADEMY</span></div></header><section className="mx-auto max-w-6xl px-5 py-10">{error ? <div className="rounded-3xl bg-white p-10 text-center text-slate-950"><LockKeyhole className="mx-auto h-14 w-14 text-amber-500" /><p className="mt-5 text-lg font-black">{error}</p></div> : !videoUrl ? <div className="flex min-h-[50vh] items-center justify-center"><LoaderCircle className="h-12 w-12 animate-spin text-green-400" /></div> : <><div className="overflow-hidden rounded-3xl bg-black shadow-2xl"><video src={videoUrl} controls controlsList="nodownload" className="aspect-video w-full" /></div><h1 className="mt-8 text-3xl font-black">{title}</h1><p className="mt-2 font-bold text-green-400">{course?.creatorName}</p><p className="mt-5 max-w-3xl leading-8 text-slate-300">{description}</p><RatingPanel courseId={courseId} locale={locale} /></>}</section></main>;
}
