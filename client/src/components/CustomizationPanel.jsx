import React from "react";
import {
  Palette,
  Type,
  Layout,
  Sliders,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Check,
  RotateCcw,
} from "lucide-react";
import {
  FONT_OPTIONS,
  COLOR_PRESETS,
  FONT_SIZE_OPTIONS,
  LINE_SPACING_OPTIONS,
  PAGE_MARGIN_OPTIONS,
  BULLET_STYLES,
  HEADING_STYLES,
  DEFAULT_SECTION_LABELS,
} from "../utils/resumeDefaults";
import { TEMPLATES_REGISTRY, getTemplateById } from "../templates/index";

export default function CustomizationPanel({
  customization,
  onChangeCustomization,
  onOpenTemplateGallery,
}) {
  const activeTemplate = getTemplateById(customization?.template);
  const sectionOrder = customization?.sectionOrder || [
    "summary",
    "experience",
    "education",
    "projects",
    "skills",
    "certifications",
    "languages",
    "custom",
  ];
  const visibility = customization?.sectionVisibility || {};

  const handleUpdate = (key, value) => {
    onChangeCustomization({
      ...customization,
      [key]: value,
    });
  };

  const handleToggleVisibility = (sectionKey) => {
    onChangeCustomization({
      ...customization,
      sectionVisibility: {
        ...visibility,
        [sectionKey]: visibility[sectionKey] === false ? true : false,
      },
    });
  };

  const handleMoveSection = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sectionOrder.length) return;
    const newOrder = [...sectionOrder];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, moved);

    onChangeCustomization({
      ...customization,
      sectionOrder: newOrder,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Template Card */}
      <div className="p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 block">
              Active Template
            </span>
            <h3 className="text-sm font-bold text-gray-900">{activeTemplate.name}</h3>
          </div>
          <button
            onClick={onOpenTemplateGallery}
            className="text-xs px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition shadow-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Change Template
          </button>
        </div>
        <p className="text-xs text-gray-500">{activeTemplate.description}</p>

        {/* Quick template icons */}
        <div className="flex gap-1.5 mt-3 pt-3 border-t border-gray-100 overflow-x-auto pb-1">
          {TEMPLATES_REGISTRY.map((t) => (
            <button
              key={t.id}
              onClick={() => handleUpdate("template", t.id)}
              className={`text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap transition font-medium ${
                customization?.template === t.id
                  ? "bg-gray-900 text-white font-semibold shadow-xs"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Color Palette */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-orange-600" />
            Accent Color & Theme
          </label>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-gray-400 font-mono">{customization?.color}</span>
            <input
              type="color"
              value={customization?.color || "#2563eb"}
              onChange={(e) => handleUpdate("color", e.target.value)}
              className="w-5 h-5 rounded border border-gray-300 cursor-pointer p-0"
              title="Custom Color"
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mt-2">
          {COLOR_PRESETS.map((preset) => {
            const isSelected = (customization?.color || "").toLowerCase() === preset.hex.toLowerCase();
            return (
              <button
                key={preset.id}
                onClick={() => handleUpdate("color", preset.hex)}
                className={`h-9 rounded-lg transition-transform flex items-center justify-center relative border ${
                  isSelected ? "scale-105 ring-2 ring-orange-500 ring-offset-1 border-white" : "hover:scale-102 border-transparent"
                }`}
                style={{ backgroundColor: preset.hex }}
                title={preset.name}
              >
                {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Typography Selection */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5 mb-2">
          <Type className="w-3.5 h-3.5 text-orange-600" />
          Typography / Font Family
        </label>
        <div className="grid grid-cols-1 gap-1.5">
          {FONT_OPTIONS.map((f) => (
            <button
              key={f.id}
              onClick={() => handleUpdate("fontFamily", f.id)}
              className={`px-3 py-2 rounded-lg border text-left flex items-center justify-between transition text-xs ${
                customization?.fontFamily === f.id
                  ? "border-orange-500 bg-orange-50/30 text-orange-950 font-semibold"
                  : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white"
              }`}
            >
              <span style={{ fontFamily: f.family }}>{f.name}</span>
              {customization?.fontFamily === f.id && <Check className="w-3.5 h-3.5 text-orange-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Sizing & Density */}
      <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-orange-600" />
          Spacing & Density Scale
        </div>

        {/* Font size */}
        <div>
          <span className="text-xs text-gray-600 block mb-1.5 font-medium">Font Size Scaling</span>
          <div className="grid grid-cols-3 gap-1.5">
            {FONT_SIZE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleUpdate("fontSize", opt.id)}
                className={`py-1.5 px-2 text-xs rounded-md border text-center font-medium transition ${
                  customization?.fontSize === opt.id
                    ? "bg-orange-500 text-white border-orange-500 shadow-xs"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {opt.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Line spacing */}
        <div>
          <span className="text-xs text-gray-600 block mb-1.5 font-medium">Line Spacing</span>
          <div className="grid grid-cols-3 gap-1.5">
            {LINE_SPACING_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleUpdate("lineSpacing", opt.id)}
                className={`py-1.5 px-2 text-xs rounded-md border text-center font-medium transition ${
                  customization?.lineSpacing === opt.id
                    ? "bg-orange-500 text-white border-orange-500 shadow-xs"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        {/* Margins */}
        <div>
          <span className="text-xs text-gray-600 block mb-1.5 font-medium">Page Margins</span>
          <div className="grid grid-cols-3 gap-1.5">
            {PAGE_MARGIN_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleUpdate("margins", opt.id)}
                className={`py-1.5 px-2 text-xs rounded-md border text-center font-medium transition ${
                  customization?.margins === opt.id
                    ? "bg-orange-500 text-white border-orange-500 shadow-xs"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {opt.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Bullet & Heading Styles */}
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
            Bullet Point Style
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {BULLET_STYLES.map((b) => (
              <button
                key={b.id}
                onClick={() => handleUpdate("bulletStyle", b.id)}
                className={`py-1.5 text-xs rounded-md border text-center font-semibold transition ${
                  customization?.bulletStyle === b.id
                    ? "bg-gray-900 text-white border-gray-900 shadow-xs"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {b.symbol} {b.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
            Section Heading Style
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {HEADING_STYLES.map((h) => (
              <button
                key={h.id}
                onClick={() => handleUpdate("headingStyle", h.id)}
                className={`py-1.5 px-2 text-xs rounded-md border text-center font-medium transition truncate ${
                  customization?.headingStyle === h.id
                    ? "bg-gray-900 text-white border-gray-900 shadow-xs"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {h.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Section Reordering & Visibility */}
      <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-orange-600" />
            Sections Order & Visibility
          </label>
          <span className="text-[11px] text-gray-400">Reorder with arrows</span>
        </div>

        <div className="space-y-1.5">
          {sectionOrder.map((key, idx) => {
            const isVisible = visibility[key] !== false;
            return (
              <div
                key={key}
                className={`flex items-center justify-between p-2 rounded-lg border text-xs transition ${
                  isVisible ? "bg-gray-50/70 border-gray-200 text-gray-800" : "bg-gray-100/50 border-gray-200 text-gray-400 line-through"
                }`}
              >
                <div className="flex items-center gap-2 font-medium">
                  <span className="w-4 text-[10px] text-gray-400">{idx + 1}.</span>
                  <span>{DEFAULT_SECTION_LABELS[key] || key}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleMoveSection(idx, -1)}
                    disabled={idx === 0}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveSection(idx, 1)}
                    disabled={idx === sectionOrder.length - 1}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleToggleVisibility(key)}
                    className={`p-1 rounded transition ml-1 ${
                      isVisible ? "hover:bg-gray-200 text-gray-700" : "bg-gray-200 text-gray-500"
                    }`}
                    title={isVisible ? "Hide Section" : "Show Section"}
                  >
                    {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
