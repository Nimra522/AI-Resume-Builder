import React from 'react';
import { ResumeData } from '../../types';

const LuxuryExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#111111] font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="border-b-2 border-[#C9A227] mx-9 pt-8 pb-4 flex items-end justify-between">
        <div>
          <h1 className="text-[36px] font-light tracking-[0.06em] text-[#111111]">{personalInfo.fullName || 'Full Name'}</h1>
          <p className="text-[18px] text-[#C9A227] tracking-[0.3em] uppercase font-medium mt-2">{personalInfo.jobTitle || 'Job Title'}</p>
        </div>
        <div className="text-right text-[13px] text-[#BDBDBD] leading-relaxed">
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
        </div>
      </div>
      <div className="px-9 pt-5 pb-8">
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-[#C9A227] tracking-[0.2em] mb-3">PROFILE</h2>
            <p className="text-[13px] text-[#111111] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-[#C9A227] tracking-[0.2em] mb-4">EXPERIENCE</h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-[15px] font-semibold text-[#111111] break-words pr-2">{exp.role}</p>
                    <p className="text-[12px] text-[#BDBDBD] flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-[14px] text-[#C9A227] mt-1">{exp.company}</p>
                  {exp.description && <p className="text-[13px] text-[#111111] mt-1.5 leading-[1.6]">{exp.description}</p>}
                  {idx < experience.length - 1 && <div className="h-px bg-[#C9A227]/20 mt-3" />}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-8">
          <div className="flex-1">
            {education.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#C9A227] tracking-[0.2em] mb-3">EDUCATION</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <p className="text-[15px] font-semibold text-[#111111]">{edu.degree}</p>
                    <p className="text-[14px] text-[#111111] mt-1">{edu.school}<span className="text-[#BDBDBD]"> · {edu.graduationDate}</span></p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-[35%] flex-shrink-0 space-y-5">
            {skills.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#C9A227] tracking-[0.2em] mb-3">SKILLS</h2>
                <div className="space-y-2">{skills.map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-[13px] text-[#111111]">{s}</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((star) => <span key={star} className={`text-[11px] ${star <= 4 ? 'text-[#C9A227]' : 'text-[#BDBDBD]'}`}>★</span>)}
                    </div>
                  </div>
                ))}</div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#C9A227] tracking-[0.2em] mb-3">CERTIFICATIONS</h2>
                {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#111111] mb-2">{c.name} <span className="text-[#BDBDBD]">({c.issuer})</span></p>)}
              </div>
            )}
            {projects && projects.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#C9A227] tracking-[0.2em] mb-3">ACHIEVEMENTS</h2>
                {projects.map((p) => <p key={p.id} className="text-[13px] text-[#111111] mb-1.5">— {p.name}</p>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LuxuryExecutiveTemplate);
