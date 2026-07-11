import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/data";
import { Fish } from "lucide-react";

export const metadata: Metadata = {
  title: "Fishing Blog",
  description:
    "Tips, species guides, and local knowledge from Bali's waters — written by the captains who fish them every day.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Fishing Blog</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Species guides, seasonal tips, and what to expect on the water — straight from the captains at BaliFishBoat.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-slate-500 py-12">No blog posts yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 text-blue-600 mb-3">
                <Fish className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wide">{post.primaryKeyword}</span>
              </div>
              <h2 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-slate-600 line-clamp-3 mb-4">{post.metaDescription}</p>
              <time className="text-xs text-slate-400" dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
