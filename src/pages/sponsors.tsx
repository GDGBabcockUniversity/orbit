import { Link } from "react-router-dom";
import { SPONSORS } from "../lib/constants";
import SectionBadge from "../components/ui/section-badge";

const SponsorsPage = () => {
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
        <SectionBadge>SPONSORS &amp; PARTNERS</SectionBadge>
        <h1 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold text-background mt-5">
          Our Sponsors &amp; Partners
        </h1>
        <p className="mt-4 text-background/50 font-google-sans text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          ORBIT is made possible by companies and communities invested in
          closing the distance between campus and industry.
        </p>
      </div>

      {/* Sponsors section */}
      <div className="px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-space-grotesk text-xl md:text-2xl font-bold text-background">
            Sponsors
          </h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {SPONSORS.map((sponsor) => (
              <div
                key={sponsor.name}
                className="aspect-square rounded-xl border border-background/8 bg-surface overflow-hidden"
              >
                {sponsor.logo ? (
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-background/30 font-google-sans text-sm">
                      {sponsor.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-background/50 font-google-sans text-sm md:text-base mb-6">
              Interested in supporting ORBIT?
            </p>
            <a
              href="/docs/orbit.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white font-google-sans text-sm tracking-wider px-8 py-3.5 rounded-full hover:bg-primary-mid transition inline-flex items-center gap-2"
            >
              Partner with ORBIT
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
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorsPage;
