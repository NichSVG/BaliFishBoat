import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Customer Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "country", title: "Country", type: "string" }),
    defineField({ name: "rating", title: "Rating (1-5)", type: "number", validation: (r) => r.required().min(1).max(5) }),
    defineField({ name: "tripType", title: "Trip Type", type: "string" }),
    defineField({ name: "quote", title: "Quote", type: "text", validation: (r) => r.required() }),
  ],
});
