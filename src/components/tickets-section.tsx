import SectionBadge from "./ui/section-badge";

const TICKET_CARDS = [
  { rotate: -12, translateY: 20, zIndex: 1 },
  { rotate: 0, translateY: -10, zIndex: 3 },
  { rotate: 12, translateY: 20, zIndex: 1 },
];

const TicketsSection = () => {
  return (
    <section className="bg-background px-6 py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <SectionBadge>TICKETS</SectionBadge>

        <h2 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold mt-6 leading-tight">
          <span className="text-foreground">Don&rsquo;t Miss Out &mdash;</span>
          <br />
          <span className="text-primary">Get Your Ticket Now!</span>
        </h2>

        <p className="mt-4 text-foreground/40 font-google-sans text-sm md:text-base">
          Secure your spot at Nigeria&rsquo;s biggest tech career fair.
        </p>

        {/* CTA */}
        <button className="mt-8 bg-primary text-white font-google-sans text-sm tracking-wider px-8 py-3.5 rounded-full inline-flex items-center gap-2.5 hover:bg-primary-mid transition cursor-pointer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
            <path
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Get Tickets
        </button>

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
