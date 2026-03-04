import OrbitLogo from "./orbit-logo";

const Hero = () => {
  return (
    <section className="h-screen bg-foreground p-[1.25vw] md:p-[0.5vw] relative overflow-hidden">
      {/* 
        The dark container fluidly fills the padded section.
        Border radius: 
        - Desktop: 32px all around EXCEPT top-left (the notch is there).
        - Mobile: 32px all around (the notch sits exactly in the top-center).
      */}
      <div className="w-full h-full bg-background rounded-4xl md:rounded-tl-none relative overflow-hidden">
        {/* =========================================
            DESKTOP NOTCH (Top-Left)
            ========================================= */}
        {/* 
          This white SVG mask sits at the top-left and covers the dark container perfectly, 
          recreating the exactly-sized cutoff shape from Union.svg.
          (Expanded by 1px up and left to prevent subpixel antialiasing gaps)
        */}
        <div className="hidden md:flex absolute top-0 left-0 w-[261px] h-[98px] z-20">
          <svg
            className="absolute top-0 left-0 w-full h-full text-foreground"
            viewBox="0 0 259.197 97"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M0 0 H259.197 C249.581 0 240.474 4.3252 234.396 11.7783 L200.604 53.2217 C194.526 60.6748 185.419 65 175.803 65 H32 C14.3269 65 0 79.3269 0 97 V0 Z" />
          </svg>

          {/* Logo placed inside the white desktop notch */}
          <div className="relative z-10 w-full flex items-center justify-center -top-4 -left-4">
            <OrbitLogo />
          </div>
        </div>

        {/* =========================================
            MOBILE NOTCH (Top-Center)
            ========================================= */}
        {/*
          This white SVG mask sits at the top-center and covers the dark container perfectly, 
          recreating the exactly-sized cutoff shape from the mobile SVG.
          (Expanded by 1px up and horizontally to prevent subpixel antialiasing gaps)
        */}
        <div className="flex md:hidden absolute -top-px left-1/2 -translate-x-1/2 w-[232px] h-[53px] z-20">
          <svg
            className="absolute top-0 left-0 w-full h-full text-foreground"
            viewBox="0 0 230.4 52"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M0 0 H230.4 C217.049 0 205.102 8.2892 200.427 20.7949 L196.535 31.2051 C191.86 43.7108 179.912 52 166.561 52 H63.839 C50.488 52 38.54 43.7108 33.865 31.2051 L29.973 20.7949 C25.298 8.2892 13.351 0 0 0 Z" />
          </svg>

          {/* Logo placed inside the white mobile notch */}
          <div className="relative z-10 w-full flex items-center justify-center pt1">
            <OrbitLogo />
          </div>
        </div>

        {/* Content layer inside the container */}
        <div className="relative z-10 w-full h-full">
          {/* Replace this <p> with the rest of your layout */}
          <p className="text-white pt-32 pl-12">hi</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
