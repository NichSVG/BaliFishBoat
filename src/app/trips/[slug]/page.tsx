import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Anchor, Users, DollarSign, Check } from "lucide-react";
import { getTripPackageBySlug, getTripPackages } from "@/lib/data";
import { INCLUSIONS } from "@/lib/constants";

export async function generateStaticParams() {
  const trips = await getTripPackages();
  return trips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = await getTripPackageBySlug(slug);
  if (!trip) return {};
  return {
    title: trip.name,
    description: trip.description,
  };
}

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = await getTripPackageBySlug(slug);
  if (!trip) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/trips" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to all trips
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-slate-900">{trip.name}</h1>
          <span
            className={`inline-block rounded-full px-4 py-1.5 text-sm font-semibold ${
              trip.bookingType === "shared"
                ? "bg-amber-100 text-amber-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {trip.bookingType === "shared" ? "Shared" : "Private"}
          </span>
        </div>

        <p className="text-slate-600 leading-relaxed mb-8">{trip.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 p-6 bg-slate-50 rounded-xl">
          <div className="text-center">
            <Clock className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-slate-900">{trip.durationHours}h</p>
            <p className="text-xs text-slate-500">Duration</p>
          </div>
          <div className="text-center">
            <Anchor className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-slate-900">{trip.startTime}</p>
            <p className="text-xs text-slate-500">Departure</p>
          </div>
          <div className="text-center">
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-slate-900">{trip.maxGuestsIncluded}</p>
            <p className="text-xs text-slate-500">Max Guests</p>
          </div>
          <div className="text-center">
            <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-slate-900">${trip.priceUsd}</p>
            <p className="text-xs text-slate-500">USD per boat</p>
          </div>
        </div>

        {/* Includes */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">What&apos;s Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(trip.includes?.length ? trip.includes : INCLUSIONS).map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href={`/contact?package=${trip.slug}`}
            className="inline-flex items-center rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Book This Trip
          </Link>
        </div>
      </div>
    </div>
  );
}
