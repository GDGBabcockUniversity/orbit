import SectionBadge from "./ui/section-badge";

const TICKET_CARDS = [
  { rotate: -12, translateY: 20, zIndex: 1 },
  { rotate: 0, translateY: -10, zIndex: 3 },
  { rotate: 12, translateY: 20, zIndex: 1 },
];

const TicketsSection = () => {
  return (
    <section id="tickets" className="bg-background px-6 py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-center">
        <SectionBadge>GET INVOLVED</SectionBadge>

        <h2 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold mt-6 leading-tight">
          <span className="text-foreground">Be part of</span>
          <br />
          <span className="text-primary">ORBIT 1.0</span>
        </h2>

        <p className="mt-4 text-foreground/40 font-google-sans text-sm md:text-base max-w-md mx-auto">
          Whether you&rsquo;re a student, a company, or a
          sponsor&hairsp;&mdash;&hairsp;there&rsquo;s a place for you.
        </p>

        {/* Triple CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="#"
            className="bg-primary text-white font-google-sans text-sm tracking-wider px-7 py-3.5 rounded-full hover:bg-primary-mid transition inline-flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
              <path
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Get Tickets
          </a>
          <a
            href="#contact"
            className="border border-foreground/20 text-foreground/70 font-google-sans text-sm tracking-wider px-7 py-3.5 rounded-full hover:border-foreground/40 hover:text-foreground transition"
          >
            Exhibit at the Career Fair
          </a>
          <a
            href="#contact"
            className="border border-foreground/20 text-foreground/70 font-google-sans text-sm tracking-wider px-7 py-3.5 rounded-full hover:border-foreground/40 hover:text-foreground transition"
          >
            Become a Sponsor
          </a>
        </div>

        {/* Ticket card fan */}
        <div className="relative mt-14 md:mt-20 h-[280px] md:h-[340px] flex items-center justify-center">
          {TICKET_CARDS.map((card, i) => (
            <div
              key={i}
              className="absolute w-[180px] h-[260px] md:w-[220px] md:h-[300px] rounded-3xl transition-transform duration-500"
              style={{
                transform: `rotate(${card.rotate}deg) translateY(${card.translateY}px)`,
                zIndex: card.zIndex,
              }}
            >
              <div className="w-full h-full rounded-3xl bg-linear-to-br from-primary-bright via-primary to-primary-deep shadow-2xl shadow-primary/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TicketsSection;
