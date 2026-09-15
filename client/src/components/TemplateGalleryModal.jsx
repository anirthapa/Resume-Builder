import React, { useState } from "react";
import { X, Check, Sparkles, Star, LayoutTemplate } from "lucide-react";
import { TEMPLATES_REGISTRY } from "../templates/index";

export default function TemplateGalleryModal({
  isOpen,
  onClose,
  selectedTemplate,
  onSelectTemplate,
}) {
  const [filter, setFilter] = useState("all");

  if (!isOpen) return null;

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
    if (filter === "all") return true;
    return t.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-xs">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-none">Choose a Resume Template</h2>
              <p className="text-xs text-gray-500 mt-1">Select from 8 professionally designed, ATS-ready formats</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-6 py-2.5 border-b border-gray-100 flex gap-2 overflow-x-auto bg-white scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition whitespace-nowrap ${
                filter === cat.id
                  ? "bg-gray-900 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of Templates */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTemplates.map((template) => {
            const isSelected = selectedTemplate === template.id;
            return (
              <div
                key={template.id}
                onClick={() => {
                  onSelectTemplate(template.id, template.defaultColor);
                  onClose();
                }}
                className={`group cursor-pointer relative rounded-xl border-2 p-3 transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? "border-orange-500 bg-orange-50/20 shadow-md ring-2 ring-orange-400/20"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md bg-white"
                }`}
              >
                {/* Popular tag */}
                {template.popular && (
                  <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 z-10">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    Popular
                  </span>
                )}

                <div>
                  {/* Thumbnail Card Preview */}
                  <div
                    className={`h-36 rounded-lg mb-3 p-3 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${template.gradient}`}
                  >
                    <div className="bg-white/90 backdrop-blur-xs rounded p-2 shadow-xs transform group-hover:scale-[1.02] transition">
                      <div className="w-12 h-1.5 rounded-full mb-1" style={{ backgroundColor: template.defaultColor }} />
                      <div className="w-20 h-1 bg-gray-300 rounded-full mb-1.5" />
                      <div className="space-y-1">
                        <div className="w-full h-0.5 bg-gray-200 rounded" />
                        <div className="w-3/4 h-0.5 bg-gray-200 rounded" />
                        <div className="w-5/6 h-0.5 bg-gray-200 rounded" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-white/90 font-medium">
                      <span>{template.category}</span>
                      <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: template.defaultColor }} />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition flex items-center justify-between">
                    <span>{template.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-orange-600 shrink-0" />}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-gray-400">{template.category}</span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-md transition ${
                      isSelected
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 text-gray-700 group-hover:bg-orange-50 group-hover:text-orange-600"
                    }`}
                  >
                    {isSelected ? "Active" : "Select"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <span>All templates support unlimited custom fonts, colors, and section reordering.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-gray-300 font-medium text-gray-700 hover:bg-white transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
