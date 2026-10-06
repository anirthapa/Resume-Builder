import React from "react";
import { Document, Page, Text, View, Link, Image } from "@react-pdf/renderer";
import {
  migrateResumeData,
  DEFAULT_SECTION_LABELS,
} from "../utils/resumeDefaults.js";

const h = React.createElement;
export const PDF_THEMES = {
  modern: { accent: "#2563eb", heading: "line" },
  minimalist: { accent: "#1f2937", center: true, heading: "line" },
  sidebar: { accent: "#059669", band: true, heading: "bar" },
  executive: {
    accent: "#1e3a8a",
    center: true,
    serif: true,
    heading: "double",
  },
  creative: { accent: "#7c3aed", band: true, heading: "badge" },
  developer: { accent: "#0d9488", mono: true, heading: "bar" },
  academic: { accent: "#18324b", serif: true, heading: "line" },
  nordic: { accent: "#475569", heading: "minimal" },
};
const date = (value) => {
  if (!value) return "";
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return value;
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][Number(match[2]) - 1];
  return month ? `${month} ${match[1]}` : value;
};
const safeUrl = (value) => {
  if (!value) return null;
  try {
    const url = new URL(
      /^https?:\/\//i.test(value) ? value : `https://${value}`,
    );
    return ["https:", "http:"].includes(url.protocol) && !/\s/.test(value)
      ? url.href
      : null;
  } catch {
    return null;
  }
};
const join = (...values) => values.filter(Boolean).join(" · ");

/** One layout source for the on-screen PDF, download, and print. */
export function createResumeDocument(raw, { fontFamily, photoSource } = {}) {
  const data = migrateResumeData(raw);
  const c = data.customization;
  const theme = PDF_THEMES[c.template] || PDF_THEMES.modern;
  const accent = c.color || theme.accent;
  const font =
    fontFamily ||
    (theme.serif ? "Times-Roman" : theme.mono ? "Courier" : "Helvetica");
  const fontSize =
    { compact: 8.25, normal: 9, spacious: 9.75 }[c.fontSize] || 10;
  const lineHeight =
    { tight: 1.3, normal: 1.45, relaxed: 1.6 }[c.lineSpacing] || 1.45;
  const padding = { compact: 30, balanced: 40, spacious: 52 }[c.margins] || 40;
  const p = data.personalInfo;
  const name = join(p.firstName, p.lastName).replace(" · ", " ") || "Your Name";
  const text = (value, style = {}, props = {}) =>
    h(
      Text,
      {
        orphans: 2,
        widows: 2,
        style: { fontSize, lineHeight, ...style },
        ...props,
      },
      value,
    );
  const heading = (title, key) => {
    const style = {
      fontSize: fontSize + 0.5,
      fontWeight: 700,
      color: accent,
      marginTop: c.fontSize === "compact" ? 8 : 12,
      marginBottom: c.fontSize === "compact" ? 4 : 7,
      paddingBottom: 4,
      letterSpacing: 0.25,
      textTransform: "uppercase",
    };
    if (c.headingStyle === "left-bar" || theme.heading === "bar")
      Object.assign(style, {
        borderLeftWidth: 3,
        borderLeftColor: accent,
        paddingLeft: 7,
      });
    else if (c.headingStyle === "badge" || theme.heading === "badge")
      Object.assign(style, {
        backgroundColor: "#f1f3f6",
        padding: 6,
        borderRadius: 3,
      });
    else if (c.headingStyle !== "minimal" && theme.heading !== "minimal")
      Object.assign(style, {
        borderBottomWidth: theme.heading === "double" ? 2 : 0.8,
        borderBottomColor: accent,
      });
    return text(title, style, {
      key,
      minPresenceAhead: fontSize * lineHeight * 3,
    });
  };
  const paragraph = (value, key) => text(value, { marginBottom: 5 }, { key });
  const bullets = (items) =>
    items
      .filter((item) => item.trim())
      .map((item, i) =>
        text(
          `${c.bulletStyle === "dash" ? "–" : c.bulletStyle === "arrow" ? "›" : "•"}  ${item.replace(/^[•▸]\s*/, "")}`,
          { marginBottom: 3, paddingLeft: 8 },
          { key: `bullet-${i}` },
        ),
      );
  const link = (value, label = value) =>
    safeUrl(value)
      ? h(
          Link,
          {
            src: safeUrl(value),
            style: {
              color: accent,
              fontSize: fontSize - 1,
              textDecoration: "none",
            },
          },
          label,
        )
      : text(label, { fontSize: fontSize - 1 });
  // Short entries stay intact; long entries can flow naturally across pages.
  const entry = (item, children) =>
    h(
      View,
      {
        key: item.id,
        wrap: JSON.stringify(item).length > 1200,
        style: { marginBottom: c.fontSize === "compact" ? 5 : 9 },
      },
      ...children,
    );
  const title = (value) =>
    text(
      value,
      { fontWeight: 700 },
      { minPresenceAhead: fontSize * lineHeight * 2 },
    );
  const muted = (value) =>
    text(value, { color: "#5c6570", fontSize: fontSize - 1, marginBottom: 3 });
  const dates = (start, end, current) =>
    [date(start), current ? "Present" : date(end)].filter(Boolean).join(" — ");
  const sections = {
    summary: data.summary.trim()
      ? [
          heading("Professional Summary", "summary"),
          paragraph(data.summary, "summary-text"),
        ]
      : [],
    experience: data.experience.length
      ? [
          heading("Work Experience", "experience"),
          ...data.experience.map((item) =>
            entry(item, [
              title(join(item.position, item.company)),
              muted(
                join(
                  item.location,
                  dates(item.startDate, item.endDate, item.current),
                ),
              ),
              ...bullets(item.responsibilities),
            ]),
          ),
        ]
      : [],
    education: data.education.length
      ? [
          heading("Education", "education"),
          ...data.education.map((item) =>
            entry(item, [
              title(join(item.degree, item.field)),
              muted(
                join(item.institution, dates(item.startDate, item.endDate)),
              ),
              ...(item.gpa ? [muted(`GPA: ${item.gpa}`)] : []),
              ...(item.honors ? [paragraph(item.honors)] : []),
            ]),
          ),
        ]
      : [],
    projects: data.projects.length
      ? [
          heading("Featured Projects", "projects"),
          ...data.projects.map((item) =>
            entry(item, [
              title(join(item.name, item.role)),
              ...(item.technologies ? [muted(item.technologies)] : []),
              ...(item.description ? [paragraph(item.description)] : []),
              ...(item.link ? [link(item.link)] : []),
              ...(item.github ? [link(item.github)] : []),
            ]),
          ),
        ]
      : [],
    skills: data.skills.length
      ? [
          heading("Skills & Expertise", "skills"),
          paragraph(data.skills.join("  ·  "), "skills-text"),
        ]
      : [],
    certifications: data.certifications.length
      ? [
          heading("Certifications", "certifications"),
          ...data.certifications.map((item) =>
            entry(item, [
              title(item.name),
              muted(join(item.issuer, date(item.date))),
            ]),
          ),
        ]
      : [],
    languages: data.languages.length
      ? [
          heading("Languages", "languages"),
          ...data.languages.map((item) =>
            paragraph(join(item.name, item.proficiency), item.id),
          ),
        ]
      : [],
    custom: data.customSections.flatMap((item) => [
      heading(item.title || DEFAULT_SECTION_LABELS.custom, item.id),
      ...bullets(item.items),
    ]),
  };
  const nodeText = (node) =>
    typeof node === "string"
      ? node
      : Array.isArray(node)
        ? node.map(nodeText).join("")
        : node?.props
          ? nodeText(node.props.children)
          : "";
  const safeSections = Object.fromEntries(
    Object.entries(sections).map(([key, nodes]) => {
      const protectedNodes = [];
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node?.props.minPresenceAhead && nodes[i + 1]) {
          const next = nodes[++i];
          protectedNodes.push(
            h(
              View,
              {
                key: "start-" + key + "-" + i,
                wrap: nodeText(next).length > 900,
              },
              node,
              next,
            ),
          );
        } else protectedNodes.push(node);
      }
      return [key, protectedNodes];
    }),
  );
  const contact = [
    p.email,
    p.phone,
    p.location,
    p.linkedin,
    p.website,
    p.github,
  ].filter(Boolean);
  const headerStyle = {
    marginBottom: 8,
    paddingBottom: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: accent,
    ...(theme.center || c.headerStyle === "center"
      ? { textAlign: "center" }
      : {}),
    ...(theme.band || c.headerStyle === "banner"
      ? { backgroundColor: "#f2f5f3", padding: 16, borderRadius: 3 }
      : {}),
  };
  return h(
    Document,
    {
      title: `${name} — Resume`,
      author: name,
      creator: "ResumeForge",
      language: "en",
    },
    h(
      Page,
      {
        size: "A4",
        wrap: true,
        style: {
          fontFamily: font,
          fontSize,
          color: "#202b35",
          paddingTop: padding,
          paddingBottom: padding + 12,
          paddingHorizontal: padding,
        },
      },
      h(
        View,
        { wrap: false, style: headerStyle },
        ...(photoSource
          ? [
              h(Image, {
                src: photoSource,
                style: {
                  width: 48,
                  height: 48,
                  objectFit: "cover",
                  borderRadius: 24,
                  marginBottom: 8,
                  alignSelf: theme.center ? "center" : "flex-start",
                },
              }),
            ]
          : []),
        ...(theme.mono
          ? [
              text("// PROFILE", {
                fontSize: 8,
                color: accent,
                letterSpacing: 2,
                marginBottom: 5,
              }),
            ]
          : []),
        text(name, {
          fontSize: 26,
          fontWeight: 700,
          color: theme.center ? "#202b35" : accent,
          lineHeight: 1.15,
          marginBottom: 5,
        }),
        text(p.title || "Professional Title", {
          fontSize: 12,
          color: "#4b5660",
          marginBottom: 8,
        }),
        text(contact.join("  ·  "), {
          fontSize: 8,
          lineHeight: 1.5,
          color: "#5c6570",
        }),
      ),
      ...(c.template === "sidebar"
        ? [
            h(
              View,
              { style: { flexDirection: "row", gap: 18 } },
              h(
                View,
                {
                  style: {
                    width: "29%",
                    backgroundColor: "#f1f5f2",
                    padding: 12,
                  },
                },
                ...c.sectionOrder
                  .filter(
                    (key) =>
                      ["skills", "certifications", "languages"].includes(key) &&
                      c.sectionVisibility[key] !== false,
                  )
                  .flatMap((key) => safeSections[key] || []),
              ),
              h(
                View,
                { style: { width: "67%" } },
                ...c.sectionOrder
                  .filter(
                    (key) =>
                      !["skills", "certifications", "languages"].includes(
                        key,
                      ) && c.sectionVisibility[key] !== false,
                  )
                  .flatMap((key) => safeSections[key] || []),
              ),
            ),
          ]
        : c.sectionOrder
            .filter((key) => c.sectionVisibility[key] !== false)
            .flatMap((key) => safeSections[key] || [])),
      h(Text, {
        fixed: true,
        style: {
          position: "absolute",
          bottom: 19,
          left: padding,
          right: padding,
          fontFamily: "Helvetica",
          fontSize: 8,
          color: "#89919a",
          textAlign: "right",
        },
        render: ({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`,
      }),
    ),
  );
}
