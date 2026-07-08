import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  packageSlug: z.string().min(1, "Please select a package"),
  preferredDate: z.string().min(1, "Preferred date required"),
  partySize: z.coerce
    .number()
    .min(1, "At least 1 guest")
    .max(8, "Maximum 8 guests"),
  message: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
