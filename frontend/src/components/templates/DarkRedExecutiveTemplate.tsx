import React from 'react';
import { ResumeData } from '../../types';

const DarkRedExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#7F1D1D] font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="h-1 bg-[#7F1D1D]" />
      <div className="px-9 pt-9 pb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-[34px] font-bold text-[#111111]">{personalInfo.fullName || 'Full Name'}</h1>
            <p className="text-[18px] text-[#B91C1C] font-medium mt-1.5">{personalInfo.jobTitle || 'Job Title'}</p>
          </div>
          <div className="text-right text-[13px] text-[#7F1D1D] leading-relaxed">
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
          </div>
        </div>
        <div className="h-px bg-[#D1D5DB] mb-5" />
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-[#7F1D1D] tracking-wider mb-3">PROFILE</h2>
            <p className="text-[13px] text-[#111111] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-[#7F1D1D] tracking-wider mb-4">EXPERIENCE</h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-[15px] font-semibold text-[#111111] break-words pr-2">{exp.role}</p>
                    <p className="text-[12px] text-[#B91C1C] flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-[14px] text-[#B91C1C] mt-1">{exp.company}</p>
                  {exp.description && <p className="text-[13px] text-[#111111] mt-1.5 leading-[1.6]">{exp.description}</p>}
                  {idx < experience.length - 1 && <div className="h-px bg-[#D1D5DB] mt-3" />}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-8">
          <div className="flex-1">
            {education.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#7F1D1D] tracking-wider mb-3">EDUCATION</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3 border-l-2 border-[#7F1D1D] pl-3">
                    <p className="text-[15px] font-semibold text-[#111111]">{edu.degree}</p>
                    <p className="text-[14px] text-[#111111] mt-1">{edu.school}<span className="text-[#B91C1C]"> · {edu.graduationDate}</span></p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-[35%] flex-shrink-0 space-y-5">
            {skills.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#7F1D1D] tracking-wider mb-3">SKILLS</h2>
                <div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="text-[12px] text-[#7F1D1D] border border-[#D1D5DB] px-2.5 py-1">{s}</span>)}</div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#7F1D1D] tracking-wider mb-3">CERTIFICATIONS</h2>
                {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#111111] mb-2">{c.name}<span className="text-[#B91C1C]"> ({c.issuer})</span></p>)}
              </div>
            )}
          </div>
        </div>
        {projects && projects.length > 0 && (
          <div className="mt-5">
            <h2 className="text-[16px] font-semibold text-[#7F1D1D] tracking-wider mb-3">ACHIEVEMENTS</h2>
            <div className="flex flex-wrap gap-2">{projects.map((p) => <span key={p.id} className="text-[12px] text-[#111111] bg-[#D1D5DB]/40 px-2.5 py-1">{p.name}</span>)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(DarkRedExecutiveTemplate);
