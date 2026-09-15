import React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, GraduationCap } from "lucide-react";
import { formatDate, getBulletClass } from "./templateUtils";

export default function SplitSidebar({ data, customization }) {
  const { personalInfo = {}, summary, experience = [], education = [], projects = [], skills = [], certifications = [], languages = [], customSections = [] } = data;
  const accent = customization?.color || "#087f5b";
  const bulletClass = getBulletClass(customization?.bulletStyle);
  const visibility = customization?.sectionVisibility || {};

  return (
    <div className="resume-template split-sidebar flex min-h-[1050px] -m-11">
      {/* Left Sidebar */}
      <aside
        className="w-1/3 p-8 flex flex-col justify-between shrink-0"
        style={{
          backgroundColor: `color-mix(in srgb, ${accent} 7%, #f8fafc)`,
          borderRight: `1px solid color-mix(in srgb, ${accent} 18%, #e2e8f0)`,
        }}
      >
        <div className="space-y-6">
          {/* Avatar / Monogram */}
          <div className="text-center">
            {personalInfo.showPhoto && personalInfo.photoUrl ? (
              <img
                src={personalInfo.photoUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 shadow-sm mb-3"
                style={{ borderColor: accent }}
              />
            ) : (
              <div
                className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center font-bold text-2xl text-white shadow-md mb-3"
                style={{ backgroundColor: accent }}
              >
                {(personalInfo.firstName?.[0] || "") + (personalInfo.lastName?.[0] || "")}
              </div>
            )}
            <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
              {personalInfo.firstName} {personalInfo.lastName}
            </h2>
            <p className="text-xs font-semibold uppercase tracking-wider mt-1 text-gray-600">
              {personalInfo.title}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-xs text-gray-700 pt-2 border-t border-gray-200">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                <span className="truncate">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                <span className="truncate">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                <span className="truncate">{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                <span className="truncate">{personalInfo.github}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {visibility.skills !== false && skills?.length > 0 && (
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2.5 pb-1 border-b" style={{ borderColor: accent }}>
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded font-medium text-gray-800 bg-white border border-gray-200 shadow-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {visibility.education !== false && education?.length > 0 && (
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2.5 pb-1 border-b" style={{ borderColor: accent }}>
                Education
              </h3>
              <div className="space-y-3">
                {education.map((item) => (
                  <div key={item.id} className="text-xs">
                    <div className="font-bold text-gray-900 leading-snug">
                      {item.degree} {item.field && `in ${item.field}`}
                    </div>
                    <div className="text-gray-600 font-medium mt-0.5">{item.institution}</div>
                    <div className="text-gray-500 text-[11px] mt-0.5">
                      {formatDate(item.startDate)} {item.startDate && item.endDate ? "–" : ""} {formatDate(item.endDate)}
                    </div>
                    {item.gpa && <div className="text-gray-500 text-[11px]">GPA: {item.gpa}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {visibility.languages !== false && languages?.length > 0 && (
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2 pb-1 border-b" style={{ borderColor: accent }}>
                Languages
              </h3>
              <div className="space-y-1 text-xs">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span className="font-medium text-gray-900">{l.name}</span>
                    <span className="text-gray-500 text-[11px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {visibility.certifications !== false && certifications?.length > 0 && (
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2 pb-1 border-b" style={{ borderColor: accent }}>
                Certifications
              </h3>
              <div className="space-y-2 text-xs">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <div className="font-semibold text-gray-900">{c.name}</div>
                    <div className="text-gray-500 text-[11px]">{c.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="w-2/3 p-8 space-y-6">
        {/* Summary */}
        {visibility.summary !== false && summary && (
          <section>
            <h3
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ borderColor: accent, color: accent }}
            >
              Career Overview
            </h3>
            <p className="text-gray-700 text-xs leading-relaxed text-justify">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {visibility.experience !== false && experience?.length > 0 && (
          <section>
            <h3
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2"
              style={{ borderColor: accent, color: accent }}
            >
              Work Experience
            </h3>
            <div className="space-y-4">
              {experience.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-gray-900 text-sm">{item.position}</h4>
                    <span className="text-xs font-medium text-gray-500">
                      {formatDate(item.startDate)} – {item.current ? "Present" : formatDate(item.endDate)}
                    </span>
                  </div>
                  <div className="text-xs font-semibold" style={{ color: accent }}>
                    {item.company} {item.location && <span className="font-normal text-gray-500">· {item.location}</span>}
                  </div>
                  {item.responsibilities?.length > 0 && (
                    <ul className={bulletClass}>
                      {item.responsibilities.filter(Boolean).map((resp, i) => (
                        <li key={i} className="text-xs text-gray-700 leading-relaxed">{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {visibility.projects !== false && projects?.length > 0 && (
          <section>
            <h3
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2"
              style={{ borderColor: accent, color: accent }}
            >
              Featured Projects
            </h3>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-gray-900">{proj.name}</strong>
                    {proj.technologies && (
                      <span className="text-[11px] font-mono text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                        {proj.technologies}
                      </span>
                    )}
                  </div>
                  {proj.description && <p className="text-gray-700 mt-1 leading-relaxed">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {visibility.custom !== false && customSections?.length > 0 && (
          <div>
            {customSections.map((c) => (
              <section key={c.id} className="mt-4">
                <h3
                  className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
                  style={{ borderColor: accent, color: accent }}
                >
                  {c.title}
                </h3>
                <ul className={bulletClass}>
                  {(c.items || []).map((item, i) => (
                    <li key={i} className="text-xs text-gray-700 leading-normal">{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
