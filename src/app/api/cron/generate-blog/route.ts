import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { writeClient } from "@/sanity/client";
import {
  getNextTopicWithAI,
  generateBlogPost,
  parseBlogMarkdown,
  normalizeTitle,
} from "@/lib/blog-generator";

export const dynamic = "force-dynamic";

// Best-effort email so a failed/skipped run doesn't go unnoticed for weeks.
async function sendAlert(subject: string, text: string) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Bali Fishing Trips <noreply@balifishboat.com>",
      to: ["dedikbali@yahoo.com"],
      subject,
      text,
    });
  } catch (err) {
    console.error("[Blog Cron] Failed to send alert email:", err);
  }
}

// Vercel Cron hits this endpoint on schedule
export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all existing blog post titles/keys to avoid duplicates
    const existingPosts: { title: string; slug: string; topicKey?: string }[] =
      await writeClient.fetch(
        `*[_type == "blogPost"]{ title, "slug": slug.current, topicKey }`
      );
    const existingTitles = existingPosts.map((p) => p.title);
    const existingSlugs = existingPosts.map((p) => p.slug);
    const existingKeys = existingPosts.map((p) => p.topicKey).filter((k): k is string => !!k);

    // Pick the next topic. Uses the curated bank first, then falls back to
    // AI-generated on-topic ideas once the bank is exhausted.
    const topic = await getNextTopicWithAI(existingTitles, existingKeys);
    console.log(`[Blog Cron] Generating: "${topic.title}"`);

    // Double-check by stable topic key, normalised so AI rewording still matches
    const usedKeys = new Set([...existingTitles, ...existingKeys].map(normalizeTitle));
    if (usedKeys.has(normalizeTitle(topic.title))) {
      console.log(`[Blog Cron] Topic already exists. Skipping.`);
      // This means every topic in the bank has a post — the schedule would
      // otherwise keep silently skipping forever.
      await sendAlert(
        "BaliFishBoat blog: topic bank exhausted",
        `The blog cron ran but every topic in BLOG_TOPICS already has a post, so nothing was published.\n\n` +
          `Add new topics to src/lib/blog-generator.ts (BLOG_TOPICS) to resume automatic publishing.`
      );
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
      topicKey: normalizeTitle(topic.title),
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
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Blog Cron] Error:", err);
    await sendAlert(
      "BaliFishBoat blog: scheduled post FAILED",
      `The scheduled blog post failed to publish.\n\nError:\n${message}\n\n` +
        `Check the AI provider API key/quota (GROQ_API_KEY or OPENROUTER_API_KEY) and Vercel cron logs.`
    );
    return NextResponse.json({ error: message }, { status: 500 });
  }
}