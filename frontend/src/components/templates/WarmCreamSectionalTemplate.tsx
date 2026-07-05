import React from 'react';
import { ResumeData } from '../../types';
import { Search } from 'lucide-react';

interface Props { data: ResumeData; }

const CREAM = '#FCFAF5';
const MUTED = '#777777';
const BAR_BG = '#E0E0E0';

const WarmCreamSectionalComponent: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;

  const contactItems = [
    { label: 'C.', value: personalInfo.phone },
    { label: '', value: personalInfo.email },
    { label: '', value: personalInfo.website },
    { label: '', value: personalInfo.linkedin },
  ].filter(c => c.value);

  const skillList = skills || [];

  const SectionRow: React.FC<{ heading: string; children: React.ReactNode }> = ({ heading, children }) => (
    <div>
      <hr style={{ border: 'none', borderTop: '1px solid #000000', margin: '0 0 16px 0' }} />
      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ width: '18%', flexShrink: 0 }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#000000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{heading}</h2>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: CREAM, color: '#000000', fontFamily: '"Montserrat","Inter",sans-serif', boxSizing: 'border-box', padding: '36px 40px 28px 40px' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        {/* Left */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '60px', fontWeight: 900, color: '#000000', margin: 0, lineHeight: 0.95, letterSpacing: '-0.02em' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '14px', fontWeight: 400, color: '#000000', margin: '6px 0 12px 0' }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>

        {/* Right - Contact */}
        {contactItems.length > 0 && (
          <div style={{ textAlign: 'right' as const, flexShrink: 0, marginLeft: '24px' }}>
            {contactItems.map((item, i) => (
              <div key={i} style={{ fontSize: '12px', fontWeight: 500, color: '#000000', marginBottom: '4px' }}>{item.value}</div>
            ))}
          </div>
        )}
      </div>

      {/* ABOUT ME */}
      {personalInfo.summary && (
        <SectionRow heading="SOBRE MÍ">
          <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#000000', margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
        </SectionRow>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <SectionRow heading="EXPERIENCIA LABORAL">
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#000000' }}>{exp.position || exp.role}</div>
              <div style={{ fontSize: '12px', color: '#000000', marginTop: '2px' }}>
                {exp.company}{exp.company && (exp.startDate || exp.endDate) ? ' - ' : ''}{exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' - ' : ''}{exp.current ? 'Presente' : exp.endDate}
              </div>
              {exp.description && (
                <p style={{ fontSize: '12px', color: MUTED, margin: '4px 0 0 0', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
              )}
            </div>
          ))}
        </SectionRow>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <SectionRow heading="FORMACIÓN ACADÉMICA">
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#000000' }}>{edu.degree}</div>
              <div style={{ fontSize: '12px', color: '#000000', marginTop: '2px' }}>{edu.school || edu.institution}</div>
              <div style={{ fontSize: '12px', color: MUTED, marginTop: '1px' }}>{edu.graduationDate}</div>
            </div>
          ))}
        </SectionRow>
      )}

      {/* SOFTWARE */}
      {skillList.length > 0 && (
        <SectionRow heading="SOFTWARE">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {skillList.map((s, i) => {
              const pct = Math.max(50, 100 - i * 10);
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Icon in rounded square */}
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '6px',
                    border: '1px solid #000000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Search size={14} strokeWidth={2} />
                  </div>
                  {/* Skill Name */}
                  <div style={{ width: '100px', flexShrink: 0, fontSize: '12px', fontWeight: 500, color: '#000000' }}>{s}</div>
                  {/* Progress Bar */}
                  <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: BAR_BG, overflow: 'hidden', minWidth: '40px' }}>
                    <div style={{ width: `${pct}%`, height: '100%', borderRadius: '3px', background: '#000000' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </SectionRow>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <SectionRow heading="PROJECTS">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {projects.map((proj) => (
              <div key={proj.id}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#000000' }}>{proj.name}</div>
                {proj.description && <div style={{ fontSize: '12px', color: MUTED, marginTop: '2px', lineHeight: '1.7' }}>{proj.description}</div>}
              </div>
            ))}
          </div>
        </SectionRow>
      )}

      {/* CERTIFICATIONS */}
      {certifications.length > 0 && (
        <SectionRow heading="CERTIFICATIONS">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {certifications.map((cert) => (
              <div key={cert.id}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#000000' }}>{cert.name}</div>
                <div style={{ fontSize: '12px', color: MUTED, marginTop: '1px' }}>{cert.issuer}{cert.issuer && cert.date ? ' \u2013 ' : ''}{cert.date}</div>
              </div>
            ))}
          </div>
        </SectionRow>
      )}
    </div>
  );
};

export default React.memo(WarmCreamSectionalComponent);
