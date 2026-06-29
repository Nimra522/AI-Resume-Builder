import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

interface Props { data: ResumeData; }

const SIDEBAR_BG = '#F5F5F5';
const SUMMARY_BG = '#EEEEEE';
const DARK = '#000000';
const MUTED = '#555555';

const LightSidebarSectionsComponent: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;

  const contactItems = [
    { icon: Phone, value: personalInfo.phone },
    { icon: Mail, value: personalInfo.email },
    { icon: MapPin, value: personalInfo.location },
    { icon: Globe, value: personalInfo.website },
  ].filter(c => c.value);

  const skillList = skills || [];
  const awardList = certifications || [];
  const projList = projects || [];

  const SectionHeading: React.FC<{ label: string }> = ({ label }) => (
    <div style={{ marginBottom: '12px' }}>
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</h2>
      <hr style={{ border: 'none', borderTop: '1.5px solid #000000', margin: '4px 0 0 0' }} />
    </div>
  );

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', fontFamily: '"Montserrat","Inter","Poppins",sans-serif', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '32px 36px 20px 36px' }}>
        <div>
          <h1 style={{ fontSize: '46px', fontWeight: 800, color: DARK, margin: 0, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '15px', fontWeight: 400, color: MUTED, margin: '4px 0 0 0' }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
        {contactItems.length > 0 && (
          <div style={{ textAlign: 'right' as const, flexShrink: 0, marginLeft: '20px' }}>
            {contactItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', marginBottom: '4px', fontSize: '12px', color: MUTED }}>
                <span>{item.value}</span>
                <item.icon size={13} strokeWidth={2} style={{ flexShrink: 0 }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Block */}
      {personalInfo.summary && (
        <div style={{ background: SUMMARY_BG, padding: '16px 36px', marginBottom: '20px' }}>
          <div style={{ marginBottom: '8px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Summary</h2>
            <hr style={{ border: 'none', borderTop: '1.5px solid #000000', margin: '4px 0 0 0' }} />
          </div>
          <p style={{ fontSize: '13px', lineHeight: '1.7', color: MUTED, margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Body: Two Columns */}
      <div style={{ display: 'flex' }}>
        {/* Left Column (Sidebar) */}
        <div style={{ width: '35%', flexShrink: 0, background: SIDEBAR_BG, padding: '0 24px 28px 24px' }}>
          {/* Skill */}
          {skillList.length > 0 && (
            <div style={{ marginBottom: '24px', paddingTop: '20px' }}>
              <SectionHeading label="Skill" />
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: MUTED, lineHeight: '1.9' }}>
                {skillList.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {/* Awards */}
          {awardList.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <SectionHeading label="Awards" />
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: MUTED, lineHeight: '1.9' }}>
                {awardList.map((a) => <li key={a.id}>{a.name}{a.date ? ` (${a.date})` : ''}</li>)}
              </ul>
            </div>
          )}

          {/* Projects */}
          {projList.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <SectionHeading label="Projects" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {projList.map((proj) => (
                  <div key={proj.id}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: DARK }}>{proj.name}</div>
                    {proj.description && <div style={{ fontSize: '13px', color: MUTED, marginTop: '2px', lineHeight: '1.6' }}>{proj.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: 1, minWidth: 0, padding: '0 36px 28px 32px' }}>
          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '24px', paddingTop: '20px' }}>
              <SectionHeading label="Experience" />
              {experience.map((exp) => (
                <div key={exp.id} style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ width: '30%', flexShrink: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: DARK }}>{exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: DARK, marginTop: '2px' }}>{exp.company}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: DARK }}>{exp.position || exp.role}</div>
                    {exp.description && (
                      <p style={{ fontSize: '13px', color: MUTED, margin: '4px 0 0 0', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <SectionHeading label="Education" />
              {education.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
                  <div style={{ width: '30%', flexShrink: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: DARK }}>{edu.graduationDate}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: DARK, marginTop: '2px' }}>{edu.school || edu.institution}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: DARK }}>{edu.degree}</div>
                    {edu.description && (
                      <p style={{ fontSize: '13px', color: MUTED, margin: '4px 0 0 0', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{edu.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default React.memo(LightSidebarSectionsComponent);
