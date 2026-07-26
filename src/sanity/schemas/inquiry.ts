import { defineField, defineType } from "sanity";

export default defineType({
  name: "inquiry",
  title: "Inquiries",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "packageSlug",
      title: "Package",
      type: "string",
      options: {
        list: [
          { title: "Sharing Trip", value: "sharing-trip" },
          { title: "Sunset Trip", value: "sunset-trip" },
          { title: "Half Day Trip – Private", value: "half-day-private" },
          { title: "3/4 Day Trip", value: "three-quarter-day" },
          { title: "6 Hours Jigging and Casting", value: "jigging-casting-6hr" },
          { title: "Full Day Trip", value: "full-day" },
          { title: "Full Day Trip – Jigging and Popping", value: "full-day-jigging-popping" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "preferredDate",
      title: "Preferred Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "partySize",
      title: "Party Size",
      type: "number",
      validation: (rule) => rule.min(1).max(8),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Viewed", value: "viewed" },
          { title: "Replied", value: "replied" },
          { title: "Booked", value: "booked" },
        ],
      },
      initialValue: "new",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "newestFirst",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
    {
      title: "Status",
      name: "byStatus",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "packageSlug",
      status: "status",
    },
    prepare({ title, subtitle, status }) {
      const statusLabels: Record<string, string> = {
        new: "🆕 New",
        viewed: "👁️ Viewed",
        replied: "✉️ Replied",
        booked: "✅ Booked",
      };
      return {
        title,
        subtitle: `${statusLabels[status] || status} — ${subtitle}`,
      };
    },
  },
});
