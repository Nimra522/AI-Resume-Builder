import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, User, Linkedin } from 'lucide-react';

const LegacyCEOComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FEFCF8] text-[#1C1C1C] font-['Georgia',serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="px-9 pt-10 pb-5">
        <div className="text-center">
          <h1 className="text-[36px] font-bold text-[#1C1C1C] tracking-[0.08em] uppercase">{personalInfo.fullName || 'Full Name'}</h1>
          <div className="w-24 h-px bg-[#C9A227] mx-auto my-4" />
          <p className="text-[18px] text-[#C9A227] italic tracking-[0.12em]">{personalInfo.jobTitle || 'Chief Executive'}</p>
        </div>
        <div className="flex justify-center gap-6 mt-5 text-[13px] text-[#777777]">
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span className="break-all">{personalInfo.email}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="break-all">{personalInfo.linkedin}</span>}
        </div>
      </div>
      <div className="mx-9 h-px bg-[#000000]/10" />
      <div className="flex px-9 pt-6 pb-8 gap-7">
        <div className="w-[30%] flex-shrink-0 space-y-5">
          <div className="w-full aspect-square rounded-full overflow-hidden border-2 border-[#C9A227]/30 shadow-sm">
            {personalInfo.photoUrl ? (
              <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#F5F0E8] flex items-center justify-center">
                <User size={32} className="text-[#C9A227]" />
              </div>
            )}
          </div>
          {personalInfo.summary && (
            <div>
              <h2 className="text-[16px] font-bold text-[#C9A227] uppercase tracking-[0.18em] mb-3">About</h2>
              <p className="text-[13px] text-[#777777] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}
          {skills.length > 0 && (
            <div>
              <h2 className="text-[16px] font-bold text-[#C9A227] uppercase tracking-[0.18em] mb-3">Core Skills</h2>
              <div className="space-y-2">{skills.map((s, i) => <p key={i} className="text-[13px] text-[#777777] italic">{s}</p>)}</div>
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-[16px] font-bold text-[#C9A227] uppercase tracking-[0.18em] mb-3">Certifications</h2>
              {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#777777] mb-2">{c.name}<span className="text-[#C9A227]"> — {c.issuer}</span></p>)}
            </div>
          )}
        </div>
        <div className="w-px bg-[#000000]/10" />
        <div className="flex-1 pl-3 space-y-5">
          {experience.length > 0 && (
            <div>
              <h2 className="text-[16px] font-bold text-[#C9A227] uppercase tracking-[0.18em] mb-4">Executive Career</h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <p className="text-[15px] font-bold text-[#1C1C1C] break-words pr-2">{exp.role}</p>
                      <p className="text-[12px] text-[#C9A227] italic flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? '–' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="text-[14px] text-[#777777] italic mt-1">{exp.company}</p>
                    {exp.description && <p className="text-[13px] text-[#777777] mt-2 leading-[1.6]">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {education.length > 0 && (
            <div>
              <h2 className="text-[16px] font-bold text-[#C9A227] uppercase tracking-[0.18em] mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline mb-3 border-b border-[#C9A227]/10 pb-2">
                  <div>
                    <p className="text-[15px] font-medium text-[#1C1C1C]">{edu.degree}</p>
                    <p className="text-[14px] text-[#777777] italic mt-1">{edu.school}</p>
                  </div>
                  <p className="text-[12px] text-[#C9A227] flex-shrink-0">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          )}
          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-[16px] font-bold text-[#C9A227] uppercase tracking-[0.18em] mb-3">Achievements</h2>
              {projects.map((p) => (
                <div key={p.id} className="flex items-start gap-2 mb-2">
                  <span className="text-[#C9A227] text-[14px] leading-none mt-1">✦</span>
                  <p className="text-[13px] text-[#777777]">{p.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(LegacyCEOComponent);
