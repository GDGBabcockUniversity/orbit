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
    className={`relative bg-foreground rounded-3xl p-8 md:p-12 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden h-full ${className}`}
    style={style}
  >
    {/* Day badge */}
    <div className="bg-primary/10 text-primary rounded-full size-10 md:size-14 flex items-center justify-center font-space-grotesk text-lg md:text-2xl font-bold mb-6 md:mb-8">
      {experience.day}
    </div>

    {/* Title */}
    <h3 className="font-space-grotesk font-bold text-background text-xl md:text-2xl xl:text-3xl leading-snug">
      Day {experience.day} &mdash; {experience.title}
    </h3>

    {/* Description */}
    <p className="mt-3 md:mt-4 text-background/50 font-google-sans text-sm md:text-base xl:text-lg leading-relaxed max-w-md">
      {experience.description}
    </p>
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
        <div className="w-[40%] pl-12 lg:pl-20 xl:pl-28 pr-8">
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
        <div className="w-[60%] h-full flex items-center justify-center relative">
          {EXPERIENCES.map((exp, i) => {
            const pos = (i - activeIndex + totalCards) % totalCards;
            const translateX = pos * 50;
            const translateY = pos * -35;
            const scale = 1 - pos * 0.04;
            const zIndex = totalCards - pos;
            const opacity = pos > 2 ? 0 : 1 - pos * 0.1;

            return (
              <div
                key={exp.day}
                className="absolute transition-all duration-500 ease-out"
                style={{
                  width: "min(550px, 85%)",
                  height: 400,
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
