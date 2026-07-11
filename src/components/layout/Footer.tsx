import Link from "next/link";
import { Fish, Anchor, Clock, MapPin } from "lucide-react";
import { WHATSAPP_LINK, SITE_NAME } from "@/lib/constants";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/trips", label: "Trip Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <Fish className="h-6 w-6 text-blue-400" />
              <span>{SITE_NAME}</span>
            </div>
            <p className="text-sm text-slate-400">
              Private fishing charters out of Serangan, Bali. Target Mahi Mahi, Yellowfin Tuna, and more with
              experienced local crew.
            </p>
            <div className="mt-4 space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                Serangan Harbor, Denpasar, Bali
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-400" />
                Trips daily from 07:00
              </p>
              <p className="flex items-center gap-2">
                <Anchor className="h-4 w-4 text-blue-400" />
                36ft yacht, up to 8 guests
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Book Now</h3>
            <p className="text-sm text-slate-400 mb-3">
              Ready to fish? Send us a message or fill out the inquiry form.
            </p>
            {WHATSAPP_LINK && (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
              >
                WhatsApp Us
              </a>
            )}
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Make an Inquiry
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}