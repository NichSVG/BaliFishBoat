"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2, Check } from "lucide-react";
import { inquirySchema, type InquiryInput } from "@/lib/validations";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { TripPackage } from "@/types/charter";

const packageNames: Record<string, string> = {
  "sharing-trip": "Sharing Trip",
  "sunset-trip": "Sunset Trip",
  "half-day-private": "Half Day Trip – Private",
  "three-quarter-day": "3/4 Day Trip",
  "jigging-casting-6hr": "6 Hours Jigging and Casting",
  "full-day": "Full Day Trip",
  "full-day-jigging-popping": "Full Day Trip – Jigging and Popping",
};

export default function BookingInquiryForm({ trips }: { trips: TripPackage[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
  });

  async function onSubmit(data: InquiryInput) {
    setStatus("sending");
    const packageName = packageNames[data.packageSlug] || data.packageSlug;

    // Build WhatsApp message
    const whatsappMessage = `🎣 *NEW BOOKING INQUIRY*
====================

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone || "Not provided"}

🗺️ *Package:* ${packageName}
📅 *Date:* ${data.preferredDate}
👥 *Guests:* ${data.partySize}

💬 *Message:* ${data.message || "None"}

---
Reply to this message to confirm the booking.`;

    // Open WhatsApp
    const encoded = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");

    // Send email in background
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // Email failed silently — WhatsApp already opened
    }

    setStatus("success");
    reset();
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-seafoam-50 border border-primary-200 p-8 text-center">
        <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-white shadow-card mb-4">
          <Check className="h-8 w-8 text-primary-600" />
        </span>
        <h3 className="font-display text-2xl text-primary-950 mb-2">Inquiry Sent!</h3>
        <p className="text-slate-600 max-w-md mx-auto">
          WhatsApp opened with your details. We&apos;ve also sent you an email confirmation.
          We&apos;ll get back to you shortly!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Name *
          </label>
          <input
            id="name"
            {...register("name")}
            className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-[15px] focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-[15px] focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
          Phone / WhatsApp
        </label>
        <input
          id="phone"
          {...register("phone")}
          className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-[15px] focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label htmlFor="packageSlug" className="block text-sm font-medium text-slate-700 mb-1">
            Package *
          </label>
          <select
            id="packageSlug"
            {...register("packageSlug")}
            className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-[15px] focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
          >
            <option value="">Select a trip</option>
            {trips.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name} — ${t.priceUsd} {t.pricingUnit === "per person" ? "/person" : ""}{t.extraGuestPriceUsd ? ` (+$${t.extraGuestPriceUsd}/extra)` : ""}
              </option>
            ))}
          </select>
          {errors.packageSlug && (
            <p className="text-red-600 text-xs mt-1">{errors.packageSlug.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium text-slate-700 mb-1">
            Preferred Date *
          </label>
          <input
            id="preferredDate"
            type="date"
            {...register("preferredDate")}
            className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-[15px] focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
          />
          {errors.preferredDate && (
            <p className="text-red-600 text-xs mt-1">{errors.preferredDate.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="partySize" className="block text-sm font-medium text-slate-700 mb-1">
            Guests *
          </label>
          <input
            id="partySize"
            type="number"
            min={1}
            max={8}
            {...register("partySize")}
            className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-[15px] focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
          />
          {errors.partySize && (
            <p className="text-red-600 text-xs mt-1">{errors.partySize.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition resize-none"
        />
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-whatsapp h-12 px-8 text-base font-semibold text-white shadow-cta hover:bg-whatsapp-dark active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Inquiry via WhatsApp & Email
          </>
        )}
      </button>
    </form>
  );
}
