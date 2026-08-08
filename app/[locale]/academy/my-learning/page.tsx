import {notFound} from "next/navigation";
import MyLearning from "./MyLearning";

export default async function MyLearningPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (locale !== "km" && locale !== "en") notFound();
  return <MyLearning locale={locale} />;
}
