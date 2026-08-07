import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft, BookOpen, CalendarDays} from "lucide-react";
import {getPublishedKnowledgeArticle} from "@/lib/firebase-rest";

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
          <div className="my-9 h-px bg-slate-200" />
          {body ? (
            <div className="whitespace-pre-wrap text-lg leading-9 text-slate-700">{body}</div>
          ) : (
            <div className="rounded-2xl bg-green-50 p-6 text-center text-green-800"><BookOpen className="mx-auto h-7 w-7" /><p className="mt-3 font-bold">{locale === "km" ? "ខ្លឹមសារកំពុងរៀបចំ" : "Content is being prepared"}</p></div>
          )}
        </div>
      </article>
    </main>
  );
}
