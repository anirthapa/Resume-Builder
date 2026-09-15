import React from "react";
import { Mail, Phone, MapPin, Globe, BookOpen, GraduationCap, Award } from "lucide-react";
import { formatDate, getBulletClass } from "./templateUtils";

export default function AcademicResearch({ data, customization }) {
  const { personalInfo = {}, summary, experience = [], education = [], projects = [], skills = [], certifications = [], languages = [], customSections = [] } = data;
  const accent = customization?.color || "#18324b";
  const bulletClass = getBulletClass(customization?.bulletStyle);
  const visibility = customization?.sectionVisibility || {};
  const order = customization?.sectionOrder || ["summary", "education", "experience", "projects", "skills", "certifications", "languages", "custom"];

  const renderHeader = () => (
    <header className="text-center pb-4 mb-5 border-b" style={{ borderColor: accent }}>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">
        {personalInfo.firstName} {personalInfo.lastName}
      </h1>
      <p className="text-xs font-semibold tracking-wider uppercase text-gray-700 mb-2">
        {personalInfo.title || "Postdoctoral Researcher & Lecturer"}
      </p>

      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-gray-600">
        {personalInfo.location && <span>{personalInfo.location}</span>}
        {personalInfo.email && (
          <span className="inline-flex items-center gap-1">
            <Mail className="w-3 h-3" />
            {personalInfo.email}
          </span>
        )}
        {personalInfo.phone && (
          <span className="inline-flex items-center gap-1">
            <Phone className="w-3 h-3" />
            {personalInfo.phone}
          </span>
        )}
        {personalInfo.website && (
          <span className="inline-flex items-center gap-1">
            <Globe className="w-3 h-3" />
            {personalInfo.website}
          </span>
        )}
      </div>
    </header>
  );

  const renderSectionHeading = (title) => (
    <h2
      className="text-xs font-bold uppercase tracking-widest text-gray-900 mt-4 mb-2 pb-1 border-b"
      style={{ borderColor: accent, color: accent }}
    >
      {title}
    </h2>
  );

  const sections = {
    summary: visibility.summary !== false && summary ? (
      <section key="summary" className="mb-4">
        {renderSectionHeading("Research Profile & Interests")}
        <p className="text-xs text-gray-800 leading-relaxed text-justify">{summary}</p>
      </section>
    ) : null,

    education: visibility.education !== false && education?.length > 0 ? (
      <section key="education" className="mb-4">
        {renderSectionHeading("Education & Academic Background")}
        <div className="space-y-3">
          {education.map((item) => (
            <div key={item.id} className="text-xs">
              <div className="flex justify-between items-baseline">
                <strong className="text-gray-900">{item.degree} {item.field && `in ${item.field}`}</strong>
                <span className="text-gray-600">
                  {formatDate(item.startDate)} {item.startDate && item.endDate ? "–" : ""} {formatDate(item.endDate)}
                </span>
              </div>
              <div className="text-gray-700">{item.institution}</div>
              {item.gpa && <div className="text-gray-500">GPA: {item.gpa}</div>}
              {item.honors && <div className="text-gray-600 italic mt-0.5">{item.honors}</div>}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    experience: visibility.experience !== false && experience?.length > 0 ? (
      <section key="experience" className="mb-4">
        {renderSectionHeading("Academic & Professional Appointments")}
        <div className="space-y-3.5">
          {experience.map((item) => (
            <div key={item.id} className="text-xs">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-gray-900">
                  {item.position}, <span className="font-normal text-gray-700">{item.company}</span>
                </span>
                <span className="text-gray-600">
                  {formatDate(item.startDate)} – {item.current ? "Present" : formatDate(item.endDate)}
                </span>
              </div>
              {item.location && <div className="text-gray-500 italic">{item.location}</div>}
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
        {renderSectionHeading("Publications, Grants & Research Projects")}
        <div className="space-y-2.5">
          {projects.map((proj) => (
            <div key={proj.id} className="text-xs">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-gray-900">"{proj.name}"</span>
                {proj.technologies && <span className="text-gray-500 italic text-[11px]">{proj.technologies}</span>}
              </div>
              {proj.role && <div className="text-gray-600 text-[11px]">{proj.role}</div>}
              {proj.description && <p className="text-gray-700 mt-0.5 leading-relaxed">{proj.description}</p>}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    skills: visibility.skills !== false && skills?.length > 0 ? (
      <section key="skills" className="mb-4">
        {renderSectionHeading("Methodologies & Research Tools")}
        <p className="text-xs text-gray-800 leading-relaxed">
          {skills.join("  •  ")}
        </p>
      </section>
    ) : null,

    certifications: visibility.certifications !== false && certifications?.length > 0 ? (
      <section key="certifications" className="mb-4">
        {renderSectionHeading("Honors, Grants & Certifications")}
        <div className="space-y-1 text-xs">
          {certifications.map((c) => (
            <div key={c.id} className="flex justify-between">
              <span className="font-semibold text-gray-900">{c.name}</span>
              <span className="text-gray-600">{c.issuer} {c.date && `(${formatDate(c.date)})`}</span>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    languages: visibility.languages !== false && languages?.length > 0 ? (
      <section key="languages" className="mb-4">
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
          <section key={c.id} className="mb-4">
            {renderSectionHeading(c.title || "Academic Service & Affiliations")}
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
    <div className="resume-template academic-research max-w-3xl mx-auto">
      {renderHeader()}
      <main>
        {order.map((sectionKey) => sections[sectionKey] || null)}
      </main>
    </div>
  );
}
