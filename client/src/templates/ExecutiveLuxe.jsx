import React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";
import { formatDate, getBulletClass } from "./templateUtils";

export default function ExecutiveLuxe({ data, customization }) {
  const { personalInfo = {}, summary, experience = [], education = [], projects = [], skills = [], certifications = [], languages = [], customSections = [] } = data;
  const accent = customization?.color || "#1e3a8a";
  const bulletClass = getBulletClass(customization?.bulletStyle);
  const visibility = customization?.sectionVisibility || {};
  const order = customization?.sectionOrder || ["summary", "experience", "education", "projects", "skills", "certifications", "languages", "custom"];

  const renderHeader = () => (
    <header className="text-center pb-5 mb-6 border-b-4 border-double" style={{ borderColor: accent }}>
      <h1 className="text-3xl font-serif font-bold tracking-wider text-gray-900 uppercase mb-1">
        {personalInfo.firstName} {personalInfo.lastName}
      </h1>
      <p className="text-xs font-serif font-semibold tracking-widest uppercase text-gray-600 mb-3" style={{ color: accent }}>
        {personalInfo.title || "Executive Director"}
      </p>

      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-gray-600 font-serif">
        {personalInfo.location && (
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3 h-3" style={{ color: accent }} />
            {personalInfo.location}
          </span>
        )}
        {personalInfo.phone && (
          <span className="inline-flex items-center gap-1">
            <Phone className="w-3 h-3" style={{ color: accent }} />
            {personalInfo.phone}
          </span>
        )}
        {personalInfo.email && (
          <span className="inline-flex items-center gap-1">
            <Mail className="w-3 h-3" style={{ color: accent }} />
            {personalInfo.email}
          </span>
        )}
        {personalInfo.linkedin && (
          <span className="inline-flex items-center gap-1">
            <Linkedin className="w-3 h-3" style={{ color: accent }} />
            {personalInfo.linkedin}
          </span>
        )}
        {personalInfo.website && (
          <span className="inline-flex items-center gap-1">
            <Globe className="w-3 h-3" style={{ color: accent }} />
            {personalInfo.website}
          </span>
        )}
      </div>
    </header>
  );

  const renderSectionHeading = (title) => (
    <div className="flex items-center gap-3 my-4">
      <h2 className="text-xs font-serif font-bold uppercase tracking-widest text-gray-900 whitespace-nowrap" style={{ color: accent }}>
        {title}
      </h2>
      <div className="h-px bg-gray-300 w-full" />
    </div>
  );

  const sections = {
    summary: visibility.summary !== false && summary ? (
      <section key="summary" className="mb-4">
        {renderSectionHeading("Executive Profile")}
        <div
          className="p-3.5 rounded-sm border-l-4 text-xs font-serif leading-relaxed text-gray-800 italic"
          style={{
            borderColor: accent,
            backgroundColor: `color-mix(in srgb, ${accent} 5%, #fafafa)`,
          }}
        >
          {summary}
        </div>
      </section>
    ) : null,

    experience: visibility.experience !== false && experience?.length > 0 ? (
      <section key="experience" className="mb-4">
        {renderSectionHeading("Executive Experience & Leadership")}
        <div className="space-y-4">
          {experience.map((item) => (
            <div key={item.id} className="text-xs">
              <div className="flex justify-between items-baseline">
                <div className="font-serif font-bold text-gray-900 text-sm">
                  {item.position}{" "}
                  <span className="font-normal text-gray-600">| {item.company}</span>
                </div>
                <div className="font-serif text-gray-600 font-medium">
                  {formatDate(item.startDate)} – {item.current ? "Present" : formatDate(item.endDate)}
                </div>
              </div>
              {item.location && <div className="text-gray-500 italic mt-0.5">{item.location}</div>}
              {item.responsibilities?.length > 0 && (
                <ul className={`${bulletClass} mt-1.5`}>
                  {item.responsibilities.filter(Boolean).map((resp, i) => (
                    <li key={i} className="text-gray-700 leading-relaxed font-serif">{resp}</li>
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
        {renderSectionHeading("Education & Credentials")}
        <div className="space-y-2">
          {education.map((item) => (
            <div key={item.id} className="flex justify-between items-start text-xs font-serif">
              <div>
                <span className="font-bold text-gray-900">{item.degree} {item.field && `in ${item.field}`}</span>
                <div className="text-gray-600">{item.institution} {item.gpa && `• GPA: ${item.gpa}`}</div>
                {item.honors && <div className="text-gray-500 italic">{item.honors}</div>}
              </div>
              <div className="text-gray-500 whitespace-nowrap">
                {formatDate(item.startDate)} {item.startDate && item.endDate ? "–" : ""} {formatDate(item.endDate)}
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    projects: visibility.projects !== false && projects?.length > 0 ? (
      <section key="projects" className="mb-4">
        {renderSectionHeading("Key Initiatives & Transformations")}
        <div className="space-y-2.5">
          {projects.map((proj) => (
            <div key={proj.id} className="text-xs font-serif">
              <div className="flex justify-between font-bold text-gray-900">
                <span>{proj.name} {proj.role && <span className="font-normal text-gray-600">({proj.role})</span>}</span>
                {proj.technologies && <span className="font-normal text-gray-500 text-[11px]">{proj.technologies}</span>}
              </div>
              {proj.description && <p className="text-gray-700 mt-0.5 leading-relaxed">{proj.description}</p>}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    skills: visibility.skills !== false && skills?.length > 0 ? (
      <section key="skills" className="mb-4">
        {renderSectionHeading("Areas of Expertise")}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-1.5 gap-x-4 text-xs font-serif text-gray-800">
          {skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    certifications: visibility.certifications !== false && certifications?.length > 0 ? (
      <section key="certifications" className="mb-4">
        {renderSectionHeading("Professional Board & Certifications")}
        <div className="space-y-1 text-xs font-serif">
          {certifications.map((c) => (
            <div key={c.id} className="flex justify-between">
              <strong className="text-gray-900">{c.name}</strong>
              <span className="text-gray-600">{c.issuer} {c.date && `(${formatDate(c.date)})`}</span>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    languages: visibility.languages !== false && languages?.length > 0 ? (
      <section key="languages" className="mb-4">
        {renderSectionHeading("Languages")}
        <p className="text-xs font-serif text-gray-800">
          {languages.map((l) => `${l.name} (${l.proficiency})`).join("  •  ")}
        </p>
      </section>
    ) : null,

    custom: visibility.custom !== false && customSections?.length > 0 ? (
      <div key="custom">
        {customSections.map((c) => (
          <section key={c.id} className="mb-4">
            {renderSectionHeading(c.title || "Additional Honors & Affiliations")}
            <ul className={`${bulletClass} font-serif`}>
              {(c.items || []).map((item, i) => (
                <li key={i} className="text-xs text-gray-700 leading-normal">{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    ) : null,
  };

  return (
    <div className="resume-template executive-luxe">
      {renderHeader()}
      <main>
        {order.map((sectionKey) => sections[sectionKey] || null)}
      </main>
    </div>
  );
}
