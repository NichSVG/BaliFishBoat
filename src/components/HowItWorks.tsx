import { MessageCircle, CalendarCheck, Fish } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

const steps = [
  {
    icon: MessageCircle,
    title: "Message us on WhatsApp",
    desc: "Tell us your date, group size and the trip you have in mind.",
  },
  {
    icon: CalendarCheck,
    title: "We confirm everything",
    desc: "Availability, pickup time and place — fast reply, everything in writing.",
  },
  {
    icon: Fish,
    title: "Show up and fish",
    desc: "Hotel pickup, all gear, bait and license included. You keep the catch.",
  },
];

/** How booking works — removes WhatsApp anxiety (BLUEPRINT §2.9). */
export default function HowItWorks() {
  return (
    <div>
      <SectionHeader
        eyebrow="Booking"
        title="Booked in Three Messages"
        support="No account, no forms to chase — everything happens in one WhatsApp chat."
        align="center"
      />
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* connector line (desktop) */}
        <div className="hidden md:block absolute top-9 left-[18%] right-[18%] border-t-2 border-dashed border-primary-200" aria-hidden="true" />
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 120}>
            <div className="relative rounded-2xl bg-white border border-slate-100 shadow-card p-6 text-center h-full">
              <div className="relative inline-flex items-center justify-center h-[4.5rem] w-[4.5rem] rounded-full bg-seafoam-100 mb-4">
                <step.icon className="h-7 w-7 text-primary-700" />
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-6 w-6 rounded-full bg-gold-400 text-primary-950 text-xs font-bold">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-semibold text-primary-950 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="text-center text-sm text-slate-500 mt-8">
        No account needed. Free cancellation up to 30 days before your trip.
      </p>
    </div>
  );
}
