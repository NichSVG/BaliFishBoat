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
];
