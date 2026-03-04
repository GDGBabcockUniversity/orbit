function HeroSection() {
  return (
    <>
      {/* Inline styles for the inverted corners. 
        Using radial-gradient is the cleanest native CSS way to create concave shapes.
        - curve-tl: Solid color in top-left, transparent hole in bottom-right.
        - curve-tr: Solid color in top-right, transparent hole in bottom-left.
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .curve-tl { background: radial-gradient(circle at 100% 100%, transparent 2rem, var(--color-foreground) 2rem); }
        .curve-tr { background: radial-gradient(circle at 0 100%, transparent 2rem, var(--color-foreground) 2rem); }
      `,
        }}
      />

      <section className="min-h-screen bg-[var(--color-foreground)] p-2 sm:p-4 md:p-6 font-sans selection:bg-[var(--color-primary)] selection:text-white">
        {/* Main Dark Card Container */}
        <div className="relative w-full min-h-[92vh] bg-[var(--color-background)] rounded-[2rem] overflow-hidden flex flex-col justify-center">
          {/* Background Elements: Purple Glow & Faint Vertical Lines */}
          <div className="absolute top-1/2 left-0 sm:left-[-10%] -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-[var(--color-primary)] opacity-40 blur-[100px] md:blur-[140px] rounded-full mix-blend-screen pointer-events-none z-0"></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_99%,rgba(255,255,255,0.04)_100%)] bg-[length:120px_100%] pointer-events-none z-0"></div>

          {/* =========================================
              DESKTOP HEADER
              ========================================= */}

          {/* Top-Left Logo Tab (Cutout) */}
          <div className="hidden md:flex absolute top-0 left-0 bg-[var(--color-foreground)] rounded-br-[2rem] items-center justify-center px-10 py-6 z-20">
            <OrbitLogo />
            {/* Smooth transition to the right */}
            <div className="absolute top-0 right-[-2rem] w-[2rem] h-[2rem] curve-tl"></div>
            {/* Smooth transition downwards */}
            <div className="absolute bottom-[-2rem] left-0 w-[2rem] h-[2rem] curve-tl"></div>
          </div>

          {/* Top-Right Navigation */}
          <div className="hidden md:flex absolute top-0 right-0 p-8 z-20 items-center gap-10 text-[10px] sm:text-xs tracking-[0.2em] uppercase">
            <nav className="flex items-center gap-8 text-white/80">
              <a
                href="#speakers"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <SpeakerIcon /> Speakers
              </a>
              <a
                href="#schedule"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <ScheduleIcon /> Schedule
              </a>
              <a
                href="#location"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <LocationIcon /> Location
              </a>
              <a
                href="#sponsors"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <SponsorIcon /> Sponsors
              </a>
            </nav>
            <button className="flex items-center gap-3 border border-white/30 rounded-full px-6 py-3 hover:bg-white/10 transition-colors">
              Get A Ticket <RocketIcon />
            </button>
          </div>

          {/* =========================================
              MOBILE HEADER
              ========================================= */}

          <div className="md:hidden absolute top-0 left-0 w-full flex justify-between items-start z-20">
            {/* Left Tab: Menu */}
            <div className="relative bg-[var(--color-foreground)] rounded-br-[2rem] px-4 py-4 pr-6">
              <button className="bg-[var(--color-background)] text-[var(--color-foreground)] rounded-full px-4 py-2 text-xs flex items-center gap-2 font-bold tracking-widest uppercase">
                <MenuHeartIcon /> Menu
              </button>
              <div className="absolute top-0 right-[-2rem] w-[2rem] h-[2rem] curve-tl"></div>
            </div>

            {/* Middle Tab: Logo */}
            <div className="relative bg-[var(--color-foreground)] rounded-b-[2rem] px-6 py-5 pb-6">
              <OrbitLogo />
              <div className="absolute top-0 left-[-2rem] w-[2rem] h-[2rem] curve-tr"></div>
              <div className="absolute top-0 right-[-2rem] w-[2rem] h-[2rem] curve-tl"></div>
            </div>

            {/* Right Tab: Ticket */}
            <div className="relative bg-[var(--color-foreground)] rounded-bl-[2rem] px-4 py-4 pl-6">
              <button className="bg-[var(--color-background)] text-[var(--color-foreground)] rounded-full w-10 h-10 flex items-center justify-center">
                <TicketIconMobile />
              </button>
              <div className="absolute top-0 left-[-2rem] w-[2rem] h-[2rem] curve-tr"></div>
            </div>
          </div>

          {/* =========================================
              MAIN CONTENT AREA
              ========================================= */}

          <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full h-full p-6 md:p-16 mt-28 md:mt-0">
            {/* Left: Graphic Placeholder */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-start mt-8 md:mt-0">
              <img
                src="/path-to-your-ring-graphic.png"
                alt="Orbit 3D Ring Graphic"
                className="w-[90%] md:w-full max-w-[600px] object-contain drop-shadow-[0_0_40px_rgba(123,0,255,0.3)]"
              />
            </div>

            {/* Right: Typography & CTA */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right gap-8 md:gap-10">
              <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[5rem] font-bold uppercase leading-[1.1] text-[var(--color-foreground)] flex flex-col tracking-wide">
                <span>Where Industry</span>
                <span>Meets The Next</span>
                <span>Generation</span>
              </h1>

              <button className="bg-[var(--color-foreground)] text-[var(--color-background)] rounded-full pl-8 pr-2 py-2 text-sm md:text-base font-bold tracking-[0.15em] flex items-center gap-6 hover:scale-105 transition-transform">
                BECOME A PARTNER
                <span className="bg-[var(--color-background)] text-[var(--color-foreground)] rounded-full p-3 flex items-center justify-center">
                  <PartnerIcon />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================
   SVG Icon Components
   ========================================= */

const OrbitLogo = () => (
  <div className="flex items-center gap-1 text-2xl md:text-3xl font-black tracking-widest text-[var(--color-background)]">
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="mt-[-2px]"
    >
      <circle cx="12" cy="12" r="7" />
      <path d="M4 12c0 5 4 9 9 9" />
      <path d="M2 20L22 4" />
    </svg>
    <span>RBIT</span>
  </div>
);

const MenuHeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const TicketIconMobile = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46s-.81-2.77-2-3.46V6h16v2.54z" />
  </svg>
);

const PartnerIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2l4 4-4 4" />
    <path d="M2 10h16" />
    <path d="M10 22l-4-4 4-4" />
    <path d="M22 14H6" />
  </svg>
);

// Standard utility icons for Nav
const SpeakerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
  </svg>
);
const ScheduleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
  </svg>
);
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);
const SponsorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22A10 10 0 1 0 2 12a10 10 0 0 0 10 10zm0-18a8 8 0 1 1-8 8 8 8 0 0 1 8-8zm1 12v-2h2v-2h-2V8h-2v6h-2v2h4z" />
  </svg>
);
const RocketIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.13 2.13l1.94 1.94c.39.39.39 1.02 0 1.41l-8.08 8.08c-.39.39-1.02.39-1.41 0l-1.94-1.94c-.39-.39-.39-1.02 0-1.41l8.08-8.08c.39-.39 1.02-.39 1.41 0zM3.41 19.59l2.83-2.83-1.41-1.41-2.83 2.83c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0zM22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z" />
  </svg>
);

export default HeroSection;
