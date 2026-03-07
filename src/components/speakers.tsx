const SPEAKERS = [
  {
    name: "AISHA OKAFOR",
    role: "Principal Engineer",
    company: "Google",
    tags: ["Cloud", "Infrastructure"],
  },
  {
    name: "CHIOMA EZEOKE",
    role: "Head of Products",
    company: "Figma",
    tags: ["Design", "Infrastructure"],
  },
  {
    name: "ENIOLA ADEYEMI",
    role: "AI Research Lead",
    company: "OpenAI",
    tags: ["AI/ML", "Research"],
  },
  {
    name: "TUNDE OLUWASEUN",
    role: "Founder & CTO",
    company: "Flutterwave",
    tags: ["Mobile", "Fintech"],
  },
  {
    name: "ZAINAB LAWAL",
    role: "Security Engineer",
    company: "Microsoft",
    tags: ["Cloud", "Security"],
  },
  {
    name: "SEUN ELEGBEDE",
    role: "Web Platform Architect",
    company: "Meta",
    tags: ["Web", "Performance"],
  },
];

const Speakers = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Rows */}
        <div className="divide-y divide-white/10">
          {SPEAKERS.map((speaker) => (
            <div
              key={speaker.name}
              className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0 py-8 md:py-10 group cursor-pointer"
            >
              {/* Left: Role & Company */}
              <div className="md:w-[20%] shrink-0">
                <p className="text-foreground/70 font-google-sans text-sm md:text-base leading-snug">
                  {speaker.role}
                </p>
                <p className="text-foreground/40 font-google-sans text-xs md:text-sm mt-0.5">
                  {speaker.company}
                </p>
              </div>

              {/* Center: Name */}
              <div className="md:flex-1">
                <h3 className="font-rosnoc uppercase text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[0.04em] transition-colors duration-300">
                  {speaker.name}
                </h3>
              </div>

              {/* Right: Tags */}
              <div className="flex items-center gap-2 md:gap-3 shrink-0">
                {speaker.tags.map((tag) => (
                  <span
                    key={tag}
                    className="hero-ticket-btn border border-white/20 text-foreground rounded-full px-4 py-1.5 font-google-sans text-xs md:text-sm tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
