import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../lib/constants";
import OrbitLogo from "./orbit-logo";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav
        className={`relative z-50 mx-auto flex items-center justify-between px-6 md:px-10 py-4 border-b transition-colors ${mobileOpen ? "bg-background border-transparent" : "bg-background/80 backdrop-blur-md border-white/5"}`}
      >
        {/* Logo */}
        <Link to="/" onClick={() => setMobileOpen(false)}>
          <OrbitLogo inverted />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-white/60 hover:text-white font-google-sans text-sm transition"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={isHome ? link.href : `/${link.href}`}
                className="text-white/60 hover:text-white font-google-sans text-sm transition"
              >
                {link.label}
              </a>
            ),
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            to="/tickets"
            className="bg-primary text-white font-google-sans text-sm tracking-wider px-6 py-2.5 rounded-full hover:bg-primary-mid transition inline-flex items-center gap-2"
          >
            Get Tickets
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative size-10 flex items-center justify-center cursor-pointer"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45" : "-translate-y-[6px]"}`}
          />
          <span
            className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45" : "translate-y-[6px]"}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-6">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white/80 hover:text-white font-google-sans text-lg transition"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={isHome ? link.href : `/${link.href}`}
                onClick={() => setMobileOpen(false)}
                className="text-white/80 hover:text-white font-google-sans text-lg transition"
              >
                {link.label}
              </a>
            ),
          )}
          <Link
            to="/tickets"
            onClick={() => setMobileOpen(false)}
            className="mt-4 bg-primary text-white font-google-sans text-sm tracking-wider px-8 py-3 rounded-full hover:bg-primary-mid transition"
          >
            Get Tickets
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
