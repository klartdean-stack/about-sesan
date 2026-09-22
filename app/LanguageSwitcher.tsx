"use client";

import Link from "next/link";
import {Globe} from "lucide-react";
import {usePathname} from "next/navigation";

type Props = {
  locale: string;
  hrefEn?: string;
  hrefKm?: string;
  className?: string;
};

export default function LanguageSwitcher({locale, hrefEn, hrefKm, className = ""}: Props) {
  const pathname = usePathname();
  const localizedPath = (target: "en" | "km") => {
    if (target === "en" && hrefEn) return hrefEn;
    if (target === "km" && hrefKm) return hrefKm;

    if (/^\/(en|km)(\/|$)/.test(pathname)) {
      return pathname.replace(/^\/(en|km)(?=\/|$)/, `/${target}`);
    }
    return target === "km" ? `/km${pathname === "/" ? "" : pathname}` : pathname.replace(/^\/km(?=\/|$)/, "") || "/";
  };

  return (
    <details className={`group relative ${className}`}>
      <summary
        aria-label={locale === "km" ? "ប្ដូរភាសា" : "Change language"}
        className="flex h-9 cursor-pointer list-none items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 text-[13px] font-black text-slate-700 shadow-sm transition hover:border-green-500 hover:text-green-700"
      >
        <Globe className="h-3.5 w-3.5 text-green-600" />
        <span>{locale === "km" ? "ខ្មែរ" : "EN"}</span>
        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition group-open:rotate-180" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>

      <div className="absolute right-0 top-full z-[70] mt-2 w-40 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-slate-700 shadow-2xl">
        <Link
          href={localizedPath("en")}
          className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold transition ${locale === "en" ? "bg-green-50 text-green-700" : "hover:bg-green-50 hover:text-green-700"}`}
        >
          <span>🇬🇧</span><span>English</span>
        </Link>
        <Link
          href={localizedPath("km")}
          className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold transition ${locale === "km" ? "bg-green-50 text-green-700" : "hover:bg-green-50 hover:text-green-700"}`}
        >
          <span>🇰🇭</span><span>ខ្មែរ</span>
        </Link>
      </div>
    </details>
  );
}
