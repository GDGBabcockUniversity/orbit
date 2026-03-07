import { HERO_LINKS, IMAGES } from "../lib/constants";
import OrbitLogo from "./orbit-logo";

const Hero = () => {
  return (
    <section className="h-screen bg-foreground p-[1.25vw] lg:p-[0.5vw] relative overflow-hidden">
      {/* 
        The dark container fluidly fills the padded section.
        Border radius: 
        - Desktop: 32px all around EXCEPT top-left (the notch is there).
        - Mobile: 32px all around (the notch sits exactly in the top-center).
      */}
      <div className="w-full h-full bg-[radial-gradient(ellipse_at_0%_100%,var(--color-foreground),var(--color-primary)_40%,var(--color-background)_55%)] rounded-3xl relative overflow-hidden">
        {/* =========================================
            DESKTOP NOTCH (Top-Left)
            ========================================= */}
        {/* 
          This white SVG mask sits at the top-left and covers the dark container perfectly, 
          recreating the exactly-sized cutoff shape from Union.svg.
          (Expanded by 1px up and left to prevent subpixel antialiasing gaps)
        */}
        {/* <div className="hidden lg:flex absolute top-0 left-0 w-[261px] h-[98px] z-20">
          <svg
            className="absolute top-0 left-0 w-full h-full text-foreground"
            viewBox="0 0 259.197 97"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M0 0 H259.197 C249.581 0 240.474 4.3252 234.396 11.7783 L200.604 53.2217 C194.526 60.6748 185.419 65 175.803 65 H32 C14.3269 65 0 79.3269 0 97 V0 Z" />
          </svg>

          <div className="relative z-10 w-full flex items-center justify-center -top-4 -left-4">
            <OrbitLogo />
          </div>
        </div> */}

        {/* =========================================
            MOBILE NOTCH (Top-Center)
            ========================================= */}
        {/*
          This white SVG mask sits at the top-center and covers the dark container perfectly, 
          recreating the exactly-sized cutoff shape from the mobile SVG.
          (Expanded by 1px up and horizontally to prevent subpixel antialiasing gaps)
        */}
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

          {/* Logo placed inside the white mobile notch */}
          <div className="relative z-10 w-full flex items-center justify-center pt1">
            <OrbitLogo />
          </div>
        </div>

        {/* Content layer inside the container */}
        <div className="relative z-10 w-full h-full">
          <div className="w-full h-full font-rosnoc text-white pr-5 pb-5 pt-5 flex flex-col items-end justify-between">
            <div className="w-full flex items-center justify-end gap-10 text-lg">
              {HERO_LINKS.map((link, index) => (
                <div
                  className="items-center justify-center gap-4 hidden lg:flex"
                  key={index}
                >
                  <img
                    src={link.image.src}
                    width={link.image.width}
                    height={link.image.height}
                    alt=""
                  />
                  {link.text}
                </div>
              ))}

              <button className="bg-transparent px-6 py-2.5 rounded-full border-2 cursor-pointer flex items-center justify-center gap-4">
                GET A TICKET{" "}
                <img
                  src={IMAGES.rocket.src}
                  width={IMAGES.rocket.width}
                  height={IMAGES.rocket.height}
                  alt=""
                  className="size-5"
                />
              </button>
            </div>

            <div className="flex flex-col items-end gap-10">
              <p className="text-right text-6xl xl:text-7xl">
                WHERE <br /> INDUSTRY MEETS <br /> THE NEXT <br />{" "}
                <span className="text-7xl xl:text-8xl">GENERATION</span>
              </p>

              <button className="bg-white text-black pl-6 pr-3 py-2.5 rounded-full border-2 cursor-pointer text-3xl flex items-center justify-center gap-4">
                BECOME A PARTNER{" "}
                <div className="bg-black p-4 rounded-full">
                  <img
                    src={IMAGES.partners.src}
                    width={IMAGES.partners.width}
                    height={IMAGES.partners.height}
                    alt=""
                    className="size-5"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
