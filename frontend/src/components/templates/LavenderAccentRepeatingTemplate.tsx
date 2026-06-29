import React from 'react';
import { ResumeData } from '../../types';

interface Props { data: ResumeData; }

const LAVENDER = '#C0BAF5';
const MUTED = '#666666';

const LavenderAccentRepeatingComponent: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;

  const contactItems = [
    personalInfo.phone,
    personalInfo.website,
    personalInfo.email,
    personalInfo.location,
  ].filter(Boolean);

  const skillList = skills || [];
  const certList = certifications || [];
  const projList = projects || [];

  const SectionDivider: React.FC<{ label: string }> = ({ label }) => (
    <div style={{ marginBottom: '14px' }}>
      <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#000000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</h2>
      <hr style={{ border: 'none', borderTop: '1.5px solid ' + LAVENDER, margin: '4px 0 0 0' }} />
    </div>
  );

  const title = personalInfo.jobTitle || 'JOB TITLE';
  const repeatCount = 20;

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', fontFamily: '"Montserrat","Inter",sans-serif', boxSizing: 'border-box' }}>
      {/* Black Header */}
      <div style={{ background: '#000000', padding: '28px 30px', textAlign: 'center' as const }}>
        <h1 style={{ fontSize: '68px', fontWeight: 700, color: LAVENDER, margin: 0, lineHeight: 1.05, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
      </div>

      {/* Repeating Title Banner */}
      <div style={{ background: LAVENDER, padding: '6px 0', overflow: 'hidden', whiteSpace: 'nowrap' as const }}>
        <span style={{ fontSize: '11px', fontWeight: 500, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block' }}>
          {Array(repeatCount).fill(title).join(' \u00A0\u00A0\u00A0')}
        </span>
      </div>

      {/* Body: Two Columns */}
      <div style={{ display: 'flex', gap: '32px', padding: '28px 30px 0 30px' }}>
        {/* Left Column */}
        <div style={{ width: '32%', flexShrink: 0 }}>
          {/* Professional Summary */}
          {personalInfo.summary && (
            <div style={{ marginBottom: '22px' }}>
              <SectionDivider label="Professional Summary" />
              <p style={{ fontSize: '11px', lineHeight: '1.7', color: MUTED, margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <SectionDivider label="Education" />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#000000', textTransform: 'uppercase' }}>{edu.degree}</div>
                  <div style={{ fontSize: '11px', color: MUTED }}>{edu.school || edu.institution}{edu.school && edu.graduationDate ? ' | ' : ''}{edu.graduationDate}</div>
                </div>
              ))}
            </div>
          )}

          {/* Contact */}
          {contactItems.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <SectionDivider label="Contact" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {contactItems.map((item, i) => (
                  <div key={i} style={{ fontSize: '11px', color: MUTED }}>{item}</div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skillList.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <SectionDivider label="Skills" />
              <p style={{ fontSize: '11px', color: MUTED, margin: 0, lineHeight: '1.7' }}>
                {skillList.join(' \u2022 ')}
              </p>
            </div>
          )}

          {/* Projects */}
          {projList.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <SectionDivider label="Projects" />
              {projList.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#000000', textTransform: 'uppercase' }}>{proj.name}</div>
                  {proj.description && <div style={{ fontSize: '11px', color: MUTED, marginTop: '2px', lineHeight: '1.6' }}>{proj.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <SectionDivider label="Experience" />
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#000000', textTransform: 'uppercase' }}>{exp.company}</span>
                    <span style={{ fontSize: '11px', fontWeight: 400, color: MUTED, whiteSpace: 'nowrap', marginLeft: '12px' }}>
                      {(exp.position || exp.role) + ((exp.position || exp.role) && (exp.startDate || exp.endDate) ? ' | ' : '')}
                      {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <ul style={{ margin: 0, padding: '0 0 0 14px', fontSize: '11px', color: MUTED, lineHeight: '1.7' }}>
                      {exp.description.split('\n').filter(Boolean).map((line, li) => <li key={li}>{line}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certList.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <SectionDivider label="Certifications" />
              <ul style={{ margin: 0, padding: '0 0 0 14px', fontSize: '11px', color: MUTED, lineHeight: '1.7' }}>
                {certList.map((c) => <li key={c.id}>{c.name}{c.issuer ? ` \u2013 ${c.issuer}` : ''}{c.date ? ` (${c.date})` : ''}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: LAVENDER, height: '24px', marginTop: '20px' }} />
    </div>
  );
};

export default React.memo(LavenderAccentRepeatingComponent);
