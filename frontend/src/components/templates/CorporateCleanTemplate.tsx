import React from 'react';
import { ResumeData } from '../../types';

const CorporateCleanTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;

  const parseDate = (start?: string, end?: string, current?: boolean): string => {
    const s = start || '';
    const e = current ? 'Present' : (end || '');
    return s && e ? `${s} – ${e}` : s || e;
  };

  return (
    <div className="w-full bg-white text-[#222222] font-['Inter',sans-serif] shadow-xl mx-auto p-0" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* Header */}
      <div className="pt-9 pb-0 text-center px-8">
        <h1 className="text-[36px] font-bold text-[#222222] uppercase tracking-[0.02em] leading-tight">
          {personalInfo.fullName || 'FULL NAME'}
        </h1>
        <p className="text-[20px] font-semibold text-[#222222] mt-1">
          {personalInfo.jobTitle || 'Job Title'}
        </p>
        <div className="w-full h-px bg-[#D8D8D8] my-3" />
        <p className="text-[14px] text-[#222222] leading-relaxed">
          {[
            personalInfo.email || 'email@example.com',
            personalInfo.phone || '+1 234 567 890',
            personalInfo.location || 'City, State',
            personalInfo.linkedin,
          ]
            .filter(Boolean)
            .join('  |  ')}
        </p>
      </div>

      <div className="px-8 pt-5 pb-8 space-y-5">

        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <div className="w-full bg-[#DCE5EA] h-[34px] flex items-center">
              <h2 className="text-[18px] font-bold text-[#222222] uppercase tracking-[0.01em] pl-3">Summary</h2>
            </div>
            <div className="mt-3">
              <p className="text-[14px] text-[#222222] leading-[1.7] whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          </div>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <div>
            <div className="w-full bg-[#DCE5EA] h-[34px] flex items-center">
              <h2 className="text-[18px] font-bold text-[#222222] uppercase tracking-[0.01em] pl-3">Work Experience</h2>
            </div>
            <div className="mt-3 space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-[16px] font-bold text-[#222222]">
                      {exp.role}{exp.company ? `, ${exp.company}` : ''}
                    </p>
                    <p className="text-[14px] text-[#222222] whitespace-nowrap ml-4 flex-shrink-0">
                      {parseDate(exp.startDate, exp.endDate, exp.current)}
                    </p>
                  </div>
                  {exp.description && (
                    <ul className="mt-1.5 space-y-0.5 pl-4">
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i} className="flex items-start gap-2 text-[14px] text-[#222222] leading-[1.6]">
                          <span className="flex-shrink-0">&#x2022;</span>
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

        {/* Education */}
        {education.length > 0 && (
          <div>
            <div className="w-full bg-[#DCE5EA] h-[34px] flex items-center">
              <h2 className="text-[18px] font-bold text-[#222222] uppercase tracking-[0.01em] pl-3">Education</h2>
            </div>
            <div className="mt-3 space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-[16px] font-bold text-[#222222]">{edu.degree}</p>
                    <p className="text-[14px] text-[#222222] whitespace-nowrap ml-4 flex-shrink-0">{edu.graduationDate}</p>
                  </div>
                  {edu.school && <p className="text-[14px] text-[#222222] mt-0.5">{edu.school}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Skills */}
        {skills.length > 0 && (
          <div>
            <div className="w-full bg-[#DCE5EA] h-[34px] flex items-center">
              <h2 className="text-[18px] font-bold text-[#222222] uppercase tracking-[0.01em] pl-3">Key Skills</h2>
            </div>
            <div className="mt-3">
              <ul className="grid grid-cols-3 gap-x-4 gap-y-0.5">
                {skills.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] text-[#222222] leading-[1.6]">
                    <span className="flex-shrink-0">&#x2022;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Certifications (optional extra section) */}
        {certifications && certifications.length > 0 && (
          <div>
            <div className="w-full bg-[#DCE5EA] h-[34px] flex items-center">
              <h2 className="text-[18px] font-bold text-[#222222] uppercase tracking-[0.01em] pl-3">Certifications</h2>
            </div>
            <div className="mt-3 space-y-1">
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between items-baseline">
                  <p className="text-[14px] text-[#222222]">{c.name}{c.issuer ? ` — ${c.issuer}` : ''}</p>
                  {c.date && <p className="text-[14px] text-[#222222] whitespace-nowrap ml-4 flex-shrink-0">{c.date}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements / Projects */}
        {projects && projects.length > 0 && (
          <div>
            <div className="w-full bg-[#DCE5EA] h-[34px] flex items-center">
              <h2 className="text-[18px] font-bold text-[#222222] uppercase tracking-[0.01em] pl-3">Projects</h2>
            </div>
            <div className="mt-3 space-y-2">
              {projects.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-[16px] font-bold text-[#222222]">{p.name}</p>
                  </div>
                  {p.description && <p className="text-[14px] text-[#222222] mt-0.5 leading-[1.6]">{p.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(CorporateCleanTemplate);
