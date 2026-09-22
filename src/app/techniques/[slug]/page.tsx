import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, Calendar, Ruler, Ship } from "lucide-react";
import { getTechniqueBySlug, getTechniqueList } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";
import { BLUR_PLACEHOLDER } from "@/lib/ui-data";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import MarkdownRenderer from "@/components/MarkdownRenderer";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const techniques = await getTechniqueList();
  return techniques.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tech = await getTechniqueBySlug(slug);
  if (!tech) return { title: "Technique Not Found" };
  return {
    title: `${tech.name} Fishing in Bali — Complete Guide`,
    description: tech.metaDescription || `Learn how to use ${tech.name} fishing technique in Bali. Best for ${tech.bestFor || "various species"}.`,
    alternates: { canonical: `/techniques/${slug}` },
    openGraph: {
      title: `${tech.name} Fishing in Bali`,
      description: tech.metaDescription || tech.summary || "",
      url: `${SITE_URL}/techniques/${slug}`,
      type: "article",
      images: tech.image?.asset?.url ? [{ url: tech.image.asset.url, width: 800, height: 600, alt: tech.image.alt || tech.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tech.name} Fishing in Bali`,
      description: tech.metaDescription || tech.summary || "",
      images: tech.image?.asset?.url ? [tech.image.asset.url] : [],
    },
  };
}

export default async function TechniqueDetailPage({ params }: Props) {
  const { slug } = await params;
  const tech = await getTechniqueBySlug(slug);
  if (!tech) notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Fishing Techniques", url: "/techniques" },
    { name: tech.name, url: `/techniques/${slug}` },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <SchemaMarkup schema={breadcrumbSchema} />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/techniques" className="hover:text-primary-600 transition-colors">Fishing Techniques</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-primary-950 font-medium truncate max-w-[40vw]">{tech.name}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        <div>
          {tech.image?.asset?.url && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 shadow-card mb-8">
              <Image
                src={tech.image.asset.url}
                alt={tech.image.alt || tech.name}
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
            {tech.name} Fishing in Bali
          </h1>
          {tech.summary && (
            <p className="text-lg text-slate-700 leading-relaxed max-w-prose mb-10">{tech.summary}</p>
          )}

          {tech.body && <MarkdownRenderer content={tech.body} />}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl bg-white border border-slate-100 shadow-card p-6 space-y-4">
            <h2 className="font-display text-xl text-primary-950">Quick Facts</h2>
            {tech.skillLevel && (
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-seafoam-100">
                  <Ruler className="h-4.5 w-4.5 text-primary-700" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">Skill Level</p>
                  <p className="text-sm font-semibold text-primary-950">{tech.skillLevel}</p>
                </div>
              </div>
            )}
            {tech.bestFor && (
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-seafoam-100">
                  <MapPin className="h-4.5 w-4.5 text-primary-700" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">Best For</p>
                  <p className="text-sm font-semibold text-primary-950">{tech.bestFor}</p>
                </div>
              </div>
            )}
            {tech.bestSeason && (
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-seafoam-100">
                  <Calendar className="h-4.5 w-4.5 text-primary-700" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">Best Season</p>
                  <p className="text-sm font-semibold text-primary-950">{tech.bestSeason}</p>
                </div>
              </div>
            )}
            {tech.equipmentNeeded && (
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Equipment Needed</p>
                <p className="text-sm text-slate-700 leading-relaxed">{tech.equipmentNeeded}</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
