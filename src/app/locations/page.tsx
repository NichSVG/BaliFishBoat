import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { getLocationList } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";
import { BLUR_PLACEHOLDER } from "@/lib/ui-data";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Fishing Locations in Bali — Where to Fish",
  description:
    "Discover the best fishing locations around Bali — Serangan, Nusa Penida, Uluwatu, Sanur, and more. Water depth, species, and access info.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Fishing Locations in Bali",
    description: "Discover the best fishing locations around Bali.",
    url: `${SITE_URL}/locations`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Fishing Locations in Bali",
    description: "Discover the best fishing locations around Bali.",
  },
};

export default async function LocationsHubPage() {
  const locations = await getLocationList();
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Fishing Locations", url: "/locations" },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <SchemaMarkup schema={breadcrumb} />

      <div className="mb-10 lg:mb-14 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-600 mb-3">Explore</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-primary-950 mb-4">
          Fishing Locations in Bali
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          From the harbor at Serangan to the deep waters off Nusa Penida — find the best spots for your next trip.
        </p>
      </div>

      {locations.length === 0 ? (
        <p className="text-center text-slate-500 py-12">Location guides coming soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="group flex flex-col rounded-2xl bg-white border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-800 via-primary-600 to-lagoon-400 overflow-hidden">
                {loc.image?.asset?.url ? (
                  <Image
                    src={loc.image.asset.url}
                    alt={loc.image.alt || loc.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                ) : (
                  <MapPin className="absolute -right-4 -bottom-6 h-36 w-36 text-white/10 rotate-[-15deg] group-hover:rotate-[-5deg] transition-transform duration-500" aria-hidden="true" />
                )}
                {loc.region && (
                  <span className="absolute top-4 left-4 inline-block rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold text-primary-950">
                    {loc.region}
                  </span>
                )}
              </div>
              <div className="flex flex-col grow p-6">
                <h2 className="font-display text-xl text-primary-950 group-hover:text-primary-600 transition-colors mb-1">
                  {loc.name}
                </h2>
                {loc.bestSeason && (
                  <p className="text-sm text-primary-600 font-medium mb-2">Best: {loc.bestSeason}</p>
                )}
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {loc.summary}
                </p>
                <span className="mt-auto text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                  Read guide →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
