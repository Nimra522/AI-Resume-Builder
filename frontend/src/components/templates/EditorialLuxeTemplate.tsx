import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, User, Linkedin } from 'lucide-react';

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block px-4 py-1.5 border border-[#D6C4AF]/50 text-[#555555] text-[10px] tracking-[0.05em] leading-relaxed">{children}</span>
);

const EditorialLuxeComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full min-h-[1122px] bg-[#FCFAF7] text-[#1F1F1F] font-['Inter',sans-serif] shadow-xl mx-auto" style={{ maxWidth: '793px' }}>
      {/* Top decorative line */}
      <div className="h-[3px] bg-[#D6C4AF] mx-8" />

      {/* Header Section — Magazine Spread */}
      <div className="px-10 pt-8 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-[38px] font-extrabold text-[#1F1F1F] leading-[1.05] tracking-[-0.02em] font-['Playfair_Display',Georgia,serif]">{personalInfo.fullName || 'Full Name'}</h1>
            <div className="w-16 h-px bg-[#D6C4AF] my-5" />
            <p className="text-[13px] text-[#555555] uppercase tracking-[0.25em] font-light">{personalInfo.jobTitle || 'Professional Title'}</p>
          </div>
          <div className="w-[68px] h-[68px] overflow-hidden border border-[#D6C4AF] bg-[#EEE6DD] flex items-center justify-center flex-shrink-0 ml-6">
            {personalInfo.photoUrl ? <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" /> : <User size={26} className="text-[#8B7D6B]" />}
          </div>
        </div>

        {/* Contact — horizontal editorial spread */}
        <div className="flex gap-6 mt-6 pt-4 border-t border-[#EEE6DD]">
          {personalInfo.phone && <div className="flex items-center gap-1.5 text-[12px] text-[#555555] tracking-[0.08em] uppercase"><Phone size={9} className="text-[#8B7D6B]" />{personalInfo.phone}</div>}
          {personalInfo.email && <div className="flex items-center gap-1.5 text-[12px] text-[#555555] tracking-[0.08em] uppercase"><Mail size={9} className="text-[#8B7D6B]" /><span className="break-all">{personalInfo.email}</span></div>}
          {personalInfo.location && <div className="flex items-center gap-1.5 text-[12px] text-[#555555] tracking-[0.08em] uppercase"><MapPin size={9} className="text-[#8B7D6B]" />{personalInfo.location}</div>}
          {personalInfo.linkedin && <div className="flex items-center gap-1.5 text-[12px] text-[#555555] tracking-[0.08em] uppercase"><Linkedin size={9} className="text-[#8B7D6B]" /><span className="break-all">{personalInfo.linkedin}</span></div>}
        </div>
      </div>

      {/* About — large editorial section */}
      {personalInfo.summary && (
        <div className="px-10 py-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-['Cormorant_Garamond',Georgia,serif] italic text-[#8B7D6B] tracking-[0.15em] uppercase">About</span>
            <div className="flex-1 h-px bg-[#EEE6DD]" />
          </div>
          <p className="text-[11px] text-[#555555] leading-[1.8] whitespace-pre-wrap font-light tracking-[0.01em]">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience — editorial blocks */}
      {experience.length > 0 && (
        <div className="px-10 py-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-['Cormorant_Garamond',Georgia,serif] italic text-[#8B7D6B] tracking-[0.15em] uppercase">Experience</span>
            <div className="flex-1 h-px bg-[#EEE6DD]" />
          </div>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-[2px] border-[#D6C4AF] pl-4">
                <div className="flex justify-between items-baseline">
                  <p className="text-[12px] font-medium text-[#1F1F1F] tracking-[0.02em]">{exp.role}</p>
                  <p className="text-[11px] text-[#555555] tracking-[0.08em] uppercase">{exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                </div>
                <p className="text-[10px] text-[#555555] mt-0.5 font-['Cormorant_Garamond',Georgia,serif] italic">{exp.company}</p>
                {exp.description && <p className="text-[12px] text-[#555555] mt-1.5 leading-[1.7] font-light">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education — premium cards */}
      {education.length > 0 && (
        <div className="px-10 py-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-['Cormorant_Garamond',Georgia,serif] italic text-[#8B7D6B] tracking-[0.15em] uppercase">Education</span>
            <div className="flex-1 h-px bg-[#EEE6DD]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {education.map((edu) => (
              <div key={edu.id} className="bg-white border border-[#EEE6DD] p-4">
                <p className="text-[11px] font-medium text-[#1F1F1F] tracking-[0.02em]">{edu.degree}</p>
                <p className="text-[12px] text-[#555555] mt-1 font-['Cormorant_Garamond',Georgia,serif] italic">{edu.school}</p>
                <p className="text-[11px] text-[#8B7D6B] mt-1 tracking-[0.1em] uppercase">{edu.graduationDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills + Languages — horizontal spread */}
      <div className="px-10 py-5">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-['Cormorant_Garamond',Georgia,serif] italic text-[#8B7D6B] tracking-[0.15em] uppercase">Expertise</span>
          <div className="flex-1 h-px bg-[#EEE6DD]" />
        </div>
        <div className="flex gap-6">
          {skills.length > 0 && (
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">{skills.map((s, i) => <Pill key={i}>{s}</Pill>)}</div>
            </div>
          )}
          {certifications.length > 0 && (
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {certifications.map((c) => <Pill key={c.id}>{c.name}<span className="text-[#8B7D6B] ml-1">{c.issuer}</span></Pill>)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Achievements */}
      {projects && projects.length > 0 && (
        <div className="px-10 py-5 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-['Cormorant_Garamond',Georgia,serif] italic text-[#8B7D6B] tracking-[0.15em] uppercase">Achievements</span>
            <div className="flex-1 h-px bg-[#EEE6DD]" />
          </div>
          <div className="space-y-1.5">
            {projects.map((p) => (
              <div key={p.id} className="flex items-start gap-3">
                <span className="w-1 h-1 bg-[#D6C4AF] mt-2 flex-shrink-0" />
                <p className="text-[12px] text-[#555555] font-light leading-relaxed">{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom decorative line */}
      <div className="h-[3px] bg-[#D6C4AF] mx-8" />
    </div>
  );
};

export default React.memo(EditorialLuxeComponent);
