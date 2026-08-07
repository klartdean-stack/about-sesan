import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft, ArrowRight, Bot, Check, Clock3, Code2, GraduationCap, Leaf, Play, Search, Sparkles, Users, Video} from "lucide-react";
import {academyCourses, type AcademyCategory, CREATOR_SHARE_RATE, MINIMUM_WITHDRAWAL_RIEL} from "@/lib/academy";

type PageProps = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{q?: string; category?: string}>;
};

const categories: {id: AcademyCategory | "all"; km: string; en: string; icon: typeof Code2}[] = [
  {id: "all", km: "ទាំងអស់", en: "All courses", icon: GraduationCap},
  {id: "ai-coding", km: "AI Coding", en: "AI Coding", icon: Code2},
  {id: "ai-video", km: "AI Video", en: "AI Video", icon: Video},
  {id: "agriculture", km: "កសិកម្ម", en: "Agriculture", icon: Leaf},
  {id: "business", km: "អាជីវកម្ម", en: "Business", icon: Bot},
];

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const km = locale === "km";
  return {
    title: km ? "Sesan Academy | រៀនជំនាញ និងលក់មេរៀនវីដេអូ" : "Sesan Academy | Learn Skills and Sell Video Lessons",
    description: km ? "ទីផ្សារមេរៀនវីដេអូសម្រាប់ AI បច្ចេកវិទ្យា កសិកម្ម និងអាជីវកម្ម។" : "A video learning marketplace for AI, technology, agriculture and business.",
  };
}

export default async function AcademyPage({params, searchParams}: PageProps) {
  const {locale: rawLocale} = await params;
  if (rawLocale !== "km" && rawLocale !== "en") notFound();
  const locale = rawLocale as "km" | "en";
  const filters = await searchParams;
  const q = filters.q?.trim().toLocaleLowerCase() ?? "";
  const category = categories.some((item) => item.id === filters.category) ? filters.category ?? "all" : "all";
  const text = (en: string, km: string) => locale === "km" ? km : en;
  const filtered = academyCourses.filter((course) => {
    const title = locale === "km" ? course.titleKm : course.titleEn;
    const description = locale === "km" ? course.descriptionKm : course.descriptionEn;
    return (category === "all" || course.category === category) && (!q || `${title} ${description} ${course.creatorName}`.toLocaleLowerCase().includes(q));
  });

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href={`/${locale}`} className="flex items-center gap-3"><img src="/sesan-logo.png" alt="Sesan" className="h-11 w-11 object-contain" /><div><p className="text-lg font-black text-green-700">SESAN</p><p className="text-[8px] font-black tracking-[0.3em] text-amber-500">ACADEMY</p></div></Link>
          <div className="flex items-center gap-2">
            <Link href={`/${locale}/academy/creator`} className="hidden rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-green-700 sm:inline-flex">{text("Become a creator", "ក្លាយជា Creator")}</Link>
            <Link href={`/${locale}`} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 hover:text-green-700"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">{text("Home", "ទំព័រដើម")}</span></Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-950 px-5 py-20 text-white lg:px-8 lg:py-28">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-green-500/20 blur-3xl" /><div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div><div className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm font-black text-green-300"><Sparkles className="h-4 w-4" />SESAN ACADEMY</div><h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">{text("Learn practical skills.", "រៀនជំនាញដែលប្រើបានពិត។")}<span className="block bg-gradient-to-r from-green-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">{text("Earn from your knowledge.", "រកចំណូលពីចំណេះដឹងរបស់អ្នក។")}</span></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{text("Short, affordable video lessons in AI, technology, agriculture and business—created for Cambodia.", "មេរៀនវីដេអូខ្លី តម្លៃសមរម្យ អំពី AI បច្ចេកវិទ្យា កសិកម្ម និងអាជីវកម្ម សម្រាប់ប្រជាជនកម្ពុជា។")}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#courses" className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-7 py-4 font-black text-white hover:bg-green-400">{text("Explore courses", "មើលមេរៀន")}<ArrowRight className="h-5 w-5" /></a><Link href={`/${locale}/academy/creator`} className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-4 font-black text-white hover:bg-white/15">{text("Start teaching", "ចាប់ផ្ដើមបង្រៀន")}</Link></div></div>
          <div className="grid gap-4 sm:grid-cols-2"><Stat value={`${Math.round(CREATOR_SHARE_RATE * 100)}%`} label={text("Creator earnings", "ចំណូល Creator")} color="green" /><Stat value="30%" label={text("Sesan commission", "កម្រៃ Sesan")} color="violet" /><Stat value={`${MINIMUM_WITHDRAWAL_RIEL.toLocaleString()}៛`} label={text("Minimum payout", "ដកប្រាក់អប្បបរមា")} color="amber" /><Stat value="7 days" label={text("Earning hold", "រយៈពេល Pending")} color="sky" /></div>
        </div>
      </section>

      <section id="courses" className="scroll-mt-24 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-green-700">{text("Video marketplace", "ទីផ្សារមេរៀនវីដេអូ")}</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{text("Learn something useful today", "រៀនអ្វីដែលមានប្រយោជន៍ថ្ងៃនេះ")}</h2></div><form action={`/${locale}/academy`} className="flex w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"><Search className="ml-3 mt-3 h-5 w-5 text-slate-400" /><input name="q" defaultValue={filters.q} placeholder={text("Search courses...", "ស្វែងរកមេរៀន...")} className="min-w-0 flex-1 px-3 outline-none" />{category !== "all" && <input type="hidden" name="category" value={category} />}<button className="rounded-xl bg-green-600 px-5 py-3 text-sm font-black text-white">{text("Search", "ស្វែងរក")}</button></form></div>

          <div className="mt-10 flex flex-wrap gap-3">{categories.map((item) => {const Icon = item.icon; const active = item.id === category; return <Link key={item.id} href={`/${locale}/academy${item.id === "all" ? "" : `?category=${item.id}`}#courses`} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black transition ${active ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-green-300 hover:text-green-700"}`}><Icon className="h-4 w-4" />{locale === "km" ? item.km : item.en}</Link>;})}</div>

          <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">{filtered.map((course) => <CourseCard key={course.id} course={course} locale={locale} />)}</div>
          {filtered.length === 0 && <div className="mt-10 rounded-3xl border border-slate-200 bg-white py-16 text-center"><Search className="mx-auto h-10 w-10 text-slate-300" /><p className="mt-4 text-xl font-black">{text("No courses found", "រកមិនឃើញមេរៀន")}</p><Link href={`/${locale}/academy#courses`} className="mt-5 inline-flex rounded-full bg-green-600 px-6 py-3 text-sm font-black text-white">{text("View all", "មើលទាំងអស់")}</Link></div>}
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8"><div className="mx-auto grid max-w-7xl items-center gap-12 rounded-[36px] bg-gradient-to-br from-green-50 to-sky-50 p-8 sm:p-12 lg:grid-cols-2"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-green-700">{text("For creators", "សម្រាប់ Creator")}</p><h2 className="mt-4 text-4xl font-black">{text("Turn your knowledge into income", "បម្លែងចំណេះដឹងរបស់អ្នកទៅជាចំណូល")}</h2><p className="mt-5 text-lg leading-8 text-slate-600">{text("Upload lessons, see every sale, track your 70% earnings and request a payout from 30,000 riel.", "Upload មេរៀន មើលការលក់ គ្រប់គ្រងចំណូល 70% និងស្នើដកប្រាក់ចាប់ពី 30,000 រៀល។")}</p><Link href={`/${locale}/academy/creator`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-4 font-black text-white hover:bg-green-700">{text("Open creator center", "ចូល Creator Center")}<ArrowRight className="h-5 w-5" /></Link></div><div className="grid gap-3">{[text("Creator profile and verification", "Profile និងការផ្ទៀងផ្ទាត់ Creator"), text("Course upload and approval", "Upload និងអនុម័តមេរៀន"), text("Sales and earnings dashboard", "Dashboard ការលក់ និងចំណូល"), text("Transparent withdrawal history", "ប្រវត្តិដកប្រាក់ច្បាស់លាស់")].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 font-bold shadow-sm"><span className="rounded-full bg-green-100 p-2 text-green-700"><Check className="h-4 w-4" /></span>{item}</div>)}</div></div></section>
    </main>
  );
}

function Stat({value, label, color}: {value: string; label: string; color: "green" | "violet" | "amber" | "sky"}) {const colors = {green: "from-green-500/25 to-green-500/5 text-green-300", violet: "from-violet-500/25 to-violet-500/5 text-violet-300", amber: "from-amber-500/25 to-amber-500/5 text-amber-300", sky: "from-sky-500/25 to-sky-500/5 text-sky-300"}; return <div className={`rounded-3xl border border-white/10 bg-gradient-to-br p-6 ${colors[color]}`}><p className="text-3xl font-black">{value}</p><p className="mt-2 text-sm font-bold text-slate-300">{label}</p></div>;}

function CourseCard({course, locale}: {course: (typeof academyCourses)[number]; locale: "km" | "en"}) {const title = locale === "km" ? course.titleKm : course.titleEn; const description = locale === "km" ? course.descriptionKm : course.descriptionEn; return <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl"><div className={`relative flex aspect-video items-center justify-center bg-gradient-to-br ${course.accent}`}><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.3),transparent_45%)]" /><span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur"><Play className="ml-1 h-7 w-7 fill-current" /></span>{course.featured && <span className="absolute left-4 top-4 rounded-full bg-amber-300 px-3 py-1.5 text-xs font-black text-slate-950">FEATURED</span>}<span className="absolute bottom-4 right-4 rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-black text-white backdrop-blur">{course.durationMinutes} min</span></div><div className="p-6"><p className="text-xs font-black uppercase tracking-[0.14em] text-green-700">{categories.find((item) => item.id === course.category)?.[locale]}</p><h3 className="mt-3 line-clamp-2 text-xl font-black leading-snug">{title}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{description}</p><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5"><div><p className="text-xs font-bold text-slate-400">{course.creatorName}</p><p className="mt-1 flex items-center gap-3 text-xs text-slate-500"><span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{course.lessons} lessons</span><span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{course.students}</span></p></div><p className="text-xl font-black text-green-700">{course.priceRiel.toLocaleString()}៛</p></div><button disabled className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-black text-white opacity-70">{locale === "km" ? "មកដល់ឆាប់ៗ" : "Coming soon"}<ArrowRight className="h-4 w-4" /></button></div></article>;}
