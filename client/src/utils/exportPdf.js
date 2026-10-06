let rendererPromise;
let queue = Promise.resolve();
let latestKey;
let latestResult;

async function buildPdf(data) {
  rendererPromise ||= Promise.all([
    import("@react-pdf/renderer"),
    import("../pdf/resumeDocument.js"),
    import("../pdf/fonts.js"),
    import("pdfjs-dist"),
  ]).then(([renderer, layout, fonts, pdfjs]) => {
    fonts.registerPdfFonts();
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url,
    ).href;
    return { renderer, layout, pdfjs };
  });
  const { renderer, layout, pdfjs } = await rendererPromise;
  let photoSource;
  if (data.personalInfo.showPhoto && data.personalInfo.photoUrl) {
    try {
      const response = await fetch(data.personalInfo.photoUrl, {
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error("Image request failed");
      const blob = await response.blob();
      if (
        !["image/jpeg", "image/png"].includes(blob.type) ||
        blob.size > 5 * 1024 * 1024
      )
        throw new Error("Unsupported image");
      photoSource = {
        data: new Uint8Array(await blob.arrayBuffer()),
        format: blob.type === "image/png" ? "png" : "jpg",
      };
    } catch {
      throw new Error(
        "Your profile photo could not be loaded. Use an accessible PNG/JPEG under 5 MB, or turn off the photo before exporting.",
      );
    }
  }
  const document = layout.createResumeDocument(data, {
    fontFamily: `rf-${data.customization.fontFamily || "inter"}`,
    photoSource,
  });
  const blob = await renderer.pdf(document).toBlob();
  if (!blob.size) throw new Error("The PDF is empty. Please try again.");
  const task = pdfjs.getDocument({
    standardFontDataUrl: "/pdf-fonts/",
    data: new Uint8Array(await blob.arrayBuffer()),
  });
  const pdf = await task.promise;
  try {
    const images = [];
    for (let i = 1; i <= Math.min(pdf.numPages, 20); i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.4 });
      const canvas = globalThis.document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      await page.render({ canvasContext: canvas.getContext("2d"), viewport })
        .promise;
      images.push(canvas.toDataURL("image/png"));
      canvas.width = 0;
      canvas.height = 0;
    }
    return { blob, images, pageCount: pdf.numPages };
  } finally {
    await task.destroy();
  }
}

/** Serialize renderer work and share identical preview/download results. */
export function generateResumePdf(data) {
  const key = JSON.stringify(data);
  if (key === latestKey && latestResult) return latestResult;
  const snapshot = JSON.parse(key);
  latestKey = key;
  const job = queue.catch(() => {}).then(() => buildPdf(snapshot));
  queue = job;
  latestResult = job;
  job.catch(() => {
    if (latestResult === job) {
      latestKey = undefined;
      latestResult = undefined;
    }
  });
  return job;
}

export function downloadPdf(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = Array.from(filename)
    .map((char) =>
      char.charCodeAt(0) < 32 || '<>:"/\\|?*'.includes(char) ? "_" : char,
    )
    .join("");
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

export async function exportResumeToPdf(data, filename = "My_Resume.pdf") {
  const result = await generateResumePdf(data);
  downloadPdf(result.blob, filename);
  return result;
}
