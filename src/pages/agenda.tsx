import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AGENDA_ITEMS } from "../lib/constants";
import SectionBadge from "../components/ui/section-badge";

const AgendaPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24">
      {/* Background effects */}
      <div className="hero-planet-glow opacity-30" />
      <div className="hero-grain" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <SectionBadge>THE PLAN</SectionBadge>
          <h1 className="font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-4">
            Conference Agenda
          </h1>
          <p className="text-white/50 font-google-sans text-lg max-w-xl mx-auto">
            A packed schedule of keynotes, panels, and networking designed to
            close the distance between campus and industry.
          </p>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
          {AGENDA_ITEMS.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-10.25 md:-left-14.25 top-1.5 size-4 rounded-full bg-primary/20 border border-primary/50 group-hover:bg-primary group-hover:scale-125 transition duration-300" />

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition duration-300 backdrop-blur-sm">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary-bright text-xs font-bold font-google-sans tracking-wide mb-4">
                  {item.time}
                </span>

                <h3 className="text-xl md:text-2xl font-space-grotesk font-bold text-white mb-2">
                  {item.title}
                </h3>

                {item.speaker && (
                  <div className="flex items-start gap-2 mb-3 text-white/80 font-google-sans text-sm md:text-base">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="size-5 shrink-0 mt-0.5 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="leading-relaxed whitespace-pre-line">
                      {item.speaker.split(" | ").map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </div>
                )}

                {item.description && (
                  <p className="text-white/50 font-google-sans leading-relaxed text-sm md:text-base mt-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-white/40 font-google-sans mb-6">
            Ready to experience it live?
          </p>
          <Link
            to="/tickets"
            className="inline-flex items-center justify-center bg-primary text-white font-google-sans text-sm tracking-wider px-8 py-4 rounded-full hover:bg-primary-mid transition gap-2.5 font-bold"
          >
            Claim Your Ticket
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-4"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AgendaPage;
