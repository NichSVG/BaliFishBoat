interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  support?: string;
  align?: "left" | "center";
}

export default function SectionHeader({ eyebrow, title, support, align = "left" }: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div className={`mb-10 lg:mb-14 ${centered ? "text-center" : "text-left"}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-600 mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-primary-950">
        {title}
      </h2>
      {support && (
        <p className={`mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl ${centered ? "mx-auto" : ""}`}>
          {support}
        </p>
      )}
    </div>
  );
}
