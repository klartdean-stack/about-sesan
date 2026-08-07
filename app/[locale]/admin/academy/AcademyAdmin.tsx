"use client";

import Link from "next/link";
import {FormEvent, useEffect, useMemo, useState} from "react";
import {BadgeCheck, Clock3, ExternalLink, LogOut, Search, ShieldCheck, UserRoundCheck, UserRoundX} from "lucide-react";
import {AcademySession, CreatorApplication, listCreatorApplications, readableAcademyError, reviewCreatorApplication, signInAcademyAdmin} from "@/lib/academy-firebase-rest";

const SESSION_KEY = "sesan-academy-admin-session";

export default function AcademyAdmin({locale}: {locale: "km" | "en"}) {
  const km = locale === "km";
  const t = (en: string, kh: string) => km ? kh : en;
  const [session, setSession] = useState<AcademySession | null>(null);
  const [applications, setApplications] = useState<CreatorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  async function load(next: AcademySession) { setApplications(await listCreatorApplications(next)); }

  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) { setLoading(false); return; }
    try {
      const saved = JSON.parse(raw) as AcademySession;
      if (saved.expiresAt <= Date.now()) throw new Error("expired");
      setSession(saved);
      load(saved).catch(() => {localStorage.removeItem(SESSION_KEY); setSession(null);}).finally(() => setLoading(false));
    } catch {localStorage.removeItem(SESSION_KEY); setLoading(false);}
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage("");
    const data = new FormData(event.currentTarget);
    try {
      const next = await signInAcademyAdmin(String(data.get("email") || "").trim(), String(data.get("password") || ""));
      localStorage.setItem(SESSION_KEY, JSON.stringify(next)); setSession(next); await load(next);
    } catch (error) {setMessage(readableAcademyError(error));} finally {setLoading(false);}
  }

  async function review(application: CreatorApplication, status: "approved" | "rejected") {
    if (!session) return;
    const note = window.prompt(t("Admin note (optional)", "កំណត់ចំណាំ Admin (មិនបង្ខំ)"), application.adminNote) ?? application.adminNote;
    setLoading(true); setMessage("");
    try {
      const updated = await reviewCreatorApplication(session, application, status, note);
      setApplications(items => items.map(item => item.uid === updated.uid ? updated : item));
    } catch (error) {setMessage(readableAcademyError(error));} finally {setLoading(false);}
  }

  const visible = useMemo(() => applications.filter(item => {
    const haystack = `${item.fullName} ${item.email} ${item.phone} ${item.expertise}`.toLowerCase();
    return (filter === "all" || item.status === filter) && haystack.includes(query.toLowerCase());
  }), [applications, filter, query]);
  const counts = {all: applications.length, pending: applications.filter(x => x.status === "pending").length, approved: applications.filter(x => x.status === "approved").length, rejected: applications.filter(x => x.status === "rejected").length};

  if (!session) return <AdminShell locale={locale}><div className="mx-auto max-w-md rounded-[30px] border border-slate-200 bg-white p-7 shadow-xl"><ShieldCheck className="h-11 w-11 text-green-700" /><h1 className="mt-4 text-3xl font-black">Academy Admin</h1><p className="mt-2 text-sm text-slate-500">{t("Only approved Academy administrators can enter.", "អាចចូលបានតែគណនី Academy Admin ដែលបានអនុញ្ញាត។")}</p><form onSubmit={login} className="mt-7 space-y-4"><Input name="email" type="email" label={t("Email", "អ៊ីមែល")} required /><Input name="password" type="password" label={t("Password", "លេខសម្ងាត់")} required />{message && <p className="rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">{message}</p>}<button disabled={loading} className="w-full rounded-2xl bg-slate-950 px-5 py-3.5 font-black text-white disabled:opacity-50">{loading ? "Loading…" : t("Admin Login", "ចូល Admin")}</button></form></div></AdminShell>;

  return <AdminShell locale={locale} onLogout={() => {localStorage.removeItem(SESSION_KEY); setSession(null);}}>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[0.18em] text-green-700">SESAN ACADEMY</p><h1 className="mt-2 text-4xl font-black">{t("Creator Applications", "ពាក្យស្នើសុំ Creator")}</h1></div><p className="text-sm font-bold text-slate-500">{session.email}</p></div>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Card icon={Clock3} value={counts.all} label={t("All applications", "ពាក្យសរុប")} /><Card icon={Clock3} value={counts.pending} label={t("Pending", "កំពុងរង់ចាំ")} /><Card icon={UserRoundCheck} value={counts.approved} label={t("Approved", "បានអនុម័ត")} /><Card icon={UserRoundX} value={counts.rejected} label={t("Rejected", "មិនអនុម័ត")} /></div>
    <div className="mt-7 flex flex-col gap-3 rounded-[26px] border border-slate-200 bg-white p-4 md:flex-row"><label className="flex flex-1 items-center gap-2 rounded-2xl bg-slate-50 px-4"><Search className="h-5 w-5 text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder={t("Search name, email, skill…", "ស្វែងរកឈ្មោះ អ៊ីមែល ជំនាញ…")} className="w-full bg-transparent py-3 outline-none" /></label><select value={filter} onChange={e => setFilter(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3 font-bold"><option value="all">All ({counts.all})</option><option value="pending">Pending ({counts.pending})</option><option value="approved">Approved ({counts.approved})</option><option value="rejected">Rejected ({counts.rejected})</option></select></div>
    {message && <p className="mt-4 rounded-2xl bg-red-50 p-4 font-bold text-red-700">{message}</p>}
    <div className="mt-5 space-y-4">{visible.length === 0 ? <p className="rounded-[26px] border border-dashed border-slate-300 bg-white py-20 text-center font-bold text-slate-400">{t("No applications found.", "មិនមានពាក្យស្នើសុំ។")}</p> : visible.map(item => <article key={item.uid} className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-5"><div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-black">{item.fullName}</h2><StatusBadge status={item.status} /></div><p className="mt-2 text-sm text-slate-500">{item.email} · {item.phone} · {item.province}</p><p className="mt-3 font-black text-green-700">{item.expertise}</p><p className="mt-3 max-w-3xl whitespace-pre-wrap text-sm leading-6 text-slate-600">{item.experience}</p>{item.sampleLink && <a href={item.sampleLink} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-blue-700">{t("Open sample", "បើកមើលគំរូ")}<ExternalLink className="h-4 w-4" /></a>}{item.adminNote && <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">Admin: {item.adminNote}</p>}</div><div className="flex gap-2"><button disabled={loading} onClick={() => review(item, "rejected")} className="rounded-xl border border-red-200 px-4 py-2 text-sm font-black text-red-700">{t("Reject", "បដិសេធ")}</button><button disabled={loading} onClick={() => review(item, "approved")} className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-black text-white"><BadgeCheck className="h-4 w-4" />{t("Approve", "អនុម័ត")}</button></div></div></article>)}</div>
  </AdminShell>;
}

function AdminShell({locale, children, onLogout}: {locale: "km" | "en"; children: React.ReactNode; onLogout?: () => void}) {return <main className="min-h-screen bg-slate-50 text-slate-950"><header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"><Link href={`/${locale}/academy`} className="flex items-center gap-3"><img src="/sesan-logo.png" alt="Sesan" className="h-10 w-10 object-contain" /><div><p className="font-black text-green-700">SESAN ACADEMY</p><p className="text-xs font-bold text-slate-400">ADMIN</p></div></Link>{onLogout && <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold"><LogOut className="h-4 w-4" />Logout</button>}</div></header><div className="mx-auto max-w-6xl px-5 py-10">{children}</div></main>;}
function Input(props: React.InputHTMLAttributes<HTMLInputElement> & {label: string}) {const {label, ...input} = props; return <label className="block text-sm font-bold text-slate-700">{label}<input {...input} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500" /></label>;}
function Card({icon: Icon, value, label}: {icon: typeof Clock3; value: number; label: string}) {return <div className="rounded-[24px] border border-slate-200 bg-white p-5"><Icon className="h-6 w-6 text-green-700" /><p className="mt-3 text-3xl font-black">{value}</p><p className="text-sm font-bold text-slate-500">{label}</p></div>;}
function StatusBadge({status}: {status: CreatorApplication["status"]}) {const style = status === "approved" ? "bg-green-100 text-green-700" : status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"; return <span className={`rounded-full px-3 py-1 text-xs font-black ${style}`}>{status}</span>;}
