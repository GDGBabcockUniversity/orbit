const SectionBadge = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-block bg-primary text-white text-[11px] font-google-sans font-medium tracking-[0.15em] uppercase px-5 py-2 rounded-full ${className}`}
  >
    {children}
  </span>
);

export default SectionBadge;
