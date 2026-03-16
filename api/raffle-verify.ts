import type { VercelRequest, VercelResponse } from "@vercel/node";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!PAYSTACK_SECRET_KEY) {
    console.error("[raffle-verify] PAYSTACK_SECRET_KEY is not set");
    return res.status(500).json({ message: "Payment configuration error" });
  }

  try {
    const { reference, expectedAmount } = req.body;

    if (!reference) {
      return res.status(400).json({ message: "Missing payment reference" });
    }

    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const payload = await verifyRes.json();

    console.log("[raffle-verify] Paystack response:", JSON.stringify({
      status: payload.status,
      dataStatus: payload.data?.status,
      dataAmount: payload.data?.amount,
      expectedAmount,
      message: payload.message,
    }));

    if (!payload.status) {
      return res.status(400).json({
        message: "Paystack verification request failed",
        detail: payload.message,
      });
    }

    if (payload.data?.status !== "success") {
      return res.status(400).json({
        message: `Payment status is "${payload.data?.status}", expected "success"`,
      });
    }

    if (expectedAmount && Number(payload.data.amount) !== Number(expectedAmount)) {
      console.error(
        `[raffle-verify] Amount mismatch: Paystack=${payload.data.amount}, expected=${expectedAmount}`,
      );
      return res.status(400).json({
        message: "Amount mismatch",
        detail: `Paystack amount: ${payload.data.amount}, expected: ${expectedAmount}`,
      });
    }

    return res.status(200).json({ verified: true });
  } catch (error: unknown) {
    console.error("[raffle-verify] Error:", error);
    return res.status(500).json({ message: "Verification failed" });
  }
}
