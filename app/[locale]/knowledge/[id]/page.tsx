import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft, BookOpen, CalendarDays, Monitor} from "lucide-react";
import {getPublishedKnowledgeArticle} from "@/lib/firebase-rest";
import ShareButtons from "./ShareButtons";

type PageProps = {
  params: Promise<{locale: string; id: string}>;
};

export default async function KnowledgeArticlePage({params}: PageProps) {
  const {locale: rawLocale, id} = await params;
  if (rawLocale !== "km" && rawLocale !== "en") notFound();
  const locale = rawLocale as "km" | "en";
  const article = await getPublishedKnowledgeArticle(id).catch(() => null);
  if (!article) notFound();

  const title = locale === "km" ? article.titleKm : article.titleEn;
  const summary = locale === "km" ? article.summaryKm : article.summaryEn;
  const body = locale === "km" ? article.contentKm : article.contentEn;
  const date = new Intl.DateTimeFormat(locale === "km" ? "km-KH" : "en-GB", {
    day: "numeric", month: "long", year: "numeric",
  }).format(new Date(article.updatedAt));
  const articleUrl = `https://about.sesanshop.com/${locale}/knowledge/${article.id}`;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <img src="/sesan-logo.png" alt="Sesan Group" className="h-10 w-10 object-contain" />
            <div><p className="font-black text-green-700">SESAN</p><p className="text-[8px] font-black tracking-[0.3em] text-amber-500">GROUP</p></div>
          </Link>
          <Link href={`/${locale}/knowledge`} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:text-green-700">
            <ArrowLeft className="h-4 w-4" />{locale === "km" ? "ចំណេះដឹង" : "Knowledge"}
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        {article.coverImage && <img src={article.coverImage} alt={title} className="aspect-video w-full rounded-[32px] object-cover shadow-xl" />}
        <div className="mx-auto max-w-3xl py-10">
          <div className="flex flex-wrap items-center gap-3 text-sm font-bold">
            <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">{article.category}</span>
            <span className="inline-flex items-center gap-2 text-slate-400"><CalendarDays className="h-4 w-4" />{date}</span>
          </div>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl">{title}</h1>
          {summary && <p className="mt-6 text-xl leading-9 text-slate-600">{summary}</p>}
          <ShareButtons title={title} url={articleUrl} locale={locale} />
          <div className="my-9 h-px bg-slate-200" />
          {body ? (
            <div className="whitespace-pre-wrap text-lg leading-9 text-slate-700">{body}</div>
          ) : (
            <div className="rounded-2xl bg-green-50 p-6 text-center text-green-800"><BookOpen className="mx-auto h-7 w-7" /><p className="mt-3 font-bold">{locale === "km" ? "ខ្លឹមសារកំពុងរៀបចំ" : "Content is being prepared"}</p></div>
          )}
        </div>
      </article>

      <section className="border-t border-green-100 bg-gradient-to-br from-green-50 via-white to-sky-50 px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] bg-slate-950 px-6 py-10 text-white shadow-2xl sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-green-400">
              {locale === "km" ? "SESAN APP" : "SESAN APP"}
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              {locale === "km" ? "ប្រើ Sesan Shop តាម Web ឬទាញយក App" : "Use Sesan Shop on the web or download the app"}
            </h2>
            <p className="mt-4 leading-8 text-slate-300">
              {locale === "km"
                ? "ចូល sesanshop.com តាមកុំព្យូទ័រ ឬប្រើ Sesan App ដើម្បីស្វែងរកផលិតផលកសិកម្ម និងទាក់ទងអ្នកលក់។"
                : "Visit sesanshop.com on your computer or use Sesan App to explore agricultural products and contact sellers."}
            </p>
          </div>

          <div className="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
            <a
              href="https://sesanshop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-48 items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 font-black text-slate-950 transition hover:-translate-y-1 hover:bg-slate-100"
            >
              <Monitor className="h-6 w-6 text-sky-600" />
              <span><small className="block text-[10px] font-bold uppercase text-slate-500">{locale === "km" ? "ប្រើលើកុំព្យូទ័រ" : "Use on computer"}</small>Sesan Shop Web</span>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.sesan.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-48 items-center justify-center gap-3 rounded-2xl bg-green-500 px-6 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-green-400"
            >
              <span className="text-xl">▶</span>
              <span><small className="block text-[10px] font-bold uppercase opacity-80">{locale === "km" ? "ទាញយកពី" : "Get it on"}</small>Google Play</span>
            </a>
            <button disabled className="inline-flex min-w-48 cursor-not-allowed items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-black text-white/60">
              <span className="text-2xl"></span>
              <span><small className="block text-[10px] font-bold uppercase">{locale === "km" ? "នឹងមកដល់ឆាប់ៗ" : "Coming soon"}</small>App Store</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
