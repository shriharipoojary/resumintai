import React from 'react';
import { ResumeData } from '@/lib/types';

interface TemplateProps {
  data: ResumeData;
}

export function MinimalTemplate({ data }: TemplateProps) {
  const { personalInfo, education, skills, experience, projects, certifications, achievements } = data;
  
  return (
    <div className="resume-page bg-white text-gray-900 p-8 sm:p-10 font-sans" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-2xl font-bold tracking-wide uppercase text-gray-900">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-sm text-gray-600 mt-1">{personalInfo.title}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Summary</h2>
          <p className="text-xs leading-relaxed text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-semibold text-gray-800">{exp.position}</h3>
                <span className="text-xs text-gray-500">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-xs text-gray-600 italic">{exp.company}</p>
              {exp.description && (
                <p className="text-xs text-gray-700 mt-1 leading-relaxed">{exp.description}</p>
              )}
              {exp.highlights.length > 0 && (
                <ul className="mt-1 space-y-0.5">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-semibold text-gray-800">{edu.degree} in {edu.field}</h3>
                <span className="text-xs text-gray-500">{edu.startDate} — {edu.endDate}</span>
              </div>
              <p className="text-xs text-gray-600">{edu.institution} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Skills</h2>
          <p className="text-xs text-gray-700">{skills.join(' • ')}</p>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              <h3 className="text-sm font-semibold text-gray-800">{proj.name}</h3>
              <p className="text-xs text-gray-700 leading-relaxed">{proj.description}</p>
              {proj.technologies.length > 0 && (
                <p className="text-xs text-gray-500 mt-0.5">Tech: {proj.technologies.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-1">
              <span className="text-xs font-medium text-gray-800">{cert.name}</span>
              <span className="text-xs text-gray-500"> — {cert.issuer} ({cert.date})</span>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Achievements</h2>
          {achievements.map((ach) => (
            <div key={ach.id} className="mb-1">
              <span className="text-xs font-medium text-gray-800">{ach.title}</span>
              {ach.description && <span className="text-xs text-gray-600"> — {ach.description}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function CorporateTemplate({ data }: TemplateProps) {
  const { personalInfo, education, skills, experience, projects, certifications, achievements } = data;
  
  return (
    <div className="resume-page bg-white text-gray-900" style={{ fontFamily: 'Calibri, Arial, sans-serif' }}>
      {/* Header */}
      <div className="bg-slate-800 text-white px-8 py-6">
        <h1 className="text-2xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-blue-300 text-sm mt-1">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-slate-300">
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>☎ {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-slate-800 uppercase border-b-2 border-blue-500 pb-1 mb-2">Professional Summary</h2>
            <p className="text-xs leading-relaxed text-gray-700">{personalInfo.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-5">
            {/* Experience */}
            {experience.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase border-b-2 border-blue-500 pb-1 mb-3">Work Experience</h2>
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <h3 className="text-sm font-bold text-slate-800">{exp.position}</h3>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className="text-blue-600 font-medium">{exp.company}</span>
                      <span>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    {exp.description && <p className="text-xs text-gray-700 mt-1">{exp.description}</p>}
                    {exp.highlights.length > 0 && (
                      <ul className="mt-1.5 space-y-1">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                            <span className="text-blue-500 mt-0.5">▸</span>{h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase border-b-2 border-blue-500 pb-1 mb-3">Projects</h2>
                {projects.map((proj) => (
                  <div key={proj.id} className="mb-3">
                    <h3 className="text-sm font-semibold text-slate-800">{proj.name}</h3>
                    <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                    {proj.technologies.length > 0 && (
                      <p className="text-xs text-blue-600 mt-0.5">{proj.technologies.join(' | ')}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-5">
            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase border-b-2 border-blue-500 pb-1 mb-2">Skills</h2>
                <div className="space-y-1">
                  {skills.map((skill) => (
                    <div key={skill} className="text-xs text-gray-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase border-b-2 border-blue-500 pb-1 mb-2">Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <h3 className="text-xs font-semibold text-slate-800">{edu.degree}</h3>
                    <p className="text-xs text-gray-600">{edu.field}</p>
                    <p className="text-xs text-gray-500">{edu.institution}</p>
                    <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase border-b-2 border-blue-500 pb-1 mb-2">Certifications</h2>
                {certifications.map((cert) => (
                  <div key={cert.id} className="mb-1.5">
                    <p className="text-xs font-medium text-gray-800">{cert.name}</p>
                    <p className="text-xs text-gray-500">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase border-b-2 border-blue-500 pb-1 mb-2">Achievements</h2>
                {achievements.map((ach) => (
                  <div key={ach.id} className="mb-1.5">
                    <p className="text-xs font-medium text-gray-800">{ach.title}</p>
                    {ach.description && <p className="text-xs text-gray-500">{ach.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CreativeTemplate({ data }: TemplateProps) {
  const { personalInfo, education, skills, experience, projects, certifications, achievements } = data;
  
  return (
    <div className="resume-page bg-white" style={{ fontFamily: 'Verdana, sans-serif' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 text-white px-8 py-8">
        <h1 className="text-3xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-pink-100 text-base mt-1 font-light">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-3 mt-4">
          {personalInfo.email && (
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{personalInfo.location}</span>
          )}
          {personalInfo.website && (
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{personalInfo.website}</span>
          )}
        </div>
      </div>

      <div className="px-8 py-6 space-y-5">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
            <p className="text-xs leading-relaxed text-gray-700 italic">{personalInfo.summary}</p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-purple-700 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center text-xs">⚡</span>
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span key={skill} className="text-xs px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-purple-700 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center text-xs">💼</span>
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 pl-4 border-l-2 border-purple-200">
                <h3 className="text-sm font-bold text-gray-800">{exp.position}</h3>
                <p className="text-xs text-purple-600 font-medium">{exp.company} • {exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
                {exp.description && <p className="text-xs text-gray-700 mt-1">{exp.description}</p>}
                {exp.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                        <span className="text-pink-500">◆</span>{h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-purple-700 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center text-xs">🎓</span>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2 pl-4 border-l-2 border-pink-200">
                <h3 className="text-xs font-bold text-gray-800">{edu.degree} in {edu.field}</h3>
                <p className="text-xs text-gray-600">{edu.institution} • {edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-purple-700 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center text-xs">🚀</span>
              Projects
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3">
                  <h3 className="text-xs font-bold text-gray-800">{proj.name}</h3>
                  <p className="text-xs text-gray-600 mt-0.5">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {proj.technologies.map((t) => (
                        <span key={t} className="text-xs bg-white/80 px-1.5 py-0.5 rounded text-purple-600">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Achievements */}
        <div className="grid grid-cols-2 gap-4">
          {certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-purple-700 mb-2">📜 Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-1.5">
                  <p className="text-xs font-medium text-gray-800">{cert.name}</p>
                  <p className="text-xs text-gray-500">{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}
          {achievements.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-purple-700 mb-2">🏆 Achievements</h2>
              {achievements.map((ach) => (
                <div key={ach.id} className="mb-1.5">
                  <p className="text-xs font-medium text-gray-800">{ach.title}</p>
                  {ach.description && <p className="text-xs text-gray-500">{ach.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function TechTemplate({ data }: TemplateProps) {
  const { personalInfo, education, skills, experience, projects, certifications, achievements } = data;
  
  return (
    <div className="resume-page bg-slate-950 text-slate-200" style={{ fontFamily: 'Consolas, Monaco, monospace' }}>
      {/* Header */}
      <div className="px-8 py-6 border-b border-emerald-500/30">
        <div className="flex items-center gap-2 text-emerald-400 text-xs mb-2 font-mono">
          <span className="text-slate-500">$</span> cat resume.json
        </div>
        <h1 className="text-2xl font-bold text-emerald-400">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-sm text-slate-400 mt-1 font-mono">{`// ${personalInfo.title || 'Software Developer'}`}</p>
        <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-400 font-mono">
          {personalInfo.email && <span className="text-cyan-400">{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.github && <span className="text-purple-400">{personalInfo.github}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      <div className="px-8 py-6 space-y-5">
        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <h2 className="text-xs font-bold text-emerald-400 mb-1.5 font-mono">{`> README.md`}</h2>
            <p className="text-xs leading-relaxed text-slate-300 bg-slate-900 rounded-lg p-3 border border-slate-800 font-mono">{personalInfo.summary}</p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-emerald-400 mb-2 font-mono">{`> tech_stack`}</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span key={skill} className="text-xs px-2.5 py-1 bg-slate-900 text-cyan-400 rounded border border-slate-700 font-mono">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-emerald-400 mb-3 font-mono">{`> work_experience`}</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 bg-slate-900 rounded-lg p-4 border border-slate-800">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">{exp.position}</h3>
                    <p className="text-xs text-emerald-400 font-mono">@{exp.company}</p>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{exp.startDate} → {exp.current ? 'now' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-xs text-slate-300 mt-2 font-mono">{exp.description}</p>}
                {exp.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-slate-300 font-mono flex items-start gap-1.5">
                        <span className="text-emerald-500">→</span>{h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-emerald-400 mb-2 font-mono">{`> projects`}</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 bg-slate-900 rounded-lg p-3 border border-slate-800">
                <h3 className="text-xs font-bold text-yellow-400 font-mono">{proj.name}</h3>
                <p className="text-xs text-slate-300 mt-1 font-mono">{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {proj.technologies.map((t) => (
                      <span key={t} className="text-xs text-emerald-400 font-mono">{`[${t}]`}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-emerald-400 mb-2 font-mono">{`> education`}</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2 font-mono">
                <p className="text-xs text-slate-200">{edu.degree} in {edu.field}</p>
                <p className="text-xs text-slate-400">{edu.institution} | {edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications & Achievements */}
        <div className="grid grid-cols-2 gap-4">
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-emerald-400 mb-2 font-mono">{`> certs`}</h2>
              {certifications.map((cert) => (
                <p key={cert.id} className="text-xs text-slate-300 mb-1 font-mono">• {cert.name}</p>
              ))}
            </div>
          )}
          {achievements.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-emerald-400 mb-2 font-mono">{`> achievements`}</h2>
              {achievements.map((ach) => (
                <p key={ach.id} className="text-xs text-slate-300 mb-1 font-mono">★ {ach.title}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ExecutiveTemplate({ data }: TemplateProps) {
  const { personalInfo, education, skills, experience, projects, certifications, achievements } = data;
  
  return (
    <div className="resume-page bg-white" style={{ fontFamily: 'Garamond, Times New Roman, serif' }}>
      {/* Header */}
      <div className="px-10 pt-8 pb-6">
        <div className="flex items-end justify-between border-b-2 border-amber-600 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-base text-amber-700 mt-1 italic">{personalInfo.title}</p>
          </div>
          <div className="text-right text-xs text-slate-600 space-y-0.5">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
            {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
          </div>
        </div>
      </div>

      <div className="px-10 pb-8 space-y-5">
        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-amber-300 pb-1 mb-2">
              Executive Summary
            </h2>
            <p className="text-xs leading-relaxed text-slate-700 italic">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-amber-300 pb-1 mb-3">
              Professional Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-slate-800">{exp.position}</h3>
                  <span className="text-xs text-slate-500 italic">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs text-amber-700 font-semibold">{exp.company}</p>
                {exp.description && <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">{exp.description}</p>}
                {exp.highlights.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-slate-700 pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-amber-600">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-5">
            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-amber-300 pb-1 mb-2">Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <h3 className="text-xs font-bold text-slate-800">{edu.degree} — {edu.field}</h3>
                    <p className="text-xs text-slate-600">{edu.institution}</p>
                    <p className="text-xs text-slate-400 italic">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-amber-300 pb-1 mb-2">Key Projects</h2>
                {projects.map((proj) => (
                  <div key={proj.id} className="mb-2">
                    <h3 className="text-xs font-bold text-slate-800">{proj.name}</h3>
                    <p className="text-xs text-slate-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-5">
            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-amber-300 pb-1 mb-2">Core Competencies</h2>
                <div className="grid grid-cols-2 gap-1">
                  {skills.map((skill) => (
                    <div key={skill} className="text-xs text-slate-700 flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-amber-500 rounded-full" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-amber-300 pb-1 mb-2">Certifications</h2>
                {certifications.map((cert) => (
                  <p key={cert.id} className="text-xs text-slate-700 mb-1">{cert.name} — {cert.issuer}</p>
                ))}
              </div>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-amber-300 pb-1 mb-2">Awards & Honors</h2>
                {achievements.map((ach) => (
                  <p key={ach.id} className="text-xs text-slate-700 mb-1">✦ {ach.title}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
