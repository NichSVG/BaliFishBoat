import Image from "next/image";
import Link from "next/link";
import { homepageImages } from "@/lib/galleryData";

export default function HomepagePics() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">From the Water</h2>
          <p className="text-slate-600">A look at what the trips actually feel like</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {homepageImages.map((img) => (
            <div
              key={img.src}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-0 left-0 right-0 text-white text-sm font-medium px-4 py-3">
                {img.caption}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            See the full gallery &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
