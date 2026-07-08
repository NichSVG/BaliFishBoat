import TripCard from "./TripCard";
import type { TripPackage } from "@/types/charter";

export default function TripPackageList({ trips }: { trips: TripPackage[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map((trip) => (
        <TripCard key={trip.slug} trip={trip} />
      ))}
    </div>
  );
}
