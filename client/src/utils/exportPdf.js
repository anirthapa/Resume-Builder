let rendererPromise;
let queue = Promise.resolve();
let latestRequest;

function getRenderer() {
  rendererPromise ||= Promise.all([
    import("@react-pdf/renderer"),
    import("../pdf/resumeDocument.js"),
    import("../pdf/fonts.js"),
    import("pdfjs-dist"),
  ])
    .then(([renderer, layout, fonts, pdfjs]) => {
      fonts.registerPdfFonts();
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).href;
      return { renderer, layout, pdfjs };
    })
    .catch((error) => {
      rendererPromise = undefined;
      throw error;
    });
  return rendererPromise;
}

async function buildPdf(data) {
  const { renderer, layout, pdfjs } = await getRenderer();
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
    return { blob, pageCount: pdf.numPages };
  } finally {
    await task.destroy();
  }
}

/** Render just the page the user is viewing. The source is the export PDF blob. */
export async function renderResumePdfPage(blob, pageNumber, targetWidth = 794) {
  const { pdfjs } = await getRenderer();
  const task = pdfjs.getDocument({
    standardFontDataUrl: "/pdf-fonts/",
    data: new Uint8Array(await blob.arrayBuffer()),
  });
  const pdf = await task.promise;
  try {
    if (pageNumber < 1 || pageNumber > pdf.numPages)
      throw new Error("That PDF page is unavailable.");
    const page = await pdf.getPage(pageNumber);
    const pageWidth = page.getViewport({ scale: 1 }).width;
    const scale = Math.min(5, Math.max(0.3, targetWidth / pageWidth));
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    try {
      await page.render({ canvasContext: canvas.getContext("2d"), viewport })
        .promise;
      return await new Promise((resolve, reject) =>
        canvas.toBlob(
          (image) =>
            image
              ? resolve(image)
              : reject(new Error("The PDF preview could not be drawn.")),
          "image/png",
        ),
      );
    } finally {
      page.cleanup();
      canvas.width = 0;
      canvas.height = 0;
    }
  } finally {
    await task.destroy();
  }
}

/** Serialize PDF creation and drop previews superseded before they start. */
export function generateResumePdf(data, { skipIfStale } = {}) {
  const key = JSON.stringify(data);
  if (latestRequest?.key === key) {
    if (!skipIfStale) latestRequest.required = true;
    else latestRequest.skipIfStale = skipIfStale;
    return latestRequest.promise;
  }
  const snapshot = JSON.parse(key);
  const request = { key, required: !skipIfStale, skipIfStale };
  request.promise = queue.then(() => {
    if (!request.required && request.skipIfStale?.())
      throw new DOMException("Preview superseded", "AbortError");
    return buildPdf(snapshot);
  });
  queue = request.promise.catch(() => {});
  latestRequest = request;
  request.promise.catch(() => {
    if (latestRequest === request) latestRequest = undefined;
  });
  return request.promise;
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
