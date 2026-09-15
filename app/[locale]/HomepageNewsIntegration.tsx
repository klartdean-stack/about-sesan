"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {useLocale} from "next-intl";
import {listPublishedNewsArticles, type NewsArticleRecord} from "@/lib/news-firebase";

export default function HomepageNewsIntegration() {
  const locale = useLocale();
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [articles, setArticles] = useState<NewsArticleRecord[]>([]);

  useEffect(() => {
    const section = document.getElementById("news");
    if (!section) return;

    setTarget(section);

    const handleClick = (event: MouseEvent) => {
      const element = event.target as Element | null;
      const anchor = element?.closest('a[href="#news"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      event.preventDefault();
      window.location.href = `/${locale}/news`;
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [locale]);

  useEffect(() => {
    let active = true;
    listPublishedNewsArticles()
      .then((items) => {
        if (active) setArticles(items.slice(0, 3));
      })
      .catch(() => {
        if (active) setArticles([]);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!target) return null;

  return createPortal(
    <div className="mx-auto mt-10 max-w-6xl px-5 lg:px-8">
      {articles.length > 0 && (
        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article) => {
            const title = locale === "km" ? article.titleKm : article.titleEn;
            const summary = locale === "km" ? article.summaryKm : article.summaryEn;
            return (
              <Link
                key={article.id}
                href={`/${locale}/news/${article.id}`}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {article.coverImage && (
                  <img
                    src={article.coverImage}
                    alt=""
                    className="aspect-[16/9] w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="text-sm font-bold text-green-700">{article.category}</p>
                  <h3 className="mt-2 text-xl font-black text-slate-950">{title}</h3>
                  <p className="mt-3 line-clamp-3 leading-7 text-slate-600">{summary}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/news`}
          className="inline-flex items-center justify-center rounded-full bg-green-700 px-7 py-3 font-bold text-white transition hover:bg-green-800"
        >
          {locale === "km" ? "មើលព័ត៌មានទាំងអស់" : "View all News & Updates"}
          <span className="ml-2" aria-hidden="true">→</span>
        </Link>
      </div>
    </div>,
    target,
  );
}
