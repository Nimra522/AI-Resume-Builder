import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe, Linkedin, User } from 'lucide-react';

const Tag: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-block px-3 py-1 bg-[#CBB9A8]/20 text-black text-[11px] leading-relaxed">{text}</span>
);

const VerticalElegantComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
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
    <div className="w-full min-h-[1122px] bg-[#FAF8F5] text-[#2D2D2D] font-['Inter',sans-serif] shadow-xl mx-auto" style={{ maxWidth: '793px' }}>
      <div className="bg-white px-9 py-7">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[36px] font-light text-[#2D2D2D] tracking-[0.02em] font-['Georgia',serif]">{personalInfo.fullName || 'Full Name'}</h1>
            <p className="text-[12px] text-black mt-1">{personalInfo.jobTitle || 'Professional Title'}</p>
          </div>
          <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
          <div className="w-[76px] h-[76px] rounded overflow-hidden bg-[#FAF8F5] flex items-center justify-center flex-shrink-0 border border-[#CBB9A8]/40 cursor-pointer" onClick={() => fileRef.current?.click()}>
            {photoSrc ? <img src={photoSrc} alt="" className="w-full h-full object-cover" /> : <User size={30} className="text-[#CBB9A8]" />}
          </div>
        </div>
      </div>
      <div className="h-px bg-[#CBB9A8]/30 mx-9" />
      <div className="flex bg-white">
        <div className="w-[35%] px-6 py-6 bg-[#FAF8F5]">
          <div className="mb-5">
            <h3 className="text-[12px] font-semibold text-[#5C4A3A] uppercase tracking-[0.2em] font-['Georgia',serif] mb-3">Contact</h3>
            <div className="text-[11px] text-black space-y-2">
              {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={10} className="text-[#CBB9A8] flex-shrink-0" /><span>{personalInfo.phone}</span></div>}
              {personalInfo.email && <div className="flex items-center gap-2"><Mail size={10} className="text-[#CBB9A8] flex-shrink-0" /><span className="break-all">{personalInfo.email}</span></div>}
              {personalInfo.website && <div className="flex items-center gap-2"><Globe size={10} className="text-[#CBB9A8] flex-shrink-0" /><span className="break-all">{personalInfo.website}</span></div>}
              {personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={10} className="text-[#CBB9A8] flex-shrink-0" /><span className="break-all">{personalInfo.linkedin}</span></div>}
              {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={10} className="text-[#CBB9A8] flex-shrink-0" /><span>{personalInfo.location}</span></div>}
            </div>
          </div>
          {skills.length > 0 && (
            <div className="mb-5">
              <h3 className="text-[12px] font-semibold text-[#5C4A3A] uppercase tracking-[0.2em] font-['Georgia',serif] mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1.5">{skills.map((s, i) => <Tag key={i} text={s} />)}</div>
            </div>
          )}
          {certifications.length > 0 && (
            <div className="mb-5">
              <h3 className="text-[12px] font-semibold text-[#5C4A3A] uppercase tracking-[0.2em] font-['Georgia',serif] mb-2">Certifications</h3>
              <div className="space-y-1.5">
                {certifications.map((c) => (
                  <p key={c.id} className="text-[11px] text-black">{c.name}<span className="text-[#CBB9A8]"> — {c.issuer}</span></p>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-px bg-[#CBB9A8]/20" />
        <div className="w-[65%] px-6 py-6">
          {personalInfo.summary && (
            <div className="mb-5">
              <h3 className="text-[12px] font-semibold text-[#5C4A3A] uppercase tracking-[0.2em] font-['Georgia',serif] mb-2">About Me</h3>
              <p className="text-[11px] text-black leading-relaxed whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}
          {experience.length > 0 && (
            <div className="mb-5">
              <h3 className="text-[12px] font-semibold text-[#5C4A3A] uppercase tracking-[0.2em] font-['Georgia',serif] mb-3">Experience</h3>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <p className="text-[11px] font-medium text-[#2D2D2D]">{exp.role}</p>
                      <p className="text-[11px] text-black">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="text-[11px] text-black">{exp.company}</p>
                    {exp.description && <p className="text-[12px] text-black mt-0.5 leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {education.length > 0 && (
            <div className="mb-5">
              <h3 className="text-[12px] font-semibold text-[#5C4A3A] uppercase tracking-[0.2em] font-['Georgia',serif] mb-2">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="text-[11px] font-medium text-[#2D2D2D]">{edu.degree}</p>
                  <p className="text-[12px] text-black">{edu.school}{edu.school && edu.graduationDate ? ' · ' : ''}{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          )}
          {projects && projects.length > 0 && (
            <div>
              <h3 className="text-[12px] font-semibold text-[#5C4A3A] uppercase tracking-[0.2em] font-['Georgia',serif] mb-2">Achievements</h3>
              <ul className="list-disc list-outside pl-3 text-[12px] text-black space-y-0.5">{projects.map((p) => <li key={p.id}>{p.name}</li>)}</ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(VerticalElegantComponent);
