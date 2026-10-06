import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router";
import Landing from "./pages/Landing";
import ResumeBuilder from "./pages/ResumeBuilder";

function RoutePosition() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}
function App() {
  return (
    <BrowserRouter>
      <RoutePosition />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route
          path="*"
          element={
            <main className="not-found">
              <p className="eyebrow">404 / Page not found</p>
              <h1>Let’s get you back on track.</h1>
              <p>
                This page doesn’t exist. Your saved draft is still in this
                browser.
              </p>
              <Link className="primary-btn" to="/resume-builder">
                Open my resume
              </Link>
              <Link to="/">Back to home</Link>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
