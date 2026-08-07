"use client";

import {Check, Link2, Send, Share2} from "lucide-react";
import {useState} from "react";

type Props = {
  title: string;
  url: string;
  locale: "km" | "en";
};

export default function ShareButtons({title, url, locale}: Props) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function shareArticle() {
    if (navigator.share) {
      await navigator.share({title, url});
    } else {
      await copyLink();
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-black text-slate-700">
        {locale === "km" ? "ចែករំលែកអត្ថបទនេះ" : "Share this article"}
      </p>
      <div className="flex flex-wrap gap-2">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#1469d8]"
        >
          <span className="text-lg font-black leading-none">f</span> Facebook
        </a>
        <a
          href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#229ED9] px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#168bc3]"
        >
          <Send className="h-4 w-4" /> Telegram
        </a>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
        >
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
          {copied ? (locale === "km" ? "បានចម្លង" : "Copied") : (locale === "km" ? "ចម្លង Link" : "Copy link")}
        </button>
        <button
          type="button"
          onClick={shareArticle}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:border-green-300 hover:text-green-700"
        >
          <Share2 className="h-4 w-4" />{locale === "km" ? "ចែករំលែក" : "Share"}
        </button>
      </div>
    </div>
  );
}
