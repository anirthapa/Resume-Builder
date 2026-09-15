export const FONT_OPTIONS = [
  { id: "inter", name: "Inter (Modern Sans)", family: "'Inter', sans-serif" },
  { id: "dmsans", name: "DM Sans (Geometric)", family: "'DM Sans', sans-serif" },
  { id: "roboto", name: "Roboto (Neutral)", family: "'Roboto', sans-serif" },
  { id: "outfit", name: "Outfit (Creative Display)", family: "'Outfit', sans-serif" },
  { id: "merriweather", name: "Merriweather (Editorial Serif)", family: "'Merriweather', serif" },
  { id: "playfair", name: "Playfair (Executive Serif)", family: "'Playfair Display', serif" },
  { id: "jetbrains", name: "JetBrains Mono (Tech / Code)", family: "'JetBrains Mono', monospace" },
];

export const COLOR_PRESETS = [
  { id: "royal-blue", name: "Royal Blue", hex: "#2563eb", bgTint: "#eff6ff" },
  { id: "emerald-pro", name: "Emerald Pro", hex: "#059669", bgTint: "#ecfdf5" },
  { id: "midnight-slate", name: "Midnight Slate", hex: "#334155", bgTint: "#f1f5f9" },
  { id: "crimson-ruby", name: "Crimson Ruby", hex: "#dc2626", bgTint: "#fef2f2" },
  { id: "violet-indigo", name: "Violet Indigo", hex: "#7c3aed", bgTint: "#f5f3ff" },
  { id: "amber-bronze", name: "Amber Bronze", hex: "#d97706", bgTint: "#fffbeb" },
  { id: "teal-ocean", name: "Teal Ocean", hex: "#0d9488", bgTint: "#f0fdfa" },
  { id: "dark-onyx", name: "Dark Onyx", hex: "#18181b", bgTint: "#f4f4f5" },
  { id: "rose-quartz", name: "Rose Quartz", hex: "#e11d48", bgTint: "#fff1f2" },
  { id: "charcoal-classic", name: "Charcoal Classic", hex: "#475569", bgTint: "#f8fafc" },
];

export const FONT_SIZE_OPTIONS = [
  { id: "compact", name: "Compact (11px)", baseSize: "11px", scale: 0.92 },
  { id: "normal", name: "Balanced (12px)", baseSize: "12px", scale: 1.0 },
  { id: "spacious", name: "Large (13px)", baseSize: "13px", scale: 1.08 },
];

export const LINE_SPACING_OPTIONS = [
  { id: "tight", name: "Tight", value: "1.35" },
  { id: "normal", name: "Normal", value: "1.5" },
  { id: "relaxed", name: "Relaxed", value: "1.65" },
];

export const PAGE_MARGIN_OPTIONS = [
  { id: "compact", name: "Compact (30px)", value: "30px 36px" },
  { id: "balanced", name: "Balanced (45px)", value: "45px 50px" },
  { id: "spacious", name: "Spacious (60px)", value: "60px 64px" },
];

export const BULLET_STYLES = [
  { id: "disc", name: "Classic Bullet (•)", symbol: "•" },
  { id: "dash", name: "Modern Dash (–)", symbol: "–" },
  { id: "circle", name: "Clean Dot (·)", symbol: "·" },
  { id: "arrow", name: "Diamond Arrow (▸)", symbol: "▸" },
];

export const HEADER_STYLES = [
  { id: "split", name: "Split (Name Left, Info Right)" },
  { id: "center", name: "Centered Header" },
  { id: "left", name: "Classic Left" },
  { id: "banner", name: "Accent Banner" },
];

export const HEADING_STYLES = [
  { id: "bottom-line", name: "Underline Line" },
  { id: "left-bar", name: "Left Accent Bar" },
  { id: "badge", name: "Pill Badge" },
  { id: "double-line", name: "Double Line (Luxe)" },
  { id: "minimal", name: "Clean Uppercase" },
];

export const DEFAULT_SECTION_ORDER = [
  "summary",
  "experience",
  "education",
  "projects",
  "skills",
  "certifications",
  "languages",
  "custom",
];

export const DEFAULT_SECTION_LABELS = {
  summary: "Professional Summary",
  experience: "Work Experience",
  education: "Education",
  projects: "Featured Projects",
  skills: "Skills & Expertise",
  certifications: "Certifications",
  languages: "Languages",
  custom: "Additional Information",
};

export const STARTER_RESUME = {
  personalInfo: {
    firstName: "Maya",
    lastName: "Patel",
    title: "Senior Product Designer",
    email: "maya.patel@email.com",
    phone: "+1 (415) 555-0138",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/mayapatel",
    website: "mayapatel.design",
    github: "github.com/mayapatel",
    photoUrl: "",
    showPhoto: false,
  },
  summary:
    "Product designer with 6+ years of experience turning complex, technical workflows into intuitive, high-converting digital products. Skilled at partnering with engineering, data, and product management to ship accessible design systems that scale across millions of daily active users.",
  experience: [
    {
      id: 1,
      company: "Northstar Labs",
      position: "Senior Product Designer",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "Present",
      current: true,
      responsibilities: [
        "Led end-to-end design for core B2B SaaS platform used by 45,000+ monthly active enterprise operators.",
        "Architected and documented a multi-brand design system with Figma tokens, reducing frontend delivery cycle times by 28%.",
        "Conducted 40+ generative user research interviews to validate new analytics workflow, driving a 19% increase in feature adoption.",
      ],
    },
    {
      id: 2,
      company: "Vanguard Studio",
      position: "Product & UI Designer",
      location: "New York, NY",
      startDate: "2019-06",
      endDate: "2022-02",
      current: false,
      responsibilities: [
        "Designed and shipped iOS and Android mobile banking applications with WCAG 2.1 AA accessibility compliance.",
        "Created interactive micro-prototypes in ProtoPie to test navigation paradigms with 200+ usability participants.",
        "Collaborated daily in agile sprints with cross-functional React Native and backend engineering squads.",
      ],
    },
  ],
  education: [
    {
      id: 1,
      institution: "California College of the Arts",
      degree: "Bachelor of Fine Arts (BFA)",
      field: "Interaction Design & Human-Computer Interaction",
      startDate: "2015-09",
      endDate: "2019-05",
      gpa: "3.85",
      honors: "Summa Cum Laude, Dean's Honors List",
    },
  ],
  projects: [
    {
      id: 1,
      name: "Prism Design Tokens",
      role: "Lead Creator",
      link: "https://prismtokens.dev",
      github: "github.com/mayapatel/prism-tokens",
      technologies: "Figma, React, Style Dictionary, TypeScript",
      description:
        "Open-source automated design token exporter syncing Figma variables directly to CSS, Tailwind v4, and React Native style definitions.",
    },
    {
      id: 2,
      name: "Pulse Analytics Suite",
      role: "Product Designer & Co-founder",
      link: "https://pulseui.io",
      github: "",
      technologies: "Next.js, TailwindCSS, Chart.js",
      description:
        "Real-time event tracking dashboard designed for early-stage SaaS founders, featuring customizable widgets and zero-config reports.",
    },
  ],
  skills: [
    "Design Systems",
    "Figma & Tokens",
    "User Research & Usability Testing",
    "Interaction Prototyping",
    "Information Architecture",
    "WCAG 2.1 Accessibility",
    "HTML5 / CSS3 / React basics",
    "Agile & Cross-functional Leadership",
  ],
  certifications: [
    {
      id: 1,
      name: "Nielsen Norman Group UX Master Certified",
      issuer: "NN/g",
      date: "2023-08",
    },
    {
      id: 2,
      name: "Enterprise Design Thinking Co-Creator",
      issuer: "IBM",
      date: "2021-11",
    },
  ],
  languages: [
    { id: 1, name: "English", proficiency: "Native / Bilingual" },
    { id: 2, name: "Spanish", proficiency: "Professional working" },
    { id: 3, name: "French", proficiency: "Elementary" },
  ],
  customSections: [
    {
      id: 1,
      title: "Key Accomplishments",
      items: [
        "Speaker at DesignOps Global Summit 2023 on Scalable Token Architectures.",
        "Winner of Awwwards Site of the Day for Creative Portfolio Redesign.",
      ],
    },
  ],
  customization: {
    template: "modern",
    color: "#2563eb",
    fontFamily: "inter",
    fontSize: "normal",
    lineSpacing: "normal",
    margins: "balanced",
    bulletStyle: "disc",
    headerStyle: "split",
    headingStyle: "bottom-line",
    sectionOrder: [...DEFAULT_SECTION_ORDER],
    sectionVisibility: {
      summary: true,
      experience: true,
      education: true,
      projects: true,
      skills: true,
      certifications: true,
      languages: true,
      custom: true,
    },
  },
};

export function copyObject(obj) {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch {
    return obj;
  }
}

/**
 * Migrates old or partially populated resume data safely into the updated schema
 */
export function migrateResumeData(raw) {
  if (!raw || typeof raw !== "object") {
    return copyObject(STARTER_RESUME);
  }

  const base = copyObject(STARTER_RESUME);
  const personalInfo = {
    ...base.personalInfo,
    ...(raw.personalInfo || {}),
  };

  const customization = {
    ...base.customization,
    ...(raw.customization || {}),
    sectionVisibility: {
      ...base.customization.sectionVisibility,
      ...(raw.customization?.sectionVisibility || {}),
    },
    sectionOrder: Array.isArray(raw.customization?.sectionOrder) && raw.customization.sectionOrder.length > 0
      ? raw.customization.sectionOrder
      : [...DEFAULT_SECTION_ORDER],
  };

  return {
    ...base,
    ...raw,
    personalInfo,
    customization,
    experience: Array.isArray(raw.experience) ? raw.experience : base.experience,
    education: Array.isArray(raw.education) ? raw.education : base.education,
    projects: Array.isArray(raw.projects) ? raw.projects : base.projects,
    skills: Array.isArray(raw.skills)
      ? raw.skills
      : typeof raw.skills === "string"
      ? raw.skills.split(",").map((s) => s.trim()).filter(Boolean)
      : base.skills,
    certifications: Array.isArray(raw.certifications) ? raw.certifications : base.certifications,
    languages: Array.isArray(raw.languages) ? raw.languages : base.languages,
    customSections: Array.isArray(raw.customSections) ? raw.customSections : base.customSections,
  };
}
