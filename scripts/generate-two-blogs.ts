import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx > 0) {
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    process.env[key] = val;
  }
}

async function main() {
  const { writeClient } = await import("../src/sanity/client");
  const { BLOG_TOPICS, generateBlogPost, parseBlogMarkdown } = await import("../src/lib/blog-generator");

  // Pick topics 2 and 3 (index 1 and 2) — skip topic 0 which was already generated
  const topicsToGenerate = [BLOG_TOPICS[1], BLOG_TOPICS[2]];

  for (const topic of topicsToGenerate) {
    console.log(`\n--- Generating: "${topic.title}" ---`);
    console.log(`Primary keyword: ${topic.primaryKeyword}`);

    const raw = await generateBlogPost(topic);
    const { metaDescription, title, body, internalLinks } = parseBlogMarkdown(raw);

    console.log(`Title: ${title}`);
    console.log(`Meta: ${metaDescription}`);
    console.log(`Body length: ${body.length} chars`);
    console.log(`Internal links: ${internalLinks.length}`);

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
      status: "published",
    });

    console.log(`Created: ${doc._id}`);
    console.log(`URL: https://balifishboat.com/blog/${slug}`);
  }
}

main().catch(console.error);