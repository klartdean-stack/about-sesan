import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Script from "next/script";

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
      "Cambodia's agriculture ecosystem connecting farmers, businesses and consumers through technology, markets, knowledge and trusted services.",

    url: "https://about.sesanshop.com",

    siteName: "Sesan Group",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sesan Group Cambodia Agriculture Technology",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Sesan Group | Cambodia Agriculture Technology",

    description:
      "Connecting Cambodian agriculture through technology, markets, knowledge and trusted services.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<body>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Sesan Group",
        url: "https://about.sesanshop.com",
        logo: "https://about.sesanshop.com/sesan-logo.png",
        description:
          "Cambodia agriculture ecosystem connecting farmers, businesses and consumers through technology.",
        email: "sesanagriculture@gmail.com",
        telephone: "+85511930717",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chamkar Mon",
          addressRegion: "Phnom Penh",
          addressCountry: "KH",
        },
      }),
    }}
  />

  {children}
  <Script id="microsoft-clarity" strategy="afterInteractive">
  {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xy7h8hhedo");
  `}
</Script>
</body>

      <GoogleAnalytics gaId="G-V4YYJQV2RG" />
    </html>
  );
}