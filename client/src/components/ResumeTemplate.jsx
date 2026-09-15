import React from "react";
import ResumeRenderer from "../templates/index";
import { migrateResumeData } from "../utils/resumeDefaults";

const palette = {
  navy: "#18324b",
  ink: "#18212f",
  blue: "#2563eb",
  emerald: "#087f5b",
  plum: "#7c3aed",
  rust: "#d95f32",
};

export default function ResumeTemplate({
  resumeData = {},
  variant = "modern",
  colorScheme = "blue",
  customization = {},
}) {
  const normalizedData = migrateResumeData(resumeData);
  const resolvedColor =
    customization.color ||
    palette[colorScheme] ||
    (typeof colorScheme === "string" && colorScheme.startsWith("#") ? colorScheme : null) ||
    palette.blue;

  const mergedCustomization = {
    ...normalizedData.customization,
    ...customization,
    template: customization.template || variant || normalizedData.customization?.template || "modern",
    color: resolvedColor,
  };

  return (
    <ResumeRenderer
      data={normalizedData}
      customization={mergedCustomization}
    />
  );
}
