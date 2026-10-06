import ModernProfessional from "./ModernProfessional";
import MinimalistATS from "./MinimalistATS";
import SplitSidebar from "./SplitSidebar";
import ExecutiveLuxe from "./ExecutiveLuxe";
import CreativeStudio from "./CreativeStudio";
import TechDeveloper from "./TechDeveloper";
import AcademicResearch from "./AcademicResearch";
import NordicElegance from "./NordicElegance";
import ResumeRenderer from "./ResumeRenderer";

export { ResumeRenderer };
export default ResumeRenderer;

export const TEMPLATES_REGISTRY = [
  {
    id: "modern",
    name: "Modern Professional",
    category: "Professional",
    description:
      "A clear professional layout with colored headings and fine section rules",
    component: ModernProfessional,
    defaultColor: "#2563eb",
    gradient: "from-blue-600 to-indigo-700",
    popular: true,
  },
  {
    id: "minimalist",
    name: "Minimalist ATS",
    category: "ATS-Friendly",
    description:
      "Simple single-column layout designed for clear reading and automated parsing",
    component: MinimalistATS,
    defaultColor: "#1f2937",
    gradient: "from-gray-700 to-gray-900",
    popular: true,
  },
  {
    id: "sidebar",
    name: "Split Sidebar Pro",
    category: "Compact",
    description:
      "Organized two-column layout with a stylish left sidebar for skills and credentials",
    component: SplitSidebar,
    defaultColor: "#059669",
    gradient: "from-emerald-600 to-teal-700",
    popular: true,
  },
  {
    id: "executive",
    name: "Executive Luxe",
    category: "Executive",
    description:
      "A centered introduction and strong section rules for experienced professionals",
    component: ExecutiveLuxe,
    defaultColor: "#1e3a8a",
    gradient: "from-slate-800 to-blue-950",
    popular: false,
  },
  {
    id: "creative",
    name: "Creative Studio",
    category: "Creative",
    description:
      "A soft header panel and bold section labels for creative portfolios",
    component: CreativeStudio,
    defaultColor: "#7c3aed",
    gradient: "from-purple-600 to-pink-600",
    popular: true,
  },
  {
    id: "developer",
    name: "Tech & Developer",
    category: "Tech",
    description:
      "A code-inspired introduction with room for projects, skills, and repository links",
    component: TechDeveloper,
    defaultColor: "#0d9488",
    gradient: "from-teal-600 to-cyan-700",
    popular: true,
  },
  {
    id: "academic",
    name: "Academic Research",
    category: "Academic",
    description:
      "A formal layout you can extend with custom publication and research sections",
    component: AcademicResearch,
    defaultColor: "#18324b",
    gradient: "from-blue-900 to-slate-900",
    popular: false,
  },
  {
    id: "nordic",
    name: "Nordic Elegance",
    category: "Minimalist",
    description:
      "Scandinavian-inspired editorial layout with generous whitespace and modern luxury",
    component: NordicElegance,
    defaultColor: "#475569",
    gradient: "from-stone-600 to-slate-800",
    popular: false,
  },
];

export const getTemplateById = (id) => {
  const normalized = (id || "").toLowerCase();
  return (
    TEMPLATES_REGISTRY.find((t) => t.id === normalized) ||
    TEMPLATES_REGISTRY.find((t) => normalized.includes(t.id)) ||
    TEMPLATES_REGISTRY[0]
  );
};
