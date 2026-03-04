function HeroSection() {
  return (
    <section className="h-screen bg-background relative overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full z-1"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1920 1080H0V0H1920V1080ZM272.197 16C262.581 16 253.474 20.3252 247.396 27.7783L213.604 69.2217C207.526 76.6748 198.419 81 188.803 81H45C27.3269 81 13 95.3269 13 113V1032C13 1049.67 27.3269 1064 45 1064H1872C1889.67 1064 1904 1049.67 1904 1032V48C1904 30.3269 1889.67 16 1872 16H272.197Z"
          fill="var(--color-foreground)"
        />
      </svg>

      {/* Content layer — sits on top of the SVG frame */}
      <div className="relative z-10 h-full">
        <p>hi</p>
      </div>
    </section>
  );
}

export default HeroSection;
