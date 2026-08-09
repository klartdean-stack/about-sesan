"use client";

import {useEffect, useMemo, useState} from "react";
import {BadgeCheck, Clock3, ImageIcon, RefreshCw, XCircle} from "lucide-react";
import {AcademySession} from "@/lib/academy-firebase-rest";

type Payment = {
  paymentId: string;
  buyerEmail: string;
  courseId: string;
  courseTitle: string;
  amountRiel: number;
  status: string;
  adminNote: string;
  createdAt: string;
};

export default function PaymentReview({session, locale}: {session: AcademySession; locale: "km" | "en"}) {
  const km = locale === "km";
  const t = (en: string, kh: string) => km ? kh : en;
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState<{paymentId: string; url: string} | null>(null);

  async function load() {
    setLoading(true); setMessage("");
    try {
      const response = await fetch("/api/academy/manual-payment/admin/list", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({idToken: session.idToken})});
      const data = await response.json() as {payments?: Payment[]; error?: string};
      if (!response.ok) throw new Error(data.error || "LOAD_FAILED");
      setPayments(data.payments || []);
    } catch { setMessage(t("Could not load payment requests.", "មិនអាចទាញយកសំណើទូទាត់បានទេ។")); }
    finally { setLoading(false); }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
    // The admin token is the only value that should trigger a fresh list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.idToken]);
  useEffect(() => () => {if (receipt) URL.revokeObjectURL(receipt.url);}, [receipt]);

  async function openReceipt(paymentId: string) {
    if (receipt?.paymentId === paymentId) {URL.revokeObjectURL(receipt.url); setReceipt(null); return;}
    setLoading(true); setMessage("");
    try {
      const response = await fetch("/api/academy/manual-payment/admin/receipt", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({idToken: session.idToken, paymentId})});
      if (!response.ok) throw new Error("RECEIPT_FAILED");
      const url = URL.createObjectURL(await response.blob());
      if (receipt) URL.revokeObjectURL(receipt.url);
      setReceipt({paymentId, url});
    } catch { setMessage(t("Could not open the receipt.", "មិនអាចបើកវិក្កយបត្របានទេ។")); }
    finally { setLoading(false); }
  }

  async function review(payment: Payment, decision: "approved" | "rejected") {
    const warning = decision === "approved"
      ? t("Approve only after confirming this exact payment in ABA Merchant. Continue?", "អនុម័តតែបន្ទាប់ពីឃើញប្រាក់ចូលពិតក្នុង ABA Merchant។ តើបន្តទេ?")
      : t("Reject this receipt?", "តើបដិសេធវិក្កយបត្រនេះមែនទេ?");
    if (!window.confirm(warning)) return;
    const adminNote = window.prompt(t("Admin note", "មូលហេតុ/កំណត់ចំណាំ Admin"), payment.adminNote) || "";
    setLoading(true); setMessage("");
    try {
      const response = await fetch("/api/academy/manual-payment/admin/review", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({idToken: session.idToken, paymentId: payment.paymentId, decision, adminNote})});
      if (!response.ok) throw new Error("REVIEW_FAILED");
      setPayments(items => items.map(item => item.paymentId === payment.paymentId ? {...item, status: decision, adminNote} : item));
    } catch { setMessage(t("Could not update this payment.", "មិនអាចកែស្ថានភាពការទូទាត់បានទេ។")); }
    finally { setLoading(false); }
  }

  const visible = useMemo(() => payments.filter(item => filter === "all" || item.status === filter), [payments, filter]);
  const pending = payments.filter(item => item.status === "pending").length;
  return <section className="mt-12 border-t border-slate-200 pt-10">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[0.18em] text-sky-700">MANUAL ABA PAYMENTS</p><h2 className="mt-2 text-3xl font-black">{t("Receipt verification", "ផ្ទៀងផ្ទាត់វិក្កយបត្រ")}</h2><p className="mt-2 text-sm text-slate-500">{pending} {t("payments waiting", "ការទូទាត់កំពុងរង់ចាំ")}</p></div><div className="flex gap-2"><button onClick={load} className="rounded-xl border border-slate-200 p-3"><RefreshCw className="h-5 w-5" /></button><select value={filter} onChange={event => setFilter(event.target.value)} className="rounded-xl border border-slate-200 px-4 font-bold"><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="all">All</option></select></div></div>
    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-900">{t("Never approve from the screenshot alone. Match the amount, time and payer against ABA Merchant transaction history first.", "កុំអនុម័តដោយមើលតែរូបវិក្កយបត្រ។ ត្រូវផ្ទៀងផ្ទាត់ចំនួនប្រាក់ ពេលវេលា និងអ្នកបង់ជាមួយ Transaction ក្នុង ABA Merchant ជាមុន។")}</div>
    {message && <p className="mt-4 rounded-2xl bg-red-50 p-4 font-bold text-red-700">{message}</p>}
    <div className="mt-6 grid gap-5 lg:grid-cols-2">{visible.map(payment => <article key={payment.paymentId} className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-4"><div><h3 className="text-xl font-black">{payment.courseTitle}</h3><p className="mt-1 text-sm text-slate-500">{payment.buyerEmail}</p></div><Status status={payment.status} /></div><div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4"><div><p className="text-xs font-bold text-slate-400">{t("Amount", "ចំនួនប្រាក់")}</p><p className="mt-1 text-xl font-black text-green-700">{payment.amountRiel.toLocaleString()}៛</p></div><div><p className="text-xs font-bold text-slate-400">{t("Submitted", "បានបញ្ជូន")}</p><p className="mt-1 text-sm font-black">{payment.createdAt ? new Date(payment.createdAt).toLocaleString(km ? "km-KH" : "en-GB") : "—"}</p></div></div><button disabled={loading} onClick={() => openReceipt(payment.paymentId)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 font-black text-white"><ImageIcon className="h-5 w-5" />{receipt?.paymentId === payment.paymentId ? t("Close receipt", "បិទវិក្កយបត្រ") : t("Open receipt", "បើកវិក្កយបត្រ")}</button>{receipt?.paymentId === payment.paymentId && <img src={receipt.url} alt="Payment receipt" className="mt-3 max-h-[520px] w-full rounded-2xl border border-slate-200 object-contain" />}{payment.adminNote && <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm">Admin: {payment.adminNote}</p>}{payment.status === "pending" && <div className="mt-4 grid grid-cols-2 gap-3"><button disabled={loading} onClick={() => review(payment, "rejected")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 font-black text-red-700"><XCircle className="h-4 w-4" />{t("Reject", "បដិសេធ")}</button><button disabled={loading} onClick={() => review(payment, "approved")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-black text-white"><BadgeCheck className="h-4 w-4" />{t("Payment received", "ប្រាក់ចូលរួច")}</button></div>}</article>)}{!loading && visible.length === 0 && <div className="lg:col-span-2 rounded-[26px] border border-dashed border-slate-300 py-16 text-center text-slate-400"><Clock3 className="mx-auto h-10 w-10" /><p className="mt-3 font-bold">{t("No payments in this list.", "មិនមានការទូទាត់ក្នុងបញ្ជីនេះ។")}</p></div>}</div>
  </section>;
}

function Status({status}: {status: string}) {const style = status === "approved" ? "bg-green-100 text-green-700" : status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"; return <span className={`rounded-full px-3 py-1 text-xs font-black ${style}`}>{status}</span>;}
