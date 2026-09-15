import React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";
import { formatDate, getBulletClass } from "./templateUtils";

export default function NordicElegance({ data, customization }) {
  const { personalInfo = {}, summary, experience = [], education = [], projects = [], skills = [], certifications = [], languages = [], customSections = [] } = data;
  const accent = customization?.color || "#475569";
  const bulletClass = getBulletClass(customization?.bulletStyle);
  const visibility = customization?.sectionVisibility || {};
  const order = customization?.sectionOrder || ["summary", "experience", "education", "projects", "skills", "certifications", "languages", "custom"];

  const renderHeader = () => (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b pb-6" style={{ borderColor: `color-mix(in srgb, ${accent} 30%, #e2e8f0)` }}>
        <div>
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-500 block mb-1">
            Curriculum Vitae
          </span>
          <h1 className="text-3xl font-light tracking-tight text-gray-900">
            {personalInfo.firstName} <span className="font-semibold">{personalInfo.lastName}</span>
          </h1>
          <p className="text-xs tracking-wider uppercase font-medium mt-1" style={{ color: accent }}>
            {personalInfo.title}
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-1 text-xs text-gray-500 mt-4 md:mt-0 font-light">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>
    </header>
  );

  const renderSectionHeading = (title) => (
    <h2 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gray-400 mt-6 mb-3">
      {title}
    </h2>
  );

  const sections = {
    summary: visibility.summary !== false && summary ? (
      <section key="summary" className="mb-6">
        {renderSectionHeading("Profile")}
        <p className="text-xs text-gray-700 font-light leading-relaxed max-w-2xl">{summary}</p>
      </section>
    ) : null,

    experience: visibility.experience !== false && experience?.length > 0 ? (
      <section key="experience" className="mb-6">
        {renderSectionHeading("Experience")}
        <div className="space-y-5">
          {experience.map((item) => (
            <div key={item.id} className="text-xs">
              <div className="flex justify-between items-baseline">
                <div className="text-gray-900 font-medium">
                  {item.position} <span className="text-gray-400 font-light">—</span> {item.company}
                </div>
                <div className="text-gray-400 font-light text-[11px]">
                  {formatDate(item.startDate)} — {item.current ? "Present" : formatDate(item.endDate)}
                </div>
              </div>
              {item.location && <div className="text-gray-400 text-[11px] font-light">{item.location}</div>}
              {item.responsibilities?.length > 0 && (
                <ul className={`${bulletClass} mt-1.5`}>
                  {item.responsibilities.filter(Boolean).map((resp, i) => (
                    <li key={i} className="text-gray-600 font-light leading-relaxed text-xs">{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    education: visibility.education !== false && education?.length > 0 ? (
      <section key="education" className="mb-6">
        {renderSectionHeading("Education")}
        <div className="space-y-3">
          {education.map((item) => (
            <div key={item.id} className="text-xs flex justify-between items-baseline">
              <div>
                <span className="font-medium text-gray-900">{item.degree} {item.field && `in ${item.field}`}</span>
                <span className="text-gray-500 font-light">, {item.institution}</span>
                {item.gpa && <span className="text-gray-400 text-[11px]"> (GPA: {item.gpa})</span>}
              </div>
              <span className="text-gray-400 font-light text-[11px]">
                {formatDate(item.startDate)} — {formatDate(item.endDate)}
              </span>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    projects: visibility.projects !== false && projects?.length > 0 ? (
      <section key="projects" className="mb-6">
        {renderSectionHeading("Selected Projects")}
        <div className="space-y-3">
          {projects.map((proj) => (
            <div key={proj.id} className="text-xs">
              <div className="flex justify-between items-baseline">
                <span className="font-medium text-gray-900">{proj.name}</span>
                {proj.technologies && <span className="text-gray-400 text-[11px] font-light">{proj.technologies}</span>}
              </div>
              {proj.description && <p className="text-gray-600 font-light mt-0.5 leading-relaxed">{proj.description}</p>}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    skills: visibility.skills !== false && skills?.length > 0 ? (
      <section key="skills" className="mb-6">
        {renderSectionHeading("Skills & Competencies")}
        <p className="text-xs text-gray-600 font-light leading-relaxed">
          {skills.join("  /  ")}
        </p>
      </section>
    ) : null,

    certifications: visibility.certifications !== false && certifications?.length > 0 ? (
      <section key="certifications" className="mb-6">
        {renderSectionHeading("Certifications")}
        <div className="space-y-1 text-xs">
          {certifications.map((c) => (
            <div key={c.id} className="flex justify-between text-gray-700 font-light">
              <span className="font-medium text-gray-900">{c.name}</span>
              <span className="text-gray-400">{c.issuer}</span>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    languages: visibility.languages !== false && languages?.length > 0 ? (
      <section key="languages" className="mb-6">
        {renderSectionHeading("Languages")}
        <p className="text-xs text-gray-600 font-light">
          {languages.map((l) => `${l.name} (${l.proficiency})`).join("  /  ")}
        </p>
      </section>
    ) : null,

    custom: visibility.custom !== false && customSections?.length > 0 ? (
      <div key="custom">
        {customSections.map((c) => (
          <section key={c.id} className="mb-6">
            {renderSectionHeading(c.title || "Additional Information")}
            <ul className={`${bulletClass} font-light`}>
              {(c.items || []).map((item, i) => (
                <li key={i} className="text-gray-600 text-xs leading-normal">{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    ) : null,
  };

  return (
    <div className="resume-template nordic-elegance">
      {renderHeader()}
      <main>
        {order.map((sectionKey) => sections[sectionKey] || null)}
      </main>
    </div>
  );
}
