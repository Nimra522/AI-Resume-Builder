import React from 'react';
import { ResumeData } from '../../types';
import { User } from 'lucide-react';

const Template1Component: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;

  const c = {
    sidebarBg: '#424874',
    sidebarText: '#FFFFFF',
    sidebarTextMuted: '#FFFFFFCC',
    sidebarTextDim: '#FFFFFF99',
    sidebarAccent: '#DCD6F7',
    sidebarAccentBorder: '#A6B1E1',
    skillBg: 'rgba(220,214,247,0.15)',
    mainBg: '#FFFFFF',
    headingText: '#1F1F1F',
    accent: '#A6B1E1',
    accentMuted: '#DCD6F7',
    bodyText: '#1F1F1F',
    mutedText: '#6E6E6E',
    divider: '#CACFD6',
    subtle: '#D6E5E3',
  };

  return (
    <div className="w-full font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px', backgroundColor: c.mainBg, color: c.bodyText }}>
      <div className="flex min-h-[1122px]">
        <div className="w-[28%] flex-shrink-0 pt-[30px] pb-[30px] pl-[20px] pr-[20px] flex flex-col items-center" style={{ backgroundColor: c.sidebarBg }}>
          <div className="flex justify-center mb-5">
            <div className="w-[90px] h-[90px] overflow-hidden border-2 flex items-center justify-center" style={{ borderColor: c.sidebarAccentBorder, backgroundColor: c.mainBg }}>
              {personalInfo.photoUrl ? <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" /> : <User size={32} style={{ color: c.sidebarBg }} />}
            </div>
          </div>
          <div className="mb-6 w-full">
            <h2 className="text-[15px] font-semibold tracking-wider text-center" style={{ color: c.sidebarText }}>CONTACT</h2>
            <div className="w-8 h-px mx-auto mt-2 mb-4" style={{ backgroundColor: c.sidebarAccent }} />
            <div className="space-y-3 text-[12px] leading-[1.6] text-center break-all" style={{ color: c.sidebarTextMuted }}>
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.email && <p>{personalInfo.email}</p>}
              {personalInfo.location && <p>{personalInfo.location}</p>}
            </div>
          </div>
          {skills.length > 0 && (
            <div className="mb-6 w-full">
              <h2 className="text-[15px] font-semibold tracking-wider text-center" style={{ color: c.sidebarText }}>SKILLS</h2>
              <div className="w-8 h-px mx-auto mt-2 mb-4" style={{ backgroundColor: c.sidebarAccent }} />
              <div className="flex flex-wrap gap-2 justify-center">{skills.map((s, i) => (
                <span key={i} className="text-[12px] px-3 py-1.5" style={{ color: c.sidebarText, backgroundColor: c.skillBg }}>{s}</span>
              ))}</div>
            </div>
          )}
          {certifications.length > 0 && (
            <div className="w-full">
              <h2 className="text-[15px] font-semibold tracking-wider text-center" style={{ color: c.sidebarText }}>LANGUAGES</h2>
              <div className="w-8 h-px mx-auto mt-2 mb-4" style={{ backgroundColor: c.sidebarAccent }} />
              <div className="text-center space-y-2">{certifications.map((cert) => (
                <p key={cert.id} className="text-[12px]" style={{ color: c.sidebarTextMuted }}>{cert.name}<span style={{ color: c.sidebarTextDim }}> ({cert.issuer})</span></p>
              ))}</div>
            </div>
          )}
        </div>
        <div className="flex-1 pt-[30px] pb-[30px] pl-[24px] pr-[24px]">
          <h1 className="text-[32px] font-light tracking-[0.03em]" style={{ color: c.headingText }}>{personalInfo.fullName || 'Full Name'}</h1>
          <p className="text-[18px] uppercase tracking-[0.25em] font-medium mt-2" style={{ color: c.accent }}>{personalInfo.jobTitle || 'Executive'}</p>
          <div className="h-px mb-5 mt-4" style={{ backgroundColor: c.divider }} />
          {personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-[16px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: c.accent }}>Profile</h2>
              <p className="text-[13px] leading-[1.6] whitespace-pre-wrap" style={{ color: c.mutedText }}>{personalInfo.summary}</p>
            </div>
          )}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[16px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: c.accent }}>Experience</h2>
              <div className="space-y-3">
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-[7px] h-[7px]" style={{ backgroundColor: c.accent }} />
                      {idx < experience.length - 1 && <div className="w-px flex-1" style={{ backgroundColor: c.divider }} />}
                    </div>
                    <div className="flex-1 pb-3">
                      <p className="text-[15px] font-medium break-words" style={{ color: c.headingText }}>{exp.role}</p>
                      <p className="text-[14px] mt-1" style={{ color: c.accent }}>{exp.company}</p>
                      <p className="text-[12px] mt-1" style={{ color: c.mutedText }}>{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                      {exp.description && <p className="text-[13px] mt-2 leading-[1.6]" style={{ color: c.mutedText }}>{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-6">
            <div className="flex-1">
              {education.length > 0 && (
                <div>
                  <h2 className="text-[16px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: c.accent }}>Education</h2>
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-3">
                      <p className="text-[15px] font-medium" style={{ color: c.headingText }}>{edu.degree}</p>
                      <p className="text-[14px] mt-1" style={{ color: c.mutedText }}>{edu.school}{edu.school && edu.graduationDate ? ' · ' : ''}{edu.graduationDate}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {projects && projects.length > 0 && (
              <div className="w-[35%] flex-shrink-0">
                <h2 className="text-[16px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: c.accent }}>Achievements</h2>
                {projects.map((p) => <p key={p.id} className="text-[13px] mb-1.5" style={{ color: c.mutedText }}>— {p.name}</p>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Template1Component);
