import { Star, ShieldCheck, Fish, Car } from "lucide-react";

interface TrustBarProps {
  overallRating: number;
  reviewCount: number;
}

/**
 * Floating assurance card overlapping the hero bottom (BLUEPRINT §2.2).
 * All claims traceable to existing data.
 */
export default function TrustBar({ overallRating, reviewCount }: TrustBarProps) {
  const items = [
    {
      icon: Star,
      value: `${overallRating} / 5`,
      label: `${reviewCount} verified reviews`,
      gold: true,
    },
    { icon: ShieldCheck, value: "Free cancellation", label: "up to 30 days before", gold: false },
    { icon: Fish, value: "You keep your catch", label: "on every trip", gold: false },
    { icon: Car, value: "Hotel pickup", label: "& villa pickup included", gold: false },
  ];

  return (
    <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5 rounded-2xl bg-white border border-slate-100 shadow-card px-6 py-6 sm:px-8">
        {items.map(({ icon: Icon, value, label, gold }) => (
          <div key={value} className="flex items-center gap-3">
            <span
              className={`flex-shrink-0 flex items-center justify-center h-11 w-11 rounded-full ${
                gold ? "bg-gold-300/30 text-gold-600" : "bg-seafoam-100 text-primary-700"
              }`}
            >
              <Icon className={`h-5 w-5 ${gold ? "fill-gold-500 text-gold-500" : ""}`} />
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-primary-950 leading-tight">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-tight">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
