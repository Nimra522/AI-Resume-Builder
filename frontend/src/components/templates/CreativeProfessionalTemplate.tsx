import React from 'react';
import { ResumeData } from '../../types';
import { User, Linkedin } from 'lucide-react';

const CreativeProfessionalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#0F766E] font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="flex min-h-[1122px]">
        <div className="w-60 flex-shrink-0 bg-[#0F766E] mr-6 flex flex-col items-center pt-8">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-[3px] border-white/30 bg-[#14B8A6]/30 flex items-center justify-center mb-4">
            {personalInfo.photoUrl ? (
              <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <User size={36} className="text-white/60" />
            )}
          </div>
          </div>
          <div className="flex-1 pt-8 pb-8 pr-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-[34px] font-bold text-[#111111] tracking-tight">{personalInfo.fullName || 'Full Name'}</h1>
              <p className="text-[18px] text-[#14B8A6] font-medium mt-1.5">{personalInfo.jobTitle || 'Job Title'}</p>
            </div>
            <div className="text-right text-[13px] text-[#0F766E] leading-relaxed">
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
              {personalInfo.location && <p>{personalInfo.location}</p>}
              {personalInfo.linkedin && <p className="break-all">{personalInfo.linkedin}</p>}
            </div>
          </div>
          <div className="h-px bg-[#E5E7EB] mb-5" />
          {personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-[16px] font-semibold text-[#0F766E] tracking-wider mb-3">ABOUT</h2>
              <p className="text-[13px] text-[#111111] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[16px] font-semibold text-[#0F766E] tracking-wider mb-4">EXPERIENCE</h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-[#14B8A6]" />
                      {idx < experience.length - 1 && <div className="w-px flex-1 bg-[#E5E7EB]" />}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-[15px] font-semibold text-[#111111] break-words pr-2">{exp.role}</p>
                        <p className="text-[12px] text-[#0F766E] flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                      </div>
                      <p className="text-[14px] text-[#14B8A6] mt-1">{exp.company}</p>
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
                  <h2 className="text-[16px] font-semibold text-[#0F766E] tracking-wider mb-3">EDUCATION</h2>
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-3">
                      <p className="text-[15px] font-semibold text-[#111111]">{edu.degree}</p>
                      <p className="text-[14px] text-[#111111] mt-1">{edu.school}<span className="text-[#0F766E]"> · {edu.graduationDate}</span></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-[35%] flex-shrink-0 space-y-5">
              {skills.length > 0 && (
                <div>
                  <h2 className="text-[16px] font-semibold text-[#0F766E] tracking-wider mb-3">SKILLS</h2>
                  <div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="text-[12px] text-[#0F766E] bg-[#E5E7EB] px-2.5 py-1">{s}</span>)}</div>
                </div>
              )}
              {certifications.length > 0 && (
                <div>
                  <h2 className="text-[16px] font-semibold text-[#0F766E] tracking-wider mb-3">CERTIFICATIONS</h2>
                  {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#111111] mb-2">{c.name}<span className="text-[#0F766E]"> ({c.issuer})</span></p>)}
                </div>
              )}
            </div>
          </div>
          {projects && projects.length > 0 && (
            <div className="mt-5">
              <h2 className="text-[16px] font-semibold text-[#0F766E] tracking-wider mb-3">ACHIEVEMENTS</h2>
              <div className="flex flex-wrap gap-2">{projects.map((p) => <span key={p.id} className="text-[12px] text-[#111111] border border-[#14B8A6] px-2.5 py-1">{p.name}</span>)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(CreativeProfessionalTemplate);
