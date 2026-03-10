export const IMAGES = {
  logo: { src: "/images/svgs/logo.svg", width: 100, height: 100 },
  sponsors: { src: "/images/svgs/sponsors.svg", width: 21, height: 22 },
  partners: { src: "/images/svgs/partners.svg", width: 20, height: 20 },
  rocket: { src: "/images/svgs/rocket.svg", width: 19, height: 19 },
  schedule: { src: "/images/svgs/schedule.svg", width: 20, height: 20 },
  speakers: { src: "/images/svgs/speakers.svg", width: 20, height: 17 },
};

export const NAV_LINKS = ["ABOUT", "SCHEDULE", "SPONSORS", "CONTACT"];

export const HERO_LINKS = [
  { text: "SPEAKERS", image: IMAGES.speakers },
  { text: "SCHEDULE", image: IMAGES.schedule },
  { text: "SPONSORS", image: IMAGES.sponsors },
];

export const HERO_STATS = [
  { value: "1,500+", label: "Attendees" },
  { value: "50K+", label: "Social Impressions" },
  { value: "300+", label: "Top CVs" },
  { value: "13K+", label: "University Enrollment" },
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

export const SPEAKERS = [
  {
    name: "Dr. Adebayo Okonkwo",
    role: "AI Research Lead",
    company: "Google DeepMind",
    bio: "Pioneering AI research with a focus on machine learning for African contexts and beyond.",
  },
  {
    name: "Raj Patel",
    role: "VP of Product",
    company: "Flutterwave",
    bio: "Shaping the future of fintech in Africa through user-centered product design and strategy.",
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
  {
    name: "Emeka Nwankwo",
    role: "Founder & CEO",
    company: "TechCabal",
    bio: "Telling the stories of Africa's most innovative tech companies and the people behind them.",
  },
];

export const DETAILED_STATS = [
  {
    value: "1,500+",
    label: "Unique student attendees across the event",
    variant: "purple" as const,
  },
  {
    value: "1,000+",
    label: "Students at Career Fair foot traffic",
    variant: "light" as const,
  },
  {
    value: "500+",
    label: "In-person panel discussion attendees",
    variant: "light" as const,
  },
  {
    value: "50K+",
    label: "Social media impressions",
    variant: "light" as const,
  },
  {
    value: "300+",
    label: "Pre-qualified CVs from top students",
    variant: "light" as const,
  },
  {
    value: "13K+",
    label: "Total Babcock University enrollment",
    variant: "purple" as const,
  },
];

export const FAQS = [
  {
    question: "What is Orbit and who is it for?",
    answer:
      "Orbit is Nigeria's biggest tech career fair, organized by GDG Babcock. It's designed for students, early-career professionals, and anyone looking to connect with leading tech companies, explore opportunities, and grow their careers in tech.",
  },
  {
    question: "When and where is the event taking place?",
    answer:
      "Orbit 2026 takes place from March 29 to April 2, 2026 at Babcock University, Ilishan-Remo, Ogun State, Nigeria. Sessions run throughout the day with networking events in the evenings.",
  },
  {
    question: "How do I register or get a ticket?",
    answer:
      "You can register directly through our website by clicking the 'Get Tickets' button. Early bird tickets are available at a discounted rate. Student tickets are free with a valid university ID.",
  },
  {
    question: "Can I attend as a company or sponsor?",
    answer:
      "Absolutely! We offer various sponsorship tiers and exhibition packages for companies looking to recruit top talent, build brand awareness, or support the African tech ecosystem. Reach out via our contact page for partnership details.",
  },
];
