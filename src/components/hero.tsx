import { HERO_STATS } from "../lib/constants";
import CountdownTimer from "./countdown-timer";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="about" className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="hero-planet-glow" />
      <div className="hero-aurora-bars">
        <div className="hero-aurora-bar" />
        <div className="hero-aurora-bar" />
        <div className="hero-aurora-bar" />
        <div className="hero-aurora-bar" />
        <div className="hero-aurora-bar" />
      </div>
      <div className="hero-grain" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-28 md:py-32">
        {/* Event badge */}
        <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm text-white text-[11px] font-google-sans tracking-[0.15em] uppercase px-5 py-2.5 rounded-full border border-white/10">
          <span className="size-2 rounded-full bg-green-400 shrink-0" />
          ORBIT 1.0 &mdash; MARCH 29 TO APRIL 2, 2026
        </div>

        {/* Headline */}
        <h1 className="mt-8 md:mt-10 font-space-grotesk text-center font-bold leading-[1.05] text-[clamp(2.8rem,7vw,5.5rem)] text-white">
          Closing the Distance
        </h1>

        {/* Tagline */}
        <p className="mt-3 md:mt-4 text-center text-primary-bright font-google-sans text-lg md:text-xl italic">
          Where campus meets industry.
        </p>

        {/* Description */}
        <p className="mt-5 md:mt-6 text-center text-white/50 font-google-sans text-base md:text-lg max-w-2xl leading-relaxed">
          A 4-day industry summit bringing students, companies, founders, and
          opportunities into the same orbit. Hackathon. Field trips. Panels.
          Career fair.
        </p>

        {/* Countdown */}
        <div className="mt-8 md:mt-10">
          <CountdownTimer />
        </div>

        {/* Stats row */}
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14">
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-space-grotesk text-2xl md:text-3xl font-bold text-white tracking-tight">
                {stat.value}
              </p>
              <p className="text-white/40 font-google-sans text-xs md:text-sm mt-1.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Dual CTAs */}
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/tickets"
            className="bg-primary text-white font-google-sans text-sm tracking-wider px-8 py-3.5 rounded-full hover:bg-primary-mid transition inline-flex items-center gap-2.5"
          >
            Get Tickets
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href="/docs/orbit.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 text-white/80 font-google-sans text-sm tracking-wider px-8 py-3.5 rounded-full hover:border-white/40 hover:text-white transition"
          >
            Partner with ORBIT
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
