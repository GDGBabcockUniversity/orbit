import { IMAGES, NAV_LINKS } from "../lib/constants";
import OrbitLogo from "./orbit-logo";

const Hero = () => {
  return (
    <section className="h-screen bg-foreground p-[1.25vw] lg:p-[0.5vw] relative overflow-hidden">
      <div className="w-full h-full bg-background rounded-3xl relative overflow-hidden">
        {/* ===== BACKGROUND LAYERS ===== */}
        <div className="hero-planet-glow" />
        <div className="hero-aurora-bars" />
        <div className="hero-center-line" />
        <div className="hero-hairlines" />
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
          <div className="relative z-10 w-full flex items-center justify-center pt-1">
            <OrbitLogo />
          </div>
        </div>

        {/* ===== CONTENT LAYER ===== */}
        <div className="relative z-10 w-full h-full flex flex-col">
          {/* --- NAV BAR --- */}
          <nav className="w-full flex items-center justify-between px-6 lg:px-12 pt-6 lg:pt-8 shrink-0">
            {/* Left: Nav links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-google-sans text-[13px] tracking-[0.12em] text-white/75">
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

            {/* Mobile: Hamburger placeholder */}
            <div className="lg:hidden text-white/75 text-sm font-google-sans tracking-widest">
              MENU
            </div>

            {/* Right: CTA */}
            <button className="flex items-center gap-3 border border-white/30 rounded-full px-5 py-2 lg:px-6 lg:py-2.5 text-white font-google-sans text-[13px] tracking-[0.1em] hover:border-white/60 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] transition-all cursor-pointer">
              GET A TICKET
              <img
                src={IMAGES.rocket.src}
                width={IMAGES.rocket.width}
                height={IMAGES.rocket.height}
                alt=""
                className="size-4 invert"
              />
            </button>
          </nav>

          {/* --- HERO HEADLINE (centered) --- */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-8">
            <h1 className="font-rosnoc text-center uppercase leading-[1.1]">
              <span className="block text-white text-3xl sm:text-4xl md:text-5xl lg:text-[56px] tracking-[0.08em] font-medium">
                WHERE INDUSTRY MEETS THE NEXT
              </span>
              <span className="block hero-gradient-text text-6xl sm:text-7xl md:text-8xl lg:text-[120px] tracking-[0.06em] font-bold mt-2">
                GENERATION
              </span>
            </h1>

            {/* CTA Button */}
            <button className="mt-10 lg:mt-14 bg-white text-background rounded-full pl-6 lg:pl-8 pr-2 py-2 font-google-sans text-[13px] lg:text-[14px] tracking-[0.1em] font-medium flex items-center gap-5 hover:scale-[1.03] hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)] transition-all cursor-pointer">
              BECOME A PARTNER
              <span className="bg-background rounded-full p-2.5 flex items-center justify-center">
                <img
                  src={IMAGES.partners.src}
                  width={IMAGES.partners.width}
                  height={IMAGES.partners.height}
                  alt=""
                  className="size-4 invert"
                />
              </span>
            </button>
          </div>

          {/* --- BOTTOM STATUS BAR --- */}
          <div className="w-full flex items-center justify-between px-6 lg:px-12 pb-5 lg:pb-6 shrink-0 font-google-sans text-[11px] lg:text-xs tracking-[0.12em] text-white/80 uppercase">
            <span>MARCH 29, 2026</span>
            <span>BABCOCK UNIVERSITY, ILLISHAN-REMO</span>
            <span>APRIL 2, 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
