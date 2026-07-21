"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { X, Play, MessageCircle } from "lucide-react";
import { galleryVideos } from "@/lib/galleryData";
import { WHATSAPP_LINK } from "@/lib/constants";

type Category = "catches" | "boat" | "guests" | "onboard";

type GalleryItem =
  | { type: "image"; src: string; alt: string; caption: string; category: Category }
  | { type: "video"; id: string; src: string; thumbnail: string; alt: string; caption: string; category: Category };

const images: Extract<GalleryItem, { type: "image" }>[] = [
  { type: "image", src: "/images/gallery/36ft-yacht.jpg", alt: "36ft GT 70 fishing yacht anchored off Serangan, Bali", caption: "Our 36ft GT 70 yacht — comfortable and ready for action", category: "boat" },
  { type: "image", src: "/images/gallery/happy-group.jpg", alt: "Happy group of anglers after a Bali fishing trip", caption: "Happy anglers after a great day on the water", category: "guests" },
  { type: "image", src: "/images/gallery/showing-off-catches.jpg", alt: "Anglers showing off their catch from Serangan", caption: "Showing off the day's catch", category: "catches" },
  { type: "image", src: "/images/gallery/fishing-equipment.jpg", alt: "Quality rods, reels and tackle on board", caption: "Quality rods, reels, and tackle provided", category: "onboard" },
  { type: "image", src: "/images/gallery/big-catch.jpg", alt: "Guest holding a Mahi Mahi on a Bali fishing charter", caption: "A prize catch — Mahi Mahi offshore", category: "catches" },
  { type: "image", src: "/images/gallery/happy-customer.jpg", alt: "Happy guest holding a fresh catch", caption: "Smiles all around after landing this one", category: "guests" },
  { type: "image", src: "/images/gallery/big-catch-2.jpg", alt: "Another successful catch on a Bali fishing trip", caption: "Another successful haul", category: "catches" },
  { type: "image", src: "/images/gallery/many-fishes.jpg", alt: "Multiple fish caught on a single trip", caption: "Multiple catches in a single trip", category: "catches" },
  { type: "image", src: "/images/gallery/long-catch.jpg", alt: "Fresh catch from the waters of Serangan, Bali", caption: "Fresh from the waters of Serangan, Bali", category: "catches" },
];

const videoItems: Extract<GalleryItem, { type: "video" }>[] = galleryVideos.map((v, i) => ({
  type: "video",
  id: v.id,
  src: v.src,
  thumbnail: v.thumbnail,
  alt: v.alt,
  caption: v.caption,
  category: i === 0 ? "onboard" : "catches",
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
while (videoIdx < videoItems.length) {
  items.push(videoItems[videoIdx++]);
}

const FILTERS: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "catches", label: "Catches" },
  { key: "boat", label: "The Boat" },
  { key: "guests", label: "Guests" },
  { key: "onboard", label: "On Board" },
];

const CTA_POSITION = 4;

export default function Gallery() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<Element | null>(null);

  const visibleItems = useMemo(() => {
    const base = filter === "all" ? items : items.filter((it) => it.category === filter);
    // Inject CTA tile marker at position 4
    const withCta: (GalleryItem | { type: "cta" })[] = [...base];
    withCta.splice(Math.min(CTA_POSITION, withCta.length), 0, { type: "cta" });
    return withCta;
  }, [filter]);

  // Only real media items are lightbox-able
  const mediaItems = useMemo(
    () => visibleItems.filter((it): it is GalleryItem => it.type !== "cta"),
    [visibleItems]
  );

  function openLightbox(item: GalleryItem) {
    lastFocusedRef.current = document.activeElement;
    setSelectedIndex(mediaItems.indexOf(item));
  }

  function closeLightbox() {
    setSelectedIndex(null);
    if (lastFocusedRef.current instanceof HTMLElement) lastFocusedRef.current.focus();
  }

  function next() {
    if (selectedIndex !== null) setSelectedIndex((selectedIndex + 1) % mediaItems.length);
  }

  function prev() {
    if (selectedIndex !== null) setSelectedIndex((selectedIndex - 1 + mediaItems.length) % mediaItems.length);
  }

  useEffect(() => {
    if (selectedIndex === null) return;
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const selected = selectedIndex !== null ? mediaItems[selectedIndex] : null;

  return (
    <>
      {/* Filter chips */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              filter === f.key
                ? "bg-primary-950 text-white"
                : "border border-slate-200 text-slate-600 hover:border-primary-400 hover:text-primary-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        {visibleItems.map((item, i) => {
          if (item.type === "cta") {
            return (
              <div
                key="cta-tile"
                className="relative aspect-[4/3] rounded-2xl bg-primary-950 flex flex-col items-center justify-center gap-3 text-center p-6"
              >
                <p className="font-display text-xl text-white">Want photos like these?</p>
                <p className="text-sm text-slate-300">Your trip, your catch.</p>
                {WHATSAPP_LINK && (
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="whatsapp"
                    className="mt-1 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white hover:bg-whatsapp-dark transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                )}
              </div>
            );
          }
          return (
            <button
              key={item.type === "video" ? item.id : item.src}
              onClick={() => openLightbox(item)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 group cursor-pointer"
              aria-label={item.type === "video" ? `Play video: ${item.caption}` : `View photo: ${item.caption}`}
            >
              <Image
                src={item.type === "video" ? item.thumbnail : item.src}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
              {item.type === "video" && (
                <>
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white/90 p-4 shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-primary-900 fill-primary-900" />
                    </div>
                  </div>
                  <span className="absolute top-2 left-2 inline-block rounded-full bg-primary-600/90 text-white text-[10px] font-semibold uppercase tracking-wide px-2 py-1">
                    Video
                  </span>
                </>
              )}
              {item.type === "image" && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              )}
              <p className="absolute bottom-0 left-0 right-0 bg-primary-950/70 text-white text-xs px-3 py-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                {item.caption}
              </p>
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={selected.caption}
        >
          <span className="absolute top-4 left-5 text-white/70 text-sm tabular-nums">
            {selectedIndex! + 1} / {mediaItems.length}
          </span>

          <button
            ref={closeRef}
            onClick={closeLightbox}
            className="absolute top-3 right-3 p-2 text-white/80 hover:text-white z-10"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 sm:left-4 p-3 text-white/60 hover:text-white text-4xl font-bold z-10"
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
                  preload="none"
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
                  sizes="90vw"
                />
              </div>
            )}
            <p className="text-white/90 text-sm mt-3 text-center">{selected.caption}</p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 sm:right-4 p-3 text-white/60 hover:text-white text-4xl font-bold z-10"
            aria-label="Next"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
