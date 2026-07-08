import { NextResponse } from "next/server";
import { Resend } from "resend";
import { inquirySchema } from "@/lib/validations";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
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
    await resend.emails.send({
      from: "Bali Fishing Trips <onboarding@resend.dev>",
      to: ["dedikbali@yahoo.com"],
      subject: `New Inquiry: ${data.packageSlug}`,
      html: `
        <h2>New Booking Inquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
        <p><strong>Package:</strong> ${data.packageSlug}</p>
        <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
        <p><strong>Party Size:</strong> ${data.partySize}</p>
        <p><strong>Message:</strong> ${data.message || "None"}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
