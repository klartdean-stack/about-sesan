"use client";

import {FormEvent, useEffect, useState} from "react";
import Link from "next/link";
import {ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, X} from "lucide-react";
import {AcademySession, readableAcademyError, registerAcademyUser, signInAcademyUser} from "@/lib/academy-firebase-rest";
import ShareCourseButton from "./ShareCourseButton";

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
  const [owned, setOwned] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!session?.idToken) return;
    fetch("/api/academy/course-access", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({idToken: session.idToken, courseId})})
      .then((response) => response.json()).then((data: {owned?: boolean}) => setOwned(Boolean(data.owned))).catch(() => {});
  }, [session, courseId]);

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
      const password = String(data.get("password") || "");
      if (register && password !== String(data.get("confirmPassword") || "")) {
        throw new Error("PASSWORD_MISMATCH");
      }
      const next = register
        ? await registerAcademyUser(String(data.get("email") || "").trim(), password)
        : await signInAcademyUser(String(data.get("email") || "").trim(), password);
      localStorage.setItem(BUYER_SESSION_KEY, JSON.stringify(next)); setSession(next); setOpen(false);
      await beginCheckout(next);
    } catch (error) {
      setMessage(error instanceof Error && error.message === "PASSWORD_MISMATCH"
        ? (km ? "លេខសម្ងាត់ទាំងពីរមិនដូចគ្នាទេ។" : "The passwords do not match.")
        : readableAcademyError(error));
      setLoading(false);
    }
  }

  if (owned) return <><Link href={`/${locale}/academy/watch/${courseId}`} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-black text-white transition hover:bg-green-700"><CheckCircle2 className="h-5 w-5 text-green-400" />{km ? "បានទិញរួច • មើលវីដេអូ" : "Purchased • Watch lesson"}<ArrowRight className="h-4 w-4" /></Link><ShareCourseButton courseId={courseId} title={km ? "មេរៀននៅ Sesan Academy" : "Course on Sesan Academy"} locale={locale} /></>;

  return <>
    <button onClick={() => session ? beginCheckout(session) : setOpen(true)} disabled={loading} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 text-sm font-black text-white transition hover:bg-green-500 disabled:opacity-60">{loading ? (km ? "កំពុងបើក ABA…" : "Opening ABA…") : (km ? "ទិញមេរៀនតាម ABA" : "Buy with ABA PayWay")}<ArrowRight className="h-4 w-4" /></button>
    <ShareCourseButton courseId={courseId} title={km ? "មេរៀននៅ Sesan Academy" : "Course on Sesan Academy"} locale={locale} />
    {message && !open && <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{message}</p>}
    {open && <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-5 backdrop-blur-sm"><div className="relative my-auto w-full max-w-md rounded-[28px] bg-white p-7 text-left shadow-2xl"><button onClick={() => setOpen(false)} className="absolute right-5 top-5 rounded-full bg-slate-100 p-2"><X className="h-5 w-5" /></button><span className="inline-flex rounded-2xl bg-green-100 p-3 text-green-700"><LockKeyhole className="h-6 w-6" /></span><h3 className="mt-4 text-2xl font-black">{register ? (km ? "បង្កើតគណនីអ្នករៀន" : "Create learner account") : (km ? "ចូលគណនីដើម្បីទិញ" : "Login to purchase")}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{register ? (km ? "បង្កើត Password យ៉ាងតិច 6 តួ។ អក្សរធំ និងតូចត្រូវបានចាត់ទុកខុសគ្នា។" : "Create a password with at least 6 characters. Uppercase and lowercase letters are different.") : (km ? "ប្រើអ៊ីមែល និង Password ដដែលដែលអ្នកបានបង្កើតពីមុន។" : "Use the same email and password you created before.")}</p><form onSubmit={authenticate} className="mt-6 space-y-4"><input required type="email" name="email" placeholder={km ? "អ៊ីមែល" : "Email"} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500" /><PasswordInput name="password" show={showPassword} setShow={setShowPassword} placeholder={km ? "លេខសម្ងាត់ (យ៉ាងតិច 6 តួ)" : "Password (at least 6 characters)"} />{register && <PasswordInput name="confirmPassword" show={showPassword} setShow={setShowPassword} placeholder={km ? "បញ្ជាក់លេខសម្ងាត់ម្ដងទៀត" : "Confirm password"} />}{register && <div className="rounded-2xl bg-green-50 p-4 text-xs font-bold leading-6 text-green-800"><p>✓ {km ? "យ៉ាងតិច 6 តួ" : "At least 6 characters"}</p><p>✓ {km ? "អាចប្រើអក្សរ លេខ និងសញ្ញា" : "Letters, numbers and symbols are allowed"}</p><p>✓ {km ? "ប្រអប់ទាំងពីរត្រូវតែដូចគ្នា" : "Both password fields must match"}</p></div>}{message && <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{message}</p>}<button disabled={loading} className="w-full rounded-2xl bg-green-600 px-5 py-3.5 font-black text-white disabled:opacity-60">{loading ? "Loading…" : register ? (km ? "បង្កើត និងបន្តទូទាត់" : "Create and continue") : (km ? "ចូល និងបន្តទូទាត់" : "Login and continue")}</button></form><button onClick={() => {setRegister(!register); setMessage("");}} className="mt-4 w-full text-sm font-bold text-green-700">{register ? (km ? "មានគណនីរួចហើយ? ចូលគណនី" : "Already registered? Login") : (km ? "មិនទាន់មានគណនី? បង្កើតទីនេះ" : "No account? Create one")}</button></div></div>}
  </>;
}

function PasswordInput({name, show, setShow, placeholder}: {name: string; show: boolean; setShow: (show: boolean) => void; placeholder: string}) {
  return <div className="relative"><input required minLength={6} type={show ? "text" : "password"} name={name} placeholder={placeholder} className="w-full rounded-2xl border border-slate-200 py-3 pl-4 pr-12 outline-none focus:border-green-500" /><button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100">{show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>;
}
