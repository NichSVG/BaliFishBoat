import { Star, BadgeCheck } from "lucide-react";
import type { Testimonial } from "@/types/charter";
import { COUNTRY_FLAGS } from "@/lib/ui-data";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {testimonials.map((t, i) => (
        <blockquote
          key={i}
          className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className={`h-4 w-4 ${j < t.rating ? "fill-gold-400 text-gold-400" : "text-slate-200"}`}
                />
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-600">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified review
            </span>
          </div>

          <p className="text-[15px] text-slate-700 leading-relaxed mb-5 line-clamp-6">
            &ldquo;{t.quote}&rdquo;
          </p>

          <footer className="mt-auto flex items-center gap-3 pt-4 border-t border-slate-100">
            <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-primary-100 text-primary-700 text-sm font-bold">
              {initials(t.name)}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-primary-950 truncate">
                {t.name}
                {t.country && (
                  <span className="font-normal text-slate-500">
                    {" "}
                    {COUNTRY_FLAGS[t.country] ?? ""} {t.country}
                  </span>
                )}
              </p>
              {t.tripType && (
                <span className="inline-block mt-1 rounded-full bg-seafoam-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                  {t.tripType}
                </span>
              )}
            </div>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
