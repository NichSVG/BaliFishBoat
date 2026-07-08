import Link from "next/link";
import { Fish } from "lucide-react";
import { WHATSAPP_LINK, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <Fish className="h-6 w-6 text-blue-400" />
              <span>{SITE_NAME}</span>
            </div>
            <p className="text-sm text-slate-400">
              Private fishing charters out of Serangan, Bali. Target Mahi Mahi, Yellowfin Tuna, and more with
              experienced local crew.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/trips" className="hover:text-white transition-colors">Trip Packages</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
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
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
