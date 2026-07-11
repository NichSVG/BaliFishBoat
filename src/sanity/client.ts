import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-07-07";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // Add cache control for ISR — fetch fresh data on revalidation
  perspective: "published",
});

// Non-CDN client for freshness-critical queries (blog listing, sitemap)
export const freshClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
