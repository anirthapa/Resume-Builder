import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Check,
  Download,
  Eye,
  FileText,
  Plus,
  Save,
  Trash2,
  Sparkles,
  Upload,
  RotateCcw,
  Sliders,
  FolderDown,
  FolderUp,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Image as ImageIcon,
} from "lucide-react";
import ResumeTemplate from "../components/ResumeTemplate";
import CustomizationPanel from "../components/CustomizationPanel";
import TemplateGalleryModal from "../components/TemplateGalleryModal";
import {
  STARTER_RESUME,
  migrateResumeData,
  copyObject,
} from "../utils/resumeDefaults";
import { TEMPLATES_REGISTRY, getTemplateById } from "../templates/index";

function Field({ label, value, onChange, type = "text", placeholder = "", helper = "" }) {
  return (
    <label className="builder-field">
      <div className="flex justify-between">
        <span>{label}</span>
        {helper && <span className="text-[10px] text-gray-400 font-normal">{helper}</span>}
      </div>
      <input
        type={type}
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default function ResumeBuilder() {
  const [params] = useSearchParams();
  const fileInputRef = useRef(null);

  // Initialize data with safe migration
  const [data, setData] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("resume-builder-data"));
      const migrated = migrateResumeData(saved);
      const queryTemp = params.get("template");
      if (queryTemp) {
        migrated.customization.template = queryTemp.toLowerCase();
      }
      return migrated;
    } catch {
      return copyObject(STARTER_RESUME);
    }
  });

  const [activeTab, setActiveTab] = useState("design");
  const [previewMode, setPreviewMode] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  // Persist to local storage
  useEffect(() => {
    try {
      localStorage.setItem("resume-builder-data", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save resume locally:", e);
    }
  }, [data]);

  // Handle URL query parameter template change
  useEffect(() => {
    const q = params.get("template");
    if (q) {
      const matched = getTemplateById(q);
      setData((prev) => ({
        ...prev,
        customization: {
          ...prev.customization,
          template: matched.id,
          color: prev.customization.color || matched.defaultColor,
        },
      }));
    }
  }, [params]);

  // Completion calculation
  const complete = useMemo(() => {
    const checks = [
      data.personalInfo.firstName,
      data.personalInfo.lastName,
      data.personalInfo.email,
      data.personalInfo.title,
      data.summary,
      data.experience.length,
      data.education.length,
      data.skills.length,
      data.projects.length,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [data]);

  // State mutations
  const updatePersonalInfo = (key, value) => {
    setData((d) => ({
      ...d,
      personalInfo: { ...d.personalInfo, [key]: value },
    }));
  };

  const updateCustomization = (newCustomization) => {
    setData((d) => ({
      ...d,
      customization: newCustomization,
    }));
  };

  const updateItem = (collection, id, key, value) => {
    setData((d) => ({
      ...d,
      [collection]: (d[collection] || []).map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      ),
    }));
  };

  const addItem = (collection, item) => {
    setData((d) => ({
      ...d,
      [collection]: [...(d[collection] || []), { id: Date.now(), ...item }],
    }));
  };

  const removeItem = (collection, id) => {
    setData((d) => ({
      ...d,
      [collection]: (d[collection] || []).filter((item) => item.id !== id),
    }));
  };

  const handleSave = () => {
    localStorage.setItem("resume-builder-data", JSON.stringify(data));
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2200);
  };

  const handlePrint = () => {
    const firstName = data.personalInfo.firstName || "Resume";
    const lastName = data.personalInfo.lastName || "";
    document.title = `${firstName}_${lastName}_CV`;
    window.print();
  };

  // Export JSON
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.personalInfo.firstName || "resume"}_data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const migrated = migrateResumeData(parsed);
        setData(migrated);
        handleSave();
      } catch (err) {
        alert("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Reset to starter data
  const handleResetStarter = () => {
    if (window.confirm("Reset all resume data to sample template data? Any unsaved edits will be replaced.")) {
      setData(copyObject(STARTER_RESUME));
    }
  };

  // Clear data
  const handleClearAll = () => {
    if (window.confirm("Clear all resume fields to start from a blank canvas?")) {
      setData({
        ...copyObject(STARTER_RESUME),
        personalInfo: { firstName: "", lastName: "", title: "", email: "", phone: "", location: "", linkedin: "", website: "", github: "", photoUrl: "", showPhoto: false },
        summary: "",
        experience: [],
        education: [],
        projects: [],
        skills: [],
        certifications: [],
        languages: [],
        customSections: [],
      });
    }
  };

  // Editor Form renderer
  const renderFormContent = () => {
    if (activeTab === "design") {
      return (
        <CustomizationPanel
          customization={data.customization}
          onChangeCustomization={updateCustomization}
          onOpenTemplateGallery={() => setIsGalleryOpen(true)}
        />
      );
    }

    if (activeTab === "personal") {
      return (
        <section className="space-y-4">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / Contact & Identity</p>
              <h2>Personal Information</h2>
            </div>
          </div>

          <div className="form-grid">
            <Field label="First Name" value={data.personalInfo.firstName} onChange={(v) => updatePersonalInfo("firstName", v)} />
            <Field label="Last Name" value={data.personalInfo.lastName} onChange={(v) => updatePersonalInfo("lastName", v)} />
            <Field label="Professional Title" value={data.personalInfo.title} onChange={(v) => updatePersonalInfo("title", v)} placeholder="e.g. Senior Frontend Engineer" />
            <Field label="Email" type="email" value={data.personalInfo.email} onChange={(v) => updatePersonalInfo("email", v)} />
            <Field label="Phone" value={data.personalInfo.phone} onChange={(v) => updatePersonalInfo("phone", v)} />
            <Field label="Location" value={data.personalInfo.location} onChange={(v) => updatePersonalInfo("location", v)} placeholder="e.g. San Francisco, CA" />
            <Field label="LinkedIn" value={data.personalInfo.linkedin} onChange={(v) => updatePersonalInfo("linkedin", v)} placeholder="linkedin.com/in/username" />
            <Field label="Website / Portfolio" value={data.personalInfo.website} onChange={(v) => updatePersonalInfo("website", v)} placeholder="yoursite.dev" />
            <Field label="GitHub" value={data.personalInfo.github} onChange={(v) => updatePersonalInfo("github", v)} placeholder="github.com/username" />
          </div>

          <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 mt-4 space-y-3">
            <label className="check-field">
              <input
                type="checkbox"
                checked={!!data.personalInfo.showPhoto}
                onChange={(e) => updatePersonalInfo("showPhoto", e.target.checked)}
              />
              <span className="font-semibold text-gray-800 text-xs">Include Profile Photo / Headshot</span>
            </label>

            {data.personalInfo.showPhoto && (
              <Field
                label="Photo Image URL"
                value={data.personalInfo.photoUrl}
                onChange={(v) => updatePersonalInfo("photoUrl", v)}
                placeholder="https://images.unsplash.com/... or direct image URL"
                helper="Paste an image URL for your avatar"
              />
            )}
          </div>
        </section>
      );
    }

    if (activeTab === "summary") {
      return (
        <section>
          <p className="eyebrow">02 / Elevator Pitch</p>
          <h2>Professional Summary</h2>
          <p className="helper">
            Write a high-impact 2–4 sentence summary highlighting your core strengths, experience level, and key accomplishments.
          </p>
          <textarea
            className="summary-input"
            value={data.summary}
            onChange={(e) => setData({ ...data, summary: e.target.value })}
            maxLength={900}
            rows={6}
          />
          <div className="char-count">{data.summary.length} / 900 characters</div>
        </section>
      );
    }

    if (activeTab === "experience") {
      return (
        <section>
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / Career History</p>
              <h2>Work Experience</h2>
            </div>
            <button
              className="add-btn"
              onClick={() =>
                addItem("experience", {
                  company: "",
                  position: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  current: false,
                  responsibilities: [""],
                })
              }
            >
              <Plus size={16} /> Add Role
            </button>
          </div>

          {data.experience.map((exp) => (
            <div className="repeat-card" key={exp.id}>
              <button className="delete-btn" onClick={() => removeItem("experience", exp.id)}>
                <Trash2 size={15} />
              </button>
              <div className="form-grid">
                <Field label="Job Title" value={exp.position} onChange={(v) => updateItem("experience", exp.id, "position", v)} />
                <Field label="Company" value={exp.company} onChange={(v) => updateItem("experience", exp.id, "company", v)} />
                <Field label="Location" value={exp.location} onChange={(v) => updateItem("experience", exp.id, "location", v)} />
                <Field label="Start Date" type="month" value={exp.startDate} onChange={(v) => updateItem("experience", exp.id, "startDate", v)} />
                <Field label="End Date" type="month" value={exp.endDate} onChange={(v) => updateItem("experience", exp.id, "endDate", v)} />
              </div>

              <label className="check-field">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateItem("experience", exp.id, "current", e.target.checked)}
                />
                I currently work in this role
              </label>

              <label className="builder-field">
                <span>Key Accomplishments & Responsibilities (One bullet per line)</span>
                <textarea
                  value={(exp.responsibilities || []).join("\n")}
                  onChange={(e) => updateItem("experience", exp.id, "responsibilities", e.target.value.split("\n"))}
                  rows={4}
                  placeholder="• Spearheaded design and implementation...&#10;• Reduced latency by 35%...&#10;• Mentored a team of 4..."
                />
              </label>
            </div>
          ))}
        </section>
      );
    }

    if (activeTab === "education") {
      return (
        <section>
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 / Academic Foundation</p>
              <h2>Education</h2>
            </div>
            <button
              className="add-btn"
              onClick={() =>
                addItem("education", {
                  institution: "",
                  degree: "",
                  field: "",
                  startDate: "",
                  endDate: "",
                  gpa: "",
                  honors: "",
                })
              }
            >
              <Plus size={16} /> Add School
            </button>
          </div>

          {data.education.map((edu) => (
            <div className="repeat-card" key={edu.id}>
              <button className="delete-btn" onClick={() => removeItem("education", edu.id)}>
                <Trash2 size={15} />
              </button>
              <div className="form-grid">
                <Field label="Institution / University" value={edu.institution} onChange={(v) => updateItem("education", edu.id, "institution", v)} />
                <Field label="Degree" value={edu.degree} onChange={(v) => updateItem("education", edu.id, "degree", v)} placeholder="e.g. B.S., B.A., M.S." />
                <Field label="Field of Study" value={edu.field} onChange={(v) => updateItem("education", edu.id, "field", v)} placeholder="Computer Science" />
                <Field label="GPA (Optional)" value={edu.gpa} onChange={(v) => updateItem("education", edu.id, "gpa", v)} placeholder="3.9 / 4.0" />
                <Field label="Start Date" type="month" value={edu.startDate} onChange={(v) => updateItem("education", edu.id, "startDate", v)} />
                <Field label="End Date / Expected" type="month" value={edu.endDate} onChange={(v) => updateItem("education", edu.id, "endDate", v)} />
              </div>
              <div className="mt-3">
                <Field label="Honors / Awards / Activities (Optional)" value={edu.honors} onChange={(v) => updateItem("education", edu.id, "honors", v)} placeholder="Dean's List, Cum Laude, President of ACM" />
              </div>
            </div>
          ))}
        </section>
      );
    }

    if (activeTab === "projects") {
      return (
        <section>
          <div className="section-heading">
            <div>
              <p className="eyebrow">05 / Portfolio & Artifacts</p>
              <h2>Featured Projects</h2>
            </div>
            <button
              className="add-btn"
              onClick={() =>
                addItem("projects", {
                  name: "",
                  role: "",
                  link: "",
                  github: "",
                  technologies: "",
                  description: "",
                })
              }
            >
              <Plus size={16} /> Add Project
            </button>
          </div>

          {data.projects.map((proj) => (
            <div className="repeat-card" key={proj.id}>
              <button className="delete-btn" onClick={() => removeItem("projects", proj.id)}>
                <Trash2 size={15} />
              </button>
              <div className="form-grid">
                <Field label="Project Name" value={proj.name} onChange={(v) => updateItem("projects", proj.id, "name", v)} />
                <Field label="Your Role" value={proj.role} onChange={(v) => updateItem("projects", proj.id, "role", v)} placeholder="Lead Creator, Full Stack Dev" />
                <Field label="Technologies Used" value={proj.technologies} onChange={(v) => updateItem("projects", proj.id, "technologies", v)} placeholder="React, Node.js, Tailwind, Docker" />
                <Field label="Live Demo URL (Optional)" value={proj.link} onChange={(v) => updateItem("projects", proj.id, "link", v)} placeholder="https://myproject.com" />
                <Field label="GitHub Repository (Optional)" value={proj.github} onChange={(v) => updateItem("projects", proj.id, "github", v)} placeholder="github.com/user/project" />
              </div>
              <div className="mt-3">
                <label className="builder-field">
                  <span>Project Description & Impact</span>
                  <textarea
                    value={proj.description}
                    onChange={(e) => updateItem("projects", proj.id, "description", e.target.value)}
                    rows={2}
                    placeholder="Describe the problem, your architecture, and key outcomes..."
                  />
                </label>
              </div>
            </div>
          ))}
        </section>
      );
    }

    if (activeTab === "skills") {
      return (
        <section>
          <p className="eyebrow">06 / Toolkit</p>
          <h2>Skills & Competencies</h2>
          <p className="helper">Separate skills with commas. Group relevant tools, languages, and technical frameworks.</p>
          <textarea
            className="summary-input skills-input"
            value={data.skills.join(", ")}
            onChange={(e) =>
              setData({
                ...data,
                skills: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            rows={5}
            placeholder="TypeScript, React, Node.js, Python, PostgreSQL, AWS, UI/UX Design, Docker, GraphQL"
          />
          <div className="flex flex-wrap gap-1.5 mt-3">
            {data.skills.map((skill, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200 text-gray-800 font-medium">
                {skill}
              </span>
            ))}
          </div>
        </section>
      );
    }

    if (activeTab === "certifications") {
      return (
        <section>
          <div className="section-heading">
            <div>
              <p className="eyebrow">07 / Credentials</p>
              <h2>Certifications & Licensures</h2>
            </div>
            <button className="add-btn" onClick={() => addItem("certifications", { name: "", issuer: "", date: "" })}>
              <Plus size={16} /> Add
            </button>
          </div>
          {data.certifications.map((cert) => (
            <div className="repeat-card" key={cert.id}>
              <button className="delete-btn" onClick={() => removeItem("certifications", cert.id)}>
                <Trash2 size={15} />
              </button>
              <div className="form-grid">
                <Field label="Certification Name" value={cert.name} onChange={(v) => updateItem("certifications", cert.id, "name", v)} />
                <Field label="Issuing Organization" value={cert.issuer} onChange={(v) => updateItem("certifications", cert.id, "issuer", v)} />
                <Field label="Issue Date" type="month" value={cert.date} onChange={(v) => updateItem("certifications", cert.id, "date", v)} />
              </div>
            </div>
          ))}
        </section>
      );
    }

    if (activeTab === "languages") {
      return (
        <section>
          <div className="section-heading">
            <div>
              <p className="eyebrow">08 / Communication</p>
              <h2>Languages</h2>
            </div>
            <button className="add-btn" onClick={() => addItem("languages", { name: "", proficiency: "Professional working" })}>
              <Plus size={16} /> Add Language
            </button>
          </div>

          {data.languages.map((lang) => (
            <div className="repeat-card" key={lang.id}>
              <button className="delete-btn" onClick={() => removeItem("languages", lang.id)}>
                <Trash2 size={15} />
              </button>
              <div className="form-grid">
                <Field label="Language" value={lang.name} onChange={(v) => updateItem("languages", lang.id, "name", v)} placeholder="e.g. English, Spanish" />
                <label className="builder-field">
                  <span>Proficiency Level</span>
                  <select
                    className="border border-gray-300 rounded-md p-2 text-xs bg-white"
                    value={lang.proficiency}
                    onChange={(e) => updateItem("languages", lang.id, "proficiency", e.target.value)}
                  >
                    <option value="Native / Bilingual">Native / Bilingual</option>
                    <option value="Fluent / Full Professional">Fluent / Full Professional</option>
                    <option value="Professional working">Professional working</option>
                    <option value="Conversational / Intermediate">Conversational / Intermediate</option>
                    <option value="Elementary / Basic">Elementary / Basic</option>
                  </select>
                </label>
              </div>
            </div>
          ))}
        </section>
      );
    }

    if (activeTab === "custom") {
      return (
        <section>
          <div className="section-heading">
            <div>
              <p className="eyebrow">09 / Flexibility</p>
              <h2>Custom Sections</h2>
            </div>
            <button className="add-btn" onClick={() => addItem("customSections", { title: "Awards & Honors", items: [""] })}>
              <Plus size={16} /> Add Section
            </button>
          </div>

          {data.customSections.map((c) => (
            <div className="repeat-card" key={c.id}>
              <button className="delete-btn" onClick={() => removeItem("customSections", c.id)}>
                <Trash2 size={15} />
              </button>
              <Field label="Section Heading" value={c.title} onChange={(v) => updateItem("customSections", c.id, "title", v)} placeholder="e.g. Volunteer Experience, Publications" />
              <label className="builder-field mt-3">
                <span>Section Bullet Items (One per line)</span>
                <textarea
                  value={(c.items || []).join("\n")}
                  onChange={(e) => updateItem("customSections", c.id, "items", e.target.value.split("\n"))}
                  rows={3}
                />
              </label>
            </div>
          ))}
        </section>
      );
    }

    return null;
  };

  const navTabs = [
    ["design", "Design & Style", Sliders],
    ["personal", "Personal", null],
    ["summary", "Summary", null],
    ["experience", "Experience", null],
    ["education", "Education", null],
    ["projects", "Projects", null],
    ["skills", "Skills", null],
    ["certifications", "Certs", null],
    ["languages", "Languages", null],
    ["custom", "Custom", null],
  ];

  const activeTemplateConfig = getTemplateById(data.customization?.template);

  return (
    <div className="builder-shell">
      {/* Header */}
      <header className="builder-header no-print">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <FileText size={19} />
          </span>
          <span>
            Resume<span>Forge</span>
          </span>
        </Link>

        <div className="builder-status">
          <span className="save-dot" />
          {savedNotice ? "Saved to browser" : "Auto-saved locally"}
        </div>

        <div className="builder-actions">
          {/* Hidden JSON file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportJSON}
            className="hidden"
          />

          <button
            className="ghost-btn hidden md:inline-flex"
            onClick={() => fileInputRef.current?.click()}
            title="Import existing resume JSON"
          >
            <FolderUp size={15} /> Import JSON
          </button>

          <button
            className="ghost-btn hidden md:inline-flex"
            onClick={handleExportJSON}
            title="Download resume JSON backup"
          >
            <FolderDown size={15} /> Export JSON
          </button>

          <button
            className="ghost-btn"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye size={16} /> {previewMode ? "Edit Resume" : "Preview Mode"}
          </button>

          <button className="primary-btn" onClick={handleSave}>
            <Save size={16} /> Save Resume
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="builder-main">
        {/* Left Form Editor Panel */}
        <aside className={`editor-panel ${previewMode ? "editor-hidden" : ""}`}>
          <div className="editor-intro">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Resume Workspace</p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleResetStarter}
                  className="text-[11px] text-gray-500 hover:text-orange-600 flex items-center gap-1 px-2 py-0.5 rounded hover:bg-gray-100 transition"
                  title="Reset to sample data"
                >
                  <RotateCcw size={11} /> Sample Data
                </button>
                <button
                  onClick={handleClearAll}
                  className="text-[11px] text-gray-400 hover:text-red-600 px-1.5 py-0.5 rounded hover:bg-red-50 transition"
                  title="Clear all fields"
                >
                  Clear
                </button>
              </div>
            </div>
            <h1>Customize Your Story.</h1>
            <p>Fine-tune content, typography, styling, and templates in real time.</p>

            <div className="progress-line">
              <div style={{ width: `${complete}%` }} />
            </div>
            <div className="flex justify-between items-center text-[11px] text-gray-400">
              <span>{complete}% completed</span>
              <span className="font-medium text-orange-600">{activeTemplateConfig.name}</span>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <nav className="section-tabs scrollbar-none">
            {navTabs.map(([id, label, Icon]) => (
              <button
                key={id}
                className={activeTab === id ? "active" : ""}
                onClick={() => setActiveTab(id)}
              >
                {Icon && <Icon size={14} className="text-orange-500" />}
                {label}
                {activeTab === id && <Check size={13} className="ml-1 text-orange-600" />}
              </button>
            ))}
          </nav>

          {/* Active Tab Form Content */}
          <div className="form-content">{renderFormContent()}</div>
        </aside>

        {/* Right Preview Panel */}
        <section className={`preview-panel ${previewMode ? "preview-full" : ""}`}>
          {/* Preview Toolbar */}
          <div className="preview-toolbar no-print">
            <div className="hidden lg:block">
              <p className="eyebrow">Document Canvas</p>
              <span className="text-xs text-gray-500">A4 Printable Format</span>
            </div>

            {/* Change Template CTA */}
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Template: <strong>{activeTemplateConfig.name}</strong></span>
            </button>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setZoom((z) => Math.max(0.6, Math.round((z - 0.1) * 10) / 10))}
                className="p-1 rounded text-gray-600 hover:bg-white transition"
                title="Zoom out"
              >
                <ZoomOut size={14} />
              </button>
              <span className="text-[11px] font-mono text-gray-600 w-11 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(1.4, Math.round((z + 0.1) * 10) / 10))}
                className="p-1 rounded text-gray-600 hover:bg-white transition"
                title="Zoom in"
              >
                <ZoomIn size={14} />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="p-1 rounded text-gray-600 hover:bg-white transition text-[10px] font-semibold"
                title="Reset zoom to 100%"
              >
                100%
              </button>
            </div>

            {/* PDF Export button */}
            <button className="download-btn ml-auto" onClick={handlePrint}>
              <Download size={15} /> Export PDF
            </button>
          </div>

          {/* Paper Canvas */}
          <div className="paper-wrap">
            <div
              className="paper transition-transform duration-150"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top center",
              }}
            >
              <ResumeTemplate
                resumeData={data}
                customization={data.customization}
                variant={data.customization.template}
                colorScheme={data.customization.color}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Visual Template Gallery Modal */}
      <TemplateGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        selectedTemplate={data.customization.template}
        onSelectTemplate={(templateId, defaultColor) => {
          updateCustomization({
            ...data.customization,
            template: templateId,
            color: defaultColor || data.customization.color,
          });
        }}
      />
    </div>
  );
}
