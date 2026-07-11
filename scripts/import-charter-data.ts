import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

// Load .env.local
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

async function seed() {
  const seedPath = path.join(__dirname, "..", "charter-seed-data.json");
  const raw = fs.readFileSync(seedPath, "utf-8");
  const data = JSON.parse(raw);

  console.log("Seeding charter info...");

  // Upsert charter document
  await client.createOrReplace({
    _id: "charter-main",
    _type: "charter",
    name: data.business.name,
    tagline: data.business.tagline,
    location: data.business.location,
    ratingSnapshot: {
      overall: data.business.ratingSnapshot.overall,
      reviewCount: data.business.ratingSnapshot.reviewCount,
    },
    boat: {
      name: data.boat.name,
      category: data.boat.category,
      manufacturer: data.boat.manufacturer,
      lengthFt: data.boat.lengthFt,
      yearBuilt: data.boat.yearBuilt,
      capacityPersons: data.boat.capacityPersons,
      engine: data.boat.engine,
      amenities: data.boat.amenities,
    },
    includedAsStandard: data.includedAsStandard,
    targetSpecies: data.targetSpecies,
    techniques: data.techniques,
  });

  console.log("Seeding trip packages...");

  for (const trip of data.tripPackages) {
    const id = `trip-${trip.slug}`;
    await client.createOrReplace({
      _id: id,
      _type: "tripPackage",
      name: trip.name,
      slug: { _type: "slug", current: trip.slug },
      durationHours: trip.durationHours,
      startTime: trip.startTime,
      bookingType: trip.bookingType,
      maxGuestsIncluded: trip.maxGuestsIncluded,
      ...(trip.minGuests ? { minGuests: trip.minGuests } : {}),
      ...(trip.extraGuestPriceUsd ? { extraGuestPriceUsd: trip.extraGuestPriceUsd } : {}),
      priceUsd: trip.priceUsd,
      pricingUnit: trip.pricingUnit,
      includes: trip.includes ?? data.includedAsStandard,
      description: trip.description,
    });
    console.log(`  ✓ ${trip.name}`);
  }

  console.log("Seed complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
