export interface GalleryVideo {
  id: string;
  src: string;
  thumbnail: string;
  alt: string;
  caption: string;
}

export const galleryVideos: GalleryVideo[] = [
  {
    id: "vid-20260711-wa0020",
    src: "/videos/VID-20260711-WA0020.mp4",
    thumbnail: "/images/gallery/IMG-20260711-WA0017.jpg",
    alt: "Fishing trip video highlights",
    caption: "Action from the boat",
  },
  {
    id: "vid-20260711-wa0021",
    src: "/videos/VID-20260711-WA0021.mp4",
    thumbnail: "/images/gallery/IMG-20260711-WA0019.jpg",
    alt: "Catch and fishing footage",
    caption: "The day\u2019s catch",
  },
];

export const homepageImages: { src: string; alt: string; caption: string }[] = [
  {
    src: "/images/gallery/IMG-20260711-WA0017.jpg",
    alt: "On the water \u2014 Bali fishing charter",
    caption: "Out on the water from Serangan",
  },
  {
    src: "/images/gallery/IMG-20260711-WA0019.jpg",
    alt: "Fresh catch from a Bali fishing trip",
    caption: "Fresh from the water",
  },
];
