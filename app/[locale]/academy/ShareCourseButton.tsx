"use client";

import {Check, Share2} from "lucide-react";
import {useState} from "react";

export default function ShareCourseButton({courseId, title, locale}: {courseId: string; title: string; locale: "km" | "en"}) {
  const km = locale === "km";
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = `${window.location.origin}/${locale}/academy?shared=${encodeURIComponent(courseId)}#courses`;
    try {
      if (navigator.share) {
        await navigator.share({title, text: km ? `មើលមេរៀន «${title}» នៅ Sesan Academy` : `Watch “${title}” on Sesan Academy`, url});
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2500);
      } catch {
        window.prompt(km ? "ចម្លង Link នេះ៖" : "Copy this link:", url);
      }
    }
  }

  return <button type="button" onClick={share} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700">{copied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}{copied ? (km ? "បានចម្លង Link រួច" : "Link copied") : (km ? "ចែករំលែកមេរៀននេះ" : "Share this course")}</button>;
}
