function HeroSection() {
  return (
    <section
      style={{
        height: "100vh",
        padding: "1.25vw",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--color-foreground)",
      }}
    >
      {/* SVG defines the clip shape — the dark area with the angled notch */}
      <svg
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      >
        <defs>
          <clipPath id="hero-clip" clipPathUnits="objectBoundingBox">
            {/* Normalize the path to 0-1 range by dividing by viewBox dimensions */}
            <path
              transform="scale(0.000520833, 0.000925926)"
              d="M272.197 16C262.581 16 253.474 20.3252 247.396 27.7783L213.604 69.2217C207.526 76.6748 198.419 81 188.803 81H45C27.3269 81 13 95.3269 13 113V1032C13 1049.67 27.3269 1064 45 1064H1872C1889.67 1064 1904 1049.67 1904 1032V48C1904 30.3269 1889.67 16 1872 16H272.197Z"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Dark container using the clip shape */}
      <div
        style={{
          position: "absolute",
          inset: "1.25vw",
          backgroundColor: "var(--color-background)",
          clipPath: "url(#hero-clip)",
        }}
      >
        {/* Content goes here */}
      </div>
    </section>
  );
}

export default HeroSection;
