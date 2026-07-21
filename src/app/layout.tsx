import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBookBar from "@/components/MobileBookBar";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getCharter } from "@/lib/data";
import { generateLocalBusinessSchema, generateFAQSchema } from "@/lib/structured-data";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, WHATSAPP_NUMBER } from "@/lib/constants";
import { FAQS } from "@/lib/constants";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Private Fishing Charters in Bali`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} — Private Fishing Charters in Bali`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} fishing charter in Bali`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Private Fishing Charters in Bali`,
    description: SITE_DESCRIPTION,
    images: ["/images/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#082834",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const charter = await getCharter();
  const localBusinessSchema = generateLocalBusinessSchema(charter ? {
    name: charter.name,
    tagline: charter.tagline,
    ratingSnapshot: charter.ratingSnapshot,
    location: charter.location,
    targetSpecies: charter.targetSpecies,
  } : undefined);
  const faqSchema = generateFAQSchema(FAQS);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <SchemaMarkup schema={[localBusinessSchema, faqSchema]} />
      </head>
      <body className={`${inter.variable} ${fraunces.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary-700 focus:px-4 focus:py-2 focus:text-white focus:font-semibold"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <Header />
        {/* pb-20 compensates for the mobile sticky book bar */}
        <main id="main-content" className="pb-20 md:pb-0">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileBookBar />
        <ScrollToTop />
      </body>
    </html>
  );
}