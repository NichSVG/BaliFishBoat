import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
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

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <SchemaMarkup schema={[blogSchema, breadcrumbSchema]} />

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
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
                className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
              >
                {kw}
              </span>
            ))}
          </div>
        </footer>
      )}

      <div className="mt-12 p-6 bg-blue-50 rounded-2xl text-center">
        <p className="text-slate-700 mb-4">
          Want to experience Bali fishing for yourself? We run charters out of Serangan every day.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Make an Inquiry
        </Link>
      </div>
    </article>
  );
}