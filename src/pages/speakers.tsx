import { useState } from "react";
import { Link } from "react-router-dom";
import { SPEAKERS } from "../lib/constants";
import SectionBadge from "../components/ui/section-badge";

const SpeakersPage = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const speaker = selected !== null ? SPEAKERS[selected] : null;

  return (
    <div className="bg-foreground min-h-screen pt-24">
      {/* Back link */}
      <div className="px-6 md:px-12 pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-background/60 font-google-sans text-sm hover:text-background transition"
        >
          <span>&larr;</span>
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="text-center px-6 pt-8 pb-4">
        <SectionBadge>ALL SPEAKERS</SectionBadge>
        <h1 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold text-background mt-5">
          Our Full Speaker Lineup
        </h1>
        <p className="mt-4 text-background/50 font-google-sans text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          An exceptional group of thought leaders, innovators, and practitioners
          from across the African tech ecosystem and beyond.
        </p>
      </div>

      {/* Speaker grid */}
      <div className="px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPEAKERS.map((s, i) => (
            <div
              key={i}
              className="group cursor-pointer"
              onClick={() => setSelected(i)}
            >
              {/* Photo */}
              <div className="aspect-3/4 rounded-2xl overflow-hidden bg-linear-to-br from-primary-bright via-primary to-primary-deep relative">
                {s.image ? (
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-space-grotesk text-white/20 text-6xl font-bold">
                      {s.name.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="font-google-sans text-white text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    View Bio
                  </span>
                </div>
              </div>

              {/* Info */}
              <h3 className="font-space-grotesk text-background font-bold text-base mt-4">
                {s.name}
              </h3>
              <p className="font-google-sans text-primary text-sm mt-0.5">
                {s.role}
                {s.company && ","} {s.company}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {speaker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelected(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]" />

          {/* Modal content */}
          <div
            className="relative bg-background border border-white/10 rounded-3xl overflow-hidden max-w-2xl w-full max-h-[85vh] flex flex-col md:flex-row animate-[modalIn_300ms_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 size-9 rounded-full bg-black/40 backdrop-blur-sm text-white/70 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Photo side */}
            <div className="md:w-2/5 shrink-0 aspect-square md:aspect-auto bg-linear-to-br from-primary-bright via-primary to-primary-deep relative">
              {speaker.image ? (
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center min-h-48">
                  <span className="font-space-grotesk text-white/20 text-7xl font-bold">
                    {speaker.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Info side */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1">
              <h2 className="font-space-grotesk text-white font-bold text-2xl leading-tight">
                {speaker.name}
              </h2>
              <p className="font-google-sans text-primary-bright text-sm mt-1.5">
                {speaker.role}
                {speaker.company && ","} {speaker.company}
              </p>

              {speaker.bio && (
                <div className="mt-6 font-google-sans text-white/60 text-sm leading-relaxed space-y-4 whitespace-pre-line">
                  {speaker.bio}
                </div>
              )}

              {!speaker.bio && (
                <p className="mt-6 font-google-sans text-white/30 text-sm italic">
                  Bio coming soon.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Keyframe styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SpeakersPage;
