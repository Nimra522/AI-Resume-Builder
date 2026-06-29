import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, User } from 'lucide-react';

const PlatinumBoardComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#202020] font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#EC4899]" />
        <div className="pl-7 pr-9 pt-8 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-[34px] font-light text-[#202020] tracking-[0.02em]">{personalInfo.fullName || 'Full Name'}</h1>
              <p className="text-[18px] text-[#6D28D9] uppercase tracking-[0.25em] font-medium mt-2">{personalInfo.jobTitle || 'Board Member'}</p>
            </div>
            <div className="text-right text-[13px] text-[#777777] space-y-1">
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
              {personalInfo.location && <p>{personalInfo.location}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="ml-7 mr-9 h-px bg-[#6D28D9]/20" />
      <div className="pl-7 pr-9 pt-5 pb-8 flex gap-7">
        <div className="flex-1 space-y-5">
          {personalInfo.summary && (
            <div>
              <h2 className="text-[16px] font-semibold text-[#6D28D9] uppercase tracking-[0.2em] mb-3">Overview</h2>
              <p className="text-[13px] text-[#777777] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}
          {experience.length > 0 && (
            <div>
              <h2 className="text-[16px] font-semibold text-[#6D28D9] uppercase tracking-[0.2em] mb-4">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="flex gap-3">
                    <div className="w-3 mt-1.5 flex flex-col items-center">
                      <div className="w-[7px] h-[7px] border border-[#6D28D9] rotate-45" />
                      <div className="w-px flex-1 bg-[#6D28D9]/20 mt-1" />
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="text-[15px] font-semibold text-[#202020] break-words">{exp.role}</p>
                      <p className="text-[14px] text-[#6D28D9] mt-1">{exp.company}</p>
                      <p className="text-[12px] text-[#777777] mt-1">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                      {exp.description && <p className="text-[13px] text-[#777777] mt-2 leading-[1.6]">{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-[30%] flex-shrink-0 space-y-5">
          {skills.length > 0 && (
            <div>
              <h2 className="text-[16px] font-semibold text-[#6D28D9] uppercase tracking-[0.2em] mb-3">Skills</h2>
              <div className="space-y-2">{skills.map((s, i) => <p key={i} className="text-[13px] text-[#777777] border-l border-[#6D28D9]/30 pl-3">{s}</p>)}</div>
            </div>
          )}
          {education.length > 0 && (
            <div>
              <h2 className="text-[16px] font-semibold text-[#6D28D9] uppercase tracking-[0.2em] mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3 bg-white border border-[#6D28D9]/15 p-3">
                  <p className="text-[15px] font-medium text-[#202020]">{edu.degree}</p>
                  <p className="text-[14px] text-[#777777] mt-1">{edu.school}</p>
                  <p className="text-[12px] text-[#6D28D9] mt-1">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-[16px] font-semibold text-[#6D28D9] uppercase tracking-[0.2em] mb-3">Certifications</h2>
              {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#777777] mb-2">{c.name}<span className="text-[#6D28D9]"> — {c.issuer}</span></p>)}
            </div>
          )}
          {projects.length > 0 && (
            <div>
              <h2 className="text-[16px] font-semibold text-[#6D28D9] uppercase tracking-[0.2em] mb-3">Projects</h2>
              {projects.map((proj) => <p key={proj.id} className="text-[13px] text-[#777777] mb-2">{proj.name}{proj.description ? <span className="text-[#777777]"> — {proj.description}</span> : ''}</p>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PlatinumBoardComponent);
