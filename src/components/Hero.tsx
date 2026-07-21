import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

interface HeroProps {
  overallRating: number;
  reviewCount: number;
}

/** 5-star row with fractional fill for the last star (4.4 → 4 full + 40%). */
function StarRow({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const fraction = Math.round((rating - full) * 100);
  return (
    <div className="flex gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) {
          return <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />;
        }
        if (i === full && fraction > 0) {
          return (
            <span key={i} className="relative inline-block h-5 w-5">
              <Star className="absolute inset-0 h-5 w-5 text-white/40" />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fraction}%` }}>
                <Star className="h-5 w-5 fill-gold-400 text-gold-400" />
              </span>
            </span>
          );
        }
        return <Star key={i} className="h-5 w-5 text-white/40" />;
      })}
    </div>
  );
}

export default function Hero({ overallRating, reviewCount }: HeroProps) {
  return (
    <section className="relative overflow-hidden text-white min-h-[92svh] lg:min-h-[88vh] flex items-end">
      {/* Background image — next/image priority for LCP */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Guest fighting a fish on a Bali fishing charter from Serangan"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[65%_center]"
      />

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/70 via-primary-950/40 to-primary-950/85" />
      <div className="absolute inset-0 lg:bg-gradient-to-r lg:from-primary-950/60 lg:via-transparent lg:to-transparent" />

      {/* Single slow wave layer (brand motif) */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden" aria-hidden="true">
        <svg className="absolute bottom-0 w-[200%] animate-wave-slow" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="rgba(8,40,53,0.35)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-36 sm:pb-40 w-full">
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 text-lagoon-300 text-xs font-semibold uppercase tracking-[0.25em] mb-5">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>Serangan Harbor · Denpasar · Bali</span>
          </p>

          <h1 className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 drop-shadow-lg">
            Private Fishing <em className="italic text-gold-300">Charters</em> in Bali
          </h1>

          <p className="text-base sm:text-xl text-white/90 mb-7 max-w-2xl leading-relaxed drop-shadow">
            Target Yellowfin Tuna and Mahi Mahi aboard a 36ft private yacht. Local crew,
            all-inclusive trips, hotel pickup — you keep the catch.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-9">
            <StarRow rating={overallRating} />
            <span className="text-sm text-white/85">
              <strong className="font-semibold text-white">{overallRating}</strong> · {reviewCount} verified reviews on FishingBooker
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
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
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary-950 shadow-lg hover:bg-sand-100 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
            >
              Explore Trips &amp; Prices
            </Link>
          </div>
          <p className="mt-4">
            <Link
              href="/contact"
              className="text-sm font-medium text-white/75 underline-offset-4 hover:underline hover:text-white transition-colors"
            >
              or send an inquiry →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
