import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Fish } from "lucide-react";
import { getSpeciesList } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";
import { BLUR_PLACEHOLDER } from "@/lib/ui-data";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Fish Species in Bali — Complete Guide",
  description:
    "Complete guide to fish species you can catch in Bali — Yellowfin Tuna, Mahi Mahi, GT, Marlin, and more. Best seasons, techniques, and bait.",
  alternates: { canonical: "/species" },
  openGraph: {
    title: "Fish Species in Bali — Complete Guide",
    description: "Complete guide to fish species you can catch in Bali.",
    url: `${SITE_URL}/species`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Fish Species in Bali — Complete Guide",
    description: "Complete guide to fish species you can catch in Bali.",
  },
};

export default async function SpeciesHubPage() {
  const species = await getSpeciesList();
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Fish Species", url: "/species" },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <SchemaMarkup schema={breadcrumb} />

      <div className="mb-10 lg:mb-14 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-600 mb-3">Fishing Guide</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-primary-950 mb-4">
          Fish Species in Bali
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Everything you need to know about the fish swimming in Bali&apos;s waters — when to find them,
          where they bite, and how to catch them.
        </p>
      </div>

      {species.length === 0 ? (
        <p className="text-center text-slate-500 py-12">Species guides coming soon. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {species.map((s) => (
            <Link
              key={s.slug}
              href={`/species/${s.slug}`}
              className="group flex flex-col rounded-2xl bg-white border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-800 via-primary-600 to-lagoon-400 overflow-hidden">
                {s.image?.asset?.url ? (
                  <Image
                    src={s.image.asset.url}
                    alt={s.image.alt || s.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                ) : (
                  <Fish className="absolute -right-4 -bottom-6 h-36 w-36 text-white/10 rotate-[-15deg] group-hover:rotate-[-5deg] transition-transform duration-500" aria-hidden="true" />
                )}
                {s.difficulty && (
                  <span className="absolute top-4 left-4 inline-block rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold text-primary-950">
                    {s.difficulty}
                  </span>
                )}
              </div>
              <div className="flex flex-col grow p-6">
                <h2 className="font-display text-xl text-primary-950 group-hover:text-primary-600 transition-colors mb-1">
                  {s.name}
                </h2>
                {s.bestSeason && (
                  <p className="text-sm text-primary-600 font-medium mb-2">Best: {s.bestSeason}</p>
                )}
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {s.summary}
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
