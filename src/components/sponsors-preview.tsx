import { Link } from "react-router-dom";
import { SPONSORS } from "../lib/constants";
import SectionBadge from "./ui/section-badge";

const SponsorsPreview = () => (
  <section className="bg-surface px-6 md:px-12 lg:px-20 py-16 md:py-24">
    <div className="max-w-5xl mx-auto text-center">
      <SectionBadge>SPONSORS &amp; PARTNERS</SectionBadge>
      <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-background mt-5">
        Backed by the best.
      </h2>
      <p className="mt-4 text-background/50 font-google-sans text-sm md:text-base max-w-lg mx-auto leading-relaxed">
        ORBIT is made possible by companies and communities invested in the
        future of African tech talent.
      </p>

      {/* Sponsor logos */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
        {SPONSORS.slice(0, 8).map((sponsor) => (
          <div
            key={sponsor.name}
            className="w-36 md:w-44 aspect-square rounded-xl border border-background/8 bg-white overflow-hidden"
          >
            {sponsor.logo ? (
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-full h-full object-contain mix-blend-multiply"
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

      {/* CTAs */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/sponsors"
          className="bg-primary text-white font-google-sans text-sm tracking-wider px-7 py-3.5 rounded-full hover:bg-primary-mid transition inline-flex items-center gap-2"
        >
          View All Sponsors &amp; Partners
        </Link>
        <a
          href="/docs/orbit.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-background/20 text-background/70 font-google-sans text-sm tracking-wider px-7 py-3.5 rounded-full hover:border-background/40 hover:text-background transition"
        >
          Partner with ORBIT
        </a>
      </div>
    </div>
  </section>
);

export default SponsorsPreview;
