import Hero from "@/components/Hero";
import TripCard from "@/components/TripCard";
import ReviewBadges from "@/components/ReviewBadges";
import Testimonials from "@/components/Testimonials";
import FAQAccordion from "@/components/FAQAccordion";
import LocationMap from "@/components/LocationMap";
import Link from "next/link";
import { Anchor, Fish, Waves, Shield, Clock, MapPin } from "lucide-react";
import { getTripPackages, getCharter, getTestimonials, getReviewThemes } from "@/lib/data";
import { INCLUSIONS, TARGET_SPECIES, TECHNIQUES } from "@/lib/constants";

export default async function HomePage() {
  const [trips, charter, testimonials] = await Promise.all([
    getTripPackages(),
    getCharter(),
    getTestimonials(),
  ]);
  const reviewThemes = getReviewThemes();
  const featuredTrips = trips.slice(0, 3);

  return (
    <>
      <Hero
        overallRating={charter?.ratingSnapshot?.overall ?? 4.4}
        reviewCount={charter?.ratingSnapshot?.reviewCount ?? 126}
      />

      {/* Featured Trips */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Our Trip Packages</h2>
          <p className="text-slate-600">Choose from half-day to full-day private and shared charters</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTrips.map((trip) => (
            <TripCard key={trip.slug} trip={trip} />
          ))}
        </div>
        {trips.length > 3 && (
          <div className="text-center mt-8">
            <Link
              href="/trips"
              className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              View All {trips.length} Packages
            </Link>
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">
            Why Fish With Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Anchor, title: "Experienced Crew", desc: "Local captains who know Bali waters inside out" },
              { icon: Fish, title: "Top Species", desc: "Target Mahi Mahi, Tuna, Snapper, and more" },
              { icon: Waves, title: "36ft Yacht", desc: "Comfortable cruiser with shaded seating and toilet" },
              { icon: Shield, title: "All-Inclusive", desc: "License, drinks, snacks, pickup — all covered" },
              { icon: Clock, title: "Flexible Trips", desc: "3 to 8 hour trips, shared or private" },
              { icon: MapPin, title: "Serangan Departure", desc: "Easy access from anywhere in south Bali" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">
          Included in Every Trip
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {INCLUSIONS.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl bg-white border border-slate-100 p-4 shadow-sm"
            >
              <span className="text-green-600 text-lg">&#10003;</span>
              <span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            What Guests Say
          </h2>
          <p className="text-center text-slate-600 mb-10">
            {charter?.ratingSnapshot?.overall ?? 4.4} / 5 from{" "}
            {charter?.ratingSnapshot?.reviewCount ?? 126} reviews
          </p>
          <ReviewBadges themes={reviewThemes} />
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">
            Guest Testimonials
          </h2>
          <Testimonials testimonials={testimonials} />
        </section>
      )}

      {/* Species & Techniques */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">What You Can Catch</h2>
              <div className="grid grid-cols-2 gap-3">
                {(charter?.targetSpecies ?? TARGET_SPECIES).map((species) => (
                  <div
                    key={species}
                    className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-3"
                  >
                    <Fish className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-slate-800">{species}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Fishing Techniques</h2>
              <div className="grid grid-cols-2 gap-3">
                {(charter?.techniques ?? TECHNIQUES).map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-3"
                  >
                    <Waves className="h-4 w-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-800">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">
          Where We Depart
        </h2>
        <LocationMap />
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <FAQAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 text-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Fish?</h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            Book your Bali fishing charter today. Private boats, experienced crew, and the best fishing spots around Serangan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-blue-900 hover:bg-blue-50 transition-colors"
            >
              Make an Inquiry
            </Link>
            <Link
              href="/trips"
              className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              See Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
