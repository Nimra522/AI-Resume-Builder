import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-stretch mb-3">
    <div className="w-[4px] bg-[#1B2135] flex-shrink-0" />
    <div className="bg-[#2E6A9E] px-4 py-2 flex-1">
      <h2 className="text-[14px] font-bold text-white uppercase tracking-[0.08em]">{title}</h2>
    </div>
  </div>
);

const ExecutiveBlueBannerTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  const languages = certifications || [];
  const references = projects || [];
  const competencies = skills;

  return (
    <div className="w-full bg-white text-[#1B2135] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* Header */}
      <div className="flex justify-between items-start px-8 pt-8 pb-0 gap-6">
        <div>
          <h1 className="font-['Georgia',serif] text-[54px] font-bold text-[#1B2135] uppercase leading-tight tracking-[0.02em]">
            {personalInfo.fullName || 'Full Name'}
          </h1>
          <p className="font-['Inter',sans-serif] text-[22px] font-medium text-[#666666] mt-1">
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
        <div className="text-right text-[14px] text-[#666666] space-y-1 flex-shrink-0">
          {personalInfo.phone && <p className="whitespace-nowrap" dir="ltr">{personalInfo.phone}</p>}
          {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
          {personalInfo.linkedin && <p className="break-all">{personalInfo.linkedin}</p>}
        </div>
      </div>

      {/* Full-width blue divider */}
      <div className="mx-8 mt-4 h-[2px] bg-[#2E6A9E]" />

      {/* Top Content */}
      <div className="flex px-8 pt-5 pb-4 gap-6">
        <div className="w-[38%] flex-shrink-0">
          <h2 className="text-[14px] font-bold text-[#2E6A9E] tracking-[0.08em] mb-3">CORE COMPETENCIES</h2>
          {competencies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {competencies.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 bg-[#204D74] text-white text-[13px] font-medium leading-tight">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="w-px bg-[#D7D7D7] flex-shrink-0" />
        {personalInfo.summary && (
          <div className="flex-1">
            <h2 className="text-[14px] font-bold text-[#2E6A9E] tracking-[0.08em] mb-3">PROFESSIONAL SUMMARY</h2>
            <p className="text-[14px] text-[#666666] leading-[1.8] whitespace-pre-wrap">{personalInfo.summary}</p>
          </div>
        )}
      </div>

      {/* Two-column main content */}
      <div className="flex px-8 pt-2 pb-8 gap-6">
        {/* Left column — ~68% */}
        <div className="flex-1 space-y-4">
          <SectionHeader title="WORK EXPERIENCE" />

          {experience.length > 0 && (
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <p className="text-[13px] font-semibold text-[#666666] uppercase tracking-[0.04em]">
                    {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ' '}{exp.current ? 'Present' : exp.endDate}
                  </p>
                  <p className="text-[18px] font-bold text-[#1B2135] mt-1">{exp.role}</p>
                  <p className="text-[13px] font-semibold text-[#666666] uppercase tracking-[0.04em]">{exp.company}</p>
                  {exp.description && (
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i} className="flex items-start gap-2 text-[14px] text-[#666666] leading-[1.6]">
                          <span className="flex-shrink-0 text-[#2E6A9E] text-[16px] leading-none mt-0.5">&#x2022;</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-[#D7D7D7] flex-shrink-0" />

        {/* Right column — ~32% */}
        <div className="w-[32%] flex-shrink-0 space-y-4">
          <SectionHeader title="EDUCATION" />

          {education.length > 0 && (
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-[14px] font-bold text-[#1B2135]">{edu.degree}</p>
                  <p className="text-[14px] text-[#666666]">{edu.school}</p>
                  <p className="text-[14px] text-[#666666]">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <>
              <SectionHeader title="LANGUAGES" />
              <div className="space-y-1">
                {languages.map((lang) => (
                  <p key={lang.id} className="text-[14px] text-[#666666]">
                    <span className="font-bold text-[#1B2135]">{lang.name}:</span>
                    {' '}{lang.issuer || 'Fluent'}
                  </p>
                ))}
              </div>
            </>
          )}

          {references.length > 0 && (
            <>
              <SectionHeader title="REFERENCES" />
              <div className="space-y-3">
                {references.map((ref) => (
                  <div key={ref.id}>
                    <p className="text-[14px] font-bold text-[#1B2135]">{ref.name}</p>
                    <p className="text-[14px] text-[#666666]">{ref.description || ref.name}</p>
                    <p className="text-[14px] text-[#666666] mt-0.5">
                      <span className="font-bold text-[#1B2135]">Phone: </span>
                      <span dir="ltr">{personalInfo.phone || '000-000-0000'}</span>
                    </p>
                    <p className="text-[14px] text-[#666666]">
                      <span className="font-bold text-[#1B2135]">Email: </span>
                      <span className="break-all">{personalInfo.email || 'email@example.com'}</span>
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExecutiveBlueBannerTemplate);
