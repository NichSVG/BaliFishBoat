import type { Metadata } from "next";
import BookingInquiryForm from "@/components/BookingInquiryForm";
import LocationMap from "@/components/LocationMap";
import { WHATSAPP_LINK } from "@/lib/constants";
import { getTripPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact & Book",
  description:
    "Book your Bali fishing charter. Send an inquiry or reach us on WhatsApp.",
};

export default async function ContactPage() {
  const trips = await getTripPackages();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Book Your Trip</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Fill out the form below and we&apos;ll get back to you with availability.
          You can also reach us directly on WhatsApp for faster response.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Inquiry Form</h2>
            <BookingInquiryForm trips={trips} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 mb-3">Quick Contact</h3>
            <p className="text-sm text-slate-600 mb-4">
              Prefer to chat? Message us on WhatsApp for the fastest response.
            </p>
            {WHATSAPP_LINK && (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
              >
                Chat on WhatsApp
              </a>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 mb-3">Departure Point</h3>
            <p className="text-sm text-slate-600 mb-2">
              Serangan Harbor, Denpasar, Bali
            </p>
            <p className="text-xs text-slate-500">
              Hotel/villa pickup included in all trips
            </p>
          </div>

          <LocationMap />
        </div>
      </div>
    </div>
  );
}
