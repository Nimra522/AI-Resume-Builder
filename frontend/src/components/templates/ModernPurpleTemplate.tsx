import React from 'react';
import { ResumeData } from '../../types';

const ModernPurpleTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#5B21B6] font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="border-b-4 border-[#5B21B6] px-9 pt-9 pb-5">
        <h1 className="text-[34px] font-bold text-[#111111]">{personalInfo.fullName || 'Full Name'}</h1>
        <p className="text-[18px] text-[#8B5CF6] font-medium mt-1.5">{personalInfo.jobTitle || 'Job Title'}</p>
        <div className="flex gap-4 mt-3 text-[13px] text-[#5B21B6]">
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span className="break-all">{personalInfo.email}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>
      <div className="px-9 pt-5 pb-8">
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-[#5B21B6] tracking-wider mb-3">ABOUT</h2>
            <p className="text-[13px] text-[#111111] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-[#5B21B6] tracking-wider mb-4">EXPERIENCE</h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 border-2 border-[#8B5CF6]" />
                    {idx < experience.length - 1 && <div className="w-px flex-1 bg-[#E5E7EB]" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-[15px] font-semibold text-[#111111] break-words pr-2">{exp.role}</p>
                      <p className="text-[12px] text-[#8B5CF6] flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="text-[14px] text-[#5B21B6] mt-1">{exp.company}</p>
                    {exp.description && <p className="text-[13px] text-[#111111] mt-1.5 leading-[1.6]">{exp.description}</p>}
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
                <h2 className="text-[16px] font-semibold text-[#5B21B6] tracking-wider mb-3">EDUCATION</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <p className="text-[15px] font-semibold text-[#111111]">{edu.degree}</p>
                    <p className="text-[14px] text-[#111111] mt-1">{edu.school}<span className="text-[#8B5CF6]"> · {edu.graduationDate}</span></p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-[35%] flex-shrink-0 space-y-5">
            {skills.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#5B21B6] tracking-wider mb-3">SKILLS</h2>
                <div className="space-y-2">{skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-[#E5E7EB]"><div className="h-full w-3/4 bg-[#8B5CF6]" /></div>
                    <span className="text-[12px] text-[#111111] w-16 text-right">{s}</span>
                  </div>
                ))}</div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#5B21B6] tracking-wider mb-3">CERTIFICATIONS</h2>
                {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#111111] mb-2">{c.name}<span className="text-[#8B5CF6]"> ({c.issuer})</span></p>)}
              </div>
            )}
          </div>
        </div>
        {projects && projects.length > 0 && (
          <div className="mt-5">
            <h2 className="text-[16px] font-semibold text-[#5B21B6] tracking-wider mb-3">ACHIEVEMENTS</h2>
            {projects.map((p) => <p key={p.id} className="text-[13px] text-[#111111] mb-1.5">✦ {p.name}</p>)}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ModernPurpleTemplate);
