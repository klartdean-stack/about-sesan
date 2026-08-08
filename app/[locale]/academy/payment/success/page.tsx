import {notFound} from "next/navigation";
import PaymentVerifier from "./PaymentVerifier";

export default async function PaymentSuccessPage({params, searchParams}: {params: Promise<{locale: string}>; searchParams: Promise<{tran_id?: string}>}) {
  const {locale} = await params;
  if (locale !== "km" && locale !== "en") notFound();
  const {tran_id = ""} = await searchParams;
  return <PaymentVerifier locale={locale} transactionId={tran_id} />;
}
