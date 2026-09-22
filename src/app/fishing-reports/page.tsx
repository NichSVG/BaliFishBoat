import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Fish, Anchor } from "lucide-react";
import { getFishingReportList } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Fishing Reports — Recent Catches from Bali",
  description:
    "Latest fishing reports from Serangan, Bali. See what's biting, conditions, catches, and trip highlights.",
  alternates: { canonical: "/fishing-reports" },
  openGraph: {
    title: "Fishing Reports from Bali",
    description: "Latest fishing reports from Serangan, Bali.",
    url: `${SITE_URL}/fishing-reports`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Fishing Reports from Bali",
    description: "Latest fishing reports from Serangan, Bali.",
  },
};

export default async function FishingReportsHubPage() {
  const reports = await getFishingReportList();
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Fishing Reports", url: "/fishing-reports" },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <SchemaMarkup schema={breadcrumb} />

      <div className="mb-10 lg:mb-14 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-600 mb-3">From the Water</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-primary-950 mb-4">
          Fishing Reports
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Real trips, real catches. See what&apos;s been biting around Serangan and Bali waters.
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-16">
          <Anchor className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg mb-2">No fishing reports yet.</p>
          <p className="text-slate-400 text-sm">Check back after our next trip — we post reports regularly.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reports.map((report) => (
            <Link
              key={report.slug}
              href={`/fishing-reports/${report.slug}`}
              className="group flex flex-col rounded-2xl bg-white border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-36 bg-gradient-to-br from-primary-800 via-primary-600 to-lagoon-400 overflow-hidden flex items-center justify-center">
                <Fish className="h-16 w-16 text-white/15" aria-hidden="true" />
                {report.tripType && (
                  <span className="absolute top-3 left-3 inline-block rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold text-primary-950">
                    {report.tripType}
                  </span>
                )}
              </div>
              <div className="flex flex-col grow p-6">
                <time className="text-xs text-slate-400 mb-1" dateTime={report.reportDate}>
                  {new Date(report.reportDate).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </time>
                <h2 className="font-display text-lg text-primary-950 group-hover:text-primary-600 transition-colors mb-2 line-clamp-2">
                  {report.title}
                </h2>
                {report.catches && report.catches.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {report.catches.slice(0, 4).map((c, i) => (
                      <span key={i} className="inline-block rounded-full bg-primary-50 border border-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                        {c.species}{c.count ? ` ×${c.count}` : ""}
                      </span>
                    ))}
                  </div>
                )}
                {report.highlights && (
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                    {report.highlights}
                  </p>
                )}
                <span className="mt-auto text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                  Read report →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
