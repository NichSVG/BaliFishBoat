"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll back to top"
      className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-blue-900 text-white shadow-lg hover:bg-blue-800 hover:scale-110 transition-all"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}