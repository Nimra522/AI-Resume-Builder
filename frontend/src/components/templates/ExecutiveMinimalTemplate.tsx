import React from 'react';
import { ResumeData } from '../../types';

const ExecutiveMinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#0F172A] font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="h-1.5 bg-[#0F172A]" />
      <div className="px-9 pt-10 pb-8">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-[32px] font-bold tracking-tight">{personalInfo.fullName || 'Full Name'}</h1>
            <p className="text-[18px] text-[#334155] font-medium mt-2">{personalInfo.jobTitle || 'Job Title'}</p>
          </div>
          <div className="text-right text-[13px] text-[#334155] leading-relaxed">
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
          </div>
        </div>
        <div className="h-px bg-[#E5E7EB] mb-5" />
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-[#0F172A] tracking-wider mb-3">PROFILE</h2>
            <p className="text-[13px] text-[#334155] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-[#0F172A] tracking-wider mb-4">EXPERIENCE</h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-[7px] h-[7px] bg-[#334155]" />
                    {idx < experience.length - 1 && <div className="w-px flex-1 bg-[#E5E7EB]" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-[15px] font-semibold text-[#0F172A] break-words pr-2">{exp.role}</p>
                      <p className="text-[12px] text-[#334155] flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="text-[14px] text-[#334155] mt-1">{exp.company}</p>
                    {exp.description && <p className="text-[13px] text-[#334155] mt-1.5 leading-[1.6]">{exp.description}</p>}
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
                <h2 className="text-[16px] font-semibold text-[#0F172A] tracking-wider mb-3">EDUCATION</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <p className="text-[15px] font-semibold text-[#0F172A]">{edu.degree}</p>
                    <p className="text-[14px] text-[#334155] mt-1">{edu.school}{edu.school && edu.graduationDate ? ' · ' : ''}{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-[35%] flex-shrink-0 space-y-5">
            {skills.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#0F172A] tracking-wider mb-3">SKILLS</h2>
                <div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="text-[12px] text-[#334155] border border-[#E5E7EB] px-2.5 py-1">{s}</span>)}</div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#0F172A] tracking-wider mb-3">CERTIFICATIONS</h2>
                {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#334155] mb-2">{c.name}<span className="text-[#334155]/60"> ({c.issuer})</span></p>)}
              </div>
            )}
            {projects && projects.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#0F172A] tracking-wider mb-3">ACHIEVEMENTS</h2>
                {projects.map((p) => <p key={p.id} className="text-[13px] text-[#334155] mb-1.5">• {p.name}</p>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExecutiveMinimalTemplate);
