import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe, Linkedin, User } from 'lucide-react';

interface OverlappingPortfolioProps { data: ResumeData; }

const OverlappingPortfolioComponent: React.FC<OverlappingPortfolioProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const contactItems = [
    { icon: Phone, value: personalInfo.phone, label: 'Phone' },
    { icon: Mail, value: personalInfo.email, label: 'Email' },
    { icon: MapPin, value: personalInfo.location, label: 'Address' },
    { icon: Globe, value: personalInfo.website, label: 'Website' },
    { icon: Linkedin, value: personalInfo.linkedin, label: 'LinkedIn' },
  ].filter(item => item.value);

  const SkillBar: React.FC<{ name: string; pct: number }> = ({ name, pct }) => (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#222', marginBottom: '4px' }}>{name}</div>
      <div style={{ height: '6px', borderRadius: '3px', background: '#E0E0E0', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: '3px', background: '#222' }} />
      </div>
    </div>
  );

  // Decorative dot grid: 6 cols x 3 rows
  const DotGrid: React.FC = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 14px)', gap: '8px', marginTop: '24px' }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#222' }} />
      ))}
    </div>
  );

  return (
    <div style={{
      width: '100%', minHeight: '1122px', background: '#FFFFFF', color: '#222222',
      fontFamily: '"Poppins","Montserrat",sans-serif',
      display: 'flex', position: 'relative' as const, boxSizing: 'border-box' as const,
    }}>
      {/* Left Column 34% */}
      <div style={{
        width: '34%', flexShrink: 0, background: '#FAFAFA',
        padding: '120px 24px 28px 28px', display: 'flex', flexDirection: 'column',
      }}>
        {/* About Me */}
        {personalInfo.summary && (
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#222', margin: '0 0 10px 0', letterSpacing: '0.02em' }}>About Me</h2>
            <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Contact */}
        {contactItems.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#222', margin: '0 0 ' + (personalInfo.summary ? '10px' : '10px') + ' 0', letterSpacing: '0.02em' }}>Contact</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {contactItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <item.icon size={14} color="#222" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '12.5px', color: '#555', wordBreak: 'break-word' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expertise */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#222', margin: '0 0 ' + (contactItems.length ? '10px' : '10px') + ' 0', letterSpacing: '0.02em' }}>Expertise</h2>
            {skills.map((s, i) => (
              <SkillBar key={i} name={s} pct={Math.max(55, 100 - i * 8)} />
            ))}
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#222', margin: '0 0 10px 0', letterSpacing: '0.02em' }}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#222' }}>{proj.name}</div>
                {proj.description && <p style={{ fontSize: '13px', color: '#555', margin: '2px 0 0 0', lineHeight: '1.6' }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#222', margin: '0 0 10px 0', letterSpacing: '0.02em' }}>Certifications</h2>
            {certifications.map((cert) => (
              <p key={cert.id} style={{ fontSize: '13px', color: '#555', margin: '0 0 4px 0' }}>{cert.name}{cert.issuer ? ` \u2013 ${cert.issuer}` : ''}{cert.date ? ` (${cert.date})` : ''}</p>
            ))}
          </div>
        )}

        {/* Decorative Dot Grid */}
        <DotGrid />
      </div>

      {/* Right Column 66% */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', position: 'relative' as const }}>
        {/* Black Banner - starts from middle toward right */}
        <div style={{
          background: '#2D2D2D', padding: '32px 32px 28px 60px', marginTop: '30px',
        }}>
          <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#FFFFFF', margin: 0, lineHeight: 1.1, letterSpacing: '0.01em' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '14px', fontWeight: 400, color: '#BBBBBB', marginTop: '2px', marginBottom: 0, letterSpacing: '0.08em', textTransform: 'lowercase' }}>
            {personalInfo.jobTitle || 'professional title'}
          </p>
        </div>

        {/* Profile Photo - overlaps both columns and banner */}
        <div style={{
          position: 'absolute', top: '0', left: '-90px', zIndex: 10,
          width: '140px', height: '140px', borderRadius: '30px', overflow: 'hidden',
          border: '3px solid #FFFFFF', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          {personalInfo.photoUrl ? (
            <img src={personalInfo.photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{
              width: '100%', height: '100%', background: '#E0E0E0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <User size={42} color="#999" />
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '28px 32px 28px 32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Education Timeline */}
          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#222', margin: '0 0 16px 0', letterSpacing: '0.02em' }}>Education</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {education.map((edu, idx) => (
                  <div key={edu.id} style={{ display: 'flex', gap: '14px' }}>
                    {/* Timeline indicator */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '14px', flexShrink: 0 }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#222', marginTop: '4px' }} />
                      {idx < education.length - 1 && <div style={{ width: '2px', flex: 1, background: '#222', marginTop: '4px' }} />}
                    </div>
                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0, paddingBottom: idx < education.length - 1 ? '0' : '0' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#222' }}>{edu.graduationDate}</div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#444', marginTop: '1px' }}>{edu.school}</div>
                      <div style={{ fontSize: '13px', color: '#666', marginTop: '1px' }}>{edu.degree}</div>
                      {edu.description && <div style={{ fontSize: '13px', color: '#555', marginTop: '4px', lineHeight: '1.6' }}>{edu.description}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience Timeline */}
          {experience.length > 0 && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#222', margin: '0 0 16px 0', letterSpacing: '0.02em' }}>Work Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {experience.map((exp, idx) => (
                  <div key={exp.id} style={{ display: 'flex', gap: '14px' }}>
                    {/* Timeline indicator */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '14px', flexShrink: 0 }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#222', marginTop: '4px' }} />
                      {idx < experience.length - 1 && <div style={{ width: '2px', flex: 1, background: '#222', marginTop: '4px' }} />}
                    </div>
                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0, paddingBottom: idx < experience.length - 1 ? '0' : '0' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#222' }}>
                        {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#444', marginTop: '1px' }}>{exp.company}</div>
                      <div style={{ fontSize: '13px', color: '#666', marginTop: '1px' }}>{exp.role}</div>
                      {exp.description && (
                        <ul style={{ margin: '4px 0 0 0', padding: '0 0 0 16px', fontSize: '13px', color: '#555', lineHeight: '1.7' }}>
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

export default React.memo(OverlappingPortfolioComponent);
