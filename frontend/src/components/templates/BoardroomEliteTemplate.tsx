import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, User } from 'lucide-react';

const BoardroomEliteComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#222222] font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="px-9 pt-10 pb-4 text-center">
        <h1 className="text-[34px] font-light text-[#222222] tracking-[0.06em] uppercase font-['Georgia',serif]">{personalInfo.fullName || 'Full Name'}</h1>
        <div className="w-20 h-px bg-[#1F2A44] mx-auto my-5" />
        <p className="text-[18px] text-[#6D6D6D] uppercase tracking-[0.25em] font-medium">{personalInfo.jobTitle || 'Director'}</p>
        <div className="flex justify-center gap-6 mt-5 text-[13px] text-[#6D6D6D] uppercase tracking-[0.12em]">
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={12} className="text-[#2E86AB]" />{personalInfo.phone}</span>}
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={12} className="text-[#2E86AB]" /><span className="break-all">{personalInfo.email}</span></span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={12} className="text-[#2E86AB]" />{personalInfo.location}</span>}
        </div>
      </div>
      <div className="mx-9 my-5 h-px bg-[#2E86AB]/30" />
      <div className="px-9 pb-8">
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-[16px] font-semibold text-[#2E86AB] uppercase tracking-[0.18em] mb-3">About</h2>
            <div className="w-10 h-px bg-[#2E86AB]/30 mb-3" />
            <p className="text-[13px] text-[#6D6D6D] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
          </div>
        )}
        <div className="flex gap-6">
          <div className="flex-1 space-y-5">
            {experience.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#2E86AB] uppercase tracking-[0.18em] mb-4">Experience</h2>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative pl-5 border-l border-[#2E86AB]/25">
                      <div className="absolute left-[-4px] top-1 w-[7px] h-[7px] bg-[#2E86AB]" />
                      <p className="text-[15px] font-medium text-[#222222] break-words">{exp.role}</p>
                      <p className="text-[14px] text-[#2E86AB] mt-1">{exp.company}</p>
                      <p className="text-[12px] text-[#6D6D6D] mt-1">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                      {exp.description && <p className="text-[13px] text-[#6D6D6D] mt-2 leading-[1.6]">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {education.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#2E86AB] uppercase tracking-[0.18em] mb-3">Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <p className="text-[15px] font-medium text-[#222222]">{edu.degree}</p>
                    <p className="text-[14px] text-[#6D6D6D] mt-1">{edu.school}{edu.school && edu.graduationDate ? ' · ' : ''}{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-[35%] flex-shrink-0 space-y-5">
            {skills.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#2E86AB] uppercase tracking-[0.18em] mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="text-[12px] text-[#6D6D6D] bg-white border border-[#2E86AB]/20 px-3 py-1.5">{s}</span>)}</div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#2E86AB] uppercase tracking-[0.18em] mb-3">Certifications</h2>
                {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#6D6D6D] mb-2">{c.name}<span className="text-[#2E86AB]"> — {c.issuer}</span></p>)}
              </div>
            )}
            {projects && projects.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#2E86AB] uppercase tracking-[0.18em] mb-3">Achievements</h2>
                <div className="bg-white border border-[#2E86AB]/20 p-4 space-y-2">
                  {projects.map((p) => <p key={p.id} className="text-[13px] text-[#6D6D6D]">{p.name}</p>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BoardroomEliteComponent);
