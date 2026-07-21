import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";
import { Fish } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Bali Fishing Blog — Tips, Species & Seasonal Guides",
  description:
    "Bali fishing blog with species guides, seasonal tips, and local knowledge from captains who fish Serangan waters daily.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Bali Fishing Blog — Tips, Species & Seasonal Guides",
    description:
      "Bali fishing blog with species guides, seasonal tips, and local knowledge from Serangan captains.",
    url: `${SITE_URL}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="mb-10 lg:mb-14 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-600 mb-3">Blog</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-primary-950 mb-4">
          Fishing Blog
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Species guides, seasonal tips, and what to expect on the water — straight from the
          captains at BaliFishBoat.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-slate-500 py-12">No blog posts yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl bg-white border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Cover band */}
              <div className="relative h-40 bg-gradient-to-br from-primary-800 via-primary-600 to-lagoon-400 overflow-hidden">
                <Fish
                  className="absolute -right-4 -bottom-6 h-36 w-36 text-white/10 rotate-[-15deg] group-hover:rotate-[-5deg] transition-transform duration-500"
                  aria-hidden="true"
                />
                <span className="absolute top-4 left-4 inline-block rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold text-primary-950">
                  {post.primaryKeyword}
                </span>
              </div>
              <div className="flex flex-col grow p-6">
                <h2 className="font-display text-xl text-primary-950 group-hover:text-primary-600 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {post.metaDescription}
                </p>
                <time className="mt-auto text-xs text-slate-400" dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
