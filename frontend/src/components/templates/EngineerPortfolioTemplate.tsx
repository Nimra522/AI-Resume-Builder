import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const EngineerPortfolioTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  const languages = certifications || [];

  const skillChips = skills.length > 0 ? (
    <div className="flex flex-wrap gap-2">
      {skills.map((s, i) => (
        <span key={i} className="px-3 py-1 bg-[#F3EFFD] rounded-md text-[12px] text-[#666666] leading-relaxed">
          {s}
        </span>
      ))}
    </div>
  ) : null;

  return (
    <div className="w-full bg-white text-[#1E2432] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* Header — Name + Summary side by side */}
      <div className="flex justify-between items-start px-8 pt-8 pb-0 gap-6">
        <div className="flex-shrink-0">
          <h1 className="text-[48px] font-bold text-[#1E2432] leading-tight">
            {personalInfo.fullName || 'Full Name'}
          </h1>
          <p className="text-[18px] font-medium text-[#8A63D2] mt-1">
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
        {personalInfo.summary && (
          <p className="text-[14px] text-[#666666] leading-[1.7] max-w-[380px] whitespace-pre-wrap text-right">
            {personalInfo.summary}
          </p>
        )}
      </div>

      {/* Full-width divider */}
      <div className="mx-8 mt-5 h-px bg-[#DDDDDD]" />

      {/* Contact Bar */}
      <div className="mx-8 py-3 flex items-center justify-start gap-8 text-[14px] text-[#666666]">
        {personalInfo.email && (
          <span className="flex items-center gap-2">
            <Mail size={15} className="text-[#8A63D2]" />
            <span className="break-all">{personalInfo.email}</span>
          </span>
        )}
        {personalInfo.phone && (
          <span className="flex items-center gap-2">
            <Phone size={15} className="text-[#8A63D2]" />
            <span dir="ltr">{personalInfo.phone}</span>
          </span>
        )}
        {personalInfo.location && (
          <span className="flex items-center gap-2">
            <MapPin size={15} className="text-[#8A63D2]" />
            <span>{personalInfo.location}</span>
          </span>
        )}
        {personalInfo.linkedin && (
          <span className="flex items-center gap-2">
            <Linkedin size={15} className="text-[#8A63D2]" />
            <span className="break-all">{personalInfo.linkedin}</span>
          </span>
        )}
      </div>

      {/* Divider below contact */}
      <div className="mx-8 h-px bg-[#DDDDDD]" />

      {/* Body — Two columns */}
      <div className="flex px-8 pt-6 pb-8 gap-6">
        {/* LEFT SIDEBAR — 28% */}
        <div className="w-[28%] flex-shrink-0 space-y-6">

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-[18px] font-bold text-[#1E2432] uppercase tracking-[0.03em] mb-3">Skills</h2>
              {skillChips}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-[18px] font-bold text-[#1E2432] uppercase tracking-[0.03em] mb-3">Education</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[15px] font-bold text-[#1E2432]">{edu.degree}</p>
                    <p className="text-[14px] text-[#666666]">{edu.school}</p>
                    {edu.graduationDate && (
                      <p className="text-[14px] text-[#666666]">{edu.graduationDate}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-[18px] font-bold text-[#1E2432] uppercase tracking-[0.03em] mb-3">Certification</h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-[14px] font-semibold text-[#1E2432]">{cert.name}</p>
                    <p className="text-[13px] text-[#666666]">{cert.issuer}</p>
                    <p className="text-[13px] text-[#8A63D2]">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-[18px] font-bold text-[#1E2432] uppercase tracking-[0.03em] mb-3">Languages</h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <p key={lang.id} className="text-[14px] text-[#666666]">
                    {lang.name}{lang.issuer ? ` (${lang.issuer})` : ''}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — 72% */}
        <div className="flex-1 space-y-7">

          {/* Work Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-[18px] font-bold text-[#1E2432] uppercase tracking-[0.03em] mb-4">Work Experience</h2>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-[18px] font-bold text-[#1E2432]">{exp.role}</p>
                        <p className="text-[14px] text-[#8A63D2] font-medium">{exp.company}</p>
                        {exp.description && exp.description.includes('|') && (
                          <p className="text-[14px] text-[#666666]">{exp.description.split('|')[0]}</p>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-block px-3 py-1 bg-[#F3EFFD] text-[#8A63D2] text-[13px] font-medium rounded-md whitespace-nowrap">
                          {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ' '}{exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                    </div>
                    {exp.description && (
                      <ul className="mt-2 space-y-0.5">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => {
                          const content = line.includes('|') ? line.split('|').slice(1).join('|').trim() : line;
                          if (!content) return null;
                          return (
                            <li key={i} className="flex items-start gap-2 text-[14px] text-[#666666] leading-[1.6]">
                              <span className="flex-shrink-0 text-[#1E2432] text-[16px] leading-none mt-0.5">&#x2022;</span>
                              <span>{content}</span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-[18px] font-bold text-[#1E2432] uppercase tracking-[0.03em] mb-4">Featured Projects</h2>
              <div className="grid grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="border border-[#DDDDDD] rounded-md p-4">
                    <p className="text-[15px] font-bold text-[#1E2432] mb-2">{proj.name}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {proj.description && proj.description.split('\n')[0]?.split(',').map((tag, ti) => (
                        <span key={ti} className="px-2 py-0.5 bg-[#F3EFFD] rounded-md text-[11px] text-[#666666]">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                    <p className="text-[13px] text-[#666666] leading-[1.5]">
                      {proj.description ? proj.description.split('\n').slice(1).join('\n') : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(EngineerPortfolioTemplate);
