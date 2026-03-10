import { Link } from "react-router-dom";
import { IMAGES } from "../lib/constants";
import OrbitLogo from "./orbit-logo";

const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Speakers", href: "/speakers" },
  { label: "Sponsors & Partners", href: "/sponsors" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

const Footer = () => (
  <footer id="contact" className="bg-background border-t border-white/5 px-6 md:px-12 py-12 md:py-16">
    <div className="max-w-6xl mx-auto">
      {/* Top row */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        {/* Logo + branding */}
        <div>
          <OrbitLogo inverted />
          <p className="mt-3 text-white/50 font-google-sans text-sm max-w-xs leading-relaxed">
            ORBIT 1.0 &mdash; Closing the Distance.
            <br />
            <span className="italic text-white/35">
              Where campus meets industry.
            </span>
          </p>
          {/* GDG Babcock logo */}
          <div className="mt-5 flex items-center gap-2">
            <img
              src={IMAGES.gdgBabcock.src}
              alt="GDG on Campus, Babcock University"
              className="h-8 w-auto"
            />
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {FOOTER_LINKS.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-white/50 hover:text-white font-google-sans text-sm transition"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-white/50 hover:text-white font-google-sans text-sm transition"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        {/* Socials */}
        <div className="flex gap-3">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p className="text-white/30 font-google-sans text-xs">
          &copy; {new Date().getFullYear()} ORBIT by GDG on Campus, Babcock.
          All rights reserved.
        </p>
        <p className="text-white/30 font-google-sans text-xs">
          March 29 &ndash; April 2, 2026 &middot; Babcock University,
          Ilishan-Remo
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
