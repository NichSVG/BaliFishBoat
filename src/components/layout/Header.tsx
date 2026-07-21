"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, Star } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

const navLinks = [
  { href: "/trips", label: "Trips" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/** Brand mark — minimal geometric fish + wave in a circle. */
function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#1a586c" />
      <path d="M7 15.5c3.2-3.8 8.8-3.8 12 0-3.2 3.8-8.8 3.8-12 0z" fill="#ffffff" />
      <path d="M19 15.5l5-3.2v6.4z" fill="#ffffff" />
      <circle cx="10.6" cy="14.6" r="0.9" fill="#1a586c" />
      <path
        d="M7 22c2-1.4 4-1.4 6 0s4 1.4 6 0 4-1.4 6 0"
        stroke="#7fd8de"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b transition-shadow duration-200 ${
          scrolled ? "border-slate-200 shadow-sm" : "border-slate-100"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-[72px] items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="Bali Fishing Trips home">
              <LogoMark />
              <span className="leading-tight">
                <span className="block font-display font-semibold text-[15px] sm:text-base tracking-tight text-primary-950">
                  Bali Fishing Trips
                </span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                  Serangan · Bali
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-sm font-medium transition-colors py-1 ${
                      active ? "text-primary-700" : "text-slate-600 hover:text-primary-700"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute -bottom-[5px] left-0 right-0 h-0.5 bg-gold-400 rounded-full" />
                    )}
                  </Link>
                );
              })}
              {WHATSAPP_LINK && (
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="whatsapp"
                  className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-white hover:bg-whatsapp-dark transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-6 w-6 text-slate-600" /> : <Menu className="h-6 w-6 text-slate-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white flex flex-col pt-24 px-8 pb-8 overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link, i) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-baseline gap-4 py-4 border-b border-slate-100 font-display text-3xl font-semibold tracking-tight transition-colors ${
                    active ? "text-primary-600" : "text-primary-950"
                  }`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="text-sm font-sans font-semibold text-gold-500 tabular-nums">
                    0{i + 1}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-10">
            <p className="flex items-center gap-2 text-sm text-slate-500 mb-5">
              <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
              4.4 · 126 verified reviews on FishingBooker
            </p>
            {WHATSAPP_LINK && (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                className="flex items-center justify-center gap-2 w-full rounded-full bg-whatsapp h-12 text-base font-semibold text-white shadow-cta mb-3"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
            )}
            <Link
              href="/contact"
              className="flex items-center justify-center w-full rounded-full border-2 border-primary-200 h-12 text-sm font-semibold text-primary-700"
            >
              Make an Inquiry
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
