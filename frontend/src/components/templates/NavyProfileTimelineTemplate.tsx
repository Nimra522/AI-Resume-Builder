import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe, Camera } from 'lucide-react';

interface Props { data: ResumeData; }

const SIDEBAR_BG = '#E3E8ED';
const NAVY = '#353B48';
const DARK = '#222222';
const MUTED = '#666666';

const NavyProfileTimelineComponent: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
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

  const contactItems = [
    { icon: Phone, value: personalInfo.phone },
    { icon: Mail, value: personalInfo.email },
    { icon: MapPin, value: personalInfo.location },
    { icon: Globe, value: personalInfo.website },
  ].filter(c => c.value);

  const skillList = skills || [];
  const certList = certifications || [];
  const projList = projects || [];

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', fontFamily: '"Montserrat",sans-serif', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />

      {/* Top Row: Sidebar + Header side by side */}
      <div style={{ display: 'flex' }}>
        {/* Left Sidebar */}
        <div style={{ width: '34%', flexShrink: 0, background: SIDEBAR_BG, padding: '28px 20px 28px 20px' }}>
          {/* Profile Image */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', background: '#D0D5DA', cursor: 'pointer' }} onClick={() => fileRef.current?.click()}>
              {photoSrc ? (
                <img src={photoSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#999999', gap: '6px' }}>
                  <Camera size={32} />
                  <span style={{ fontSize: '10px' }}>Photo</span>
                </div>
              )}
            </div>
          </div>

          {/* Contact */}
          {contactItems.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 700, color: DARK, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Contact</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {contactItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <item.icon size={14} color={DARK} strokeWidth={2} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: MUTED }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 700, color: DARK, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', color: MUTED }}>{edu.graduationDate}</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: DARK, marginTop: '2px' }}>{edu.school || edu.institution}</div>
                  <div style={{ fontSize: '12px', color: MUTED, marginTop: '1px' }}>{edu.degree}</div>
                  {edu.description && <div style={{ fontSize: '11px', color: MUTED, marginTop: '1px' }}>{edu.description}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skillList.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 700, color: DARK, margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Skills</h2>
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '12px', color: MUTED, lineHeight: '1.8' }}>
                {skillList.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

        </div>

        {/* Right Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <div style={{ padding: '28px 32px 20px 28px' }}>
            <h1 style={{ fontSize: '46px', fontWeight: 800, color: DARK, margin: 0, lineHeight: 1 }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p style={{ fontSize: '15px', fontWeight: 400, color: MUTED, margin: '4px 0 0 0' }}>
              {'\u2013'} {personalInfo.jobTitle || 'Job Title'}
            </p>
          </div>

          {/* Profile Section - Full width navy */}
          {personalInfo.summary && (
            <div style={{ background: NAVY, padding: '20px 32px 20px 28px', width: '100%', boxSizing: 'border-box' as const }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Profile</h2>
              <p style={{ fontSize: '12px', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)', margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <div style={{ padding: '24px 32px 0 28px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Work Experience</h2>
              {experience.map((exp, idx) => (
                <div key={exp.id} style={{ display: 'flex', gap: '14px', marginBottom: idx < experience.length - 1 ? '18px' : '0' }}>
                  {/* Timeline: square dot + line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '12px', flexShrink: 0 }}>
                    <div style={{ width: '8px', height: '8px', background: NAVY, marginTop: '4px', zIndex: 1 }} />
                    {idx < experience.length - 1 && <div style={{ width: '2px', flex: 1, background: '#CCCCCC', marginTop: '2px' }} />}
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0, paddingBottom: idx < experience.length - 1 ? '0' : '0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: DARK }}>{exp.company}</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: MUTED, whiteSpace: 'nowrap', marginLeft: '12px' }}>
                        {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: MUTED, marginTop: '1px' }}>{exp.position || exp.role}</div>
                    {exp.description && (
                      <ul style={{ margin: '4px 0 0 0', padding: '0 0 0 14px', fontSize: '12px', color: MUTED, lineHeight: '1.7' }}>
                        {exp.description.split('\n').filter(Boolean).map((line, li) => <li key={li}>{line}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certificates */}
          {certList.length > 0 && (
            <div style={{ padding: '20px 32px 0 28px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Certificates</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {certList.map((cert) => (
                  <div key={cert.id} style={{ fontSize: '12px', color: MUTED }}>
                    <span style={{ fontWeight: 700, color: DARK }}>{cert.name}</span>
                    {cert.issuer ? ` \u2013 ${cert.issuer}` : ''}{cert.date ? ` (${cert.date})` : ''}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projList.length > 0 && (
            <div style={{ padding: '20px 32px 0 28px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Projects</h2>
              {projList.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: DARK }}>{proj.name}</div>
                  {proj.description && <p style={{ fontSize: '12px', color: MUTED, margin: '2px 0 0 0', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default React.memo(NavyProfileTimelineComponent);
