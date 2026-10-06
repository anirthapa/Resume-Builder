import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderToBuffer, Font } from "@react-pdf/renderer";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { createResumeDocument, PDF_THEMES } from "../src/pdf/resumeDocument.js";
import {
  STARTER_RESUME,
  copyObject,
  createBlankResume,
} from "../src/utils/resumeDefaults.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "tmp/pdfs");
await fs.mkdir(output, { recursive: true });
Font.register({
  family: "QAInter",
  fonts: [400, 700].map((weight) => ({
    src: path.join(
      root,
      `node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff`,
    ),
    fontWeight: weight,
  })),
});
const reports = [];
async function inspect(
  name,
  data,
  { expected = [], minPages = 1, fontFamily = "QAInter" } = {},
) {
  const bytes = await renderToBuffer(
    createResumeDocument(data, { fontFamily }),
  );
  await fs.writeFile(path.join(output, name + ".pdf"), bytes);
  const task = getDocument({
    standardFontDataUrl:
      path.join(root, "public/pdf-fonts").replaceAll("\\", "/") + "/",
    data: new Uint8Array(bytes),
  });
  const doc = await task.promise;
  assert.ok(doc.numPages >= minPages, `${name}: expected ${minPages}+ pages`);
  let all = "";
  const pages = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();
    const items = content.items.filter((item) => item.str?.trim());
    const text = items.map((item) => item.str).join(" ");
    all += " " + text;
    assert.ok(items.length > 1, `${name}: blank page ${i}`);
    for (const item of items) {
      if (/^\d+ \/ \d+$/.test(item.str)) continue;
      assert.ok(
        item.transform[4] >= 28,
        `${name} page ${i}: text beyond left margin: ${item.str}`,
      );
      assert.ok(
        item.transform[4] + item.width <= viewport.width - 27,
        `${name} page ${i}: text beyond right margin: ${item.str}`,
      );
      assert.ok(
        item.transform[5] >= 35,
        `${name} page ${i}: text below bottom margin: ${item.str}`,
      );
      assert.ok(
        item.transform[5] <= viewport.height - 28,
        `${name} page ${i}: text beyond top margin: ${item.str}`,
      );
    }
    assert.ok(
      items.some((item) => item.str === `${i} / ${doc.numPages}`),
      `${name}: missing page number ${i}`,
    );
    const withoutFooter = items.filter(
      (item) => !/^\d+ \/ \d+$/.test(item.str),
    );
    const last = withoutFooter.at(-1)?.str;
    assert.ok(
      ![
        "PROFESSIONAL SUMMARY",
        "WORK EXPERIENCE",
        "EDUCATION",
        "FEATURED PROJECTS",
        "SKILLS & EXPERTISE",
        "CERTIFICATIONS",
        "LANGUAGES",
        "KEY ACCOMPLISHMENTS",
      ].includes(last),
      `${name}: orphan heading on page ${i}`,
    );
    pages.push({
      page: i,
      lines: items.length,
      first: withoutFooter[0]?.str,
      last,
    });
  }
  for (const value of expected)
    assert.ok(all.includes(value), `${name}: missing text ${value}`);
  reports.push({
    name,
    pages: doc.numPages,
    bytes: bytes.length,
    details: pages,
  });
  await task.destroy();
  console.log(`PASS ${name}: ${pages.length} pages, all text inside margins`);
}
for (const template of Object.keys(PDF_THEMES)) {
  const sample = copyObject(STARTER_RESUME);
  sample.customization.template = template;
  sample.customization.color = PDF_THEMES[template].accent;
  await inspect(template, sample, {
    expected: [
      "Maya Patel",
      "KEY ACCOMPLISHMENTS",
      "Creative Portfolio Redesign.",
    ],
  });
  const long = copyObject(sample);
  long.experience = Array.from({ length: 12 }, (_, i) => ({
    ...sample.experience[0],
    id: "long-" + i,
    company: "Company " + i,
    responsibilities: Array.from(
      { length: 7 },
      (__, j) =>
        `Achievement ${i}-${j}: Led research and implementation across cross-functional teams, improving delivery quality and documenting measurable outcomes for customers and colleagues.`,
    ),
  }));
  long.customSections = [
    {
      id: "tail",
      title: "Final Section",
      items: ["END OF RESUME REGRESSION MARKER"],
    },
  ];
  await inspect(template + "-long", long, {
    minPages: 3,
    expected: [
      "Company 11",
      "Achievement 11-6",
      "END OF RESUME REGRESSION MARKER",
    ],
  });
}
const huge = copyObject(STARTER_RESUME);
huge.experience = [
  {
    ...huge.experience[0],
    responsibilities: [
      "A long responsibility with multiple sentences. ".repeat(200) +
        "OVERSIZED ENTRY END",
    ],
  },
];
await inspect("oversized-entry", huge, {
  minPages: 2,
  expected: ["OVERSIZED ENTRY END", "Creative Portfolio Redesign."],
});
await inspect("blank", createBlankResume(), { expected: ["Your Name"] });
const hidden = copyObject(STARTER_RESUME);
hidden.customization.sectionVisibility = {
  summary: false,
  experience: false,
  education: false,
  projects: false,
  skills: false,
  certifications: false,
  languages: false,
  custom: false,
};
await inspect("hidden-sections", hidden, { expected: ["Maya Patel"] });
for (const pkg of [
  "dm-sans",
  "roboto",
  "outfit",
  "merriweather",
  "playfair-display",
  "jetbrains-mono",
]) {
  Font.register({
    family: pkg,
    fonts: [400, 700].map((weight) => ({
      src:
        pkg === "jetbrains-mono"
          ? path.join(
              root,
              "src/pdf/assets/JetBrainsMono-" +
                (weight === 400 ? "Regular" : "Bold") +
                ".ttf",
            )
          : path.join(
              root,
              `node_modules/@fontsource/${pkg}/files/${pkg}-latin-${weight}-normal.woff`,
            ),
      fontWeight: weight,
    })),
  });
  const resume = copyObject(STARTER_RESUME);
  resume.customization.fontSize = "spacious";
  resume.customization.lineSpacing = "relaxed";
  await inspect("font-" + pkg, resume, {
    fontFamily: pkg,
    expected: ["Maya Patel", "Creative Portfolio Redesign."],
  });
}
const compact = copyObject(STARTER_RESUME);
compact.customization.fontSize = "compact";
compact.customization.margins = "compact";
compact.customization.lineSpacing = "tight";
await inspect("compact", compact, {
  expected: ["Creative Portfolio Redesign."],
});
await fs.writeFile(
  path.join(output, "report.json"),
  JSON.stringify(reports, null, 2),
);
console.log(`Validated ${reports.length} PDFs. Report: ${output}`);
