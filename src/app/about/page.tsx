import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, Clock, Award, Users, Anchor } from "lucide-react";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { CREW, BOAT_SPECS } from "@/lib/ui-data";
import { getCharter } from "@/lib/data";
import { BLUR_PLACEHOLDER } from "@/lib/ui-data";

export const metadata: Metadata = {
  title: "About Us — Meet the Crew",
  description:
    "Meet the crew behind Bali Fishing Trips. Experienced local captains, a 36ft GT 70 yacht, and 126+ verified reviews on FishingBooker.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Bali Fishing Trips — Meet the Crew",
    description: "Meet the crew behind Bali Fishing Trips.",
    url: `${SITE_URL}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: "About Bali Fishing Trips — Meet the Crew",
    description: "Meet the crew behind Bali Fishing Trips.",
  },
};

export default async function AboutPage() {
  const charter = await getCharter();
  const overall = charter?.ratingSnapshot?.overall ?? 4.4;
  const reviewCount = charter?.ratingSnapshot?.reviewCount ?? 126;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      {/* Hero */}
      <div className="max-w-3xl mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-600 mb-3">About Us</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-primary-950 mb-6">
          We Live for the Chase
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          {charter?.tagline || SITE_NAME + " operates private fishing charters from Serangan Harbor, Bali. We run daily trips on a 36ft GT 70 cruiser with an experienced local crew. All trips are all-inclusive."}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
            <strong className="font-semibold text-primary-950">{overall}</strong> · {reviewCount} verified reviews
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary-600" />
            Free cancellation up to 30 days
          </span>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        {[
          { icon: Award, value: `${reviewCount}+`, label: "Verified Reviews" },
          { icon: Star, value: `${overall}/5`, label: "Average Rating" },
          { icon: Anchor, value: "36 ft", label: "Private Yacht" },
          { icon: Users, value: "8", label: "Guests Max" },
        ].map(({ icon: Icon, value, label }) => (
          <div key={label} className="rounded-xl bg-white border border-slate-100 shadow-card p-5 text-center">
            <Icon className="h-5 w-5 text-primary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary-950">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Crew */}
      <div className="mb-16">
        <h2 className="font-display text-3xl tracking-tight text-primary-950 mb-8">Meet the Crew</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CREW.map((member) => (
            <div key={member.name} className="rounded-2xl bg-white border border-slate-100 shadow-card overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-primary-800 via-primary-600 to-lagoon-400">
                <Image
                  src={member.photo}
                  alt={`${member.name} — ${member.role}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-primary-950 mb-1">{member.name}</h3>
                <p className="text-sm font-semibold text-primary-600 mb-3">{member.role}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{member.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Boat */}
      <div className="mb-16">
        <h2 className="font-display text-3xl tracking-tight text-primary-950 mb-8">The Boat</h2>
        <div className="rounded-2xl bg-white border border-slate-100 shadow-card p-6 lg:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BOAT_SPECS.map((spec) => (
              <div key={spec.label} className="text-center p-4">
                <p className="text-2xl font-bold text-primary-950 mb-1">{spec.value}</p>
                <p className="text-xs text-slate-500">{spec.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-primary-950 text-white p-8 lg:p-12 text-center">
        <h2 className="font-display text-3xl mb-3">Ready to Fish With Us?</h2>
        <p className="text-slate-300 mb-8 max-w-lg mx-auto">
          All-inclusive private charters from Serangan Harbor. Hotel pickup, experienced crew, you keep the catch.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/trips"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary-950 hover:bg-sand-100 transition-colors"
          >
            View Trip Packages
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Make an Inquiry
          </Link>
        </div>
      </div>
    </div>
  );
}
