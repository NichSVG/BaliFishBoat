import type { Metadata } from "next";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from our fishing charters in Bali — catches, boats, and ocean views.",
};

export default function GalleryPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Gallery</h1>
        <p className="text-slate-600">Moments from our fishing trips around Bali</p>
      </div>
      <Gallery />
    </section>
  );
}
