import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import { SITE_URL } from "@/lib/constants";
import { galleryVideos } from "@/lib/galleryData";

export const metadata: Metadata = {
  title: "Fishing Charter Photos & Videos — Gallery",
  description:
    "Photos and videos from our Bali fishing charters \u2014 catches, the boat, and moments on the water out of Serangan.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Fishing Charter Photos & Videos \u2014 Gallery",
    description:
      "Photos and videos from our Bali fishing charters \u2014 catches, the boat, and moments on the water.",
    url: `${SITE_URL}/gallery`,
  },
};

export default function GalleryPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Gallery</h1>
        <p className="text-slate-600">Photos and videos from our fishing trips around Bali</p>
      </div>
      <Gallery />
      {galleryVideos.length === 0 && (
        <p className="text-center text-slate-500 mt-8">Videos coming soon.</p>
      )}
    </section>
  );
}
