import Link from "next/link";
import type { TripPackage } from "@/types/charter";
import { MOST_POPULAR_SLUG } from "@/lib/ui-data";

/** "Compare all trips" table (BLUEPRINT §7.4) — rows link to trip detail. */
export default function TripCompareTable({ trips }: { trips: TripPackage[] }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left">
              <th className="px-5 py-4 font-semibold text-primary-950 sticky left-0 bg-white">Trip</th>
              <th className="px-4 py-4 font-semibold text-slate-500">Type</th>
              <th className="px-4 py-4 font-semibold text-slate-500">Hours</th>
              <th className="px-4 py-4 font-semibold text-slate-500">Departs</th>
              <th className="px-4 py-4 font-semibold text-slate-500">Guests incl.</th>
              <th className="px-4 py-4 font-semibold text-slate-500 text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {trips.map((trip) => {
              const popular = trip.slug === MOST_POPULAR_SLUG;
              // pricingUnit may be unset in CMS — treat anything except explicit "per person" as per-boat
              const perPerson =
                trip.pricingUnit !== "per person"
                  ? Math.round(trip.priceUsd / trip.maxGuestsIncluded)
                  : null;
              return (
                <tr
                  key={trip.slug}
                  className={`group relative transition-colors hover:bg-seafoam-50 ${
                    popular ? "bg-seafoam-50" : ""
                  }`}
                >
                  <td
                    className={`px-5 py-4 sticky left-0 transition-colors group-hover:bg-seafoam-50 ${
                      popular ? "bg-seafoam-50" : "bg-white"
                    }`}
                  >
                    <Link
                      href={`/trips/${trip.slug}`}
                      className="font-semibold text-primary-950 hover:text-primary-600 after:absolute after:inset-0 after:content-['']"
                    >
                      {trip.name}
                    </Link>
                    {popular && (
                      <span className="ml-2 inline-block rounded-full bg-gold-400 px-2 py-0.5 text-[10px] font-bold text-primary-950 uppercase tracking-wide align-middle">
                        Most popular
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        trip.bookingType === "shared"
                          ? "bg-gold-400/20 text-gold-600"
                          : "bg-primary-50 text-primary-700"
                      }`}
                    >
                      {trip.bookingType === "shared" ? "Shared" : "Private"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-600 tabular-nums">{trip.durationHours}h</td>
                  <td className="px-4 py-4 text-slate-600 tabular-nums">{trip.startTime}</td>
                  <td className="px-4 py-4 text-slate-600 tabular-nums">{trip.maxGuestsIncluded}</td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-semibold text-primary-950 tabular-nums">${trip.priceUsd}</span>
                    <span className="block text-xs text-slate-500">
                      {trip.pricingUnit === "per person"
                        ? "per person"
                        : perPerson
                          ? `≈ $${perPerson}/person`
                          : "per boat"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="px-5 py-3 text-xs text-slate-400 border-t border-slate-100">
        Private charters include up to 4 guests — additional guests $50 each (max 8). All trips are all-inclusive.
      </p>
    </div>
  );
}
