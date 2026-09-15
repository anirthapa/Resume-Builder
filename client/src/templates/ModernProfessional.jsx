import React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Award } from "lucide-react";
import { formatDate, getHeadingClass, getBulletClass } from "./templateUtils";

export default function ModernProfessional({ data, customization }) {
  const { personalInfo = {}, summary, experience = [], education = [], projects = [], skills = [], certifications = [], languages = [], customSections = [] } = data;
  const accent = customization?.color || "#2563eb";
  const bulletClass = getBulletClass(customization?.bulletStyle);
  const headingClass = getHeadingClass(customization?.headingStyle);
  const visibility = customization?.sectionVisibility || {};
  const order = customization?.sectionOrder || ["summary", "experience", "education", "projects", "skills", "certifications", "languages", "custom"];

  const renderHeader = () => (
    <header className="mb-6 pb-5 border-b-2" style={{ borderColor: accent }}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          {personalInfo.showPhoto && personalInfo.photoUrl ? (
            <img
              src={personalInfo.photoUrl}
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-20 h-20 rounded-full object-cover border-2 shadow-sm"
              style={{ borderColor: accent }}
            />
          ) : null}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">
              {personalInfo.firstName || "Your"} <span style={{ color: accent }}>{personalInfo.lastName || "Name"}</span>
            </h1>
            <p className="text-base font-semibold tracking-wide text-gray-600 mt-0.5">
              {personalInfo.title || "Professional Title"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap md:justify-end gap-x-4 gap-y-1.5 text-xs text-gray-600">
          {personalInfo.email && (
            <span className="inline-flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="inline-flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="inline-flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.website}
            </span>
          )}
          {personalInfo.github && (
            <span className="inline-flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.github}
            </span>
          )}
        </div>
      </div>
    </header>
  );

  const renderSectionHeading = (title) => (
    <h2
      className={`text-sm font-bold uppercase tracking-wider text-gray-900 mt-5 ${headingClass}`}
      style={{ color: customization?.headingStyle === "badge" ? accent : "#111827" }}
    >
      {title}
    </h2>
  );

  const sections = {
    summary: visibility.summary !== false && summary ? (
      <section key="summary" className="mb-4">
        {renderSectionHeading("Professional Summary")}
        <p className="text-gray-700 leading-relaxed text-justify">{summary}</p>
      </section>
    ) : null,

    experience: visibility.experience !== false && experience?.length > 0 ? (
      <section key="experience" className="mb-4">
        {renderSectionHeading("Work Experience")}
        <div className="space-y-4">
          {experience.map((item) => (
            <div key={item.id} className="text-gray-800">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="font-bold text-gray-900 text-sm">
                  {item.position || "Job Title"}{" "}
                  <span className="font-semibold" style={{ color: accent }}>
                    @ {item.company || "Company"}
                  </span>
                </div>
                <div className="text-xs font-medium text-gray-500">
                  {formatDate(item.startDate)} – {item.current ? "Present" : formatDate(item.endDate)}
                </div>
              </div>
              {item.location && <p className="text-xs text-gray-500 italic mt-0.5">{item.location}</p>}
              {item.responsibilities?.length > 0 && (
                <ul className={bulletClass}>
                  {item.responsibilities.filter(Boolean).map((resp, i) => (
                    <li key={i} className="text-gray-700 leading-normal">{resp}</li>
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
        <div className="space-y-3">
          {education.map((item) => (
            <div key={item.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="font-bold text-gray-900 text-sm">
                  {item.degree || "Degree"}{item.field ? ` in ${item.field}` : ""}
                </div>
                <div className="text-xs font-medium text-gray-500">
                  {formatDate(item.startDate)} {item.startDate && item.endDate ? "–" : ""} {formatDate(item.endDate)}
                </div>
              </div>
              <div className="text-xs font-semibold text-gray-700 mt-0.5" style={{ color: accent }}>
                {item.institution || "Institution"}
              </div>
              {item.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {item.gpa}</p>}
              {item.honors && <p className="text-xs text-gray-500 italic">{item.honors}</p>}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    projects: visibility.projects !== false && projects?.length > 0 ? (
      <section key="projects" className="mb-4">
        {renderSectionHeading("Featured Projects")}
        <div className="space-y-3">
          {projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                  {proj.name || "Project Name"}
                  {proj.role && <span className="font-normal text-xs text-gray-500">({proj.role})</span>}
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs font-medium hover:underline inline-flex items-center gap-0.5" style={{ color: accent }}>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                    {proj.technologies}
                  </span>
                )}
              </div>
              {proj.description && <p className="text-xs text-gray-700 mt-1 leading-relaxed">{proj.description}</p>}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    skills: visibility.skills !== false && skills?.length > 0 ? (
      <section key="skills" className="mb-4">
        {renderSectionHeading("Skills & Expertise")}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-md font-medium border"
              style={{
                backgroundColor: `color-mix(in srgb, ${accent} 8%, white)`,
                borderColor: `color-mix(in srgb, ${accent} 25%, transparent)`,
                color: accent,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    ) : null,

    certifications: visibility.certifications !== false && certifications?.length > 0 ? (
      <section key="certifications" className="mb-4">
        {renderSectionHeading("Certifications")}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex items-start gap-2 text-xs">
              <Award className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: accent }} />
              <div>
                <strong className="text-gray-900">{cert.name}</strong>
                <p className="text-gray-500">{cert.issuer} {cert.date && `• ${formatDate(cert.date)}`}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    languages: visibility.languages !== false && languages?.length > 0 ? (
      <section key="languages" className="mb-4">
        {renderSectionHeading("Languages")}
        <div className="flex flex-wrap gap-4 text-xs mt-1">
          {languages.map((lang) => (
            <div key={lang.id} className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-900">{lang.name}:</span>
              <span className="text-gray-600">{lang.proficiency}</span>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    custom: visibility.custom !== false && customSections?.length > 0 ? (
      <div key="custom">
        {customSections.map((c) => (
          <section key={c.id} className="mb-4">
            {renderSectionHeading(c.title || "Additional Information")}
            <ul className={bulletClass}>
              {(c.items || []).map((item, i) => (
                <li key={i} className="text-gray-700 leading-normal">{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    ) : null,
  };

  return (
    <div className="resume-template modern-professional">
      {renderHeader()}
      <main>
        {order.map((sectionKey) => sections[sectionKey] || null)}
      </main>
    </div>
  );
}
