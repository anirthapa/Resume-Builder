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
    description: "High-impact contemporary design with elegant accent highlights and badges",
    component: ModernProfessional,
    defaultColor: "#2563eb",
    gradient: "from-blue-600 to-indigo-700",
    popular: true,
  },
  {
    id: "minimalist",
    name: "Minimalist ATS",
    category: "ATS-Friendly",
    description: "100% ATS parser compliant single-column layout with perfect scannability",
    component: MinimalistATS,
    defaultColor: "#1f2937",
    gradient: "from-gray-700 to-gray-900",
    popular: true,
  },
  {
    id: "sidebar",
    name: "Split Sidebar Pro",
    category: "Compact",
    description: "Organized two-column layout with a stylish left sidebar for skills and credentials",
    component: SplitSidebar,
    defaultColor: "#059669",
    gradient: "from-emerald-600 to-teal-700",
    popular: true,
  },
  {
    id: "executive",
    name: "Executive Luxe",
    category: "Executive",
    description: "Sophisticated serif typography with prestigious leadership and board formatting",
    component: ExecutiveLuxe,
    defaultColor: "#1e3a8a",
    gradient: "from-slate-800 to-blue-950",
    popular: false,
  },
  {
    id: "creative",
    name: "Creative Studio",
    category: "Creative",
    description: "Asymmetrical bold layout designed for designers, marketers, and creative directors",
    component: CreativeStudio,
    defaultColor: "#7c3aed",
    gradient: "from-purple-600 to-pink-600",
    popular: true,
  },
  {
    id: "developer",
    name: "Tech & Developer",
    category: "Tech",
    description: "Monospace touches, GitHub/Portfolio integrations, and categorized tech stacks",
    component: TechDeveloper,
    defaultColor: "#0d9488",
    gradient: "from-teal-600 to-cyan-700",
    popular: true,
  },
  {
    id: "academic",
    name: "Academic Research",
    category: "Academic",
    description: "Formal scholarly layout with dedicated research, publication, and grant sections",
    component: AcademicResearch,
    defaultColor: "#18324b",
    gradient: "from-blue-900 to-slate-900",
    popular: false,
  },
  {
    id: "nordic",
    name: "Nordic Elegance",
    category: "Minimalist",
    description: "Scandinavian-inspired editorial layout with generous whitespace and modern luxury",
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
