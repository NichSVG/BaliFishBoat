import { defineType, defineField } from "sanity";

export const charter = defineType({
  name: "charter",
  title: "Charter Info",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Business Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        defineField({ name: "area", title: "Area", type: "string" }),
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "region", title: "Region", type: "string" }),
        defineField({ name: "mapUrl", title: "Map URL", type: "url" }),
      ],
    }),
    defineField({
      name: "ratingSnapshot",
      title: "Rating Snapshot",
      type: "object",
      fields: [
        defineField({ name: "overall", title: "Overall", type: "number" }),
        defineField({ name: "reviewCount", title: "Review Count", type: "number" }),
      ],
    }),
    defineField({
      name: "boat",
      title: "Boat Details",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Boat Name", type: "string" }),
        defineField({ name: "category", title: "Category", type: "string" }),
        defineField({ name: "manufacturer", title: "Manufacturer", type: "string" }),
        defineField({ name: "lengthFt", title: "Length (ft)", type: "number" }),
        defineField({ name: "yearBuilt", title: "Year Built", type: "number" }),
        defineField({ name: "capacityPersons", title: "Capacity (persons)", type: "number" }),
        defineField({ name: "engine", title: "Engine", type: "string" }),
        defineField({ name: "amenities", title: "Amenities", type: "array", of: [{ type: "string" }] }),
      ],
    }),
    defineField({ name: "includedAsStandard", title: "Included as Standard", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "targetSpecies", title: "Target Species", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "techniques", title: "Techniques", type: "array", of: [{ type: "string" }] }),
  ],
});
