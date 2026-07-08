import { NextResponse } from "next/server";
import { Resend } from "resend";
import { inquirySchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Honeypot check
    if (data.honeypot) {
      return NextResponse.json({ ok: true }); // silently reject bots
    }

    // Send email via Resend
    const packageNames: Record<string, string> = {
      "sharing-trip": "Sharing Trip",
      "sunset-trip": "Sunset Trip",
      "half-day-private": "Half Day Trip – Private",
      "three-quarter-day": "3/4 Day Trip",
      "jigging-casting-6hr": "6 Hours Jigging and Casting",
      "full-day": "Full Day Trip",
      "full-day-jigging-popping": "Full Day Trip – Jigging and Popping",
    };

    const text = `NEW BOOKING INQUIRY
====================

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}

Package: ${packageNames[data.packageSlug] || data.packageSlug}
Preferred Date: ${data.preferredDate}
Party Size: ${data.partySize} guest(s)

Message: ${data.message || "None"}

---
Reply to ${data.email} to respond to this inquiry.`;

    await resend.emails.send({
      from: "Bali Fishing Trips <onboarding@resend.dev>",
      to: ["dedikbali@yahoo.com"],
      subject: `New Inquiry: ${packageNames[data.packageSlug] || data.packageSlug} — ${data.name}`,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
