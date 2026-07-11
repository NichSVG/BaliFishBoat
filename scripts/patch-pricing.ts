import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const projectId = "ovq3kfp8";
const dataset = "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("Set SANITY_API_TOKEN environment variable");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2026-07-07", useCdn: false, token });

async function patchPricing() {
  console.log("Patching trip pricing fields...\n");

  // 1. Sharing Trip: $200/person
  await client.patch("trip-sharing-trip").set({
    priceUsd: 200,
    pricingUnit: "per person",
  }).commit();
  console.log("  ✓ Sharing Trip → $200/person");

  // 2. Sunset Trip: $270/person, min 2, BBQ dinner, updated description
  await client.patch("trip-sunset-trip").set({
    priceUsd: 270,
    pricingUnit: "per person",
    minGuests: 2,
    includes: [
      "Fishing license",
      "Hotel/villa pickup",
      "Guests keep their catch",
      "Drinks and snacks",
      "BBQ dinner",
      "Free cancellation up to 30 days before the trip",
    ],
    description: "A shorter afternoon trip timed to end with the sunset over the water — the whole boat to yourselves. Includes a BBQ dinner on board.",
  }).commit();
  console.log("  ✓ Sunset Trip → $270/person, min 2, BBQ dinner");

  // 3. Private trips: +$50/extra guest after 4
  const privateTrips = [
    "trip-half-day-private",
    "trip-three-quarter-day",
    "trip-jigging-casting-6hr",
    "trip-full-day",
    "trip-full-day-jigging-popping",
  ];

  for (const id of privateTrips) {
    await client.patch(id).set({
      extraGuestPriceUsd: 50,
    }).commit();
    console.log(`  ✓ ${id} → +$50/extra guest`);
  }

  console.log("\nDone! All pricing fields patched.");
}

patchPricing().catch((err) => {
  console.error("Patch failed:", err);
  process.exit(1);
});
