import {notFound} from "next/navigation";
import WatchLesson from "./WatchLesson";

export default async function WatchPage({params}: {params: Promise<{locale: string; courseId: string}>}) {
  const {locale, courseId} = await params;
  if (locale !== "km" && locale !== "en") notFound();
  return <WatchLesson locale={locale} courseId={courseId} />;
}
