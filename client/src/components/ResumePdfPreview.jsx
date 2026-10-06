import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { generateResumePdf } from "../utils/exportPdf";

export default function ResumePdfPreview({ data, onStatus }) {
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let cancelled = false;
    setBusy(true);
    setError("");
    onStatus({ busy: true, pageCount: 0 });
    const timer = setTimeout(async () => {
      try {
        const next = await generateResumePdf(data);
        if (!cancelled) {
          setResult(next);
          setBusy(false);
          onStatus({ busy: false, pageCount: next.pageCount });
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Preview could not be generated. Please try again.",
          );
          setBusy(false);
          onStatus({ busy: false, pageCount: 0, error: true });
        }
      }
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [data, onStatus, retry]);
  return (
    <div
      className="pdf-preview"
      aria-label="Exact PDF preview"
      aria-busy={busy}
    >
      {busy && (
        <div className="pdf-render-status" role="status">
          <Loader2 size={18} className="animate-spin" /> Updating your PDF…
        </div>
      )}
      {error && (
        <div className="pdf-render-error" role="alert">
          <AlertCircle size={22} />
          <p>{error}</p>
          <button
            className="primary-btn"
            onClick={() => setRetry((v) => v + 1)}
          >
            Try again
          </button>
        </div>
      )}
      {!result && !error && (
        <div className="pdf-placeholder">Your resume is taking shape.</div>
      )}
      {!error &&
        result?.images.map((src, index) => (
          <figure
            key={index}
            className={busy ? "pdf-page updating" : "pdf-page"}
          >
            <img
              src={src}
              alt={`Resume PDF page ${index + 1} of ${result.pageCount}`}
              width="794"
              height="1123"
            />
            <figcaption>
              Page {index + 1} of {result.pageCount}
            </figcaption>
          </figure>
        ))}
      {result?.pageCount > 20 && (
        <p className="pdf-preview-limit">
          Preview shows the first 20 pages. The download includes all{" "}
          {result.pageCount} pages.
        </p>
      )}
    </div>
  );
}
