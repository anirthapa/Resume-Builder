import React from "react";

export const formatDate = (value) => {
  if (!value) return "";
  if (value.toLowerCase() === "present") return "Present";
  if (!value.includes("-")) return value;
  const [year, month] = value.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const mIndex = parseInt(month, 10) - 1;
  return mIndex >= 0 && mIndex < 12 ? `${monthNames[mIndex]} ${year}` : value;
};

export const getHeadingClass = (style) => {
  switch (style) {
    case "left-bar":
      return "heading-style-left-bar";
    case "badge":
      return "heading-style-badge";
    case "double-line":
      return "heading-style-double-line";
    case "minimal":
      return "heading-style-minimal";
    case "bottom-line":
    default:
      return "heading-style-bottom-line";
  }
};

export const getBulletClass = (style) => {
  switch (style) {
    case "dash":
      return "resume-bullet-list bullet-dash";
    case "circle":
      return "resume-bullet-list bullet-circle";
    case "arrow":
      return "resume-bullet-list bullet-arrow";
    case "disc":
    default:
      return "resume-bullet-list bullet-disc";
  }
};
