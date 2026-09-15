import html2pdf from "html2pdf.js";

/**
 * High-quality client-side PDF export using html2pdf
 * @param {HTMLElement | string} target - Element or element ID
 * @param {string} filename - Desired output filename
 * @returns {Promise<void>}
 */
export async function exportResumeToPdf(target, filename = "My_Resume.pdf") {
  const element = typeof target === "string" ? document.getElementById(target) : target;
  if (!element) {
    throw new Error("Target element not found for PDF export");
  }

  const cleanFilename = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;

  const opt = {
    margin: [0, 0, 0, 0],
    filename: cleanFilename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2, // High DPI for crisp rendering
      useCORS: true,
      letterRendering: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 794,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: {
      mode: ["avoid-all", "css", "legacy"],
      avoid: [".resume-entry", ".cert-row", ".resume-header", "section"],
    },
  };

  return html2pdf().set(opt).from(element).save();
}
