import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, User } from 'lucide-react';

const RoyalExecutiveComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#222222] font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="px-9 pt-8 pb-4 text-center">
        <div className="w-[70px] h-[70px] overflow-hidden border-2 border-[#FF6B35]/30 bg-[#FFFFFF] flex items-center justify-center mx-auto mb-4">
          {personalInfo.photoUrl ? <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" /> : <User size={26} className="text-[#FF6B35]" />}
        </div>
        <h1 className="text-[30px] font-medium text-[#222222] tracking-[0.04em]">{personalInfo.fullName || 'Full Name'}</h1>
        <div className="w-14 h-px bg-[#FF6B35] mx-auto my-4" />
        <p className="text-[18px] text-[#FF6B35] uppercase tracking-[0.25em] font-medium">{personalInfo.jobTitle || 'Executive'}</p>
        <div className="flex justify-center gap-5 mt-4 text-[13px] text-[#777]">
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={12} className="text-[#FF6B35]" />{personalInfo.phone}</span>}
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={12} className="text-[#FF6B35]" /><span className="break-all">{personalInfo.email}</span></span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={12} className="text-[#FF6B35]" />{personalInfo.location}</span>}
        </div>
      </div>
      <div className="mx-9 h-px bg-[#1E293B]/15" />
      <div className="flex px-9 pt-6 pb-8 gap-6">
        <div className="w-[35%] flex-shrink-0 space-y-5">
          {personalInfo.summary && (
            <div>
              <h2 className="text-[16px] font-medium text-[#FF6B35] uppercase tracking-[0.18em] mb-3">About</h2>
              <p className="text-[13px] text-[#777] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}
          {skills.length > 0 && (
            <div>
              <h2 className="text-[16px] font-medium text-[#FF6B35] uppercase tracking-[0.18em] mb-3">Skills</h2>
              <div className="space-y-2">{skills.map((s, i) => <p key={i} className="text-[13px] text-[#777] border-b border-[#FF6B35]/10 pb-2">{s}</p>)}</div>
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-[16px] font-medium text-[#FF6B35] uppercase tracking-[0.18em] mb-3">Certifications</h2>
              {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#777] mb-2">{c.name}<span className="text-[#FF6B35]"> ({c.issuer})</span></p>)}
            </div>
          )}
        </div>
        <div className="w-px bg-[#1E293B]/15" />
        <div className="flex-1 space-y-5">
          {experience.length > 0 && (
            <div>
              <h2 className="text-[16px] font-medium text-[#FF6B35] uppercase tracking-[0.18em] mb-4">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <p className="text-[15px] font-semibold text-[#222222] break-words pr-2">{exp.role}</p>
                      <p className="text-[12px] text-[#777] flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? '–' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="text-[14px] text-[#FF6B35] mt-1">{exp.company}</p>
                    {exp.description && <p className="text-[13px] text-[#777] mt-2 leading-[1.6]">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {education.length > 0 && (
            <div>
              <h2 className="text-[16px] font-medium text-[#FF6B35] uppercase tracking-[0.18em] mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="text-[15px] font-medium text-[#222222]">{edu.degree}</p>
                  <p className="text-[14px] text-[#777] mt-1">{edu.school}{edu.school && edu.graduationDate ? ' · ' : ''}{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          )}
          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-[16px] font-medium text-[#FF6B35] uppercase tracking-[0.18em] mb-3">Achievements</h2>
              <div className="space-y-2">
                {projects.map((p) => (
                  <div key={p.id} className="flex items-start gap-2">
                    <span className="w-[3px] h-[3px] bg-[#FF6B35] mt-2 flex-shrink-0" />
                    <p className="text-[13px] text-[#777]">{p.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(RoyalExecutiveComponent);
