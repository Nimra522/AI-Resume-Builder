import React from 'react';
import { ResumeData } from '../../types';
import { User } from 'lucide-react';

const ForestGreenTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;

  const c = {
    sidebarBg: '#9C9583',
    sidebarText: '#FFFFFF',
    sidebarTextMuted: '#FFFFFFCC',
    sidebarAccent: '#E2D4B7',
    skillBg: 'rgba(226,212,183,0.15)',
    mainBg: '#FFFFFF',
    headingText: '#111111',
    accent: '#9C9583',
    accentLight: '#A1A499',
    bodyText: '#111111',
    mutedText: '#B0BBBF',
    divider: '#CADBC8',
    highlight: '#E2D4B7',
  };

  return (
    <div className="w-full font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px', backgroundColor: c.mainBg, color: c.bodyText }}>
      <div className="flex min-h-[1122px]">
        <div className="w-[30%] flex-shrink-0 pt-[30px] pb-[30px] pl-[20px] pr-[20px] flex flex-col" style={{ backgroundColor: c.sidebarBg }}>
          <div className="flex justify-center mb-5">
            <div className="w-[100px] h-[100px] overflow-hidden border-2 flex items-center justify-center" style={{ borderColor: `${c.sidebarAccent}80`, backgroundColor: c.mainBg }}>
              {personalInfo.photoUrl ? <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" /> : <User size={36} style={{ color: c.sidebarBg }} />}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-[15px] font-semibold tracking-wider" style={{ color: c.sidebarText }}>CONTACT</h2>
            <div className="w-8 h-px mt-2 mb-4" style={{ backgroundColor: c.sidebarAccent }} />
            <div className="space-y-3 text-[12px] leading-[1.6] break-all" style={{ color: c.sidebarTextMuted }}>
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.email && <p>{personalInfo.email}</p>}
              {personalInfo.location && <p>{personalInfo.location}</p>}
            </div>
          </div>
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[15px] font-semibold tracking-wider" style={{ color: c.sidebarText }}>SKILLS</h2>
              <div className="w-8 h-px mt-2 mb-4" style={{ backgroundColor: c.sidebarAccent }} />
              <div className="flex flex-wrap gap-2">{skills.map((s, i) => (
                <span key={i} className="text-[12px] px-3 py-1.5" style={{ color: c.sidebarText, backgroundColor: c.skillBg }}>{s}</span>
              ))}</div>
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-[15px] font-semibold tracking-wider" style={{ color: c.sidebarText }}>CERTIFICATIONS</h2>
              <div className="w-8 h-px mt-2 mb-4" style={{ backgroundColor: c.sidebarAccent }} />
              <div className="space-y-2">{certifications.map((cert) => (
                <p key={cert.id} className="text-[12px]" style={{ color: c.sidebarTextMuted }}>
                  {cert.name}<span style={{ color: c.sidebarAccent }}> ({cert.issuer})</span>
                </p>
              ))}</div>
            </div>
          )}
        </div>
        <div className="flex-1 pt-[30px] pb-[30px] pl-[24px] pr-[24px]">
          <h1 className="text-[34px] font-bold tracking-tight" style={{ color: c.headingText }}>{personalInfo.fullName || 'Full Name'}</h1>
          <p className="text-[18px] font-medium mt-1.5" style={{ color: c.accent }}>{personalInfo.jobTitle || 'Job Title'}</p>
          <div className="h-px my-4" style={{ backgroundColor: c.divider }} />
          {personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-[16px] font-semibold tracking-wider mb-3" style={{ color: c.accent }}>ABOUT</h2>
              <p className="text-[13px] leading-[1.6] whitespace-pre-wrap" style={{ color: c.bodyText }}>{personalInfo.summary}</p>
            </div>
          )}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[16px] font-semibold tracking-wider mb-4" style={{ color: c.accent }}>EXPERIENCE</h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-[7px] h-[7px]" style={{ backgroundColor: c.accentLight }} />
                      {idx < experience.length - 1 && <div className="w-px flex-1" style={{ backgroundColor: c.divider }} />}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-[15px] font-semibold break-words pr-2" style={{ color: c.headingText }}>{exp.role}</p>
                        <p className="text-[12px] flex-shrink-0" style={{ color: c.accent }}>{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                      </div>
                      <p className="text-[14px] mt-1" style={{ color: c.accentLight }}>{exp.company}</p>
                      {exp.description && <p className="text-[13px] mt-1.5 leading-[1.6]" style={{ color: c.bodyText }}>{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[16px] font-semibold tracking-wider mb-3" style={{ color: c.accent }}>EDUCATION</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="text-[15px] font-semibold" style={{ color: c.headingText }}>{edu.degree}</p>
                  <p className="text-[14px] mt-1" style={{ color: c.bodyText }}>{edu.school}<span style={{ color: c.accent }}> · {edu.graduationDate}</span></p>
                </div>
              ))}
            </div>
          )}
          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-[16px] font-semibold tracking-wider mb-3" style={{ color: c.accent }}>ACHIEVEMENTS</h2>
              {projects.map((p) => <p key={p.id} className="text-[13px] mb-1.5" style={{ color: c.bodyText }}>● {p.name}</p>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ForestGreenTemplate);
