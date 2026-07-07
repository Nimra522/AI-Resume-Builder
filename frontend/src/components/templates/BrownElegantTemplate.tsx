import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { User, Phone, Mail, MapPin, Linkedin } from 'lucide-react';

const BROWN = '#9C6B52';
const BG = '#F8F6F1';
const DIVIDER = '#E8DDD4';
const TEXT_DARK = '#2C2C2C';
const TEXT_MUTED = '#7A7A7A';

const BrownElegantTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
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
    <div className="w-full font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px', backgroundColor: BG, color: TEXT_DARK }}>
      <div className="px-10 pt-10 pb-6">
        <div className="flex items-start gap-8">
          <div className="flex items-center justify-center flex-shrink-0 cursor-pointer" style={{ width: '85px', height: '85px', overflow: 'hidden', border: '1px solid', borderColor: DIVIDER }} onClick={() => fileRef.current?.click()}>
            {photoSrc ? <img src={photoSrc} alt="" className="w-full h-full object-cover" /> : <User size={30} style={{ color: DIVIDER, cursor: 'pointer' }} onClick={() => fileRef.current?.click()} />}
          </div>
          <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
          <div className="flex-1 min-w-0" style={{ marginTop: '6px' }}>
            <h1 className="font-bold leading-tight" style={{ fontSize: '40px', color: TEXT_DARK, letterSpacing: '-0.01em' }}>{personalInfo.fullName || 'Full Name'}</h1>
            <p className="font-light mt-1" style={{ fontSize: '15px', letterSpacing: '4px', color: BROWN, textTransform: 'uppercase' }}>{personalInfo.jobTitle || 'Professional Title'}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-6 text-[12px]" style={{ color: TEXT_MUTED }}>
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={12} style={{ color: BROWN }} />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={12} style={{ color: BROWN }} />{personalInfo.location}</span>}
          {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={12} style={{ color: BROWN }} /><span className="break-all">{personalInfo.email}</span></span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1.5"><Linkedin size={12} style={{ color: BROWN }} /><span className="break-all">{personalInfo.linkedin}</span></span>}
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: DIVIDER, margin: '0 40px' }} />

      <div className="px-10" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '36px' }}>
            <h2 className="font-semibold uppercase tracking-[0.2em] text-[11px]" style={{ color: BROWN, marginBottom: '12px' }}>About Me</h2>
            <div style={{ width: '40px', height: '1px', backgroundColor: BROWN, marginBottom: '16px' }} />
            <p className="leading-relaxed whitespace-pre-wrap" style={{ fontSize: '13px', color: TEXT_MUTED, lineHeight: '1.8' }}>{personalInfo.summary}</p>
          </div>
        )}

        {education.length > 0 && (
          <div style={{ marginBottom: '36px' }}>
            <h2 className="font-semibold uppercase tracking-[0.2em] text-[11px]" style={{ color: BROWN, marginBottom: '12px' }}>Education</h2>
            <div style={{ width: '40px', height: '1px', backgroundColor: BROWN, marginBottom: '16px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-semibold" style={{ fontSize: '14px', color: TEXT_DARK }}>{edu.degree}</p>
                  <p style={{ fontSize: '13px', color: TEXT_MUTED, marginTop: '2px' }}>{edu.school}{edu.school && edu.graduationDate ? ' — ' : ''}{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '36px' }}>
            <h2 className="font-semibold uppercase tracking-[0.2em] text-[11px]" style={{ color: BROWN, marginBottom: '12px' }}>Experience</h2>
            <div style={{ width: '40px', height: '1px', backgroundColor: BROWN, marginBottom: '16px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-semibold break-words pr-2" style={{ fontSize: '14px', color: TEXT_DARK }}>{exp.role}</p>
                    <p className="flex-shrink-0" style={{ fontSize: '12px', color: BROWN }}>{exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <p style={{ fontSize: '13px', color: BROWN, marginTop: '2px' }}>{exp.company}</p>
                  {exp.description && <p className="leading-relaxed" style={{ fontSize: '13px', color: TEXT_MUTED, marginTop: '8px', lineHeight: '1.8' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div style={{ marginBottom: '36px' }}>
            <h2 className="font-semibold uppercase tracking-[0.2em] text-[11px]" style={{ color: BROWN, marginBottom: '12px' }}>Skills</h2>
            <div style={{ width: '40px', height: '1px', backgroundColor: BROWN, marginBottom: '16px' }} />
            <div className="grid grid-cols-3 gap-x-6 gap-y-2">
              {skills.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: BROWN, flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: TEXT_MUTED }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="font-semibold uppercase tracking-[0.2em] text-[11px]" style={{ color: BROWN, marginBottom: '12px' }}>Certifications</h2>
            <div style={{ width: '40px', height: '1px', backgroundColor: BROWN, marginBottom: '16px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {certifications.map((c) => (
                <div key={c.id} className="flex items-center gap-2">
                  <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: BROWN, flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: TEXT_MUTED }}>{c.name}</span>
                  {c.issuer && <span style={{ fontSize: '12px', color: TEXT_MUTED }}>({c.issuer})</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {projects && projects.length > 0 && (
          <div style={{ marginTop: '36px' }}>
            <h2 className="font-semibold uppercase tracking-[0.2em] text-[11px]" style={{ color: BROWN, marginBottom: '12px' }}>Achievements</h2>
            <div style={{ width: '40px', height: '1px', backgroundColor: BROWN, marginBottom: '16px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {projects.map((p) => (
                <p key={p.id} style={{ fontSize: '13px', color: TEXT_MUTED, lineHeight: '1.8' }}>— {p.name}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(BrownElegantTemplate);
