import Image from "next/image";

const images = [
  { src: "/images/gallery/36ft-yacht.jpg", alt: "36ft GT 70 yacht cruiser" },
  { src: "/images/gallery/happy-group.jpg", alt: "Happy group after a fishing trip" },
  { src: "/images/gallery/showing-off-catches.jpg", alt: "Anglers showing off their catch" },
  { src: "/images/gallery/fishing-equipment.jpg", alt: "Fishing equipment on board" },
  { src: "/images/gallery/big-catch.jpg", alt: "Big catch of the day" },
  { src: "/images/gallery/happy-customer.jpg", alt: "Happy customer with fish" },
  { src: "/images/gallery/big-catch-2.jpg", alt: "Another great catch" },
  { src: "/images/gallery/many-fishes.jpg", alt: "Multiple fish caught on trip" },
  { src: "/images/gallery/long-catch.jpg", alt: "Impressive catch from Bali waters" },
];

export default function Gallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((img, i) => (
        <div
          key={i}
          className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
