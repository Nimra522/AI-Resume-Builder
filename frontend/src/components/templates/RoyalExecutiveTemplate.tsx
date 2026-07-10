import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Linkedin, User } from 'lucide-react';

const RoyalExecutiveComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
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
    <div className="w-full bg-[#FFFFFF] text-[#222222] font-['Cormorant_Garamond',Georgia,serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px' }}>
      <div className="px-9 pt-8 pb-4 text-center">
        <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
        <div className="w-[100px] h-[100px] overflow-hidden rounded-full border-2 border-black bg-[#FFFFFF] flex items-center justify-center mx-auto mb-4 cursor-pointer" onClick={() => fileRef.current?.click()}>
          {photoSrc ? <img src={photoSrc} alt="" className="w-full h-full object-cover" /> : <User size={38} className="text-black" />}
        </div>
        <h1 className="text-[30px] font-medium text-[#669BBC] tracking-[0.04em] font-['Lora',Georgia,serif]">{personalInfo.fullName || 'Full Name'}</h1>
        <div className="w-14 h-px bg-[#FF6B35] mx-auto my-4" />
        <p className="text-[18px] text-[#669BBC] uppercase tracking-[0.25em] font-semibold">{personalInfo.jobTitle || 'Executive'}</p>
        <div className="flex justify-center gap-5 mt-4 text-[13px] text-[#777]">
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={12} className="text-black" />{personalInfo.phone}</span>}
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={12} className="text-black" /><span className="break-all">{personalInfo.email}</span></span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={12} className="text-black" /><span className="break-all">{personalInfo.linkedin}</span></span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={12} className="text-black" />{personalInfo.location}</span>}
        </div>
      </div>
      <div className="mx-9 h-px bg-[#1E293B]/15" />
      <div className="flex px-9 pt-6 pb-8 gap-6">
        <div className="w-[35%] flex-shrink-0 space-y-5">
          {personalInfo.summary && (
            <div>
              <h2 className="text-[16px] font-semibold text-[#669BBC] uppercase tracking-[0.18em] font-['Lora',Georgia,serif] mb-3">About</h2>
              <p className="text-[13px] text-[#777] leading-[1.6] whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}
          {skills.length > 0 && (
            <div>
              <h2 className="text-[16px] font-semibold text-[#669BBC] uppercase tracking-[0.18em] font-['Lora',Georgia,serif] mb-3">Skills</h2>
              <div className="space-y-2">{skills.map((s, i) => <p key={i} className="text-[13px] text-[#777] border-b border-[#FF6B35]/10 pb-2">{s}</p>)}</div>
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-[16px] font-semibold text-[#669BBC] uppercase tracking-[0.18em] font-['Lora',Georgia,serif] mb-3">Certifications</h2>
              {certifications.map((c) => <p key={c.id} className="text-[13px] text-[#777] mb-2">{c.name}<span className="text-black"> ({c.issuer})</span></p>)}
            </div>
          )}
        </div>
        <div className="w-px bg-[#1E293B]/15" />
        <div className="flex-1 space-y-5">
          {experience.length > 0 && (
            <div>
              <h2 className="text-[16px] font-semibold text-[#669BBC] uppercase tracking-[0.18em] font-['Lora',Georgia,serif] mb-4">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <p className="text-[15px] font-semibold text-[#222222] break-words pr-2">{exp.role}</p>
                      <p className="text-[12px] text-[#777] flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? '–' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="text-[14px] text-black mt-1">{exp.company}</p>
                    {exp.description && <p className="text-[13px] text-[#777] mt-2 leading-[1.6]">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {education.length > 0 && (
            <div>
              <h2 className="text-[16px] font-semibold text-[#669BBC] uppercase tracking-[0.18em] font-['Lora',Georgia,serif] mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="text-[15px] font-medium text-[#222222]">{edu.degree}</p>
                  <p className="text-[14px] text-[#777] mt-1">{edu.school}{edu.school && edu.graduationDate ? ' · ' : ''}{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          )}
          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-[16px] font-semibold text-[#669BBC] uppercase tracking-[0.18em] font-['Lora',Georgia,serif] mb-3">Achievements</h2>
              <div className="space-y-2">
                {projects.map((p) => (
                  <div key={p.id} className="flex items-start gap-2">
                    <span className="w-[3px] h-[3px] bg-[#FF6B35] mt-2 flex-shrink-0" />
                    <p className="text-[13px] text-[#777]">{p.name}</p>
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

export default React.memo(RoyalExecutiveComponent);
