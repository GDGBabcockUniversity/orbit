const OrbitLogo = ({ inverted = false }: { inverted?: boolean }) => (
  <div
    className={`flex items-center gap-1.5 font-rosnoc text-4xl lg:text-5xl tracking-widest ${inverted ? "text-foreground" : "text-background"
      }`}
  >
    <img
      src="/images/pngs/logo.png"
      alt="O"
      className={`h-7 lg:h-9 w-auto ${inverted ? "brightness-0 invert" : "brightness-0"
        }`}
    />
    <span className="font-semibold">RBIT</span>
  </div>
);

export default OrbitLogo;
