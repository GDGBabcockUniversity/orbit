import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
// import OrbitLogo from "../components/orbit-logo";
import { Link } from "react-router-dom";

// Note: In a real production app, this sitekey should be in environment variables.
// Using a Cloudflare test key for demonstration if needed, but it's best if the user supplies their own.
const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"; // Test key always passes

const TicketsPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    organization: "",
    checkedIn: false,
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "exists">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!turnstileToken) {
      setErrorMessage("Please complete the captcha.");
      setStatus("error");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const normalizedEmail = formData.email.toLowerCase().trim();
      const ticketRef = doc(db, "tickets", normalizedEmail);

      // 1. Check if email already exists
      const ticketSnap = await getDoc(ticketRef);

      if (ticketSnap.exists()) {
        setStatus("exists");
        setLoading(false);
        return;
      }

      // 2. Create ticket document with email as ID
      await setDoc(ticketRef, {
        ...formData,
        email: normalizedEmail,
        createdAt: serverTimestamp(),
      });

      // 3. Trigger email via Resend edge function (to be implemented)
      try {
        await fetch("/api/send-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } catch (emailError) {
        console.error("Failed to trigger confirmation email:", emailError);
        // We still show success for the ticket creation even if the email trigger fails silently
      }

      setStatus("success");
    } catch (error: unknown) {
      console.error("Registration error:", error);
      setErrorMessage(
        (error as Error).message || "Something went wrong. Please try again.",
      );
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
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
            You're in!
          </h2>
          <p className="text-white/70 font-google-sans mb-8">
            Your registration for ORBIT 1.0 was successful. We've sent a
            confirmation email to{" "}
            <span className="text-white font-medium">{formData.email}</span>{" "}
            with your ticket details.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-google-sans px-8 py-3 rounded-full transition"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-32 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="hero-planet-glow opacity-30" />
      <div className="hero-grain" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-10 text-center flex flex-col items-center">
          {/* <Link to="/" className="inline-block mb-6">
            <OrbitLogo inverted />
          </Link> */}
          <h1 className="font-space-grotesk text-3xl md:text-4xl font-bold text-white mb-3">
            Claim Your Ticket
          </h1>
          <p className="text-white/50 font-google-sans">
            Join the convergence of campus and industry at ORBIT 1.0. Limited
            seats available.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-2xl"
        >
          {status === "exists" && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex gap-3 text-yellow-200/90 text-sm font-google-sans">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5 shrink-0 mt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <strong className="block text-yellow-400 mb-1">
                  Already registered!
                </strong>
                A ticket has already been claimed with this email address.
                Please check your inbox for confirmation details.
              </div>
            </div>
          )}

          {status === "error" && errorMessage && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-google-sans">
              {errorMessage}
            </div>
          )}

          <div className="space-y-5">
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
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-google-sans focus:outline-none focus:border-primary-bright focus:ring-1 focus:ring-primary-bright transition outline-none"
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
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-google-sans focus:outline-none focus:border-primary-bright focus:ring-1 focus:ring-primary-bright transition outline-none"
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-google-sans text-white/70 mb-1.5"
              >
                What best describes you?
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleInputChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-google-sans focus:outline-none focus:border-primary-bright focus:ring-1 focus:ring-primary-bright transition outline-none appearance-none"
              >
                <option value="" disabled>
                  Select a role...
                </option>
                <option value="Student">Student</option>
                <option value="Professional">Professional / Industry</option>
                <option value="Founder">Founder / Startup</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* <div>
              <label
                htmlFor="organization"
                className="block text-sm font-google-sans text-white/70 mb-1.5"
              >
                School or Company
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                required
                value={formData.organization}
                onChange={handleInputChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-google-sans focus:outline-none focus:border-primary-bright focus:ring-1 focus:ring-primary-bright transition outline-none"
                placeholder="Babcock University"
              />
            </div> */}

            <div className="pt-2 flex justify-center">
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => setTurnstileToken(null)}
                onExpire={() => setTurnstileToken(null)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              // disabled={loading || !turnstileToken}
              className="w-full mt-2 bg-primary text-white font-google-sans text-[15px] font-medium tracking-wide py-3.5 rounded-xl hover:bg-primary-mid transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 size-5 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketsPage;
