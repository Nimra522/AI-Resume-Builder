import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, User } from 'lucide-react';

const ChairmanSignatureComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#202020] font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="px-9 pt-10 pb-5">
        <h1 className="text-[34px] font-['Georgia',serif] text-[#202020] italic tracking-[0.03em] leading-tight">{personalInfo.fullName || 'Full Name'}</h1>
        <p className="text-[18px] text-[#16A34A] uppercase tracking-[0.22em] font-medium mt-3">{personalInfo.jobTitle || 'Chairman'}</p>
      </div>
      <div className="mx-9 h-px bg-[#0F172A]/15" />
      <div className="flex items-center gap-5 mx-9 py-3 text-[13px] text-[#777777] uppercase tracking-[0.1em]">
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.email && <span className="break-all">{personalInfo.email}</span>}
        {personalInfo.location && <span>{personalInfo.location}</span>}
      </div>
      <div className="mx-9 h-px bg-[#0F172A]/15" />
      <div className="flex px-9 pt-6 pb-8 gap-7">
        <div className="flex-1 space-y-5">
          {personalInfo.summary && (
            <div>
              <h2 className="text-[16px] font-bold text-[#202020] uppercase tracking-[0.16em] mb-3">Profile</h2>
              <p className="text-[13px] text-[#777777] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}
          {experience.length > 0 && (
            <div>
              <h2 className="text-[16px] font-bold text-[#202020] uppercase tracking-[0.16em] mb-4">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <p className="text-[15px] font-semibold text-[#202020] break-words pr-2">{exp.role}</p>
                      <p className="text-[12px] text-[#777777] flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="text-[14px] text-[#16A34A] mt-1">{exp.company}</p>
                    {exp.description && <p className="text-[13px] text-[#777777] mt-2 leading-[1.6]">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-[35%] flex-shrink-0 space-y-5">
          <div>
            <h2 className="text-[16px] font-bold text-[#202020] uppercase tracking-[0.16em] mb-3">Skills</h2>
            <div className="space-y-2">{skills.map((s, i) => <p key={i} className="text-[13px] text-[#777777]">{s}</p>)}</div>
          </div>
          {education.length > 0 && (
            <div>
              <h2 className="text-[16px] font-bold text-[#202020] uppercase tracking-[0.16em] mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3 border border-[#64748B]/20 bg-white p-3">
                  <p className="text-[15px] font-medium text-[#202020]">{edu.degree}</p>
                  <p className="text-[14px] text-[#777777] mt-1">{edu.school}</p>
                  <p className="text-[12px] text-[#16A34A] mt-1">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-[16px] font-bold text-[#202020] uppercase tracking-[0.16em] mb-3">Certifications</h2>
              {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#777777] mb-2">{c.name}<span className="text-[#16A34A]"> — {c.issuer}</span></p>)}
            </div>
          )}
          {projects.length > 0 && (
            <div>
              <h2 className="text-[16px] font-bold text-[#202020] uppercase tracking-[0.16em] mb-3">Projects</h2>
              {projects.map((proj) => <p key={proj.id} className="text-[13px] text-[#777777] mb-2">{proj.name}<span className="text-[#777777]">{proj.description ? ` — ${proj.description}` : ''}</span></p>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChairmanSignatureComponent);
