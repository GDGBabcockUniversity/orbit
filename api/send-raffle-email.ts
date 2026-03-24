import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable is not set");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { fullName, email, ticketNumbers } = req.body;

    if (!email || !fullName || !ticketNumbers?.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const ticketList = (ticketNumbers as string[])
      .map(
        (t: string) =>
          `<li style="display:inline-block;background:#7b00ff22;color:#a040ff;border:1px solid #7b00ff44;border-radius:8px;padding:6px 16px;margin:4px;font-weight:bold;font-size:18px;letter-spacing:2px;">#${t}</li>`,
      )
      .join("");

    const { data, error } = await resend.emails.send({
      from: "ORBIT <hello@gdgbabcock.com>",
      to: email,
      subject: "🎟️ Your Raffle Tickets Are Confirmed!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <h1 style="color: #7b00ff; margin-bottom: 24px;">You're in the draw, ${fullName}! 🎉</h1>

          <p>Your raffle ticket purchase has been confirmed. Here are your ticket numbers:</p>

          <div style="text-align: center; margin: 32px 0;">
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${ticketList}
            </ul>
          </div>

          <div style="background-color: #f3f4f6; border-radius: 12px; padding: 24px; margin: 32px 0;">
            <p style="margin: 0; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Purchase Details</p>
            <p style="margin: 8px 0 4px 0;"><strong>Name:</strong> ${fullName}</p>
            <p style="margin: 4px 0 4px 0;"><strong>Tickets:</strong> ${ticketNumbers.length}</p>
            <p style="margin: 4px 0;"><strong>Prize:</strong> Premium Tech Gear</p>
          </div>

          <p>Keep this email safe — these ticket numbers are your entry into the raffle draw. <strong>You must pick up your physical tickets at the registration desk on the day of the event.</strong> The draw will be held live, and you must be physically present to win.</p>

          <p style="margin-top: 40px;">Good luck!<br>The ORBIT Team</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (error: unknown) {
    console.error("Raffle email error:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
}
