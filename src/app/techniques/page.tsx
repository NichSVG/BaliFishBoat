import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Zap } from "lucide-react";
import { getTechniqueList } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";
import { BLUR_PLACEHOLDER } from "@/lib/ui-data";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Fishing Techniques in Bali — Trolling, Jigging, Popping & More",
  description:
    "Learn the fishing techniques used in Bali waters — trolling, jigging, popping, bottom fishing, and casting. Best methods for each species.",
  alternates: { canonical: "/techniques" },
  openGraph: {
    title: "Fishing Techniques in Bali",
    description: "Learn the fishing techniques used in Bali waters.",
    url: `${SITE_URL}/techniques`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Fishing Techniques in Bali",
    description: "Learn the fishing techniques used in Bali waters.",
  },
};

export default async function TechniquesHubPage() {
  const techniques = await getTechniqueList();
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Fishing Techniques", url: "/techniques" },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <SchemaMarkup schema={breadcrumb} />

      <div className="mb-10 lg:mb-14 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-600 mb-3">Fishing Guide</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-primary-950 mb-4">
          Fishing Techniques
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          From trolling for tuna to jigging for snapper — master the techniques that work best in Bali&apos;s waters.
        </p>
      </div>

      {techniques.length === 0 ? (
        <p className="text-center text-slate-500 py-12">Technique guides coming soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {techniques.map((t) => (
            <Link
              key={t.slug}
              href={`/techniques/${t.slug}`}
              className="group flex flex-col rounded-2xl bg-white border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-800 via-primary-600 to-lagoon-400 overflow-hidden">
                {t.image?.asset?.url ? (
                  <Image
                    src={t.image.asset.url}
                    alt={t.image.alt || t.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                ) : (
                  <Zap className="absolute -right-4 -bottom-6 h-36 w-36 text-white/10 rotate-[-15deg] group-hover:rotate-[-5deg] transition-transform duration-500" aria-hidden="true" />
                )}
                {t.skillLevel && (
                  <span className="absolute top-4 left-4 inline-block rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold text-primary-950">
                    {t.skillLevel}
                  </span>
                )}
              </div>
              <div className="flex flex-col grow p-6">
                <h2 className="font-display text-xl text-primary-950 group-hover:text-primary-600 transition-colors mb-1">
                  {t.name}
                </h2>
                {t.bestFor && (
                  <p className="text-sm text-primary-600 font-medium mb-2">Best for: {t.bestFor}</p>
                )}
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {t.summary}
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
