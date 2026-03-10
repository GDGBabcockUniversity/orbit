import { useState } from "react";
import { FAQS } from "../lib/constants";

const FAQItem = ({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[number];
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div
    className={`border border-primary/30 rounded-2xl overflow-hidden transition-colors ${
      isOpen ? "bg-primary/5" : ""
    }`}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
    >
      <span className="font-space-grotesk text-foreground font-semibold text-sm md:text-base pr-4">
        {faq.question}
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={`size-5 text-foreground/50 shrink-0 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
    <div
      className={`grid transition-all duration-300 ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        <p className="px-6 pb-5 font-google-sans text-foreground/50 text-sm leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-background px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-space-grotesk text-2xl md:text-3xl font-bold text-foreground text-center">
          Frequently Asked Questions
        </h2>

        <div className="mt-10 flex flex-col gap-4">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
