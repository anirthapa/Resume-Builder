import React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Code2, Terminal } from "lucide-react";
import { formatDate, getBulletClass } from "./templateUtils";

export default function TechDeveloper({ data, customization }) {
  const { personalInfo = {}, summary, experience = [], education = [], projects = [], skills = [], certifications = [], languages = [], customSections = [] } = data;
  const accent = customization?.color || "#0d9488";
  const bulletClass = getBulletClass(customization?.bulletStyle);
  const visibility = customization?.sectionVisibility || {};
  const order = customization?.sectionOrder || ["summary", "skills", "experience", "projects", "education", "certifications", "languages", "custom"];

  const renderHeader = () => (
    <header className="mb-5 pb-4 border-b border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-gray-900 text-white">
              <Terminal className="w-3.5 h-3.5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-gray-950 font-mono">
              {personalInfo.firstName}_{personalInfo.lastName}
            </h1>
          </div>
          <p className="text-xs font-mono font-semibold mt-1" style={{ color: accent }}>
            const role = "{personalInfo.title || "Software Engineer"}";
          </p>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600 font-mono">
          {personalInfo.github && (
            <a href={`https://${personalInfo.github.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
              <Github className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.github}
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
              <Linkedin className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.linkedin}
            </a>
          )}
          {personalInfo.website && (
            <a href={`https://${personalInfo.website.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
              <Globe className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.website}
            </a>
          )}
          {personalInfo.email && (
            <span className="inline-flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="inline-flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.location}
            </span>
          )}
        </div>
      </div>
    </header>
  );

  const renderSectionHeading = (title) => (
    <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900 mt-4 mb-2 flex items-center gap-1.5 pb-1 border-b" style={{ borderColor: accent }}>
      <Code2 className="w-3.5 h-3.5" style={{ color: accent }} />
      <span>// {title}</span>
    </h2>
  );

  const sections = {
    summary: visibility.summary !== false && summary ? (
      <section key="summary" className="mb-4">
        {renderSectionHeading("About")}
        <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
      </section>
    ) : null,

    skills: visibility.skills !== false && skills?.length > 0 ? (
      <section key="skills" className="mb-4">
        {renderSectionHeading("Technical Skills")}
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="text-xs font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    experience: visibility.experience !== false && experience?.length > 0 ? (
      <section key="experience" className="mb-4">
        {renderSectionHeading("Experience")}
        <div className="space-y-3.5">
          {experience.map((item) => (
            <div key={item.id} className="text-xs">
              <div className="flex justify-between items-baseline font-mono">
                <span className="font-bold text-gray-950 text-sm">
                  {item.position} <span style={{ color: accent }}>@{item.company}</span>
                </span>
                <span className="text-[11px] text-gray-500">
                  {formatDate(item.startDate)} - {item.current ? "Present" : formatDate(item.endDate)}
                </span>
              </div>
              {item.location && <div className="text-[11px] text-gray-500 italic mt-0.5">{item.location}</div>}
              {item.responsibilities?.length > 0 && (
                <ul className={bulletClass}>
                  {item.responsibilities.filter(Boolean).map((resp, i) => (
                    <li key={i} className="text-gray-700 leading-relaxed text-xs">{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    projects: visibility.projects !== false && projects?.length > 0 ? (
      <section key="projects" className="mb-4">
        {renderSectionHeading("Projects & Open Source")}
        <div className="space-y-3">
          {projects.map((proj) => (
            <div key={proj.id} className="text-xs">
              <div className="flex justify-between items-baseline font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-950">{proj.name}</span>
                  {proj.role && <span className="text-gray-500 font-normal">({proj.role})</span>}
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-800">
                      <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  )}
                  {proj.github && (
                    <a href={`https://${proj.github.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-800">
                      <Github className="w-3 h-3 inline" />
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <span className="text-[11px] text-gray-500 font-mono">[{proj.technologies}]</span>
                )}
              </div>
              {proj.description && <p className="text-gray-700 mt-1 leading-relaxed text-xs">{proj.description}</p>}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    education: visibility.education !== false && education?.length > 0 ? (
      <section key="education" className="mb-4">
        {renderSectionHeading("Education")}
        <div className="space-y-2 text-xs font-mono">
          {education.map((item) => (
            <div key={item.id} className="flex justify-between items-start">
              <div>
                <span className="font-bold text-gray-900">{item.degree} {item.field && `in ${item.field}`}</span>
                <div className="text-gray-600">{item.institution} {item.gpa && `| GPA: ${item.gpa}`}</div>
              </div>
              <span className="text-gray-500 text-[11px]">
                {formatDate(item.startDate)} - {formatDate(item.endDate)}
              </span>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    certifications: visibility.certifications !== false && certifications?.length > 0 ? (
      <section key="certifications" className="mb-4">
        {renderSectionHeading("Certifications")}
        <div className="space-y-1 text-xs font-mono">
          {certifications.map((c) => (
            <div key={c.id} className="flex justify-between">
              <span className="font-bold text-gray-900">{c.name}</span>
              <span className="text-gray-600">{c.issuer} {c.date && `(${formatDate(c.date)})`}</span>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    languages: visibility.languages !== false && languages?.length > 0 ? (
      <section key="languages" className="mb-4">
        {renderSectionHeading("Languages")}
        <div className="flex gap-4 text-xs font-mono text-gray-800">
          {languages.map((l) => (
            <span key={l.id}>{l.name} [{l.proficiency}]</span>
          ))}
        </div>
      </section>
    ) : null,

    custom: visibility.custom !== false && customSections?.length > 0 ? (
      <div key="custom">
        {customSections.map((c) => (
          <section key={c.id} className="mb-4">
            {renderSectionHeading(c.title || "Additional Info")}
            <ul className={bulletClass}>
              {(c.items || []).map((item, i) => (
                <li key={i} className="text-gray-700 text-xs leading-normal">{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    ) : null,
  };

  return (
    <div className="resume-template tech-developer">
      {renderHeader()}
      <main>
        {order.map((sectionKey) => sections[sectionKey] || null)}
      </main>
    </div>
  );
}
