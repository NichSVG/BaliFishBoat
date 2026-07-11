import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { writeClient } from "@/sanity/client";
import { getNextTopic, generateBlogPost, parseBlogMarkdown } from "@/lib/blog-generator";

export const dynamic = "force-dynamic";

// Vercel Cron hits this endpoint on schedule
export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all existing blog post titles to avoid duplicates
    const existingPosts: { title: string; slug: string }[] = await writeClient.fetch(
      `*[_type == "blogPost"]{ title, "slug": slug.current }`
    );
    const existingTitles = existingPosts.map((p) => p.title);
    const existingSlugs = existingPosts.map((p) => p.slug);

    // Pick the next topic that doesn't duplicate
    const topic = getNextTopic(existingTitles);
    console.log(`[Blog Cron] Generating: "${topic.title}"`);

    // Double-check by title (in case AI changes it slightly, we also check slug later)
    const lowerExisting = existingTitles.map((t) => t.toLowerCase());
    if (lowerExisting.includes(topic.title.toLowerCase())) {
      console.log(`[Blog Cron] Topic already exists. Skipping.`);
      return NextResponse.json({ ok: true, skipped: true, reason: "duplicate topic" });
    }

    const raw = await generateBlogPost(topic);
    const { metaDescription, title, body, internalLinks } = parseBlogMarkdown(raw);

    if (!title || !body) {
      throw new Error("Failed to parse blog post content from AI response");
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 96);

    // Check if slug already exists — skip if so
    if (existingSlugs.includes(slug)) {
      console.log(`[Blog Cron] Slug "${slug}" already exists. Skipping.`);
      return NextResponse.json({ ok: true, skipped: true, reason: "duplicate slug", slug });
    }

    // Auto-publish so it shows on the site immediately
    const doc = await writeClient.create({
      _type: "blogPost",
      title,
      slug: { _type: "slug", current: slug },
      metaDescription,
      primaryKeyword: topic.primaryKeyword,
      secondaryKeywords: topic.secondaryKeywords,
      publishedAt: new Date().toISOString(),
      body,
      internalLinks,
      status: "published",
    });

    console.log(`[Blog Cron] Created published post: ${doc._id}`);

    // Revalidate blog pages so the new post appears immediately
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      ok: true,
      postId: doc._id,
      title,
      slug,
      url: `/blog/${slug}`,
      status: "published",
    });
  } catch (err) {
    console.error("[Blog Cron] Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}