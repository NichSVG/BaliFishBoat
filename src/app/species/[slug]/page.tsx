import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Anchor, Ruler, Calendar, Fish as FishIcon, ShieldCheck } from "lucide-react";
import { getSpeciesBySlug, getSpeciesList } from "@/lib/data";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BLUR_PLACEHOLDER } from "@/lib/ui-data";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import MarkdownRenderer from "@/components/MarkdownRenderer";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const species = await getSpeciesList();
  return species.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sp = await getSpeciesBySlug(slug);
  if (!sp) return { title: "Species Not Found" };
  return {
    title: `${sp.name} in Bali — Complete Fishing Guide`,
    description: sp.metaDescription || `Complete guide to fishing for ${sp.name} in Bali. Best season, techniques, bait, and where to find them.`,
    alternates: { canonical: `/species/${slug}` },
    openGraph: {
      title: `${sp.name} in Bali — Fishing Guide`,
      description: sp.metaDescription || sp.summary || "",
      url: `${SITE_URL}/species/${slug}`,
      type: "article",
      images: sp.image?.asset?.url ? [{ url: sp.image.asset.url, width: 800, height: 600, alt: sp.image.alt || sp.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${sp.name} in Bali — Fishing Guide`,
      description: sp.metaDescription || sp.summary || "",
      images: sp.image?.asset?.url ? [sp.image.asset.url] : [],
    },
  };
}

export default async function SpeciesDetailPage({ params }: Props) {
  const { slug } = await params;
  const sp = await getSpeciesBySlug(slug);
  if (!sp) notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Fish Species", url: "/species" },
    { name: sp.name, url: `/species/${slug}` },
  ]);

  const infoItems = [
    sp.bestSeason && { icon: Calendar, label: "Best Season", value: sp.bestSeason },
    sp.whereFound && { icon: Anchor, label: "Where Found", value: sp.whereFound },
    sp.averageSize && { icon: Ruler, label: "Average Size", value: sp.averageSize },
    sp.difficulty && { icon: ShieldCheck, label: "Difficulty", value: sp.difficulty },
    sp.eatingQuality && { icon: FishIcon, label: "Eating Quality", value: sp.eatingQuality },
  ].filter(Boolean) as { icon: typeof Calendar; label: string; value: string }[];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <SchemaMarkup schema={breadcrumbSchema} />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/species" className="hover:text-primary-600 transition-colors">Fish Species</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-primary-950 font-medium truncate max-w-[40vw]">{sp.name}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        <div>
          {sp.image?.asset?.url && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 shadow-card mb-8">
              <Image
                src={sp.image.asset.url}
                alt={sp.image.alt || sp.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
            </div>
          )}

          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-primary-950 mb-3">
            {sp.name} in Bali
          </h1>
          {sp.scientificName && (
            <p className="text-sm text-slate-500 italic mb-6">{sp.scientificName}</p>
          )}
          {sp.summary && (
            <p className="text-lg text-slate-700 leading-relaxed max-w-prose mb-10">{sp.summary}</p>
          )}

          {sp.body && <MarkdownRenderer content={sp.body} />}

          {sp.techniques && sp.techniques.length > 0 && (
            <div className="mt-10 rounded-2xl bg-seafoam-50 border border-primary-100 p-6">
              <h2 className="font-display text-xl text-primary-950 mb-4">Techniques</h2>
              <div className="flex flex-wrap gap-2">
                {sp.techniques.map((t) => (
                  <span key={t} className="rounded-full bg-white border border-slate-100 shadow-card px-3.5 py-1.5 text-sm font-medium text-primary-950">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl bg-white border border-slate-100 shadow-card p-6 space-y-4">
            <h2 className="font-display text-xl text-primary-950">Quick Facts</h2>
            {infoItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-seafoam-100">
                  <Icon className="h-4.5 w-4.5 text-primary-700" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="text-sm font-semibold text-primary-950">{value}</p>
                </div>
              </div>
            ))}
            {sp.bestBait && (
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Best Bait / Lure</p>
                <p className="text-sm font-semibold text-primary-950">{sp.bestBait}</p>
              </div>
            )}
            {sp.recordSize && (
              <div>
                <p className="text-xs text-slate-500 mb-1">Trophy Size</p>
                <p className="text-sm font-semibold text-primary-950">{sp.recordSize}</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
