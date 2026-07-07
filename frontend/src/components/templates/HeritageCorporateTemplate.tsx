import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, User, Linkedin } from 'lucide-react';

const parseSkillLevel = (skill: string): { name: string; level: number } => {
  const colonIdx = skill.lastIndexOf(':');
  if (colonIdx > 0) {
    const num = parseInt(skill.slice(colonIdx + 1), 10);
    if (num >= 1 && num <= 100) return { name: skill.slice(0, colonIdx).trim(), level: num };
  }
  return { name: skill, level: 70 };
};

const HeritageCorporateComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  const fileRef = useRef<HTMLInputElement>(null);
  const [photoSrc, setPhotoSrc] = useState<string>(personalInfo.photoUrl || '');
  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => { setPhotoSrc(ev.target?.result as string); };
      reader.readAsDataURL(file);
    }
  }, []);
  return (
    <div className="w-full bg-white text-[#2C2C2C] font-['Inter',sans-serif] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      <div className="mx-9 pt-7">
        <div className="h-[2px] bg-[#E8E8E8]" />
      </div>

      <div className="px-9 pt-6 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[34px] font-bold text-[#2C2C2C] tracking-[-0.01em] font-['Playfair_Display',Georgia,serif] leading-tight">
              {personalInfo.fullName || 'Full Name'}
            </h1>
            <p className="text-[16px] text-[#5A6A8A] italic mt-2 font-['Inter',sans-serif]">
              {personalInfo.jobTitle || 'Professional Title'}
            </p>
          </div>
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden border-2 border-[#E8E8E8] bg-[#F9F9F9] flex items-center justify-center flex-shrink-0 mt-1 cursor-pointer" onClick={() => fileRef.current?.click()}>
            {photoSrc ? (
              <img src={photoSrc} alt="" className="w-full h-full object-cover" />
            ) : (
              <User size={42} className="text-[#5A6A8A]" />
            )}
          </div>
          <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
        </div>

        {(personalInfo.phone || personalInfo.email || personalInfo.location || personalInfo.linkedin) && (
          <div className="flex gap-5 mt-4 text-[12px] text-[#555555] items-center flex-wrap">
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Phone size={11} className="text-[#5A6A8A]" />
                <span dir="ltr">{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <Mail size={11} className="text-[#5A6A8A]" />
                <span className="break-all">{personalInfo.email}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <MapPin size={11} className="text-[#5A6A8A]" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1.5">
                <Linkedin size={11} className="text-[#5A6A8A]" />
                <span className="break-all">{personalInfo.linkedin}</span>
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mx-9 mb-5">
        <div className="h-px bg-[#E8E8E8]" />
      </div>

      <div className="px-9 pb-7">

        {personalInfo.summary && (
          <div className="mb-7">
            <h2 className="text-[13px] font-bold text-[#3B4A6B] uppercase tracking-[0.15em] mb-2 font-['Playfair_Display',Georgia,serif]">Profile</h2>
            <div className="w-8 h-[2px] bg-[#3B4A6B] mb-3" />
            <p className="text-[11px] text-[#555555] leading-[1.8] whitespace-pre-wrap">{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-7">
            <h2 className="text-[13px] font-bold text-[#3B4A6B] uppercase tracking-[0.15em] mb-2 font-['Playfair_Display',Georgia,serif]">Experience</h2>
            <div className="w-8 h-[2px] bg-[#3B4A6B] mb-4" />
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-[2px] border-[#E8E8E8]">
                  <div className="absolute left-[-4px] top-1.5 w-[6px] h-[6px] rounded-full bg-[#3B4A6B]" />
                  <div className="flex justify-between items-baseline">
                    <p className="text-[13px] font-semibold text-[#2C2C2C]">{exp.role}</p>
                    <p className="text-[11px] text-[#777777] italic whitespace-nowrap ml-2">{exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-[11px] text-[#777777] mt-0.5">{exp.company}</p>
                  {exp.description && <p className="text-[11px] text-[#555555] mt-1.5 leading-[1.7]">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 || skills.length > 0 || certifications.length > 0 || (projects && projects.length > 0) ? (
          <div className="flex gap-8">
            <div className="flex-1">
              {education.length > 0 && (
                <div>
                  <h2 className="text-[13px] font-bold text-[#3B4A6B] uppercase tracking-[0.15em] mb-2 font-['Playfair_Display',Georgia,serif]">Education</h2>
                  <div className="w-8 h-[2px] bg-[#3B4A6B] mb-4" />
                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div key={edu.id}>
                        <p className="text-[13px] font-semibold text-[#2C2C2C]">{edu.degree}</p>
                        <p className="text-[11px] text-[#555555] mt-0.5">{edu.school}</p>
                        {edu.graduationDate && <p className="text-[11px] text-[#777777] italic mt-0.5">{edu.graduationDate}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-[35%] flex-shrink-0 space-y-5">
              {skills.length > 0 && (
                <div>
                  <h2 className="text-[13px] font-bold text-[#3B4A6B] uppercase tracking-[0.15em] mb-2 font-['Playfair_Display',Georgia,serif]">Skills</h2>
                  <div className="w-8 h-[2px] bg-[#3B4A6B] mb-3" />
                  <div className="space-y-2.5">
                    {skills.map((s, i) => {
                      const { name, level } = parseSkillLevel(s);
                      return (
                        <div key={i}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[11px] text-[#555555]">{name}</span>
                          </div>
                          <div className="w-full h-[4px] bg-[#E8E8E8] rounded-full overflow-hidden">
                            <div className="h-full bg-[#3B4A6B] rounded-full" style={{ width: `${level}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {certifications.length > 0 && (
                <div>
                  <h2 className="text-[13px] font-bold text-[#3B4A6B] uppercase tracking-[0.15em] mb-2 font-['Playfair_Display',Georgia,serif]">Certifications</h2>
                  <div className="w-8 h-[2px] bg-[#3B4A6B] mb-3" />
                  <div className="space-y-2">
                    {certifications.map((c, i) => (
                      <div key={c.id}>
                        <p className="text-[11px] font-medium text-[#2C2C2C]">{c.name}</p>
                        <p className="text-[11px] text-[#777777]">{c.issuer}</p>
                        {i < certifications.length - 1 && <div className="h-px bg-[#E8E8E8] mt-2" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {projects && projects.length > 0 && (
                <div>
                  <h2 className="text-[13px] font-bold text-[#3B4A6B] uppercase tracking-[0.15em] mb-2 font-['Playfair_Display',Georgia,serif]">Projects</h2>
                  <div className="w-8 h-[2px] bg-[#3B4A6B] mb-3" />
                  <div className="space-y-1.5">
                    {projects.map((proj) => (
                      <div key={proj.id}>
                        <p className="text-[11px] font-medium text-[#2C2C2C]">{proj.name}</p>
                        {proj.description && <p className="text-[11px] text-[#555555]">{proj.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(HeritageCorporateComponent);
