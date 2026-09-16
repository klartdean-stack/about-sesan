import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft, CalendarDays, Eye, Monitor} from "lucide-react";
import {getPublishedNewsArticle, incrementNewsViews} from "@/lib/news-firebase";
import KnowledgeContent from "../../knowledge/KnowledgeContent";
import ShareButtons from "../../knowledge/[id]/ShareButtons";
import {AppleStoreIcon, GooglePlayIcon} from "../../StoreIcons";

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
  const articleUrl = `https://about.sesanshop.com/${locale}/news/${article.id}`;

  return <main className="min-h-screen bg-white text-slate-950">
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
      <Link href={`/${locale}/news`} className="inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-green-700"><ArrowLeft className="h-4 w-4" />{km ? "ត្រឡប់ទៅព័ត៌មាន" : "Back to News"}</Link>
      <header className="mx-auto mt-10 max-w-4xl text-center"><span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-sm font-black text-green-700">{km ? categoryKm[article.category] ?? article.category : article.category}</span><h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl">{title}</h1><p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">{summary}</p><div className="mt-6 flex items-center justify-center gap-5 text-sm font-bold text-slate-400"><span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" />{date}</span><span className="inline-flex items-center gap-2"><Eye className="h-4 w-4" />{article.views.toLocaleString()}</span></div></header>
      {article.coverImage && <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-slate-100"><Image src={article.coverImage} alt={title} fill className="object-cover" priority unoptimized /></div>}
      <article className="mx-auto mt-10 max-w-3xl">
        <KnowledgeContent content={content} />
        <ShareButtons title={title} url={articleUrl} locale={locale} />
      </article>
      <div className="mx-auto mt-12 max-w-3xl border-t border-slate-200 pt-8"><Link href={`/${locale}/news`} className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-black text-white hover:bg-green-700"><ArrowLeft className="h-4 w-4" />{km ? "មើលព័ត៌មានផ្សេងទៀត" : "More News"}</Link></div>
    </div>

    <section className="border-t border-green-100 bg-gradient-to-br from-green-50 via-white to-sky-50 px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] bg-slate-950 px-6 py-10 text-white shadow-2xl sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-green-400">SESAN APP</p>
          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">{km ? "ប្រើ Sesan Shop តាម Web ឬទាញយក App" : "Use Sesan Shop on the web or download the app"}</h2>
          <p className="mt-4 leading-8 text-slate-300">{km ? "ចូល sesanshop.com តាមកុំព្យូទ័រ ឬប្រើ Sesan App ដើម្បីស្វែងរកផលិតផលកសិកម្ម និងទាក់ទងអ្នកលក់។" : "Visit sesanshop.com on your computer or use Sesan App to explore agricultural products and contact sellers."}</p>
        </div>
        <div className="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
          <a href="https://sesanshop.com" target="_blank" rel="noopener noreferrer" className="inline-flex min-w-48 items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 font-black text-slate-950 transition hover:-translate-y-1 hover:bg-slate-100">
            <Monitor className="h-6 w-6 text-sky-600" />
            <span><small className="block text-[10px] font-bold uppercase text-slate-500">{km ? "ប្រើលើកុំព្យូទ័រ" : "Use on computer"}</small>Sesan Shop Web</span>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.sesan.app" target="_blank" rel="noopener noreferrer" className="inline-flex min-w-48 items-center justify-center gap-3 rounded-2xl bg-green-500 px-6 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-green-400">
            <GooglePlayIcon className="h-7 w-7" />
            <span><small className="block text-[10px] font-bold uppercase opacity-80">{km ? "ទាញយកពី" : "Get it on"}</small>Google Play</span>
          </a>
          <a href="https://apps.apple.com/kh/app/sesan-app/id6789862316" target="_blank" rel="noopener noreferrer" className="inline-flex min-w-48 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white/20">
            <AppleStoreIcon className="h-7 w-7" />
            <span><small className="block text-[10px] font-bold uppercase opacity-80">{km ? "ទាញយកពី" : "Download on the"}</small>App Store</span>
          </a>
        </div>
      </div>
    </section>
  </main>;
}
