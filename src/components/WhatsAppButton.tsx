"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

export default function WhatsAppButton() {
  if (!WHATSAPP_LINK) return null;

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-white font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition-all"
      style={{
        bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
        right: "calc(1.5rem + env(safe-area-inset-right, 0px))",
      }}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}