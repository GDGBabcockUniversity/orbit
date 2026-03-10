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
    <section className="bg-foreground py-16 md:py-24 overflow-hidden">
      {/* Header */}
      <div className="text-center px-6">
        <SectionBadge>SPEAKERS</SectionBadge>
        <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-background mt-5">
          Meet Our Speakers
        </h2>
        <p className="mt-4 text-background/50 font-google-sans text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          We&rsquo;ve raised the bar this year with our impressive lineup of
          speakers, each prepared to share valuable insights on different aspects
          of the tech community.
        </p>
      </div>

      {/* Arrow controls */}
      <div className="flex items-center justify-center gap-4 mt-8 md:mt-10">
        <button
          onClick={prev}
          className="size-10 rounded-full border border-background/15 flex items-center justify-center text-background/50 hover:border-background/30 hover:text-background transition cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={next}
          className="size-10 rounded-full border border-background/15 flex items-center justify-center text-background/50 hover:border-background/30 hover:text-background transition cursor-pointer"
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
                <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-background via-background to-primary-deep relative shadow-xl">
                  {/* Placeholder image area */}
                  <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />

                  {/* Speaker info -- only on center card */}
                  {isCenter && (
                    <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                      <h3 className="font-space-grotesk text-white font-bold text-lg leading-tight">
                        {speaker.name}
                      </h3>
                      <p className="font-google-sans text-primary-bright text-sm mt-1">
                        {speaker.role}, {speaker.company}
                      </p>
                      <p className="font-google-sans text-white/60 text-xs mt-2 leading-relaxed line-clamp-2">
                        {speaker.bio}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <span className="size-8 rounded-full bg-white/10 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 text-white/70">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </span>
                        <span className="size-8 rounded-full bg-white/10 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 text-white/70">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Side card overlay label */}
                  {!isCenter && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-space-grotesk text-white/20 text-xs tracking-[0.3em] uppercase [writing-mode:vertical-lr] rotate-180">
                        SPEAKER NAME
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
            className={`h-2 rounded-full transition-all cursor-pointer ${
              i === active ? "w-6 bg-primary" : "w-2 bg-background/15"
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
