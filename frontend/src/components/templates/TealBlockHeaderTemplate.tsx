import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

const TealBlockHeaderTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  const languages = certifications || [];

  return (
    <div className="w-full bg-white text-[#2A2A2A] font-['Inter',sans-serif] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* HEADER */}
      <div className="flex min-h-[180px]">
        {/* Left teal block */}
        <div className="w-[75%] bg-[#084C5A] flex items-center px-8">
          <div>
            <h1 className="text-[58px] font-extrabold text-white uppercase leading-[1.05] tracking-[0.02em]">
              {personalInfo.fullName || 'Full Name'}
            </h1>
            <p className="text-[24px] font-medium text-white mt-1">
              {personalInfo.jobTitle || 'Job Title'}
            </p>
          </div>
        </div>
        {/* Right narrow teal block */}
        <div className="w-[12px] bg-[#084C5A]" />
      </div>

      {/* SUMMARY — Full width */}
      {personalInfo.summary && (
        <div className="px-8 pt-5 pb-4">
          <h2 className="text-[22px] font-bold text-[#084C5A] uppercase tracking-[0.02em] mb-2">Summary</h2>
          <p className="text-[14px] text-[#666666] leading-[1.8] text-justify whitespace-pre-wrap">{personalInfo.summary}</p>
        </div>
      )}

      {/* MAIN CONTENT — Two columns */}
      <div className="flex px-8 pb-8 gap-8">
        {/* LEFT — 34% */}
        <div className="w-[34%] flex-shrink-0 space-y-6">

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-[22px] font-bold text-[#084C5A] uppercase tracking-[0.02em] mb-3">Education</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[14px] font-bold text-[#2A2A2A]">{edu.degree}</p>
                    <p className="text-[14px] text-[#666666]">{edu.school}</p>
                    <p className="text-[14px] text-[#666666]">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-[22px] font-bold text-[#084C5A] uppercase tracking-[0.02em] mb-3">Skills</h2>
              <ul className="space-y-0.5">
                {skills.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] text-[#666666] leading-[1.6]">
                    <span className="flex-shrink-0 text-[#084C5A] text-[16px] leading-none mt-0.5">&#x2022;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-[22px] font-bold text-[#084C5A] uppercase tracking-[0.02em] mb-3">Languages</h2>
              <ul className="space-y-0.5">
                {languages.map((lang) => (
                  <li key={lang.id} className="flex items-start gap-2 text-[14px] text-[#666666] leading-[1.6]">
                    <span className="flex-shrink-0 text-[#084C5A] text-[16px] leading-none mt-0.5">&#x2022;</span>
                    <span>{lang.name}{lang.issuer ? ` (${lang.issuer})` : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT — 66% */}
        <div className="flex-1 flex flex-col space-y-6">

          {/* Work Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-[22px] font-bold text-[#084C5A] uppercase tracking-[0.02em] mb-3">Work Experience</h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <p className="text-[18px] font-bold text-[#2A2A2A]">{exp.role}</p>
                    <p className="text-[16px] text-[#666666]">
                      {exp.company}{exp.company && (exp.startDate || exp.endDate) ? ' | ' : ''}
                      {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && (
                      <ul className="mt-1.5 space-y-0.5">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i} className="flex items-start gap-2 text-[14px] text-[#666666] leading-[1.6]">
                            <span className="flex-shrink-0 text-[#084C5A] text-[16px] leading-none mt-0.5">&#x2022;</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-[22px] font-bold text-[#084C5A] uppercase tracking-[0.02em] mb-3">Projects</h2>
              <div className="space-y-2">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <p className="text-[15px] font-bold text-[#2A2A2A]">{proj.name}</p>
                    {proj.description && (
                      <p className="text-[14px] text-[#666666] leading-[1.6]">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="mt-auto pt-4">
            <h2 className="text-[22px] font-bold text-[#084C5A] uppercase tracking-[0.02em] mb-3">Contact Information</h2>
            <div className="space-y-2">
              {personalInfo.phone && (
                <div className="flex items-center gap-3 text-[14px] text-[#666666]">
                  <Phone size={22} className="text-[#084C5A] flex-shrink-0" />
                  <span dir="ltr">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-3 text-[14px] text-[#666666]">
                  <Mail size={22} className="text-[#084C5A] flex-shrink-0" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-3 text-[14px] text-[#666666]">
                  <MapPin size={22} className="text-[#084C5A] flex-shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-3 text-[14px] text-[#666666]">
                  <Linkedin size={22} className="text-[#084C5A] flex-shrink-0" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER — Decorative */}
      <div className="h-[55px] bg-[#084C5A]" />
    </div>
  );
};

export default React.memo(TealBlockHeaderTemplate);
