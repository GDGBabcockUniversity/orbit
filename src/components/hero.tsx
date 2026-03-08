import { IMAGES, NAV_LINKS } from "../lib/constants";
import CountdownTimer from "./countdown-timer";
import OrbitLogo from "./orbit-logo";

const Hero = () => {
  return (
    <section className="h-screen bg-foreground p-[1.25vw] lg:p-[0.5vw] relative overflow-hidden">
      <div className="w-full h-full bg-background rounded-3xl relative overflow-hidden">
        {/* ===== BACKGROUND LAYERS ===== */}
        <div className="hero-planet-glow" />
        <div className="hero-aurora-bars">
          <div className="hero-aurora-bar" />
          <div className="hero-aurora-bar" />
          <div className="hero-aurora-bar" />
          <div className="hero-aurora-bar" />
          <div className="hero-aurora-bar" />
        </div>
        <div className="hero-grain" />

        {/* ===== NOTCH (Top-Center) ===== */}
        <div className="flex absolute -top-px left-1/2 -translate-x-1/2 w-[232px] lg:w-[280px] h-[53px] lg:h-[63px] z-20">
          <svg
            className="absolute top-0 left-0 w-full h-full text-foreground"
            viewBox="0 0 230.4 52"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M0 0 H230.4 C217.049 0 205.102 8.2892 200.427 20.7949 L196.535 31.2051 C191.86 43.7108 179.912 52 166.561 52 H63.839 C50.488 52 38.54 43.7108 33.865 31.2051 L29.973 20.7949 C25.298 8.2892 13.351 0 0 0 Z" />
          </svg>
          <div className="relative z-10 w-full flex items-center justify-center">
            <OrbitLogo />
          </div>
        </div>

        {/* ===== CONTENT LAYER ===== */}
        <div className="relative z-10 w-full h-full flex flex-col">
          {/* --- NAV BAR --- */}
          <nav className="w-full flex items-center justify-end xl:justify-between pl-8 px-6 pt-6 shrink-0">
            {/* Desktop: Nav links (hidden until xl so they don't collide with notch) */}
            <div className="hidden xl:flex items-center gap-6 xl:gap-8 font-rosnoc tracking-[0.12em] text-white/75">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Right: Full button on xl+, icon-only below xl */}
            <button className="hidden md:flex hero-ticket-btn items-center gap-3 border border-white/20 rounded-full px-5 py-2 lg:px-6 lg:py-2.5 text-white font-google-sans text-[13px] tracking-widest hover:border-white/40 transition-all cursor-pointer">
              GET A TICKET
              <img
                src={IMAGES.rocket.src}
                width={IMAGES.rocket.width}
                height={IMAGES.rocket.height}
                alt=""
                className="size-4"
              />
            </button>

            {/* Icon-only ticket button (below xl) */}
            <button className="md:hidden hero-ticket-btn flex items-center justify-center border border-white/20 rounded-full size-10 text-white hover:border-white/40 transition-all cursor-pointer">
              <img
                src={IMAGES.rocket.src}
                width={IMAGES.rocket.width}
                height={IMAGES.rocket.height}
                alt="Get a ticket"
                className="size-4"
              />
            </button>
          </nav>

          {/* --- HERO HEADLINE (centered) --- */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 md:-mt-8">
            <h1 className="font-rosnoc text-center uppercase leading-[1.1]">
              <span className="block text-white text-4xl md:text-5xl lg:text-6xl tracking-[0.08em] font-medium">
                WHERE INDUSTRY <br />
                MEETS THE NEXT
              </span>
              <span
                className="block hero-gradient-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-[0.06em] font-bold mt-2"
                data-text="GENERATION"
              >
                GENERATION
              </span>
            </h1>

            {/* Tagline (mobile only) */}
            <p className="mt-4 text-white/50 font-google-sans text-xs tracking-widest uppercase md:hidden text-center">
              MARCH 29 — APRIL 2, 2026 · BABCOCK UNIVERSITY
            </p>

            {/* Countdown Timer */}
            <div className="mt-6 md:mt-10">
              <CountdownTimer />
            </div>

            {/* CTA Button */}
            <button className="mt-6 md:mt-10 lg:mt-14 bg-white text-background rounded-full w-full max-w-xs md:w-auto px-4 py-3 md:px-8 md:py-4 font-rosnoc tracking-widest font-medium flex items-center justify-center gap-4 hover:scale-[1.03] hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)] transition-all cursor-pointer md:text-lg">
              BECOME A PARTNER
              <img
                src={IMAGES.rocket.src}
                width={IMAGES.rocket.width}
                height={IMAGES.rocket.height}
                alt=""
                className="size-4 invert"
              />
            </button>
          </div>

          {/* --- BOTTOM STATUS BAR --- */}
          {/* Row on md+, stacked column on mobile */}
          <div className="w-full font-rosnoc hidden md:flex items-center justify-between px-6 lg:px-12 pb-4 md:pb-5 lg:pb-6 shrink-0 text-sm lg:text-base tracking-[0.12em] text-white/80 uppercase">
            <span>MARCH 29, 2026</span>
            <span>BABCOCK UNIVERSITY, ILISHAN-REMO</span>
            <span>APRIL 2, 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
