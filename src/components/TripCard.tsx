import Image from "next/image";
import Link from "next/link";
import { Clock, Sunrise, Users } from "lucide-react";
import type { TripPackage } from "@/types/charter";
import { TRIP_IMAGES, TRIP_IMAGE_FALLBACK, MOST_POPULAR_SLUG } from "@/lib/ui-data";

export default function TripCard({ trip }: { trip: TripPackage }) {
  const image = TRIP_IMAGES[trip.slug] ?? TRIP_IMAGE_FALLBACK;
  // pricingUnit may be unset in CMS — treat anything except explicit "per person" as per-boat
  const perPerson =
    trip.pricingUnit !== "per person"
      ? Math.round(trip.priceUsd / trip.maxGuestsIncluded)
      : null;

  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group flex flex-col rounded-2xl bg-white border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Image header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={`${trip.name} — Bali fishing charter from Serangan`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Booking type badge */}
        <span
          className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold ${
            trip.bookingType === "shared"
              ? "bg-gold-400 text-primary-950"
              : "bg-primary-950/85 text-white backdrop-blur"
          }`}
        >
          {trip.bookingType === "shared" ? "Shared" : "Private"}
        </span>
        {trip.slug === MOST_POPULAR_SLUG && (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-gold-600">
            ★ Most popular
          </span>
        )}
        {/* Glass price chip */}
        <span className="absolute bottom-3 left-3 rounded-full bg-primary-950/70 backdrop-blur px-3.5 py-1.5 text-sm font-semibold text-white tabular-nums">
          ${trip.priceUsd}
          <span className="font-normal text-white/75 text-xs ml-1">
            {trip.pricingUnit === "per person" ? "/ person" : "/ boat"}
          </span>
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 grow p-5">
        <h3 className="font-display text-xl text-primary-950 group-hover:text-primary-600 transition-colors">
          {trip.name}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{trip.description}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary-600" />
            {trip.durationHours}h
          </span>
          <span className="flex items-center gap-1.5">
            <Sunrise className="h-4 w-4 text-primary-600" />
            {trip.startTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary-600" />
            Up to {trip.maxGuestsIncluded}
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between gap-3">
          <div>
            <span className="font-display text-2xl font-semibold text-primary-950 tabular-nums">
              ${trip.priceUsd}
            </span>
            <span className="text-sm text-slate-500 ml-1">
              {trip.pricingUnit === "per person" ? "USD / person" : "USD"}
            </span>
            {perPerson && (
              <p className="text-xs text-slate-500 mt-0.5">≈ ${perPerson}/person at {trip.maxGuestsIncluded} guests</p>
            )}
            {trip.minGuests && trip.minGuests > 1 && (
              <p className="text-xs text-slate-400 mt-0.5">Min. {trip.minGuests} guests</p>
            )}
            {trip.extraGuestPriceUsd && (
              <p className="text-xs text-slate-400 mt-0.5">
                +${trip.extraGuestPriceUsd}/extra guest after {trip.maxGuestsIncluded}
              </p>
            )}
          </div>
          <span className="text-sm font-semibold text-primary-600 group-hover:text-primary-700 underline-offset-4 group-hover:underline whitespace-nowrap">
            Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
