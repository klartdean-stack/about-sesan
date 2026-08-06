import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["en", "km"] as const;

type Locale = (typeof locales)[number];

export const metadata: Metadata = {
  metadataBase: new URL("https://about.sesanshop.com"),

  title: {
    default: "Sesan Group | Cambodia Agriculture Technology",
    template: "%s | Sesan Group",
  },

  description:
    "Cambodia's agriculture ecosystem connecting farmers, businesses and consumers through Sesan App, Sesan Shop, agricultural technology, knowledge and trusted services.",

  verification: {
    google: "uNrynhV2h1VeXIYMyIa570gnwIInTuQUaLdxsy7Hj10",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}