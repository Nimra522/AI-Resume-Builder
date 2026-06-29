import React from 'react';
import { ResumeData } from '../../types';
import { User } from 'lucide-react';

const ExecutiveVogueComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#222222] font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="flex min-h-[1122px]">
        <div className="w-[30%] flex-shrink-0 bg-[#111111] pt-[30px] pb-[30px] pl-[20px] pr-[20px] flex flex-col items-center">
          <div className="flex justify-center mb-5">
            <div className="w-[100px] h-[100px] overflow-hidden border-2 border-white/30 bg-[#FFFFFF] flex items-center justify-center">
              {personalInfo.photoUrl ? <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" /> : <User size={36} className="text-[#2563EB]" />}
            </div>
          </div>
          <div className="mb-6 w-full">
            <h2 className="text-[15px] font-semibold text-white tracking-wider text-center">CONTACT</h2>
            <div className="w-8 h-px bg-white/30 mx-auto mt-2 mb-4" />
            <div className="text-white/80 space-y-3 text-[12px] leading-[1.6] text-center break-all">
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.email && <p>{personalInfo.email}</p>}
              {personalInfo.location && <p>{personalInfo.location}</p>}
            </div>
          </div>
          {skills.length > 0 && (
            <div className="mb-6 w-full">
              <h2 className="text-[15px] font-semibold text-white tracking-wider text-center">SKILLS</h2>
              <div className="w-8 h-px bg-white/30 mx-auto mt-2 mb-4" />
              <div className="flex flex-wrap gap-2 justify-center">{skills.map((s, i) => <span key={i} className="text-[12px] text-white/90 bg-white/10 px-3 py-1.5">{s}</span>)}</div>
            </div>
          )}
          {certifications.length > 0 && (
            <div className="w-full">
              <h2 className="text-[15px] font-semibold text-white tracking-wider text-center">CERTIFICATIONS</h2>
              <div className="w-8 h-px bg-white/30 mx-auto mt-2 mb-4" />
              <div className="text-center space-y-2">{certifications.map((c) => <p key={c.id} className="text-[12px] text-white/80">{c.name}<span className="text-white/50"> ({c.issuer})</span></p>)}</div>
            </div>
          )}
        </div>
        <div className="flex-1 pt-[30px] pb-[30px] pl-[24px] pr-[24px]">
          <h1 className="text-[32px] font-['Georgia',serif] text-[#222222]">{personalInfo.fullName || 'Full Name'}</h1>
          <p className="text-[18px] text-[#2563EB] uppercase tracking-[0.2em] font-medium mt-2">{personalInfo.jobTitle || 'Executive'}</p>
          <div className="w-full h-px bg-[#9CA3AF]/30 my-5" />
          {personalInfo.summary && (
            <div className="mb-6">
              <p className="text-[13px] text-[#777777] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[16px] font-semibold text-[#2563EB] uppercase tracking-[0.18em] mb-4">Career</h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="flex gap-4">
                    <div className="w-16 flex-shrink-0 pt-1">
                      <p className="text-[12px] text-[#777777]">{exp.startDate}{exp.startDate && exp.endDate ? '–' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-[#222222] break-words">{exp.role}</p>
                      <p className="text-[14px] text-[#2563EB] mt-1">{exp.company}</p>
                      {exp.description && <p className="text-[13px] text-[#777777] mt-2 leading-[1.6]">{exp.description}</p>}
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
                  <h2 className="text-[16px] font-semibold text-[#2563EB] uppercase tracking-[0.18em] mb-3">Education</h2>
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-3">
                      <p className="text-[15px] font-medium text-[#222222]">{edu.degree}</p>
                      <p className="text-[14px] text-[#777777] mt-1">{edu.school}{edu.school && edu.graduationDate ? ' · ' : ''}{edu.graduationDate}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-[35%] flex-shrink-0 space-y-4">
              {projects && projects.length > 0 && (
                <div>
                  <h2 className="text-[16px] font-semibold text-[#2563EB] uppercase tracking-[0.18em] mb-3">Achievements</h2>
                  {projects.map((p) => <p key={p.id} className="text-[13px] text-[#777777] mb-1.5">— {p.name}</p>)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExecutiveVogueComponent);
