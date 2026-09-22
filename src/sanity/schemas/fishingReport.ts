import { defineType, defineField } from "sanity";

export const fishingReport = defineType({
  name: "fishingReport",
  title: "Fishing Report",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "string", validation: (r) => r.max(160) }),
    defineField({ name: "reportDate", title: "Report Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "tripType", title: "Trip Type", type: "string", options: { list: ["Half Day", "Full Day", "Sunset", "Sharing", "Special"] } }),
    defineField({ name: "body", title: "Report (Markdown)", type: "text", rows: 20 }),
    defineField({ name: "catches", title: "Catches", type: "array", of: [{
      type: "object",
      fields: [
        defineField({ name: "species", title: "Species", type: "string" }),
        defineField({ name: "count", title: "Count", type: "number" }),
        defineField({ name: "weight", title: "Weight (kg)", type: "string" }),
        defineField({ name: "technique", title: "Technique Used", type: "string" }),
      ],
    }] }),
    defineField({ name: "weather", title: "Weather Conditions", type: "string" }),
    defineField({ name: "waterConditions", title: "Water Conditions", type: "string" }),
    defineField({ name: "waterTemp", title: "Water Temperature", type: "string" }),
    defineField({ name: "guestCount", title: "Guest Count", type: "number" }),
    defineField({ name: "highlights", title: "Trip Highlights", type: "text", rows: 3 }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: [{ title: "Draft", value: "draft" }, { title: "Published", value: "published" }] },
      initialValue: "draft",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "reportDate", media: "photos.0" },
    prepare: (sel) => ({ ...sel, subtitle: sel.subtitle ? new Date(sel.subtitle).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "" }),
  },
});
