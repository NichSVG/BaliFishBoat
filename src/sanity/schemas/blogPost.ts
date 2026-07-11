import { defineType, defineField } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "string",
      validation: (r) => r.max(160),
    }),
    defineField({
      name: "primaryKeyword",
      title: "Primary Keyword",
      type: "string",
    }),
    defineField({
      name: "secondaryKeywords",
      title: "Secondary Keywords",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "body",
      title: "Body (Markdown)",
      type: "text",
      rows: 30,
    }),
    defineField({
      name: "internalLinks",
      title: "Internal Link Opportunities",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "anchor", title: "Anchor Text", type: "string" }),
            defineField({ name: "note", title: "Note", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
      },
      initialValue: "draft",
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image (1200x630)",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "primaryKeyword", media: "status" },
  },
});
