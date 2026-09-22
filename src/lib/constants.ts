export const SITE_NAME = "Bali Fishing Trips";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://balifishboat.com";
export const SITE_DESCRIPTION =
  "Private fishing charters out of Serangan, Bali. Target Mahi Mahi, Yellowfin Tuna, and more on a 36ft yacht with experienced local crew.";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi! I'm interested in booking a fishing trip. Can you help me with availability and pricing?"
);
export const WHATSAPP_LINK = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`
  : "";

export const INCLUSIONS = [
  "Fishing license",
  "Hotel/villa pickup",
  "Guests keep their catch",
  "Drinks and snacks",
  "Meal on longer trips",
  "Free cancellation up to 30 days before the trip",
];

export const TARGET_SPECIES = [
  "Mahi Mahi",
  "Yellowfin Tuna",
  "Skipjack Tuna",
  "Red Snapper",
  "Grouper",
  "Mackerel",
];

export const TECHNIQUES = [
  "Trolling",
  "Bottom fishing",
  "Jigging",
  "Popping",
  "Casting",
];

export const FAQS = [
  {
    question: "What's included in every trip?",
    answer:
      "All trips include a fishing license, hotel/villa pickup, drinks and snacks, and you keep your catch. Longer trips also include a meal.",
  },
  {
    question: "How many people can the boat hold?",
    answer:
      "The boat has a capacity of 8 persons. Our private trips include up to 4 guests in the base price; additional guests can be added.",
  },
  {
    question: "What fish can we catch?",
    answer:
      "Common catches include Mahi Mahi, Yellowfin Tuna, Skipjack Tuna, Red Snapper, Grouper, and Mackerel. What's biting depends on the season and technique.",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "Free cancellation up to 30 days before the trip. Contact us for details on shorter notice.",
  },
  {
    question: "Do you offer shared trips?",
    answer:
      "Yes! Our Sharing Trip is a 4-hour shared boat experience at $200 per person. We also offer a Sunset Trip at $270 per person (min. 2 guests, includes BBQ dinner).",
  },
  {
    question: "Where do we depart from?",
    answer:
      "We depart from Serangan Harbor in Denpasar, Bali. We offer pickup from your hotel or villa.",
  },
  {
    question: "Can beginners go fishing in Bali?",
    answer:
      "Absolutely. Our crew handles all the rigging and guides you through every step. Trolling and bottom fishing are great for beginners — you just hold the rod and enjoy the fight. No experience needed.",
  },
  {
    question: "Can kids go fishing in Bali?",
    answer:
      "Yes! Kids love it. We recommend the Half-Day or Sharing Trip for families with children. The crew will help with everything. Children under 6 ride free when accompanied by a paying adult.",
  },
  {
    question: "Is Bali good for tuna fishing?",
    answer:
      "Bali is excellent for tuna. Yellowfin Tuna are caught year-round off Serangan, with peak season from May to October. Skipjack Tuna are common during the wet season (November–April).",
  },
  {
    question: "What is the best month for fishing in Bali?",
    answer:
      "May through September is the best period — dry season, calm seas, and peak activity for Yellowfin Tuna, GT, Mahi Mahi, and even Marlin. April and October are good transition months.",
  },
  {
    question: "What fish bite in July in Bali?",
    answer:
      "July is peak season. Expect Yellowfin Tuna, Giant Trevally (GT), Mahi Mahi, Sailfish, and Marlin. Trolling and popping are highly effective.",
  },
  {
    question: "Can non-fishers join the trip?",
    answer:
      "Yes. The boat has shaded seating, a toilet, and comfortable cruising. Non-fishers can relax, snorkel, or just enjoy the ocean views while others fish.",
  },
  {
    question: "How rough is the ocean in Bali?",
    answer:
      "During dry season (May–September), seas around Serangan are generally calm. Wet season (Nov–Mar) can bring rougher conditions, but we monitor weather closely and offer free rescheduling if conditions are unsafe.",
  },
  {
    question: "Can we cook the fish we catch?",
    answer:
      "On Full Day trips, the crew can prepare a fresh sashimi or grilled fish lunch from your catch. It's one of the best parts of the experience.",
  },
  {
    question: "Do I need a fishing license?",
    answer:
      "No — the fishing license is included in every trip. We handle all the paperwork.",
  },
  {
    question: "What should I bring on a fishing trip?",
    answer:
      "Sunscreen, hat, sunglasses, and a camera. We provide all fishing equipment, rods, reels, bait, and tackle. Wear comfortable clothing and non-slip shoes.",
  },
];
