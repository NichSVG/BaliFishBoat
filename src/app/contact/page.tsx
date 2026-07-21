import type { Metadata } from "next";
import { MessageCircle, Star, ShieldCheck, MapPin, Fish } from "lucide-react";
import BookingInquiryForm from "@/components/BookingInquiryForm";
import LocationMap from "@/components/LocationMap";
import { WHATSAPP_LINK, SITE_URL } from "@/lib/constants";
import { getTripPackages, getCharter } from "@/lib/data";

export const metadata: Metadata = {
  title: "Book a Bali Fishing Charter — Contact",
  description:
    "Ready to fish? Send an inquiry or reach us on WhatsApp to book your Bali fishing charter from Serangan.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Book a Bali Fishing Charter — Contact",
    description:
      "Ready to fish? Send an inquiry or reach us on WhatsApp to book your Bali fishing charter.",
    url: `${SITE_URL}/contact`,
  },
};

export default async function ContactPage() {
  const [trips, charter] = await Promise.all([getTripPackages(), getCharter()]);
  const overall = charter?.ratingSnapshot?.overall ?? 4.4;
  const reviewCount = charter?.ratingSnapshot?.reviewCount ?? 126;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="mb-10 lg:mb-14 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-600 mb-3">Contact</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-primary-950 mb-4">
          Book a Bali Fishing Charter
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-5">
          Fill out the form and we&apos;ll get back to you with availability — or message us
          directly on WhatsApp for the fastest reply.
        </p>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
            <strong className="font-semibold text-primary-950">{overall}</strong> · {reviewCount} verified reviews
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary-600" />
            Free cancellation up to 30 days
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Form */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 sm:p-8">
            <h2 className="font-display text-2xl text-primary-950 mb-6">Inquiry Form</h2>
            <BookingInquiryForm trips={trips} />
            <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary-600" />
                Free cancellation up to 30 days
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Fish className="h-3.5 w-3.5 text-primary-600" />
                You keep your catch
              </span>
            </p>
          </div>
        </div>

        {/* Right rail */}
        <div className="space-y-6 order-1 lg:order-2">
          {/* Fastest: WhatsApp */}
          <div className="rounded-2xl bg-primary-950 text-white p-6">
            <h3 className="font-display text-xl mb-2">Fastest: WhatsApp</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              Prefer to chat? We usually reply within the hour during daytime.
            </p>
            {WHATSAPP_LINK && (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                className="flex items-center justify-center gap-2 w-full rounded-full bg-whatsapp px-5 py-3.5 text-base font-semibold text-white shadow-cta hover:bg-whatsapp-dark transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            )}
          </div>

          {/* What happens next */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
            <h3 className="font-semibold text-primary-950 mb-4">What happens next</h3>
            <ol className="space-y-3.5">
              {[
                "You message us your date, group size and trip.",
                "We confirm availability & pickup — in writing.",
                "Show up and fish. You keep the catch.",
              ].map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-gold-400 text-primary-950 text-xs font-bold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Departure */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center h-10 w-10 rounded-full bg-seafoam-100">
                <MapPin className="h-5 w-5 text-primary-700" />
              </span>
              <h3 className="font-semibold text-primary-950">Departure Point</h3>
            </div>
            <p className="text-sm text-slate-600 mb-1">Serangan Harbor, Denpasar, Bali</p>
            <p className="text-xs text-slate-500">Hotel/villa pickup included in all trips</p>
          </div>

          <LocationMap />
        </div>
      </div>
    </div>
  );
}
