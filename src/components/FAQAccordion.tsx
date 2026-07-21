"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items?: FAQItem[];
  defaultOpen?: number | null;
}

/** Animated accordion — first item open by default, CSS grid-rows height animation (BLUEPRINT §15.9). */
export default function FAQAccordion({ items = FAQS, defaultOpen = 0 }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-100 bg-white shadow-card overflow-hidden">
      {items.map((faq, i) => {
        const open = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
            >
              <span className="text-base font-semibold text-primary-950">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                  open ? "rotate-180 text-gold-500" : "text-slate-400"
                }`}
              />
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              className={`grid transition-all duration-300 ease-out-expo ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-[15px] text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
