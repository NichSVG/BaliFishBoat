import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, Cloud, Thermometer, Users, Fish } from "lucide-react";
import { getFishingReportBySlug, getFishingReportList } from "@/lib/data";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BLUR_PLACEHOLDER } from "@/lib/ui-data";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import MarkdownRenderer from "@/components/MarkdownRenderer";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const reports = await getFishingReportList();
  return reports.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  { const { slug } = await params;
  const report = await getFishingReportBySlug(slug);
  if (!report) return { title: "Report Not Found" };
  return {
    title: report.title,
    description: report.metaDescription || `Fishing report from ${new Date(report.reportDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}. ${report.highlights || ""}`.slice(0, 160),
    alternates: { canonical: `/fishing-reports/${slug}` },
    openGraph: {
      title: report.title,
      description: report.highlights || "",
      url: `${SITE_URL}/fishing-reports/${slug}`,
      type: "article",
      publishedTime: report.reportDate,
      images: report.photos?.[0]?.asset?.url ? [{ url: report.photos[0].asset.url, width: 800, height: 600, alt: report.photos[0].alt || report.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: report.title,
      description: report.highlights || "",
      images: report.photos?.[0]?.asset?.url ? [report.photos[0].asset.url] : [],
    },
  }; }
}

export default async function FishingReportDetailPage({ params }: Props) {
  const { slug } = await params;
  const report = await getFishingReportBySlug(slug);
  if (!report) notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Fishing Reports", url: "/fishing-reports" },
    { name: report.title, url: `/fishing-reports/${slug}` },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <SchemaMarkup schema={breadcrumbSchema} />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/fishing-reports" className="hover:text-primary-600 transition-colors">Fishing Reports</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-primary-950 font-medium truncate max-w-[40vw]">{report.title}</span>
      </nav>

      <header className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight text-primary-950 mb-4">{report.title}</h1>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {new Date(report.reportDate).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </span>
          {report.tripType && (
            <span className="inline-flex items-center gap-1.5">
              <Fish className="h-4 w-4" />
              {report.tripType}
            </span>
          )}
          {report.guestCount && (
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              {report.guestCount} guests
            </span>
          )}
        </div>
      </header>

      {/* Conditions bar */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {report.weather && (
          <div className="rounded-xl bg-white border border-slate-100 shadow-card p-3 text-center">
            <Cloud className="h-4 w-4 text-primary-600 mx-auto mb-1" />
            <p className="text-xs text-slate-500">Weather</p>
            <p className="text-sm font-semibold text-primary-950">{report.weather}</p>
          </div>
        )}
        {report.waterConditions && (
          <div className="rounded-xl bg-white border border-slate-100 shadow-card p-3 text-center">
            <Fish className="h-4 w-4 text-primary-600 mx-auto mb-1" />
            <p className="text-xs text-slate-500">Water</p>
            <p className="text-sm font-semibold text-primary-950">{report.waterConditions}</p>
          </div>
        )}
        {report.waterTemp && (
          <div className="rounded-xl bg-white border border-slate-100 shadow-card p-3 text-center">
            <Thermometer className="h-4 w-4 text-primary-600 mx-auto mb-1" />
            <p className="text-xs text-slate-500">Temp</p>
            <p className="text-sm font-semibold text-primary-950">{report.waterTemp}</p>
          </div>
        )}
      </div>

      {/* Catches */}
      {report.catches && report.catches.length > 0 && (
        <div className="rounded-2xl bg-seafoam-50 border border-primary-100 p-6 mb-10">
          <h2 className="font-display text-xl text-primary-950 mb-4">What We Caught</h2>
          <div className="space-y-2">
            {report.catches.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="font-medium text-primary-950">{c.species}</span>
                <span className="text-slate-600">
                  {c.count ? `${c.count}×` : ""}{c.weight ? ` ${c.weight}` : ""}
                  {c.technique ? ` — ${c.technique}` : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {report.body && <MarkdownRenderer content={report.body} />}

      {/* Photos */}
      {report.photos && report.photos.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-3">
          {report.photos.map((photo, i) => (
            photo.asset?.url && (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src={photo.asset.url}
                  alt={photo.alt || `Fishing report photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </div>
            )
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-primary-950 text-white p-8 text-center">
        <h2 className="font-display text-2xl mb-2">Want a trip like this?</h2>
        <p className="text-slate-300 mb-6 max-w-md mx-auto">
          We run private charters out of Serangan every day — all-inclusive, hotel pickup, you keep the catch.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/trips"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary-950 hover:bg-sand-100 transition-colors"
          >
            Explore Trip Packages
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Make an Inquiry
          </Link>
        </div>
      </div>
    </article>
  );
}
