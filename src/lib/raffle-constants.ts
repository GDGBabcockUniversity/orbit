export const RAFFLE_CONFIG = {
  totalTickets: 2000,
  ticketPrice: 2000,
  discountPer5: 1000,
  drawDate: new Date("2026-04-01T10:00:00"),
  prizeName: "Apple MacBook Air (M2, 13-inch)",
  currency: "NGN",
};

export const RAFFLE_PRESETS = [1, 3, 5] as const;

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
    answer:
      "Each ticket costs \u20A62,000. You get a \u20A61,000 discount for every 5 tickets you buy. For example, 5 tickets cost \u20A69,000 instead of \u20A610,000.",
  },
  {
    question: "What is the prize?",
    answer:
      "The grand prize is a brand-new Apple MacBook Air (M2, 13-inch). One lucky winner takes it home!",
  },
  {
    question: "How are ticket numbers assigned?",
    answer:
      "Ticket numbers are automatically assigned after your payment is confirmed. You\u2019ll see your numbers immediately and receive them via email.",
  },
  {
    question: "How is the winner selected?",
    answer:
      "The winner is selected using a live digital raffle draw with a true random number generator. The draw is transparent and cannot be manipulated by anyone, including administrators.",
  },
  {
    question: "Can I buy multiple tickets?",
    answer:
      "Yes! You can buy 1, 3, 5, or any custom number of tickets. The more you buy, the better your chances of winning.",
  },
  {
    question: "How will I know if I win?",
    answer:
      "The winning ticket number will be announced during a live draw event. The winner will also be contacted via phone and email.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all payment methods supported by Paystack, including bank cards, bank transfers, and USSD.",
  },
];
