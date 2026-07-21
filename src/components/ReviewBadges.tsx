import { Star, MessageCircle, Ship, Users, ThumbsUp, Fish } from "lucide-react";
import type { ReviewThemes } from "@/types/charter";

/** "What anglers say" — theme percentages as progress meters (BLUEPRINT §11). */
export default function ReviewBadges({ themes }: { themes: ReviewThemes }) {
  const badges = [
    { icon: MessageCircle, label: "Friendly Captain", pct: themes.friendlyCaptainPct },
    { icon: Ship, label: "Good Boat", pct: themes.goodBoatPct },
    { icon: ThumbsUp, label: "Recommended", pct: themes.recommendedPct },
    { icon: Users, label: "Family Friendly", pct: themes.familyFriendlyPct },
    { icon: Star, label: "Great Experience", pct: themes.greatExperiencePct },
    { icon: Fish, label: "Caught Fish", pct: themes.caughtFishPct },
  ];

  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-card p-6 lg:p-7">
      <h3 className="font-semibold text-primary-950 mb-5">What anglers say</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {badges.map(({ icon: Icon, label, pct }) => (
          <div key={label}>
            <div className="flex items-center gap-2 text-sm mb-1.5">
              <Icon className="h-4 w-4 text-primary-600" />
              <span className="text-slate-600 flex-1">{label}</span>
              <span className="font-semibold text-primary-950 tabular-nums">{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-primary-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
