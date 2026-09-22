import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, Calendar, Ruler, Ship, Fish } from "lucide-react";
import { getLocationBySlug, getLocationList } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";
import { BLUR_PLACEHOLDER } from "@/lib/ui-data";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import MarkdownRenderer from "@/components/MarkdownRenderer";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const locations = await getLocationList();
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  { const { slug } = await params;
  const loc = await getLocationBySlug(slug);
  if (!loc) return { title: "Location Not Found" };
  return {
    title: `${loc.name} — Fishing Location in Bali`,
    description: loc.metaDescription || `Fishing guide for ${loc.name} in ${loc.region || "Bali"}. Best season, species, and how to get there.`,
    alternates: { canonical: `/locations/${slug}` },
    openGraph: {
      title: `${loc.name} — Fishing in Bali`,
      description: loc.metaDescription || loc.summary || "",
      url: `${SITE_URL}/locations/${slug}`,
      type: "article",
      images: loc.image?.asset?.url ? [{ url: loc.image.asset.url, width: 800, height: 600, alt: loc.image.alt || loc.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${loc.name} — Fishing in Bali`,
      description: loc.metaDescription || loc.summary || "",
      images: loc.image?.asset?.url ? [loc.image.asset.url] : [],
    },
  }; }
}

export default async function LocationDetailPage({ params }: Props) {
  const { slug } = await params;
  const loc = await getLocationBySlug(slug);
  if (!loc) notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Fishing Locations", url: "/locations" },
    { name: loc.name, url: `/locations/${slug}` },
  ]);

  const infoItems = [
    loc.region && { icon: MapPin, label: "Region", value: loc.region },
    loc.distanceFromHarbor && { icon: Ship, label: "Distance", value: loc.distanceFromHarbor },
    loc.bestSeason && { icon: Calendar, label: "Best Season", value: loc.bestSeason },
    loc.waterDepth && { icon: Ruler, label: "Water Depth", value: loc.waterDepth },
    loc.boatAccess && { icon: Fish, label: "Boat Access", value: loc.boatAccess },
  ].filter(Boolean) as { icon: typeof MapPin; label: string; value: string }[];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <SchemaMarkup schema={breadcrumbSchema} />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/locations" className="hover:text-primary-600 transition-colors">Fishing Locations</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-primary-950 font-medium truncate max-w-[40vw]">{loc.name}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        <div>
          {loc.image?.asset?.url && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 shadow-card mb-8">
              <Image
                src={loc.image.asset.url}
                alt={loc.image.alt || loc.name}
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
            Fishing at {loc.name}
          </h1>
          {loc.summary && (
            <p className="text-lg text-slate-700 leading-relaxed max-w-prose mb-10">{loc.summary}</p>
          )}

          {loc.body && <MarkdownRenderer content={loc.body} />}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl bg-white border border-slate-100 shadow-card p-6 space-y-4">
            <h2 className="font-display text-xl text-primary-950">Location Info</h2>
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
          </div>
        </aside>
      </div>
    </div>
  );
}
