"use client";

import {Eye} from "lucide-react";
import {useEffect, useState} from "react";
import {incrementKnowledgeArticleViews} from "@/lib/firebase-rest";

export default function ViewCounter({articleId, initialViews, locale}: {articleId: string; initialViews: number; locale: "km" | "en"}) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    const key = `sesan-knowledge-viewed-${articleId}`;
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, "1");
    incrementKnowledgeArticleViews(articleId)
      .then(() => setViews(initialViews + 1))
      .catch(() => window.sessionStorage.removeItem(key));
  }, [articleId, initialViews]);

  return (
    <span className="inline-flex items-center gap-2 text-slate-400">
      <Eye className="h-4 w-4" />
      {locale === "km" ? `បានអាន ${views.toLocaleString()} ដង` : `${views.toLocaleString()} views`}
    </span>
  );
}
