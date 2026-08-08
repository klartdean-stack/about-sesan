"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {ArrowLeft, ArrowRight, BookOpen, LoaderCircle, Play} from "lucide-react";
import type {AcademySession} from "@/lib/academy-firebase-rest";

const SESSION_KEY = "sesan-academy-buyer-session";
type Course = {id: string; titleKm: string; titleEn: string; creatorName: string; coverImage: string};

export default function MyLearning({locale}: {locale: "km" | "en"}) {
  const km = locale === "km";
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null") as AcademySession | null;
      if (!session?.idToken) {setError(true); setCourses([]); return;}
      fetch("/api/academy/my-courses", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({idToken: session.idToken})})
        .then(async (response) => {if (!response.ok) throw new Error(); return response.json();})
        .then((data: {courses?: Course[]}) => setCourses(data.courses || [])).catch(() => {setError(true); setCourses([]);});
    } catch {setError(true); setCourses([]);}
  }, []);
  return <main className="min-h-screen bg-[#f7f9fc] px-5 py-10 text-slate-950"><div className="mx-auto max-w-6xl"><div className="flex items-center justify-between"><Link href={`/${locale}/academy`} className="inline-flex items-center gap-2 font-bold text-slate-600"><ArrowLeft className="h-5 w-5" />{km ? "ត្រឡប់" : "Back"}</Link><span className="font-black text-green-700">SESAN ACADEMY</span></div><div className="mt-12"><p className="text-sm font-black uppercase tracking-[.2em] text-green-700">MY LEARNING</p><h1 className="mt-3 text-4xl font-black">{km ? "មេរៀនរបស់ខ្ញុំ" : "My lessons"}</h1><p className="mt-3 text-slate-500">{km ? "មេរៀនទាំងអស់ដែលអ្នកបានទិញ។" : "All courses purchased with your account."}</p></div>{courses === null ? <div className="flex min-h-[40vh] items-center justify-center"><LoaderCircle className="h-12 w-12 animate-spin text-green-600" /></div> : error ? <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-sm"><BookOpen className="mx-auto h-12 w-12 text-amber-500" /><p className="mt-4 font-black">{km ? "សូមត្រឡប់ទៅ Academy ហើយចូលគណនីដែលបានប្រើទិញ។" : "Return to the Academy and sign in with the purchasing account."}</p></div> : courses.length === 0 ? <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-sm"><BookOpen className="mx-auto h-12 w-12 text-slate-300" /><p className="mt-4 font-black">{km ? "អ្នកមិនទាន់មានមេរៀនទេ។" : "You do not have any lessons yet."}</p></div> : <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">{courses.map((course) => <article key={course.id} className="overflow-hidden rounded-3xl border border-green-200 bg-white shadow-sm"><div className="relative aspect-video bg-slate-900"><img src={course.coverImage} alt="" className="h-full w-full object-cover" /><span className="absolute inset-0 flex items-center justify-center"><Play className="h-14 w-14 rounded-full bg-white/90 p-4 text-green-700" /></span></div><div className="p-6"><h2 className="text-xl font-black">{km ? course.titleKm : course.titleEn}</h2><p className="mt-2 text-sm font-bold text-slate-500">{course.creatorName}</p><Link href={`/${locale}/academy/watch/${course.id}`} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 font-black text-white">{km ? "មើលវីដេអូ" : "Watch lesson"}<ArrowRight className="h-4 w-4" /></Link></div></article>)}</div>}</div></main>;
}
