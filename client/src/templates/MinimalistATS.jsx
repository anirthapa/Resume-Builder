import React from "react";
import { formatDate, getHeadingClass, getBulletClass } from "./templateUtils";

export default function MinimalistATS({ data, customization }) {
  const { personalInfo = {}, summary, experience = [], education = [], projects = [], skills = [], certifications = [], languages = [], customSections = [] } = data;
  const accent = customization?.color || "#1f2937";
  const bulletClass = getBulletClass(customization?.bulletStyle);
  const headingClass = getHeadingClass(customization?.headingStyle);
  const visibility = customization?.sectionVisibility || {};
  const order = customization?.sectionOrder || ["summary", "experience", "education", "projects", "skills", "certifications", "languages", "custom"];

  const renderHeader = () => (
    <header className="text-center mb-6 pb-4 border-b border-gray-300">
      <h1 className="text-2xl font-bold uppercase tracking-widest text-gray-900 mb-1">
        {personalInfo.firstName || "Your"} {personalInfo.lastName || "Name"}
      </h1>
      <p className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-2" style={{ color: accent }}>
        {personalInfo.title || "Professional Title"}
      </p>

      <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-gray-600">
        {personalInfo.location && <span>{personalInfo.location}</span>}
        {personalInfo.location && personalInfo.phone && <span>•</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.phone && personalInfo.email && <span>•</span>}
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.email && personalInfo.linkedin && <span>•</span>}
        {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        {personalInfo.website && (
          <>
            <span>•</span>
            <span>{personalInfo.website}</span>
          </>
        )}
        {personalInfo.github && (
          <>
            <span>•</span>
            <span>{personalInfo.github}</span>
          </>
        )}
      </div>
    </header>
  );

  const renderSectionHeading = (title) => (
    <h2
      className={`text-xs font-bold uppercase tracking-widest text-gray-900 mt-5 border-b pb-1 ${headingClass}`}
      style={{ borderColor: accent }}
    >
      {title}
    </h2>
  );

  const sections = {
    summary: visibility.summary !== false && summary ? (
      <section key="summary" className="mb-4">
        {renderSectionHeading("Professional Summary")}
        <p className="text-gray-800 leading-relaxed mt-1.5 text-justify">{summary}</p>
      </section>
    ) : null,

    experience: visibility.experience !== false && experience?.length > 0 ? (
      <section key="experience" className="mb-4">
        {renderSectionHeading("Professional Experience")}
        <div className="space-y-4 mt-2">
          {experience.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-gray-900 text-sm">
                  {item.position || "Position"}, <span className="font-semibold">{item.company || "Company"}</span>
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {formatDate(item.startDate)} – {item.current ? "Present" : formatDate(item.endDate)}
                </div>
              </div>
              {item.location && <div className="text-xs text-gray-500 italic mb-1">{item.location}</div>}
              {item.responsibilities?.length > 0 && (
                <ul className={bulletClass}>
                  {item.responsibilities.filter(Boolean).map((resp, i) => (
                    <li key={i} className="text-gray-800 text-xs leading-relaxed">{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    education: visibility.education !== false && education?.length > 0 ? (
      <section key="education" className="mb-4">
        {renderSectionHeading("Education")}
        <div className="space-y-2 mt-2">
          {education.map((item) => (
            <div key={item.id} className="flex justify-between items-start">
              <div>
                <div className="font-bold text-gray-900 text-xs">
                  {item.degree || "Degree"}{item.field ? `, ${item.field}` : ""}
                </div>
                <div className="text-xs text-gray-700">{item.institution}</div>
                {item.gpa && <div className="text-xs text-gray-500">GPA: {item.gpa}</div>}
                {item.honors && <div className="text-xs text-gray-500 italic">{item.honors}</div>}
              </div>
              <div className="text-xs text-gray-600 font-medium whitespace-nowrap">
                {formatDate(item.startDate)} {item.startDate && item.endDate ? "–" : ""} {formatDate(item.endDate)}
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    projects: visibility.projects !== false && projects?.length > 0 ? (
      <section key="projects" className="mb-4">
        {renderSectionHeading("Key Projects")}
        <div className="space-y-2.5 mt-2">
          {projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-gray-900 text-xs">
                  {proj.name} {proj.role && <span className="font-normal text-gray-600">| {proj.role}</span>}
                </div>
                {proj.technologies && (
                  <div className="text-xs text-gray-500 font-mono">[{proj.technologies}]</div>
                )}
              </div>
              {proj.description && <p className="text-xs text-gray-700 mt-0.5 leading-relaxed">{proj.description}</p>}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    skills: visibility.skills !== false && skills?.length > 0 ? (
      <section key="skills" className="mb-4">
        {renderSectionHeading("Core Competencies & Skills")}
        <p className="text-xs text-gray-800 leading-relaxed mt-1.5">
          {skills.join(" • ")}
        </p>
      </section>
    ) : null,

    certifications: visibility.certifications !== false && certifications?.length > 0 ? (
      <section key="certifications" className="mb-4">
        {renderSectionHeading("Certifications & Credentials")}
        <div className="space-y-1.5 mt-2">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex justify-between text-xs">
              <span className="font-semibold text-gray-800">{cert.name} – <span className="font-normal text-gray-600">{cert.issuer}</span></span>
              {cert.date && <span className="text-gray-500">{formatDate(cert.date)}</span>}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    languages: visibility.languages !== false && languages?.length > 0 ? (
      <section key="languages" className="mb-4">
        {renderSectionHeading("Languages")}
        <p className="text-xs text-gray-800 mt-1.5">
          {languages.map((l) => `${l.name} (${l.proficiency})`).join(" • ")}
        </p>
      </section>
    ) : null,

    custom: visibility.custom !== false && customSections?.length > 0 ? (
      <div key="custom">
        {customSections.map((c) => (
          <section key={c.id} className="mb-4">
            {renderSectionHeading(c.title || "Additional Information")}
            <ul className={bulletClass}>
              {(c.items || []).map((item, i) => (
                <li key={i} className="text-gray-800 text-xs leading-normal">{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    ) : null,
  };

  return (
    <div className="resume-template minimalist-ats max-w-3xl mx-auto">
      {renderHeader()}
      <main>
        {order.map((sectionKey) => sections[sectionKey] || null)}
      </main>
    </div>
  );
}
