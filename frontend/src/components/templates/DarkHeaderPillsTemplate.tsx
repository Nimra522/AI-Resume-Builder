import React from 'react';
import { ResumeData } from '../../types';
import { Phone, GraduationCap, Settings, User, Briefcase, BookOpen } from 'lucide-react';

interface Props { data: ResumeData; }

const DARK = '#2B2A29';
const MUTED = '#666666';

const PillIcon: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    border: '1px solid #000000', borderRadius: '30px',
    padding: '6px 18px 6px 14px', fontSize: '16px', fontWeight: 700,
    color: '#000000', textTransform: 'uppercase' as const, letterSpacing: '0.04em',
  }}>
    {icon}
    <span>{label}</span>
  </div>
);

const DarkHeaderPillsComponent: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const contactItems = [
    personalInfo.phone,
    personalInfo.email,
    personalInfo.website,
    personalInfo.linkedin,
    personalInfo.location,
  ].filter(Boolean);

  const skillList = skills || [];

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', fontFamily: '"Montserrat","Poppins",sans-serif', boxSizing: 'border-box' }}>
      {/* Dark Header Block */}
      <div style={{ background: DARK, padding: '36px 30px', textAlign: 'center' as const }}>
        <h1 style={{ fontSize: '56px', fontWeight: 900, color: '#FFFFFF', margin: 0, lineHeight: 1.1, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: '18px', fontWeight: 400, color: '#FFFFFF', margin: '6px 0 0 0', letterSpacing: '0.18em' }}>
          {personalInfo.jobTitle || 'Job Title'}
        </p>
      </div>

      {/* Body: Two Columns */}
      <div style={{ display: 'flex', gap: '32px', padding: '32px 36px 28px 36px' }}>
        {/* Left Column */}
        <div style={{ width: '37%', flexShrink: 0 }}>
          {/* Contact */}
          {contactItems.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <PillIcon icon={<Phone size={16} strokeWidth={2} />} label="Contact" />
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {contactItems.map((item, i) => (
                  <div key={i} style={{ fontSize: '13px', color: MUTED }}>{item}</div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <PillIcon icon={<GraduationCap size={16} strokeWidth={2} />} label="Education" />
              <div style={{ marginTop: '14px' }}>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#000000' }}>{edu.school || edu.institution}</div>
                    <div style={{ fontSize: '13px', color: '#000000', marginTop: '1px' }}>{edu.degree}</div>
                    <div style={{ fontSize: '12px', color: MUTED, marginTop: '1px' }}>{edu.graduationDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skillList.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <PillIcon icon={<Settings size={16} strokeWidth={2} />} label="Skills" />
              <ul style={{ margin: '12px 0 0 0', padding: '0 0 0 18px', fontSize: '13px', color: MUTED, lineHeight: '1.9' }}>
                {skillList.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <PillIcon icon={<span style={{ fontSize: '15px', fontWeight: 700 }}>P</span>} label="Projects" />
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ fontSize: '13px', color: MUTED }}>
                    <span style={{ fontWeight: 700, color: '#000000' }}>{proj.name}</span>
                    {proj.description ? ` \u2013 ${proj.description}` : ''}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* About Me */}
          {personalInfo.summary && (
            <div style={{ marginBottom: '28px' }}>
              <PillIcon icon={<User size={16} strokeWidth={2} />} label="About Me" />
              <p style={{ fontSize: '13px', lineHeight: '1.8', color: MUTED, margin: '12px 0 0 0', whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <PillIcon icon={<Briefcase size={16} strokeWidth={2} />} label="Experience" />
              <div style={{ marginTop: '14px' }}>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: '22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#000000' }}>{exp.position || exp.role}</span>
                      <span style={{ fontSize: '12px', fontStyle: 'italic', color: MUTED, whiteSpace: 'nowrap', marginLeft: '12px' }}>
                        {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#000000', marginTop: '2px' }}>{exp.company}</div>
                    {exp.description && (
                      <p style={{ fontSize: '13px', color: MUTED, margin: '4px 0 0 0', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <PillIcon icon={<BookOpen size={16} strokeWidth={2} />} label="Certifications" />
              <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ fontSize: '13px', color: MUTED }}>
                    <span style={{ fontWeight: 700, color: '#000000' }}>{cert.name}</span>
                    {cert.issuer ? ` \u2013 ${cert.issuer}` : ''}
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

export default React.memo(DarkHeaderPillsComponent);
