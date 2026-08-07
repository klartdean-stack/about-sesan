import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Beef,
  BookOpen,
  Bug,
  Leaf,
  LineChart,
  Microscope,
  Sprout,
  Tractor,
} from "lucide-react";
import {listPublishedKnowledgeArticles} from "@/lib/firebase-rest";

const locales = ["en", "km"] as const;
type Locale = (typeof locales)[number];

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const content = {
  en: {
    metadataTitle:
      "Agriculture Knowledge Center | Sesan Group Cambodia",

    metadataDescription:
      "Practical agricultural knowledge, farming techniques, crop protection, livestock, soil management and market information for Cambodian farmers.",

    backHome: "Back to Home",
    badge: "Sesan Agriculture Knowledge",
    titleFirst: "Practical knowledge for",
    titleHighlight: "Cambodian agriculture.",
    description:
      "Discover useful farming techniques, crop protection guidance, livestock knowledge, agricultural technology and market information.",

    featuredLabel: "Featured Knowledge",
    featuredCategory: "Farming Techniques",
    featuredTitle:
      "Preparing farmland before planting vegetables",
    featuredDescription:
      "Learn the essential steps for soil preparation, drainage, organic matter management and crop planning before planting.",

    categoriesTitle: "Explore by category",
    categoriesDescription:
      "Find agricultural knowledge based on your interests and farming activities.",

    latestTitle: "Latest agricultural knowledge",
    latestDescription:
      "New practical articles and farming guidance from the Sesan team.",

    readArticle: "Read article",
    comingSoon: "Article coming soon",
    knowledgeComingSoon:
      "More professional agricultural articles are being prepared.",

    categories: [
      {
        title: "Crops & Techniques",
        description:
          "Rice, vegetables, fruit trees and practical farming methods.",
        icon: Sprout,
      },
      {
        title: "Crop Protection",
        description:
          "Plant diseases, insects and safe crop protection practices.",
        icon: Bug,
      },
      {
        title: "Soil & Fertilizer",
        description:
          "Soil fertility, compost, fertilizer and nutrient management.",
        icon: Leaf,
      },
      {
        title: "Livestock",
        description:
          "Animal care, feeding, health and livestock management.",
        icon: Beef,
      },
      {
        title: "Market & Business",
        description:
          "Agricultural markets, costs, prices and business planning.",
        icon: LineChart,
      },
      {
        title: "Agricultural Technology",
        description:
          "Machines, digital tools and modern agricultural solutions.",
        icon: Tractor,
      },
    ],

    articles: [
      {
        category: "Soil & Fertilizer",
        title: "How to prepare soil before planting vegetables",
        description:
          "Important soil preparation steps that help roots grow well and reduce waterlogging problems.",
        icon: Leaf,
      },
      {
        category: "Crop Protection",
        title: "Early signs of common leaf diseases",
        description:
          "Recognize unusual leaf colors, spots and damage before the disease becomes severe.",
        icon: Microscope,
      },
      {
        category: "Market & Business",
        title: "Simple ways to reduce farming production costs",
        description:
          "Plan materials, labor and farm inputs carefully to improve profitability.",
        icon: LineChart,
      },
    ],
  },

  km: {
    metadataTitle:
      "មជ្ឈមណ្ឌលចំណេះដឹងកសិកម្ម | Sesan Group",

    metadataDescription:
      "ចំណេះដឹងកសិកម្ម បច្ចេកទេសដាំដុះ ការពារដំណាំ ចិញ្ចឹមសត្វ ការគ្រប់គ្រងដី ជី និងព័ត៌មានទីផ្សារ។",

    backHome: "ត្រឡប់ទៅទំព័រដើម",
    badge: "ចំណេះដឹងកសិកម្ម Sesan",
    titleFirst: "ចំណេះដឹងមានប្រយោជន៍សម្រាប់",
    titleHighlight: "កសិកម្មកម្ពុជា។",
    description:
      "ស្វែងយល់ពីបច្ចេកទេសដាំដុះ ការពារដំណាំ ការចិញ្ចឹមសត្វ បច្ចេកវិទ្យាកសិកម្ម និងព័ត៌មានទីផ្សារ។",

    featuredLabel: "អត្ថបទពិសេស",
    featuredCategory: "បច្ចេកទេសកសិកម្ម",
    featuredTitle:
      "ការរៀបចំដីមុនពេលដាំបន្លែ",
    featuredDescription:
      "ស្វែងយល់ពីការរៀបចំដី ប្រព័ន្ធបង្ហូរទឹក ការប្រើជីសរីរាង្គ និងការរៀបចំផែនការដាំដុះ។",

    categoriesTitle: "ស្វែងរកតាមប្រភេទ",
    categoriesDescription:
      "ជ្រើសរើសចំណេះដឹងតាមចំណាប់អារម្មណ៍ និងប្រភេទការងារកសិកម្មរបស់អ្នក។",

    latestTitle: "ចំណេះដឹងកសិកម្មថ្មីៗ",
    latestDescription:
      "អត្ថបទ និងការណែនាំថ្មីៗពីក្រុមការងារ Sesan។",

    readArticle: "អានអត្ថបទ",
    comingSoon: "អត្ថបទនឹងមកដល់ឆាប់ៗ",
    knowledgeComingSoon:
      "អត្ថបទកសិកម្មដែលមានគុណភាពបន្ថែមទៀត កំពុងត្រូវបានរៀបចំ។",

    categories: [
      {
        title: "ដំណាំ និងបច្ចេកទេស",
        description:
          "ស្រូវ បន្លែ ដំណាំហូបផ្លែ និងបច្ចេកទេសដាំដុះជាក់ស្តែង។",
        icon: Sprout,
      },
      {
        title: "ការពារដំណាំ",
        description:
          "ជំងឺដំណាំ សត្វល្អិត និងវិធីការពារដំណាំប្រកបដោយសុវត្ថិភាព។",
        icon: Bug,
      },
      {
        title: "ដី និងជី",
        description:
          "ជីជាតិដី ជីកំប៉ុស ការប្រើជី និងការគ្រប់គ្រងសារធាតុចិញ្ចឹម។",
        icon: Leaf,
      },
      {
        title: "ការចិញ្ចឹមសត្វ",
        description:
          "ការថែទាំ ចំណី សុខភាព និងការគ្រប់គ្រងសត្វចិញ្ចឹម។",
        icon: Beef,
      },
      {
        title: "ទីផ្សារ និងអាជីវកម្ម",
        description:
          "ទីផ្សារកសិកម្ម ថ្លៃដើម តម្លៃ និងការរៀបចំអាជីវកម្ម។",
        icon: LineChart,
      },
      {
        title: "បច្ចេកវិទ្យាកសិកម្ម",
        description:
          "គ្រឿងយន្ត ឧបករណ៍ឌីជីថល និងដំណោះស្រាយកសិកម្មទំនើប។",
        icon: Tractor,
      },
    ],

    articles: [
      {
        category: "ដី និងជី",
        title: "វិធីរៀបចំដីមុនពេលដាំបន្លែ",
        description:
          "ជំហានសំខាន់ៗក្នុងការរៀបចំដី ដែលជួយឫសដុះល្អ និងកាត់បន្ថយបញ្ហាទឹកជន់។",
        icon: Leaf,
      },
      {
        category: "ការពារដំណាំ",
        title: "សញ្ញាដំបូងនៃជំងឺស្លឹកដំណាំ",
        description:
          "សម្គាល់ពណ៌ស្លឹក ស្នាមអុជ និងការខូចខាតមិនប្រក្រតី មុនជំងឺរីករាលដាលធ្ងន់ធ្ងរ។",
        icon: Microscope,
      },
      {
        category: "ទីផ្សារ និងអាជីវកម្ម",
        title: "គន្លឹះកាត់បន្ថយថ្លៃដើមកសិកម្ម",
        description:
          "រៀបចំសម្ភារៈ កម្លាំងពលកម្ម និងធាតុចូលកសិកម្មឱ្យបានត្រឹមត្រូវ ដើម្បីបង្កើនប្រាក់ចំណេញ។",
        icon: LineChart,
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {locale} = await params;

  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const pageContent = content[locale as Locale];

  return {
    title: pageContent.metadataTitle,
    description: pageContent.metadataDescription,

    alternates: {
      canonical: `https://about.sesanshop.com/${locale}/knowledge`,
      languages: {
        en: "https://about.sesanshop.com/en/knowledge",
        km: "https://about.sesanshop.com/km/knowledge",
      },
    },

    openGraph: {
      title: pageContent.metadataTitle,
      description: pageContent.metadataDescription,
      url: `https://about.sesanshop.com/${locale}/knowledge`,
      siteName: "Sesan Group",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Sesan Agriculture Knowledge Center",
        },
      ],
    },
  };
}

export default async function KnowledgePage({
  params,
}: PageProps) {
  const {locale} = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const pageContent = content[locale as Locale];
  const publishedArticles = await listPublishedKnowledgeArticles().catch(() => []);
  const featuredArticle =
    publishedArticles.find((article) => article.featured) ?? publishedArticles[0];

  const articleText = (article: (typeof publishedArticles)[number]) => ({
    title: locale === "km" ? article.titleKm : article.titleEn,
    summary: locale === "km" ? article.summaryKm : article.summaryEn,
  });

  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3"
          >
            <img
              src="/sesan-logo.png"
              alt="Sesan Group"
              className="h-11 w-11 object-contain"
            />

            <div>
              <p className="text-xl font-black text-green-700">
                SESAN
              </p>

              <p className="text-[9px] font-black tracking-[0.35em] text-amber-500">
                GROUP
              </p>
            </div>
          </Link>

          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-green-500 hover:text-green-700"
          >
            <ArrowLeft className="h-4 w-4" />
            {pageContent.backHome}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-amber-50 px-5 py-24 lg:px-8 lg:py-32">
        <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-green-200/30 blur-3xl" />
        <div className="absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-5 py-2.5 text-sm font-black uppercase tracking-[0.18em] text-green-700 shadow-sm">
              <BookOpen className="h-4 w-4" />
              {pageContent.badge}
            </div>

            <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {pageContent.titleFirst}

              <span className="block bg-gradient-to-r from-green-700 via-emerald-500 to-sky-500 bg-clip-text text-transparent">
                {pageContent.titleHighlight}
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-9 text-slate-600 sm:text-xl">
              {pageContent.description}
            </p>
          </div>
        </div>
      </section>

      {/* Featured article */}
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <article className="overflow-hidden rounded-[36px] bg-slate-950 text-white shadow-2xl">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="flex min-h-[360px] items-center justify-center overflow-hidden bg-gradient-to-br from-green-600 to-emerald-400">
                {featuredArticle?.coverImage ? (
                  <img src={featuredArticle.coverImage} alt="" className="h-full min-h-[360px] w-full object-cover" />
                ) : (
                  <div className="flex h-40 w-40 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm">
                    <Sprout className="h-20 w-20 text-white" />
                  </div>
                )}
              </div>

              <div className="p-8 sm:p-12 lg:p-16">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-green-400">
                  {pageContent.featuredLabel}
                </p>

                <p className="mt-6 text-sm font-bold text-amber-300">
                  {featuredArticle?.category ?? pageContent.featuredCategory}
                </p>

                <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                  {featuredArticle ? articleText(featuredArticle).title : pageContent.featuredTitle}
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-300">
                  {featuredArticle ? articleText(featuredArticle).summary : pageContent.featuredDescription}
                </p>

                {featuredArticle ? (
                  <Link href={`/${locale}/knowledge/${featuredArticle.id}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-black text-white transition hover:bg-green-400">
                    {pageContent.readArticle}<ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-300">{pageContent.comingSoon}</div>
                )}
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-green-700">
              Knowledge Categories
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              {pageContent.categoriesTitle}
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              {pageContent.categoriesDescription}
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageContent.categories.map((category) => {
              const Icon = category.icon;

              return (
                <article
                  key={category.title}
                  className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700 transition group-hover:bg-green-600 group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-black">
                    {category.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {category.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest articles */}
      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-green-700">
              Latest Articles
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              {pageContent.latestTitle}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {pageContent.latestDescription}
            </p>
          </div>

          <div className="mt-14 grid gap-7 lg:grid-cols-3">
            {(publishedArticles.length ? publishedArticles : pageContent.articles).map((article) => {
              const isFirebaseArticle = "id" in article;
              const Icon = isFirebaseArticle ? BookOpen : article.icon;
              const title = isFirebaseArticle ? articleText(article).title : article.title;
              const description = isFirebaseArticle ? articleText(article).summary : article.description;

              return (
                <article
                  key={isFirebaseArticle ? article.id : article.title}
                  className="flex flex-col rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  {isFirebaseArticle && article.coverImage ? (
                    <img src={article.coverImage} alt="" className="aspect-video w-full rounded-2xl object-cover" />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-emerald-50 text-green-700"><Icon className="h-8 w-8" /></div>
                  )}

                  <p className="mt-7 text-sm font-black uppercase tracking-[0.14em] text-green-700">
                    {article.category}
                  </p>

                  <h3 className="mt-3 text-2xl font-black leading-tight">
                    {title}
                  </h3>

                  <p className="mt-4 flex-1 leading-7 text-slate-600">
                    {description}
                  </p>

                  {isFirebaseArticle ? (
                    <Link href={`/${locale}/knowledge/${article.id}`} className="mt-7 flex items-center gap-2 text-sm font-black text-green-700 hover:text-green-600">{pageContent.readArticle}<ArrowRight className="h-4 w-4" /></Link>
                  ) : (
                    <div className="mt-7 flex items-center gap-2 text-sm font-black text-slate-400">{pageContent.comingSoon}<ArrowRight className="h-4 w-4" /></div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="mt-14 rounded-[30px] border border-green-200 bg-green-50 p-8 text-center sm:p-10">
            <BookOpen className="mx-auto h-10 w-10 text-green-700" />

            <p className="mt-4 text-lg font-bold text-green-900">
              {pageContent.knowledgeComingSoon}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
