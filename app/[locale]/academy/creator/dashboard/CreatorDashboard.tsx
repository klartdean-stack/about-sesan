"use client";

import Link from "next/link";
import {FormEvent, useEffect, useState} from "react";
import {BadgeCheck, BookOpen, Clock3, LogOut, ShieldAlert, WalletCards} from "lucide-react";
import {
  AcademySession,
  CreatorApplication,
  getCreatorApplication,
  readableAcademyError,
  registerAcademyUser,
  saveCreatorApplication,
  signInAcademyUser,
} from "@/lib/academy-firebase-rest";
import {MINIMUM_WITHDRAWAL_RIEL} from "@/lib/academy";

const SESSION_KEY = "sesan-academy-creator-session";

export default function CreatorDashboard({locale}: {locale: "km" | "en"}) {
  const km = locale === "km";
  const t = (en: string, kh: string) => km ? kh : en;
  const [session, setSession] = useState<AcademySession | null>(null);
  const [application, setApplication] = useState<CreatorApplication | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) { setLoading(false); return; }
    try {
      const saved = JSON.parse(raw) as AcademySession;
      if (saved.expiresAt <= Date.now()) throw new Error("expired");
      setSession(saved);
      getCreatorApplication(saved).then(setApplication).catch(() => {
        localStorage.removeItem(SESSION_KEY);
        setSession(null);
      }).finally(() => setLoading(false));
    } catch {
      localStorage.removeItem(SESSION_KEY);
      setLoading(false);
    }
  }, []);

  async function authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setMessage("");
    const data = new FormData(event.currentTarget);
    try {
      const email = String(data.get("email") || "").trim();
      const password = String(data.get("password") || "");
      const next = mode === "register"
        ? await registerAcademyUser(email, password)
        : await signInAcademyUser(email, password);
      localStorage.setItem(SESSION_KEY, JSON.stringify(next));
      setSession(next);
      setApplication(await getCreatorApplication(next));
    } catch (error) { setMessage(readableAcademyError(error)); }
    finally { setLoading(false); }
  }

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;
    setLoading(true); setMessage("");
    const data = new FormData(event.currentTarget);
    try {
      const saved = await saveCreatorApplication(session, {
        fullName: String(data.get("fullName") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        province: String(data.get("province") || "").trim(),
        expertise: String(data.get("expertise") || "").trim(),
        experience: String(data.get("experience") || "").trim(),
        sampleLink: String(data.get("sampleLink") || "").trim(),
      });
      setApplication(saved);
      setMessage(t("Application saved successfully.", "បានរក្សាទុកពាក្យស្នើសុំដោយជោគជ័យ។"));
    } catch (error) { setMessage(readableAcademyError(error)); }
    finally { setLoading(false); }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setSession(null); setApplication(null); setMessage("");
  }

  if (loading && !session) return <Shell locale={locale}><p className="py-24 text-center font-bold text-slate-500">Loading…</p></Shell>;

  if (!session) return (
    <Shell locale={locale}>
      <div className="mx-auto max-w-md rounded-[30px] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-green-700">CREATOR ACCOUNT</p>
        <h1 className="mt-3 text-3xl font-black">{mode === "login" ? t("Creator Login", "ចូលគណនី Creator") : t("Create Creator Account", "បង្កើតគណនី Creator")}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">{t("Use your email and password to manage your creator application and courses.", "ប្រើអ៊ីមែល និងលេខសម្ងាត់ ដើម្បីគ្រប់គ្រងពាក្យស្នើសុំ និងមេរៀនរបស់អ្នក។")}</p>
        <form onSubmit={authenticate} className="mt-7 space-y-4">
          <Field name="email" type="email" label={t("Email", "អ៊ីមែល")} required />
          <Field name="password" type="password" label={t("Password", "លេខសម្ងាត់")} minLength={6} required />
          {message && <Alert text={message} />}
          <button disabled={loading} className="w-full rounded-2xl bg-green-600 px-5 py-3.5 font-black text-white hover:bg-green-500 disabled:opacity-60">{loading ? "Loading…" : mode === "login" ? t("Login", "ចូលគណនី") : t("Create account", "បង្កើតគណនី")}</button>
        </form>
        <button onClick={() => {setMode(mode === "login" ? "register" : "login"); setMessage("");}} className="mt-5 w-full text-sm font-bold text-green-700">{mode === "login" ? t("No account? Register here", "មិនទាន់មានគណនី? ចុះឈ្មោះទីនេះ") : t("Already registered? Login", "មានគណនីរួចហើយ? ចូលគណនី")}</button>
      </div>
    </Shell>
  );

  const approved = application?.status === "approved";
  return (
    <Shell locale={locale} onLogout={logout}>
      <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="rounded-[30px] bg-slate-950 p-7 text-white">
          <p className="text-sm font-black text-green-400">{session.email}</p>
          <h1 className="mt-3 text-3xl font-black">Creator Dashboard</h1>
          <div className="mt-7 rounded-2xl bg-white/10 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("Application status", "ស្ថានភាពពាក្យស្នើសុំ")}</p>
            <Status status={application?.status} locale={locale} />
            {application?.adminNote && <p className="mt-3 text-sm leading-6 text-amber-200">{application.adminNote}</p>}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Stat icon={BookOpen} value="0" label={t("Courses", "មេរៀន")} />
            <Stat icon={WalletCards} value="0៛" label={t("Balance", "សមតុល្យ")} />
          </div>
          <p className="mt-5 text-xs leading-5 text-slate-400">{t(`Withdrawal becomes available from ${MINIMUM_WITHDRAWAL_RIEL.toLocaleString()}៛.`, `អាចស្នើដកប្រាក់ចាប់ពី ${MINIMUM_WITHDRAWAL_RIEL.toLocaleString()}៛។`)}</p>
        </aside>

        <section className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
          {approved ? (
            <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
              <BadgeCheck className="h-16 w-16 text-green-600" />
              <h2 className="mt-5 text-3xl font-black">{t("You are an approved Creator!", "អ្នកត្រូវបានអនុម័តជា Creator ហើយ!")}</h2>
              <p className="mt-3 max-w-lg leading-7 text-slate-500">{t("Course upload and sales tools are the next phase. Your account is ready for them.", "មុខងារ Upload មេរៀន និងការលក់ ជាដំណាក់កាលបន្ទាប់។ គណនីអ្នករួចរាល់សម្រាប់ប្រើមុខងារទាំងនោះ។")}</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-black">{application ? t("Update creator application", "កែប្រែពាក្យស្នើសុំ Creator") : t("Creator application", "ពាក្យស្នើសុំ Creator")}</h2>
              <p className="mt-2 text-sm text-slate-500">{t("Tell Sesan about your skills. An admin will review your application.", "ប្រាប់ Sesan អំពីជំនាញរបស់អ្នក។ Admin នឹងពិនិត្យពាក្យស្នើសុំនេះ។")}</p>
              <form onSubmit={submitApplication} className="mt-7 grid gap-4 md:grid-cols-2">
                <Field name="fullName" label={t("Full name", "ឈ្មោះពេញ")} defaultValue={application?.fullName} required />
                <Field name="phone" label={t("Phone number", "លេខទូរស័ព្ទ")} defaultValue={application?.phone} required />
                <Field name="province" label={t("Province / City", "ខេត្ត / រាជធានី")} defaultValue={application?.province} required />
                <Field name="expertise" label={t("Main expertise", "ជំនាញសំខាន់")} defaultValue={application?.expertise} placeholder={t("Example: Agriculture, AI video", "ឧ. កសិកម្ម, វីដេអូ AI")} required />
                <div className="md:col-span-2"><Field name="sampleLink" type="url" label={t("Sample video or page link (optional)", "Link វីដេអូគំរូ ឬ Page (មិនបង្ខំ)")} defaultValue={application?.sampleLink} /></div>
                <label className="md:col-span-2 text-sm font-bold text-slate-700">{t("Experience and lesson idea", "បទពិសោធន៍ និងគំនិតមេរៀន")}<textarea name="experience" defaultValue={application?.experience} required rows={5} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500" /></label>
                {message && <div className="md:col-span-2"><Alert text={message} /></div>}
                <button disabled={loading} className="md:col-span-2 rounded-2xl bg-green-600 px-5 py-3.5 font-black text-white hover:bg-green-500 disabled:opacity-60">{loading ? "Saving…" : t("Submit application", "ដាក់ស្នើពាក្យ")}</button>
              </form>
            </>
          )}
        </section>
      </div>
    </Shell>
  );
}

function Shell({locale, children, onLogout}: {locale: "km" | "en"; children: React.ReactNode; onLogout?: () => void}) {
  return <main className="min-h-screen bg-slate-50 text-slate-950"><header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"><Link href={`/${locale}/academy`} className="flex items-center gap-3"><img src="/sesan-logo.png" alt="Sesan" className="h-11 w-11 object-contain" /><div><p className="font-black text-green-700">SESAN ACADEMY</p><p className="text-xs font-bold text-slate-400">CREATOR CENTER</p></div></Link>{onLogout ? <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold"><LogOut className="h-4 w-4" />Logout</button> : <Link href={`/${locale}/academy/creator`} className="text-sm font-bold text-green-700">About Creator</Link>}</div></header><div className="mx-auto max-w-6xl px-5 py-10">{children}</div></main>;
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & {label: string}) {const {label, ...input} = props; return <label className="block text-sm font-bold text-slate-700">{label}<input {...input} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500" /></label>;}
function Alert({text}: {text: string}) {return <p className="flex gap-2 rounded-2xl bg-amber-50 p-4 text-sm font-bold text-amber-800"><ShieldAlert className="h-5 w-5 shrink-0" />{text}</p>;}
function Status({status, locale}: {status?: CreatorApplication["status"]; locale: "km" | "en"}) {const value = status ?? "not-submitted"; const labels = locale === "km" ? {"not-submitted": "មិនទាន់ដាក់ស្នើ", pending: "កំពុងរង់ចាំពិនិត្យ", approved: "បានអនុម័ត", rejected: "មិនបានអនុម័ត"} : {"not-submitted": "Not submitted", pending: "Pending review", approved: "Approved", rejected: "Rejected"}; return <p className={`mt-2 flex items-center gap-2 text-lg font-black ${value === "approved" ? "text-green-400" : value === "rejected" ? "text-red-300" : "text-amber-300"}`}><Clock3 className="h-5 w-5" />{labels[value]}</p>;}
function Stat({icon: Icon, value, label}: {icon: typeof BookOpen; value: string; label: string}) {return <div className="rounded-2xl bg-white/10 p-4"><Icon className="h-5 w-5 text-green-400" /><p className="mt-3 text-xl font-black">{value}</p><p className="text-xs text-slate-400">{label}</p></div>;}
