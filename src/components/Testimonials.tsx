import { Star } from "lucide-react";
import type { Testimonial } from "@/types/charter";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((t, i) => (
        <blockquote
          key={i}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
        >
          <div className="flex gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, j) => (
              <Star
                key={j}
                className={`h-4 w-4 ${j < t.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
              />
            ))}
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
          <footer className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{t.name}</span>
            {t.country && <span> &middot; {t.country}</span>}
            {t.tripType && <span> &middot; {t.tripType}</span>}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
