import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X, Eye, Zap, Star, Sparkles, CheckCircle2 } from "lucide-react";
import ResumeTemplate from "./ResumeTemplate";
import { TEMPLATES_REGISTRY } from "../templates/index";

const TemplatesSection = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [previewMode, setPreviewMode] = useState(null);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const categories = [
    { id: "all", label: "All Templates" },
    { id: "Professional", label: "Professional" },
    { id: "ATS-Friendly", label: "ATS-Friendly" },
    { id: "Tech", label: "Tech & Dev" },
    { id: "Executive", label: "Executive" },
    { id: "Creative", label: "Creative" },
    { id: "Minimalist", label: "Minimalist" },
  ];

  const filteredTemplates = TEMPLATES_REGISTRY.filter((t) => {
    if (selectedCategory === "all") return true;
    return t.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleUseTemplate = (templateId) => {
    navigate(`/resume-builder?template=${encodeURIComponent(templateId)}`);
  };

  const TemplateCard = ({ template }) => {
    const isHovered = hoveredTemplate === template.id;

    return (
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setHoveredTemplate(template.id)}
        onMouseLeave={() => setHoveredTemplate(null)}
        onClick={() => setPreviewMode(template.id)}
      >
        <div className="relative backdrop-blur-sm bg-white/95 border border-white/40 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between h-full">
          {/* Popular Badge */}
          {template.popular && (
            <div className="absolute -top-2.5 -right-2.5 z-10">
              <div className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                <Star className="w-3 h-3 fill-current" />
                Popular
              </div>
            </div>
          )}

          <div>
            {/* Template Preview Canvas Window */}
            <div
              className={`
                relative h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden transition-all duration-500 mb-5 border border-gray-100
                ${isHovered ? "scale-[1.02] shadow-lg" : "scale-100"}
              `}
            >
              <div className="absolute inset-0">
                <div
                  className="origin-top-left pointer-events-none select-none"
                  style={{
                    transform: "scale(0.35)",
                    width: "285%",
                    height: "285%",
                  }}
                >
                  <div className="w-full max-w-4xl bg-white shadow-sm">
                    <ResumeTemplate variant={template.id} colorScheme={template.defaultColor} />
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <div
                className={`
                  absolute inset-0 bg-black/0 transition-all duration-300 flex items-center justify-center
                  ${isHovered ? "bg-black/35 backdrop-blur-xs" : ""}
                `}
              >
                <div
                  className={`
                    bg-white/95 backdrop-blur-sm rounded-xl px-5 py-2.5 transition-all duration-300 border border-white/20 shadow-lg flex items-center gap-2 text-gray-900 font-semibold text-xs
                    ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                  `}
                >
                  <Eye className="w-4 h-4 text-orange-600" />
                  <span>Interactive Preview</span>
                </div>
              </div>

              {/* Category tag */}
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/90 text-gray-700 shadow-xs border border-gray-200">
                  {template.category}
                </span>
              </div>
            </div>

            {/* Title & Info */}
            <div className="text-left mb-5">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition">
                {template.name}
              </h3>
              <p className="text-gray-600 text-xs mt-1 leading-relaxed line-clamp-2">
                {template.description}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUseTemplate(template.id);
            }}
            className={`
              w-full py-2.5 rounded-xl font-semibold text-xs transition-all duration-300
              bg-gradient-to-r ${template.gradient} text-white
              hover:shadow-md transform hover:-translate-y-0.5 active:scale-95
              flex items-center justify-center gap-2 group
            `}
          >
            <span>Use This Template</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    );
  };

  const FullPreviewModal = ({ template }) => {
    if (!template) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-700">
                  {template.category}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{template.description}</p>
            </div>
            <button
              onClick={() => setPreviewMode(null)}
              className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Canvas Preview */}
          <div className="p-6 bg-gray-100 overflow-y-auto flex justify-center">
            <div className="bg-white rounded-lg shadow-xl w-[794px] overflow-hidden">
              <ResumeTemplate variant={template.id} colorScheme={template.defaultColor} />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-3.5 border-t border-gray-100 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Full custom typography, colors, and section reordering available</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPreviewMode(null)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition"
              >
                Back to gallery
              </button>
              <button
                onClick={() => {
                  setPreviewMode(null);
                  handleUseTemplate(template.id);
                }}
                className={`
                  px-5 py-2 rounded-lg font-semibold text-xs text-white transition shadow-sm
                  bg-gradient-to-r ${template.gradient} hover:shadow-md flex items-center gap-1.5
                `}
              >
                <span>Customize in Builder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="templates"
      className="py-20 bg-gradient-to-br from-gray-50 via-orange-50/20 to-purple-50/20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-100 text-orange-700 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            8 Designer Formats
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Pick a <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Standout Template</span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            From ATS-compliant clean slates to executive serif suites and modern developer layouts — tailored for your dream role.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === cat.id
                    ? "bg-gray-900 text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {/* Bottom Guarantee */}
        <div className="text-center mt-12 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
          <Zap className="w-4 h-4 text-orange-600" />
          <span>Every template exports to pixel-perfect A4 PDF with one click</span>
        </div>
      </div>

      {/* Full Preview Modal */}
      {previewMode && (
        <FullPreviewModal
          template={TEMPLATES_REGISTRY.find((t) => t.id === previewMode)}
        />
      )}
    </section>
  );
};

export default TemplatesSection;
