import { Star, MessageCircle, Ship, Users, ThumbsUp, Fish } from "lucide-react";
import type { ReviewThemes } from "@/types/charter";

export default function ReviewBadges({ themes }: { themes: ReviewThemes }) {
  const badges = [
    { icon: MessageCircle, label: "Friendly Captain", pct: themes.friendlyCaptainPct },
    { icon: Ship, label: "Good Boat", pct: themes.goodBoatPct },
    { icon: Users, label: "Family Friendly", pct: themes.familyFriendlyPct },
    { icon: Star, label: "Great Experience", pct: themes.greatExperiencePct },
    { icon: ThumbsUp, label: "Recommended", pct: themes.recommendedPct },
    { icon: Fish, label: "Caught Fish", pct: themes.caughtFishPct },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {badges.map(({ icon: Icon, label, pct }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2 rounded-xl bg-white p-4 border border-slate-100 shadow-sm"
        >
          <Icon className="h-6 w-6 text-blue-600" />
          <span className="text-2xl font-bold text-slate-900">{pct}%</span>
          <span className="text-xs text-slate-500 text-center">{label}</span>
        </div>
      ))}
    </div>
  );
}
