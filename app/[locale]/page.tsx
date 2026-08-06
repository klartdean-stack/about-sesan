"use client";
import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Globe, Mail } from "lucide-react";

import {
  FaFacebookF,
  FaTelegramPlane,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

type EcosystemItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  lightColor: string;
  icon: React.ReactNode;
  href: string;
};

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
      <rect
        x="7"
        y="2"
        width="10"
        height="20"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M10 5h4M11 19h2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
      <path
        d="M3 9l2-5h14l2 5M5 9v11h14V9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MediaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M10 9l5 3-5 3V9z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
      <path
        d="M4 17h16M6 17V9h8l3 4h2a2 2 0 012 2v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 9V6h5v3M8 20a2 2 0 100-4 2 2 0 000 4zM18 20a2 2 0 100-4 2 2 0 000 4z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlantIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
      <path
        d="M12 21V10M12 14c-5 0-8-3-8-8 5 0 8 3 8 8zM12 11c0-5 3-8 8-8 0 5-3 8-8 8z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AnimalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
      <path
        d="M6 9c0-3 2.5-5 6-5s6 2 6 5v6c0 3-2.5 5-6 5s-6-2-6-5V9z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M6 10L3 8v5h3M18 10l3-2v5h-3M9 13h.01M15 13h.01M10 17h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M5 12l4 4L19 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M12 21s7-6.1 7-12a7 7 0 10-14 0c0 5.9 7 12 7 12z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="9"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M3 12h18M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function Home() {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const ecosystemItems: EcosystemItem[] = [
    {
      id: "app",
      title: "Sesan App",
      subtitle: "Mobile Agriculture Platform",
      description:
        "A smart mobile platform for buying, selling, chatting, ordering and connecting Cambodia’s agricultural community.",
      color: "from-blue-500 to-blue-700",
      lightColor: "bg-blue-50 text-blue-700",
      icon: <PhoneIcon />,
      href: "#download",
    },
    {
      id: "shop",
      title: "Sesan Shop",
      subtitle: "Digital Marketplace",
      description:
        "A digital marketplace connecting farmers, sellers, businesses and consumers directly through technology.",
      color: "from-orange-400 to-amber-500",
      lightColor: "bg-orange-50 text-orange-700",
      icon: <ShopIcon />,
      href: "https://sesanshop.com",
    },
    {
      id: "media",
      title: "Sesan Media",
      subtitle: "Knowledge and Community",
      description:
        "Agricultural news, educational videos, community stories, market information and digital media for Cambodia.",
      color: "from-sky-400 to-blue-600",
      lightColor: "bg-sky-50 text-sky-700",
      icon: <MediaIcon />,
      href: "#contact",
    },
    {
      id: "tools",
      title: "Sesan Tools",
      subtitle: "Machinery and Equipment",
      description:
        "Agricultural machinery, farming tools, equipment, spare parts and modern solutions for productive farming.",
      color: "from-emerald-500 to-green-700",
      lightColor: "bg-emerald-50 text-emerald-700",
      icon: <ToolsIcon />,
      href: "#contact",
    },
    {
      id: "plant",
      title: "Sesan Plant",
      subtitle: "Plant and Crop Solutions",
      description:
        "Seeds, crops, vegetables, fruits, fertilizers, plant protection and sustainable agricultural solutions.",
      color: "from-lime-400 to-green-600",
      lightColor: "bg-lime-50 text-green-700",
      icon: <PlantIcon />,
      href: "#contact",
    },
    {
      id: "animal",
      title: "Sesan Animal",
      subtitle: "Livestock Solutions",
      description:
        "Livestock, animal feed, breeding, animal products, veterinary information and farming services.",
      color: "from-yellow-400 to-orange-500",
      lightColor: "bg-yellow-50 text-orange-700",
      icon: <AnimalIcon />,
      href: "#contact",
    },
  ];

 const navItems = [
  { label: t("nav.home"), href: "#home" },
  { label: t("nav.about"), href: "#about" },
  { label: t("nav.services"), href: "#ecosystem" },
  { label: t("nav.vision"), href: "#mission" },
  { label: "News", href: "#news" },
  { label: "Promote", href: "#promote" },
  { label: t("nav.contact"), href: "#contact" },
];

const promotionPlans = [
  {
    name: "Basic Listing",
    price: "Free",
    description:
      "Introduce your agricultural business to the Sesan community.",
    features: [
      "Business name and profile",
      "Company contact information",
      "Website or social media link",
      "Listed on Sesan business directory",
    ],
    button: "Apply for Free",
    buttonClass:
      "border border-green-600 bg-white text-green-700 hover:bg-green-50",
    popular: false,
  },
  {
    name: "Featured Partner",
    price: "$25 / month",
    description:
      "Increase your visibility through Sesan platforms and communities.",
    features: [
      "Featured business listing",
      "Sesan App homepage banner",
      "Featured shop placement",
      "Website promotion",
      "One Facebook mention",
    ],
    button: "Become Featured",
    buttonClass:
      "bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-600",
    popular: true,
  },
  {
    name: "Premium Promotion",
    price: "$50 / month",
    description:
      "A complete promotion package across the Sesan ecosystem.",
    features: [
      "Premium Sesan App banner",
      "Featured products and business",
      "Website banner promotion",
      "Telegram Channel sponsored post",
      "Facebook promotion",
      "Priority support",
    ],
    button: "Choose Premium",
    buttonClass:
      "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 hover:from-amber-500 hover:to-orange-600",
    popular: false,
  },
];

const handlePromotionSubmit = (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  const form = new FormData(event.currentTarget);

  const companyName = String(form.get("companyName") || "");
  const contactPerson = String(form.get("contactPerson") || "");
  const phone = String(form.get("phone") || "");
  const telegram = String(form.get("telegram") || "");
  const email = String(form.get("email") || "");
  const website = String(form.get("website") || "");
  const packageName = String(form.get("packageName") || "");
  const message = String(form.get("message") || "");

  const subject = encodeURIComponent(
    `Promotion Request - ${companyName}`
  );

  const body = encodeURIComponent(
`Hello Sesan Group,

I would like to request a business promotion.

Company Name: ${companyName}
Contact Person: ${contactPerson}
Phone: ${phone}
Telegram: ${telegram}
Email: ${email}
Website / Facebook: ${website}
Promotion Package: ${packageName}

Message:
${message}
`
  );

  window.location.href =
    `mailto:info@sesanshop.com?subject=${subject}&body=${body}`;
};

  return (
    <main className="site-home overflow-hidden bg-white text-slate-900">
      {/* Header */}
      <header className="premium-header fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
         <img
  src="/sesan-logo.png"
  alt="Sesan Logo"
  className="h-12 w-12 rounded-full object-contain"
/>

            <div className="leading-none">
              <p className="text-xl font-black tracking-tight text-green-700">
                SESAN
              </p>
              <p className="mt-1 text-[9px] font-bold tracking-[0.34em] text-amber-500">
                GROUP
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-slate-600 transition hover:text-green-700"
              >
                {item.label}
              </a>
            ))}

            <a
              href="https://sesanshop.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-slate-600 transition hover:text-green-700"
            >
              Sesan Shop
            </a>
          </nav>

         <div className="hidden items-center gap-3 lg:flex">
  {/* Language Menu */}
  <details className="group relative">
    <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-green-600 hover:text-green-700">
      <span>🌐</span>
      <span>English</span>

      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4 transition group-open:rotate-180"
        aria-hidden="true"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </summary>

    <div className="absolute right-0 top-full mt-3 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
      <a
        href="/"
        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
      >
        <span>🇬🇧</span>
        <span>English</span>
      </a>

      <a
        href="/km"
        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-700"
      >
        <span>🇰🇭</span>
        <span>ខ្មែរ</span>
      </a>
    </div>
  </details>

  {/* Download Button */}
 <a
  href="#download"
  className="premium-primary-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-black !text-yellow-200"
>
  {t("nav.download")}
</a>
</div>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-900 lg:hidden"
          >
            <MenuIcon open={mobileMenuOpen} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="my-3 border-t border-slate-200 pt-3">
  <p className="px-4 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
    Language
  </p>

  <a
    href="/"
    onClick={() => setMobileMenuOpen(false)}
    className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-green-700 transition hover:bg-green-50"
  >
    <span>🇬🇧</span>
    English
  </a>

  <a
    href="/km"
    onClick={() => setMobileMenuOpen(false)}
    className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-700"
  >
    <span>🇰🇭</span>
    ខ្មែរ
  </a>
</div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[#f8fff8] via-white to-[#fff8e8] px-5 pb-16 pt-28 lg:px-8"
      >
        <div className="hero-glow hero-glow-green" />
        <div className="hero-glow hero-glow-yellow" />
        <div className="hero-grid" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-green-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">
  {t("hero.badge")}
</span>
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.03] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl xl:text-[82px]">
  {t("hero.title1")}
  <span className="hero-gradient-text block">
    {t("hero.title2")}
  </span>
</h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
  {t("hero.description")}
</p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
             <a
  href="#download"
  className="inline-flex items-center justify-center gap-3 rounded-full bg-green-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-green-600/20 transition hover:-translate-y-1 hover:bg-green-700"
>
  {t("hero.download")}
  <ArrowIcon />
</a>

              <a
  href="#ecosystem"
  className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:text-blue-700"
>
  {t("hero.explore")}
</a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
             {[
  t("hero.feature1"),
  t("hero.feature2"),
  t("hero.feature3"),
].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-600"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <CheckIcon />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center">
            <div className="absolute left-0 top-[16%] hidden rounded-2xl border border-white bg-white/90 p-4 shadow-xl backdrop-blur sm:block">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
  {t("hero.technology")}
</p>
<p className="mt-1 text-sm font-bold text-slate-800">
  {t("hero.technologyText")}
</p>
            </div>

            <div className="absolute bottom-[13%] right-0 z-20 hidden rounded-2xl border border-white bg-white/90 p-4 shadow-xl backdrop-blur sm:block">
              <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
  {t("hero.marketplace")}
</p>
<p className="mt-1 text-sm font-bold text-slate-800">
  {t("hero.marketplaceText")}
</p>
            </div>

            <div className="phone-shadow relative rounded-[56px] bg-[#101010] p-[9px]">
              <div className="relative overflow-hidden rounded-[47px] bg-white">
                <div className="absolute left-1/2 top-3 z-20 h-7 w-28 -translate-x-1/2 rounded-full bg-black" />

                <img
                  src="/app-preview.jpg"
                  alt="Sesan App marketplace screen"
                  className="h-[620px] w-[300px] object-cover object-top sm:h-[680px] sm:w-[330px]"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand strip */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-100 sm:grid-cols-4">
          {[
            ["6", "Core platforms"],
            ["25", "Provinces & capital"],
            ["24/7", "Digital access"],
            ["1", "Connected ecosystem"],
          ].map(([number, label]) => (
            <div key={label} className="px-5 py-9 text-center">
              <p className="text-3xl font-black text-green-700 sm:text-4xl">
                {number}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-green-700 to-emerald-500 p-8 text-white sm:p-12">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-yellow-300/30 blur-2xl" />
            <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-blue-400/30 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-green-100">
                About Sesan
              </p>

              <h2 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
                Technology created for Cambodia&apos;s agricultural community.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-green-50">
                Sesan is building a connected agricultural ecosystem where
                farmers, businesses and consumers can access markets,
                information, tools and services from one trusted network.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                  <p className="text-3xl font-black text-yellow-300">Fair</p>
                  <p className="mt-2 text-sm text-green-50">
                    Better opportunities and market access.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                  <p className="text-3xl font-black text-blue-200">Smart</p>
                  <p className="mt-2 text-sm text-green-50">
                    Practical technology for daily agriculture.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="section-label">Who we are</p>

            <h2 className="section-title">
              More than a marketplace.
              <span className="block text-green-700">
                A complete agricultural network.
              </span>
            </h2>

            <p className="mt-7 text-lg leading-8 text-slate-600">
              Sesan is designed to support the agricultural journey—from
              farming tools, plants and animals to digital commerce, mobile
              technology and agricultural media.
            </p>

            <div className="mt-8 space-y-5">
              {[
                "Connecting agricultural sellers with real buyers.",
                "Sharing useful knowledge and market information.",
                "Supporting agricultural tools, crops and livestock.",
                "Building a trusted Cambodian digital agriculture brand.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <CheckIcon />
                  </span>
                  <p className="font-semibold leading-7 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section
        id="ecosystem"
        className="scroll-mt-24 bg-[#f7faf7] px-5 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label">Our ecosystem</p>

            <h2 className="section-title">
              Six platforms.
              <span className="block text-green-700">
                One connected purpose.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Each Sesan platform serves a different need while working
              together to strengthen Cambodian agriculture.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ecosystemItems.map((item) => (
              <article
                id={item.id}
                key={item.id}
                className="ecosystem-card group scroll-mt-28"
              >
                <div className={`h-2 bg-gradient-to-r ${item.color}`} />

                <div className="p-7 sm:p-8">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.lightColor} transition duration-300 group-hover:scale-110`}
                  >
                    {item.icon}
                  </div>

                  <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    {item.subtitle}
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-4 min-h-[84px] leading-7 text-slate-600">
                    {item.description}
                  </p>

                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    className="mt-7 inline-flex items-center gap-2 font-bold text-green-700 transition group-hover:gap-3"
                  >
                    Explore more
                    <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section id="mission" className="scroll-mt-24 px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="relative overflow-hidden rounded-[34px] bg-slate-950 p-8 text-white sm:p-12">
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
                  Our Vision
                </p>

                <h2 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
                  A connected future for every Cambodian farmer.
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-300">
                  To become Cambodia&apos;s trusted agricultural technology
                  ecosystem, connecting every farmer with knowledge,
                  opportunity and markets.
                </p>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-amber-400 to-orange-500 p-8 text-slate-950 sm:p-12">
              <div className="absolute -bottom-16 -right-12 h-56 w-56 rounded-full bg-white/30 blur-3xl" />

              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-950/70">
                  Our Mission
                </p>

                <h2 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
                  Make agricultural technology useful, simple and accessible.
                </h2>

                <p className="mt-6 text-lg leading-8 text-orange-950/80">
                  We connect agriculture with digital tools, direct markets,
                  practical information and trusted community services.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Why Sesan */}
      <section className="bg-slate-950 px-5 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-400">
                Why Sesan
              </p>

              <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                Built around real agricultural needs.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-400">
                Sesan focuses on practical solutions that help agricultural
                communities communicate, trade, learn and grow.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  number: "01",
                  title: "Direct Connection",
                  text: "Farmers and sellers can connect directly with buyers.",
                },
                {
                  number: "02",
                  title: "Trusted Ecosystem",
                  text: "One agricultural brand connecting several important services.",
                },
                {
                  number: "03",
                  title: "Local Understanding",
                  text: "Designed around Cambodia’s agricultural community.",
                },
                {
                  number: "04",
                  title: "Digital Opportunity",
                  text: "Technology that creates more market access and visibility.",
                },
              ].map((item) => (
                <article
                  key={item.number}
                  className="rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <p className="text-sm font-black text-amber-400">
                    {item.number}
                  </p>
                  <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-400">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
<section
  id="news"
  className="scroll-mt-24 bg-slate-50 px-5 py-24 lg:px-8"
>
  <div className="mx-auto max-w-6xl">

    <div className="text-center">
      <p className="section-label">
        Latest Updates
      </p>

      <h2 className="section-title">
        What's New at
        <span className="block text-green-700">
          Sesan Group
        </span>
      </h2>

      <p className="mt-6 text-lg text-slate-600">
        Follow our latest progress, announcements and product updates.
      </p>
    </div>

    <div className="mt-14 space-y-6">

      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">

        <p className="text-sm font-bold text-green-700">
          August 2026
        </p>

        <h3 className="mt-2 text-2xl font-black">
          🌐 Official Website is Now Live
        </h3>

        <p className="mt-4 leading-8 text-slate-600">
          Sesan Group officially launched its multilingual corporate website
          to introduce our ecosystem, technology and agricultural services.
        </p>

      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">

        <p className="text-sm font-bold text-green-700">
          August 2026
        </p>

        <h3 className="mt-2 text-2xl font-black">
          📧 Official Business Email Available
        </h3>

        <p className="mt-4 leading-8 text-slate-600">
          Contact us anytime at
          <span className="font-bold text-green-700">
            {" "}info@sesanshop.com
          </span>
        </p>

      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">

        <p className="text-sm font-bold text-orange-600">
          Coming Soon
        </p>

        <h3 className="mt-2 text-2xl font-black">
          📱 Sesan App for iPhone
        </h3>

        <p className="mt-4 leading-8 text-slate-600">
          The iOS version of Sesan App will be available soon on the App Store.
        </p>

      </div>

    </div>

  </div>
</section>

{/* FAQ */}
<section
  className="scroll-mt-24 bg-white px-5 py-24 lg:px-8"
>
  <div className="mx-auto max-w-4xl">

    <div className="text-center mb-14">

      <p className="section-label">
        Frequently Asked Questions
      </p>

      <h2 className="section-title">
        Everything you need to know
      </h2>

    </div>

    {[
      {
        q: "What is Sesan Group?",
        a: "Sesan Group is Cambodia's agriculture technology ecosystem connecting farmers, businesses and consumers."
      },
      {
        q: "Is Sesan App free?",
        a: "Yes. Sesan App is free to download and use."
      },
      {
        q: "Where can I download Sesan App?",
        a: "Google Play is available now. App Store is coming soon."
      },
      {
        q: "How can I contact Sesan Group?",
        a: "Email: info@sesanshop.com"
      }
    ].map((faq, index) => (

      <div
        key={index}
        className="mb-4 rounded-2xl border border-slate-200 bg-white shadow-sm"
      >

        <button
          onClick={() =>
            setOpenFaq(openFaq === index ? null : index)
          }
          className="flex w-full items-center justify-between px-6 py-5 text-left font-bold"
        >

          {faq.q}

          <span>
            {openFaq === index ? "−" : "+"}
          </span>

        </button>

        {openFaq === index && (

          <div className="border-t px-6 py-5 text-slate-600">

            {faq.a}

          </div>

        )}

      </div>

    ))}

  </div>
</section>

      {/* Download App */}
      <section
        id="download"
        className="scroll-mt-24 bg-gradient-to-br from-green-50 via-white to-blue-50 px-5 py-24 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="section-label">Download Sesan App</p>

            <h2 className="section-title">
              Cambodia&apos;s agricultural marketplace
              <span className="block text-green-700">in your pocket.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Explore agricultural products, contact sellers, manage orders and
              connect with Cambodia&apos;s growing agricultural community.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
             <button
  disabled
  className="store-button bg-slate-950 text-white opacity-60 cursor-not-allowed"
>
  <span className="text-2xl"></span>
  <span>
    <small>Coming Soon</small>
    <strong>App Store</strong>
  </span>
</button>

             <a
  href="https://play.google.com/store/apps/details?id=com.sesan.app"
  target="_blank"
  rel="noopener noreferrer"
  className="store-button border border-slate-300 bg-white text-slate-900"
>
  <span className="play-symbol">▶</span>
  <span>
    <small>GET IT ON</small>
    <strong>Google Play</strong>
  </span>
</a>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Available for iOS and Android.
            </p>
          </div>

          <div className="relative mx-auto">
            <div className="absolute inset-0 scale-90 rounded-full bg-green-300/30 blur-3xl" />

            <div className="relative rotate-3 rounded-[50px] bg-slate-950 p-2 shadow-2xl transition duration-500 hover:rotate-0">
              <div className="overflow-hidden rounded-[43px] bg-white">
                <img
                  src="/app-preview.jpg"
                  alt="Download Sesan App"
                  className="h-[590px] w-[290px] object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Company Timeline */}
<section
  className="bg-slate-50 px-5 py-24 lg:px-8"
>
  <div className="mx-auto max-w-5xl">

    <div className="text-center mb-16">

      <p className="section-label">
        Our Journey
      </p>

      <h2 className="section-title">
        Growing Together
      </h2>

      <p className="mt-6 text-lg text-slate-600">
        A journey of innovation, technology and agriculture.
      </p>

    </div>

    <div className="relative border-l-4 border-green-600 ml-6">

      {[
        {
          year: "2025",
          title: "Sesan Project Started",
          color: "bg-green-600",
        },
        {
          year: "2026",
          title: "Official Website Launch",
          color: "bg-green-600",
        },
        {
          year: "2026",
          title: "Business Email Released",
          color: "bg-green-600",
        },
        {
          year: "2026",
          title: "Android App Available",
          color: "bg-green-600",
        },
        {
          year: "Coming Soon",
          title: "iPhone App",
          color: "bg-orange-500",
        },
        {
          year: "Future",
          title: "ASEAN Agriculture Platform",
          color: "bg-blue-600",
        },
      ].map((item, index) => (

        <div
          key={index}
          className="relative mb-14 pl-10"
        >

          <div
            className={`absolute -left-[14px] top-2 h-6 w-6 rounded-full border-4 border-white shadow ${item.color}`}
          />

          <p className="text-sm font-bold uppercase tracking-widest text-green-700">

            {item.year}

          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">

            {item.title}

          </h3>

        </div>

      ))}

    </div>

  </div>
</section>

{/* Promote Your Business */}
<section
  id="promote"
  className="scroll-mt-24 bg-slate-950 px-5 py-24 text-white lg:px-8"
>
  <div className="mx-auto max-w-7xl">
    {/* Heading */}
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-400">
        Advertising & Partnership
      </p>

      <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
        Promote Your Business
        <span className="block bg-gradient-to-r from-green-400 to-amber-300 bg-clip-text text-transparent">
          across the Sesan ecosystem.
        </span>
      </h2>

      <p className="mt-6 text-lg leading-8 text-slate-300">
        Reach farmers, agricultural dealers, businesses and consumers through
        Sesan App, Sesan Website, Facebook and Telegram.
      </p>
    </div>

    {/* Promotion packages */}
    <div className="mt-16 grid gap-7 lg:grid-cols-3">
      {promotionPlans.map((plan) => (
        <article
          key={plan.name}
          className={`relative flex flex-col rounded-[32px] border p-8 transition duration-300 hover:-translate-y-2 ${
            plan.popular
              ? "border-green-400 bg-white text-slate-950 shadow-2xl shadow-green-500/20"
              : "border-white/10 bg-white/5 text-white hover:bg-white/10"
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-lg">
              Most Popular
            </div>
          )}

          <p
            className={`text-sm font-bold uppercase tracking-[0.18em] ${
              plan.popular ? "text-green-700" : "text-green-400"
            }`}
          >
            {plan.name}
          </p>

          <p className="mt-5 text-3xl font-black">{plan.price}</p>

          <p
            className={`mt-4 leading-7 ${
              plan.popular ? "text-slate-600" : "text-slate-400"
            }`}
          >
            {plan.description}
          </p>

          <div className="mt-8 flex-1 space-y-4">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    plan.popular
                      ? "bg-green-100 text-green-700"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  <CheckIcon />
                </span>

                <p
                  className={`text-sm font-semibold leading-6 ${
                    plan.popular ? "text-slate-700" : "text-slate-300"
                  }`}
                >
                  {feature}
                </p>
              </div>
            ))}
          </div>

          <a
            href={`mailto:info@sesanshop.com?subject=${encodeURIComponent(
              `${plan.name} Promotion Request`
            )}&body=${encodeURIComponent(
              `Hello Sesan Group,\n\nI am interested in the ${plan.name} package.\n\nCompany Name:\nContact Person:\nPhone:\nTelegram:\nWebsite:\nMessage:\n`
            )}`}
            className={`mt-9 inline-flex items-center justify-center rounded-full px-6 py-4 text-sm font-black shadow-lg transition ${plan.buttonClass}`}
          >
            {plan.button}
          </a>
        </article>
      ))}
    </div>

    {/* Telegram promotion */}
    <div className="mt-10 overflow-hidden rounded-[34px] bg-gradient-to-r from-sky-500 to-blue-700 p-8 sm:p-12">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-100">
            Telegram Promotion
          </p>

          <h3 className="mt-4 text-3xl font-black sm:text-4xl">
            Reach 3,300+ Sesan Telegram subscribers
          </h3>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-50">
            Promote your company, product or agricultural service through a
            sponsored post in the official Sesan Telegram Channel.
          </p>

          <div className="mt-7 grid gap-3 text-sm font-semibold text-white sm:grid-cols-2">
            <p>✓ Sponsored Telegram post</p>
            <p>✓ Product photos and description</p>
            <p>✓ Website and contact links</p>
            <p>✓ Pinned post up to 24 hours</p>
          </div>
        </div>

        <a
          href={`mailto:info@sesanshop.com?subject=${encodeURIComponent(
            "Telegram Promotion Request"
          )}&body=${encodeURIComponent(
            "Hello Sesan Group,\n\nI would like to promote my business through the Sesan Telegram Channel.\n\nCompany Name:\nContact Person:\nPhone:\nTelegram:\nProduct or Service:\nPreferred Date:\n"
          )}`}
          className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-black text-blue-700 shadow-xl transition hover:-translate-y-1 hover:bg-blue-50"
        >
          Book Telegram Promotion
        </a>
      </div>
    </div>

    {/* Launch campaign */}
    <div className="mt-10 rounded-[34px] border border-amber-300/30 bg-gradient-to-br from-amber-400 to-orange-500 p-8 text-slate-950 sm:p-12">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-950/70">
            Product Launch Campaign
          </p>

          <h3 className="mt-4 text-3xl font-black sm:text-4xl">
            Launch your agricultural product with Sesan
          </h3>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-orange-950/80">
            One campaign combining Sesan App, Website, Telegram, Facebook and
            featured product promotion.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {[
              "Sesan App",
              "Website",
              "Telegram",
              "Facebook",
              "Featured Product",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-orange-950/10 bg-white/40 px-4 py-2 text-sm font-bold"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center lg:text-right">
          <p className="text-sm font-bold uppercase tracking-wider text-orange-950/70">
            Starting from
          </p>

          <p className="mt-2 text-5xl font-black">$99</p>

          <p className="mt-1 font-semibold text-orange-950/70">
            per campaign
          </p>

          <a
            href={`mailto:info@sesanshop.com?subject=${encodeURIComponent(
              "Product Launch Campaign Request"
            )}&body=${encodeURIComponent(
              "Hello Sesan Group,\n\nI am interested in launching my product through Sesan.\n\nCompany Name:\nContact Person:\nPhone:\nTelegram:\nProduct Name:\nLaunch Date:\nMessage:\n"
            )}`}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-4 font-black text-white shadow-xl transition hover:-translate-y-1 hover:bg-slate-800"
          >
            Start Campaign
          </a>
        </div>
      </div>
    </div>

    {/* Promotion Request Form */}
<div className="mt-12 overflow-hidden rounded-[34px] border border-white/10 bg-white/5">
  <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
    {/* Left information */}
    <div className="bg-gradient-to-br from-green-700 to-emerald-500 p-8 sm:p-12">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-green-100">
        Promotion Request
      </p>

      <h3 className="mt-4 text-3xl font-black sm:text-4xl">
        Tell us about your business
      </h3>

      <p className="mt-5 leading-8 text-green-50">
        Complete this form and the Sesan team will contact you to discuss
        your promotion, banner design, preferred date and campaign package.
      </p>

      <div className="mt-8 space-y-4 text-sm font-semibold text-white">
        <p>✓ Sesan App banner promotion</p>
        <p>✓ Telegram sponsored posts</p>
        <p>✓ Website and Facebook promotion</p>
        <p>✓ Agricultural product campaigns</p>
      </div>

      <div className="mt-9 rounded-2xl border border-white/20 bg-white/10 p-5">
        <p className="text-sm text-green-100">Official sales email</p>

        <a
          href="mailto:info@sesanshop.com"
          className="mt-1 block font-black text-white"
        >
          info@sesanshop.com
        </a>

        <p className="mt-4 text-sm text-green-100">Phone</p>

        <a
          href="tel:+85511930717"
          className="mt-1 block font-black text-white"
        >
          +855 11 930 717
        </a>
      </div>
    </div>

    {/* Form */}
    <form
      onSubmit={handlePromotionSubmit}
      className="grid gap-5 bg-white p-8 text-slate-900 sm:p-12"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-slate-700">
            Company Name *
          </span>

          <input
            type="text"
            name="companyName"
            required
            placeholder="Your company name"
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700">
            Contact Person *
          </span>

          <input
            type="text"
            name="contactPerson"
            required
            placeholder="Full name"
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-slate-700">
            Phone Number *
          </span>

          <input
            type="tel"
            name="phone"
            required
            placeholder="+855..."
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700">
            Telegram
          </span>

          <input
            type="text"
            name="telegram"
            placeholder="@username or phone"
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-slate-700">
            Email
          </span>

          <input
            type="email"
            name="email"
            placeholder="company@example.com"
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700">
            Website or Facebook
          </span>

          <input
            type="text"
            name="website"
            placeholder="Website or page link"
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-bold text-slate-700">
          Promotion Package *
        </span>

        <select
          name="packageName"
          required
          defaultValue=""
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
        >
          <option value="" disabled>
            Select a promotion package
          </option>

          <option value="Basic Listing - Free">
            Basic Listing — Free
          </option>

          <option value="Featured Partner - $25/month">
            Featured Partner — $25/month
          </option>

          <option value="Premium Promotion - $50/month">
            Premium Promotion — $50/month
          </option>

          <option value="Telegram Promotion">
            Telegram Channel Promotion
          </option>

          <option value="Product Launch Campaign - $99">
            Product Launch Campaign — $99
          </option>

          <option value="Custom Promotion">
            Custom Promotion Package
          </option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-bold text-slate-700">
          Message
        </span>

        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about your product, promotion date and target customers..."
          className="mt-2 w-full resize-none rounded-2xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
        />
      </label>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-4 font-black text-white shadow-xl shadow-green-600/20 transition hover:-translate-y-1 hover:from-green-700 hover:to-emerald-600"
      >
        Submit Promotion Request
      </button>

      <p className="text-center text-xs leading-5 text-slate-500">
        Submitting this form will prepare an email to the official Sesan
        sales team.
      </p>
    </form>
  </div>
</div>

    {/* Contact sales */}
    <div className="mt-12 text-center">
      <p className="text-slate-400">
        Need a custom promotion package?
      </p>

      <a
        href="mailto:info@sesanshop.com?subject=Custom%20Promotion%20Request"
        className="mt-3 inline-flex font-bold text-green-400 transition hover:text-green-300"
      >
        Contact our sales team: info@sesanshop.com
      </a>
    </div>
  </div>
</section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[38px] bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 p-8 text-white sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-100">
                  Contact Sesan
                </p>

                <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
                  Let&apos;s build a stronger agricultural future together.
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-green-50">
                  Contact Sesan for partnerships, business cooperation,
                  agricultural services, media and community opportunities.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="https://sesanshop.com"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-row"
                >
                  <GlobeIcon />
                  <span>
                    <small>Marketplace</small>
                    <strong>sesanshop.com</strong>
                  </span>
                </a>

                <a href="mailto:info@sesanshop.com" className="contact-row">
                  <MailIcon />
                  <span>
                    <small>Email</small>
                    <strong>info@sesanshop.com</strong>
                  </span>
                </a>

                <div className="contact-row">
                  <LocationIcon />
                  <span>
                    <small>Location</small>
                    <strong>Phnom Penh, Cambodia</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-5 pb-8 pt-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <a href="#home" className="flex items-center gap-3">
               <img
  src="/sesan-logo.png"
  alt="Sesan Logo"
  className="h-12 w-12 rounded-full object-contain"
/>

                <div>
                  <p className="text-xl font-black text-green-700">SESAN</p>
                  <p className="text-[9px] font-bold tracking-[0.34em] text-amber-500">
                    GROUP
                  </p>
                </div>
              </a>

              <p className="mt-5 max-w-xs leading-7 text-slate-500">
                Connecting Cambodian agriculture through technology, markets,
                knowledge and trusted services.
              </p>
            </div>

            <div>
              <h3 className="footer-title">Company</h3>
              <div className="footer-links">
                <a href="#about">About</a>
                <a href="#mission">Vision & Mission</a>
                <a href="#contact">Contact</a>
              <a
  href="#download"
  onClick={() => setMobileMenuOpen(false)}
  className="
    inline-flex w-full items-center justify-center
    rounded-full
    bg-gradient-to-r from-green-600 to-emerald-500
    px-6 py-3
    text-sm font-extrabold
    !text-yellow-300
    shadow-lg shadow-green-600/25
    transition-all duration-300
    hover:-translate-y-0.5
    hover:from-green-700
    hover:to-emerald-600
    hover:!text-yellow-200
  "
>
  {t("nav.download")}
</a>
              </div>
            </div>

            <div>
              <h3 className="footer-title">Ecosystem</h3>
              <div className="footer-links">
                <a href="#app">Sesan App</a>
                <a href="#shop">Sesan Shop</a>
                <a href="#media">Sesan Media</a>
                <a href="#tools">Sesan Tools</a>
                <a href="#plant">Sesan Plant</a>
                <a href="#animal">Sesan Animal</a>
              </div>
            </div>

            <div>
  <h3 className="footer-title">Follow Us</h3>

 <div className="relative z-40 mt-5 flex flex-wrap gap-3 pointer-events-auto">
    <a
      href="https://sesanshop.com"
      target="_blank"
      rel="noopener noreferrer"
      title="Marketplace"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-green-600 hover:bg-green-50"
    >
      <Globe className="h-5 w-5 text-green-600" />
    </a>

    <a
  href="mailto:info@sesanshop.com"
  title="Email"
  aria-label="Email Sesan Group"
  className="relative z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-amber-500 hover:bg-amber-50 pointer-events-auto"
>
  <Mail className="pointer-events-none h-5 w-5 text-amber-500" />
</a>

    <a
      href="https://www.facebook.com/share/1EBrJfNXP4/"
      target="_blank"
      rel="noopener noreferrer"
      title="Facebook"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-50"
    >
     <FaFacebookF className="h-5 w-5 text-blue-600" />
    </a>

    <a
      href="https://t.me/sesan_Telegram_channel"
      target="_blank"
      rel="noopener noreferrer"
      title="Telegram"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-sky-500 hover:bg-sky-50"
    >
      <FaTelegramPlane className="h-5 w-5 text-sky-500" />
    </a>

    <a
      href="https://www.tiktok.com/@sesan.app?_r=1&_t=ZS-98cyToPNHvT"
      target="_blank"
      rel="noopener noreferrer"
      title="TikTok"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-black hover:bg-black"
    >
     <FaTiktok className="h-5 w-5 text-black group-hover:text-white" />
    </a>

    <a
      href="https://youtube.com/@sesanapp?si=kUB6Z3NK-q2MTKC1"
      target="_blank"
      rel="noopener noreferrer"
      title="YouTube"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-red-600 hover:bg-red-50"
    >
     <FaYoutube className="h-5 w-5 text-red-600" />
    </a>

  </div>
</div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-slate-200 pt-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Sesan Group. All rights reserved.</p>

            <div className="flex gap-6">
  <a href="/privacy" className="hover:text-green-700">
    Privacy Policy
  </a>

  <a href="/terms" className="hover:text-green-700">
    Terms of Use
  </a>
</div>
                  </div>
      </footer>
    </main>
  );
}