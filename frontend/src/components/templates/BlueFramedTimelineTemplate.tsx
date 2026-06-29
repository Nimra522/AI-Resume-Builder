import React from 'react';
import { ResumeData } from '../../types';

interface Props { data: ResumeData; }

const BLUE = '#1E5EA0';
const DARK = '#000000';
const MUTED = '#555555';

const BlueFramedTimelineComponent: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;

  const contactItems = [
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.email,
  ].filter(Boolean);

  const skillList = skills || [];
  const certList = certifications || [];
  const projList = projects || [];

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', fontFamily: '"Montserrat","Inter","Poppins",sans-serif', boxSizing: 'border-box' }}>
      {/* Top Blue Bar */}
      <div style={{ background: BLUE, height: '10px' }} />

      {/* Header */}
      <div style={{ padding: '28px 40px 0 40px', textAlign: 'center' as const }}>
        <h1 style={{ fontSize: '48px', fontWeight: 800, color: BLUE, margin: 0, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: '16px', fontWeight: 400, color: DARK, margin: '4px 0 0 0' }}>
          {personalInfo.jobTitle || 'Job Title'}
        </p>
      </div>

      {/* Contact Strip */}
      {contactItems.length > 0 && (
        <div style={{ padding: '14px 40px 0 40px' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #CCCCCC', margin: '0 0 10px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {contactItems.map((item, i) => (
              <div key={i} style={{ fontSize: '12px', color: DARK }}>{item}</div>
            ))}
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #CCCCCC', margin: '10px 0 0 0' }} />
        </div>
      )}

      {/* Body */}
      <div style={{ padding: '24px 40px 0 40px' }}>
        {/* About Me */}
        {personalInfo.summary && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: BLUE, margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>About Me</h2>
            <p style={{ fontSize: '13px', lineHeight: '1.7', color: MUTED, margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Education + Skills Split */}
        {(education.length > 0 || skillList.length > 0) && (
          <div style={{ display: 'flex', marginBottom: '24px' }}>
            {/* Education */}
            {education.length > 0 && (
              <div style={{ flex: 1, paddingRight: '20px' }}>
                <h2 style={{ fontSize: '15px', fontWeight: 700, color: BLUE, margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Education</h2>
                {/* Timeline line with dots */}
                <div style={{ position: 'relative' as const, paddingTop: '4px' }}>
                  <div style={{ height: '2px', background: BLUE, position: 'relative' as const, marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                    {education.map((edu) => (
                      <div key={edu.id} style={{ width: '10px', height: '10px', borderRadius: '50%', background: BLUE, position: 'relative' as const, top: '-4px' }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                    {education.map((edu) => (
                      <div key={edu.id} style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: MUTED }}>{edu.graduationDate}</div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: DARK, textTransform: 'uppercase', marginTop: '2px' }}>{edu.school || edu.institution}</div>
                        <div style={{ fontSize: '11px', color: MUTED, marginTop: '2px' }}>{edu.degree}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Vertical Divider */}
            {education.length > 0 && skillList.length > 0 && (
              <div style={{ width: '1px', background: '#CCCCCC', flexShrink: 0, margin: '0 4px' }} />
            )}

            {/* Skills */}
            {skillList.length > 0 && (
              <div style={{ flex: 1, paddingLeft: '20px' }}>
                <h2 style={{ fontSize: '15px', fontWeight: 700, color: BLUE, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Skills</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {skillList.map((s, i) => (
                    <div key={i} style={{ fontSize: '13px', color: MUTED }}>{s}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Certificates */}
        {certList.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: BLUE, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Certificates</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {certList.map((cert) => (
                <div key={cert.id} style={{ fontSize: '13px', color: MUTED }}>
                  <span style={{ fontWeight: 700, color: DARK }}>{cert.name}</span>
                  {cert.issuer ? ` \u2013 ${cert.issuer}` : ''}{cert.date ? ` (${cert.date})` : ''}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projList.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: BLUE, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Projects</h2>
            {projList.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: DARK }}>{proj.name}</div>
                {proj.description && <p style={{ fontSize: '12px', color: MUTED, margin: '2px 0 0 0', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: BLUE, margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Work Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: DARK, textTransform: 'uppercase' }}>
                    {exp.company}{exp.company && (exp.position || exp.role) ? ' - ' : ''}{exp.position || exp.role}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: DARK, whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? '-' : ''}{exp.current ? 'NOW' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <div style={{ fontSize: '12px', color: MUTED, margin: '4px 0 0 0', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{exp.description}</div>
                )}
                {exp.description && exp.description.split('\n').filter(Boolean).length > 1 && (
                  <ul style={{ margin: '4px 0 0 0', padding: '0 0 0 14px', fontSize: '12px', color: MUTED, lineHeight: '1.7' }}>
                    {exp.description.split('\n').filter(Boolean).map((line, li) => <li key={li}>{line}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Blue Bar */}
      <div style={{ background: BLUE, height: '10px', marginTop: '8px' }} />
    </div>
  );
};

export default React.memo(BlueFramedTimelineComponent);
