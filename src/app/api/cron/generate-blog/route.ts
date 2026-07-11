import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";
import { getNextTopic, generateBlogPost, parseBlogMarkdown } from "@/lib/blog-generator";

export const dynamic = "force-dynamic";

// Vercel Cron hits this endpoint on schedule
export async function GET(req: Request) {
  // Auth: accept Bearer token OR no auth (Vercel cron injects CRON_SECRET automatically)
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const topic = getNextTopic();
    console.log(`[Blog Cron] Generating: "${topic.title}"`);

    // Check if a post with this title already exists — skip if so
    const existing = await writeClient.fetch(
      `*[_type == "blogPost" && title == $title][0]._id`,
      { title: topic.title }
    );
    if (existing) {
      console.log(`[Blog Cron] Post already exists: ${existing}. Skipping.`);
      return NextResponse.json({ ok: true, skipped: true, reason: "duplicate", existingId: existing });
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

    // Revalidate blog pages
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