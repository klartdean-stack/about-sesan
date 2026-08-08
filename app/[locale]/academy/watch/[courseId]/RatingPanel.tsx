"use client";

import {Star} from "lucide-react";
import {useEffect, useState} from "react";
import type {AcademySession} from "@/lib/academy-firebase-rest";

const SESSION_KEY = "sesan-academy-buyer-session";

export default function RatingPanel({courseId, locale}: {courseId: string; locale: "km" | "en"}) {
  const km = locale === "km";
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null") as AcademySession | null;
    if (!session?.idToken) {setLoading(false); return;}
    fetch("/api/academy/rating", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({idToken: session.idToken, courseId})})
      .then(response => response.json()).then((data: {rating?: number}) => setRating(Number(data.rating || 0))).catch(() => {}).finally(() => setLoading(false));
  }, [courseId]);

  async function rate(value: number) {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null") as AcademySession | null;
    if (!session?.idToken) {setMessage(km ? "សូមចូលគណនីដែលបានប្រើទិញ។" : "Please sign in with the purchasing account."); return;}
    setLoading(true); setMessage("");
    try {
      const response = await fetch("/api/academy/rating", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({idToken: session.idToken, courseId, rating: value})});
      if (!response.ok) throw new Error("RATING_FAILED");
      setRating(value); setMessage(km ? "អរគុណ! បានរក្សាទុក Rating របស់អ្នក។" : "Thank you! Your rating was saved.");
    } catch {setMessage(km ? "មិនអាចរក្សាទុក Rating បានទេ។ សូមសាកល្បងម្ដងទៀត។" : "Could not save your rating. Please try again.");}
    finally {setLoading(false);}
  }

  const active = hovered || rating;
  return <section className="mt-10 max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-6"><p className="text-sm font-black uppercase tracking-[.18em] text-green-400">RATING</p><h2 className="mt-2 text-xl font-black">{km ? "តើមេរៀននេះមានប្រយោជន៍កម្រិតណា?" : "How useful was this lesson?"}</h2><p className="mt-2 text-sm text-slate-300">{km ? "ចុចផ្កាយពី 1 ដល់ 5។ អ្នកអាចកែ Rating វិញបាន។" : "Choose 1 to 5 stars. You can change your rating later."}</p><div className="mt-5 flex gap-2" onMouseLeave={() => setHovered(0)}>{[1,2,3,4,5].map(value => <button key={value} type="button" disabled={loading} onMouseEnter={() => setHovered(value)} onClick={() => rate(value)} aria-label={`${value} stars`} className="rounded-xl p-1 transition hover:scale-110 disabled:opacity-50"><Star className={`h-9 w-9 ${value <= active ? "fill-amber-400 text-amber-400" : "text-slate-500"}`} /></button>)}</div>{rating > 0 && <p className="mt-3 text-sm font-bold text-amber-300">{km ? `Rating របស់អ្នក៖ ${rating}/5` : `Your rating: ${rating}/5`}</p>}{message && <p className="mt-4 rounded-xl bg-white/10 p-3 text-sm font-bold text-green-300">{message}</p>}</section>;
}
