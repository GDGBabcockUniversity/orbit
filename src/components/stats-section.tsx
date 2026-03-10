import { DETAILED_STATS } from "../lib/constants";
import SectionBadge from "./ui/section-badge";

const gridPositions = [
  "col-span-7",
  "col-span-5",
  "col-span-6",
  "col-span-6",
  "col-span-5",
  "col-span-7",
];

const StatCard = ({
  stat,
  className,
}: {
  stat: (typeof DETAILED_STATS)[number];
  className: string;
}) => {
  const isPurple = stat.variant === "purple";

  return (
    <div
      className={`relative rounded-2xl p-6 md:p-8 overflow-hidden ${isPurple
          ? "bg-linear-to-r from-primary via-primary-mid to-primary-bright text-white"
          : "bg-white border border-background/8 text-background"
        } ${className}`}
    >
      {/* Decorative circle */}
      <div
        className={`absolute -bottom-6 -right-6 size-24 md:size-28 rounded-full ${isPurple ? "bg-white/10" : "bg-primary/8"
          }`}
      />

      <p
        className={`font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold relative z-10 ${isPurple ? "text-white" : "text-primary"
          }`}
      >
        {stat.value}
      </p>
      <p
        className={`font-google-sans text-sm md:text-base mt-2 relative z-10 leading-relaxed ${isPurple ? "text-white/80" : "text-background/50"
          }`}
      >
        {stat.label}
      </p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="bg-foreground px-6 md:px-12 lg:px-20 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <SectionBadge>BY THE NUMBERS</SectionBadge>
        <h2 className="font-space-grotesk text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight mt-5">
          <span className="text-background">
            The most career-hungry, discipline student audience{" "}
          </span>
          <span className="text-primary">
            in Nigeria&rsquo;s Private university sector.
          </span>
        </h2>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 mt-10 md:mt-14">
          {DETAILED_STATS.map((stat, i) => (
            <StatCard
              key={stat.value + stat.label}
              stat={stat}
              className={`${gridPositions[i]} max-md:col-span-1`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
