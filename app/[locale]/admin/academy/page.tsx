import {notFound} from "next/navigation";
import AcademyAdmin from "./AcademyAdmin";

export const metadata = {title: "Academy Admin | Sesan Group"};

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (locale !== "km" && locale !== "en") notFound();
  return <AcademyAdmin locale={locale} />;
}
