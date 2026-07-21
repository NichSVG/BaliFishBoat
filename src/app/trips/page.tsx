import type { Metadata } from "next";
import { Star, ShieldCheck } from "lucide-react";
import TripPackageList from "@/components/TripPackageList";
import TripCompareTable from "@/components/TripCompareTable";
import FAQAccordion from "@/components/FAQAccordion";
import SchemaMarkup from "@/components/SchemaMarkup";
import Reveal from "@/components/Reveal";
import { getTripPackages, getCharter } from "@/lib/data";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Bali Fishing Trip Packages & Prices",
  description:
    "Browse Bali fishing charter packages — half-day, full-day, shared and private trips from Serangan. Prices, durations, and what's included.",
  alternates: { canonical: "/trips" },
  openGraph: {
    title: "Bali Fishing Trip Packages & Prices",
    description:
      "Browse Bali fishing charter packages — half-day, full-day, shared and private trips from Serangan.",
    url: `${SITE_URL}/trips`,
  },
};

export default async function TripsPage() {
  const [trips, charter] = await Promise.all([getTripPackages(), getCharter()]);
  const overall = charter?.ratingSnapshot?.overall ?? 4.4;
  const reviewCount = charter?.ratingSnapshot?.reviewCount ?? 126;

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Trip Packages", url: "/trips" },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <SchemaMarkup schema={breadcrumb} />

      {/* Header */}
      <div className="mb-10 lg:mb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-600 mb-3">
          Trip Packages
        </p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-primary-950 mb-4">
          Bali Fishing Trip Packages &amp; Prices
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-5">
          All trips depart from Serangan Harbor, Denpasar. Private trips are priced per boat;
          the Sharing Trip and Sunset Trip are priced per person. Private charters include up to
          4 guests — additional guests are $50 each.
        </p>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
            <strong className="font-semibold text-primary-950">{overall}</strong> · {reviewCount} verified reviews
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary-600" />
            Free cancellation up to 30 days
          </span>
        </p>
      </div>

      {/* Cards */}
      <TripPackageList trips={trips} />

      {/* Compare table */}
      <Reveal className="mt-16 lg:mt-20">
        <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-primary-950 mb-6">
          Compare All Trips
        </h2>
        <TripCompareTable trips={trips} />
      </Reveal>

      {/* FAQ */}
      <Reveal className="mt-16 lg:mt-20 max-w-3xl">
        <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-primary-950 mb-6">
          Good to Know
        </h2>
        <FAQAccordion />
      </Reveal>
    </div>
  );
}
