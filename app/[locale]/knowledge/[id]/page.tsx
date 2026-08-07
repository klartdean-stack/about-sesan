import Link from "next/link";
import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {ArrowLeft, BookOpen, CalendarDays, Monitor} from "lucide-react";
import {getPublishedKnowledgeArticle, listPublishedKnowledgeArticles} from "@/lib/firebase-rest";
import ShareButtons from "./ShareButtons";
import KnowledgeContent from "../KnowledgeContent";
import ViewCounter from "./ViewCounter";

type PageProps = {
  params: Promise<{locale: string; id: string}>;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale: rawLocale, id} = await params;
  if (rawLocale !== "km" && rawLocale !== "en") return {};
  const locale = rawLocale as "km" | "en";
  const article = await getPublishedKnowledgeArticle(id).catch(() => null);
  if (!article) return {};

  const title = locale === "km" ? article.titleKm : article.titleEn;
  const description = (locale === "km" ? article.summaryKm : article.summaryEn).slice(0, 180);
  const canonical = `https://about.sesanshop.com/${locale}/knowledge/${article.id}`;
  const image = article.coverImage || "https://about.sesanshop.com/og-image.png";

  return {
    title: `${title} | Sesan Knowledge`,
    description,
    keywords: [title, article.category, "Sesan", "Sesan App", "Cambodia agriculture", "ចំណេះដឹងកសិកម្ម"],
    alternates: {
      canonical,
      languages: {
        km: `https://about.sesanshop.com/km/knowledge/${article.id}`,
        en: `https://about.sesanshop.com/en/knowledge/${article.id}`,
      },
    },
    openGraph: {
      type: "article",
      locale: locale === "km" ? "km_KH" : "en_US",
      url: canonical,
      siteName: "Sesan Group",
      title,
      description,
      publishedTime: article.updatedAt,
      modifiedTime: article.updatedAt,
      section: article.category,
      images: [{url: image, width: 1200, height: 675, alt: title}],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function KnowledgeArticlePage({params}: PageProps) {
  const {locale: rawLocale, id} = await params;
  if (rawLocale !== "km" && rawLocale !== "en") notFound();
  const locale = rawLocale as "km" | "en";
  const [article, allArticles] = await Promise.all([
    getPublishedKnowledgeArticle(id).catch(() => null),
    listPublishedKnowledgeArticles().catch(() => []),
  ]);
  if (!article) notFound();

  const title = locale === "km" ? article.titleKm : article.titleEn;
  const summary = locale === "km" ? article.summaryKm : article.summaryEn;
  const body = locale === "km" ? article.contentKm : article.contentEn;
  const date = new Intl.DateTimeFormat(locale === "km" ? "km-KH" : "en-GB", {
    day: "numeric", month: "long", year: "numeric",
  }).format(new Date(article.updatedAt));
  const articleUrl = `https://about.sesanshop.com/${locale}/knowledge/${article.id}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: summary,
    image: article.coverImage ? [article.coverImage] : undefined,
    datePublished: article.updatedAt,
    dateModified: article.updatedAt,
    inLanguage: locale === "km" ? "km-KH" : "en",
    articleSection: article.category,
    mainEntityOfPage: articleUrl,
    author: {"@type": "Organization", name: "Sesan Group"},
    publisher: {
      "@type": "Organization",
      name: "Sesan Group",
      logo: {"@type": "ImageObject", url: "https://about.sesanshop.com/sesan-logo.png"},
    },
  };
  const otherArticles = allArticles.filter((item) => item.id !== article.id);
  const relatedArticles = [
    ...otherArticles.filter((item) => item.category === article.category),
    ...otherArticles.filter((item) => item.category !== article.category),
  ].slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData).replace(/</g, "\\u003c")}}
      />
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
            <ViewCounter articleId={article.id} initialViews={article.views} locale={locale} />
          </div>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl">{title}</h1>
          {summary && <p className="mt-6 text-xl leading-9 text-slate-600">{summary}</p>}
          <ShareButtons title={title} url={articleUrl} locale={locale} />
          <div className="my-9 h-px bg-slate-200" />
          {body ? (
            <KnowledgeContent content={body} />
          ) : (
            <div className="rounded-2xl bg-green-50 p-6 text-center text-green-800"><BookOpen className="mx-auto h-7 w-7" /><p className="mt-3 font-bold">{locale === "km" ? "ខ្លឹមសារកំពុងរៀបចំ" : "Content is being prepared"}</p></div>
          )}
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="border-t border-slate-200 bg-white px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-green-700">
                  {locale === "km" ? "SESAN KNOWLEDGE" : "SESAN KNOWLEDGE"}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  {locale === "km" ? "អត្ថបទពាក់ព័ន្ធ" : "Related articles"}
                </h2>
              </div>
              <Link href={`/${locale}/knowledge`} className="hidden text-sm font-black text-green-700 hover:text-green-600 sm:block">
                {locale === "km" ? "មើលទាំងអស់ →" : "View all →"}
              </Link>
            </div>

            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {relatedArticles.map((related) => {
                const relatedTitle = locale === "km" ? related.titleKm : related.titleEn;
                const relatedSummary = locale === "km" ? related.summaryKm : related.summaryEn;
                return (
                  <Link
                    key={related.id}
                    href={`/${locale}/knowledge/${related.id}`}
                    className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-green-300 hover:shadow-xl"
                  >
                    {related.coverImage ? (
                      <img src={related.coverImage} alt={relatedTitle} className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex aspect-video items-center justify-center bg-green-50 text-green-700"><BookOpen className="h-10 w-10" /></div>
                    )}
                    <div className="p-5">
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-green-700">{related.category}</p>
                      <h3 className="mt-2 line-clamp-2 text-lg font-black leading-snug group-hover:text-green-700">{relatedTitle}</h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{relatedSummary}</p>
                      <p className="mt-5 text-sm font-black text-green-700">{locale === "km" ? "អានអត្ថបទ →" : "Read article →"}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <Link href={`/${locale}/knowledge`} className="mt-7 inline-flex text-sm font-black text-green-700 sm:hidden">
              {locale === "km" ? "មើលអត្ថបទទាំងអស់ →" : "View all articles →"}
            </Link>
          </div>
        </section>
      )}

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
