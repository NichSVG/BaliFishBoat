"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const images = [
  { src: "/images/gallery/36ft-yacht.jpg", alt: "36ft GT 70 yacht cruiser", caption: "Our 36ft GT 70 yacht — comfortable and ready for action" },
  { src: "/images/gallery/happy-group.jpg", alt: "Happy group after a fishing trip", caption: "Happy anglers after a great day on the water" },
  { src: "/images/gallery/showing-off-catches.jpg", alt: "Anglers showing off their catch", caption: "Showing off the day's catch" },
  { src: "/images/gallery/fishing-equipment.jpg", alt: "Fishing equipment on board", caption: "Quality rods, reels, and tackle provided" },
  { src: "/images/gallery/big-catch.jpg", alt: "Big catch of the day", caption: "A prize catch — Mahi Mahi offshore" },
  { src: "/images/gallery/happy-customer.jpg", alt: "Happy customer with fish", caption: "Smiles all around after landing this one" },
  { src: "/images/gallery/big-catch-2.jpg", alt: "Another great catch", caption: "Another successful haul" },
  { src: "/images/gallery/many-fishes.jpg", alt: "Multiple fish caught on trip", caption: "Multiple catches in a single trip" },
  { src: "/images/gallery/long-catch.jpg", alt: "Impressive catch from Bali waters", caption: "Fresh from the waters of Serangan, Bali" },
];

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
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  }

  function prev() {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  }

  const selected = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 group cursor-pointer"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {img.caption}
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
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 text-white/60 hover:text-white text-4xl font-bold z-10"
          >
            &#8249;
          </button>

          <div
            className="max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                className="object-contain"
                sizes="80vw"
              />
            </div>
            <p className="text-white/90 text-sm mt-3 text-center">{selected.caption}</p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 text-white/60 hover:text-white text-4xl font-bold z-10"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
