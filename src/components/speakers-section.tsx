import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { SPEAKERS } from "../lib/constants";
import SectionBadge from "./ui/section-badge";

const SpeakersSection = () => {
  const total = SPEAKERS.length;
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
    <section id="speakers" className="bg-background py-16 md:py-24 overflow-hidden">
      {/* Header */}
      <div className="text-center px-6">
        <SectionBadge>SPEAKERS</SectionBadge>
        <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-foreground mt-5">
          The conversations shaping the ecosystem.
        </h2>
        <p className="mt-4 text-foreground/45 font-google-sans text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Engineers, founders, and operators from across the African tech
          industry&hairsp;&mdash;&hairsp;sharing real insights, not keynote fluff.
        </p>
      </div>

      {/* Arrow controls */}
      <div className="flex items-center justify-center gap-4 mt-8 md:mt-10">
        <button
          onClick={prev}
          className="size-10 rounded-full border border-foreground/15 flex items-center justify-center text-foreground/50 hover:border-foreground/30 hover:text-foreground transition cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={next}
          className="size-10 rounded-full border border-foreground/15 flex items-center justify-center text-foreground/50 hover:border-foreground/30 hover:text-foreground transition cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Carousel */}
      <div className="relative mt-8 h-[420px] md:h-[480px]">
        <div className="absolute inset-0 flex items-center justify-center">
          {SPEAKERS.map((speaker, i) => {
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
                  {speaker.image ? (
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/95" />

                  {isCenter && (
                    <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                      <h3 className="font-space-grotesk text-white font-bold text-lg leading-tight">
                        {speaker.name}
                      </h3>
                      <p className="font-google-sans text-primary-bright text-sm mt-1">
                        {speaker.role}{speaker.company && ','} {speaker.company}
                      </p>
                      <p className="font-google-sans text-white/60 text-xs mt-2 leading-relaxed line-clamp-2">
                        {speaker.bio}
                      </p>
                    </div>
                  )}

                  {!isCenter && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-space-grotesk text-white/15 text-xs tracking-[0.3em] uppercase [writing-mode:vertical-lr] rotate-180">
                        {speaker.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {SPEAKERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all cursor-pointer ${i === active ? "w-6 bg-primary" : "w-2 bg-foreground/15"
              }`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link
          to="/speakers"
          className="bg-primary text-white font-google-sans text-sm tracking-wider px-7 py-3.5 rounded-full inline-flex items-center gap-2.5 hover:bg-primary-mid transition"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
            <path
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          See all Speakers
        </Link>
      </div>
    </section>
  );
};

export default SpeakersSection;
