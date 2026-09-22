import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft, ArrowRight, CalendarDays, Newspaper} from "lucide-react";
import {listPublishedNewsArticles} from "@/lib/news-firebase";
import LanguageSwitcher from "@/app/LanguageSwitcher";

const locales = ["en", "km"] as const;
type PageProps = {params: Promise<{locale: string}>; searchParams?: Promise<{category?: string}>};

const categories = ["Company News", "Sesan App Updates", "Events & Programs", "Partnerships", "Milestones", "Announcements"];
const categoryKm: Record<string, string> = {
  "Company News": "ព័ត៌មានក្រុមហ៊ុន", "Sesan App Updates": "បច្ចុប្បន្នភាព Sesan App",
  "Events & Programs": "ព្រឹត្តិការណ៍ និងកម្មវិធី", Partnerships: "ដៃគូសហការ",
  Milestones: "សមិទ្ធផលសំខាន់ៗ", Announcements: "សេចក្តីជូនដំណឹង",
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return {title: locale === "km" ? "ព័ត៌មាន និងបច្ចុប្បន្នភាព | Sesan Group" : "News & Updates | Sesan Group", description: locale === "km" ? "ព័ត៌មានថ្មីៗ ព្រឹត្តិការណ៍ ភាពជាដៃគូ និងបច្ចុប្បន្នភាពពី Sesan Group។" : "Company news, events, partnerships, milestones and Sesan App updates from Sesan Group."};
}

export default async function NewsPage({params, searchParams}: PageProps) {
  const {locale} = await params;
  if (!locales.includes(locale as "en" | "km")) notFound();
  const km = locale === "km";
  const selected = (await searchParams)?.category ?? "";
  let articles = [] as Awaited<ReturnType<typeof listPublishedNewsArticles>>;
  try { articles = await listPublishedNewsArticles(); } catch { articles = []; }
  const filtered = selected ? articles.filter((a) => a.category === selected) : articles;
  const featured = articles.find((a) => a.featured) ?? articles[0];

  return <main className="min-h-screen bg-slate-50 text-slate-950">
    <section className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex items-center justify-between gap-3">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white"><ArrowLeft className="h-4 w-4" />{km ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}</Link>
          <LanguageSwitcher locale={locale} />
        </div>
        <div className="mt-10 max-w-3xl"><div className="inline-flex items-center gap-2 rounded-full bg-green-500/15 px-4 py-2 text-sm font-black text-green-300"><Newspaper className="h-4 w-4" />{km ? "SESAN NEWSROOM" : "SESAN NEWSROOM"}</div>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">{km ? "ព័ត៌មាន និងបច្ចុប្បន្នភាព" : "News & Updates"}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">{km ? "តាមដានព័ត៌មានក្រុមហ៊ុន Sesan App ព្រឹត្តិការណ៍ ភាពជាដៃគូ សមិទ្ធផល និងសេចក្តីជូនដំណឹងថ្មីៗ។" : "Follow Sesan Group company news, app updates, events, partnerships, milestones and announcements."}</p>
        </div>
      </div>
    </section>

    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="flex gap-2 overflow-x-auto pb-3">
        <Link href={`/${locale}/news`} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-black ${!selected ? "bg-green-600 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"}`}>{km ? "ទាំងអស់" : "All"}</Link>
        {categories.map((category) => <Link key={category} href={`/${locale}/news?category=${encodeURIComponent(category)}`} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-black ${selected === category ? "bg-green-600 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"}`}>{km ? categoryKm[category] : category}</Link>)}
      </div>

      {!selected && featured && <Link href={`/${locale}/news/${featured.id}`} className="mt-7 grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 lg:grid-cols-2">
        <div className="relative min-h-72 bg-slate-200">{featured.coverImage ? <Image src={featured.coverImage} alt={km ? featured.titleKm : featured.titleEn} fill className="object-cover" unoptimized /> : <div className="flex h-full min-h-72 items-center justify-center"><Newspaper className="h-16 w-16 text-slate-400" /></div>}</div>
        <div className="p-7 sm:p-10"><span className="text-sm font-black text-green-700">{km ? categoryKm[featured.category] ?? featured.category : featured.category}</span><h2 className="mt-3 text-3xl font-black leading-tight">{km ? featured.titleKm : featured.titleEn}</h2><p className="mt-4 line-clamp-3 leading-7 text-slate-600">{km ? featured.summaryKm : featured.summaryEn}</p><span className="mt-7 inline-flex items-center gap-2 font-black text-green-700">{km ? "អានព័ត៌មាន" : "Read story"}<ArrowRight className="h-4 w-4" /></span></div>
      </Link>}

      <section className="mt-10"><h2 className="text-2xl font-black">{selected ? (km ? categoryKm[selected] ?? selected : selected) : (km ? "ព័ត៌មានថ្មីៗ" : "Latest updates")}</h2>
        {filtered.length === 0 ? <div className="mt-6 rounded-3xl bg-white p-10 text-center ring-1 ring-slate-200"><Newspaper className="mx-auto h-10 w-10 text-slate-300" /><p className="mt-4 font-bold text-slate-500">{km ? "មិនទាន់មានព័ត៌មានក្នុងប្រភេទនេះទេ។" : "No news has been published here yet."}</p></div> : <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.map((article) => <Link key={article.id} href={`/${locale}/news/${article.id}`} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1"><div className="relative h-52 bg-slate-200">{article.coverImage ? <Image src={article.coverImage} alt={km ? article.titleKm : article.titleEn} fill className="object-cover" unoptimized /> : <div className="flex h-full items-center justify-center"><Newspaper className="h-12 w-12 text-slate-400" /></div>}</div><div className="p-6"><span className="text-xs font-black uppercase tracking-wide text-green-700">{km ? categoryKm[article.category] ?? article.category : article.category}</span><h3 className="mt-2 text-xl font-black leading-snug">{km ? article.titleKm : article.titleEn}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{km ? article.summaryKm : article.summaryEn}</p><div className="mt-5 flex items-center gap-2 text-xs font-bold text-slate-400"><CalendarDays className="h-4 w-4" />{new Intl.DateTimeFormat(km ? "km-KH" : "en-GB", {day: "numeric", month: "short", year: "numeric"}).format(new Date(article.publishedAt || article.updatedAt))}</div></div></Link>)}</div>}
      </section>
    </div>
  </main>;
}
