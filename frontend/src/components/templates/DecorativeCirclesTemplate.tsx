import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe, Linkedin, User } from 'lucide-react';

interface DecorativeCirclesProps { data: ResumeData; }

const STYLE = {
  brown: '#2C2C2C',
  gray: '#666666',
  lightBg: '#F0F0F0',
};

const DecorativeCirclesComponent: React.FC<DecorativeCirclesProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const contactItems = [
    { icon: Phone, value: personalInfo.phone },
    { icon: Mail, value: personalInfo.email },
    { icon: MapPin, value: personalInfo.location },
    { icon: Globe, value: personalInfo.website },
    { icon: Linkedin, value: personalInfo.linkedin },
  ].filter(item => item.value);

  const SkillBar: React.FC<{ name: string; pct: number }> = ({ name, pct }) => (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ fontSize: '13px', fontWeight: 600, color: STYLE.brown, marginBottom: '4px' }}>{name}</div>
      <div style={{ height: '6px', borderRadius: '3px', background: '#E0E0E0', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: '3px', background: STYLE.brown }} />
      </div>
    </div>
  );

  return (
    <div style={{
      width: '100%', minHeight: '1122px', background: '#FFFFFF', color: STYLE.brown,
      fontFamily: '"Poppins","Montserrat",sans-serif',
      position: 'relative' as const, overflow: 'hidden', boxSizing: 'border-box' as const,
    }}>
      {/* Decorative large light gray circles */}
      <div style={{
        position: 'absolute', top: '-80px', left: '-80px', width: '340px', height: '340px',
        borderRadius: '50%', background: '#F4F4F4', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', top: '-60px', right: '-60px', width: '260px', height: '260px',
        borderRadius: '50%', background: '#F6F6F6', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', minHeight: '1122px' }}>
        {/* Left Column 34% */}
        <div style={{
          width: '34%', flexShrink: 0, padding: '28px 24px 28px 28px',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Photo */}
          <div style={{
            width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden',
            border: '4px solid #FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginBottom: '16px', flexShrink: 0,
          }}>
            {personalInfo.photoUrl ? (
              <img src={personalInfo.photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{
                width: '100%', height: '100%', background: '#E8E8E8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <User size={40} color="#AAAAAA" />
              </div>
            )}
          </div>

          {/* Contact below photo */}
          {contactItems.length > 0 && (
            <div style={{ marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {contactItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <item.icon size={14} color={STYLE.brown} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '12.5px', color: STYLE.gray, wordBreak: 'break-word' }}>{item.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* About Me */}
          {personalInfo.summary && (
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: STYLE.brown, margin: '0 0 10px 0' }}>About Me</h2>
              <p style={{ fontSize: '13px', color: STYLE.gray, lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
            </div>
          )}

          {/* Expertise */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: STYLE.brown, margin: '0 0 10px 0' }}>Expertise</h2>
              {skills.map((s, i) => (
                <SkillBar key={i} name={s} pct={Math.max(55, 100 - i * 8)} />
              ))}
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: STYLE.brown, margin: '0 0 10px 0' }}>Projects</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: STYLE.brown }}>{proj.name}</div>
                    {proj.description && <p style={{ fontSize: '13px', color: STYLE.gray, margin: '2px 0 0 0', lineHeight: '1.6' }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: STYLE.brown, margin: '0 0 10px 0' }}>Certifications</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {certifications.map((cert) => (
                  <p key={cert.id} style={{ fontSize: '13px', color: STYLE.gray, margin: 0 }}>{cert.name}{cert.issuer ? ` \u2013 ${cert.issuer}` : ''}{cert.date ? ` (${cert.date})` : ''}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column 66% */}
        <div style={{ flex: 1, minWidth: 0, padding: '40px 32px 28px 32px', display: 'flex', flexDirection: 'column' }}>
          {/* Name & Title - upper-right */}
          <div style={{ textAlign: 'right' as const, marginBottom: '36px', marginTop: '20px' }}>
            <h1 style={{
              fontSize: '46px', fontWeight: 700, color: STYLE.brown, lineHeight: 1.05,
              margin: 0, letterSpacing: '0.01em',
            }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p style={{
              fontSize: '14px', fontWeight: 400, color: '#999999', marginTop: '4px',
              marginBottom: 0, letterSpacing: '0.06em', textTransform: 'lowercase' as const,
            }}>
              {personalInfo.jobTitle || 'professional title'}
            </p>
          </div>

          {/* Education Timeline */}
          {education.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: STYLE.brown, margin: '0 0 16px 0' }}>Education</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {education.map((edu, idx) => (
                  <div key={edu.id} style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '14px', flexShrink: 0 }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: STYLE.brown, marginTop: '4px' }} />
                      {idx < education.length - 1 && <div style={{ width: '2px', flex: 1, background: '#CCCCCC', marginTop: '4px' }} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: STYLE.brown }}>{edu.graduationDate}</div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#444', marginTop: '1px' }}>{edu.school}</div>
                      <div style={{ fontSize: '13px', color: STYLE.gray, marginTop: '1px' }}>{edu.degree}</div>
                      {edu.description && <div style={{ fontSize: '13px', color: STYLE.gray, marginTop: '4px', lineHeight: '1.6' }}>{edu.description}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience Timeline */}
          {experience.length > 0 && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: STYLE.brown, margin: '0 0 16px 0' }}>Work Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {experience.map((exp, idx) => (
                  <div key={exp.id} style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '14px', flexShrink: 0 }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: STYLE.brown, marginTop: '4px' }} />
                      {idx < experience.length - 1 && <div style={{ width: '2px', flex: 1, background: '#CCCCCC', marginTop: '4px' }} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: STYLE.brown }}>
                        {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#444', marginTop: '1px' }}>{exp.company}</div>
                      <div style={{ fontSize: '13px', color: STYLE.gray, marginTop: '1px' }}>{exp.role}</div>
                      {exp.description && (
                        <ul style={{ margin: '4px 0 0 0', padding: '0 0 0 16px', fontSize: '13px', color: STYLE.gray, lineHeight: '1.7' }}>
                          {exp.description.split('\n').filter(Boolean).map((line, li) => <li key={li}>{line}</li>)}
                        </ul>
                      )}
                    </div>
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

export default React.memo(DecorativeCirclesComponent);
