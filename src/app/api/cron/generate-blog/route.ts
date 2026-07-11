import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";
import { getNextTopic, generateBlogPost, parseBlogMarkdown } from "@/lib/blog-generator";

export const dynamic = "force-dynamic";

// Vercel Cron hits this endpoint on schedule
// Secured by CRON_SECRET so only Vercel can call it
export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const topic = getNextTopic();
    console.log(`[Blog Cron] Generating: "${topic.title}"`);

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
      status: "draft",
    });

    console.log(`[Blog Cron] Created draft: ${doc._id}`);

    return NextResponse.json({
      ok: true,
      postId: doc._id,
      title,
      slug,
    });
  } catch (err) {
    console.error("[Blog Cron] Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
