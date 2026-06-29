import React from 'react';
import { ResumeData } from '../../types';

const ExecutiveBlueTemplate2: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#1E3A8A] font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="bg-[#1E3A8A] px-9 pt-7 pb-6">
        <h1 className="text-[36px] font-bold text-white tracking-tight">{personalInfo.fullName || 'Full Name'}</h1>
        <p className="text-[18px] text-[#CBD5E1] font-medium mt-1.5">{personalInfo.jobTitle || 'Job Title'}</p>
        <div className="flex gap-4 mt-3 text-[13px] text-[#CBD5E1]">
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span className="break-all">{personalInfo.email}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>
      <div className="px-9 pt-6 pb-8">
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-[#475569] tracking-wider mb-3">PROFESSIONAL SUMMARY</h2>
            <p className="text-[13px] text-[#1E3A8A] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-[#475569] tracking-wider mb-4">WORK EXPERIENCE</h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-[7px] h-[7px] bg-[#1E3A8A]" />
                    {idx < experience.length - 1 && <div className="w-px flex-1 bg-[#CBD5E1]" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-[15px] font-semibold text-[#1E3A8A] break-words pr-2">{exp.role}</p>
                      <p className="text-[12px] text-[#475569] flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="text-[14px] text-[#475569] mt-1">{exp.company}</p>
                    {exp.description && <p className="text-[13px] text-[#1E3A8A] mt-1.5 leading-[1.6]">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-8">
          <div className="flex-1">
            {education.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#475569] tracking-wider mb-3">EDUCATION</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <p className="text-[15px] font-semibold text-[#1E3A8A]">{edu.degree}</p>
                    <p className="text-[14px] text-[#475569] mt-1">{edu.school}{edu.school && edu.graduationDate ? ' · ' : ''}{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-[35%] flex-shrink-0 space-y-5">
            {skills.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#475569] tracking-wider mb-3">SKILLS</h2>
                <div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="text-[12px] text-[#1E3A8A] bg-[#CBD5E1]/40 px-2.5 py-1">{s}</span>)}</div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#475569] tracking-wider mb-3">LANGUAGES</h2>
                {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#1E3A8A] mb-2">{c.name}<span className="text-[#475569]"> ({c.issuer})</span></p>)}
              </div>
            )}
            {projects && projects.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#475569] tracking-wider mb-3">ACHIEVEMENTS</h2>
                {projects.map((p) => <p key={p.id} className="text-[13px] text-[#1E3A8A] mb-1.5">▸ {p.name}</p>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExecutiveBlueTemplate2);
