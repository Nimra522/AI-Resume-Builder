import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, User, Linkedin } from 'lucide-react';

const ExecutivePrestigeComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FFFFFF] text-[#1C1C1C] font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="bg-white mx-8 my-8">
        <div className="pt-[30px] pb-[16px] pl-[24px] pr-[24px]">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[32px] font-light text-[#1C1C1C] tracking-[0.03em] font-['Georgia',serif]">{personalInfo.fullName || 'Full Name'}</h1>
              <p className="text-[18px] text-[#D4AF37] uppercase tracking-[0.2em] font-medium mt-2">{personalInfo.jobTitle || 'Executive Title'}</p>
            </div>
            <div className="w-[100px] h-[100px] overflow-hidden border border-[#D4AF37]/40 bg-[#FFFFFF] flex items-center justify-center flex-shrink-0 ml-4">
              {personalInfo.photoUrl ? <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" /> : <User size={36} className="text-[#D4AF37]" />}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 pt-4 border-t border-[#0B1F3B]/10 text-[13px] text-[#777777] uppercase tracking-[0.12em]">
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={12} className="text-[#D4AF37]" />{personalInfo.phone}</span>}
            {personalInfo.email && <span className="flex items-center gap-1"><Mail size={12} className="text-[#D4AF37]" /><span className="break-all">{personalInfo.email}</span></span>}
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={12} className="text-[#D4AF37]" />{personalInfo.location}</span>}
            {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={12} className="text-[#D4AF37]" /><span className="break-all">{personalInfo.linkedin}</span></span>}
          </div>
        </div>
        <div className="flex">
          <div className="w-[35%] pl-[24px] pr-[20px] py-5 space-y-5 bg-[#F8F9FB]">
            {personalInfo.summary && (
              <div>
                <h2 className="text-[15px] font-semibold text-[#D4AF37] uppercase tracking-[0.18em] mb-3">Leadership</h2>
                <p className="text-[12px] text-[#777777] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
              </div>
            )}
            {skills.length > 0 && (
              <div>
                <h2 className="text-[15px] font-semibold text-[#D4AF37] uppercase tracking-[0.18em] mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="text-[12px] text-[#777777] bg-white border border-[#D4AF37]/15 px-3 py-1.5">{s}</span>)}</div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-[15px] font-semibold text-[#D4AF37] uppercase tracking-[0.18em] mb-3">Certifications</h2>
                {certifications.map((c) => <p key={c.id} className="text-[12px] text-[#777777] mb-2">{c.name}<span className="text-[#D4AF37]"> — {c.issuer}</span></p>)}
              </div>
            )}
          </div>
          <div className="w-px bg-[#0B1F3B]/15" />
          <div className="flex-1 pl-[20px] pr-[24px] py-5 space-y-5">
            {experience.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#D4AF37] uppercase tracking-[0.18em] mb-4">Experience</h2>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <p className="text-[15px] font-medium text-[#1C1C1C] break-words pr-2">{exp.role}</p>
                        <p className="text-[12px] text-[#777777] flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? '–' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                      </div>
                      <p className="text-[14px] text-[#D4AF37] mt-1">{exp.company}</p>
                      {exp.description && <p className="text-[13px] text-[#777777] mt-2 leading-[1.6]">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {education.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#D4AF37] uppercase tracking-[0.18em] mb-3">Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <p className="text-[15px] font-medium text-[#1C1C1C]">{edu.degree}</p>
                    <p className="text-[14px] text-[#777777] mt-1">{edu.school}{edu.school && edu.graduationDate ? ' · ' : ''}{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            )}
            {projects && projects.length > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold text-[#D4AF37] uppercase tracking-[0.18em] mb-3">Achievements</h2>
                <div className="space-y-2">
                  {projects.map((p) => (
                    <div key={p.id} className="flex items-start gap-2">
                      <span className="w-[4px] h-[4px] bg-[#D4AF37] mt-2 flex-shrink-0" />
                      <p className="text-[13px] text-[#777777]">{p.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExecutivePrestigeComponent);
