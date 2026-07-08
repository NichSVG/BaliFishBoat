import { defineType, defineField } from "sanity";

export const tripPackage = defineType({
  name: "tripPackage",
  title: "Trip Package",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "durationHours", title: "Duration (hours)", type: "number", validation: (r) => r.required().min(1) }),
    defineField({ name: "startTime", title: "Start Time", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "bookingType",
      title: "Booking Type",
      type: "string",
      options: { list: ["shared", "private"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "maxGuestsIncluded", title: "Max Guests", type: "number", validation: (r) => r.required().min(1) }),
    defineField({ name: "priceUsd", title: "Price (USD)", type: "number", validation: (r) => r.required().min(0) }),
    defineField({ name: "includes", title: "Includes", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "description", title: "Description", type: "text", validation: (r) => r.required() }),
  ],
});
