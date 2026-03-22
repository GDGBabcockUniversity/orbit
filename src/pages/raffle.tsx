import { useState, useEffect, useCallback } from "react";
import {
  doc,
  getDoc,
  setDoc,
  runTransaction,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import {
  RAFFLE_CONFIG,
  RAFFLE_PRESETS,
  RAFFLE_FAQS,
  RAFFLE_ATTENDANCE_CLAUSE,
  calculatePrice,
  formatNaira,
  padTicketNumber,
} from "../lib/raffle-constants";

function RaffleAttendanceNotice({ className = "" }: { className?: string }) {
  return (
    <p
      className={`rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 text-amber-100/90 font-google-sans text-xs leading-relaxed ${className}`}
    >
      <strong className="font-semibold text-amber-200">
        Attendance required:
      </strong>{" "}
      {RAFFLE_ATTENDANCE_CLAUSE}
    </p>
  );
}

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "";

// ---------------------------------------------------------------------------
// Countdown hook
// ---------------------------------------------------------------------------
function useCountdown(target: Date) {
  const calc = useCallback(() => {
    const diff = Math.max(target.getTime() - Date.now(), 0);
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff / 3_600_000) % 24),
      minutes: Math.floor((diff / 60_000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [target]);

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);

  return time;
}

// ---------------------------------------------------------------------------
// Paystack inline loader
// ---------------------------------------------------------------------------
function loadPaystack(): Promise<void> {
  if (document.getElementById("paystack-script")) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.id = "paystack-script";
    s.src = "https://js.paystack.co/v2/inline.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Paystack"));
    document.head.appendChild(s);
  });
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
type PageView = "landing" | "confirmation";

interface BuyerInfo {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  level: string;
}

const RafflePage = () => {
  const [view, setView] = useState<PageView>("landing");
  const [quantity, setQuantity] = useState(1);
  const [customQty, setCustomQty] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [buyer, setBuyer] = useState<BuyerInfo>({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    level: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [assignedTickets, setAssignedTickets] = useState<string[]>([]);
  const [ticketsSold, setTicketsSold] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const countdown = useCountdown(RAFFLE_CONFIG.drawDate);
  // const price = calculatePrice(quantity);
  const remaining = RAFFLE_CONFIG.totalTickets - ticketsSold;
  const soldOut = remaining <= 0;
  const progress = Math.min(
    (ticketsSold / RAFFLE_CONFIG.totalTickets) * 100,
    100,
  );

  // Fetch ticket counter
  useEffect(() => {
    const ref = doc(db, "raffle_meta", "counter");
    getDoc(ref)
      .then((snap) => {
        if (snap.exists()) setTicketsSold(snap.data().count ?? 0);
      })
      .catch((err) => {
        console.error("Error fetching ticket counter:", err);
      });
  }, []);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setBuyer((prev) => ({ ...prev, [name]: value }));
  };

  const effectiveQty = isCustom
    ? Math.max(1, parseInt(customQty) || 1)
    : quantity;

  // ---- Paystack + purchase flow ----
  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!PAYSTACK_PUBLIC_KEY) {
      setError("Payment is not configured. Please contact the organizers.");
      return;
    }

    if (effectiveQty > remaining) {
      setError(`Only ${remaining} tickets remaining.`);
      return;
    }

    setLoading(true);

    try {
      await loadPaystack();

      const amountKobo = calculatePrice(effectiveQty) * 100;

      // Open Paystack popup
      const paystack = new (window as any).PaystackPop();
      paystack.newTransaction({
        key: PAYSTACK_PUBLIC_KEY,
        email: buyer.email,
        amount: amountKobo,
        currency: "NGN",
        channels: ["card", "bank", "ussd", "bank_transfer"],
        metadata: {
          custom_fields: [
            {
              display_name: "Full Name",
              variable_name: "full_name",
              value: buyer.fullName,
            },
            {
              display_name: "Phone",
              variable_name: "phone",
              value: buyer.phone,
            },
            {
              display_name: "Quantity",
              variable_name: "quantity",
              value: effectiveQty,
            },
          ],
        },
        onSuccess: async (transaction: { reference: string }) => {
          try {
            // 1. Verify payment server-side
            const verifyRes = await fetch("/api/raffle-verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                reference: transaction.reference,
                expectedAmount: amountKobo,
              }),
            });

            if (!verifyRes.ok) {
              const errBody = await verifyRes.json().catch(() => ({}));
              console.error("Verify failed:", verifyRes.status, errBody);
              throw new Error(
                errBody.detail ||
                  errBody.message ||
                  "Payment verification failed. Please contact support.",
              );
            }

            // 2. Assign tickets via Firestore transaction
            const counterRef = doc(db, "raffle_meta", "counter");
            const tickets = await runTransaction(db, async (tx) => {
              const counterSnap = await tx.get(counterRef);
              const currentCount = counterSnap.exists()
                ? counterSnap.data().count
                : 0;

              if (currentCount + effectiveQty > RAFFLE_CONFIG.totalTickets) {
                throw new Error("Not enough tickets remaining.");
              }

              const newCount = currentCount + effectiveQty;
              tx.update(counterRef, { count: newCount });

              const nums: number[] = [];
              for (let i = 1; i <= effectiveQty; i++) {
                nums.push(currentCount + i);
              }
              return nums;
            });

            // 3. Create ticket docs + purchase record
            const ticketNumbers = tickets.map(padTicketNumber);
            const purchaseData = {
              buyerName: buyer.fullName,
              buyerEmail: buyer.email.toLowerCase().trim(),
              buyerPhone: buyer.phone,
              department: buyer.department,
              level: buyer.level,
              quantity: effectiveQty,
              amountPaid: calculatePrice(effectiveQty),
              ticketNumbers,
              paymentRef: transaction.reference,
              createdAt: serverTimestamp(),
            };

            await setDoc(
              doc(db, "raffle_purchases", transaction.reference),
              purchaseData,
            );

            for (const num of ticketNumbers) {
              await setDoc(doc(collection(db, "raffle_tickets"), num), {
                ticketNumber: num,
                buyerName: buyer.fullName,
                buyerEmail: buyer.email.toLowerCase().trim(),
                buyerPhone: buyer.phone,
                department: buyer.department,
                level: buyer.level,
                paymentRef: transaction.reference,
                purchasedAt: serverTimestamp(),
              });
            }

            // 4. Send confirmation email (fire-and-forget)
            fetch("/api/send-raffle-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                fullName: buyer.fullName,
                email: buyer.email,
                ticketNumbers,
              }),
            }).catch(() => {});

            setAssignedTickets(ticketNumbers);
            setTicketsSold((prev) => prev + effectiveQty);
            setView("confirmation");
          } catch (err: unknown) {
            setError(
              (err as Error).message || "Something went wrong after payment.",
            );
          } finally {
            setLoading(false);
          }
        },
        onCancel: () => {
          setLoading(false);
        },
      });
    } catch (err: unknown) {
      setError((err as Error).message || "Could not initialize payment.");
      setLoading(false);
    }
  };

  // ---- Confirmation view ----
  if (view === "confirmation") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="hero-planet-glow opacity-50" />
        <div className="z-10 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 max-w-lg w-full text-center backdrop-blur-md">
          <div className="size-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-6">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="font-space-grotesk text-3xl font-bold text-white mb-4">
            You&rsquo;re In the Draw!
          </h2>
          <p className="text-white/70 font-google-sans mb-6">
            You successfully purchased{" "}
            <span className="text-white font-medium">
              {assignedTickets.length}
            </span>{" "}
            {assignedTickets.length === 1 ? "ticket" : "tickets"}. Good luck!
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {assignedTickets.map((t) => (
              <span
                key={t}
                className="inline-flex items-center bg-primary/20 text-primary-bright border border-primary/30 px-4 py-2 rounded-xl font-space-grotesk text-lg font-bold tracking-wider"
              >
                #{t}
              </span>
            ))}
          </div>

          <p className="text-white/50 font-google-sans text-sm mb-6">
            A confirmation email has been sent to{" "}
            <span className="text-white">{buyer.email}</span>.
          </p>

          {/* <RaffleAttendanceNotice className="mb-8 text-left text-sm" /> */}

          <button
            onClick={() => {
              setView("landing");
              setBuyer({
                fullName: "",
                email: "",
                phone: "",
                department: "",
                level: "",
              });
              setQuantity(1);
              setCustomQty("");
              setIsCustom(false);
              setAssignedTickets([]);
            }}
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-google-sans px-8 py-3 rounded-full transition"
          >
            Buy More Tickets
          </button>
        </div>
      </div>
    );
  }

  // ---- Landing view ----
  return (
    <div className="min-h-screen bg-background">
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div className="hero-planet-glow" />
        <div className="hero-aurora-bars">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="hero-aurora-bar" />
          ))}
        </div>
        <div className="hero-grain" />

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-28 md:py-32 text-center">
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm text-white text-[11px] font-google-sans tracking-[0.15em] uppercase px-5 py-2.5 rounded-full border border-white/10 mb-8">
            <span className="size-2 rounded-full bg-green-400 shrink-0" />
            Orbit Grand Tech Raffle
          </div>

          <h1 className="font-space-grotesk font-bold leading-[1.05] text-[clamp(2.4rem,6vw,4.5rem)] text-white max-w-3xl">
            Upgrade Your Tech Arsenal
          </h1>

          <p className="mt-4 text-white/50 font-google-sans text-base md:text-lg max-w-xl leading-relaxed">
            Buy a raffle ticket for just{" "}
            {formatNaira(RAFFLE_CONFIG.ticketPrice)} and stand a chance to win
            an <span className="text-white/80">{RAFFLE_CONFIG.prizeName}</span>.
          </p>

          {/* <RaffleAttendanceNotice className="mx-auto mt-5 max-w-xl text-sm md:text-[0.95rem]" /> */}

          {/* Countdown */}
          <div className="mt-10">
            <p className="text-white/40 font-google-sans text-xs uppercase tracking-[0.2em] mb-4">
              Raffle Draw In
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              {(
                [
                  { label: "DAYS", value: countdown.days },
                  { label: "HRS", value: countdown.hours },
                  { label: "MIN", value: countdown.minutes },
                  { label: "SEC", value: countdown.seconds },
                ] as const
              ).map((unit, i, arr) => (
                <div
                  key={unit.label}
                  className="flex items-center gap-3 sm:gap-4 font-semibold"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-space-grotesk text-white text-4xl sm:text-5xl tracking-wider tabular-nums">
                      {unit.value.toString().padStart(2, "0")}
                    </span>
                    <span className="font-google-sans text-white/40 text-[10px] tracking-[0.2em] mt-1">
                      {unit.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-white/20 text-3xl sm:text-4xl font-light -mt-4">
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ticket counter */}
          <div className="mt-10 w-full max-w-sm hidden">
            <div className="flex justify-between text-xs font-google-sans text-white/50 mb-2">
              <span>{ticketsSold.toLocaleString()} sold</span>
              <span>{remaining.toLocaleString()} remaining</span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-white/30 text-xs font-google-sans mt-2">
              {Math.round(progress)}% sold of{" "}
              {RAFFLE_CONFIG.totalTickets.toLocaleString()} total
            </p>
          </div>

          <a
            href="#buy"
            className="mt-10 bg-primary text-white font-google-sans text-sm tracking-wider px-8 py-3.5 rounded-full hover:bg-primary-mid transition inline-flex items-center gap-2.5"
          >
            Buy Ticket
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-4"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ==================== PRIZE DETAILS ==================== */}
      <section className="bg-background px-6 py-16 md:py-24 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-space-grotesk text-2xl md:text-3xl font-bold text-white mb-4">
            Premium Tech Prizes
          </h2>
          <p className="text-white/50 font-google-sans max-w-xl mx-auto mb-6">
            Lucky winners will walk away with top-of-the-line gear designed to
            fuel your next big idea. High performance, premium quality, and
            ready for you to take home.
          </p>

          {/* Floating MacBook */}
          <div className="relative mx-auto max-w-4xl my-8 md:my-12">
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-primary/15 rounded-full blur-[100px]" />
            <img
              src="/images/pngs/macbook-air-prize.png"
              alt={RAFFLE_CONFIG.prizeName}
              className="relative w-full drop-shadow-2xl animate-[float_4s_ease-in-out_infinite] rounded-3xl"
              style={{ mixBlendMode: "screen" }}
            />
          </div>

          {/* <h3 className="font-space-grotesk text-xl md:text-2xl font-bold text-white mb-4">
            {RAFFLE_CONFIG.prizeName}
          </h3>
         <ul className="flex flex-wrap justify-center gap-3 text-sm font-google-sans text-white/60">
            <li className="bg-white/5 border border-white/10 px-5 py-2 rounded-full">
              Apple M1 Chip
            </li>
            <li className="bg-white/5 border border-white/10 px-5 py-2 rounded-full">
              13&quot; Display
            </li>
            <li className="bg-white/5 border border-white/10 px-5 py-2 rounded-full">
              8GB RAM
            </li>
            <li className="bg-white/5 border border-white/10 px-5 py-2 rounded-full">
              256GB SSD
            </li>
            <li className="bg-white/5 border border-white/10 px-5 py-2 rounded-full">
              Up to 18h Battery
            </li>
          </ul>*/}
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
        `}</style>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="bg-background px-6 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-space-grotesk text-2xl md:text-3xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Pick Your Tickets",
                desc: "Choose how many tickets you want to buy.",
              },
              {
                step: "02",
                title: "Pay Securely",
                desc: "Complete payment via Paystack (card, transfer, or USSD).",
              },
              {
                step: "03",
                title: "Get Your Numbers",
                desc: "Receive your unique ticket numbers instantly.",
              },
              {
                step: "04",
                title: "Win Big",
                desc: "A random ticket is drawn live. If it\u2019s yours and you\u2019re present, you win\u2014you must be in attendance or you forfeit the prize.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
              >
                <span className="inline-block font-space-grotesk text-primary-bright text-3xl font-bold mb-3">
                  {item.step}
                </span>
                <h3 className="font-space-grotesk text-white font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-white/50 font-google-sans text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BUY TICKETS ==================== */}
      <section
        id="buy"
        className="bg-background px-6 py-16 md:py-24 border-t border-white/5"
      >
        <div className="max-w-xl mx-auto">
          <h2 className="font-space-grotesk text-2xl md:text-3xl font-bold text-white text-center mb-2">
            Buy Tickets
          </h2>
          <p className="text-white/50 font-google-sans text-center mb-10">
            {soldOut
              ? "All tickets have been sold. Thank you for participating!"
              : `${formatNaira(RAFFLE_CONFIG.ticketPrice)} per ticket \u2022 ${remaining.toLocaleString()} remaining`}
          </p>

          {soldOut ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
              <p className="font-space-grotesk text-2xl font-bold text-white mb-2">
                SOLD OUT
              </p>
              <p className="text-white/50 font-google-sans text-sm">
                All raffle tickets have been sold. Thank you for participating.
              </p>
              <RaffleAttendanceNotice className="mt-5 text-left text-sm" />
            </div>
          ) : (
            <form
              onSubmit={handlePurchase}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm"
            >
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-google-sans">
                  {error}
                </div>
              )}

              {/* Quantity selector */}
              <div className="mb-6">
                <label className="block text-sm font-google-sans text-white/70 mb-3">
                  How many tickets?
                </label>
                <div className="flex flex-wrap gap-2">
                  {RAFFLE_PRESETS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => {
                        setQuantity(n);
                        setIsCustom(false);
                      }}
                      className={`px-5 py-2.5 rounded-xl font-google-sans text-sm transition border ${
                        !isCustom && quantity === n
                          ? "bg-primary text-white border-primary"
                          : "bg-white/5 text-white/70 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {n} {n === 1 ? "Ticket" : "Tickets"}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setIsCustom(true)}
                    className={`px-5 py-2.5 rounded-xl font-google-sans text-sm transition border ${
                      isCustom
                        ? "bg-primary text-white border-primary"
                        : "bg-white/5 text-white/70 border-white/10 hover:border-white/20"
                    }`}
                  >
                    Custom
                  </button>
                </div>
                {isCustom && (
                  <input
                    type="number"
                    min="1"
                    max={remaining}
                    value={customQty}
                    onChange={(e) => setCustomQty(e.target.value)}
                    placeholder="Enter quantity"
                    className="mt-3 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-google-sans focus:outline-none focus:border-primary-bright transition"
                  />
                )}
              </div>

              {/* Price display */}
              <div className="bg-black/30 rounded-xl px-4 py-3 mb-6 flex items-center justify-between">
                <span className="font-google-sans text-white/50 text-sm">
                  {effectiveQty} {effectiveQty === 1 ? "ticket" : "tickets"}
                </span>
                <span className="font-space-grotesk text-white text-xl font-bold">
                  {formatNaira(calculatePrice(effectiveQty))}
                </span>
              </div>

              {/* Buyer info */}
              <div className="space-y-4 mb-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-google-sans text-white/70 mb-1.5"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={buyer.fullName}
                    onChange={handleInput}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-google-sans focus:outline-none focus:border-primary-bright transition"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-google-sans text-white/70 mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={buyer.email}
                    onChange={handleInput}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-google-sans focus:outline-none focus:border-primary-bright transition"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-google-sans text-white/70 mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={buyer.phone}
                    onChange={handleInput}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-google-sans focus:outline-none focus:border-primary-bright transition"
                    placeholder="08012345678"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="department"
                      className="block text-sm font-google-sans text-white/70 mb-1.5"
                    >
                      Department{" "}
                      <span className="text-white/30">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={buyer.department}
                      onChange={handleInput}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-google-sans focus:outline-none focus:border-primary-bright transition"
                      placeholder="Computer Science"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="level"
                      className="block text-sm font-google-sans text-white/70 mb-1.5"
                    >
                      Level <span className="text-white/30">(optional)</span>
                    </label>
                    <select
                      id="level"
                      name="level"
                      value={buyer.level}
                      onChange={handleInput}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-google-sans focus:outline-none focus:border-primary-bright transition appearance-none"
                    >
                      <option value="">Select...</option>
                      <option value="100">100 Level</option>
                      <option value="200">200 Level</option>
                      <option value="300">300 Level</option>
                      <option value="400">400 Level</option>
                      <option value="500">500 Level</option>
                    </select>
                  </div>
                </div>
              </div>

              <RaffleAttendanceNotice className="mb-6" />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-google-sans text-[15px] font-medium tracking-wide py-3.5 rounded-xl hover:bg-primary-mid transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin size-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Pay ${formatNaira(calculatePrice(effectiveQty))}`
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="bg-background px-6 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-space-grotesk text-2xl md:text-3xl font-bold text-white text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {RAFFLE_FAQS.map((faq, i) => (
              <div
                key={i}
                className={`border border-white/10 rounded-2xl overflow-hidden transition-colors ${
                  faqOpen === i ? "bg-white/5" : ""
                }`}
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                >
                  <span className="font-space-grotesk text-white font-semibold text-sm md:text-base pr-4">
                    {faq.question}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`size-5 text-white/50 shrink-0 transition-transform duration-300 ${
                      faqOpen === i ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    faqOpen === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 font-google-sans text-white/50 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RafflePage;
