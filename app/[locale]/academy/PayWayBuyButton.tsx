"use client";

import {FormEvent, useState} from "react";
import {ArrowRight, LockKeyhole, X} from "lucide-react";
import {AcademySession, readableAcademyError, registerAcademyUser, signInAcademyUser} from "@/lib/academy-firebase-rest";

const BUYER_SESSION_KEY = "sesan-academy-buyer-session";

export default function PayWayBuyButton({courseId, locale}: {courseId: string; locale: "km" | "en"}) {
  const km = locale === "km";
  const [session, setSession] = useState<AcademySession | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = JSON.parse(localStorage.getItem(BUYER_SESSION_KEY) || "null") as AcademySession | null;
      return saved && saved.expiresAt > Date.now() ? saved : null;
    } catch { return null; }
  });
  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function beginCheckout(active: AcademySession) {
    setLoading(true); setMessage("");
    try {
      const response = await fetch("/api/academy/payway/checkout", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({idToken: active.idToken, courseId, locale}),
      });
      const checkout = await response.json() as {checkoutUrl?: string; fields?: Record<string, string>; error?: string};
      if (!response.ok || !checkout.checkoutUrl || !checkout.fields) throw new Error(checkout.error || "CHECKOUT_FAILED");
      const form = document.createElement("form");
      form.method = "POST";
      form.action = checkout.checkoutUrl;
      Object.entries(checkout.fields).forEach(([name, value]) => {
        const input = document.createElement("input"); input.type = "hidden"; input.name = name; input.value = value; form.appendChild(input);
      });
      document.body.appendChild(form); form.submit();
    } catch (error) {
      setMessage(error instanceof Error && error.message.startsWith("MISSING_")
        ? `${km ? "ខ្វះ Variable" : "Missing variable"}: ${error.message.replace("MISSING_", "")}`
        : (km ? "មិនអាចបើកការទូទាត់បានទេ។ សូមសាកល្បងម្ដងទៀត។" : "Could not open payment. Please try again."));
      setLoading(false);
    }
  }

  async function authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage("");
    const data = new FormData(event.currentTarget);
    try {
      const next = register
        ? await registerAcademyUser(String(data.get("email") || "").trim(), String(data.get("password") || ""))
        : await signInAcademyUser(String(data.get("email") || "").trim(), String(data.get("password") || ""));
      localStorage.setItem(BUYER_SESSION_KEY, JSON.stringify(next)); setSession(next); setOpen(false);
      await beginCheckout(next);
    } catch (error) { setMessage(readableAcademyError(error)); setLoading(false); }
  }

  return <>
    <button onClick={() => session ? beginCheckout(session) : setOpen(true)} disabled={loading} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 text-sm font-black text-white transition hover:bg-green-500 disabled:opacity-60">{loading ? (km ? "កំពុងបើក ABA…" : "Opening ABA…") : (km ? "ទិញមេរៀនតាម ABA" : "Buy with ABA PayWay")}<ArrowRight className="h-4 w-4" /></button>
    {message && !open && <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{message}</p>}
    {open && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-5 backdrop-blur-sm"><div className="relative w-full max-w-md rounded-[28px] bg-white p-7 text-left shadow-2xl"><button onClick={() => setOpen(false)} className="absolute right-5 top-5 rounded-full bg-slate-100 p-2"><X className="h-5 w-5" /></button><span className="inline-flex rounded-2xl bg-green-100 p-3 text-green-700"><LockKeyhole className="h-6 w-6" /></span><h3 className="mt-4 text-2xl font-black">{register ? (km ? "បង្កើតគណនីអ្នករៀន" : "Create learner account") : (km ? "ចូលគណនីដើម្បីទិញ" : "Login to purchase")}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{km ? "គណនីនេះប្រើសម្រាប់រក្សាទុកមេរៀនដែលអ្នកបានទិញ។" : "This account keeps your purchased courses accessible."}</p><form onSubmit={authenticate} className="mt-6 space-y-4"><input required type="email" name="email" placeholder={km ? "អ៊ីមែល" : "Email"} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500" /><input required minLength={6} type="password" name="password" placeholder={km ? "លេខសម្ងាត់ (យ៉ាងតិច 6 តួ)" : "Password (6+ characters)"} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500" />{message && <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{message}</p>}<button disabled={loading} className="w-full rounded-2xl bg-green-600 px-5 py-3.5 font-black text-white disabled:opacity-60">{loading ? "Loading…" : register ? (km ? "បង្កើត និងបន្តទូទាត់" : "Create and continue") : (km ? "ចូល និងបន្តទូទាត់" : "Login and continue")}</button></form><button onClick={() => {setRegister(!register); setMessage("");}} className="mt-4 w-full text-sm font-bold text-green-700">{register ? (km ? "មានគណនីរួចហើយ? ចូលគណនី" : "Already registered? Login") : (km ? "មិនទាន់មានគណនី? បង្កើតទីនេះ" : "No account? Create one")}</button></div></div>}
  </>;
}
