import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, User } from 'lucide-react';

const HeritageCorporateComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#222222] font-['Georgia',serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="mx-9 pt-8">
        <div className="h-[2px] bg-[#374151]/40" />
      </div>
      <div className="px-9 pt-7 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[32px] font-bold text-[#222222] tracking-[0.04em]">{personalInfo.fullName || 'Full Name'}</h1>
            <p className="text-[18px] text-[#60A5FA] italic mt-2">{personalInfo.jobTitle || 'Executive'}</p>
          </div>
          <div className="w-[60px] h-[60px] overflow-hidden bg-[#FFFFFF] border border-[#60A5FA]/30 flex items-center justify-center flex-shrink-0">
            {personalInfo.photoUrl ? <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" /> : <User size={22} className="text-[#60A5FA]" />}
          </div>
        </div>
        <div className="flex gap-5 mt-4 text-[13px] text-[#777777]">
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span className="break-all">{personalInfo.email}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>
      <div className="mx-9 mb-5 h-px bg-[#374151]/15" />
      <div className="px-9 pb-8">
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-[16px] font-bold text-[#60A5FA] uppercase tracking-[0.18em] mb-3">Profile</h2>
            <div className="w-12 h-px bg-[#60A5FA]/30 mb-3" />
            <p className="text-[13px] text-[#777777] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[16px] font-bold text-[#60A5FA] uppercase tracking-[0.18em] mb-4">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-[3px] border-[#60A5FA]/30 pl-4">
                  <div className="flex justify-between items-baseline">
                    <p className="text-[15px] font-bold text-[#222222] break-words pr-2">{exp.role}</p>
                    <p className="text-[12px] text-[#60A5FA] italic flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-[14px] text-[#777777] italic mt-1">{exp.company}</p>
                  {exp.description && <p className="text-[13px] text-[#777777] mt-2 leading-[1.6]">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-6">
          <div className="flex-1">
            {education.length > 0 && (
              <div>
                <h2 className="text-[16px] font-bold text-[#60A5FA] uppercase tracking-[0.18em] mb-3">Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <p className="text-[15px] font-bold text-[#222222]">{edu.degree}</p>
                    <p className="text-[14px] text-[#777777] italic mt-1">{edu.school}{edu.school && edu.graduationDate ? ' · ' : ''}{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-[35%] flex-shrink-0 space-y-5">
            {skills.length > 0 && (
              <div>
                <h2 className="text-[16px] font-bold text-[#60A5FA] uppercase tracking-[0.18em] mb-3">Skills</h2>
                {skills.map((s, i) => <p key={i} className="text-[13px] text-[#777777] italic border-b border-[#60A5FA]/10 pb-2 mb-2">{s}</p>)}
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-[16px] font-bold text-[#60A5FA] uppercase tracking-[0.18em] mb-3">Certifications</h2>
                {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#777777] italic mb-2">{c.name}<span className="text-[#60A5FA]"> ({c.issuer})</span></p>)}
              </div>
            )}
            {projects.length > 0 && (
              <div>
                <h2 className="text-[16px] font-bold text-[#60A5FA] uppercase tracking-[0.18em] mb-3">Projects</h2>
                {projects.map((proj) => <p key={proj.id} className="text-[13px] text-[#777777] italic mb-2">{proj.name}{proj.description ? <span className="text-[#777777]"> — {proj.description}</span> : ''}</p>)}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mx-9 pb-8">
        <div className="h-[2px] bg-[#374151]/40" />
      </div>
    </div>
  );
};

export default React.memo(HeritageCorporateComponent);
