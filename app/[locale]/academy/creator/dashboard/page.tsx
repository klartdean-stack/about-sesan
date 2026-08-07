import {notFound} from "next/navigation";
import CreatorDashboard from "./CreatorDashboard";

export const metadata = {title: "Creator Dashboard | Sesan Academy"};

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (locale !== "km" && locale !== "en") notFound();
  return <CreatorDashboard locale={locale} />;
}
