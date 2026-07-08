import Link from "next/link";
import { Anchor, Clock, Users, DollarSign } from "lucide-react";
import type { TripPackage } from "@/types/charter";

export default function TripCard({ trip }: { trip: TripPackage }) {
  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {trip.name}
        </h3>
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
            trip.bookingType === "shared"
              ? "bg-amber-100 text-amber-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {trip.bookingType === "shared" ? "Shared" : "Private"}
        </span>
      </div>

      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{trip.description}</p>

      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {trip.durationHours}h
        </span>
        <span className="flex items-center gap-1.5">
          <Anchor className="h-4 w-4" />
          {trip.startTime}
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          Up to {trip.maxGuestsIncluded}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-end justify-between">
        <div>
          <span className="text-2xl font-bold text-blue-900">${trip.priceUsd}</span>
          <span className="text-sm text-slate-500 ml-1">USD</span>
        </div>
        <span className="text-sm font-medium text-blue-600 group-hover:underline">
          View details &rarr;
        </span>
      </div>
    </Link>
  );
}
