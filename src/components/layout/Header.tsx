"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b transition-shadow duration-200 ${
        scrolled ? "border-slate-200 shadow-sm" : "border-slate-100"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-blue-900 flex-shrink-0"
            aria-label="Bali Fishing Trips home"
          >
            <Fish className="h-7 w-7 text-blue-600 flex-shrink-0" />
            <span className="hidden sm:inline">Bali Fishing Trips</span>
            <span className="sm:hidden text-lg">BFT</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    active
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </Link>
              );
            })}
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

      {/* Mobile menu — slide-down */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-4 pt-2 pb-6 gap-1 bg-white border-t border-slate-100 shadow-lg">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium py-3 px-3 rounded-lg transition-colors ${
                  active
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
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

      {/* Mobile menu backdrop */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-black/30 z-[-1]"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}