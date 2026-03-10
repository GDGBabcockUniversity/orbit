import { useState, useCallback } from "react";
import { TEAM_MEMBERS } from "../lib/constants";

const TeamSection = () => {
  const total = TEAM_MEMBERS.length;
  const [active, setActive] = useState(Math.floor(total / 2));

  const prev = useCallback(
    () => setActive((i) => (i - 1 + total) % total),
    [total],
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % total),
    [total],
  );

  const getOffset = (index: number) => {
    let diff = index - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section className="bg-surface py-16 md:py-24 overflow-hidden">
      {/* Header */}
      <div className="text-center px-6">
        <p className="text-background/40 font-google-sans text-xs tracking-[0.2em] uppercase">
          THE PEOPLE BEHIND THE MAGIC
        </p>
        <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-background mt-3">
          Meet the Team
        </h2>
      </div>

      {/* Carousel -- same layout as speakers */}
      <div className="relative mt-12 md:mt-16 h-[420px] md:h-[480px]">
        <div className="absolute inset-0 flex items-center justify-center">
          {TEAM_MEMBERS.map((member, i) => {
            const offset = getOffset(i);
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;

            if (absOffset > 3) return null;

            const cardWidth = isCenter ? 300 : 160;
            const cardHeight = isCenter ? 420 : 360;
            const translateX = isCenter
              ? 0
              : offset * 170 + (offset > 0 ? 40 : -40);

            return (
              <div
                key={i}
                className="absolute transition-all duration-500 ease-out cursor-pointer"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  transform: `translateX(${translateX}px)`,
                  zIndex: total - absOffset,
                  opacity: absOffset > 2 ? 0.4 : 1 - absOffset * 0.1,
                }}
                onClick={() => setActive(i)}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden bg-linear-to-b from-primary-deep/40 via-background to-background relative border border-white/5 shadow-xl">
                  <div className="absolute inset-0 bg-linear-to-b from-primary-deep/20 to-background/90" />

                  {isCenter && (
                    <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                      <h3 className="font-space-grotesk text-white font-bold text-lg leading-tight">
                        {member.name}
                      </h3>
                      <p className="font-google-sans text-primary-bright text-sm mt-1">
                        {member.role}
                      </p>
                    </div>
                  )}

                  {!isCenter && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-space-grotesk text-white/15 text-xs tracking-[0.3em] uppercase [writing-mode:vertical-lr] rotate-180">
                        {member.name.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <button
          onClick={prev}
          className="size-10 rounded-full border border-background/15 flex items-center justify-center text-background/50 hover:border-background/30 hover:text-background transition cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex gap-1.5 mx-3">
          {TEAM_MEMBERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${i === active ? "w-6 bg-primary" : "w-2 bg-background/15"
                }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="size-10 rounded-full border border-background/15 flex items-center justify-center text-background/50 hover:border-background/30 hover:text-background transition cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* CTA */}
      {/* <div className="text-center mt-10">
        <button className="bg-primary text-white font-google-sans text-sm tracking-wider px-7 py-3.5 rounded-full inline-flex items-center gap-2.5 hover:bg-primary-mid transition cursor-pointer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
            <path
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Meet the Full Team
          <span className="text-white/70">&rarr;</span>
        </button>
      </div> */}
    </section>
  );
};

export default TeamSection;
