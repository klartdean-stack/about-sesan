import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://about.sesanshop.com"),

  title: "Sesan Group | Cambodia Agriculture Technology",

  description:
    "Cambodia's agriculture ecosystem connecting farmers, businesses and consumers through Sesan App, Sesan Shop, Sesan Media, Sesan Tools, Sesan Plant and Sesan Animal.",

  keywords: [
    "Sesan Group",
    "Sesan App",
    "Sesan Shop",
    "Sesan Media",
    "Sesan Tools",
    "Sesan Plant",
    "Sesan Animal",
    "Cambodia Agriculture",
    "Cambodian Farmers",
    "Agriculture Technology",
    "Agricultural Marketplace",
  ],

  authors: [
    {
      name: "Sesan Group",
    },
  ],

  creator: "Sesan Group",
  publisher: "Sesan Group",

  openGraph: {
    title: "Sesan Group | Cambodia Agriculture Technology",
    description:
      "Cambodia's agriculture ecosystem connecting farmers, businesses and consumers through technology, markets, agricultural knowledge and trusted services.",
    url: "https://about.sesanshop.com",
    type: "website",
    locale: "en_US",
    siteName: "Sesan Group",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sesan Group | Cambodia Agriculture Technology",
    description:
      "Cambodia's agriculture ecosystem connecting farmers, businesses and consumers.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>

      <GoogleAnalytics gaId="G-V4YYJQV2RG" />
    </html>
  );
}