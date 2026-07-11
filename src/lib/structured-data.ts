import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, WHATSAPP_NUMBER } from "@/lib/constants";
import type { TripPackage, BlogPost } from "@/types/charter";

type JsonLdSchema = Record<string, unknown> | Record<string, unknown>[];

export function generateLocalBusinessSchema(charter?: {
  name?: string;
  tagline?: string;
  ratingSnapshot?: { overall: number; reviewCount: number };
  location?: { area?: string; city?: string; region?: string; mapUrl?: string };
  boat?: { name?: string; lengthFt?: number; capacityPersons?: number };
  targetSpecies?: string[];
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: charter?.name || SITE_NAME,
    description: charter?.tagline || SITE_DESCRIPTION,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: charter?.location?.area || "Serangan",
      addressRegion: charter?.location?.region || "Bali",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.7197,
      longitude: 115.2412,
    },
    areaServed: "Bali, Indonesia",
    priceRange: "$$",
  };

  if (charter?.ratingSnapshot?.overall && charter.ratingSnapshot.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: charter.ratingSnapshot.overall,
      reviewCount: charter.ratingSnapshot.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (WHATSAPP_NUMBER) {
    schema.telephone = `+${WHATSAPP_NUMBER}`;
  }

  return schema as JsonLdSchema;
}

export function generateTripProductSchema(trip: TripPackage) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: trip.name,
    description: trip.description,
    url: `${SITE_URL}/trips/${trip.slug}`,
    offers: {
      "@type": "Offer",
      price: trip.priceUsd,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
  };

  return schema as JsonLdSchema;
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } as JsonLdSchema;
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  } as JsonLdSchema;
}

export function generateBlogPostSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    keywords: [post.primaryKeyword, ...(post.secondaryKeywords || [])].join(", "),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  } as JsonLdSchema;
}