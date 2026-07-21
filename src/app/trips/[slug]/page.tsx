import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock, Sunrise, Users, Banknote, Check, Star, ShieldCheck, MessageCircle,
  Car, Fish, ChevronRight,
} from "lucide-react";
import { getTripPackageBySlug, getTripPackages, getCharter } from "@/lib/data";
import { INCLUSIONS, SITE_URL, WHATSAPP_LINK, TARGET_SPECIES, TECHNIQUES } from "@/lib/constants";
import { TRIP_IMAGES, TRIP_IMAGE_FALLBACK } from "@/lib/ui-data";
import SchemaMarkup from "@/components/SchemaMarkup";
import FAQAccordion from "@/components/FAQAccordion";
import TripCard from "@/components/TripCard";
import Reveal from "@/components/Reveal";
import { generateTripProductSchema, generateBreadcrumbSchema } from "@/lib/structured-data";
import type { TripPackage } from "@/types/charter";

export async function generateStaticParams() {
  const trips = await getTripPackages();
  return trips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = await getTripPackageBySlug(slug);
  if (!trip) return {};
  const image = TRIP_IMAGES[slug] ?? TRIP_IMAGE_FALLBACK;
  return {
    title: `${trip.name} — Private Charter from Serangan`,
    description: trip.description.slice(0, 155),
    alternates: { canonical: `/trips/${slug}` },
    openGraph: {
      title: `${trip.name} — Bali Fishing Charter`,
      description: trip.description.slice(0, 155),
      url: `${SITE_URL}/trips/${slug}`,
      type: "website",
      images: [{ url: image, width: 1200, height: 750, alt: `${trip.name} — Bali fishing charter` }],
    },
  };
}

/* ---------- Sticky booking card (BLUEPRINT §7.2) ---------- */
function BookingCard({ trip, overall, reviewCount }: { trip: TripPackage; overall: number; reviewCount: number }) {
  // pricingUnit may be unset in CMS — treat anything except explicit "per person" as per-boat
  const perPerson =
    trip.pricingUnit !== "per person" ? Math.round(trip.priceUsd / trip.maxGuestsIncluded) : null;

  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-card p-6">
      <div className="flex items-end gap-2 mb-1">
        <span className="font-display text-4xl font-semibold text-primary-950 tabular-nums">
          ${trip.priceUsd}
        </span>
        <span className="text-sm text-slate-500 pb-1.5">
          USD {trip.pricingUnit === "per person" ? "/ person" : `/ boat, up to ${trip.maxGuestsIncluded} guests`}
        </span>
      </div>
      {perPerson && (
        <p className="text-sm text-slate-500 mb-1">≈ ${perPerson} per person at {trip.maxGuestsIncluded} guests</p>
      )}
      {trip.minGuests && trip.minGuests > 1 && (
        <p className="text-sm text-slate-500 mb-1">Minimum {trip.minGuests} guests</p>
      )}
      {trip.extraGuestPriceUsd && (
        <p className="text-sm text-slate-500 mb-1">
          +${trip.extraGuestPriceUsd} per extra guest after {trip.maxGuestsIncluded} (max 8)
        </p>
      )}

      <div className="flex items-center gap-2 mt-4 pb-4 border-b border-slate-100">
        <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
        <span className="text-sm text-slate-600">
          <strong className="font-semibold text-primary-950">{overall}</strong> · {reviewCount} verified reviews
        </span>
      </div>

      <ul className="space-y-2.5 py-4">
        {["Fishing license & gear", "Drinks and snacks", "Hotel/villa pickup", "You keep your catch"].map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
            <Check className="h-4 w-4 text-primary-600 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <div className="space-y-3">
        {WHATSAPP_LINK && (
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="whatsapp"
            className="flex items-center justify-center gap-2 w-full rounded-full bg-whatsapp px-6 py-3.5 text-base font-semibold text-white shadow-cta hover:bg-whatsapp-dark active:scale-[0.98] transition-all duration-200"
          >
            <MessageCircle className="h-5 w-5" />
            Check Availability
          </a>
        )}
        <Link
          href={`/contact?package=${trip.slug}`}
          className="flex items-center justify-center w-full rounded-full border-2 border-primary-200 px-6 py-3 text-sm font-semibold text-primary-700 hover:border-primary-400 hover:bg-primary-50 transition-colors"
        >
          Book via Inquiry Form
        </Link>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gold-600 font-medium">
        <ShieldCheck className="h-3.5 w-3.5" />
        Free cancellation up to 30 days before
      </p>
      <p className="mt-2 text-center text-xs text-slate-400">
        Replies fast during daytime · No account needed
      </p>
    </div>
  );
}

/* ---------- Day timeline — derived from existing trip fields ---------- */
function DayTimeline({ trip }: { trip: TripPackage }) {
  const startHour = parseInt(trip.startTime.split(":")[0], 10);
  const returnHour = Number.isNaN(startHour) ? null : startHour + trip.durationHours;
  const includes = trip.includes?.length ? trip.includes : INCLUSIONS;
  const hasBBQ = includes.some((i) => i.toLowerCase().includes("bbq"));

  const steps = [
    { icon: Car, label: "Hotel / villa pickup", time: "before departure" },
    { icon: Sunrise, label: "Depart Serangan Harbor", time: trip.startTime },
    { icon: Fish, label: "Fishing grounds", time: `${trip.durationHours}h on the water` },
    ...(hasBBQ ? [{ icon: Check, label: "BBQ dinner on board", time: "sunset" }] : []),
    { icon: Clock, label: "Return to harbor", time: returnHour ? `≈ ${String(returnHour).padStart(2, "0")}:00` : "after the trip" },
  ];

  return (
    <ol className="relative space-y-5 border-l-2 border-dashed border-primary-200 pl-6">
      {steps.map((step) => (
        <li key={step.label} className="relative">
          <span className="absolute -left-[31px] flex items-center justify-center h-5 w-5 rounded-full bg-gold-400 ring-4 ring-white">
            <step.icon className="h-3 w-3 text-primary-950" />
          </span>
          <p className="text-sm font-semibold text-primary-950">{step.label}</p>
          <p className="text-xs text-slate-500">{step.time}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Page ---------- */
export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [trip, allTrips, charter] = await Promise.all([
    getTripPackageBySlug(slug),
    getTripPackages(),
    getCharter(),
  ]);
  if (!trip) notFound();

  const overall = charter?.ratingSnapshot?.overall ?? 4.4;
  const reviewCount = charter?.ratingSnapshot?.reviewCount ?? 126;
  const image = TRIP_IMAGES[slug] ?? TRIP_IMAGE_FALLBACK;
  const includes = trip.includes?.length ? trip.includes : INCLUSIONS;
  const species = charter?.targetSpecies ?? TARGET_SPECIES;
  const techniques = charter?.techniques ?? TECHNIQUES;
  const otherTrips = allTrips.filter((t) => t.slug !== slug).slice(0, 3);

  const productSchema = generateTripProductSchema(trip);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Trip Packages", url: "/trips" },
    { name: trip.name, url: `/trips/${slug}` },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <SchemaMarkup schema={[productSchema, breadcrumbSchema]} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/trips" className="hover:text-primary-600 transition-colors">Trip Packages</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-primary-950 font-medium truncate max-w-[40vw]">{trip.name}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        {/* ===== Left column ===== */}
        <div>
          {/* Title block */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-primary-950">
              {trip.name}
            </h1>
            <span
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                trip.bookingType === "shared"
                  ? "bg-gold-400 text-primary-950"
                  : "bg-primary-950 text-white"
              }`}
            >
              {trip.bookingType === "shared" ? "Shared" : "Private"}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-seafoam-100 border border-primary-200 px-3.5 py-1 text-xs font-semibold text-primary-800">
              <ShieldCheck className="h-3.5 w-3.5" />
              Free cancellation
            </span>
          </div>

          <div className="flex items-center gap-2 mb-8 text-sm text-slate-600">
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(overall) ? "fill-gold-400 text-gold-400" : "text-slate-200"}`} />
              ))}
            </span>
            <span>
              <strong className="font-semibold text-primary-950">{overall}</strong> · {reviewCount} reviews · Crew rated 4.7/5
            </span>
          </div>

          {/* Mobile booking card (before content) */}
          <div className="lg:hidden mb-10">
            <BookingCard trip={trip} overall={overall} reviewCount={reviewCount} />
          </div>

          {/* Media strip */}
          <Reveal>
            <div className="mb-10">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 shadow-card mb-3">
                <Image
                  src={image}
                  alt={`${trip.name} — Bali fishing charter from Serangan`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["/images/gallery/happy-customer.jpg", "/images/gallery/many-fishes.jpg", "/images/gallery/36ft-yacht.jpg"].map((src) => (
                  <Link
                    key={src}
                    href="/gallery"
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 group"
                  >
                    <Image
                      src={src}
                      alt="Bali fishing charter gallery photo"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 33vw, 22vw"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Description */}
          <p className="text-[15px] text-slate-700 leading-relaxed max-w-prose mb-10">{trip.description}</p>

          {/* At a glance */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Clock, value: `${trip.durationHours}h`, label: "Duration" },
              { icon: Sunrise, value: trip.startTime, label: "Departure" },
              {
                icon: Users,
                value: `${trip.maxGuestsIncluded}${trip.extraGuestPriceUsd ? " → 8" : ""}`,
                label: trip.extraGuestPriceUsd ? "Guests (max 8)" : "Max guests",
              },
              { icon: Banknote, value: `$${trip.priceUsd}`, label: `USD ${trip.pricingUnit}` },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-xl bg-white border border-slate-100 shadow-card p-4 text-center">
                <Icon className="h-5 w-5 text-primary-600 mx-auto mb-1.5" />
                <p className="text-lg font-bold text-primary-950 tabular-nums">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>

          {/* What's included */}
          <div className="rounded-2xl bg-seafoam-50 border border-primary-100 p-6 lg:p-7 mb-10">
            <h2 className="font-display text-xl text-primary-950 mb-5">What&apos;s Included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {includes.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-white shadow-card">
                    <Check className="h-3.5 w-3.5 text-primary-600" />
                  </span>
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Your day at a glance */}
          <div className="mb-10">
            <h2 className="font-display text-xl text-primary-950 mb-5">Your Day at a Glance</h2>
            <DayTimeline trip={trip} />
          </div>

          {/* Species & techniques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
            <div>
              <h2 className="font-display text-xl text-primary-950 mb-4">What You Can Catch</h2>
              <div className="flex flex-wrap gap-2">
                {species.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-100 shadow-card px-3.5 py-1.5 text-sm font-medium text-primary-950">
                    <Fish className="h-3.5 w-3.5 text-gold-500" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-xl text-primary-950 mb-4">Techniques</h2>
              <div className="flex flex-wrap gap-2">
                {techniques.map((t) => (
                  <span key={t} className="rounded-full bg-primary-50 border border-primary-100 px-3.5 py-1.5 text-sm font-medium text-primary-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-4">
            <h2 className="font-display text-xl text-primary-950 mb-4">Good to Know</h2>
            <FAQAccordion />
          </div>
        </div>

        {/* ===== Right column — sticky booking card (desktop) ===== */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <BookingCard trip={trip} overall={overall} reviewCount={reviewCount} />
          </div>
        </aside>
      </div>

      {/* Other trips */}
      {otherTrips.length > 0 && (
        <div className="mt-16 lg:mt-24">
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-primary-950 mb-8">
            Other Trips to Consider
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {otherTrips.map((t) => (
              <TripCard key={t.slug} trip={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
