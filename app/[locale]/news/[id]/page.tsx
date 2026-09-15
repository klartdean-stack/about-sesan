import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft, CalendarDays, Eye} from "lucide-react";
import {getPublishedNewsArticle, incrementNewsViews} from "@/lib/news-firebase";

type PageProps = {params: Promise<{locale: string; id: string}>};
const categoryKm: Record<string, string> = {"Company News":"ព័ត៌មានក្រុមហ៊ុន","Sesan App Updates":"បច្ចុប្បន្នភាព Sesan App","Events & Programs":"ព្រឹត្តិការណ៍ និងកម្មវិធី",Partnerships:"ដៃគូសហការ",Milestones:"សមិទ្ធផលសំខាន់ៗ",Announcements:"សេចក្តីជូនដំណឹង"};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale, id} = await params;
  try { const a = await getPublishedNewsArticle(id); if (!a) return {}; return {title: `${locale === "km" ? a.titleKm : a.titleEn} | Sesan Group`, description: locale === "km" ? a.summaryKm : a.summaryEn}; } catch { return {}; }
}

export default async function NewsDetailPage({params}: PageProps) {
  const {locale, id} = await params;
  if (locale !== "km" && locale !== "en") notFound();
  let article;
  try { article = await getPublishedNewsArticle(id); } catch { notFound(); }
  if (!article) notFound();
  incrementNewsViews(id).catch(() => undefined);
  const km = locale === "km";
  const title = km ? article.titleKm : article.titleEn;
  const summary = km ? article.summaryKm : article.summaryEn;
  const content = km ? article.contentKm : article.contentEn;
  const date = new Intl.DateTimeFormat(km ? "km-KH" : "en-GB", {day:"numeric",month:"long",year:"numeric"}).format(new Date(article.publishedAt || article.updatedAt));

  return <main className="min-h-screen bg-white text-slate-950">
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
      <Link href={`/${locale}/news`} className="inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-green-700"><ArrowLeft className="h-4 w-4" />{km ? "ត្រឡប់ទៅព័ត៌មាន" : "Back to News"}</Link>
      <header className="mx-auto mt-10 max-w-4xl text-center"><span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-sm font-black text-green-700">{km ? categoryKm[article.category] ?? article.category : article.category}</span><h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl">{title}</h1><p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">{summary}</p><div className="mt-6 flex items-center justify-center gap-5 text-sm font-bold text-slate-400"><span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" />{date}</span><span className="inline-flex items-center gap-2"><Eye className="h-4 w-4" />{article.views.toLocaleString()}</span></div></header>
      {article.coverImage && <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-slate-100"><Image src={article.coverImage} alt={title} fill className="object-cover" priority unoptimized /></div>}
      <article className="prose prose-slate mx-auto mt-10 max-w-3xl text-[17px] leading-8" dangerouslySetInnerHTML={{__html: content}} />
      <div className="mx-auto mt-12 max-w-3xl border-t border-slate-200 pt-8"><Link href={`/${locale}/news`} className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-black text-white hover:bg-green-700"><ArrowLeft className="h-4 w-4" />{km ? "មើលព័ត៌មានផ្សេងទៀត" : "More News"}</Link></div>
    </div>
  </main>;
}
