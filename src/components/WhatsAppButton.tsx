"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

/**
 * Floating WhatsApp button — desktop only.
 * On mobile the sticky MobileBookBar takes over (BLUEPRINT §3.3/§3.5).
 */
export default function WhatsAppButton() {
  if (!WHATSAPP_LINK) return null;

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-cta="whatsapp"
      className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-white font-semibold shadow-cta animate-pulse-soft hover:bg-whatsapp-dark hover:scale-105 transition-all"
      style={{
        bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
        right: "calc(1.5rem + env(safe-area-inset-right, 0px))",
      }}
    >
      <MessageCircle className="h-5 w-5" />
      <span>WhatsApp</span>
    </a>
  );
}
