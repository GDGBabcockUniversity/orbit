import { useEffect, useRef, useState } from "react";
import { EXPERIENCES } from "../lib/constants";
import SectionBadge from "./ui/section-badge";

const ExperienceCard = ({
  experience,
  className = "",
  style,
}: {
  experience: (typeof EXPERIENCES)[number];
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`relative rounded-3xl overflow-hidden h-full shadow-xl ${className}`}
    style={style}
  >
    {/* Background image */}
    <img
      src={experience.image}
      alt={experience.title}
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

    {/* Content */}
    <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
      {/* Day badge */}
      <div className="bg-white/15 backdrop-blur-sm text-white rounded-full size-10 md:size-12 flex items-center justify-center font-space-grotesk text-base md:text-lg font-bold mb-4 border border-white/10">
        {experience.day}
      </div>

      <h3 className="font-space-grotesk font-bold text-white text-xl md:text-2xl xl:text-3xl leading-snug">
        Day {experience.day} &mdash; {experience.title}
      </h3>

      <p className="mt-2 md:mt-3 text-white/65 font-google-sans text-sm md:text-base leading-relaxed max-w-md">
        {experience.description}
      </p>
    </div>
  </div>
);

/* Desktop: Scroll-driven card deck */
const DesktopDeck = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = EXPERIENCES.length;
  const scrollPages = totalCards;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportH = window.innerHeight;
      const scrolled = -rect.top;
      const maxScroll = sectionHeight - viewportH;
      if (scrolled < 0 || scrolled > maxScroll) return;
      const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);
      const newIndex = Math.min(
        Math.floor(progress * totalCards),
        totalCards - 1,
      );
      setActiveIndex(newIndex);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalCards]);

  return (
    <div
      ref={sectionRef}
      id="experience"
      style={{ height: `${(scrollPages + 1) * 100}vh` }}
      className="hidden md:block relative"
    >
      <div className="sticky top-0 h-screen bg-foreground flex items-center overflow-hidden">
        {/* Left heading */}
        <div className="w-[35%] pl-12 lg:pl-20 xl:pl-28 pr-8">
          <SectionBadge>THE EXPERIENCE</SectionBadge>
          <h2 className="font-space-grotesk text-background text-4xl lg:text-5xl xl:text-6xl leading-tight font-bold mt-5">
            4 Days. 4 Experiences.{" "}
            <span className="text-primary">1 Mission.</span>
          </h2>
          <p className="mt-6 text-background/50 font-google-sans text-lg xl:text-xl max-w-sm leading-relaxed">
            Closing the distance between campus and industry, one day at a time.
          </p>
        </div>

        {/* Right card deck */}
        <div className="w-[65%] h-full flex items-center justify-center relative py-8">
          {EXPERIENCES.map((exp, i) => {
            const pos = (i - activeIndex + totalCards) % totalCards;
            const translateX = pos * 40;
            const translateY = pos * -30;
            const scale = 1 - pos * 0.03;
            const zIndex = totalCards - pos;
            const opacity = pos > 2 ? 0 : 1 - pos * 0.1;

            return (
              <div
                key={exp.day}
                className="absolute transition-all duration-500 ease-out"
                style={{
                  width: "min(700px, 90%)",
                  height: "min(550px, 80%)",
                  transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
              >
                <ExperienceCard experience={exp} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* Mobile: Vertical stack */
const MobileStack = () => (
  <section id="experience" className="md:hidden bg-foreground px-6 py-16">
    <div className="flex flex-col items-center text-center">
      <SectionBadge>THE EXPERIENCE</SectionBadge>
      <h2 className="font-space-grotesk text-background text-2xl font-bold mt-4">
        4 Days. 4 Experiences.{" "}
        <span className="text-primary">1 Mission.</span>
      </h2>
      <p className="mt-4 text-background/50 font-google-sans text-sm max-w-xs leading-relaxed">
        Closing the distance between campus and industry, one day at a time.
      </p>
    </div>
    <div className="mt-12 flex flex-col gap-6 max-w-sm mx-auto">
      {EXPERIENCES.map((exp) => (
        <ExperienceCard key={exp.day} experience={exp} />
      ))}
    </div>
  </section>
);

const ExperienceSection = () => (
  <>
    <DesktopDeck />
    <MobileStack />
  </>
);

export default ExperienceSection;
