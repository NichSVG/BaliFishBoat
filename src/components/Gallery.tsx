"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Play } from "lucide-react";
import { galleryVideos } from "@/lib/galleryData";

type GalleryItem =
  | { type: "image"; src: string; alt: string; caption: string }
  | { type: "video"; id: string; src: string; thumbnail: string; alt: string; caption: string };

const images: { type: "image"; src: string; alt: string; caption: string }[] = [
  { type: "image", src: "/images/gallery/36ft-yacht.jpg", alt: "36ft GT 70 yacht cruiser", caption: "Our 36ft GT 70 yacht \u2014 comfortable and ready for action" },
  { type: "image", src: "/images/gallery/happy-group.jpg", alt: "Happy group after a fishing trip", caption: "Happy anglers after a great day on the water" },
  { type: "image", src: "/images/gallery/showing-off-catches.jpg", alt: "Anglers showing off their catch", caption: "Showing off the day\u2019s catch" },
  { type: "image", src: "/images/gallery/fishing-equipment.jpg", alt: "Fishing equipment on board", caption: "Quality rods, reels, and tackle provided" },
  { type: "image", src: "/images/gallery/big-catch.jpg", alt: "Big catch of the day", caption: "A prize catch \u2014 Mahi Mahi offshore" },
  { type: "image", src: "/images/gallery/happy-customer.jpg", alt: "Happy customer with fish", caption: "Smiles all around after landing this one" },
  { type: "image", src: "/images/gallery/big-catch-2.jpg", alt: "Another great catch", caption: "Another successful haul" },
  { type: "image", src: "/images/gallery/many-fishes.jpg", alt: "Multiple fish caught on trip", caption: "Multiple catches in a single trip" },
  { type: "image", src: "/images/gallery/long-catch.jpg", alt: "Impressive catch from Bali waters", caption: "Fresh from the waters of Serangan, Bali" },
];

const videoItems: { type: "video"; id: string; src: string; thumbnail: string; alt: string; caption: string }[] =
  galleryVideos.map((v) => ({
    type: "video",
    id: v.id,
    src: v.src,
    thumbnail: v.thumbnail,
    alt: v.alt,
    caption: v.caption,
  }));

// Interleave videos into the photo grid (after every 4 photos)
const items: GalleryItem[] = [];
let videoIdx = 0;
for (let i = 0; i < images.length; i++) {
  items.push(images[i]);
  if ((i + 1) % 4 === 0 && videoIdx < videoItems.length) {
    items.push(videoItems[videoIdx++]);
  }
}
// Append any remaining videos at the end
while (videoIdx < videoItems.length) {
  items.push(videoItems[videoIdx++]);
}

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  function openLightbox(index: number) {
    setSelectedIndex(index);
  }

  function closeLightbox() {
    setSelectedIndex(null);
  }

  function next() {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % items.length);
    }
  }

  function prev() {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
    }
  }

  useEffect(() => {
    if (selectedIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const selected = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 group cursor-pointer"
            aria-label={item.type === "video" ? `Play video: ${item.caption}` : `View photo: ${item.caption}`}
          >
            <Image
              src={item.type === "video" ? item.thumbnail : item.src}
              alt={item.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {item.type === "video" && (
              <>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white/90 p-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-blue-900 fill-blue-900" />
                  </div>
                </div>
                <span className="absolute top-2 left-2 inline-block rounded-full bg-blue-600/90 text-white text-[10px] font-semibold uppercase tracking-wide px-2 py-1">
                  Video
                </span>
              </>
            )}
            {item.type === "image" && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            )}
            <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.caption}
            </p>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 text-white/60 hover:text-white text-4xl font-bold z-10"
            aria-label="Previous"
          >
            &#8249;
          </button>

          <div
            className="max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.type === "video" ? (
              <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  key={selected.id}
                  src={selected.src}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={selected.src}
                  alt={selected.alt}
                  fill
                  className="object-contain"
                  sizes="80vw"
                />
              </div>
            )}
            <p className="text-white/90 text-sm mt-3 text-center">{selected.caption}</p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 text-white/60 hover:text-white text-4xl font-bold z-10"
            aria-label="Next"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
