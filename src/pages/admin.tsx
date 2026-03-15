import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import OrbitLogo from "../components/orbit-logo";
import { Link } from "react-router-dom";

type Ticket = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  organization: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any;
};

const AdminPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data State
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
      if (currentUser) {
        fetchTickets();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
  };

  const fetchTickets = async () => {
    setLoadingData(true);
    try {
      const q = query(collection(db, "tickets"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const ticketsData: Ticket[] = [];
      querySnapshot.forEach((doc) => {
        ticketsData.push({ id: doc.id, ...doc.data() } as Ticket);
      });
      setTickets(ticketsData);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoadingData(false);
    }
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

  // --- Login View ---
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center flex flex-col items-center">
            {/* <Link to="/" className="inline-block mb-4">
              <OrbitLogo inverted />
            </Link> */}
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
                disabled={isLoggingIn}
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

  // --- Dashboard View ---
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-white/10 bg-black/20 sticky top-0 z-10 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="opacity-80 hover:opacity-100 transition">
            <OrbitLogo inverted />
          </Link>
          <div className="h-6 w-px bg-white/20 hidden md:block" />
          <h1 className="text-white font-space-grotesk font-bold text-xl hidden md:block">
            ORBIT Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-4 text-sm font-google-sans text-white/70">
          <span className="hidden sm:inline-block">{user.email}</span>
          <button
            onClick={fetchTickets}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-space-grotesk font-bold text-white">
              Event Registrations
            </h2>
            <p className="text-white/50 font-google-sans mt-1">
              {tickets.length} {tickets.length === 1 ? "ticket" : "tickets"}{" "}
              issued for ORBIT 1.0.
            </p>
          </div>

          <button className="bg-white text-black font-google-sans font-medium px-5 py-2.5 rounded-full hover:bg-gray-200 transition flex items-center gap-2">
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
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Export to CSV
          </button>
        </div>

        {/* Data Table */}
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
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loadingData ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-white/40 font-google-sans"
                    >
                      Loading data...
                    </td>
                  </tr>
                ) : tickets.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-white/40 font-google-sans"
                    >
                      No registrations found yet.
                    </td>
                  </tr>
                ) : (
                  tickets.map((ticket) => (
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
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
