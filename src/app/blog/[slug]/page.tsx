import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { ArrowLeft, Calendar, Tag, Clock, Fish } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generateBlogPostSchema, generateBreadcrumbSchema } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const blogSchema = generateBlogPostSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${slug}` },
  ]);

  const readMinutes = Math.max(2, Math.ceil(post.body.split(/\s+/).length / 200));

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <SchemaMarkup schema={[blogSchema, breadcrumbSchema]} />

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <header className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight text-primary-950 mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {readMinutes} min read
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Tag className="h-4 w-4" />
            {post.primaryKeyword}
          </span>
        </div>
      </header>

      <MarkdownRenderer content={post.body} />

      {post.secondaryKeywords?.length > 0 && (
        <footer className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-wrap gap-2">
            {post.secondaryKeywords.map((kw) => (
              <span
                key={kw}
                className="inline-block rounded-full bg-primary-50 border border-primary-100 px-3 py-1 text-xs font-medium text-primary-800"
              >
                {kw}
              </span>
            ))}
          </div>
        </footer>
      )}

      {/* End-of-post CTA */}
      <div className="mt-12 rounded-2xl bg-primary-950 text-white p-8 text-center">
        <Fish className="h-8 w-8 text-gold-400 mx-auto mb-3" />
        <h2 className="font-display text-2xl mb-2">Fish these waters yourself</h2>
        <p className="text-slate-300 mb-6 max-w-md mx-auto">
          We run private charters out of Serangan every day — all-inclusive, hotel pickup,
          you keep the catch.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/trips"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary-950 hover:bg-sand-100 transition-colors"
          >
            Explore Trip Packages
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Make an Inquiry
          </Link>
        </div>
      </div>
    </article>
  );
}