import { HERO_STATS } from "../lib/constants";
import CountdownTimer from "./countdown-timer";
import OrbitLogo from "./orbit-logo";

const Hero = () => {
  return (
    <section className="h-screen bg-foreground p-[1.25vw] lg:p-[0.5vw] relative overflow-hidden">
      <div className="w-full h-full bg-background rounded-3xl relative overflow-hidden">
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

        {/* Notch with logo */}
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

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          {/* Event badge */}
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm text-white text-[11px] font-google-sans tracking-[0.15em] uppercase px-5 py-2.5 rounded-full border border-white/10">
            <span className="size-2 rounded-full bg-green-400 shrink-0" />
            ORBIT 2026 · BABCOCK UNIVERSITY
          </div>

          {/* Headline */}
          <h1 className="mt-8 md:mt-10 font-space-grotesk text-center font-bold leading-[1.05]">
            <span className="block text-white text-[clamp(2.5rem,6vw,4.5rem)]">
              Nigeria&rsquo;s Biggest
            </span>
            <span className="block text-primary-bright text-[clamp(2.5rem,6vw,4.5rem)]">
              Tech Career Fair
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 md:mt-6 text-center text-white/50 font-google-sans text-base md:text-lg max-w-xl leading-relaxed">
            Connecting top student talent with leading tech companies. One day.
            Thousands of opportunities. Infinite possibilities.
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
