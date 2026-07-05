import React from 'react';
import { ResumeData } from '../../types';
import { User, Phone, Mail, MapPin, Linkedin } from 'lucide-react';

const MinimalistMagazineTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, skills, certifications, projects } = data;

  return (
    <div className="w-full font-['Inter',sans-serif] shadow-xl mx-auto min-h-[1122px]" style={{ maxWidth: '793px', backgroundColor: '#F5F5F5', color: '#1A1A1A' }}>
      <div className="px-10" style={{ paddingTop: '80px' }}>
        <div className="relative flex flex-col items-center">
          <div className="w-full" style={{ height: '1px', backgroundColor: '#CFCFCF' }} />
          <div className="absolute" style={{ top: '-45px' }}>
            <div className="flex items-center justify-center" style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #FFFFFF', boxShadow: '0 0 0 1px #CFCFCF', backgroundColor: '#FFFFFF' }}>
              {personalInfo.photoUrl ? <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" /> : <User size={32} style={{ color: '#CFCFCF' }} />}
            </div>
          </div>
        </div>
        <div className="text-center" style={{ marginTop: '60px' }}>
          <h1 className="font-['Playfair_Display',Georgia,serif] leading-tight" style={{ fontSize: '46px', fontWeight: 700, color: '#1A1A1A' }}>{personalInfo.fullName || 'Full Name'}</h1>
          <p className="font-medium" style={{ fontSize: '14px', letterSpacing: '6px', color: '#1A1A1A', marginTop: '12px', textTransform: 'uppercase' }}>{personalInfo.jobTitle || 'Professional Title'}</p>
        </div>
        <div className="flex justify-center flex-wrap" style={{ gap: '32px', marginTop: '28px' }}>
          {personalInfo.phone && <span className="flex items-center gap-1.5" style={{ fontSize: '12px', color: '#1A1A1A' }}><Phone size={12} />{personalInfo.phone}</span>}
          {personalInfo.email && <span className="flex items-center gap-1.5" style={{ fontSize: '12px', color: '#1A1A1A' }}><Mail size={12} /><span className="break-all">{personalInfo.email}</span></span>}
          {personalInfo.location && <span className="flex items-center gap-1.5" style={{ fontSize: '12px', color: '#1A1A1A' }}><MapPin size={12} />{personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1.5" style={{ fontSize: '12px', color: '#1A1A1A' }}><Linkedin size={12} /><span className="break-all">{personalInfo.linkedin}</span></span>}
        </div>
      </div>

      <div className="mx-10" style={{ height: '1px', backgroundColor: '#CFCFCF', marginTop: '40px' }} />

      <div className="flex px-10" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div style={{ width: '34%', flexShrink: 0 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '40px' }}>
              <h2 className="font-['Playfair_Display',Georgia,serif] font-bold uppercase tracking-[0.15em]" style={{ fontSize: '13px', color: '#1A1A1A', marginBottom: '16px' }}>About</h2>
              <div style={{ width: '24px', height: '1px', backgroundColor: '#1A1A1A', marginBottom: '16px' }} />
              <p className="leading-relaxed whitespace-pre-wrap" style={{ fontSize: '11px', color: '#1A1A1A', lineHeight: '1.8' }}>{personalInfo.summary}</p>
            </div>
          )}
          {skills.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 className="font-['Playfair_Display',Georgia,serif] font-bold uppercase tracking-[0.15em]" style={{ fontSize: '13px', color: '#1A1A1A', marginBottom: '16px' }}>Skills</h2>
              <div style={{ width: '24px', height: '1px', backgroundColor: '#1A1A1A', marginBottom: '16px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#CFCFCF', flexShrink: 0 }} />
                    <span style={{ fontSize: '11px', color: '#1A1A1A', lineHeight: '1.8' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 className="font-['Playfair_Display',Georgia,serif] font-bold uppercase tracking-[0.15em]" style={{ fontSize: '13px', color: '#1A1A1A', marginBottom: '16px' }}>Certifications</h2>
              <div style={{ width: '24px', height: '1px', backgroundColor: '#1A1A1A', marginBottom: '16px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {certifications.map((c) => (
                  <div key={c.id} className="flex items-center gap-2">
                    <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#CFCFCF', flexShrink: 0 }} />
                    <span style={{ fontSize: '11px', color: '#1A1A1A', lineHeight: '1.8' }}>{c.name}</span>
                    {c.issuer && <span style={{ fontSize: '10px', color: '#1A1A1A' }}>({c.issuer})</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ width: '1px', backgroundColor: '#CFCFCF', margin: '0 36px', flexShrink: 0 }} />

        <div style={{ flex: 1 }}>
          {experience.length > 0 && (
            <div>
              <h2 className="font-['Playfair_Display',Georgia,serif] font-bold uppercase tracking-[0.15em]" style={{ fontSize: '13px', color: '#1A1A1A', marginBottom: '16px' }}>Experience</h2>
              <div style={{ width: '24px', height: '1px', backgroundColor: '#1A1A1A', marginBottom: '24px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-semibold break-words pr-2" style={{ fontSize: '14px', color: '#1A1A1A' }}>{exp.role}</p>
                      <p className="flex-shrink-0" style={{ fontSize: '11px', color: '#1A1A1A' }}>{exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p style={{ fontSize: '12px', color: '#1A1A1A', marginTop: '2px' }}>{exp.company}</p>
                    {exp.description && <p className="leading-relaxed" style={{ fontSize: '11px', color: '#1A1A1A', marginTop: '8px', lineHeight: '1.8' }}>{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {projects.length > 0 && (
            <div style={{ marginTop: '28px' }}>
              <h2 className="font-['Playfair_Display',Georgia,serif] font-bold uppercase tracking-[0.15em]" style={{ fontSize: '13px', color: '#1A1A1A', marginBottom: '16px' }}>Projects</h2>
              <div style={{ width: '24px', height: '1px', backgroundColor: '#1A1A1A', marginBottom: '16px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <p className="font-semibold" style={{ fontSize: '14px', color: '#1A1A1A' }}>{proj.name}</p>
                    {proj.description && <p className="leading-relaxed" style={{ fontSize: '11px', color: '#1A1A1A', marginTop: '4px', lineHeight: '1.8' }}>{proj.description}</p>}
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

export default React.memo(MinimalistMagazineTemplate);
