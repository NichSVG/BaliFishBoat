"use client";

import { useState } from "react";
import { Fish, ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  { name: "January", short: "Jan", temp: "28-30°C", season: "Wet" as const },
  { name: "February", short: "Feb", temp: "28-30°C", season: "Wet" as const },
  { name: "March", short: "Mar", temp: "28-30°C", season: "Wet" as const },
  { name: "April", short: "Apr", temp: "27-29°C", season: "Transition" as const },
  { name: "May", short: "May", temp: "26-28°C", season: "Dry" as const },
  { name: "June", short: "Jun", temp: "25-27°C", season: "Dry" as const },
  { name: "July", short: "Jul", temp: "24-26°C", season: "Dry" as const },
  { name: "August", short: "Aug", temp: "24-26°C", season: "Dry" as const },
  { name: "September", short: "Sep", temp: "25-27°C", season: "Dry" as const },
  { name: "October", short: "Oct", temp: "26-28°C", season: "Transition" as const },
  { name: "November", short: "Nov", temp: "27-29°C", season: "Wet" as const },
  { name: "December", short: "Dec", temp: "28-30°C", season: "Wet" as const },
];

const SPECIES_BY_MONTH: Record<number, string[]> = {
  1: ["Mahi Mahi", "Skipjack Tuna", "Mackerel", "Snapper"],
  2: ["Mahi Mahi", "Skipjack Tuna", "Mackerel", "Snapper"],
  3: ["Mahi Mahi", "Skipjack Tuna", "Red Snapper", "Grouper"],
  4: ["Yellowfin Tuna", "Mahi Mahi", "Red Snapper", "Grouper"],
  5: ["Yellowfin Tuna", "Mahi Mahi", "GT", "Red Snapper"],
  6: ["Yellowfin Tuna", "GT", "Mahi Mahi", "Sailfish"],
  7: ["Yellowfin Tuna", "GT", "Mahi Mahi", "Sailfish", "Marlin"],
  8: ["Yellowfin Tuna", "GT", "Mahi Mahi", "Sailfish", "Marlin"],
  9: ["Yellowfin Tuna", "GT", "Mahi Mahi", "Sailfish"],
  10: ["Yellowfin Tuna", "Mahi Mahi", "GT", "Red Snapper"],
  11: ["Mahi Mahi", "Skipjack Tuna", "Red Snapper", "Grouper"],
  12: ["Mahi Mahi", "Skipjack Tuna", "Mackerel", "Snapper"],
};

const TECHNIQUES_BY_MONTH: Record<number, string[]> = {
  1: ["Trolling", "Bottom Fishing", "Casting"],
  2: ["Trolling", "Bottom Fishing", "Casting"],
  3: ["Trolling", "Bottom Fishing", "Jigging"],
  4: ["Trolling", "Jigging", "Popping"],
  5: ["Trolling", "Jigging", "Popping", "Casting"],
  6: ["Trolling", "Jigging", "Popping", "Casting"],
  7: ["Trolling", "Jigging", "Popping", "Casting"],
  8: ["Trolling", "Jigging", "Popping", "Casting"],
  9: ["Trolling", "Jigging", "Popping", "Casting"],
  10: ["Trolling", "Jigging", "Popping"],
  11: ["Trolling", "Bottom Fishing", "Jigging"],
  12: ["Trolling", "Bottom Fishing", "Casting"],
};

const SEASON_COLORS = {
  Dry: "bg-seafoam-100 text-primary-800 border-primary-200",
  Wet: "bg-blue-50 text-blue-800 border-blue-200",
  Transition: "bg-amber-50 text-amber-800 border-amber-200",
};

export default function SeasonCalendar() {
  const currentMonth = new Date().getMonth() + 1;
  const [selected, setSelected] = useState(currentMonth);
  const month = MONTHS[selected - 1];
  const species = SPECIES_BY_MONTH[selected] || [];
  const techniques = TECHNIQUES_BY_MONTH[selected] || [];

  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-card p-6 lg:p-8">
      {/* Month selector */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setSelected(selected === 1 ? 12 : selected - 1)}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div className="text-center">
          <h3 className="font-display text-2xl text-primary-950">{month.name}</h3>
          <span className={`inline-block mt-1 rounded-full px-3 py-0.5 text-xs font-semibold border ${SEASON_COLORS[month.season]}`}>
            {month.season} Season
          </span>
        </div>
        <button
          onClick={() => setSelected(selected === 12 ? 1 : selected + 1)}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5 text-slate-600" />
        </button>
      </div>

      {/* Month pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-6 [scrollbar-width:none]">
        {MONTHS.map((m, i) => (
          <button
            key={m.short}
            onClick={() => setSelected(i + 1)}
            className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              selected === i + 1
                ? "bg-primary-950 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {m.short}
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-slate-500 mb-2 font-medium">Water Temp</p>
          <p className="text-sm font-semibold text-primary-950">{month.temp}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-2 font-medium">Species Biting</p>
          <div className="flex flex-wrap gap-1">
            {species.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 rounded-full bg-primary-50 border border-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800">
                <Fish className="h-3 w-3" />
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-2 font-medium">Best Techniques</p>
          <div className="flex flex-wrap gap-1">
            {techniques.map((t) => (
              <span key={t} className="inline-block rounded-full bg-seafoam-100 border border-primary-200 px-2 py-0.5 text-xs font-medium text-primary-800">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
