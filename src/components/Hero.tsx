import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { SITE_NAME, SITE_DESCRIPTION, WHATSAPP_LINK } from "@/lib/constants";

interface HeroProps {
  overallRating: number;
  reviewCount: number;
}

export default function Hero({ overallRating, reviewCount }: HeroProps) {
  return (
    <section className="relative overflow-hidden text-white min-h-[600px] flex items-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-blue-950/90" />

      {/* Animated waves at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
        <svg className="absolute bottom-0 w-[200%] animate-wave-slow" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="rgba(6,182,212,0.15)" />
        </svg>
        <svg className="absolute bottom-0 w-[200%] animate-wave-medium" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,80 C360,40 720,100 1080,60 C1260,40 1350,80 1440,80 L1440,120 L0,120 Z" fill="rgba(6,182,212,0.1)" />
        </svg>
        <svg className="absolute bottom-0 w-[200%] animate-wave-fast" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,90 C180,70 360,110 540,90 C720,70 900,110 1080,90 C1260,70 1350,100 1440,90 L1440,120 L0,120 Z" fill="rgba(7,89,133,0.2)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 pb-32 w-full">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-sky-300 text-sm mb-5">
            <MapPin className="h-4 w-4" />
            <span>Serangan, Denpasar, Bali</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-5 drop-shadow-lg">
            {SITE_NAME}
          </h1>

          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed drop-shadow">
            {SITE_DESCRIPTION}
          </p>

          <div className="flex items-center gap-3 mb-10">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.round(overallRating) ? "fill-amber-400 text-amber-400" : "text-white/40"}`}
                />
              ))}
            </div>
            <span className="text-sm text-white/80">
              {overallRating} / 5 from {reviewCount} reviews
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/trips"
              className="inline-flex items-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-blue-900 hover:bg-sky-50 shadow-lg shadow-black/30 transition-all hover:scale-105"
            >
              View Trip Packages
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all"
            >
              Book Now
            </Link>
            {WHATSAPP_LINK && (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-green-600 px-7 py-3.5 text-sm font-semibold text-white hover:bg-green-700 shadow-lg shadow-green-900/40 transition-all hover:scale-105"
              >
                WhatsApp Us
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
