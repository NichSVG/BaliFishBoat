import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

const mosaicImages = [
  { src: "/images/gallery/big-catch.jpg", alt: "Guest holding a Mahi Mahi on a Bali fishing charter", caption: "A prize Mahi Mahi, offshore" },
  { src: "/images/gallery/happy-customer.jpg", alt: "Happy guest with a fresh catch on a Bali fishing trip", caption: "Smiles all around" },
  { src: "/images/gallery/many-fishes.jpg", alt: "Multiple fish caught on a single Bali fishing trip", caption: "A full day's haul" },
  { src: "/images/gallery/showing-off-catches.jpg", alt: "Anglers showing off their catch from Serangan", caption: "Showing off the catch" },
  { src: "/images/gallery/long-catch.jpg", alt: "Fresh catch from the waters of Serangan, Bali", caption: "Fresh from Serangan waters" },
];

/** "From the Water" — asymmetric gallery mosaic (BLUEPRINT §2.7). */
export default function HomepagePics() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="From the Water"
          title="What a Day Out Actually Looks Like"
          support="Real trips, real catches — shot by our guests and crew."
        />
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8">
            {/* Large feature tile */}
            <div className="relative col-span-2 row-span-2 aspect-square lg:aspect-auto lg:min-h-[420px] rounded-2xl overflow-hidden bg-slate-100 group">
              <TileImage img={mosaicImages[0]} sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            {mosaicImages.slice(1).map((img) => (
              <div key={img.src} className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 group">
                <TileImage img={img} sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </Reveal>
        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center rounded-full border-2 border-primary-200 px-6 py-3 text-sm font-semibold text-primary-700 hover:border-primary-400 hover:bg-primary-50 transition-colors"
          >
            See the full gallery →
          </Link>
        </div>
      </div>
    </section>
  );
}

function TileImage({ img, sizes }: { img: { src: string; alt: string; caption: string }; sizes: string }) {
  return (
    <>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes={sizes}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 via-transparent to-transparent" />
      <p className="absolute bottom-0 left-0 right-0 text-white text-sm font-medium px-4 py-3">
        {img.caption}
      </p>
    </>
  );
}
