import React from 'react';
import { ResumeData } from '../../types';
import { User, Phone, Mail, MapPin } from 'lucide-react';

const NAVY = '#1B2A4A';
const LIGHT_NAVY = '#2C3E6B';
const DIVIDER = '#DCE1E8';
const TEXT_DARK = '#1A1A1A';
const TEXT_MUTED = '#5A6A7A';
const ACCENT = '#333333';

const MinimalistFullWidthTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;

  return (
    <div className="w-full bg-white font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px', color: TEXT_DARK }}>
      <div className="px-8 pt-8 pb-6">
        <div className="flex items-start gap-6">
          <div className="flex-1 min-w-0">
            <h1 className="font-bold leading-tight" style={{ fontSize: '38px', color: '#337FCF' }}>{personalInfo.fullName || 'Full Name'}</h1>
            <p className="font-light mt-1" style={{ fontSize: '16px', letterSpacing: '3px', color: TEXT_MUTED, textTransform: 'uppercase' }}>{personalInfo.jobTitle || 'Professional Title'}</p>
          </div>
          {personalInfo.photoUrl && (
            <div className="flex items-center justify-center flex-shrink-0" style={{ width: '80px', height: '80px', overflow: 'hidden', border: '2px solid', borderColor: DIVIDER }}>
              <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-5 text-[12px]" style={{ color: TEXT_MUTED }}>
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={12} style={{ color: NAVY }} />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={12} style={{ color: NAVY }} />{personalInfo.location}</span>}
          {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={12} style={{ color: NAVY }} /><span className="break-all">{personalInfo.email}</span></span>}
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: DIVIDER, margin: '0 32px' }} />

      <div className="px-8" style={{ paddingTop: '28px', paddingBottom: '32px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '32px' }}>
            <h2 className="font-bold uppercase tracking-[0.12em] text-[15px]" style={{ color: '#337FCF', marginBottom: '10px' }}>About Me</h2>
            <div style={{ width: '100%', height: '2px', backgroundColor: '#337FCF', marginBottom: '14px' }} />
            <p className="leading-relaxed whitespace-pre-wrap" style={{ fontSize: '13px', color: TEXT_MUTED, lineHeight: '1.7' }}>{personalInfo.summary}</p>
          </div>
        )}

        {education.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 className="font-bold uppercase tracking-[0.12em] text-[15px]" style={{ color: '#337FCF', marginBottom: '10px' }}>Education</h2>
            <div style={{ width: '100%', height: '2px', backgroundColor: '#337FCF', marginBottom: '14px' }} />
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-semibold" style={{ fontSize: '13px', color: TEXT_DARK }}>{edu.degree}</p>
                  <p style={{ fontSize: '12px', color: TEXT_MUTED, marginTop: '1px' }}>{edu.school}{edu.school && edu.graduationDate ? ' — ' : ''}{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 className="font-bold uppercase tracking-[0.12em] text-[15px]" style={{ color: '#337FCF', marginBottom: '10px' }}>Work Experience</h2>
            <div style={{ width: '100%', height: '2px', backgroundColor: '#337FCF', marginBottom: '14px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-semibold break-words pr-2" style={{ fontSize: '14px', color: TEXT_DARK }}>{exp.role}</p>
                    <p className="flex-shrink-0" style={{ fontSize: '11px', color: TEXT_MUTED }}>{exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <p style={{ fontSize: '13px', color: NAVY, marginTop: '2px' }}>{exp.company}</p>
                  {exp.description && <p className="leading-relaxed" style={{ fontSize: '12px', color: TEXT_MUTED, marginTop: '6px', lineHeight: '1.7' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 className="font-bold uppercase tracking-[0.12em] text-[15px]" style={{ color: '#337FCF', marginBottom: '10px' }}>Skills</h2>
            <div style={{ width: '100%', height: '2px', backgroundColor: '#337FCF', marginBottom: '14px' }} />
            <div className="grid grid-cols-3 gap-x-6 gap-y-2">
              {skills.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: NAVY, flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: TEXT_MUTED }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="font-bold uppercase tracking-[0.12em] text-[15px]" style={{ color: '#337FCF', marginBottom: '10px' }}>Certifications</h2>
            <div style={{ width: '100%', height: '2px', backgroundColor: '#337FCF', marginBottom: '14px' }} />
            <div className="grid grid-cols-3 gap-x-6 gap-y-2">
              {certifications.map((c) => (
                <div key={c.id} className="flex items-center gap-2">
                  <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: NAVY, flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: TEXT_MUTED }}>{c.name}</span>
                  {c.issuer && <span style={{ fontSize: '11px', color: TEXT_MUTED }}>({c.issuer})</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {projects && projects.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <h2 className="font-bold uppercase tracking-[0.12em] text-[15px]" style={{ color: '#337FCF', marginBottom: '10px' }}>Achievements</h2>
            <div style={{ width: '100%', height: '2px', backgroundColor: '#337FCF', marginBottom: '14px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {projects.map((p) => (
                <p key={p.id} style={{ fontSize: '12px', color: TEXT_MUTED, lineHeight: '1.7' }}>— {p.name}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(MinimalistFullWidthTemplate);
