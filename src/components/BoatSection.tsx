import Image from "next/image";
import Link from "next/link";
import {
  Ruler, Users, Gauge, Calendar, Ship, Waves, ShieldCheck, Anchor,
  type LucideIcon,
} from "lucide-react";
import { BOAT_SPECS } from "@/lib/ui-data";
import Reveal from "@/components/Reveal";

const iconMap: Record<string, LucideIcon> = {
  Ruler, Users, Gauge, Calendar, Ship, Waves, ShieldCheck, Anchor,
};

/** The Boat — spec sheet showcase (BLUEPRINT §2.5). */
export default function BoatSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* Photo */}
      <Reveal className="relative">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card">
          <Image
            src="/images/gallery/36ft-yacht.jpg"
            alt="36ft GT 70 fishing yacht anchored off Serangan, Bali"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <span className="absolute bottom-4 left-4 rounded-full bg-primary-950/70 backdrop-blur px-4 py-2 text-sm font-semibold text-white">
          36 ft · 8 guests · GT 70
        </span>
      </Reveal>

      {/* Specs */}
      <Reveal delay={120}>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-600 mb-3">The Boat</p>
        <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-primary-950 mb-4">
          A 36ft GT 70 Cruiser, Built for These Waters
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-prose">
          Plenty of room for everyone to fish at the same time — shaded seating,
          a private toilet, and outriggers rigged for trolling.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {BOAT_SPECS.map((spec) => {
            const Icon = iconMap[spec.icon] ?? Ship;
            return (
              <div key={spec.label} className="flex items-center gap-3 rounded-xl bg-white border border-slate-100 shadow-card p-4">
                <Icon className="h-5 w-5 text-primary-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-primary-950 leading-tight">{spec.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{spec.label}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-sm text-slate-500 mb-5">
          Licensed fishing, quality rods &amp; reels on board.
        </p>
        <Link
          href="/gallery"
          className="text-sm font-semibold text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline"
        >
          See the boat in the gallery →
        </Link>
      </Reveal>
    </div>
  );
}
