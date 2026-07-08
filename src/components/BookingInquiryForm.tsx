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
      <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
        <Check className="h-10 w-10 text-green-600 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Inquiry Sent!</h3>
        <p className="text-green-700">
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
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
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
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
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
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
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
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          >
            <option value="">Select a trip</option>
            {trips.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name} — ${t.priceUsd}
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
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
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
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
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
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
        />
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full bg-green-600 px-8 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors disabled:opacity-50"
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
