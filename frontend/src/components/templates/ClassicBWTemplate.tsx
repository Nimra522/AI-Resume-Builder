import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe, User, Linkedin } from 'lucide-react';

interface ClassicBWProps { data: ResumeData; }

const ClassicBWComponent: React.FC<ClassicBWProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;
  const fileRef = useRef<HTMLInputElement>(null);
  const [photoSrc, setPhotoSrc] = useState<string>(personalInfo.photoUrl || '');

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => { setPhotoSrc(ev.target?.result as string); };
      reader.readAsDataURL(file);
    }
  }, []);

  const nameParts = personalInfo.fullName?.trim().split(' ') || [];
  const firstName = nameParts[0] || 'YOUR';
  const lastName = nameParts.slice(1).join(' ') || 'NAME';

  const contactItems = [
    { icon: Phone, value: personalInfo.phone },
    { icon: Mail, value: personalInfo.email },
    { icon: MapPin, value: personalInfo.location },
    { icon: Globe, value: personalInfo.website },
    { icon: Linkedin, value: personalInfo.linkedin },
  ].filter(item => item.value);

  const SectionHeading: React.FC<{ title: string }> = ({ title }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', marginTop: '20px' }}>
      <span style={{ fontSize: '20px', color: '#000', lineHeight: 1 }}>{'\u25CF'}</span>
      <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.12em', color: '#000' }}>{title}</span>
    </div>
  );

  return (
    <div style={{
      width: '100%', minHeight: '1122px', background: '#FFFFFF', color: '#000000',
      fontFamily: '"Poppins","Montserrat",sans-serif',
      border: '2px solid #000000', boxSizing: 'border-box' as const,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: '28px', padding: '28px 32px 24px', alignItems: 'center' }}>
        {photoSrc ? (
          <div style={{
            width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden',
            flexShrink: 0, border: '2px solid #000', cursor: 'pointer',
          }} onClick={() => fileRef.current?.click()}>
            <img src={photoSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ) : (
          <div style={{
            width: '130px', height: '130px', borderRadius: '50%', flexShrink: 0,
            border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#F5F5F5', cursor: 'pointer',
          }} onClick={() => fileRef.current?.click()}>
            <User size={48} color="#999" />
          </div>
        )}
        <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
        <div>
          <h1 style={{ fontSize: '52px', fontWeight: 800, lineHeight: 1, letterSpacing: '0.02em', margin: 0, color: '#000' }}>
            {personalInfo.fullName ? personalInfo.fullName.toUpperCase() : 'YOUR NAME'}
          </h1>
          <p style={{
            fontSize: '14px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#555555', marginTop: '4px', marginBottom: 0,
          }}>
            {personalInfo.jobTitle || 'PROFESSIONAL TITLE'}
          </p>
        </div>
      </div>

      <div style={{ height: '2px', background: '#000', margin: '0' }} />

      {/* Two-column */}
      <div style={{ display: 'flex', padding: '24px 32px 28px', gap: '32px' }}>
        {/* Left 58% */}
        <div style={{ flex: '1.38', minWidth: 0 }}>
          {/* Work Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '4px' }}>
              <SectionHeading title="WORK EXPERIENCE" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.04em', color: '#000' }}>{exp.company?.toUpperCase()}</div>
                    <div style={{ fontSize: '12px', fontStyle: 'italic', color: '#666', marginTop: '1px' }}>
                      {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#333', marginTop: '2px' }}>{exp.role}</div>
                    {exp.description && (
                      <ul style={{ margin: '4px 0 0 0', padding: '0 0 0 16px', fontSize: '13px', color: '#555', lineHeight: '1.6' }}>
                        {exp.description.split('\n').filter(Boolean).map((line, li) => <li key={li}>{line}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '4px' }}>
              <SectionHeading title="EDUCATION" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#000' }}>{edu.school}</div>
                    <div style={{ fontSize: '12px', fontStyle: 'italic', color: '#666', marginTop: '1px' }}>{edu.graduationDate}</div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#333', marginTop: '2px' }}>{edu.degree}</div>
                    {edu.description && <div style={{ fontSize: '13px', color: '#555', marginTop: '3px', lineHeight: '1.5' }}>{edu.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Computer Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '4px' }}>
              <SectionHeading title="COMPUTER SKILLS" />
              <ul style={{ margin: '0', padding: '0 0 0 28px', fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
                {skills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div style={{ marginBottom: '4px' }}>
              <SectionHeading title="PROJECTS" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#000' }}>{proj.name}</div>
                    {proj.description && <div style={{ fontSize: '13px', color: '#555', marginTop: '2px', lineHeight: '1.5' }}>{proj.description}</div>}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{proj.technologies.join(', ')}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div style={{ marginBottom: '4px' }}>
              <SectionHeading title="CERTIFICATIONS" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#000' }}>{cert.name}</div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '1px' }}>
                      {cert.issuer}{cert.issuer && cert.date ? ' \u2013 ' : ''}{cert.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 42% */}
        <div style={{ flex: '1', minWidth: 0 }}>
          {/* About Me Card */}
          {personalInfo.summary && (
            <div style={{
              background: '#3D3D3D', padding: '20px 22px', marginBottom: '20px',
            }}>
              <h2 style={{
                fontSize: '16px', fontWeight: 700, letterSpacing: '0.15em', color: '#FFFFFF',
                margin: 0, marginBottom: '6px',
              }}>ABOUT ME</h2>
              <div style={{ width: '30px', height: '2px', background: '#FFFFFF', marginBottom: '12px' }} />
              <p style={{
                fontSize: '13px', color: '#EEEEEE', lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap',
              }}>
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Contact Me */}
          {contactItems.length > 0 && (
            <div>
              <div style={{
                background: '#000000', padding: '10px 16px', textAlign: 'center' as const,
              }}>
                <span style={{
                  fontSize: '15px', fontWeight: 700, letterSpacing: '0.15em',
                  color: '#FFFFFF', textTransform: 'uppercase',
                }}>CONTACT ME</span>
              </div>
              <div style={{ padding: '12px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {contactItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <item.icon size={16} color="#000" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: '#555', wordBreak: 'break-word' }}>{item.value}</span>
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

export default React.memo(ClassicBWComponent);
