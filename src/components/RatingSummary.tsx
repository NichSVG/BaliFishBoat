import { Star, ExternalLink } from "lucide-react";
import { RATING_DISTRIBUTION, RATING_SUBSCORES, FISHINGBOOKER_URL } from "@/lib/ui-data";

interface RatingSummaryProps {
  overall: number;
  reviewCount: number;
}

/** Big rating panel: score, distribution bars, sub-scores, source attribution (BLUEPRINT §11). */
export default function RatingSummary({ overall, reviewCount }: RatingSummaryProps) {
  const maxCount = Math.max(...RATING_DISTRIBUTION.map((d) => d.count));

  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-card p-6 lg:p-7 h-full">
      <div className="flex items-end gap-3 mb-1">
        <span className="font-display text-6xl font-semibold text-primary-950 tabular-nums leading-none">
          {overall}
        </span>
        <div className="pb-1">
          <div className="flex gap-0.5 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(overall) ? "fill-gold-400 text-gold-400" : "text-slate-200"}`}
              />
            ))}
          </div>
          <p className="text-sm text-slate-500">{reviewCount} verified reviews</p>
        </div>
      </div>

      <a
        href={FISHINGBOOKER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline mb-6"
      >
        Reviewed on FishingBooker
        <ExternalLink className="h-3 w-3" />
      </a>

      {/* Distribution bars */}
      <div className="space-y-2 mb-6">
        {RATING_DISTRIBUTION.map(({ stars, count }) => (
          <div key={stars} className="flex items-center gap-3 text-sm">
            <span className="w-6 text-slate-500 tabular-nums">{stars}★</span>
            <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gold-400"
                style={{ width: `${Math.max((count / maxCount) * 100, 2)}%` }}
              />
            </div>
            <span className="w-7 text-right text-slate-500 tabular-nums">{count}</span>
          </div>
        ))}
      </div>

      {/* Sub-scores */}
      <div className="space-y-3 pt-5 border-t border-slate-100">
        {RATING_SUBSCORES.map((sub) => (
          <div key={sub.label}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-slate-600">{sub.label}</span>
              <span className="font-semibold text-primary-950 tabular-nums">{sub.score}</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary-500"
                style={{ width: `${(sub.score / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
