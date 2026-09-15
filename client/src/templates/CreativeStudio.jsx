import React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Sparkles } from "lucide-react";
import { formatDate, getBulletClass } from "./templateUtils";

export default function CreativeStudio({ data, customization }) {
  const { personalInfo = {}, summary, experience = [], education = [], projects = [], skills = [], certifications = [], languages = [], customSections = [] } = data;
  const accent = customization?.color || "#7c3aed";
  const bulletClass = getBulletClass(customization?.bulletStyle);
  const visibility = customization?.sectionVisibility || {};
  const order = customization?.sectionOrder || ["summary", "experience", "education", "projects", "skills", "certifications", "languages", "custom"];

  const renderHeader = () => (
    <header className="mb-6 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b-2" style={{ borderColor: accent }}>
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1 px-2.5 py-0.5 rounded-full" style={{ backgroundColor: `color-mix(in srgb, ${accent} 15%, transparent)`, color: accent }}>
            <Sparkles className="w-3 h-3" />
            {personalInfo.title || "Creative Professional"}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-950">
            {personalInfo.firstName} <span style={{ color: accent }}>{personalInfo.lastName}</span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {personalInfo.email && (
            <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 flex items-center gap-1.5">
              <Mail className="w-3 h-3" style={{ color: accent }} />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 flex items-center gap-1.5">
              <Phone className="w-3 h-3" style={{ color: accent }} />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 flex items-center gap-1.5">
              <MapPin className="w-3 h-3" style={{ color: accent }} />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 flex items-center gap-1.5 font-medium">
              <Globe className="w-3 h-3" style={{ color: accent }} />
              {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 flex items-center gap-1.5">
              <Linkedin className="w-3 h-3" style={{ color: accent }} />
              {personalInfo.linkedin}
            </span>
          )}
        </div>
      </div>
    </header>
  );

  const renderSectionHeading = (title) => (
    <h2 className="text-sm font-black tracking-wide text-gray-900 mb-3 flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
      {title}
    </h2>
  );

  const sections = {
    summary: visibility.summary !== false && summary ? (
      <section key="summary" className="mb-5">
        <p className="text-gray-800 text-xs leading-relaxed pl-4 border-l-2" style={{ borderColor: accent }}>
          {summary}
        </p>
      </section>
    ) : null,

    experience: visibility.experience !== false && experience?.length > 0 ? (
      <section key="experience" className="mb-5">
        {renderSectionHeading("Experience & Selected Roles")}
        <div className="space-y-4">
          {experience.map((item) => (
            <div key={item.id} className="text-xs">
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-gray-950 text-sm">
                  {item.position} <span className="font-medium" style={{ color: accent }}>— {item.company}</span>
                </div>
                <span className="text-xs font-medium text-gray-500">
                  {formatDate(item.startDate)} – {item.current ? "Present" : formatDate(item.endDate)}
                </span>
              </div>
              {item.location && <div className="text-gray-500 italic mb-1">{item.location}</div>}
              {item.responsibilities?.length > 0 && (
                <ul className={bulletClass}>
                  {item.responsibilities.filter(Boolean).map((resp, i) => (
                    <li key={i} className="text-gray-700 leading-relaxed">{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    projects: visibility.projects !== false && projects?.length > 0 ? (
      <section key="projects" className="mb-5">
        {renderSectionHeading("Featured Creative Work & Case Studies")}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-3 rounded-lg border text-xs flex flex-col justify-between"
              style={{
                borderColor: `color-mix(in srgb, ${accent} 25%, #e2e8f0)`,
                backgroundColor: `color-mix(in srgb, ${accent} 3%, #ffffff)`,
              }}
            >
              <div>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-gray-900 text-xs">{proj.name}</span>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                {proj.role && <div className="text-gray-500 text-[11px] mb-1">{proj.role}</div>}
                {proj.description && <p className="text-gray-700 text-[11px] leading-normal">{proj.description}</p>}
              </div>
              {proj.technologies && (
                <div className="mt-2 text-[10px] font-mono text-gray-600 truncate">
                  {proj.technologies}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    skills: visibility.skills !== false && skills?.length > 0 ? (
      <section key="skills" className="mb-5">
        {renderSectionHeading("Creative Toolkit & Skills")}
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{
                backgroundColor: `color-mix(in srgb, ${accent} 12%, white)`,
                color: accent,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    education: visibility.education !== false && education?.length > 0 ? (
      <section key="education" className="mb-5">
        {renderSectionHeading("Education & Training")}
        <div className="space-y-2 text-xs">
          {education.map((item) => (
            <div key={item.id} className="flex justify-between items-baseline">
              <div>
                <span className="font-bold text-gray-900">{item.degree} {item.field && `· ${item.field}`}</span>
                <span className="text-gray-600"> — {item.institution}</span>
              </div>
              <span className="text-gray-500">
                {formatDate(item.startDate)} {item.startDate && item.endDate ? "–" : ""} {formatDate(item.endDate)}
              </span>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    certifications: visibility.certifications !== false && certifications?.length > 0 ? (
      <section key="certifications" className="mb-5">
        {renderSectionHeading("Certifications & Honors")}
        <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-gray-800">
          {certifications.map((c) => (
            <div key={c.id}>
              <strong>{c.name}</strong> <span className="text-gray-500">({c.issuer})</span>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    languages: visibility.languages !== false && languages?.length > 0 ? (
      <section key="languages" className="mb-5">
        {renderSectionHeading("Languages")}
        <div className="flex gap-4 text-xs">
          {languages.map((l) => (
            <span key={l.id} className="text-gray-800">
              <strong>{l.name}:</strong> {l.proficiency}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    custom: visibility.custom !== false && customSections?.length > 0 ? (
      <div key="custom">
        {customSections.map((c) => (
          <section key={c.id} className="mb-5">
            {renderSectionHeading(c.title || "Extra Highlights")}
            <ul className={bulletClass}>
              {(c.items || []).map((item, i) => (
                <li key={i} className="text-gray-700 text-xs">{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    ) : null,
  };

  return (
    <div className="resume-template creative-studio">
      {renderHeader()}
      <main>
        {order.map((sectionKey) => sections[sectionKey] || null)}
      </main>
    </div>
  );
}
