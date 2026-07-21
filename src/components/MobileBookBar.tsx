"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { TRIP_BAR_INFO } from "@/lib/ui-data";

/**
 * Sticky mobile booking bar (BLUEPRINT §3.3) — the persistent mobile booking path.
 * Shows trip price/duration on trip detail pages; otherwise a "from $200" trips link.
 * Replaces the floating WhatsApp button on mobile (float is hidden below md).
 */
export default function MobileBookBar() {
  const pathname = usePathname();

  const tripMatch = pathname.match(/^\/trips\/([^/]+)\/?$/);
  const tripInfo = tripMatch ? TRIP_BAR_INFO[tripMatch[1]] : undefined;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur border-t border-slate-200 shadow-bar px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-3">
      {tripInfo ? (
        <div className="flex-shrink-0 leading-tight">
          <p className="font-display text-lg font-semibold text-primary-950 tabular-nums">
            ${tripInfo.price}
          </p>
          <p className="text-xs text-slate-500">{tripInfo.hours}h trip</p>
        </div>
      ) : (
        <Link
          href="/trips"
          className="flex-shrink-0 inline-flex items-center rounded-full border-2 border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700"
        >
          Trips from $200
        </Link>
      )}
      {WHATSAPP_LINK && (
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="whatsapp"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp h-12 px-5 text-base font-semibold text-white shadow-cta active:scale-[0.98] transition-all"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </a>
      )}
    </div>
  );
}
