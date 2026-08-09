import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft, Clock3, Play, Star, UserRound, Video} from "lucide-react";
import {listPublishedAcademyCourses} from "@/lib/academy-firebase-rest";
import PayWayBuyButton from "../../PayWayBuyButton";

type PageProps = {
  params: Promise<{locale: string; creatorId: string}>;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale, creatorId} = await params;
  const courses = await listPublishedAcademyCourses().catch(() => []);
  const creatorCourses = courses.filter(course => course.creatorId === creatorId);
  const creatorName = creatorCourses[0]?.creatorName || "Creator";
  return {
    title: `${creatorName} | Sesan Academy`,
    description: locale === "km"
      ? `មើលមេរៀនទាំងអស់របស់ ${creatorName} នៅ Sesan Academy។`
      : `View all courses published by ${creatorName} on Sesan Academy.`,
  };
}

export default async function CreatorPublicProfile({params}: PageProps) {
  const {locale: rawLocale, creatorId} = await params;
  if (rawLocale !== "km" && rawLocale !== "en") notFound();
  const locale = rawLocale as "km" | "en";
  const km = locale === "km";
  const courses = await listPublishedAcademyCourses().catch(() => []);
  const creatorCourses = courses.filter(course => course.creatorId === creatorId);
  if (!creatorCourses.length) notFound();
  const creatorName = creatorCourses[0].creatorName || (km ? "អ្នកបង្កើតមេរៀន" : "Course creator");

  return <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href={`/${locale}/academy`} className="inline-flex items-center gap-2 font-black text-slate-600 hover:text-green-700"><ArrowLeft className="h-5 w-5" />{km ? "ត្រឡប់ទៅ Academy" : "Back to Academy"}</Link>
        <Link href={`/${locale}`} className="flex items-center gap-3"><img src="/sesan-logo.png" alt="Sesan" className="h-10 w-10 object-contain" /><div><p className="font-black text-green-700">SESAN</p><p className="text-[8px] font-black tracking-[.25em] text-amber-500">ACADEMY</p></div></Link>
      </div>
    </header>

    <section className="bg-slate-950 px-5 py-16 text-white lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-cyan-500 text-3xl font-black shadow-xl">{creatorName.slice(0, 1).toUpperCase()}</div>
        <div><p className="text-sm font-black uppercase tracking-[.2em] text-green-400">{km ? "គណនី CREATOR" : "CREATOR PROFILE"}</p><h1 className="mt-2 text-4xl font-black">{creatorName}</h1><p className="mt-3 inline-flex items-center gap-2 text-slate-300"><Video className="h-5 w-5 text-green-400" />{creatorCourses.length} {km ? "មេរៀនបានបង្ហោះ" : creatorCourses.length === 1 ? "published course" : "published courses"}</p></div>
      </div>
    </section>

    <section className="px-5 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-black">{km ? `មេរៀនរបស់ ${creatorName}` : `Courses by ${creatorName}`}</h2>
        <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {creatorCourses.map(course => {
            const title = km ? course.titleKm : course.titleEn;
            const description = km ? course.descriptionKm : course.descriptionEn;
            const duration = course.durationSeconds > 0 ? `${Math.floor(course.durationSeconds / 60)}:${String(course.durationSeconds % 60).padStart(2, "0")}` : "—:—";
            return <article key={course.id} className="overflow-hidden rounded-[28px] border-2 border-green-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-video bg-slate-900">{course.previewVideoUrl ? <video src={course.previewVideoUrl} poster={course.coverImage} controls controlsList="nodownload" preload="metadata" playsInline className="h-full w-full object-cover" /> : <><img src={course.coverImage} alt={title} className="h-full w-full object-cover" /><span className="absolute inset-0 flex items-center justify-center bg-slate-950/10"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-green-700"><Play className="ml-1 h-6 w-6 fill-current" /></span></span></>}<span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-black text-white"><Clock3 className="h-3.5 w-3.5" />{duration}</span></div>
              <div className="p-6"><h3 className="line-clamp-2 text-xl font-black">{title}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{description}</p><p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500"><UserRound className="h-4 w-4 text-green-600" />{creatorName}</p><div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4"><span className="inline-flex items-center gap-2 text-sm font-black"><Star className={`h-5 w-5 ${course.ratingCount > 0 ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />{course.ratingCount > 0 ? `${course.ratingAverage.toFixed(1)} (${course.ratingCount})` : km ? "មិនទាន់មាន Rating" : "No ratings yet"}</span><span className="text-xl font-black text-green-700">{course.priceRiel.toLocaleString()}៛</span></div><PayWayBuyButton courseId={course.id} priceRiel={course.priceRiel} locale={locale} /></div>
            </article>;
          })}
        </div>
      </div>
    </section>
  </main>;
}
