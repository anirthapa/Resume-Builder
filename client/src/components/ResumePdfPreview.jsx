import { useEffect, useRef, useState } from "react";
import { AlertCircle, FileText, Loader2 } from "lucide-react";
import { generateResumePdf, renderResumePdfPage } from "../utils/exportPdf";

export default function ResumePdfPreview({ data, page, onPageChange, onStatus }) {
  const [result, setResult] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [displayed, setDisplayed] = useState(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const resultRef = useRef(null);
  const imageUrlRef = useRef("");
  const revisionRef = useRef(0);

  useEffect(
    () => () => {
      if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
    },
    [],
  );

  useEffect(() => {
    const revision = ++revisionRef.current;
    let cancelled = false;
    setBusy(true);
    setError("");
    onStatus({ busy: true, pageCount: resultRef.current?.pageCount || 0 });
    const timer = setTimeout(async () => {
      try {
        const next = await generateResumePdf(data, {
          skipIfStale: () => cancelled || revision !== revisionRef.current,
        });
        if (cancelled || revision !== revisionRef.current) return;
        resultRef.current = next;
        setResult({ ...next });
      } catch (err) {
        if (cancelled || err.name === "AbortError") return;
        setError(err.message || "Preview could not be generated.");
        setBusy(false);
        onStatus({
          busy: false,
          pageCount: resultRef.current?.pageCount || 0,
          error: true,
        });
      }
    }, resultRef.current ? 900 : 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [data, onStatus, retry]);

  useEffect(() => {
    if (!result) return;
    if (page > result.pageCount) {
      onPageChange(1);
      return;
    }
    const revision = revisionRef.current;
    let cancelled = false;
    setBusy(true);
    onStatus({ busy: true, pageCount: result.pageCount });
    renderResumePdfPage(result.blob, page)
      .then((image) => {
        if (cancelled || revision !== revisionRef.current) return;
        const nextUrl = URL.createObjectURL(image);
        if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
        imageUrlRef.current = nextUrl;
        setImageUrl(nextUrl);
        setDisplayed({ page, pageCount: result.pageCount });
        setBusy(false);
        onStatus({ busy: false, pageCount: result.pageCount });
      })
      .catch((err) => {
        if (cancelled || revision !== revisionRef.current) return;
        setError(err.message || "The PDF page could not be drawn.");
        setBusy(false);
        onStatus({ busy: false, pageCount: result.pageCount, error: true });
      });
    return () => {
      cancelled = true;
    };
  }, [result, page, onPageChange, onStatus]);

  return (
    <div className="pdf-preview" aria-label="Exact PDF preview" aria-busy={busy}>
      {error && imageUrl && (
        <div className="pdf-preview-notice" role="alert">
          <AlertCircle size={16} />
          <span>Showing the last preview. {error}</span>
          <button onClick={() => setRetry((value) => value + 1)}>Retry</button>
        </div>
      )}
      {!imageUrl && !error && (
        <div className="pdf-placeholder" role="status">
          <div className="pdf-placeholder-icon">
            {busy ? (
              <Loader2 size={22} className="animate-spin" />
            ) : (
              <FileText size={22} />
            )}
          </div>
          <strong>Preparing your PDF preview</strong>
          <span>Your resume will appear here shortly.</span>
        </div>
      )}
      {!imageUrl && error && (
        <div className="pdf-render-error" role="alert">
          <AlertCircle size={22} />
          <p>{error}</p>
          <button
            className="primary-btn"
            onClick={() => setRetry((value) => value + 1)}
          >
            Try again
          </button>
        </div>
      )}
      {imageUrl && (
        <figure className="pdf-page">
          <img
            src={imageUrl}
            alt={`Resume PDF page ${displayed?.page || 1} of ${displayed?.pageCount || 1}`}
            width="794"
            height="1123"
          />
          <figcaption>
            Page {displayed?.page || 1} of {displayed?.pageCount || 1}
          </figcaption>
        </figure>
      )}
    </div>
  );
}
