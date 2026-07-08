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
