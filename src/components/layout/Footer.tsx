import Link from "next/link";
import { MessageCircle, Clock, MapPin, Star, Fish } from "lucide-react";
import { WHATSAPP_LINK, SITE_NAME } from "@/lib/constants";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/trips", label: "Trip Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const tripLinks = [
  { href: "/trips/sharing-trip", label: "Sharing Trip — $200/person" },
  { href: "/trips/half-day-private", label: "Half Day Private — $550" },
  { href: "/trips/full-day", label: "Full Day Trip — $750" },
  { href: "/trips/full-day-jigging-popping", label: "Full Day Jigging & Popping — $800" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="font-display font-semibold text-xl text-white mb-3">{SITE_NAME}</div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Private fishing charters out of Serangan, Bali. Target Mahi Mahi, Yellowfin Tuna, and more with
              experienced local crew.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-xs text-slate-300">
              <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
              4.4 · 126 reviews on FishingBooker
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-lagoon-400" />
                Serangan Harbor, Denpasar, Bali
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-lagoon-400" />
                Trips daily from 07:00
              </p>
              <p className="flex items-center gap-2">
                <Fish className="h-4 w-4 text-lagoon-400" />
                36ft yacht, up to 8 guests
              </p>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular trips */}
          <div>
            <h3 className="font-semibold text-white mb-4">Popular Trips</h3>
            <ul className="space-y-2.5 text-sm">
              {tripLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/trips" className="text-lagoon-300 hover:text-lagoon-400 font-medium transition-colors">
                  All 7 packages →
                </Link>
              </li>
            </ul>
          </div>

          {/* Book */}
          <div>
            <h3 className="font-semibold text-white mb-4">Book Now</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Ready to fish? Message us on WhatsApp for the fastest reply, or send an inquiry.
            </p>
            {WHATSAPP_LINK && (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white hover:bg-whatsapp-dark transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            )}
            <div className="mt-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Make an Inquiry
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">Free cancellation up to 30 days before your trip.</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p>Departures from Serangan Harbor, Bali</p>
        </div>
      </div>
    </footer>
  );
}
