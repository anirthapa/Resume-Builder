import React from "react";
import { getTemplateById } from "./index";
import { FONT_OPTIONS, FONT_SIZE_OPTIONS, LINE_SPACING_OPTIONS, PAGE_MARGIN_OPTIONS } from "../utils/resumeDefaults";

export default function ResumeRenderer({ data = {}, customization = {} }) {
  // Determine active template
  const activeTemplateId = customization.template || data.customization?.template || "modern";
  const templateConfig = getTemplateById(activeTemplateId);
  const TemplateComponent = templateConfig.component;

  // Resolve customization variables
  const fontId = customization.fontFamily || data.customization?.fontFamily || "inter";
  const fontConfig = FONT_OPTIONS.find((f) => f.id === fontId) || FONT_OPTIONS[0];

  const sizeId = customization.fontSize || data.customization?.fontSize || "normal";
  const sizeConfig = FONT_SIZE_OPTIONS.find((s) => s.id === sizeId) || FONT_SIZE_OPTIONS[1];

  const spacingId = customization.lineSpacing || data.customization?.lineSpacing || "normal";
  const spacingConfig = LINE_SPACING_OPTIONS.find((l) => l.id === spacingId) || LINE_SPACING_OPTIONS[1];

  const marginId = customization.margins || data.customization?.margins || "balanced";
  const marginConfig = PAGE_MARGIN_OPTIONS.find((m) => m.id === marginId) || PAGE_MARGIN_OPTIONS[1];

  const accentColor = customization.color || data.customization?.color || templateConfig.defaultColor;

  const mergedCustomization = {
    ...data.customization,
    ...customization,
    color: accentColor,
  };

  return (
    <div
      className={`resume-doc font-${fontId}`}
      style={{
        "--resume-accent": accentColor,
        "--resume-font": fontConfig.family,
        "--resume-font-size": sizeConfig.baseSize,
        "--resume-line-height": spacingConfig.value,
        "--resume-padding": marginConfig.value,
      }}
    >
      <TemplateComponent data={data} customization={mergedCustomization} />
    </div>
  );
}
