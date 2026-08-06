import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Sesan Group",

  description:
    "Privacy Policy for Sesan App, Sesan Shop and related Sesan Group agricultural technology services.",

  keywords: [
    "Sesan Privacy Policy",
    "Sesan App Privacy",
    "Sesan Shop Privacy",
    "Cambodia Agriculture Technology",
    "Account Deletion",
    "Data Protection",
  ],

  authors: [
    {
      name: "Sesan Group",
    },
  ],

  creator: "Sesan Group",
  publisher: "Sesan Group",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Privacy Policy | Sesan Group",
    description:
      "Learn how Sesan Group collects, uses, stores and protects information across Sesan App, Sesan Shop and related services.",
    type: "website",
    locale: "en_US",
    siteName: "Sesan Group",
  },

  twitter: {
    card: "summary",
    title: "Privacy Policy | Sesan Group",
    description:
      "Privacy information for Sesan App, Sesan Shop and Sesan Group services.",
  },
};

const policyNavigation = [
  {
    number: "01",
    label: "Introduction",
    href: "#introduction",
  },
  {
    number: "02",
    label: "Information We Collect",
    href: "#information-we-collect",
  },
  {
    number: "03",
    label: "How We Use Information",
    href: "#how-we-use-information",
  },
  {
    number: "04",
    label: "Information Sharing",
    href: "#information-sharing",
  },
  {
    number: "05",
    label: "Data Security",
    href: "#data-security",
  },
  {
    number: "06",
    label: "Account Deletion",
    href: "#account-deletion",
  },
  {
    number: "07",
    label: "Your Rights",
    href: "#your-rights",
  },
  {
    number: "08",
    label: "Contact Sesan",
    href: "#contact",
  },
];

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M19 12H5M11 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path
        d="M12 3l7 3v5c0 4.7-2.9 8.1-7 10-4.1-1.9-7-5.3-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M9 12l2 2 4-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
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

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M7 3h3l1.5 4-2 1.5a15.3 15.3 0 006 6l1.5-2 4 1.5v3c0 2.2-1.8 4-4 4C9.3 21 3 14.7 3 7c0-2.2 1.8-4 4-4z"
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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
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

function LegalHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
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
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-green-600 hover:text-green-700"
        >
          <ArrowLeftIcon />
          Back to Home
        </Link>
      </div>
    </header>
  );
}

function LegalFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/sesan-logo.png"
              alt="Sesan Logo"
              className="h-11 w-11 rounded-full object-contain"
            />

            <div>
              <p className="text-lg font-black text-green-700">SESAN</p>

              <p className="text-[8px] font-bold tracking-[0.3em] text-amber-500">
                GROUP
              </p>
            </div>
          </Link>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-500">
            <Link href="/" className="transition hover:text-green-700">
              Home
            </Link>

            <Link
              href="/privacy"
              className="font-bold text-green-700"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-green-700"
            >
              Terms of Use
            </Link>

            <a
              href="https://sesanshop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-green-700"
            >
              Sesan Shop
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-7">
          <p className="text-sm text-slate-500">
            © 2026 Sesan Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LegalHeader />

      {/* Privacy Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-emerald-500 px-5 py-20 text-white lg:px-8 lg:py-28">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-yellow-300/20 blur-3xl" />

        <div className="absolute -bottom-28 -left-20 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
              <ShieldIcon />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-green-50">
                Legal Information
              </span>
            </div>

            <h1 className="mt-7 text-5xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Privacy Policy
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-green-50 sm:text-xl">
              This Privacy Policy explains how Sesan Group collects, uses,
              stores, protects and manages information across Sesan App, Sesan
              Shop and related agricultural technology services.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-green-50">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                Effective date: 5 August 2026
              </span>

              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                Last updated: 5 August 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Privacy Layout */}
      <section className="px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[300px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="px-3 text-xs font-black uppercase tracking-[0.22em] text-green-700">
                On this page
              </p>

              <nav className="mt-4 space-y-1">
                {policyNavigation.map((item) => (
                  <a
                    key={item.number}
                    href={item.href}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-green-50 hover:text-green-700"
                  >
                    <span className="text-xs font-black text-slate-400 transition group-hover:text-green-600">
                      {item.number}
                    </span>

                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-5 rounded-3xl bg-slate-950 p-6 text-white">
              <h2 className="text-xl font-black">
                Privacy questions?
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Contact Sesan Group for privacy, account or data-related
                assistance.
              </p>

              <a
                href="mailto:info@sesanshop.com"
                className="mt-5 inline-flex rounded-full bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
              >
                Contact Sesan
              </a>
            </div>
          </aside>

          {/* Privacy Content */}
          <article className="min-w-0">
            <div className="rounded-3xl border border-green-200 bg-green-50 p-6 sm:p-8">
              <h2 className="text-2xl font-black text-green-900">
                Privacy summary
              </h2>

              <p className="mt-4 leading-8 text-green-900/80">
                Sesan uses information to provide marketplace, account, chat,
                ordering, notification and support services. We aim to collect
                only information reasonably needed to operate and protect Sesan
                services.
              </p>
            </div>

            {/* PART 2 CONTENT WILL GO BELOW THIS LINE */}

           {/* Section 01 — Introduction */}
<section
  id="introduction"
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-green-700">
    Section 01
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Introduction
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">
    <p>
      Sesan Group operates Sesan App, Sesan Shop and related agricultural
      technology services, including Sesan Media, Sesan Tools, Sesan Plant
      and Sesan Animal.
    </p>

    <p>
      This Privacy Policy explains how Sesan Group collects, uses, stores,
      shares and protects information when you access or use our mobile
      applications, websites, digital marketplace, communication tools and
      related services.
    </p>

    <p>
      By creating an account or using Sesan services, you acknowledge that
      you have read and understood this Privacy Policy.
    </p>

    <p>
      This policy applies to buyers, sellers, visitors, businesses,
      agricultural service providers and other users of Sesan services.
    </p>
  </div>
</section>

{/* Section 02 — Information We Collect */}
<section
  id="information-we-collect"
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
    Section 02
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Information We Collect
  </h2>

  <div className="privacy-content mt-6 space-y-7 leading-8 text-slate-600">
    <p>
      The information we collect depends on the Sesan features and services
      that you use.
    </p>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Account information
      </h3>

      <p className="mt-3">
        When you register or manage an account, we may collect:
      </p>

      <ul>
        <li>Your name or business name.</li>
        <li>Your telephone number.</li>
        <li>Your profile photo.</li>
        <li>Your Sesan user identification number.</li>
        <li>Your account login and authentication information.</li>
        <li>Your preferred language and account settings.</li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Product and seller information
      </h3>

      <p className="mt-3">
        When you post, edit or manage a product, we may collect:
      </p>

      <ul>
        <li>Product name and description.</li>
        <li>Price, currency, quantity and availability.</li>
        <li>Product category and condition.</li>
        <li>Product photos and videos.</li>
        <li>Seller name, profile image and contact information.</li>
        <li>Product location and delivery information.</li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Buyer and order information
      </h3>

      <p className="mt-3">
        When you place, receive or manage an order, we may collect:
      </p>

      <ul>
        <li>Buyer and seller account information.</li>
        <li>Products ordered and quantities.</li>
        <li>Order status and confirmation history.</li>
        <li>Delivery address or selected location.</li>
        <li>Telephone number used for order communication.</li>
        <li>Transaction and service records.</li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Communication information
      </h3>

      <p className="mt-3">
        When you communicate through Sesan, we may process:
      </p>

      <ul>
        <li>Chat messages between users.</li>
        <li>Images, videos, audio recordings and other attachments.</li>
        <li>Message date, time, sender and recipient information.</li>
        <li>Message delivery and seen status.</li>
        <li>Messages sent to Sesan customer support.</li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Ratings and reviews
      </h3>

      <p className="mt-3">
        When you submit a rating or review, we may collect:
      </p>

      <ul>
        <li>Your rating score.</li>
        <li>Your written review or comment.</li>
        <li>The product or seller being reviewed.</li>
        <li>The date and time of the review.</li>
        <li>Your account identifier associated with the review.</li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Location information
      </h3>

      <p className="mt-3">
        Sesan may collect location information when you choose a location,
        publish a product, arrange delivery or use a map-related feature.
      </p>

      <ul>
        <li>Province, district and commune.</li>
        <li>Address or general business location.</li>
        <li>Latitude and longitude selected through a map.</li>
        <li>Delivery or order fulfilment location.</li>
      </ul>

      <p className="mt-4">
        Sesan does not require continuous background location tracking for
        ordinary marketplace use unless a future feature clearly requests it
        and you give permission.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Device and technical information
      </h3>

      <p className="mt-3">
        We may automatically receive limited technical information such as:
      </p>

      <ul>
        <li>Device type and operating system.</li>
        <li>Application version.</li>
        <li>Browser type when using the website.</li>
        <li>Notification token.</li>
        <li>Crash reports and error information.</li>
        <li>Application activity and technical logs.</li>
        <li>Network and security information.</li>
      </ul>
    </div>
  </div>
</section>

{/* Section 03 — Public Information */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">
    Section 03
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Public Marketplace Information
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">
    <p>
      Sesan is a marketplace. Some information that you publish is intended
      to be visible to other users.
    </p>

    <p>Public information may include:</p>

    <ul>
      <li>Your seller or business name.</li>
      <li>Your profile image.</li>
      <li>Your product photos and videos.</li>
      <li>Your product description and price.</li>
      <li>Your telephone number when included in a listing.</li>
      <li>Your general product or business location.</li>
      <li>Your product rating or review information.</li>
    </ul>

    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
      <p className="font-bold">
        Important:
      </p>

      <p className="mt-2">
        Do not publish identity documents, passwords, verification codes,
        banking passwords or other sensitive information in product listings,
        comments or public profile fields.
      </p>
    </div>
  </div>
</section>

{/* Section 04 — Device Permissions */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-700">
    Section 04
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Device Permissions
  </h2>

  <div className="privacy-content mt-6 space-y-7 leading-8 text-slate-600">
    <p>
      Sesan may request access to selected device features only when they are
      needed for a function that you choose to use.
    </p>

    <div className="grid gap-5 sm:grid-cols-2">
      <div className="rounded-2xl bg-slate-50 p-6">
        <h3 className="text-lg font-black text-slate-900">
          Camera
        </h3>

        <p className="mt-3">
          Used to take product photos, profile images, QR codes or other media
          selected by you.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-50 p-6">
        <h3 className="text-lg font-black text-slate-900">
          Photos and media
        </h3>

        <p className="mt-3">
          Used to select, upload, crop, preview or save images and videos.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-50 p-6">
        <h3 className="text-lg font-black text-slate-900">
          Microphone
        </h3>

        <p className="mt-3">
          Used when you choose to record an audio message or video with sound.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-50 p-6">
        <h3 className="text-lg font-black text-slate-900">
          Location
        </h3>

        <p className="mt-3">
          Used when you choose a product, business or delivery location.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-50 p-6">
        <h3 className="text-lg font-black text-slate-900">
          Notifications
        </h3>

        <p className="mt-3">
          Used to inform you about messages, orders, account activity and
          important service updates.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-50 p-6">
        <h3 className="text-lg font-black text-slate-900">
          Files and storage
        </h3>

        <p className="mt-3">
          Used when you choose files to upload, share, download or save.
        </p>
      </div>
    </div>

    <p>
      You can review or disable permissions through the settings of your
      mobile device. Disabling a permission may prevent the related feature
      from working.
    </p>
  </div>
</section>

{/* Section 05 — Information from Other Users */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-700">
    Section 05
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Information Provided by Other Users
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">
    <p>
      Another user may provide information about you when placing an order,
      sharing delivery details, reporting a problem or contacting customer
      support.
    </p>

    <p>
      For example, a buyer may provide a seller&apos;s telephone number, or a
      seller may provide information connected with a buyer&apos;s order.
    </p>

    <p>
      Users should only provide another person&apos;s information when they
      have a lawful and reasonable reason to do so.
    </p>
  </div>
</section>
{/* Section 06 — How We Use Information */}
<section
  id="how-we-use-information"
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-green-700">
    Section 06
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    How We Use Information
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">
    <p>
      Sesan uses collected information only for legitimate operational,
      security, marketplace and service purposes.
    </p>

    <p>We may use information to:</p>

    <ul>
      <li>Create, verify and manage user accounts.</li>
      <li>Display product listings and seller information.</li>
      <li>Connect buyers, sellers and agricultural service providers.</li>
      <li>Process, confirm and manage orders.</li>
      <li>Enable chat, image, video and audio communication.</li>
      <li>Send order, message, security and service notifications.</li>
      <li>Provide customer support and respond to enquiries.</li>
      <li>Detect fraud, spam, abuse and unauthorised activity.</li>
      <li>Maintain the security and reliability of Sesan services.</li>
      <li>Analyse technical problems and improve application performance.</li>
      <li>Develop and improve existing or future Sesan features.</li>
      <li>Comply with legal obligations and enforce our Terms of Use.</li>
    </ul>

    <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-green-950">
      <p className="font-bold">
        Sesan does not use private chat content for public advertising.
      </p>

      <p className="mt-2">
        Private communication may only be reviewed when reasonably necessary
        for security, abuse reports, customer support, legal obligations or
        investigation of harmful activity.
      </p>
    </div>
  </div>
</section>

{/* Section 07 — Legal Bases and Legitimate Purposes */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-700">
    Section 07
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Legal Bases and Legitimate Purposes
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">
    <p>
      Depending on the service and applicable law, Sesan may process
      information because:
    </p>

    <ul>
      <li>
        It is necessary to provide the service or fulfil a transaction
        requested by you.
      </li>
      <li>
        You have given permission, such as access to camera, media,
        microphone, notifications or location.
      </li>
      <li>
        Processing is necessary for security, fraud prevention and protection
        of users.
      </li>
      <li>
        Processing is required to comply with a legal obligation.
      </li>
      <li>
        Processing supports a legitimate business purpose that does not
        unfairly override user rights.
      </li>
    </ul>

    <p>
      Where permission is the basis for processing, you may withdraw that
      permission through device settings or by contacting Sesan.
    </p>
  </div>
</section>

{/* Section 08 — Sharing of Information */}
<section
  id="information-sharing"
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-700">
    Section 08
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Sharing of Information
  </h2>

  <div className="privacy-content mt-6 space-y-7 leading-8 text-slate-600">
    <p>
      Sesan may share information only when reasonably necessary to provide
      services, complete transactions, protect users or comply with law.
    </p>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Buyers and sellers
      </h3>

      <p className="mt-3">
        Information may be shared between buyers and sellers when needed to
        communicate, confirm orders, arrange payment, organise delivery or
        resolve transaction issues.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Service providers
      </h3>

      <p className="mt-3">
        Sesan may use trusted providers for:
      </p>

      <ul>
        <li>Cloud hosting and database services.</li>
        <li>User authentication.</li>
        <li>File storage and media delivery.</li>
        <li>Push notifications.</li>
        <li>Crash reporting and performance monitoring.</li>
        <li>Maps and location services.</li>
        <li>Email and customer-support services.</li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Delivery and business partners
      </h3>

      <p className="mt-3">
        Information may be shared with delivery or business partners when
        necessary to complete a service that you requested.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Government and legal authorities
      </h3>

      <p className="mt-3">
        Sesan may disclose information when required by applicable law, court
        order, lawful government request or when reasonably necessary to
        protect users, Sesan or the public.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Business transfer
      </h3>

      <p className="mt-3">
        If Sesan undergoes a merger, acquisition, restructuring or lawful
        transfer of business assets, relevant information may be transferred
        as part of that transaction.
      </p>
    </div>

    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-blue-950">
      <p className="font-bold">
        Sesan does not sell personal information as a standalone commercial
        product.
      </p>
    </div>
  </div>
</section>

{/* Section 09 — Third-Party Services */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-700">
    Section 09
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Third-Party Services
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">
    <p>
      Sesan may rely on third-party providers to operate important parts of
      the service.
    </p>

    <p>These providers may include:</p>

    <ul>
      <li>Cloud infrastructure and database providers.</li>
      <li>Authentication and account-security providers.</li>
      <li>Storage and media-processing providers.</li>
      <li>Notification and messaging providers.</li>
      <li>Maps and location providers.</li>
      <li>Application stores and operating-system providers.</li>
      <li>Analytics, crash-reporting and technical-monitoring providers.</li>
    </ul>

    <p>
      These providers may process limited information according to the service
      they provide and their own privacy policies.
    </p>

    <p>
      Sesan does not control every third-party website or service linked from
      our application. Users should review the privacy terms of those services
      before providing information.
    </p>
  </div>
</section>

{/* Section 10 — Cookies and Website Technologies */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-700">
    Section 10
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Cookies and Website Technologies
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">
    <p>
      Sesan websites may use cookies, local storage or similar technologies
      for essential website functions.
    </p>

    <p>These technologies may be used to:</p>

    <ul>
      <li>Remember language or display preferences.</li>
      <li>Maintain secure sessions.</li>
      <li>Understand basic website performance.</li>
      <li>Prevent abuse and suspicious activity.</li>
      <li>Improve website navigation and reliability.</li>
    </ul>

    <p>
      You may control cookies through your browser settings. Blocking
      essential cookies may affect login or other website functions.
    </p>
  </div>
</section>

{/* Section 11 — Analytics and Technical Monitoring */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">
    Section 11
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Analytics and Technical Monitoring
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">
    <p>
      Sesan may use technical analytics and crash-reporting tools to understand
      how the application performs.
    </p>

    <p>This information may include:</p>

    <ul>
      <li>Application version.</li>
      <li>Device type and operating system.</li>
      <li>Error messages and crash details.</li>
      <li>Feature usage and navigation events.</li>
      <li>Network and performance information.</li>
    </ul>

    <p>
      This information is generally used to fix bugs, improve reliability,
      protect security and understand which features require improvement.
    </p>
  </div>
</section>

{/* Section 12 — Data Security */}
<section
  id="data-security"
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-red-700">
    Section 12
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Data Security
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">
    <p>
      Sesan uses reasonable administrative, organisational and technical
      safeguards intended to protect information against unauthorised access,
      loss, misuse, alteration or disclosure.
    </p>

    <p>Security measures may include:</p>

    <ul>
      <li>Account authentication and access controls.</li>
      <li>Secure cloud infrastructure.</li>
      <li>Restricted administrative access.</li>
      <li>Security monitoring and error logging.</li>
      <li>Encrypted transmission where supported.</li>
      <li>Review of suspicious account or marketplace activity.</li>
    </ul>

    <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-950">
      <p className="font-bold">
        No internet or cloud system can be guaranteed completely secure.
      </p>

      <p className="mt-2">
        Users should protect their phones, passwords, verification codes and
        account access. Sesan staff will not ask you to publicly share a
        password or verification code.
      </p>
    </div>
  </div>
</section>

{/* Section 13 — Data Retention */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
    Section 13
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Data Retention
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">
    <p>
      Sesan retains information only for as long as reasonably necessary for
      the purpose for which it was collected.
    </p>

    <p>Retention periods may depend on:</p>

    <ul>
      <li>Whether your account remains active.</li>
      <li>Whether information is needed to provide a service.</li>
      <li>Security and fraud-prevention requirements.</li>
      <li>Order, transaction and dispute records.</li>
      <li>Legal, accounting or regulatory obligations.</li>
      <li>Backup and disaster-recovery cycles.</li>
    </ul>

    <p>
      Some information may remain in secure backups for a limited period after
      deletion before being removed through the normal backup cycle.
    </p>
  </div>
</section>
{/* Section 14 — Account Deletion */}
<section
  id="account-deletion"
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-red-700">
    Section 14
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Account Deletion
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">
    <p>
      You may request deletion of your Sesan account and associated personal
      information at any time.
    </p>

    <p>
      Send your request to:
    </p>

    <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
      <p><strong>Email:</strong> info@sesanshop.com</p>
      <p><strong>Phone:</strong> +855 11 930 717</p>
      <p><strong>Subject:</strong> Account Deletion Request</p>
    </div>

    <p>
      We may request additional verification before deleting an account in
      order to protect the account owner.
    </p>

    <p>
      Some records may be retained where required by law, fraud prevention,
      dispute resolution or financial record keeping.
    </p>
  </div>
</section>

{/* Section 15 — Your Rights */}
<section
  id="your-rights"
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-green-700">
    Section 15
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Your Rights
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">

    <p>You may have the right to:</p>

    <ul>
      <li>Access your personal information.</li>
      <li>Correct inaccurate information.</li>
      <li>Delete your account.</li>
      <li>Remove your products.</li>
      <li>Withdraw permissions granted to the application.</li>
      <li>Disable notifications.</li>
      <li>Contact Sesan regarding privacy concerns.</li>
    </ul>

    <p>
      Requests may require identity verification before they are completed.
    </p>

  </div>
</section>

{/* Section 16 — Children's Privacy */}
<section
  className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
    Section 16
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Children's Privacy
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">

    <p>
      Sesan services are not intended to knowingly collect personal
      information from children without appropriate parental or guardian
      permission.
    </p>

    <p>
      If you believe that a child has submitted personal information to
      Sesan, please contact us so we can review and take appropriate action.
    </p>

  </div>
</section>

{/* Section 17 — International Processing */}
<section
  className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-700">
    Section 17
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    International Processing
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">

    <p>
      Sesan Group operates primarily from Cambodia.
    </p>

    <p>
      Depending on the technologies used, information may be processed in
      countries where our trusted service providers operate.
    </p>

  </div>
</section>

{/* Section 18 — Changes to this Policy */}
<section
  className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-700">
    Section 18
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Changes to this Privacy Policy
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">

    <p>
      Sesan Group may update this Privacy Policy when our services,
      technology or legal obligations change.
    </p>

    <p>
      The updated version will replace the previous version on this page.
    </p>

    <p>
      Continued use of Sesan services after publication of an updated policy
      means the updated policy applies from its effective date.
    </p>

  </div>
</section>

{/* Section 19 — Contact */}
<section
  className="mt-8 rounded-3xl bg-slate-950 p-8 text-white"
>

  <p className="text-xs font-black uppercase tracking-[0.2em] text-green-300">
    Section 19
  </p>

  <h2 className="mt-3 text-3xl font-black">
    Contact Sesan Group
  </h2>

  <p className="mt-5 leading-8 text-slate-300">
    If you have any questions regarding this Privacy Policy or your
    personal information, please contact us.
  </p>

  <div className="mt-8 grid gap-5 md:grid-cols-2">

    <div>
      <p className="font-bold">Organisation</p>
      <p>Sesan Group</p>
    </div>

    <div>
      <p className="font-bold">Website</p>
      <p>https://sesanshop.com</p>
    </div>

    <div>
      <p className="font-bold">Email</p>
      <p>sesanagriculture@gmail.com</p>
    </div>

    <div>
      <p className="font-bold">Phone</p>
      <p>+855 11 930 717</p>
    </div>

    <div>
      <p className="font-bold">Location</p>
      <p>Phnom Penh, Cambodia</p>
    </div>

  </div>

</section>

            {/* Quick Contact */}
            <section
              id="contact"
              className="mt-8 scroll-mt-28 overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 to-emerald-500 p-7 text-white sm:p-10"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-green-100">
                Contact Sesan
              </p>

              <h2 className="mt-4 text-3xl font-black">
                Need help with your data or account?
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-green-50">
                Contact Sesan Group for account access, correction, privacy,
                deletion or other data-related enquiries.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <a
                  href="mailto:info@sesanshop.com"
                  className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur transition hover:bg-white/20"
                >
                  <MailIcon />

                  <span className="min-w-0">
                    <small className="block text-green-100">Email</small>

                    <strong className="mt-1 block truncate text-sm">
                      info@sesanshop.com
                    </strong>
                  </span>
                </a>

                <a
                  href="tel:+85511930717"
                  className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur transition hover:bg-white/20"
                >
                  <PhoneIcon />

                  <span>
                    <small className="block text-green-100">Phone</small>

                    <strong className="mt-1 block text-sm">
                      +855 11 930 717
                    </strong>
                  </span>
                </a>

                <a
                  href="https://sesanshop.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur transition hover:bg-white/20"
                >
                  <GlobeIcon />

                  <span>
                    <small className="block text-green-100">Marketplace</small>

                    <strong className="mt-1 block text-sm">
                      sesanshop.com
                    </strong>
                  </span>
                </a>
              </div>
            </section>
          </article>
        </div>
      </section>

      <LegalFooter />
    </main>
  );
}