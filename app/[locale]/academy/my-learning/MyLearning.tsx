"use client";

import {FormEvent, useEffect, useState} from "react";
import Link from "next/link";
import {ArrowLeft, ArrowRight, BookOpen, Eye, EyeOff, LoaderCircle, Play} from "lucide-react";
import {AcademySession, refreshAcademySession, signInAcademyUser} from "@/lib/academy-firebase-rest";

const SESSION_KEY = "sesan-academy-buyer-session";
type Course = {id: string; titleKm: string; titleEn: string; creatorName: string; coverImage: string};

export default function MyLearning({locale}: {locale: "km" | "en"}) {
  const km = locale === "km";
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [loginRequired, setLoginRequired] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function loadCourses(provided?: AcademySession) {
    try {
      let session = provided ?? JSON.parse(localStorage.getItem(SESSION_KEY) || "null") as AcademySession | null;
      if (!session?.idToken) throw new Error("LOGIN_REQUIRED");
      if (session.expiresAt <= Date.now()) {
        session = await refreshAcademySession(session);
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      }
      const response = await fetch("/api/academy/my-courses", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({idToken: session.idToken})});
      if (!response.ok) throw new Error("LOGIN_REQUIRED");
      const data = await response.json() as {courses?: Course[]};
      setLoginRequired(false); setCourses(data.courses || []);
    } catch {setLoginRequired(true); setCourses([]);}
  }

  useEffect(() => {loadCourses();}, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setLoginError("");
    const data = new FormData(event.currentTarget);
    try {
      const session = await signInAcademyUser(String(data.get("email") || "").trim(), String(data.get("password") || ""));
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      await loadCourses(session);
    } catch {setLoginError(km ? "អ៊ីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវ។" : "Email or password is incorrect.");}
    finally {setLoading(false);}
  }

  return <main className="min-h-screen bg-[#f7f9fc] px-5 py-10 text-slate-950"><div className="mx-auto max-w-6xl">
    <div className="flex items-center justify-between"><Link href={`/${locale}/academy`} className="inline-flex items-center gap-2 font-bold text-slate-600"><ArrowLeft className="h-5 w-5" />{km ? "ត្រឡប់" : "Back"}</Link><span className="font-black text-green-700">SESAN ACADEMY</span></div>
    <div className="mt-12"><p className="text-sm font-black uppercase tracking-[.2em] text-green-700">MY LEARNING</p><h1 className="mt-3 text-4xl font-black">{km ? "មេរៀនរបស់ខ្ញុំ" : "My lessons"}</h1><p className="mt-3 text-slate-500">{km ? "មេរៀនទាំងអស់ដែលអ្នកបានទិញ។" : "All courses purchased with your account."}</p></div>
    {courses === null ? <div className="flex min-h-[40vh] items-center justify-center"><LoaderCircle className="h-12 w-12 animate-spin text-green-600" /></div>
      : loginRequired ? <div className="mx-auto mt-10 max-w-md rounded-3xl bg-white p-8 shadow-sm"><BookOpen className="mx-auto h-12 w-12 text-amber-500" /><h2 className="mt-4 text-center text-xl font-black">{km ? "ចូលគណនីដែលបានប្រើទិញ" : "Sign in to your purchasing account"}</h2><p className="mt-2 text-center text-sm leading-6 text-slate-500">{km ? "ប្រើអ៊ីមែល និង Password ដដែលដែលអ្នកបានបង្កើតពេលទិញ។ Password មានយ៉ាងតិច 6 តួ និងប្រកាន់អក្សរធំ/តូច។" : "Use the same email and password created during purchase. Passwords have at least 6 characters and are case-sensitive."}</p><form onSubmit={login} className="mt-6 space-y-4"><input required type="email" name="email" placeholder={km ? "អ៊ីមែល" : "Email"} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500" /><div className="relative"><input required minLength={6} type={showPassword ? "text" : "password"} name="password" placeholder={km ? "លេខសម្ងាត់ (យ៉ាងតិច 6 តួ)" : "Password (at least 6 characters)"} className="w-full rounded-2xl border border-slate-200 py-3 pl-4 pr-12 outline-none focus:border-green-500" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>{loginError && <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{loginError}</p>}<button disabled={loading} className="w-full rounded-2xl bg-green-600 px-5 py-3.5 font-black text-white disabled:opacity-60">{loading ? "Loading…" : km ? "ចូលគណនី" : "Sign in"}</button></form></div>
      : courses.length === 0 ? <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-sm"><BookOpen className="mx-auto h-12 w-12 text-slate-300" /><p className="mt-4 font-black">{km ? "អ្នកមិនទាន់មានមេរៀនទេ។" : "You do not have any lessons yet."}</p></div>
      : <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">{courses.map((course) => <article key={course.id} className="overflow-hidden rounded-3xl border border-green-200 bg-white shadow-sm"><div className="relative aspect-video bg-slate-900"><img src={course.coverImage} alt="" className="h-full w-full object-cover" /><span className="absolute inset-0 flex items-center justify-center"><Play className="h-14 w-14 rounded-full bg-white/90 p-4 text-green-700" /></span></div><div className="p-6"><h2 className="text-xl font-black">{km ? course.titleKm : course.titleEn}</h2><p className="mt-2 text-sm font-bold text-slate-500">{course.creatorName}</p><Link href={`/${locale}/academy/watch/${course.id}`} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 font-black text-white">{km ? "មើលវីដេអូ" : "Watch lesson"}<ArrowRight className="h-4 w-4" /></Link></div></article>)}</div>}
  </div></main>;
}
