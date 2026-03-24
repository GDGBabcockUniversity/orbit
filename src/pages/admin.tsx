import { useState, useEffect, useRef, useCallback } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import {
  collection,
  query,
  getDocs,
  orderBy,
  updateDoc,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { RAFFLE_CONFIG, formatNaira } from "../lib/raffle-constants";

type Ticket = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  organization: string;
  checkedIn: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any;
};

type RaffleTicket = {
  ticketNumber: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  department: string;
  level: string;
  paymentRef: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  purchasedAt: any;
};

type AdminTab = "registrations" | "raffle";

// ---------------------------------------------------------------------------
// Draw Tool
// ---------------------------------------------------------------------------
const DrawTool = ({ raffleTickets }: { raffleTickets: RaffleTicket[] }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayNumber, setDisplayNumber] = useState("----");
  const [winner, setWinner] = useState<RaffleTicket | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startDraw = useCallback(() => {
    if (raffleTickets.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    let ticks = 0;
    const totalTicks = 30;
    intervalRef.current = setInterval(() => {
      const rand =
        raffleTickets[Math.floor(Math.random() * raffleTickets.length)];
      setDisplayNumber(rand.ticketNumber);
      ticks++;

      if (ticks >= totalTicks) {
        if (intervalRef.current) clearInterval(intervalRef.current);

        const arr = new Uint32Array(1);
        crypto.getRandomValues(arr);
        const winnerIndex = arr[0] % raffleTickets.length;
        const picked = raffleTickets[winnerIndex];

        setDisplayNumber(picked.ticketNumber);
        setWinner(picked);
        setIsSpinning(false);
      }
    }, 80);
  }, [raffleTickets, isSpinning]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm ${
        isFullscreen
          ? "flex flex-col items-center justify-center p-12 bg-background"
          : "p-6 md:p-8"
      }`}
    >
      <div className={`text-center ${isFullscreen ? "scale-150" : ""}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-space-grotesk text-lg font-bold text-white">
            Raffle Draw
          </h3>
          <button
            onClick={toggleFullscreen}
            className="text-white/50 hover:text-white transition bg-white/5 px-3 py-1.5 rounded-md text-sm font-google-sans"
          >
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>

        <div className="my-8">
          <p className="text-white/40 font-google-sans text-xs uppercase tracking-[0.2em] mb-4">
            {isSpinning ? "Drawing..." : winner ? "Winner" : "Ready to Draw"}
          </p>
          <div
            className={`font-space-grotesk font-bold tracking-[0.15em] tabular-nums transition-all ${
              isFullscreen ? "text-[8rem]" : "text-6xl md:text-8xl"
            } ${isSpinning ? "text-primary-bright animate-pulse" : "text-white"}`}
          >
            #{displayNumber}
          </div>
        </div>

        {winner && !isSpinning && (
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 mb-6 inline-block">
            <p className="font-space-grotesk text-xl font-bold text-white mb-1">
              {winner.buyerName}
            </p>
            <p className="font-google-sans text-white/70 text-sm">
              Ticket #{winner.ticketNumber}
            </p>
            <p className="font-google-sans text-white/50 text-sm">
              {winner.buyerPhone}
            </p>
            <p className="font-google-sans text-white/50 text-sm">
              {winner.buyerEmail}
            </p>
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={startDraw}
            disabled={isSpinning || raffleTickets.length === 0}
            className="bg-primary text-white font-google-sans font-medium px-8 py-3 rounded-xl hover:bg-primary-mid transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSpinning
              ? "Drawing..."
              : raffleTickets.length === 0
                ? "No Tickets Sold"
                : "Draw Winner"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Admin Page
// ---------------------------------------------------------------------------
const AdminPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>("registrations");

  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Registration Data State
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Raffle Data State
  const [raffleTickets, setRaffleTickets] = useState<RaffleTicket[]>([]);
  const [loadingRaffle, setLoadingRaffle] = useState(false);
  const [raffleSearch, setRaffleSearch] = useState("");
  const [ticketsSold, setTicketsSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const filteredTickets = tickets.filter(
    (t) =>
      t.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      t.fullName.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const filteredRaffleTickets = raffleTickets.filter(
    (t) =>
      t.buyerName.toLowerCase().includes(raffleSearch.toLowerCase()) ||
      t.buyerEmail.toLowerCase().includes(raffleSearch.toLowerCase()) ||
      t.buyerPhone.includes(raffleSearch) ||
      t.ticketNumber.includes(raffleSearch),
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
      if (currentUser) {
        fetchTickets();
        fetchRaffleData();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    try {
      if (email === "gdgbabcock@gmail.com") {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: unknown) {
      console.error("Login failed:", error);
      setLoginError("Invalid email or password.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setTickets([]);
    setRaffleTickets([]);
  };

  const fetchTickets = async () => {
    setLoadingData(true);
    try {
      const q = query(collection(db, "tickets"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const ticketsData: Ticket[] = [];
      querySnapshot.forEach((d) => {
        ticketsData.push({ id: d.id, ...d.data() } as Ticket);
      });
      setTickets(ticketsData);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchRaffleData = async () => {
    setLoadingRaffle(true);
    try {
      const counterSnap = await getDoc(doc(db, "raffle_meta", "counter"));
      if (counterSnap.exists()) {
        setTicketsSold(counterSnap.data().count ?? 0);
      }

      const q = query(
        collection(db, "raffle_tickets"),
        orderBy("purchasedAt", "desc"),
      );
      const snap = await getDocs(q);
      const data: RaffleTicket[] = [];
      snap.forEach((d) => {
        data.push(d.data() as RaffleTicket);
      });
      setRaffleTickets(data);

      const purchasesSnap = await getDocs(collection(db, "raffle_purchases"));
      let revenue = 0;
      purchasesSnap.forEach((d) => {
        revenue += d.data().amountPaid ?? 0;
      });
      setTotalRevenue(revenue);
    } catch (error) {
      console.error("Failed to fetch raffle data:", error);
    } finally {
      setLoadingRaffle(false);
    }
  };

  const checkIn = async (ticketEmail: string) => {
    try {
      await updateDoc(doc(db, "tickets", ticketEmail), { checkedIn: true });
      fetchTickets();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const doubleOldTickets = async () => {
    if (
      !window.confirm(
        "Are you sure you want to double tickets for old purchases (Price > 1000)? This will also email them.",
      )
    )
      return;

    setLoadingRaffle(true);
    try {
      const purchasesSnap = await getDocs(collection(db, "raffle_purchases"));
      const oldPurchases: any[] = [];
      purchasesSnap.forEach((d) => {
        const p = d.data();
        if (p.amountPaid / p.quantity > 1000) {
          oldPurchases.push(p);
        }
      });

      if (oldPurchases.length === 0) {
        alert("No old purchases found to double.");
        setLoadingRaffle(false);
        return;
      }

      const counterRef = doc(db, "raffle_meta", "counter");
      const emailsToSend: any[] = [];

      await runTransaction(db, async (tx) => {
        const counterSnap = await tx.get(counterRef);
        let currentCount = counterSnap.exists() ? counterSnap.data().count : 0;

        for (const p of oldPurchases) {
          const newTickets = [];
          for (let i = 0; i < p.quantity; i++) {
            currentCount++;
            const num = currentCount.toString().padStart(4, "0");
            newTickets.push(num);
            const newTicketRef = doc(collection(db, "raffle_tickets"), num);
            tx.set(newTicketRef, {
              ticketNumber: num,
              buyerName: p.buyerName,
              buyerEmail: p.buyerEmail,
              buyerPhone: p.buyerPhone,
              department: p.department,
              level: p.level,
              paymentRef: p.paymentRef + "_bonus",
              purchasedAt: serverTimestamp(),
            });
          }

          emailsToSend.push({
            fullName: p.buyerName,
            email: p.buyerEmail,
            ticketNumbers: newTickets,
          });

          const purchaseRef = doc(db, "raffle_purchases", p.paymentRef);
          tx.update(purchaseRef, {
            quantity: p.quantity * 2,
          });
        }

        tx.update(counterRef, { count: currentCount });
      });

      // Fire off emails
      for (const payload of emailsToSend) {
        try {
          await fetch("/api/send-raffle-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } catch (e) {
          console.error("Failed to send email to", payload.email, e);
        }
      }

      alert(
        `Successfully doubled tickets and sent emails for ${oldPurchases.length} purchases!`,
      );
      fetchRaffleData();
    } catch (error) {
      console.error("Error doubling tickets:", error);
      alert("Failed to double tickets. See console.");
    } finally {
      setLoadingRaffle(false);
    }
  };

  const refreshCurrent = () => {
    if (activeTab === "registrations") fetchTickets();
    else fetchRaffleData();
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="size-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-google-sans text-white/50">Loading Admin...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center flex flex-col items-center">
            <h1 className="font-space-grotesk text-2xl font-bold text-white mb-2">
              Admin Access
            </h1>
            <p className="text-white/50 font-google-sans text-sm">
              Sign in to view registrations
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
          >
            {loginError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {loginError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-google-sans text-white/70 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white font-google-sans focus:outline-none focus:border-primary-bright transition"
                />
              </div>
              <div>
                <label className="block text-sm font-google-sans text-white/70 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white font-google-sans focus:outline-none focus:border-primary-bright transition"
                />
              </div>
              <button
                type="submit"
                disabled={isLoggingIn || email !== "gdgbabcock@gmail.com"}
                className="w-full mt-2 bg-primary text-white py-3 rounded-lg font-google-sans transition hover:bg-primary-mid disabled:opacity-50"
              >
                {isLoggingIn ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- Dashboard ---
  return (
    <div className="min-h-screen bg-background mt-20">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 sticky top-0 z-10 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-white font-space-grotesk font-bold text-xl hidden md:block">
            ORBIT Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-4 text-sm font-google-sans text-white/70">
          <span className="hidden sm:inline-block">{user.email}</span>
          <button
            onClick={refreshCurrent}
            className="flex items-center gap-2 hover:text-white transition bg-white/5 px-3 py-1.5 rounded-md"
            title="Refresh Data"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="hidden sm:inline-block">Refresh</span>
          </button>
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 transition px-3 py-1.5 rounded-md hover:bg-red-500/10"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-white/10 px-6">
        <div className="max-w-7xl mx-auto flex gap-1">
          {(["registrations", "raffle"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 font-google-sans text-sm font-medium transition border-b-2 -mb-px ${
                activeTab === tab
                  ? "text-white border-primary"
                  : "text-white/50 border-transparent hover:text-white/70"
              }`}
            >
              {tab === "registrations" ? "Registrations" : "Raffle"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {activeTab === "registrations" ? (
          /* ============ REGISTRATIONS TAB ============ */
          <>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-space-grotesk font-bold text-white">
                  Event Registrations
                </h2>
                <p className="text-white/50 font-google-sans mt-1">
                  {tickets.length} {tickets.length === 1 ? "ticket" : "tickets"}{" "}
                  issued for ORBIT 1.0.
                </p>
              </div>
            </div>

            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by name or email address..."
              className="w-full bg-black/40 border border-white/10 my-8 rounded-2xl px-4 py-2.5 text-white font-google-sans focus:outline-none focus:border-primary-bright transition"
            />

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="px-6 py-4 font-google-sans text-sm font-medium text-white/50 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 font-google-sans text-sm font-medium text-white/50 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 font-google-sans text-sm font-medium text-white/50 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 font-google-sans text-sm font-medium text-white/50 uppercase tracking-wider">
                        Organization
                      </th>
                      <th className="px-6 py-4 font-google-sans text-sm font-medium text-white/50 uppercase tracking-wider">
                        Registered
                      </th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loadingData ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-12 text-center text-white/40 font-google-sans"
                        >
                          Loading data...
                        </td>
                      </tr>
                    ) : filteredTickets.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-12 text-center text-white/40 font-google-sans"
                        >
                          No registrations found yet.
                        </td>
                      </tr>
                    ) : (
                      filteredTickets.map((ticket) => (
                        <tr
                          key={ticket.id}
                          className="hover:bg-white/5 transition group"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-white font-medium font-google-sans">
                              {ticket.fullName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-white/70 font-google-sans text-sm">
                              {ticket.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary-bright border border-primary/30">
                              {ticket.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70 font-google-sans">
                            {ticket.organization || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white/50 font-google-sans">
                            {ticket.createdAt?.toDate
                              ? ticket.createdAt.toDate().toLocaleDateString()
                              : "Just now"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white/50 font-google-sans">
                            <button
                              type="button"
                              disabled={ticket.checkedIn}
                              onClick={() => checkIn(ticket.email)}
                              className={
                                "w-full mt-2 bg-primary text-white py-1 rounded-lg font-google-sans transition hover:bg-primary-mid disabled:opacity-50 cursor-pointer" +
                                (ticket.checkedIn ? " bg-black" : "")
                              }
                            >
                              {ticket.checkedIn ? "Checked In" : "Check In"}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* ============ RAFFLE TAB ============ */
          <>
            {/* Stats cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Total Tickets",
                  value: RAFFLE_CONFIG.totalTickets.toLocaleString(),
                },
                { label: "Sold", value: ticketsSold.toLocaleString() },
                {
                  label: "Remaining",
                  value: (
                    RAFFLE_CONFIG.totalTickets - ticketsSold
                  ).toLocaleString(),
                },
                { label: "Revenue", value: formatNaira(totalRevenue) },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm"
                >
                  <p className="text-white/50 font-google-sans text-xs uppercase tracking-wider mb-1">
                    {stat.label}
                  </p>
                  <p className="font-space-grotesk text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Draw Tool */}
            <div className="mb-8">
              <DrawTool raffleTickets={raffleTickets} />
            </div>

            <div className="flex justify-end mb-8">
              <button
                onClick={doubleOldTickets}
                className="bg-purple-600/20 text-purple-400 border border-purple-500/30 font-google-sans font-medium px-4 py-2 rounded-lg hover:bg-purple-600/30 transition text-sm"
              >
                Double Old Tickets & Send Emails
              </button>
            </div>

            {/* Raffle Tickets Table */}
            <div>
              <h3 className="font-space-grotesk text-xl font-bold text-white mb-4">
                All Raffle Tickets
              </h3>

              <input
                value={raffleSearch}
                onChange={(e) => setRaffleSearch(e.target.value)}
                placeholder="Search by name, email, phone, or ticket number..."
                className="w-full bg-black/40 border border-white/10 mb-6 rounded-2xl px-4 py-2.5 text-white font-google-sans focus:outline-none focus:border-primary-bright transition"
              />

              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10">
                        <th className="px-6 py-4 font-google-sans text-sm font-medium text-white/50 uppercase tracking-wider">
                          Ticket #
                        </th>
                        <th className="px-6 py-4 font-google-sans text-sm font-medium text-white/50 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-4 font-google-sans text-sm font-medium text-white/50 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-6 py-4 font-google-sans text-sm font-medium text-white/50 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-4 font-google-sans text-sm font-medium text-white/50 uppercase tracking-wider">
                          Purchased
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {loadingRaffle ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-12 text-center text-white/40 font-google-sans"
                          >
                            Loading raffle data...
                          </td>
                        </tr>
                      ) : filteredRaffleTickets.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-12 text-center text-white/40 font-google-sans"
                          >
                            No raffle tickets found.
                          </td>
                        </tr>
                      ) : (
                        filteredRaffleTickets.map((t) => (
                          <tr
                            key={t.ticketNumber}
                            className="hover:bg-white/5 transition"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/20 text-primary-bright border border-primary/30 font-space-grotesk tracking-wider">
                                #{t.ticketNumber}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-white font-medium font-google-sans">
                              {t.buyerName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-white/70 font-google-sans text-sm">
                              {t.buyerPhone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-white/70 font-google-sans text-sm">
                              {t.buyerEmail}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white/50 font-google-sans">
                              {t.purchasedAt?.toDate
                                ? t.purchasedAt.toDate().toLocaleDateString()
                                : "Just now"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
