import React from 'react';
import { ResumeData } from '../../types';
import { User } from 'lucide-react';

const ExecutiveHorizonComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#1A1A1A] font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="h-[3px] bg-gradient-to-r from-[#111827] via-[#3B82F6] to-[#111827]" />
      <div className="pt-[30px] pb-[30px] pl-[24px] pr-[24px] flex gap-6">
        <div className="w-[30%] flex-shrink-0 flex flex-col items-start">
          <div className="w-[100px] h-[100px] overflow-hidden border border-[#3B82F6]/40 bg-[#FFFFFF] flex items-center justify-center mb-4">
            {personalInfo.photoUrl ? <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" /> : <User size={36} className="text-[#3B82F6]" />}
          </div>
          <h1 className="text-[24px] font-light text-[#1A1A1A] tracking-[0.04em] leading-tight">{personalInfo.fullName || 'Full Name'}</h1>
          <p className="text-[18px] text-[#3B82F6] uppercase tracking-[0.18em] font-medium mt-2">{personalInfo.jobTitle || 'Executive'}</p>
          <div className="w-12 h-px bg-[#3B82F6]/40 my-4" />
          {personalInfo.summary && <p className="text-[13px] text-[#777777] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>}
          <div className="mt-4 space-y-2 text-[12px] text-[#777777] leading-[1.6] break-all">
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
          </div>
        </div>
        <div className="w-px bg-[#3B82F6]/20" />
        <div className="flex-1 space-y-6">
          {experience.length > 0 && (
            <div>
              <h2 className="text-[16px] font-semibold text-[#3B82F6] uppercase tracking-[0.18em] mb-4">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <p className="text-[15px] font-medium text-[#1A1A1A] break-words">{exp.role}</p>
                    <p className="text-[14px] text-[#3B82F6] mt-1">{exp.company}</p>
                    <p className="text-[12px] text-[#777777] mt-1">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                    {exp.description && <p className="text-[13px] text-[#777777] mt-2 leading-[1.6]">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {education.length > 0 && (
            <div>
              <h2 className="text-[16px] font-semibold text-[#3B82F6] uppercase tracking-[0.18em] mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="text-[15px] font-medium text-[#1A1A1A]">{edu.degree}</p>
                  <p className="text-[14px] text-[#777777] mt-1">{edu.school}</p>
                  <p className="text-[12px] text-[#3B82F6] mt-1">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-5">
            {skills.length > 0 && (
              <div className="flex-1">
                <h2 className="text-[16px] font-semibold text-[#3B82F6] uppercase tracking-[0.18em] mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="text-[12px] text-[#777777] border border-[#3B82F6]/20 px-3 py-1">{s}</span>)}</div>
              </div>
            )}
            {certifications.length > 0 && (
              <div className="flex-1">
                <h2 className="text-[16px] font-semibold text-[#3B82F6] uppercase tracking-[0.18em] mb-3">Certifications</h2>
                {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#777777] mb-2">{c.name}<span className="text-[#3B82F6]"> — {c.issuer}</span></p>)}
              </div>
            )}
            {projects.length > 0 && (
              <div className="flex-1">
                <h2 className="text-[16px] font-semibold text-[#3B82F6] uppercase tracking-[0.18em] mb-3">Projects</h2>
                {projects.map((proj) => <p key={proj.id} className="text-[13px] text-[#777777] mb-2">{proj.name}<span className="text-[#777777]">{proj.description ? ` — ${proj.description}` : ''}</span></p>)}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-[3px] bg-gradient-to-r from-[#111827] via-[#3B82F6] to-[#111827]" />
    </div>
  );
};

export default React.memo(ExecutiveHorizonComponent);
