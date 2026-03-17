import { WHY_ORBIT } from "../lib/constants";
import SectionBadge from "./ui/section-badge";

const WhyOrbitSection = () => (
  <section className="bg-background px-6 md:px-12 lg:px-20 py-16 md:py-24">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <SectionBadge>WHY ORBIT</SectionBadge>
        <h2 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-5">
          What you actually walk away with.
        </h2>
      </div>

      {/* Value cards */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {WHY_ORBIT.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/8 bg-white/3 p-7 md:p-9 group hover:bg-white/6 transition-colors"
          >
            <div className="bg-white text-primary rounded-full size-10 flex items-center justify-center font-space-grotesk text-lg font-bold mb-5">
              {i + 1}
            </div>
            <h3 className="font-space-grotesk text-foreground font-bold text-lg md:text-xl">
              {item.title}
            </h3>
            <p className="mt-2 text-foreground/45 font-google-sans text-sm md:text-base leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Closing line */}
      <p className="mt-12 text-center text-foreground/35 font-google-sans text-sm md:text-base max-w-lg mx-auto leading-relaxed italic">
        ORBIT brings students, companies, founders, and opportunities into the
        same space.
      </p>
    </div>
  </section>
);

export default WhyOrbitSection;
