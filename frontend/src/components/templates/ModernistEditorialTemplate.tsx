import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

interface ModernistEditorialProps {
  data: ResumeData;
}

const s = {
  page: {
    width: '100%',
    minHeight: '1122px',
    background: '#FFFFFF',
    color: '#111111',
    fontFamily: '"Inter","Helvetica Neue",Arial,sans-serif',
    padding: '48px 52px',
    boxSizing: 'border-box' as const,
    fontSize: '14px',
    lineHeight: '1.5',
  },
  accent: '#F7F6B4',
  black: '#000000',
  gray: '#444444',
  lightGray: '#888888',
};

const ModernistEditorialComponent: React.FC<ModernistEditorialProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const nameParts = personalInfo.fullName?.trim().split(' ') || [];
  const firstName = nameParts[0] || 'Your';
  const lastName = nameParts.slice(1).join(' ') || 'Name';

  const contactItems = [
    { icon: Phone, label: 'Phone', value: personalInfo.phone },
    { icon: Mail, label: 'Email', value: personalInfo.email },
    { icon: MapPin, label: 'Address', value: personalInfo.location },
    { icon: Linkedin, label: 'LinkedIn', value: personalInfo.linkedin },
  ].filter(item => item.value);

  const DecorativeLine: React.FC<{ style?: React.CSSProperties }> = ({ style: extraStyle }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0', width: '100%', ...extraStyle }}>
      <div style={{ flex: 1, height: '1px', background: s.black }} />
      <div style={{
        width: '10px', height: '10px', border: `1.5px solid ${s.black}`,
        background: 'transparent', flexShrink: 0, marginLeft: '-1px',
      }} />
    </div>
  );

  return (
    <div style={s.page}>
      {/* Header: Name + Photo */}
      <div style={{ display: 'flex', gap: '40px', marginBottom: '32px' }}>
        {/* Left: Name */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '18px', fontWeight: '300', letterSpacing: '0.25em',
            textTransform: 'uppercase', color: s.black, marginBottom: '4px',
          }}>
            {firstName}
          </div>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{
              position: 'absolute', inset: '4px -8px 4px -8px',
              background: s.accent, zIndex: 0,
            }} />
            <div style={{
              fontSize: '58px', fontWeight: '800', lineHeight: '1.05',
              textTransform: 'uppercase', color: s.black, position: 'relative', zIndex: 1,
            }}>
              {lastName}
            </div>
          </div>
        </div>

        {/* Right: Photo */}
        {personalInfo.photoUrl ? (
          <div style={{ width: '160px', height: '200px', flexShrink: 0, overflow: 'hidden' }}>
            <img src={personalInfo.photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ) : null}
      </div>

      {/* Contact */}
      {contactItems.length > 0 && (
        <div style={{ marginBottom: '36px' }}>
          {contactItems.map((item, i) => (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0' }}>
                <item.icon size={18} color={s.black} strokeWidth={1.5} />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: s.black }}>{item.label}</div>
                  <div style={{ fontSize: '13px', color: s.gray, marginTop: '1px' }}>{item.value}</div>
                </div>
              </div>
              {i < contactItems.length - 1 && <div style={{ height: '1px', background: s.black }} />}
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: '36px' }}>
          <div style={{ fontSize: '22px', fontWeight: '700', color: s.black, marginBottom: '8px' }}>Summary</div>
          <DecorativeLine style={{ marginBottom: '14px' }} />
          <p style={{ fontSize: '13.5px', color: s.gray, lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Two-column layout */}
      <div style={{ display: 'flex', gap: '48px', marginBottom: '36px' }}>
        {/* Left Column */}
        <div style={{ flex: '1', minWidth: 0 }}>

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '22px', fontWeight: '700', color: s.black, marginBottom: '14px' }}>Education</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: s.black }}>{edu.degree}</div>
                    <div style={{ fontSize: '13px', color: s.gray, marginTop: '2px' }}>{edu.school}</div>
                    <div style={{ fontSize: '12px', fontStyle: 'italic', color: s.lightGray, marginTop: '1px' }}>{edu.graduationDate}</div>
                    {edu.description && <div style={{ fontSize: '13px', color: s.gray, marginTop: '6px', lineHeight: '1.6' }}>{edu.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <div style={{ fontSize: '22px', fontWeight: '700', color: s.black, marginBottom: '14px' }}>Skills</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {skills.map((skill, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', fontSize: '13px', color: s.gray }}>
                    <span style={{ fontSize: '16px', lineHeight: 1 }}>\u2022</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Experience */}
        <div style={{ flex: '1', minWidth: 0 }}>
          {experience.length > 0 && (
            <div>
              <div style={{ fontSize: '22px', fontWeight: '700', color: s.black, marginBottom: '14px' }}>Experience</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: s.black }}>{exp.role}</div>
                    <div style={{ fontSize: '13px', color: s.gray, marginTop: '2px' }}>{exp.company}</div>
                    <div style={{ fontSize: '12px', fontStyle: 'italic', color: s.lightGray, marginTop: '1px', marginBottom: '6px' }}>
                      {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </div>
                    {exp.description && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {exp.description.split('\n').filter(Boolean).map((line, li) => (
                          <div key={li} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', fontSize: '13px', color: s.gray, lineHeight: '1.6' }}>
                            <span style={{ fontSize: '16px', lineHeight: 1 }}>\u2022</span>
                            <span>{line}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Optional additional sections below */}
      <div style={{ display: 'flex', gap: '48px', marginBottom: '32px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {certifications.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: s.black, marginBottom: '10px' }}>Certifications</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ fontSize: '13px', color: s.gray }}>{cert.name} <span style={{ color: s.lightGray }}>\u2014 {cert.issuer}</span></div>
                ))}
              </div>
            </div>
          )}

        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {projects && projects.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: s.black, marginBottom: '10px' }}>Projects</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: s.black }}>{proj.name}</div>
                    <div style={{ fontSize: '13px', color: s.gray, lineHeight: '1.6' }}>{proj.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <DecorativeLine />
    </div>
  );
};

export default React.memo(ModernistEditorialComponent);
