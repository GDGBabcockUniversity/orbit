export const IMAGES = {
  logo: { src: "/images/svgs/logo.svg", width: 100, height: 100 },
  logoPng: { src: "/images/pngs/logo.png" },
  logoBlack: { src: "/images/pngs/logo-black.png" },
  gdgBabcock: { src: "/images/pngs/gdg-babcock-logo.png" },
  sponsors: { src: "/images/svgs/sponsors.svg", width: 21, height: 22 },
  partners: { src: "/images/svgs/partners.svg", width: 20, height: 20 },
  rocket: { src: "/images/svgs/rocket.svg", width: 19, height: 19 },
  schedule: { src: "/images/svgs/schedule.svg", width: 20, height: 20 },
  speakers: { src: "/images/svgs/speakers.svg", width: 20, height: 17 },
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Speakers", href: "/speakers" },
  { label: "Sponsors & Partners", href: "/docs/orbit.pdf" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "mailto:partnerships@gdgbabcock.com" },
];

export const HERO_STATS = [
  { value: "1,500+", label: "Expected Attendees" },
  { value: "4", label: "Days of Programming" },
  { value: "50+", label: "Companies & Partners" },
  { value: "13K+", label: "University Population" },
];

export const EXPERIENCES = [
  {
    day: 1,
    title: "Hackathon",
    description:
      "Build, break, and ship in 24 hours alongside mentors from top companies.",
    image: "/images/pngs/day-one.png",
  },
  {
    day: 2,
    title: "Field Trips",
    description:
      "Step inside the offices of leading tech companies across Lagos.",
    image: "/images/pngs/day-two.png",
  },
  {
    day: 3,
    title: "Panel Discussions",
    description:
      "Honest conversations with founders, engineers, and operators shaping the African tech ecosystem.",
    image: "/images/pngs/day-three.png",
  },
  {
    day: 4,
    title: "Career Fair & Closing",
    description:
      "Meet recruiters, drop your CV, and walk away with real leads\u200A\u2014\u200Anot just swag.",
    image: "/images/pngs/day-four.png",
  },
];

export const WHY_ORBIT = [
  {
    title: "Direct access to employers",
    description:
      "Not a job board. Face-to-face conversations with companies actively hiring.",
  },
  {
    title: "Real industry exposure",
    description:
      "Field trips, behind-the-scenes access, and panels with people who build real products.",
  },
  {
    title: "Career conversations that matter",
    description:
      "CV reviews, mock interviews, and mentorship from engineers, founders, and operators.",
  },
  {
    title: "A clearer path forward",
    description:
      "Internships, entry points, and connections that don\u2019t expire after the event.",
  },
];

export const SPEAKERS = [
  {
    name: "Dr. Adebayo Okonkwo",
    role: "AI Research Lead",
    company: "Google DeepMind",
    bio: "Pioneering AI research with a focus on machine learning for African contexts and beyond.",
  },
  {
    name: "Ngozi Adekunle",
    role: "Senior Engineer",
    company: "Microsoft",
    bio: "Building accessible cloud infrastructure that powers millions of businesses across emerging markets.",
  },
  {
    name: "Kwame Mensah",
    role: "CTO",
    company: "Paystack",
    bio: "Architecting payment systems that simplify commerce for businesses across Africa.",
  },
  {
    name: "Aisha Bello",
    role: "Design Director",
    company: "Andela",
    bio: "Leading design systems that bridge the gap between African talent and global opportunities.",
  },
  {
    name: "Samuel Osei",
    role: "Head of Engineering",
    company: "Interswitch",
    bio: "Scaling fintech platforms to handle billions of transactions across the African continent.",
  },
  {
    name: "Zainab Ibrahim",
    role: "ML Engineer",
    company: "Google",
    bio: "Developing machine learning models that understand and serve diverse African languages.",
  },
];

export const DETAILED_STATS = [
  {
    value: "1,500+",
    label: "Expected student attendees",
    variant: "purple" as const,
  },
  {
    value: "1,000+",
    label: "Career Fair foot traffic",
    variant: "light" as const,
  },
  {
    value: "500+",
    label: "Panel discussion attendees",
    variant: "light" as const,
  },
  {
    value: "100+",
    label: "Hackathon participants",
    variant: "light" as const,
  },
  {
    value: "50K+",
    label: "Social media impressions",
    variant: "light" as const,
  },
  {
    value: "13K+",
    label: "Babcock University student population",
    variant: "purple" as const,
  },
];

export const SPONSORS_PLACEHOLDER = {
  sponsors: [] as { name: string; logo: string }[],
  communityPartners: [] as { name: string; logo: string }[],
};

export const FAQS = [
  {
    question: "What is ORBIT?",
    answer:
      "ORBIT is a 4-day industry summit organized by GDG on Campus, Babcock University. Built around the theme \u201CClosing the Distance,\u201D it brings students and industry together through four distinct experiences: a hackathon, company field trips, panel discussions, and a career fair.",
  },
  {
    question: "Who is ORBIT for?",
    answer:
      "ORBIT is for students looking to break into tech, early-career professionals exploring new paths, companies looking to recruit top talent, and sponsors or exhibitors who want visibility in front of Nigeria\u2019s most ambitious student community.",
  },
  {
    question: "When and where is ORBIT happening?",
    answer:
      "ORBIT 1.0 runs from March 29 to April 2, 2026 at Babcock University, Ilishan-Remo, Ogun State, Nigeria.",
  },
  {
    question: "Does one ticket cover the full 4-day event?",
    answer:
      "Yes. A single ticket gives you access to all four days of ORBIT\u200A\u2014\u200Athe hackathon, field trips, panel discussions, and the career fair. Some experiences may have limited capacity, so early registration is recommended.",
  },
  {
    question: "Can companies participate in ORBIT?",
    answer:
      "Absolutely. Companies can participate as sponsors, career fair exhibitors, field trip hosts, or panelists. If you\u2019re interested, reach out through our partnership page or contact us directly.",
  },
  {
    question: "How do I register?",
    answer:
      "Click the \u201CGet Tickets\u201D button anywhere on the site to register. Student tickets are free with a valid university ID. Early bird pricing is available for external attendees.",
  },
];

export const TEAM_MEMBERS = [
  { name: "Xavier Himself", role: "Head of Events" },
  { name: "Amara Okafor", role: "Lead Designer" },
  { name: "Tunde Adeyemi", role: "Tech Lead" },
  { name: "Chioma Nwosu", role: "Marketing Director" },
  { name: "David Mensah", role: "Partnerships Lead" },
  { name: "Fatima Hassan", role: "Operations Manager" },
  { name: "Kofi Asante", role: "Community Manager" },
  { name: "Blessing Eze", role: "Content Strategist" },
];
