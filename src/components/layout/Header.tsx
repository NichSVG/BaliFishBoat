import Link from "next/link";
import { Fish, Menu, X } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/trips", label: "Trips" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-900">
            <Fish className="h-7 w-7 text-blue-600" />
            <span>Bali Fishing Trips</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {WHATSAPP_LINK && (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
              >
                WhatsApp Us
              </a>
            )}
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <div className="md:hidden">
      <details className="group">
        <summary className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 cursor-pointer list-none">
          <Menu className="h-6 w-6 text-slate-600 group-open:hidden" />
          <X className="h-6 w-6 text-slate-600 hidden group-open:block" />
        </summary>
        <div className="absolute left-0 right-0 top-16 bg-white border-b border-slate-100 shadow-lg">
          <nav className="flex flex-col p-4 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-slate-700 hover:text-blue-600 py-2"
              >
                {link.label}
              </Link>
            ))}
            {WHATSAPP_LINK && (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 mt-2"
              >
                WhatsApp Us
              </a>
            )}
          </nav>
        </div>
      </details>
    </div>
  );
}
