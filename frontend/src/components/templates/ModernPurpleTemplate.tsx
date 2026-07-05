import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Linkedin, User } from 'lucide-react';

const ModernPurpleTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-[#FEFCF9] text-[#1F2937] font-['Inter',sans-serif] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      <div className="flex min-h-[1122px]">

        {/* Left Sidebar — Dark Navy */}
        <div className="w-[33%] flex-shrink-0 bg-[#1A2A3A] pt-8 pb-8 px-6 flex flex-col items-center relative">
          <div className="w-[110px] h-[110px] rounded-full overflow-hidden border-[3px] border-[#C49A6C]/50 bg-[#2D4A5A] flex items-center justify-center shadow-lg mb-5">
            {personalInfo.photoUrl ? (
              <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <User size={40} className="text-[#C49A6C]/60" />
            )}
          </div>

          <h1 className="text-[22px] font-bold text-white leading-tight text-center w-full font-['Playfair_Display',Georgia,serif]">
            {personalInfo.fullName || 'Full Name'}
          </h1>
          <p className="text-[12px] text-[#C49A6C] uppercase tracking-[0.22em] font-medium mt-1.5 text-center w-full">
            {personalInfo.jobTitle || 'Professional Title'}
          </p>

          <div className="w-12 h-[2px] bg-[#C49A6C] mx-auto mt-4 mb-5" />

          <div className="w-full space-y-2.5 text-[12px]">
            {personalInfo.phone && (
              <div className="flex items-center gap-2.5 w-full">
                <div className="w-7 h-7 rounded-full bg-[#C49A6C]/15 flex items-center justify-center flex-shrink-0">
                  <Phone size={12} className="text-[#C49A6C]" />
                </div>
                <span dir="ltr" className="text-white/80">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-2.5 w-full">
                <div className="w-7 h-7 rounded-full bg-[#C49A6C]/15 flex items-center justify-center flex-shrink-0">
                  <Mail size={12} className="text-[#C49A6C]" />
                </div>
                <span className="text-white/80 break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2.5 w-full">
                <div className="w-7 h-7 rounded-full bg-[#C49A6C]/15 flex items-center justify-center flex-shrink-0">
                  <MapPin size={12} className="text-[#C49A6C]" />
                </div>
                <span className="text-white/80">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2.5 w-full">
                <div className="w-7 h-7 rounded-full bg-[#C49A6C]/15 flex items-center justify-center flex-shrink-0">
                  <Linkedin size={12} className="text-[#C49A6C]" />
                </div>
                <span className="text-white/80 break-all">{personalInfo.linkedin}</span>
              </div>
            )}
          </div>

          <div className="w-full border-t border-white/10 my-5" />

          {skills.length > 0 && (
            <div className="w-full">
              <h2 className="text-[11px] font-bold text-[#C49A6C] uppercase tracking-[0.18em] mb-3">Expertise</h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <span key={i} className="inline-block px-3 py-1 rounded-full border border-white/15 text-white/70 text-[11px] leading-relaxed">{s}</span>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="w-full mt-5">
              <h2 className="text-[11px] font-bold text-[#C49A6C] uppercase tracking-[0.18em] mb-3">Credentials</h2>
              <div className="space-y-2">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <p className="text-[12px] font-medium text-white">{c.name}</p>
                    <p className="text-[11px] text-white/50">{c.issuer}{c.date ? ` · ${c.date}` : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex-1 pt-8 pb-8 px-7 space-y-5">

          {personalInfo.summary && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[12px] font-bold text-[#1A2A3A] uppercase tracking-[0.15em]">About</span>
                <div className="flex-1 h-px bg-[#E5E7EB]" />
              </div>
              <p className="text-[12px] text-[#6B7280] leading-[1.9] whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[12px] font-bold text-[#1A2A3A] uppercase tracking-[0.15em]">Experience</span>
                <div className="flex-1 h-px bg-[#E5E7EB]" />
              </div>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-[2px] border-[#C49A6C]/30 pl-4">
                    <div className="flex justify-between items-baseline">
                      <p className="text-[14px] font-bold text-[#1F2937]">{exp.role}</p>
                      <p className="text-[11px] text-[#8B7E74] whitespace-nowrap ml-2 flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="text-[12px] text-[#C49A6C] font-medium mt-0.5">{exp.company}</p>
                    {exp.description && (
                      <ul className="mt-1 space-y-0.5">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px] text-[#6B7280] leading-[1.7]">
                            <span className="text-[#C49A6C] mt-0.5 flex-shrink-0">&#x2022;</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[12px] font-bold text-[#1A2A3A] uppercase tracking-[0.15em]">Education</span>
                <div className="flex-1 h-px bg-[#E5E7EB]" />
              </div>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C49A6C] mt-1.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <p className="text-[14px] font-bold text-[#1F2937]">{edu.degree}</p>
                        <p className="text-[11px] text-[#8B7E74] whitespace-nowrap ml-2">{edu.graduationDate}</p>
                      </div>
                      <p className="text-[12px] text-[#6B7280]">{edu.school}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[12px] font-bold text-[#1A2A3A] uppercase tracking-[0.15em]">Projects</span>
                <div className="flex-1 h-px bg-[#E5E7EB]" />
              </div>
              <div className="space-y-2">
                {projects.map((proj) => (
                  <div key={proj.id} className="border border-[#E5E7EB] bg-white rounded-lg p-3.5">
                    <p className="text-[14px] font-bold text-[#1F2937]">{proj.name}</p>
                    {proj.description && <p className="text-[11px] text-[#6B7280] mt-1 leading-[1.7]">{proj.description}</p>}
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

export default React.memo(ModernPurpleTemplate);
