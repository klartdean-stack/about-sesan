import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | Sesan Group",

  description:
    "Terms of Use for Sesan App, Sesan Shop and related Sesan Group agricultural technology services.",

  keywords: [
    "Sesan Terms of Use",
    "Sesan App Terms",
    "Sesan Shop Terms",
    "Cambodia Agriculture Marketplace",
    "Seller Terms",
    "Buyer Terms",
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
    title: "Terms of Use | Sesan Group",
    description:
      "Read the rules and conditions for using Sesan App, Sesan Shop, marketplace services and related Sesan Group platforms.",
    type: "website",
    locale: "en_US",
    siteName: "Sesan Group",
  },

  twitter: {
    card: "summary",
    title: "Terms of Use | Sesan Group",
    description:
      "Terms for using Sesan App, Sesan Shop and related Sesan Group services.",
  },
};

const termsNavigation = [
  {
    number: "01",
    label: "Acceptance of Terms",
    href: "#acceptance",
  },
  {
    number: "02",
    label: "Eligibility",
    href: "#eligibility",
  },
  {
    number: "03",
    label: "User Accounts",
    href: "#accounts",
  },
  {
    number: "04",
    label: "Marketplace Role",
    href: "#marketplace",
  },
  {
    number: "05",
    label: "Seller Responsibilities",
    href: "#seller-responsibilities",
  },
  {
    number: "06",
    label: "Buyer Responsibilities",
    href: "#buyer-responsibilities",
  },
  {
    number: "07",
    label: "Fees and Payments",
    href: "#fees",
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

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path
        d="M7 3h7l4 4v14H7V3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M14 3v5h5M10 12h5M10 16h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
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
              className="transition hover:text-green-700"
            >
              Privacy Policy
            </Link>

            <Link href="/terms" className="font-bold text-green-700">
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

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LegalHeader />

      {/* Terms Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-green-950 px-5 py-20 text-white lg:px-8 lg:py-28">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="absolute -bottom-28 -left-20 h-96 w-96 rounded-full bg-green-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
              <DocumentIcon />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-green-100">
                Legal Information
              </span>
            </div>

            <h1 className="mt-7 text-5xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Terms of Use
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              These Terms explain the rules and conditions for using Sesan App,
              Sesan Shop, marketplace features and related Sesan Group
              services.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-slate-300">
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

      {/* Main Terms Layout */}
      <section className="px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[300px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="px-3 text-xs font-black uppercase tracking-[0.22em] text-green-700">
                On this page
              </p>

              <nav className="mt-4 space-y-1">
                {termsNavigation.map((item) => (
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

            <div className="mt-5 rounded-3xl bg-green-700 p-6 text-white">
              <h2 className="text-xl font-black">Questions about these Terms?</h2>

              <p className="mt-3 text-sm leading-6 text-green-100">
                Contact Sesan Group for clarification about your account,
                marketplace activity or use of Sesan services.
              </p>

              <a
                href="mailto:info@sesanshop.com"
                className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-green-700 transition hover:bg-green-50"
              >
                Contact Sesan
              </a>
            </div>
          </aside>

          {/* Terms Content */}
          <article className="min-w-0">
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
              <h2 className="text-2xl font-black text-blue-950">
                Terms summary
              </h2>

              <p className="mt-4 leading-8 text-blue-950/80">
                Sesan provides technology that connects agricultural users,
                buyers, sellers and service providers. Users are responsible
                for the accuracy of their information, listings, communication
                and marketplace transactions.
              </p>
            </div>

            {/* PART 2 CONTENT WILL GO BELOW THIS LINE */}

            {/* Section 01 — Acceptance of Terms */}
<section
  id="acceptance"
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-green-700">
    Section 01
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Acceptance of Terms
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">
    <p>
      These Terms of Use govern your access to and use of Sesan App, Sesan
      Shop, Sesan websites, marketplace features, communication tools and
      related services operated by Sesan Group.
    </p>

    <p>
      By creating an account, posting a product, placing an order, sending a
      message, submitting a review or otherwise using Sesan services, you
      agree to comply with these Terms and the Sesan Privacy Policy.
    </p>

    <p>
      If you do not agree with these Terms, you should not access or use Sesan
      services.
    </p>

    <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-green-950">
      <p className="font-bold">
        Important
      </p>

      <p className="mt-2">
        These Terms apply to buyers, sellers, businesses, agricultural service
        providers and visitors who use Sesan services.
      </p>
    </div>
  </div>
</section>

{/* Section 02 — Eligibility */}
<section
  id="eligibility"
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
    Section 02
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Eligibility
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">
    <p>
      You must have the legal capacity to enter into an agreement or use Sesan
      under the supervision and permission of a parent, legal guardian or
      authorised representative.
    </p>

    <p>
      If you use Sesan on behalf of a company, shop, farm, organisation or
      other business, you confirm that you are authorised to act for that
      organisation.
    </p>

    <p>
      Sesan may refuse or restrict access where use of the service would
      violate applicable law, platform rules or the rights and safety of
      another person.
    </p>
  </div>
</section>

{/* Section 03 — User Accounts */}
<section
  id="accounts"
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-700">
    Section 03
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    User Accounts
  </h2>

  <div className="privacy-content mt-6 space-y-7 leading-8 text-slate-600">
    <p>
      Certain Sesan features require you to create or use a user account.
    </p>

    <p>You agree to:</p>

    <ul>
      <li>Provide accurate and current account information.</li>
      <li>Use a telephone number or account information that belongs to you.</li>
      <li>Keep your verification code and account access secure.</li>
      <li>Protect your device from unauthorised use.</li>
      <li>Update inaccurate information when reasonably necessary.</li>
      <li>Notify Sesan if you suspect unauthorised account access.</li>
      <li>Accept responsibility for activity performed through your account.</li>
    </ul>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Account security
      </h3>

      <p className="mt-3">
        You must not share passwords, verification codes or other security
        credentials with another person. Sesan is not responsible for loss
        resulting from credentials voluntarily shared by the user.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Multiple or false accounts
      </h3>

      <p className="mt-3">
        Users must not create accounts for fraud, impersonation, manipulation
        of ratings, avoidance of restrictions or other abusive purposes.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Account restriction
      </h3>

      <p className="mt-3">
        Sesan may limit, suspend or close accounts involved in fraud, unlawful
        activity, impersonation, harassment, repeated complaints or serious
        violations of these Terms.
      </p>
    </div>
  </div>
</section>

{/* Section 04 — Nature of the Marketplace */}
<section
  id="marketplace"
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-700">
    Section 04
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Nature of the Marketplace
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">
    <p>
      Sesan provides technology that helps users publish products, discover
      agricultural goods and services, communicate and arrange transactions.
    </p>

    <p>
      Unless expressly stated otherwise, Sesan is not the owner, manufacturer,
      producer, seller or buyer of products listed by independent users.
    </p>

    <p>
      Buyers and sellers are responsible for evaluating each other and
      confirming:
    </p>

    <ul>
      <li>Product identity and condition.</li>
      <li>Price and currency.</li>
      <li>Quantity and availability.</li>
      <li>Payment method.</li>
      <li>Delivery method and cost.</li>
      <li>Return, cancellation or refund arrangements.</li>
      <li>Any legal or safety requirements relating to the product.</li>
    </ul>

    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
      <p className="font-bold">
        Marketplace notice
      </p>

      <p className="mt-2">
        Sesan does not guarantee that every user, listing, product, price or
        transaction will meet another user&apos;s expectations.
      </p>
    </div>
  </div>
</section>

{/* Section 05 — Seller Responsibilities */}
<section
  id="seller-responsibilities"
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
    Section 05
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Seller Responsibilities
  </h2>

  <div className="privacy-content mt-6 space-y-7 leading-8 text-slate-600">
    <p>
      Sellers are responsible for their product listings, communications and
      transactions.
    </p>

    <p>Sellers must:</p>

    <ul>
      <li>Provide truthful and accurate product information.</li>
      <li>Use clear and relevant photos or videos.</li>
      <li>State the correct price, currency and quantity.</li>
      <li>Update availability when a product is sold or unavailable.</li>
      <li>Disclose important defects, risks or restrictions.</li>
      <li>Have the legal right to sell the listed product.</li>
      <li>Comply with agricultural, trade, safety and consumer laws.</li>
      <li>Communicate respectfully and honestly with buyers.</li>
      <li>Fulfil confirmed orders according to agreed terms.</li>
      <li>Avoid false claims or misleading advertising.</li>
    </ul>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Product legality
      </h3>

      <p className="mt-3">
        Sellers must not list prohibited, stolen, counterfeit, unsafe or
        unlawful products.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Product quality
      </h3>

      <p className="mt-3">
        Sellers are responsible for the condition, quality, packaging,
        description and lawful sale of their products.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Agricultural products
      </h3>

      <p className="mt-3">
        Sellers of seeds, fertilisers, pesticides, animal products, feed,
        machinery or veterinary products must follow applicable product,
        labelling, licensing and safety requirements.
      </p>
    </div>
  </div>
</section>

{/* Section 06 — Buyer Responsibilities */}
<section
  id="buyer-responsibilities"
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-700">
    Section 06
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Buyer Responsibilities
  </h2>

  <div className="privacy-content mt-6 space-y-7 leading-8 text-slate-600">
    <p>
      Buyers are responsible for reviewing listings and confirming transaction
      details before placing or confirming an order.
    </p>

    <p>Buyers must:</p>

    <ul>
      <li>Review product information before ordering.</li>
      <li>Ask the seller for clarification when information is unclear.</li>
      <li>Provide accurate contact and delivery information.</li>
      <li>Pay the agreed amount through the accepted payment method.</li>
      <li>Communicate promptly regarding changes or cancellation.</li>
      <li>Inspect products within a reasonable time after receipt.</li>
      <li>Use products according to labels and safety guidance.</li>
      <li>Avoid false complaints, fraudulent orders or abusive conduct.</li>
    </ul>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Product inspection
      </h3>

      <p className="mt-3">
        Buyers should inspect products before payment or as soon as reasonably
        possible after delivery, depending on the agreed transaction method.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Agricultural safety
      </h3>

      <p className="mt-3">
        Buyers should follow professional guidance and product instructions
        before using chemicals, machinery, veterinary products or specialised
        agricultural equipment.
      </p>
    </div>
  </div>
</section>
{/* Section 07 — Prices, Fees and Payments */}
<section
  id="fees"
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-700">
    Section 07
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Prices, Fees and Payments
  </h2>

  <div className="privacy-content mt-6 space-y-7 leading-8 text-slate-600">
    <div>
      <h3 className="text-xl font-black text-slate-900">
        Product prices
      </h3>

      <p className="mt-3">
        Sellers are responsible for setting and displaying their own product
        prices unless Sesan clearly states otherwise.
      </p>

      <p className="mt-3">
        Sellers must ensure that prices, currencies, quantities and other
        charges shown in listings are accurate and not misleading.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Opening a depot
      </h3>

      <p className="mt-3">
        Opening or registering a depot in Sesan App is free of charge unless
        Sesan clearly announces a different policy for a specific service.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Marketplace service fee
      </h3>

      <p className="mt-3">
        When a seller completes a sale through the Sesan Cart marketplace
        feature, Sesan may charge a service fee equal to
        <strong className="text-slate-900"> 7% of the selling price</strong>.
      </p>

      <p className="mt-3">
        The applicable fee may be deducted from the seller&apos;s proceeds or
        collected through another payment arrangement communicated by Sesan.
      </p>

      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
        <p className="font-bold">
          Current Sesan Cart service fee: 7%
        </p>

        <p className="mt-2">
          Sesan may update fees in the future. Any updated fee should be
          communicated through the application, website or relevant service
          interface before it applies.
        </p>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Other charges
      </h3>

      <p className="mt-3">
        Delivery fees, payment-provider fees, taxes, packaging costs or other
        transaction charges may apply depending on the seller, buyer, delivery
        provider or payment method.
      </p>

      <p className="mt-3">
        Buyers and sellers should confirm all applicable charges before
        completing a transaction.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Payments
      </h3>

      <p className="mt-3">
        Payments may be made through methods supported by Sesan, the seller or
        a third-party payment provider.
      </p>

      <p className="mt-3">
        Users are responsible for providing accurate payment information and
        complying with the terms of any payment provider used.
      </p>
    </div>
  </div>
</section>

{/* Section 08 — Orders and Cancellation */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
    Section 08
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Orders and Cancellation
  </h2>

  <div className="privacy-content mt-6 space-y-7 leading-8 text-slate-600">
    <div>
      <h3 className="text-xl font-black text-slate-900">
        Placing an order
      </h3>

      <p className="mt-3">
        A buyer is responsible for reviewing the product, price, quantity,
        seller information and delivery details before submitting an order.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Order confirmation
      </h3>

      <p className="mt-3">
        An order may remain pending until it is accepted or confirmed by the
        seller.
      </p>

      <p className="mt-3">
        Product availability is not guaranteed until the seller confirms the
        order.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Cancellation by the buyer
      </h3>

      <p className="mt-3">
        A buyer should request cancellation as soon as possible if the order is
        no longer needed.
      </p>

      <p className="mt-3">
        Cancellation may not be available after the seller has prepared,
        shipped or delivered the order.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Cancellation by the seller
      </h3>

      <p className="mt-3">
        A seller may cancel an order when a product is unavailable, the price
        was entered incorrectly, delivery is impossible or another legitimate
        problem prevents fulfilment.
      </p>

      <p className="mt-3">
        Sellers should inform buyers promptly and provide an honest explanation
        for the cancellation.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Refund arrangements
      </h3>

      <p className="mt-3">
        Refunds, returns and exchanges generally depend on the agreement between
        the buyer and seller, the product condition and the payment method used.
      </p>

      <p className="mt-3">
        Where Sesan directly processes a payment or clearly provides a specific
        refund policy, the applicable Sesan policy may also apply.
      </p>
    </div>
  </div>
</section>

{/* Section 09 — Delivery */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
    Section 09
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Delivery
  </h2>

  <div className="privacy-content mt-6 space-y-7 leading-8 text-slate-600">
    <p>
      Delivery terms should be agreed between the buyer, seller and any
      delivery provider involved.
    </p>

    <p>Users should confirm:</p>

    <ul>
      <li>Delivery address or pickup location.</li>
      <li>Delivery cost.</li>
      <li>Expected delivery time.</li>
      <li>Payment method.</li>
      <li>Responsibility for packaging.</li>
      <li>Responsibility for damaged or delayed products.</li>
    </ul>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Delivery delays
      </h3>

      <p className="mt-3">
        Delivery may be delayed because of weather, road conditions, distance,
        product availability, transportation problems or circumstances beyond
        reasonable control.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Independent delivery providers
      </h3>

      <p className="mt-3">
        Unless Sesan directly provides and expressly guarantees a delivery
        service, Sesan is not responsible for the acts, delays or failures of
        independent delivery providers.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Product inspection
      </h3>

      <p className="mt-3">
        Buyers should inspect delivered products as soon as reasonably possible
        and report serious problems promptly to the seller.
      </p>
    </div>
  </div>
</section>

{/* Section 10 — User Content */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-700">
    Section 10
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    User Content
  </h2>

  <div className="privacy-content mt-6 space-y-7 leading-8 text-slate-600">
    <p>
      Users may upload or publish product listings, descriptions, photos,
      videos, reviews, comments, messages and other content through Sesan.
    </p>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Ownership
      </h3>

      <p className="mt-3">
        You retain ownership of content that you lawfully own.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Permission to use content
      </h3>

      <p className="mt-3">
        By publishing content through Sesan, you grant Sesan a non-exclusive,
        worldwide, royalty-free licence to host, store, display, reproduce,
        resize, format and distribute the content only as reasonably needed to
        operate, promote and improve Sesan services.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Your responsibility
      </h3>

      <p className="mt-3">
        You confirm that your content is accurate, lawful and does not violate
        copyright, trademark, privacy, publicity or other rights.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black text-slate-900">
        Content removal
      </h3>

      <p className="mt-3">
        Sesan may remove, restrict or hide content that violates these Terms,
        applicable law, user safety or marketplace rules.
      </p>
    </div>
  </div>
</section>

{/* Section 11 — Ratings and Reviews */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-700">
    Section 11
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Ratings and Reviews
  </h2>

  <div className="privacy-content mt-6 space-y-5 leading-8 text-slate-600">
    <p>
      Ratings and reviews should reflect a genuine product, seller or
      transaction experience.
    </p>

    <p>Users must not:</p>

    <ul>
      <li>Submit fake reviews.</li>
      <li>Review their own account using another account.</li>
      <li>Offer payment or rewards for dishonest reviews.</li>
      <li>Threaten users to obtain a positive review.</li>
      <li>Publish abusive, discriminatory or irrelevant comments.</li>
      <li>Disclose another person&apos;s sensitive information.</li>
      <li>Manipulate ratings or review statistics.</li>
    </ul>

    <p>
      Sesan may remove or limit reviews that are fraudulent, abusive,
      duplicated, irrelevant, manipulated or otherwise violate these Terms.
    </p>
  </div>
</section>

{/* Section 12 — Prohibited Activities */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-red-700">
    Section 12
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Prohibited Activities
  </h2>

  <div className="privacy-content mt-6 space-y-7 leading-8 text-slate-600">
    <p>You must not use Sesan to:</p>

    <ul>
      <li>Sell illegal, stolen, counterfeit or prohibited products.</li>
      <li>Publish false, misleading or fraudulent listings.</li>
      <li>Impersonate another person, business or organisation.</li>
      <li>Harass, threaten, exploit or discriminate against users.</li>
      <li>Send spam, malware, scams or harmful links.</li>
      <li>Obtain account access without permission.</li>
      <li>Collect user information for unauthorised purposes.</li>
      <li>Manipulate orders, prices, ratings, reviews or platform statistics.</li>
      <li>Create false accounts to avoid restrictions.</li>
      <li>Interfere with the security or operation of Sesan.</li>
      <li>Use automated tools to scrape or copy data without permission.</li>
      <li>Use Sesan for money laundering, fraud or other unlawful activity.</li>
      <li>Publish content that violates intellectual-property rights.</li>
      <li>Encourage dangerous or unlawful use of agricultural products.</li>
    </ul>

    <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-950">
      <p className="font-bold">
        Enforcement
      </p>

      <p className="mt-2">
        Sesan may remove listings, restrict features, suspend accounts, preserve
        relevant records or cooperate with lawful authorities when serious
        violations are suspected.
      </p>
    </div>
  </div>
</section>
{/* Section 13 — Intellectual Property */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-700">
    Section 13
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Intellectual Property
  </h2>

  <div className="privacy-content mt-6 space-y-6 leading-8 text-slate-600">
    <p>
      The Sesan name, Sesan Group logo, Sesan App, Sesan Shop, Sesan Media,
      Sesan Tools, Sesan Plant and Sesan Animal branding, website design,
      graphics, software, databases, documentation and original content are
      owned by Sesan Group or its licensors and are protected by applicable
      intellectual property laws.
    </p>

    <p>
      Users may not copy, reproduce, modify, distribute, sell or commercially
      exploit Sesan content without prior written permission, except where
      permitted by law.
    </p>

    <p>
      Users remain responsible for ensuring that the content they upload does
      not infringe another person's copyright, trademark or other intellectual
      property rights.
    </p>
  </div>
</section>

{/* Section 14 — Service Availability */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-700">
    Section 14
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Service Availability
  </h2>

  <div className="privacy-content mt-6 space-y-6 leading-8 text-slate-600">
    <p>
      Sesan works to keep its services available, reliable and secure.
      However, uninterrupted access cannot always be guaranteed.
    </p>

    <p>
      Services may be temporarily unavailable because of maintenance,
      upgrades, technical failures, internet connectivity, security incidents,
      government requirements or circumstances beyond our reasonable control.
    </p>

    <p>
      Sesan may update, improve, suspend or discontinue features or services
      without prior notice where reasonably necessary.
    </p>
  </div>
</section>

{/* Section 15 — Account Suspension and Termination */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-red-700">
    Section 15
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Account Suspension and Termination
  </h2>

  <div className="privacy-content mt-6 space-y-6 leading-8 text-slate-600">
    <p>Sesan may suspend, restrict or permanently terminate an account when:</p>

    <ul>
      <li>These Terms are violated.</li>
      <li>Fraudulent or illegal activity is suspected.</li>
      <li>User safety or marketplace integrity is at risk.</li>
      <li>False identity or misleading information is provided.</li>
      <li>Repeated complaints remain unresolved.</li>
      <li>Required legal obligations must be fulfilled.</li>
    </ul>

    <p>
      Users may also request account deletion through Sesan support, subject to
      applicable legal, accounting and security obligations.
    </p>
  </div>
</section>

{/* Section 16 — Disclaimer of Warranties */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-700">
    Section 16
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Disclaimer of Warranties
  </h2>

  <div className="privacy-content mt-6 space-y-6 leading-8 text-slate-600">
    <p>
      Sesan provides its services on an "as available" and "as is" basis to
      the extent permitted by law.
    </p>

    <p>
      Sesan does not guarantee that every product listing, seller, buyer,
      delivery provider or transaction will meet every user's expectations.
    </p>

    <p>
      Users are responsible for making their own decisions before purchasing,
      selling or relying on marketplace information.
    </p>
  </div>
</section>

{/* Section 17 — Limitation of Liability */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
    Section 17
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Limitation of Liability
  </h2>

  <div className="privacy-content mt-6 space-y-6 leading-8 text-slate-600">
    <p>
      To the maximum extent permitted by applicable law, Sesan is not liable
      for indirect, incidental, consequential or special damages arising from
      the use of the platform.
    </p>

    <p>
      Sesan is not responsible for disputes arising solely between buyers,
      sellers, delivery providers or other independent third parties.
    </p>

    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <strong>Marketplace Reminder</strong>

      <p className="mt-3">
        Buyers and sellers remain primarily responsible for their own
        agreements, products, communications and transactions.
      </p>
    </div>
  </div>
</section>

{/* Section 18 — Governing Law */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-green-700">
    Section 18
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Governing Law
  </h2>

  <div className="privacy-content mt-6 space-y-6 leading-8 text-slate-600">
    <p>
      These Terms are governed by the laws of the Kingdom of Cambodia unless
      another applicable law requires otherwise.
    </p>

    <p>
      Any dispute should first be resolved through good-faith discussion.
      Where resolution cannot be achieved, disputes may be submitted to the
      competent courts or authorities of Cambodia.
    </p>
  </div>
</section>

{/* Section 19 — Changes to These Terms */}
<section
  className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
>
  <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-700">
    Section 19
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
    Changes to These Terms
  </h2>

  <div className="privacy-content mt-6 space-y-6 leading-8 text-slate-600">
    <p>
      Sesan may revise these Terms from time to time in response to new
      services, legal requirements, security improvements or operational
      changes.
    </p>

    <p>
      Updated Terms become effective when published on the Sesan website or
      within Sesan services unless another effective date is stated.
    </p>

    <p>
      Continued use of Sesan after updated Terms become effective constitutes
      acceptance of those changes.
    </p>
  </div>
</section>

{/* Final Contact */}
<section
  className="mt-8 rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-10 text-white"
>
  <p className="text-sm font-bold uppercase tracking-[0.3em]">
    Contact Sesan
  </p>

  <h2 className="mt-4 text-4xl font-black">
    Questions About These Terms?
  </h2>

  <p className="mt-6 max-w-3xl text-lg leading-8 text-green-100">
    If you have questions regarding these Terms of Use, marketplace policies,
    seller responsibilities or legal matters, please contact Sesan Group.
  </p>

  <div className="mt-8 grid gap-4 md:grid-cols-2">
    <div className="rounded-2xl bg-white/10 p-6">
      <p className="text-sm text-green-200">Website</p>
      <p className="mt-2 text-xl font-bold">https://sesanshop.com</p>
    </div>

    <div className="rounded-2xl bg-white/10 p-6">
      <p className="text-sm text-green-200">Email</p>
      <p className="mt-2 text-xl font-bold">
        info@sesanshop.com
      </p>
    </div>

    <div className="rounded-2xl bg-white/10 p-6">
      <p className="text-sm text-green-200">Phone</p>
      <p className="mt-2 text-xl font-bold">
        +855 11 930 717
      </p>
    </div>

    <div className="rounded-2xl bg-white/10 p-6">
      <p className="text-sm text-green-200">Country</p>
      <p className="mt-2 text-xl font-bold">
        Cambodia
      </p>
    </div>
  </div>

  <p className="mt-10 text-sm text-green-200">
    Last updated: August 2026
  </p>
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
                Need assistance with these Terms?
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-green-50">
                Contact Sesan Group for questions about accounts, marketplace
                rules, seller responsibilities, buyer responsibilities or other
                service conditions.
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