"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What's included in every trip?",
    answer:
      "All trips include a fishing license, hotel/villa pickup, drinks and snacks, and you keep your catch. Longer trips also include a meal.",
  },
  {
    question: "How many people can the boat hold?",
    answer: "The boat has a capacity of 8 persons. Our private trips include up to 4 guests in the base price; additional guests can be added.",
  },
  {
    question: "What fish can we catch?",
    answer:
      "Common catches include Mahi Mahi, Yellowfin Tuna, Skipjack Tuna, Red Snapper, Grouper, and Mackerel. What's biting depends on the season and technique.",
  },
  {
    question: "What's your cancellation policy?",
    answer: "Free cancellation up to 30 days before the trip. Contact us for details on shorter notice.",
  },
  {
    question: "Do you offer shared trips?",
    answer: "Yes! Our Sharing Trip is a 4-hour shared boat experience at $400 for up to 2 guests.",
  },
  {
    question: "Where do we depart from?",
    answer: "We depart from Serangan Harbor in Denpasar, Bali. We offer pickup from your hotel or villa.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-4 text-left"
          >
            <span className="text-sm font-semibold text-slate-900">{faq.question}</span>
            <ChevronDown
              className={`h-5 w-5 text-slate-400 transition-transform ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <div className="px-6 pb-4">
              <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
