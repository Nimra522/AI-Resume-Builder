import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, Diamond, Linkedin } from 'lucide-react';

const HalftoneTimelineTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  const references = projects || [];
  const languages = certifications || [];

  return (
    <div className="w-full bg-white text-[#333333] font-['Inter',sans-serif] shadow-xl mx-auto overflow-hidden relative" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* Decorative Halftone Dots — Top Right */}
      <div className="absolute top-0 right-0 w-[180px] h-[200px] pointer-events-none overflow-hidden z-0">
        <svg viewBox="0 0 180 200" fill="none" className="w-full h-full">
          <circle cx="170" cy="10" r="6" fill="#888888" opacity="0.15" />
          <circle cx="150" cy="15" r="5" fill="#888888" opacity="0.12" />
          <circle cx="130" cy="20" r="4" fill="#888888" opacity="0.1" />
          <circle cx="170" cy="35" r="5" fill="#888888" opacity="0.13" />
          <circle cx="150" cy="40" r="4" fill="#888888" opacity="0.1" />
          <circle cx="130" cy="45" r="3.5" fill="#888888" opacity="0.08" />
          <circle cx="110" cy="48" r="3" fill="#888888" opacity="0.06" />
          <circle cx="170" cy="60" r="4.5" fill="#888888" opacity="0.11" />
          <circle cx="150" cy="65" r="3.5" fill="#888888" opacity="0.09" />
          <circle cx="130" cy="68" r="3" fill="#888888" opacity="0.07" />
          <circle cx="110" cy="72" r="2.5" fill="#888888" opacity="0.05" />
          <circle cx="170" cy="85" r="4" fill="#888888" opacity="0.1" />
          <circle cx="150" cy="88" r="3" fill="#888888" opacity="0.08" />
          <circle cx="130" cy="92" r="2.5" fill="#888888" opacity="0.06" />
          <circle cx="170" cy="108" r="3.5" fill="#888888" opacity="0.08" />
          <circle cx="150" cy="112" r="2.5" fill="#888888" opacity="0.06" />
          <circle cx="170" cy="130" r="3" fill="#888888" opacity="0.06" />
          <circle cx="160" cy="10" r="3" fill="#888888" opacity="0.08" />
          <circle cx="140" cy="15" r="2.5" fill="#888888" opacity="0.06" />
          <circle cx="160" cy="35" r="2.5" fill="#888888" opacity="0.07" />
          <circle cx="140" cy="40" r="2" fill="#888888" opacity="0.05" />
          <circle cx="160" cy="60" r="2" fill="#888888" opacity="0.06" />
        </svg>
      </div>

      {/* Header */}
      <div className="px-8 pt-8 pb-0 relative z-10">
        <h1 className="text-[48px] font-light text-[#333333] leading-tight tracking-[-0.01em]">
          {personalInfo.fullName || 'Full Name'}
        </h1>
        <p className="text-[18px] text-[#666666] font-normal mt-1">
          {personalInfo.jobTitle || 'Job Title'}
        </p>

        <div className="flex gap-6 mt-4 text-[14px] text-[#666666] items-center">
          {personalInfo.phone && (
            <span className="flex items-center gap-2">
              <Phone size={14} className="text-[#444444]" />
              <span dir="ltr">{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.email && (
            <span className="flex items-center gap-2">
              <Mail size={14} className="text-[#444444]" />
              <span className="break-all">{personalInfo.email}</span>
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-2">
              <Linkedin size={14} className="text-[#444444]" />
              <span className="break-all">{personalInfo.linkedin}</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex px-8 pt-6 pb-8 gap-8 relative z-10">
        {/* Left Column — 60% */}
        <div className="flex-1 space-y-5">

          {/* Summary */}
          {personalInfo.summary && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Diamond size={10} className="text-[#444444] fill-current" />
                <h2 className="text-[18px] font-semibold text-[#333333]">Summary</h2>
                <div className="flex-1 h-px bg-[#444444]" />
              </div>
              <p className="text-[14px] text-[#666666] leading-[1.8] whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Diamond size={10} className="text-[#444444] fill-current" />
                <h2 className="text-[18px] font-semibold text-[#333333]">Work Experience</h2>
                <div className="flex-1 h-px bg-[#444444]" />
              </div>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="relative pl-7">
                    {idx < experience.length - 1 && (
                      <div className="absolute left-[7px] top-[16px] bottom-[-16px] w-px bg-[#555555]" />
                    )}
                    <div className="absolute left-0 top-[5px] w-[15px] h-[15px] rounded-full border-2 border-[#555555] bg-white" />
                    <div>
                      <p className="text-[16px] font-bold text-[#333333]">{exp.role}</p>
                      <p className="text-[14px] text-[#666666]">{exp.company}</p>
                      <p className="text-[14px] text-[#666666] italic mt-0.5">
                        {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </p>
                      {exp.description && (
                        <ul className="mt-1.5 space-y-0.5">
                          {exp.description.split('\n').filter(Boolean).map((line, i) => (
                            <li key={i} className="flex items-start gap-2 text-[14px] text-[#666666] leading-[1.6]">
                              <span className="text-[#555555] flex-shrink-0 text-[16px] leading-none mt-0.5">&#x2022;</span>
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
              <div className="flex items-center gap-2 mb-2">
                <Diamond size={10} className="text-[#444444] fill-current" />
                <h2 className="text-[18px] font-semibold text-[#333333]">References</h2>
                <div className="flex-1 h-px bg-[#444444]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {references.map((ref) => (
                  <div key={ref.id}>
                    <p className="text-[16px] font-medium text-[#333333]">{ref.name}</p>
                    <p className="text-[14px] text-[#666666]">{ref.description || ref.name}</p>
                    <p className="text-[12px] text-[#666666] mt-0.5">{personalInfo.phone}</p>
                    <p className="text-[12px] text-[#666666] break-all">{personalInfo.email}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column — 40% */}
        <div className="w-[40%] flex-shrink-0 space-y-5">

          {/* Education */}
          {education.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Diamond size={10} className="text-[#444444] fill-current" />
                <h2 className="text-[18px] font-semibold text-[#333333]">Education</h2>
                <div className="flex-1 h-px bg-[#444444]" />
              </div>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[14px] font-bold text-[#333333]">{edu.school}</p>
                    <p className="text-[14px] text-[#666666]">{edu.degree}</p>
                    <p className="text-[14px] text-[#666666]">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Diamond size={10} className="text-[#444444] fill-current" />
                <h2 className="text-[18px] font-semibold text-[#333333]">Skills</h2>
                <div className="flex-1 h-px bg-[#444444]" />
              </div>
              <ul className="space-y-0.5">
                {skills.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] text-[#666666] leading-[1.6]">
                    <span className="text-[#555555] flex-shrink-0 text-[16px] leading-none mt-0.5">&#x2022;</span>
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
                <Diamond size={10} className="text-[#444444] fill-current" />
                <h2 className="text-[18px] font-semibold text-[#333333]">Languages</h2>
                <div className="flex-1 h-px bg-[#444444]" />
              </div>
              <ul className="space-y-0.5">
                {languages.map((lang) => (
                  <li key={lang.id} className="flex items-start gap-2 text-[14px] text-[#666666] leading-[1.6]">
                    <span className="text-[#555555] flex-shrink-0 text-[16px] leading-none mt-0.5">&#x2022;</span>
                    <span>{lang.name}{lang.issuer ? ` (${lang.issuer})` : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(HalftoneTimelineTemplate);
