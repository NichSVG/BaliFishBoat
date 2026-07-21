"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/ui-data";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function CountUp({ target, decimals = 0, suffix }: { target: number; decimals?: number; suffix: string }) {
  const { ref, inView } = useInView();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-4xl sm:text-5xl font-semibold text-primary-950 tabular-nums">
      {value.toFixed(decimals)}
      <span className="text-gold-500">{suffix}</span>
    </span>
  );
}

/** Count-up stats row (BLUEPRINT §11). All values from existing data. */
export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map((stat) => (
        <div key={stat.label} className="text-center">
          <CountUp target={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
          <p className="text-sm text-slate-500 mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
