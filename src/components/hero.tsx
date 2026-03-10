import { HERO_STATS } from "../lib/constants";

const Hero = () => {
  return (
    <section className="bg-foreground flex flex-col items-center px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Event badge */}
      <div className="flex items-center gap-2.5 bg-background text-white text-[11px] font-google-sans tracking-[0.15em] uppercase px-5 py-2.5 rounded-full">
        <span className="size-2 rounded-full bg-green-400 shrink-0" />
        ORBIT 2026 · BABCOCK UNIVERSITY
      </div>

      {/* Headline */}
      <h1 className="mt-8 md:mt-10 font-space-grotesk text-center font-bold leading-[1.05]">
        <span className="block text-background text-[clamp(2.5rem,6vw,4.5rem)]">
          Nigeria&rsquo;s Biggest
        </span>
        <span className="block text-primary text-[clamp(2.5rem,6vw,4.5rem)]">
          Tech Career Fair
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-5 md:mt-6 text-center text-background/55 font-google-sans text-base md:text-lg max-w-xl leading-relaxed">
        Connecting top student talent with leading tech companies. One day.
        Thousands of opportunities. Infinite possibilities.
      </p>

      {/* Stats row */}
      <div className="mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14">
        {HERO_STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-space-grotesk text-2xl md:text-3xl font-bold text-background tracking-tight">
              {stat.value}
            </p>
            <p className="text-background/45 font-google-sans text-xs md:text-sm mt-1.5">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
