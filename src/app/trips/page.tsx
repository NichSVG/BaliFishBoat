import type { Metadata } from "next";
import TripPackageList from "@/components/TripPackageList";
import { getTripPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Trip Packages",
  description:
    "Browse our fishing charter packages — from 3-hour sunset trips to full-day jigging adventures, all departing from Serangan, Bali.",
};

export default async function TripsPage() {
  const trips = await getTripPackages();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Trip Packages</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          All trips depart from Serangan Harbor, Denpasar. Prices are per boat, not per person.
          Choose private or shared depending on your group.
        </p>
      </div>
      <TripPackageList trips={trips} />
    </section>
  );
}
