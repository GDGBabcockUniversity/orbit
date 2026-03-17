import { Link } from "react-router-dom";
import { SPEAKERS } from "../lib/constants";
import SectionBadge from "../components/ui/section-badge";

const SpeakersPage = () => {
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
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SPEAKERS.map((speaker, i) => (
            <div key={i} className="group">
              {/* Photo */}
              <div className="aspect-3/4 rounded-2xl overflow-hidden bg-linear-to-br from-primary-bright via-primary to-primary-deep mb-4 relative">
                {speaker.image ? (
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-space-grotesk text-white/20 text-4xl font-bold">
                      {speaker.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="font-space-grotesk text-background font-bold text-base">
                {speaker.name}
              </h3>
              <p className="font-google-sans text-primary text-sm mt-0.5">
                {speaker.role}
                {speaker.company && ","} {speaker.company}
              </p>
              <p className="font-google-sans text-background/50 text-sm mt-2 leading-relaxed">
                {speaker.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeakersPage;
