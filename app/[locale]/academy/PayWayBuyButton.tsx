"use client";

import {FormEvent, useEffect, useState} from "react";
import Link from "next/link";
import {ArrowRight, CheckCircle2, Clock3, Eye, EyeOff, LockKeyhole, Star, Upload, X} from "lucide-react";
import {AcademySession, readableAcademyError, refreshAcademySession, registerAcademyUser, signInAcademyUser} from "@/lib/academy-firebase-rest";
import ShareCourseButton from "./ShareCourseButton";

const BUYER_SESSION_KEY = "sesan-academy-buyer-session";
type PaymentStatus = "none" | "pending" | "approved" | "rejected";

export default function PayWayBuyButton({courseId, priceRiel, locale}: {courseId: string; priceRiel: number; locale: "km" | "en"}) {
  const km = locale === "km";
  const [session, setSession] = useState<AcademySession | null>(() => {
    if (typeof window === "undefined") return null;
    try { return JSON.parse(localStorage.getItem(BUYER_SESSION_KEY) || "null") as AcademySession | null; }
    catch { return null; }
  });
  const [loginOpen, setLoginOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [owned, setOwned] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("none");
  const [adminNote, setAdminNote] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [receipt, setReceipt] = useState<File | null>(null);

  useEffect(() => {
    if (!session?.refreshToken) return;
    const current = session;
    let cancelled = false;
    async function checkAccess() {
      try {
        let active = current;
        if (active.expiresAt <= Date.now() + 60_000) {
          active = await refreshAcademySession(active);
          localStorage.setItem(BUYER_SESSION_KEY, JSON.stringify(active));
          if (!cancelled) setSession(active);
        }
        const [accessResponse, paymentResponse] = await Promise.all([
          fetch("/api/academy/course-access", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({idToken: active.idToken, courseId})}),
          fetch("/api/academy/manual-payment/status", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({idToken: active.idToken, courseId})}),
        ]);
        const access = await accessResponse.json() as {owned?: boolean};
        const payment = await paymentResponse.json() as {status?: PaymentStatus; adminNote?: string};
        if (!cancelled) {
          setOwned(Boolean(access.owned));
          setPaymentStatus(payment.status || "none");
          setAdminNote(payment.adminNote || "");
        }
      } catch {
        if (!cancelled) { setOwned(false); setPaymentStatus("none"); }
      }
    }
    checkAccess();
    return () => {cancelled = true;};
  }, [session, courseId]);

  function startPayment() {
    setMessage("");
    if (!session) setLoginOpen(true);
    else setPaymentOpen(true);
  }

  async function authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage("");
    const data = new FormData(event.currentTarget);
    try {
      const password = String(data.get("password") || "");
      if (register && password !== String(data.get("confirmPassword") || "")) throw new Error("PASSWORD_MISMATCH");
      const next = register
        ? await registerAcademyUser(String(data.get("email") || "").trim(), password)
        : await signInAcademyUser(String(data.get("email") || "").trim(), password);
      localStorage.setItem(BUYER_SESSION_KEY, JSON.stringify(next));
      setSession(next); setLoginOpen(false); setPaymentOpen(true);
    } catch (error) {
      setMessage(error instanceof Error && error.message === "PASSWORD_MISMATCH"
        ? (km ? "លេខសម្ងាត់ទាំងពីរមិនដូចគ្នាទេ។" : "The passwords do not match.")
        : readableAcademyError(error));
    } finally { setLoading(false); }
  }

  async function submitReceipt(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session || !receipt) return;
    setLoading(true); setMessage("");
    try {
      let active = session;
      if (active.expiresAt <= Date.now() + 60_000) {
        active = await refreshAcademySession(active);
        localStorage.setItem(BUYER_SESSION_KEY, JSON.stringify(active)); setSession(active);
      }
      const form = new FormData();
      form.set("idToken", active.idToken); form.set("courseId", courseId); form.set("receipt", receipt);
      const response = await fetch("/api/academy/manual-payment/submit", {method: "POST", body: form});
      const data = await response.json() as {status?: PaymentStatus; error?: string};
      if (!response.ok) throw new Error(data.error || "SUBMIT_FAILED");
      setPaymentStatus(data.status || "pending"); setPaymentOpen(false); setReceipt(null);
    } catch {
      setMessage(km ? "មិនអាចបញ្ជូនវិក្កយបត្របានទេ។ រូបត្រូវតែជា JPG, PNG ឬ WEBP និងតូចជាង 5MB។" : "Could not submit the receipt. Use a JPG, PNG or WEBP image under 5MB.");
    } finally { setLoading(false); }
  }

  if (owned || paymentStatus === "approved") return <>
    <Link href={`/${locale}/academy/watch/${courseId}`} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-black text-white transition hover:bg-green-700"><CheckCircle2 className="h-5 w-5 text-green-400" />{km ? "បានទិញរួច • មើលវីដេអូ" : "Purchased • Watch lesson"}<ArrowRight className="h-4 w-4" /></Link>
    <Link href={`/${locale}/academy/watch/${courseId}#rating`} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-5 py-3 text-sm font-black text-amber-800 transition hover:bg-amber-100"><Star className="h-5 w-5" />{km ? "វាយតម្លៃមេរៀននេះ" : "Rate this lesson"}</Link>
    <ShareCourseButton courseId={courseId} title={km ? "មេរៀននៅ Sesan Academy" : "Course on Sesan Academy"} locale={locale} />
  </>;

  return <>
    {paymentStatus === "pending" ? <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center text-sm font-black text-amber-800"><Clock3 className="mx-auto mb-2 h-6 w-6" />{km ? "បានបញ្ជូនវិក្កយបត្រ • កំពុងរង់ចាំ Admin ផ្ទៀងផ្ទាត់" : "Receipt submitted • Waiting for Admin verification"}</div> : <button onClick={startPayment} disabled={loading} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 text-sm font-black text-white transition hover:bg-green-500 disabled:opacity-60">{km ? "បង់តាម ABA QR" : "Pay with ABA QR"}<ArrowRight className="h-4 w-4" /></button>}
    {paymentStatus === "rejected" && <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{km ? "វិក្កយបត្រមិនត្រូវបានអនុម័ត៖ " : "Receipt rejected: "}{adminNote || (km ? "សូមពិនិត្យ ហើយបញ្ជូនម្ដងទៀត។" : "Please check and resubmit.")}</p>}
    <ShareCourseButton courseId={courseId} title={km ? "មេរៀននៅ Sesan Academy" : "Course on Sesan Academy"} locale={locale} />

    {loginOpen && <LoginModal km={km} register={register} setRegister={setRegister} loading={loading} message={message} showPassword={showPassword} setShowPassword={setShowPassword} close={() => setLoginOpen(false)} authenticate={authenticate} />}
    {paymentOpen && <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-sm"><div className="relative my-auto w-full max-w-lg rounded-[30px] bg-white p-6 shadow-2xl sm:p-8"><button onClick={() => setPaymentOpen(false)} className="absolute right-5 top-5 rounded-full bg-slate-100 p-2"><X className="h-5 w-5" /></button><p className="text-xs font-black uppercase tracking-[0.18em] text-green-700">ABA MERCHANT QR</p><h3 className="mt-2 text-2xl font-black">{km ? "ស្កេន និងបង់ប្រាក់" : "Scan and pay"}</h3><div className="mt-5 grid items-center gap-5 sm:grid-cols-2"><img src="/aba-merchant-qr-klart-dean.jpg" alt="ABA Merchant QR for KLART DEAN" className="mx-auto max-h-80 rounded-2xl border border-slate-200 object-contain" /><div><p className="text-sm font-bold text-slate-500">{km ? "ចំនួនត្រូវបង់" : "Amount to pay"}</p><p className="mt-1 text-3xl font-black text-green-700">{priceRiel.toLocaleString()}៛</p><p className="mt-4 text-sm text-slate-500">{km ? "ឈ្មោះអ្នកទទួល" : "Receiver"}</p><p className="font-black">KLART DEAN</p><div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs font-bold leading-5 text-amber-800">{km ? "បង់ចំនួនឱ្យត្រូវ ហើយថតវិក្កយបត្រទុក។ Admin នឹងពិនិត្យជាមួយ Transaction ក្នុង ABA Merchant។" : "Pay the exact amount and save the receipt. Admin will verify it against ABA Merchant transactions."}</div></div></div><form onSubmit={submitReceipt} className="mt-6"><label className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-green-300 bg-green-50 p-5 text-center"><Upload className="h-7 w-7 text-green-700" /><span className="mt-2 font-black text-green-800">{receipt ? receipt.name : (km ? "ជ្រើសរូបវិក្កយបត្រ" : "Choose receipt image")}</span><span className="mt-1 text-xs text-slate-500">JPG, PNG, WEBP • Max 5MB</span><input required type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => setReceipt(event.target.files?.[0] || null)} /></label>{message && <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{message}</p>}<button disabled={!receipt || loading} className="mt-4 w-full rounded-2xl bg-slate-950 px-5 py-4 font-black text-white disabled:opacity-40">{loading ? (km ? "កំពុងបញ្ជូន…" : "Submitting…") : (km ? "បញ្ជូនឱ្យ Admin ផ្ទៀងផ្ទាត់" : "Submit for Admin verification")}</button></form></div></div>}
  </>;
}

function LoginModal({km, register, setRegister, loading, message, showPassword, setShowPassword, close, authenticate}: {km: boolean; register: boolean; setRegister: (value: boolean) => void; loading: boolean; message: string; showPassword: boolean; setShowPassword: (value: boolean) => void; close: () => void; authenticate: (event: FormEvent<HTMLFormElement>) => void}) {
  return <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-5 backdrop-blur-sm"><div className="relative my-auto w-full max-w-md rounded-[28px] bg-white p-7 text-left shadow-2xl"><button onClick={close} className="absolute right-5 top-5 rounded-full bg-slate-100 p-2"><X className="h-5 w-5" /></button><span className="inline-flex rounded-2xl bg-green-100 p-3 text-green-700"><LockKeyhole className="h-6 w-6" /></span><h3 className="mt-4 text-2xl font-black">{register ? (km ? "បង្កើតគណនីអ្នករៀន" : "Create learner account") : (km ? "ចូលគណនីដើម្បីទិញ" : "Login to purchase")}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{register ? (km ? "បង្កើត Password យ៉ាងតិច 6 តួ។" : "Create a password with at least 6 characters.") : (km ? "ប្រើអ៊ីមែល និង Password ដដែលដែលអ្នកបានបង្កើតពីមុន។" : "Use your existing email and password.")}</p><form onSubmit={authenticate} className="mt-6 space-y-4"><input required type="email" name="email" placeholder={km ? "អ៊ីមែល" : "Email"} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500" /><PasswordInput name="password" show={showPassword} setShow={setShowPassword} placeholder={km ? "លេខសម្ងាត់ (យ៉ាងតិច 6 តួ)" : "Password (at least 6 characters)"} />{register && <PasswordInput name="confirmPassword" show={showPassword} setShow={setShowPassword} placeholder={km ? "បញ្ជាក់លេខសម្ងាត់ម្ដងទៀត" : "Confirm password"} />}{message && <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{message}</p>}<button disabled={loading} className="w-full rounded-2xl bg-green-600 px-5 py-3.5 font-black text-white disabled:opacity-60">{loading ? "Loading…" : register ? (km ? "បង្កើត និងបន្ត" : "Create and continue") : (km ? "ចូល និងបន្ត" : "Login and continue")}</button></form><button onClick={() => setRegister(!register)} className="mt-4 w-full text-sm font-bold text-green-700">{register ? (km ? "មានគណនីរួចហើយ? ចូលគណនី" : "Already registered? Login") : (km ? "មិនទាន់មានគណនី? បង្កើតទីនេះ" : "No account? Create one")}</button></div></div>;
}

function PasswordInput({name, show, setShow, placeholder}: {name: string; show: boolean; setShow: (show: boolean) => void; placeholder: string}) {
  return <div className="relative"><input required minLength={6} type={show ? "text" : "password"} name={name} placeholder={placeholder} className="w-full rounded-2xl border border-slate-200 py-3 pl-4 pr-12 outline-none focus:border-green-500" /><button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100">{show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>;
}
