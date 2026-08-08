import Link from "next/link";
import {CheckCircle2} from "lucide-react";
import {notFound} from "next/navigation";

export default async function PaymentSuccessPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (locale !== "km" && locale !== "en") notFound();
  const km = locale === "km";
  return <main className="flex min-h-screen items-center justify-center bg-slate-950 p-5"><section className="w-full max-w-xl rounded-[32px] bg-white p-8 text-center shadow-2xl sm:p-12"><CheckCircle2 className="mx-auto h-20 w-20 text-green-600" /><h1 className="mt-6 text-3xl font-black">{km ? "ការទូទាត់ត្រូវបានបញ្ជូន" : "Payment submitted"}</h1><p className="mt-4 leading-7 text-slate-600">{km ? "នេះជា ABA PayWay Sandbox។ យើងនឹងពិនិត្យស្ថានភាពប្រតិបត្តិការ មុនបើកមេរៀន។" : "This is ABA PayWay Sandbox. We will verify the transaction before unlocking the lesson."}</p><Link href={`/${locale}/academy`} className="mt-7 inline-flex rounded-full bg-green-600 px-7 py-4 font-black text-white">{km ? "ត្រឡប់ទៅ Sesan Academy" : "Return to Sesan Academy"}</Link></section></main>;
}

