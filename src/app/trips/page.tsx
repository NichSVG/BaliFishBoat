import type { Metadata } from "next";
import TripPackageList from "@/components/TripPackageList";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getTripPackages } from "@/lib/data";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Fishing Trip Packages & Charter Prices",
  description:
    "Browse Bali fishing charter packages — half-day, full-day, shared and private trips from Serangan. Prices, durations, and what's included.",
  alternates: { canonical: "/trips" },
  openGraph: {
    title: "Fishing Trip Packages & Charter Prices",
    description:
      "Browse Bali fishing charter packages — half-day, full-day, shared and private trips from Serangan.",
    url: `${SITE_URL}/trips`,
  },
};

export default async function TripsPage() {
  const trips = await getTripPackages();
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Trip Packages", url: "/trips" },
  ]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <SchemaMarkup schema={breadcrumb} />
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Trip Packages</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          All trips depart from Serangan Harbor, Denpasar. Private trips are priced per boat; the Sharing Trip and Sunset Trip are priced per person.
          Private charters include up to 4 guests — additional guests are $50 each.
        </p>
      </div>
      <TripPackageList trips={trips} />
    </section>
  );
}
