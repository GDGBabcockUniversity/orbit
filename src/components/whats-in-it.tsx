const BENEFITS = [
  {
    number: 1,
    title: "REAL TALKS, NO FLUFF",
    description:
      "Sessions led by engineers and practitioners who actually ship — not polished keynotes designed to sell you something. Real deep tech ideas you can use on Monday.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-8"
      >
        <path
          d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: 2,
    title: "WORKSHOPS THAT GO DEEP",
    description:
      "Hands-on sessions where you write code, break things, and figure them out — with experts right beside you in the room, like a tutorial on turbocharge.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-8"
      >
        <path
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: 3,
    title: "A ROOM FULL OF YOUR PEOPLE",
    description:
      "Whether you're a student figuring out your stack or a senior dev tired of building in isolation — think of it as a meet-up for your tech community, amplified.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-8"
      >
        <path
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: 4,
    title: "SWAG WORTH KEEPING",
    description:
      "Not a pen. Not a stress ball. We're talking the kind of swag you actually want to live with — cool merch and limited-edition drops that slap.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-8"
      >
        <path
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const WhatsInItForYou = () => {
  return (
    <section className="bg-foreground px-6 py-16 md:py-24">
      {/* --- SECTION HEADER --- */}
      <div className="flex flex-col items-center text-center">
        {/* Question mark icon */}
        <div className="text-primary text-6xl font-rosnoc mb-4">?</div>

        <h2 className="font-rosnoc uppercase tracking-[0.08em] text-background text-2xl md:text-3xl">
          WHAT'S IN IT FOR
        </h2>
        <span className="font-rosnoc uppercase text-primary text-5xl md:text-6xl tracking-[0.06em] font-bold mt-1">
          YOU
        </span>

        <p className="mt-4 text-background/60 font-google-sans text-sm md:text-base max-w-xs md:max-w-md leading-relaxed">
          Everything you didn't know you needed from a dev event.
        </p>
      </div>

      {/* --- BENEFIT CARDS --- */}
      <div className="mt-12 flex flex-col gap-6 max-w-sm mx-auto">
        {BENEFITS.map((benefit) => (
          <div
            key={benefit.number}
            className="relative bg-foreground rounded-3xl border border-background/10 shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-8 flex flex-col items-center text-center"
          >
            {/* Number badge */}
            <div className="absolute -top-4 left-6 bg-foreground border border-background/10 rounded-full size-8 flex items-center justify-center font-google-sans text-sm text-background/50 shadow-sm">
              {benefit.number}
            </div>

            {/* Icon */}
            <div className="text-primary mb-5">{benefit.icon}</div>

            {/* Title */}
            <h3 className="font-rosnoc uppercase tracking-[0.08em] text-background text-lg leading-snug">
              {benefit.title}
            </h3>

            {/* Description */}
            <p className="mt-3 text-background/50 font-google-sans text-sm leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatsInItForYou;
