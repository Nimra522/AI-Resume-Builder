import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, User, Linkedin } from 'lucide-react';

const EmpireExecutiveComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#222222] font-['Poppins',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="px-9 pt-8 pb-5">
        <div className="flex items-start gap-7">
          <div className="w-[72px] h-[72px] overflow-hidden border-2 border-[#3498DB]/30 bg-[#FFFFFF] flex items-center justify-center flex-shrink-0">
            {personalInfo.photoUrl ? <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" /> : <User size={28} className="text-[#3498DB]" />}
          </div>
          <div className="flex-1">
            <h1 className="text-[30px] font-bold text-[#222222] tracking-[-0.01em]">{personalInfo.fullName || 'Full Name'}</h1>
            <p className="text-[18px] text-[#3498DB] uppercase tracking-[0.2em] font-medium mt-2">{personalInfo.jobTitle || 'Executive'}</p>
            <div className="flex gap-4 mt-3 text-[13px] text-[#777777]">
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.email && <span className="break-all">{personalInfo.email}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.linkedin && <span className="break-all">{personalInfo.linkedin}</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-9 h-px bg-[#2C3E50]/15" />
      <div className="px-9 py-5">
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-[16px] font-bold text-[#1F2937] uppercase tracking-[0.25em] mb-3">Profile</h2>
            <p className="text-[13px] text-[#777777] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[16px] font-bold text-[#1F2937] uppercase tracking-[0.25em] mb-4">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="bg-white border border-[#2C3E50]/10 p-4">
                  <div className="flex justify-between items-baseline">
                    <p className="text-[15px] font-semibold text-[#222222] break-words pr-2">{exp.role}</p>
                    <p className="text-[12px] text-[#777777] flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-[14px] text-[#3498DB] mt-1.5">{exp.company}</p>
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
                <h2 className="text-[16px] font-bold text-[#1F2937] uppercase tracking-[0.25em] mb-3">Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <p className="text-[15px] font-medium text-[#222222]">{edu.degree}</p>
                    <p className="text-[14px] text-[#777777] mt-1">{edu.school}{edu.school && edu.graduationDate ? ' · ' : ''}{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-[35%] flex-shrink-0 space-y-5">
            {skills.length > 0 && (
              <div>
                <h2 className="text-[16px] font-bold text-[#1F2937] uppercase tracking-[0.25em] mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="text-[12px] text-[#777777] bg-[#FFFFFF] border border-[#3498DB]/20 px-3 py-1.5">{s}</span>)}</div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-[16px] font-bold text-[#1F2937] uppercase tracking-[0.25em] mb-3">Certifications</h2>
                {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#777777] mb-2">{c.name}<span className="text-[#3498DB]"> ({c.issuer})</span></p>)}
              </div>
            )}
            {projects && projects.length > 0 && (
              <div>
                <h2 className="text-[16px] font-bold text-[#1F2937] uppercase tracking-[0.25em] mb-3">Achievements</h2>
                <ul className="list-disc list-outside pl-4 text-[13px] text-[#777777] space-y-1.5">{projects.map((p) => <li key={p.id}>{p.name}</li>)}</ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EmpireExecutiveComponent);
