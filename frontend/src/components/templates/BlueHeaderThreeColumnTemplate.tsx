import React from 'react';
import { ResumeData } from '../../types';

interface Props { data: ResumeData; }

const BLUE = '#4274B3';
const FOOTER_BG = '#F2F2F2';
const MUTED = '#666666';
const BAR_BG = '#BBD0E8';

const BlueHeaderThreeColumnComponent: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const contactItems = [
    { label: 'Phone', value: personalInfo.phone },
    { label: 'Address', value: personalInfo.location },
    { label: 'Website', value: personalInfo.website },
    { label: 'Email', value: personalInfo.email },
  ].filter(c => c.value);

  const skillList = skills || [];
  const mid = Math.ceil(skillList.length / 2);
  const skillCol1 = skillList.slice(0, mid);
  const skillCol2 = skillList.slice(mid);

  const SectionHeading: React.FC<{ label: string }> = ({ label }) => (
    <div style={{ marginBottom: '10px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#000000', margin: 0 }}>{label}</h2>
      <div style={{ width: '36px', height: '3px', background: BLUE, marginTop: '4px' }} />
    </div>
  );

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', fontFamily: '"Montserrat","Poppins",sans-serif', boxSizing: 'border-box' }}>
      {/* Blue Header */}
      <div style={{ background: BLUE, padding: '28px 32px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '52px', fontWeight: 700, color: '#FFFFFF', margin: 0, lineHeight: 1 }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '16px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', margin: '4px 0 0 0' }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
        {contactItems.length > 0 && (
          <div style={{ textAlign: 'right' as const, flexShrink: 0, marginLeft: '24px' }}>
            {contactItems.map((item, i) => (
              <div key={i} style={{ fontSize: '11px', color: '#FFFFFF', marginBottom: '3px' }}>{item.value}</div>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '28px 32px 0 32px' }}>
        {/* About Me */}
        {personalInfo.summary && (
          <div style={{ marginBottom: '24px' }}>
            <SectionHeading label="About Me" />
            <p style={{ fontSize: '13px', lineHeight: '1.75', color: MUTED, margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <SectionHeading label="work experience" />
            {experience.map((exp, idx) => (
              <div key={exp.id} style={{ marginBottom: idx < experience.length - 1 ? '16px' : '0', borderBottom: idx < experience.length - 1 ? '1px solid #E0E0E0' : 'none', paddingBottom: idx < experience.length - 1 ? '16px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#000000', textTransform: 'uppercase' }}>
                    {exp.company}{exp.company && (exp.position || exp.role) ? ' - ' : ''}{exp.position || exp.role}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#000000', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? '-' : ''}{exp.current ? 'NOW' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <div style={{ fontSize: '12px', color: MUTED, lineHeight: '1.6', marginBottom: '4px', whiteSpace: 'pre-wrap' }}>{exp.description}</div>
                )}
                {exp.description && exp.description.split('\n').filter(Boolean).length > 1 && (
                  <ul style={{ margin: 0, padding: '0 0 0 14px', fontSize: '12px', color: MUTED, lineHeight: '1.7' }}>
                    {exp.description.split('\n').filter(Boolean).map((line, li) => <li key={li}>{line}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education - Three columns */}
        {education.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <SectionHeading label="Education" />
            <div style={{ display: 'flex' }}>
              {education.map((edu, idx) => (
                <React.Fragment key={edu.id}>
                  <div style={{ flex: 1, padding: '0 12px' }}>
                    <div style={{ fontSize: '12px', color: MUTED }}>{edu.graduationDate}</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#000000', textTransform: 'uppercase', marginTop: '2px' }}>{edu.school || edu.institution}</div>
                    <div style={{ fontSize: '12px', color: MUTED, marginTop: '2px' }}>{edu.degree}</div>
                  </div>
                  {idx < education.length - 1 && <div style={{ width: '1px', background: '#E0E0E0', flexShrink: 0 }} />}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skillList.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <SectionHeading label="Skills" />
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '12px', color: MUTED, lineHeight: '1.8' }}>
                  {skillCol1.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              {skillCol2.length > 0 && (
                <div style={{ flex: 1 }}>
                  <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '12px', color: MUTED, lineHeight: '1.8' }}>
                    {skillCol2.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <SectionHeading label="Projects" />
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#000000' }}>{proj.name}</div>
                {proj.description && <div style={{ fontSize: '12px', color: MUTED, marginTop: '2px', lineHeight: '1.6' }}>{proj.description}</div>}
                {proj.technologies && proj.technologies.length > 0 && (
                  <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{proj.technologies.join(', ')}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <SectionHeading label="Certifications" />
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#000000' }}>{cert.name}</div>
                <div style={{ fontSize: '12px', color: MUTED, marginTop: '1px' }}>{cert.issuer}{cert.issuer && cert.date ? ' \u2013 ' : ''}{cert.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: FOOTER_BG, height: '44px', marginTop: '8px' }} />
    </div>
  );
};

export default React.memo(BlueHeaderThreeColumnComponent);
