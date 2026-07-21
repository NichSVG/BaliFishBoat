import Image from "next/image";
import { CREW, SHOW_CREW } from "@/lib/ui-data";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

/** Meet the Crew (BLUEPRINT §2.6) — names sourced from public guest reviews. */
export default function CrewSection() {
  if (!SHOW_CREW) return null;

  return (
    <div>
      <SectionHeader
        eyebrow="The Crew"
        title="Local Captains Who Know Where the Fish Are"
        support="The crew guests mention by name in their reviews — 96% rate the captain as friendly."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CREW.map((member, i) => (
          <Reveal key={member.name} delay={i * 80}>
            <div className="rounded-2xl bg-white border border-slate-100 shadow-card overflow-hidden">
              <div className="relative aspect-[4/5] bg-slate-100">
                <Image
                  src={member.photo}
                  alt={`${member.name} — ${member.role} at Bali Fishing Trips`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg text-primary-950">{member.name}</h3>
                <p className="text-sm font-medium text-primary-600 mt-0.5">{member.role}</p>
                <p className="text-sm text-slate-600 leading-relaxed mt-2">{member.note}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
