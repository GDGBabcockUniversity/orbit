import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY || "re_test_key");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { fullName, email, role, organization } = req.body;

    if (!email || !fullName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const { data, error } = await resend.emails.send({
      from: "ORBIT <hello@gdgbabcock.com>", // Replace with a verified domain
      to: email,
      subject: "🎟️ Your Ticket to ORBIT 1.0 is Confirmed!",
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <h1 style="color: #ef4444; margin-bottom: 24px;">You're in, ${fullName}! 🎉</h1>

          <p>This email confirms your registration for <strong>ORBIT 1.0</strong>.</p>

          <p>We are thrilled to have you join the convergence of campus and industry at Babcock University from <strong>March 29 - April 2, 2026</strong>.</p>

          <div style="background-color: #f3f4f6; border-radius: 12px; padding: 24px; margin: 32px 0;">
            <p style="margin: 0; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Registration Details</p>
            <p style="margin: 8px 0 4px 0;"><strong>Name:</strong> ${fullName}</p>
            <p style="margin: 4px 0 4px 0;"><strong>Role:</strong> ${role}</p>
            <p style="margin: 4px 0 0 0;"><strong>Organization:</strong> ${organization || "N/A"}</p>
          </div>

          <p>More details regarding the schedule, speakers, and venues will be sent to this email address closer to the event.</p>

          <p>If you have any questions in the meantime, feel free to reply directly to this email.</p>

          <p style="margin-top: 40px;">Best regards,<br>The ORBIT Team</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (error: unknown) {
    console.error("Resend API Error:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
}
