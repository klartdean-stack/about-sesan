"use client";

import Link from "next/link";
import {FormEvent, useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {CheckCircle2, LoaderCircle, LockKeyhole} from "lucide-react";
import {confirmAdminPasswordReset, readableFirebaseError, verifyAdminPasswordResetCode} from "@/lib/firebase-rest";

export default function ResetPasswordPage() {
  const params = useParams<{locale:string}>();
  const locale = params.locale === "en" ? "en" : "km";
  const [oobCode,setOobCode]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirm,setConfirm]=useState("");
  const [checking,setChecking]=useState(true);
  const [saving,setSaving]=useState(false);
  const [done,setDone]=useState(false);
  const [error,setError]=useState("");

  useEffect(()=>{let active=true;const code=new URLSearchParams(window.location.search).get("oobCode")||"";setOobCode(code);(async()=>{if(!code){setError("តំណ Reset មិនត្រឹមត្រូវ ឬខ្វះលេខកូដ។ សូមស្នើតំណថ្មីពី News Admin។");setChecking(false);return;}try{const r=await verifyAdminPasswordResetCode(code);if(active)setEmail(r.email||"");}catch(e){if(active)setError(readableFirebaseError(e));}finally{if(active)setChecking(false);}})();return()=>{active=false};},[]);

  async function submit(e:FormEvent){e.preventDefault();setError("");if(password.length<6){setError("លេខសម្ងាត់ថ្មីត្រូវមានយ៉ាងហោចណាស់ 6 តួអក្សរ។");return;}if(password!==confirm){setError("លេខសម្ងាត់ទាំងពីរមិនដូចគ្នា។");return;}setSaving(true);try{await confirmAdminPasswordReset(oobCode,password);setDone(true);}catch(e){setError(readableFirebaseError(e));}finally{setSaving(false);}}

  return <main className="min-h-screen bg-slate-100 px-5 py-16"><div className="mx-auto max-w-md rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
    <div className="text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700"><LockKeyhole className="h-7 w-7"/></div><h1 className="mt-5 text-2xl font-black">កំណត់លេខសម្ងាត់ថ្មី</h1>{email&&<p className="mt-2 text-sm text-slate-500">{email}</p>}</div>
    {checking?<div className="mt-6 text-center"><LoaderCircle className="mx-auto h-8 w-8 animate-spin text-green-600"/></div>:done?<div className="mt-6 text-center"><CheckCircle2 className="mx-auto h-12 w-12 text-green-600"/><p className="mt-3 font-black text-green-700">បានប្តូរលេខសម្ងាត់រួចរាល់។</p><Link href={`/${locale}/admin/news`} className="mt-5 inline-flex rounded-xl bg-green-600 px-5 py-3 font-black text-white">ត្រឡប់ទៅ News Admin</Link></div>:<form onSubmit={submit} className="mt-6 space-y-4">
      {error&&<p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
      <input type="password" required minLength={6} autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="លេខសម្ងាត់ថ្មី" className="w-full rounded-xl border border-slate-200 px-4 py-3"/>
      <input type="password" required minLength={6} autoComplete="new-password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="បញ្ជាក់លេខសម្ងាត់ថ្មី" className="w-full rounded-xl border border-slate-200 px-4 py-3"/>
      <button disabled={saving} className="w-full rounded-xl bg-green-600 px-4 py-3 font-black text-white disabled:opacity-60">{saving?"កំពុងរក្សាទុក...":"រក្សាទុកលេខសម្ងាត់ថ្មី"}</button>
    </form>}
  </div></main>;
}
