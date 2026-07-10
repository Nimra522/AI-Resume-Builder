import React from 'react';
import { ResumeData } from '../../types';

const ElegantMonochromeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#18181B] font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="px-9 pt-10 pb-4">
        <div className="text-center mb-5">
          <h1 className="text-[34px] font-light text-[#18181B] tracking-[0.08em] uppercase">{personalInfo.fullName || 'Full Name'}</h1>
          <div className="w-12 h-px bg-[#18181B] mx-auto my-3" />
          <p className="text-[18px] text-[#71717A] font-medium">{personalInfo.jobTitle || 'Job Title'}</p>
        </div>
        <div className="flex justify-center gap-5 text-[13px] text-[#71717A]">
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span className="break-all">{personalInfo.email}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>
      <div className="h-px bg-[#E4E4E7] mx-9" />
      <div className="px-9 pt-5 pb-8">
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-[#18181B] tracking-wider mb-3">PROFILE</h2>
            <p className="text-[13px] text-[#71717A] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-[#18181B] tracking-wider mb-4">EXPERIENCE</h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id} className="border-l-2 border-[#E4E4E7] pl-4 pb-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-[15px] font-semibold text-[#18181B] break-words pr-2">{exp.role}</p>
                    <p className="text-[12px] text-[#71717A] flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-[14px] text-[#71717A] mt-1">{exp.company}</p>
                  {exp.description && <p className="text-[13px] text-[#71717A] mt-1.5 leading-[1.6]">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-8">
          <div className="flex-1">
            {education.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#18181B] tracking-wider mb-3">EDUCATION</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3 border-b border-[#E4E4E7] pb-2">
                    <p className="text-[15px] font-semibold text-[#18181B]">{edu.degree}</p>
                    <p className="text-[14px] text-[#71717A] mt-1">{edu.school}{edu.school && edu.graduationDate ? ' — ' : ''}{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-[35%] flex-shrink-0 space-y-5">
            {skills.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#18181B] tracking-wider mb-3">SKILLS</h2>
                <div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="text-[12px] text-[#71717A] border border-[#E4E4E7] px-2.5 py-1">{s}</span>)}</div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#18181B] tracking-wider mb-3">CERTIFICATIONS</h2>
                {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#71717A] mb-2">{c.name}<span className="text-[#71717A]/60"> ({c.issuer})</span></p>)}
              </div>
            )}
            {projects && projects.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#18181B] tracking-wider mb-3">ACHIEVEMENTS</h2>
                {projects.map((p) => <p key={p.id} className="text-[13px] text-[#71717A] mb-1.5">— {p.name}</p>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ElegantMonochromeTemplate);
