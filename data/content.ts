// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE to update everything shown on the portfolio.
// No other file needs to change for content updates.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Raj Kamal Ghanta",
  firstName: "Raj",
  title: "Software Engineer",
  tagline:
    "Software Engineer with 3+ years of experience building scalable, high-performance web applications using React.js, REST APIs, and modern UI animations.",
  email: "rajkamalganta333@gmail.com",
  phone: "+91 83107 38868",
  github: "https://github.com/rajkamal", // TODO: replace with your GitHub username
  linkedin: "https://www.linkedin.com/in/raj-kamal",
  resumeUrl: "/resume.pdf", // drop your resume.pdf into /public
  sourceCode: "https://github.com/rajkamal/portfolio", // TODO: replace with your portfolio repo
  location: "Ballari, India",
  available: true,
};

export const about = {
  // Words wrapped in **double asterisks** are highlighted on the page
  statement:
    "I'm a detail-oriented **Software Engineer** with **3+ years** of experience designing, developing & optimizing **scalable web applications** — working with React.js, REST APIs & **modern UI animation**, recognized with **4 awards** at Terralogic, and growing toward senior roles while **mentoring** other developers.",
  highlights: [
    { value: "3+", label: "Years of experience" },
    { value: "4×", label: "Award winner at Terralogic" },
    { value: "25%", label: "Faster load times delivered" },
  ],
};

export const skills: { category: string; accent: string; items: string[] }[] = [
  {
    category: "Frontend",
    accent: "var(--accent-violet)",
    items: ["HTML5", "JavaScript (ES6+)", "React.js"],
  },
  {
    category: "UI & Animation",
    accent: "var(--accent-rose)",
    items: ["CSS", "Tailwind CSS", "GSAP"],
  },
  {
    category: "Backend",
    accent: "var(--accent-cyan)",
    items: ["REST APIs", "Node.js"],
  },
  {
    category: "Databases",
    accent: "var(--accent-amber)",
    items: ["MySQL", "MongoDB"],
  },
  {
    category: "Tools",
    accent: "var(--accent-emerald)",
    items: ["Git", "Postman", "VS Code", "IntelliJ"],
  },
  {
    category: "Methodologies",
    accent: "var(--accent-violet)",
    items: ["Agile", "Scrum"],
  },
];

export const experience: {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}[] = [
  {
    role: "Software Engineer 2",
    company: "Terralogic",
    period: "2024 — Present", // TODO: adjust start year if needed
    bullets: [
      "Leading feature development in scalable web applications using React.js and REST APIs.",
      "Optimized performance of existing applications, reducing load times by 25%.",
      "Mentored junior engineers and contributed to code reviews.",
      "Collaborated with UI/UX teams to integrate modern animations with GSAP and CSS.",
    ],
  },
  {
    role: "Software Engineer 1",
    company: "Terralogic",
    period: "2022 — 2024", // TODO: adjust years if needed
    bullets: [
      "Built responsive web applications with React.js frontends and REST API backends.",
      "Integrated third-party APIs and improved error handling across the product.",
      "Actively participated in Agile sprints, delivering features within deadlines.",
      "Contributed to technical documentation and knowledge-sharing sessions.",
    ],
  },
];

export const awards = [
  {
    title: "Rising Star Award",
    note: "Recognized for outstanding performance during initial years.",
  },
  {
    title: "Outstanding Performer Award",
    note: "For consistent excellence and contributions.",
  },
  {
    title: "Star Award (2025)",
    note: "Honored for delivering impactful solutions with measurable results.",
  },
  {
    title: "Above and Beyond Award",
    note: "Acknowledged for exceptional effort exceeding expectations.",
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science",
    school: "BITM College, Ballari",
    year: "2019 — 2023",
    note: "",
  },
  {
    degree: "Pre-University (PCMC Stream)",
    school: "Narayana College, Ballari",
    year: "2017 — 2019",
    note: "",
  },
  {
    degree: "Schooling",
    school: "Nalanda Vidya Niketan, Ballari",
    year: "",
    note: "",
  },
];
