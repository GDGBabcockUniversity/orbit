export const RAFFLE_CONFIG = {
  totalTickets: 500,
  ticketPrice: 1000,
  discountPer5: 0,
  drawDate: new Date("2026-04-01T10:00:00"),
  prizeName: "Premium Tech Gear",
  currency: "NGN",
};

export const RAFFLE_PRESETS = [1, 3, 5] as const;

/** Must attend live draw; absent when called = forfeit. Shown on raffle page. */
export const RAFFLE_ATTENDANCE_CLAUSE =
  "All participants must pick up their physical tickets on the day of the event and be physically present at the live draw. If your ticket number is called and you are not in attendance, you will forfeit the prize. Note: If you previously bought tickets at ₦2,000, your ticket count has been automatically doubled!";

export function calculatePrice(qty: number): number {
  return (
    qty * RAFFLE_CONFIG.ticketPrice -
    Math.floor(qty / 5) * RAFFLE_CONFIG.discountPer5
  );
}

export function formatNaira(amount: number): string {
  return `\u20A6${amount.toLocaleString()}`;
}

export function padTicketNumber(n: number): string {
  return n.toString().padStart(4, "0");
}

export const RAFFLE_FAQS = [
  {
    question: "How much does a raffle ticket cost?",
    answer: "Each ticket costs \u20A61,000.",
  },
  {
    question: "What is the prize?",
    answer:
      "We're giving away top-tier tech to elevate your workflow and keep you powered up. You won't want to miss it!",
  },
  {
    question: "How do I get my tickets?",
    answer:
      "Ticket numbers are automatically assigned after your payment is confirmed and sent via email. However, you MUST pick up your physical tickets at the registration desk on the day of the event to participate.",
  },
  {
    question: "I bought a ticket when it was \u20A62,000. What happens now?",
    answer:
      "Because the price has been updated to \u20A61,000, anyone who purchased at the old price has automatically been credited with double the amount of tickets! You will be able to pick up all your physical tickets on the day of the event.",
  },
  {
    question: "How is the winner selected?",
    answer:
      "The winner is selected using a live digital raffle draw with a true random number generator. The draw is transparent and cannot be manipulated by anyone, including administrators. You must be physically present at the draw when your ticket number is called to claim the prize.",
  },
  {
    question: "Can I buy multiple tickets?",
    answer:
      "Yes! You can buy 1, 3, 5, or any custom number of tickets. The more you buy, the better your chances of winning.",
  },
  {
    question: "How will I know if I win?",
    answer:
      "The winning ticket number will be announced during a live draw event. The winner will also be contacted via phone and email. All participants must be in attendance at the draw. If your ticket is called and you are not present, you forfeit the prize and another draw may be held at the organizers\u2019 discretion.",
  },
  {
    question: "Do I have to be present at the draw?",
    answer:
      "Yes. Being in attendance is a requirement. If your ticket number is called and you are not physically present at the event, you will forfeit the prize. Physical ticket pickup on the day of the event is also required.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all payment methods supported by Paystack, including bank cards, bank transfers, and USSD.",
  },
];
