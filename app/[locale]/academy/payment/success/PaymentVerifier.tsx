"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {CheckCircle2, LoaderCircle, TriangleAlert} from "lucide-react";
import type {AcademySession} from "@/lib/academy-firebase-rest";

const BUYER_SESSION_KEY = "sesan-academy-buyer-session";

export default function PaymentVerifier({locale, transactionId}: {locale: "km" | "en"; transactionId: string}) {
  const km = locale === "km";
  const [state, setState] = useState<"checking" | "paid" | "pending" | "error">("checking");
  useEffect(() => {
    let active = true;
    async function verify() {
      try {
        const session = JSON.parse(localStorage.getItem(BUYER_SESSION_KEY) || "null") as AcademySession | null;
        if (!session?.idToken || !transactionId) throw new Error("LOGIN_REQUIRED");
        const response = await fetch("/api/academy/payway/verify", {
          method: "POST", headers: {"Content-Type": "application/json"},
          body: JSON.stringify({idToken: session.idToken, transactionId}),
        });
        const result = await response.json() as {status?: string};
        if (!response.ok) throw new Error("VERIFY_FAILED");
        if (active) setState(result.status === "paid" ? "paid" : "pending");
      } catch { if (active) setState("error"); }
    }
    verify();
    return () => {active = false;};
  }, [transactionId]);

  const Icon = state === "checking" ? LoaderCircle : state === "paid" ? CheckCircle2 : TriangleAlert;
  const title = state === "checking" ? (km ? "កំពុងផ្ទៀងផ្ទាត់ការទូទាត់…" : "Verifying payment…")
    : state === "paid" ? (km ? "ការទូទាត់ជោគជ័យ" : "Payment successful")
    : state === "pending" ? (km ? "ការទូទាត់កំពុងរង់ចាំ" : "Payment is pending")
    : (km ? "មិនអាចផ្ទៀងផ្ទាត់បាន" : "Could not verify payment");
  const detail = state === "paid" ? (km ? "មេរៀននេះត្រូវបានបញ្ចូលក្នុងគណនីរបស់អ្នករួចហើយ។" : "The course is now saved in your account.")
    : state === "checking" ? (km ? "សូមរង់ចាំបន្តិច។" : "Please wait a moment.")
    : (km ? "សូមត្រឡប់ទៅ Academy ហើយសាកល្បងម្ដងទៀត។" : "Return to the Academy and try again.");
  return <main className="flex min-h-screen items-center justify-center bg-slate-950 p-5"><section className="w-full max-w-xl rounded-[32px] bg-white p-8 text-center shadow-2xl sm:p-12"><Icon className={`mx-auto h-20 w-20 ${state === "checking" ? "animate-spin text-sky-600" : state === "paid" ? "text-green-600" : "text-amber-500"}`} /><h1 className="mt-6 text-3xl font-black">{title}</h1><p className="mt-4 leading-7 text-slate-600">{detail}</p><Link href={`/${locale}/academy`} className="mt-7 inline-flex rounded-full bg-green-600 px-7 py-4 font-black text-white">{km ? "ត្រឡប់ទៅ Sesan Academy" : "Return to Sesan Academy"}</Link></section></main>;
}
