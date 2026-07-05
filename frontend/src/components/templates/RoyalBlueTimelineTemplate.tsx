import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, Diamond, MapPin, Linkedin } from 'lucide-react';

const RoyalBlueTimelineTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  const languages = certifications || [];
  const references = projects || [];

  return (
    <div className="w-full bg-white text-[#222222] shadow-xl mx-auto overflow-hidden relative" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* Header */}
      <div className="pt-8 relative">
        {/* Decorative top bars */}
        <div className="flex justify-between items-start mb-3 px-8">
          <div className="h-[3px] w-[35%] bg-[#1E22A8]" />
          <div className="h-[3px] w-[35%] bg-[#1E22A8]" />
        </div>

        {/* Name */}
        <h1 className="text-center text-[44px] font-bold text-[#1E22A8] uppercase leading-tight tracking-[0.08em]">
          {personalInfo.fullName || 'Full Name'}
        </h1>

        {/* Second decorative bar */}
        <div className="flex justify-between items-start mt-3 mb-6 px-8">
          <div className="h-[3px] w-[35%] bg-[#1E22A8]" />
          <div className="h-[3px] w-[35%] bg-[#1E22A8]" />
        </div>

        {/* Blue title bar */}
        <div className="bg-[#1E22A8] text-center py-[8px] mx-0">
          <p className="text-white text-[20px] font-bold uppercase tracking-[0.04em]">
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex px-8 pt-7 pb-8 gap-8">
        {/* Left Column — 62% */}
        <div className="flex-[1.62] space-y-5">

          {/* Summary */}
          {personalInfo.summary && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Diamond size={10} className="text-[#1E22A8]" />
                <h2 className="text-[18px] font-semibold text-[#1E22A8] uppercase tracking-[0.02em]">Summary</h2>
                <div className="flex-1 h-px bg-[#1E22A8]" />
              </div>
              <p className="text-[14px] text-[#555555] leading-[1.8] whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Diamond size={10} className="text-[#1E22A8]" />
                <h2 className="text-[18px] font-semibold text-[#1E22A8] uppercase tracking-[0.02em]">Work Experience</h2>
                <div className="flex-1 h-px bg-[#1E22A8]" />
              </div>
              <div className="space-y-5">
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="relative pl-7">
                    <div className="absolute left-[7px] top-[6px] w-[13px] h-[13px] rounded-full border-2 border-[#1E22A8] bg-white z-10" />
                    {idx < experience.length - 1 && (
                      <div className="absolute left-[12px] top-[18px] bottom-[-22px] w-px bg-[#1E22A8]" />
                    )}
                    <div>
                      <p className="text-[16px] font-bold text-[#1E22A8]">{exp.role}</p>
                      <p className="text-[14px] text-[#555555] mt-0.5">{exp.company}</p>
                      <p className="text-[14px] text-[#555555] italic mt-0.5">
                        {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </p>
                      {exp.description && (
                        <ul className="mt-1.5 space-y-0.5">
                          {exp.description.split('\n').filter(Boolean).map((line, i) => (
                            <li key={i} className="flex items-start gap-2 text-[14px] text-[#555555] leading-[1.6]">
                              <span className="flex-shrink-0 text-[#1E22A8] text-[16px] leading-none mt-0.5">&#x2022;</span>
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {references.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Diamond size={10} className="text-[#1E22A8]" />
                <h2 className="text-[18px] font-semibold text-[#1E22A8] uppercase tracking-[0.02em]">References</h2>
                <div className="flex-1 h-px bg-[#1E22A8]" />
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {references.map((ref) => (
                  <div key={ref.id}>
                    <p className="text-[16px] font-bold text-[#1E22A8]">{ref.name}</p>
                    <p className="text-[14px] text-[#555555]">{ref.description || ref.name}</p>
                    <p className="text-[14px] text-[#555555] mt-1">
                      <span className="font-semibold text-[#222222]">Phone: </span>
                      <span dir="ltr">{personalInfo.phone || '000-000-0000'}</span>
                    </p>
                    <p className="text-[14px] text-[#555555]">
                      <span className="font-semibold text-[#222222]">Email: </span>
                      <span className="break-all">{personalInfo.email || 'email@example.com'}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column — 38% */}
        <div className="w-[38%] flex-shrink-0 space-y-5">

          {/* Education */}
          {education.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Diamond size={10} className="text-[#1E22A8]" />
                <h2 className="text-[18px] font-semibold text-[#1E22A8] uppercase tracking-[0.02em]">Education</h2>
                <div className="flex-1 h-px bg-[#1E22A8]" />
              </div>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[14px] font-bold text-[#1E22A8]">{edu.school}</p>
                    <p className="text-[14px] text-[#555555]">{edu.degree}</p>
                    <p className="text-[14px] text-[#555555]">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Diamond size={10} className="text-[#1E22A8]" />
                <h2 className="text-[18px] font-semibold text-[#1E22A8] uppercase tracking-[0.02em]">Skills</h2>
                <div className="flex-1 h-px bg-[#1E22A8]" />
              </div>
              <ul className="space-y-0.5">
                {skills.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] text-[#555555] leading-[1.6]">
                    <span className="flex-shrink-0 text-[#1E22A8] text-[16px] leading-none mt-0.5">&#x2022;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Diamond size={10} className="text-[#1E22A8]" />
                <h2 className="text-[18px] font-semibold text-[#1E22A8] uppercase tracking-[0.02em]">Languages</h2>
                <div className="flex-1 h-px bg-[#1E22A8]" />
              </div>
              <ul className="space-y-0.5">
                {languages.map((lang) => (
                  <li key={lang.id} className="flex items-start gap-2 text-[14px] text-[#555555] leading-[1.6]">
                    <span className="flex-shrink-0 text-[#1E22A8] text-[16px] leading-none mt-0.5">&#x2022;</span>
                    <span>{lang.name}{lang.issuer ? ` (${lang.issuer})` : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Diamond size={10} className="text-[#1E22A8]" />
              <h2 className="text-[18px] font-semibold text-[#1E22A8] uppercase tracking-[0.02em]">Contact</h2>
              <div className="flex-1 h-px bg-[#1E22A8]" />
            </div>
            <div className="space-y-2">
              {personalInfo.phone && (
                <div className="flex items-center gap-2 text-[14px] text-[#555555]">
                  <Phone size={14} className="text-[#1E22A8] flex-shrink-0" />
                  <span dir="ltr">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2 text-[14px] text-[#555555]">
                  <Mail size={14} className="text-[#1E22A8] flex-shrink-0" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2 text-[14px] text-[#555555]">
                  <MapPin size={14} className="text-[#1E22A8] flex-shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2 text-[14px] text-[#555555]">
                  <Linkedin size={14} className="text-[#1E22A8] flex-shrink-0" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RoyalBlueTimelineTemplate);
