import React, { useState, useEffect, useRef } from "react";
import { X, Check, Sparkles, Star, LayoutTemplate } from "lucide-react";
import { TEMPLATES_REGISTRY } from "../templates/index";

export default function TemplateGalleryModal({
  isOpen,
  onClose,
  selectedTemplate,
  onSelectTemplate,
}) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const dialogRef = useRef(null);
  useEffect(() => {
    if (isOpen) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [isOpen]);

  const categories = [
    { id: "all", label: "All Templates" },
    ...Array.from(new Set(TEMPLATES_REGISTRY.map((t) => t.category))).map(
      (category) => ({ id: category, label: category }),
    ),
  ];
  const filteredTemplates = TEMPLATES_REGISTRY.filter(
    (template) =>
      (filter === "all" || template.category === filter) &&
      (template.name + " " + template.description)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );

  return (
    <dialog
      ref={dialogRef}
      className="gallery-dialog"
      aria-label="Choose a resume template"
      onCancel={onClose}
    >
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-xs">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-none">
                Choose a Resume Template
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Choose a layout that fits your experience
              </p>
            </div>
          </div>
          <button
            aria-label="Close template gallery"
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <label className="gallery-search">
          <span>Find your style</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search templates…"
          />
        </label>
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
          {filteredTemplates.length === 0 && (
            <p className="gallery-empty">
              No templates match. Try another search or choose All Templates.
            </p>
          )}
          {filteredTemplates.map((template) => {
            const isSelected = selectedTemplate === template.id;
            return (
              <button
                type="button"
                key={template.id}
                onClick={() => {
                  onSelectTemplate(template.id, template.defaultColor);
                  onClose();
                }}
                className={`group cursor-pointer text-left relative rounded-xl border-2 p-3 transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? "border-orange-500 bg-orange-50/20 shadow-md ring-2 ring-orange-400/20"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md bg-white"
                }`}
              >
                {/* Popular tag */}
                {template.popular && (
                  <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 z-10">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    Featured
                  </span>
                )}

                <div>
                  <div className="gallery-real-preview">
                    <img
                      src={`/previews/${template.id}.webp`}
                      alt=""
                      loading="lazy"
                      width="794"
                      height="1123"
                    />
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition flex items-center justify-between">
                    <span>{template.name}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-orange-600 shrink-0" />
                    )}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-gray-400">
                    {template.category}
                  </span>
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
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <span>
            Choose fonts, colors, spacing, and sections. Your content stays
            intact.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-gray-300 font-medium text-gray-700 hover:bg-white transition"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
