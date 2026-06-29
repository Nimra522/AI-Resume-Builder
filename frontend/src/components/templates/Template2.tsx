import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, User } from 'lucide-react';

const Template2Component: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#222222] font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="px-9 pt-8 pb-4">
        <div className="flex items-center gap-5 mb-4">
          <div className="w-[64px] h-[64px] overflow-hidden border-2 border-[#C98F8F]/30 bg-white flex items-center justify-center flex-shrink-0">
            {personalInfo.photoUrl ? <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" /> : <User size={26} className="text-[#C98F8F]" />}
          </div>
          <div>
            <h1 className="text-[30px] font-medium text-[#222222] tracking-[0.02em]">{personalInfo.fullName || 'Full Name'}</h1>
            <p className="text-[18px] text-[#C98F8F] uppercase tracking-[0.22em] font-medium mt-2">{personalInfo.jobTitle || 'Executive'}</p>
          </div>
        </div>
        <div className="flex gap-5 text-[13px] text-[#707070]">
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span className="break-all">{personalInfo.email}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>
      <div className="mx-9 h-px bg-[#E9D9D9]" />
      <div className="px-9 pt-5 pb-8">
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-[#C98F8F] uppercase tracking-[0.2em] mb-3">About</h2>
            <p className="text-[13px] text-[#707070] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold text-[#C98F8F] uppercase tracking-[0.2em] mb-4">Experience</h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="bg-[#FFF9F9] border border-[#E9D9D9] p-4">
                  <div className="flex justify-between items-baseline">
                    <p className="text-[15px] font-medium text-[#222222] break-words pr-2">{exp.role}</p>
                    <p className="text-[12px] text-[#707070] flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-[14px] text-[#C98F8F] mt-1.5">{exp.company}</p>
                  {exp.description && <p className="text-[13px] text-[#707070] mt-2 leading-[1.6]">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-6">
          <div className="flex-1">
            {education.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#C98F8F] uppercase tracking-[0.2em] mb-3">Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <p className="text-[15px] font-medium text-[#222222]">{edu.degree}</p>
                    <p className="text-[14px] text-[#707070] mt-1">{edu.school}{edu.school && edu.graduationDate ? ' · ' : ''}{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            )}
            {projects && projects.length > 0 && (
              <div className="mt-4">
                <h2 className="text-[16px] font-semibold text-[#C98F8F] uppercase tracking-[0.2em] mb-3">Achievements</h2>
                <div className="flex flex-wrap gap-2">{projects.map((p) => <span key={p.id} className="text-[12px] text-[#707070] bg-[#FFF9F9] border border-[#E9D9D9] px-2.5 py-1">{p.name}</span>)}</div>
              </div>
            )}
          </div>
          <div className="w-[33%] flex-shrink-0 space-y-4">
            {skills.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#C98F8F] uppercase tracking-[0.2em] mb-3">Skills</h2>
                <div className="space-y-2">{skills.map((s, i) => <p key={i} className="text-[13px] text-[#707070] border-b border-[#E9D9D9] pb-2">{s}</p>)}</div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#C98F8F] uppercase tracking-[0.2em] mb-3">Languages</h2>
                {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#707070] mb-2">{c.name}<span className="text-[#C98F8F]"> ({c.issuer})</span></p>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Template2Component);
