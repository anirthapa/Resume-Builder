import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Undo2,
  CheckCheck,
  MoveUpRight,
  ArrowUpRight,
  ArrowRight,
  Check,
  FileText,
  Layers,
  ShieldCheck,
  SlidersHorizontal,
  Download,
  Menu,
  X,
} from "lucide-react";
import { TEMPLATES_REGISTRY } from "../templates";
import "./Landing.css";

function Preview({ template = "modern", eager = false }) {
  return (
    <img
      className="template-image"
      src={`/previews/${template}.webp`}
      alt={`${TEMPLATES_REGISTRY.find((t) => t.id === template)?.name} resume example`}
      width="794"
      height="1123"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

export default function Landing() {
  const [showcase, setShowcase] = useState("modern");
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("All templates");
  const [hasDraft] = useState(() => {
    try {
      return !!JSON.parse(localStorage.getItem("resume-builder-data"))
        ?.personalInfo;
    } catch {
      return false;
    }
  });
  const templates = TEMPLATES_REGISTRY.filter(
    (template) =>
      category === "All templates" ||
      (category === "Minimal"
        ? ["minimalist", "nordic"].includes(template.id)
        : category === "Creative"
          ? ["creative", "developer"].includes(template.id)
          : ["modern", "sidebar", "executive", "academic"].includes(
              template.id,
            )),
  );
  return (
    <div className="landing">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <FileText size={20} />
          </span>
          <span>
            resume<span>forge</span>
          </span>
        </Link>
        <nav
          className={menuOpen ? "site-nav is-open" : "site-nav"}
          aria-label="Main navigation"
        >
          <a href="#templates" onClick={() => setMenuOpen(false)}>
            Templates
          </a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
            How it works
          </a>
          <a href="#questions" onClick={() => setMenuOpen(false)}>
            FAQs
          </a>
        </nav>
        <Link className="site-button small" to="/resume-builder">
          {hasDraft ? "Continue my resume" : "Create my resume"}
          <ArrowUpRight size={16} />
        </Link>
        <button
          className="mobile-menu"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <main id="main-content">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="hero-kicker">
              <span /> THE RESUME STUDIO · FREE, BY DESIGN
            </span>
            <h1>
              Your experience.
              <br />
              <em>Beautifully put.</em>
            </h1>
            <p>
              A thoughtful resume for whatever comes next. Find your style, tell
              your story, and leave with a polished PDF. All in one quiet little
              workspace.
            </p>
            <div className="hero-actions">
              <Link className="site-button" to="/resume-builder">
                {hasDraft ? "Pick up where I left off" : "Build my resume"}
                <ArrowRight size={18} />
              </Link>
              <a className="text-link" href="#templates">
                Explore templates <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="hero-assurances">
              <span>
                <Check size={14} /> Free to download
              </span>
              <span>
                <Check size={14} /> No sign-up needed
              </span>
            </div>
          </div>
          <div className="hero-art studio-art">
            <div className="studio-toolbar">
              <span>
                <i /> LIVE FROM THE STUDIO
              </span>
              <span>MADE TO BE YOURS ↗</span>
            </div>
            <div className="studio-tabs" aria-label="Try a template">
              {[
                ["modern", "Modern"],
                ["minimalist", "Minimal"],
                ["creative", "Creative"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  aria-pressed={showcase === id}
                  className={showcase === id ? "selected" : ""}
                  onClick={() => setShowcase(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="studio-paper-back" aria-hidden="true" />
            <div className="hero-document">
              <Preview template={showcase} eager />
            </div>
            <div className="studio-stamp">
              A FRESH
              <br />
              <em>start.</em>
              <MoveUpRight size={19} />
            </div>
            <div className="studio-note">
              <span>
                <CheckCheck size={18} />
              </span>
              <div>
                <strong>Ready for your next chapter.</strong>
                <small>Real text. Considered layout. Your PDF.</small>
              </div>
            </div>
            <Link
              className="studio-use"
              to={`/resume-builder?template=${showcase}`}
            >
              Make this one mine <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
        <div className="benefit-strip">
          <span>
            LESS FORMATTING.
            <br />
            <strong>MORE POSSIBILITY.</strong>
          </span>
          <p>
            <Layers size={20} /> 8 considered templates
          </p>
          <p>
            <SlidersHorizontal size={20} /> Make every detail yours
          </p>
          <p>
            <ShieldCheck size={20} /> Drafts stay in your browser
          </p>
          <p>
            <Download size={20} /> Unlimited PDF exports
          </p>
        </div>
        <section className="templates-section" id="templates">
          <div className="section-topline">
            <div>
              <p className="section-kicker">A STRONG FIRST IMPRESSION</p>
              <h2>Find your kind of professional.</h2>
            </div>
            <p>
              From your first role to your next big move,
              <br />
              there’s a starting point for your story.
            </p>
          </div>
          <div className="template-filters" aria-label="Filter templates">
            {["All templates", "Professional", "Minimal", "Creative"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={category === item ? "selected" : ""}
                >
                  {item}
                  {item === "All templates" && <span>8</span>}
                </button>
              ),
            )}
          </div>
          <div className="template-grid">
            {templates.map((template, index) => (
              <article key={template.id} className="template-card">
                <div className={`template-visual tone-${index % 4}`}>
                  <Preview template={template.id} />
                  <Link
                    to={`/resume-builder?template=${template.id}`}
                    aria-label={`Use ${template.name} template`}
                    className="template-use"
                  >
                    Use this template <ArrowUpRight size={16} />
                  </Link>
                </div>
                <div className="template-card-title">
                  <h3>{template.name}</h3>
                  <ArrowUpRight size={18} />
                </div>
                <p>
                  {template.category}
                  <span>Free</span>
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="studio-features" id="features">
          <div className="section-topline">
            <div>
              <p className="section-kicker">
                SMALL DETAILS. A BETTER EXPERIENCE.
              </p>
              <h2>
                Built around you.
                <br />
                Right down to the last page.
              </h2>
            </div>
            <p>
              The practical things you need.
              <br />
              Without the things getting in your way.
            </p>
          </div>
          <div className="feature-bento">
            <article className="feature-pdf">
              <span className="feature-label">01 / FINISH WITH CONFIDENCE</span>
              <div className="page-demo" aria-hidden="true">
                <div>
                  <i />
                  <b>YOUR EXPERIENCE</b>
                  <span />
                  <span />
                  <span />
                  <small>A little breathing room.</small>
                </div>
                <span className="margin-marker">Margins on every page ↗</span>
              </div>
              <h3>The preview is the PDF.</h3>
              <p>
                No last-minute layout surprises. Review every page exactly as it
                will download, with selectable text and space where it matters.
              </p>
              <Link className="text-link" to="/resume-builder">
                See it in the studio <ArrowRight size={16} />
              </Link>
            </article>
            <article className="feature-undo">
              <span className="feature-label">02 / ROOM TO EXPERIMENT</span>
              <div className="undo-demo" aria-hidden="true">
                <span>Try something.</span>
                <span>
                  <Undo2 size={25} /> Change your mind.
                </span>
              </div>
              <h3>Your edits have a way back.</h3>
              <p>
                Rewrite that summary. Try a different style. Undo and redo let
                you explore without starting over.
              </p>
              <span className="feature-footnote">
                Your last 60 edits, one click away.
              </span>
            </article>
            <article className="feature-private">
              <ShieldCheck size={24} />
              <div>
                <h3>Your story stays yours.</h3>
                <p>
                  No account to create. Drafts live in your browser, with
                  portable backups whenever you need them.
                </p>
              </div>
            </article>
            <article className="feature-compact">
              <Layers size={24} />
              <div>
                <h3>A little less space. A little more focus.</h3>
                <p>
                  Switch to a compact layout and watch the actual page count
                  update. You decide what belongs.
                </p>
              </div>
            </article>
          </div>
        </section>
        <section className="steps-section" id="how-it-works">
          <div>
            <p className="section-kicker">FROM BLANK PAGE TO NEXT CHAPTER</p>
            <h2>
              A clear path to
              <br />a better resume.
            </h2>
            <Link className="text-link" to="/resume-builder">
              Let’s get started <ArrowRight size={17} />
            </Link>
          </div>
          <div className="steps-list">
            {[
              [
                "01",
                "Start with a design you love.",
                "Choose a template that suits your field. You can change it anytime without losing a word.",
              ],
              [
                "02",
                "Make room for your experience.",
                "Add your skills, projects, and achievements. Watch your resume take shape as you type.",
              ],
              [
                "03",
                "Download. Apply. Make your move.",
                "Review the exact PDF, check the page count, and download. Take a JSON backup along if you’re switching devices.",
              ],
            ].map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="faq-section" id="questions">
          <div>
            <p className="section-kicker">A FEW THINGS TO KNOW</p>
            <h2>
              Good questions.
              <br />
              Straight answers.
            </h2>
          </div>
          <div>
            {[
              [
                "Is ResumeForge really free?",
                "Yes. Every template, customization option, and PDF download is free. You don’t need an account or a credit card.",
              ],
              [
                "Where is my resume saved?",
                "Your draft is saved in this browser on this device. It isn’t synced to an account. Download a JSON backup from the editor before clearing browser data or moving to another device.",
              ],
              [
                "Can an applicant tracking system read my resume?",
                "Every PDF now contains selectable text. For automated applications, we recommend the single-column Minimalist ATS layout. Compatibility varies between systems; always review your application after uploading.",
              ],
              [
                "Can I change templates after I start?",
                "Absolutely. Switch templates, colors, fonts, and section order in the editor. Your content stays with you, and undo/redo makes experimentation easy.",
              ],
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span>+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="final-cta">
          <span className="section-kicker">
            YOU’VE GOT A STORY WORTH TELLING.
          </span>
          <h2>Let’s make your next move.</h2>
          <Link className="site-button" to="/resume-builder">
            Create my resume <ArrowUpRight size={18} />
          </Link>
          <p>Free to build. Free to download. Yours to keep.</p>
        </section>
      </main>
      <footer className="site-footer">
        <Link to="/" className="brand">
          <FileText size={20} />
          <span>
            resume<span>forge</span>
          </span>
        </Link>
        <p>Made for your next chapter.</p>
        <span>© {new Date().getFullYear()} ResumeForge</span>
      </footer>
    </div>
  );
}
