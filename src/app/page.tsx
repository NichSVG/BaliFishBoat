import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TripCard from "@/components/TripCard";
import ReviewBadges from "@/components/ReviewBadges";
import RatingSummary from "@/components/RatingSummary";
import Testimonials from "@/components/Testimonials";
import FAQAccordion from "@/components/FAQAccordion";
import LocationMap from "@/components/LocationMap";
import HomepagePics from "@/components/HomepagePics";
import BoatSection from "@/components/BoatSection";
import CrewSection from "@/components/CrewSection";
import HowItWorks from "@/components/HowItWorks";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import {
  Anchor, Fish, Waves, Shield, Clock, MapPin, MessageCircle, Car,
} from "lucide-react";
import { getTripPackages, getCharter, getTestimonials, getReviewThemes } from "@/lib/data";
import { TARGET_SPECIES, TECHNIQUES, SITE_URL, WHATSAPP_LINK } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Private Fishing Charters in Bali — Serangan Departures",
  description:
    "Book a private fishing charter in Bali. Half-day and full-day trips from Serangan targeting Yellowfin Tuna, Mahi Mahi, GT, and more.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Private Fishing Charters in Bali — Serangan Departures",
    description:
      "Book a private fishing charter in Bali. Half-day and full-day trips from Serangan targeting Yellowfin Tuna, Mahi Mahi, GT, and more.",
    url: SITE_URL,
    images: [{ url: "/images/hero-bg.jpg", width: 1200, height: 630, alt: "Bali fishing charter" }],
  },
};

const anglersStrip = [
  { src: "/images/gallery/big-catch-2.jpg", alt: "Another great catch on a Bali fishing charter" },
  { src: "/images/gallery/happy-group.jpg", alt: "Happy group of anglers after a Bali fishing trip" },
  { src: "/images/gallery/big-catch.jpg", alt: "Mahi Mahi caught offshore from Serangan" },
  { src: "/images/gallery/happy-customer.jpg", alt: "Guest holding a fresh catch" },
  { src: "/images/gallery/many-fishes.jpg", alt: "Multiple catches in a single trip" },
  { src: "/images/gallery/long-catch.jpg", alt: "Fresh catch from Serangan waters" },
];

export default async function HomePage() {
  const [trips, charter, testimonials] = await Promise.all([
    getTripPackages(),
    getCharter(),
    getTestimonials(),
  ]);
  const reviewThemes = getReviewThemes();
  const featuredTrips = trips.slice(0, 3);
  const overall = charter?.ratingSnapshot?.overall ?? 4.4;
  const reviewCount = charter?.ratingSnapshot?.reviewCount ?? 126;

  return (
    <>
      <Hero overallRating={overall} reviewCount={reviewCount} />
      <TrustBar overallRating={overall} reviewCount={reviewCount} />

      {/* Trip Packages */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              eyebrow="Trip Packages"
              title="Pick Your Day on the Water"
              support="Half-day to full-day, shared or fully private — every trip is all-inclusive."
            />
            <Link
              href="/trips"
              className="hidden lg:inline-flex items-center mb-14 text-sm font-semibold text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline"
            >
              View all {trips.length} packages →
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredTrips.map((trip, i) => (
            <Reveal key={trip.slug} delay={i * 80}>
              <TripCard trip={trip} />
            </Reveal>
          ))}
        </div>
        {trips.length > 3 && (
          <div className="text-center mt-10">
            <Link
              href="/trips"
              className="inline-flex items-center rounded-full bg-primary-700 px-7 py-3 text-sm font-semibold text-white hover:bg-primary-800 transition-colors"
            >
              View All {trips.length} Packages
            </Link>
          </div>
        )}
      </section>

      {/* Why Fish With Us */}
      <section className="bg-sand-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Why Us"
              title="Why Anglers Fish With Us"
              support="Everything that makes a day on the water easy — handled before you step aboard."
            />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Anchor, title: "Experienced Crew", desc: "Local captains who know Bali waters inside out" },
              { icon: Fish, title: "Top Species", desc: "Target Mahi Mahi, Tuna, Snapper, and more" },
              { icon: Waves, title: "36ft Yacht", desc: "Comfortable cruiser with shaded seating and toilet" },
              { icon: Shield, title: "All-Inclusive", desc: "License, drinks, snacks, pickup — all covered" },
              { icon: Clock, title: "Flexible Trips", desc: "3 to 8 hour trips, shared or private" },
              { icon: MapPin, title: "Serangan Departure", desc: "Easy access from anywhere in south Bali" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="flex gap-4 rounded-2xl bg-white border border-slate-100 p-6 shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 h-full">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-seafoam-100 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-950">{title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mt-1">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Boat */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BoatSection />
        </div>
      </section>

      {/* Crew */}
      <section className="bg-sand-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CrewSection />
        </div>
      </section>

      {/* From the Water — mosaic */}
      <HomepagePics />

      {/* Reviews */}
      <section id="reviews" className="bg-sand-50 py-20 lg:py-28 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Reviews"
              title={`Rated ${overall}/5 by ${reviewCount} Anglers`}
              support="Every review below comes from a verified FishingBooker trip."
              align="center"
            />
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 mb-6">
            <Reveal>
              <RatingSummary overall={overall} reviewCount={reviewCount} />
            </Reveal>
            <Reveal delay={120}>
              <ReviewBadges themes={reviewThemes} />
            </Reveal>
          </div>

          {/* Anglers' strip */}
          <Reveal>
            <div className="flex gap-3 overflow-x-auto pb-2 mb-10 snap-x [scrollbar-width:thin]">
              {anglersStrip.map((img) => (
                <Link
                  key={img.src}
                  href="/gallery"
                  className="relative flex-shrink-0 w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden snap-start group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="176px"
                  />
                </Link>
              ))}
            </div>
          </Reveal>

          {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
        </div>
      </section>

      {/* How booking works */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <HowItWorks />
        </div>
      </section>

      {/* Species & Techniques */}
      <section className="bg-seafoam-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="The Fishing"
              title="What's Biting Around Serangan"
              support="Offshore and inshore grounds within easy reach of the harbor."
            />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Reveal>
              <h3 className="font-display text-xl text-primary-950 mb-5">What You Can Catch</h3>
              <div className="grid grid-cols-2 gap-3">
                {(charter?.targetSpecies ?? TARGET_SPECIES).map((species) => (
                  <div
                    key={species}
                    className="flex items-center gap-2.5 rounded-xl bg-white border border-slate-100 shadow-card px-4 py-3"
                  >
                    <Fish className="h-4 w-4 text-gold-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-primary-950">{species}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="font-display text-xl text-primary-950 mb-5">Fishing Techniques</h3>
              <div className="grid grid-cols-2 gap-3">
                {(charter?.techniques ?? TECHNIQUES).map((tech, i) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2.5 rounded-xl bg-white border border-slate-100 shadow-card px-4 py-3"
                  >
                    <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold tabular-nums">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-primary-950">{tech}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Where We Depart */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Departure"
              title="Easy to Reach, Hard to Leave"
              support="We pick you up from your hotel or villa across south Bali."
            />
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Reveal>
              <LocationMap />
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-4">
                <div className="rounded-2xl bg-white border border-slate-100 shadow-card p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center h-10 w-10 rounded-full bg-seafoam-100">
                      <MapPin className="h-5 w-5 text-primary-700" />
                    </span>
                    <h3 className="font-semibold text-primary-950">Serangan Harbor</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Denpasar, Bali — roughly 20–40 minutes from most south Bali areas.
                  </p>
                </div>
                <div className="rounded-2xl bg-white border border-slate-100 shadow-card p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center h-10 w-10 rounded-full bg-seafoam-100">
                      <Car className="h-5 w-5 text-primary-700" />
                    </span>
                    <h3 className="font-semibold text-primary-950">Pickup included</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Hotel and villa pickup is included in every trip — tell us where you&apos;re staying
                    and we&apos;ll handle the rest.
                  </p>
                </div>
                <div className="rounded-2xl bg-white border border-slate-100 shadow-card p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center h-10 w-10 rounded-full bg-seafoam-100">
                      <Clock className="h-5 w-5 text-primary-700" />
                    </span>
                    <h3 className="font-semibold text-primary-950">Trips daily from 07:00</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Morning departures get the best of the conditions. Sunset trips leave at 14:00.
                  </p>
                  {WHATSAPP_LINK && (
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta="whatsapp"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Ask about pickup from your hotel →
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="FAQ"
              title="Good Questions, Straight Answers"
            />
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
            <Reveal>
              <FAQAccordion />
            </Reveal>
            <Reveal delay={120}>
              <div className="lg:sticky lg:top-24 rounded-2xl bg-primary-950 text-white p-6">
                <h3 className="font-display text-xl mb-2">Still deciding?</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  Message us — we usually reply within the hour during daytime.
                </p>
                {WHATSAPP_LINK && (
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="whatsapp"
                    className="flex items-center justify-center gap-2 w-full rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white hover:bg-whatsapp-dark transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                )}
                <p className="mt-4 text-xs text-slate-400 flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  Free cancellation up to 30 days
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-gradient-to-b from-primary-950 to-primary-900 text-white py-20 lg:py-28">
        <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden" aria-hidden="true">
          <svg className="absolute top-0 w-[200%] animate-wave-slow opacity-20" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="rgba(127,216,222,0.25)" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300 mb-4">Ready to Fish?</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-5">
            Your boat is waiting at Serangan.
          </h2>
          <p className="text-lg text-slate-300 mb-9 max-w-2xl mx-auto leading-relaxed">
            Private charters, experienced local crew, and the best fishing spots around Bali.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {WHATSAPP_LINK && (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-base font-semibold text-white shadow-cta hover:bg-whatsapp-dark hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
              >
                <MessageCircle className="h-5 w-5" />
                Check Availability on WhatsApp
              </a>
            )}
            <Link
              href="/trips"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Compare Trip Packages
            </Link>
          </div>
          <p className="mt-7 text-sm text-slate-400">
            ★ {overall} · {reviewCount} reviews · Free cancellation up to 30 days
          </p>
        </div>
      </section>
    </>
  );
}
