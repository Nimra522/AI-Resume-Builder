import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Camera } from 'lucide-react';

interface Props { data: ResumeData; }

const BROWN = '#A96549';
const DARK = '#222222';
const GRAY = '#666666';

const BrownAccentDecorativeComponent: React.FC<Props> = ({ data }) => {
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
  ].filter(c => c.value);

  const nameParts = (personalInfo.fullName || 'Your Name').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  const skillList = skills || [];
  const certList = certifications || [];
  const projList = projects || [];

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', color: DARK, fontFamily: '"Poppins","Montserrat","Inter",sans-serif', boxSizing: 'border-box', position: 'relative' as const }}>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />

      {/* Vertical decorative brown bars */}
      <div style={{ position: 'absolute', left: '0', top: '200px', bottom: '0', width: '32px', background: BROWN }} />
      <div style={{ position: 'absolute', right: '0', top: '200px', bottom: '0', width: '32px', background: BROWN }} />

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', padding: '48px 48px 0 48px' }}>
        {/* Left: Name + Title */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: '54px', fontWeight: 300, color: DARK, margin: 0, lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            {firstName}
          </h1>
          <h1 style={{ fontSize: '54px', fontWeight: 800, color: DARK, margin: 0, lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            {lastName}
          </h1>
          <p style={{ fontSize: '13px', fontWeight: 600, color: GRAY, margin: '8px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>

        {/* Right: Decorative line + Photo */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '200px', height: '200px', flexShrink: 0 }}>
          {/* Horizontal line behind photo */}
          <div style={{ position: 'absolute', left: '-140px', right: '-40px', height: '1px', background: '#000000', top: '50%' }} />
          {/* Black dot on left side of line */}
          <div style={{ position: 'absolute', left: '-160px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#000000' }} />

          {/* Photo */}
          <div style={{ width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', background: '#F0F0F0', cursor: 'pointer', position: 'relative', zIndex: 2 }} onClick={() => fileRef.current?.click()}>
            {photoSrc ? (
              <img src={photoSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#BBBBBB', gap: '6px' }}>
                <Camera size={40} />
                <span style={{ fontSize: '12px' }}>Photo</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body: Two equal columns */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '40px', padding: '36px 48px 28px 48px' }}>
        {/* Left Column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* CONTACT */}
          {contactItems.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#000000', margin: '0 0 16px 0', textTransform: 'lowercase' as const, letterSpacing: '0.02em' }}>Contact</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {contactItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: BROWN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon size={15} color="#FFFFFF" strokeWidth={2} />
                    </div>
                    <span style={{ fontSize: '14px', color: GRAY }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUMMARY */}
          {personalInfo.summary && (
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#000000', margin: '0 0 12px 0', textTransform: 'lowercase' as const, letterSpacing: '0.02em' }}>Summary</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.75', color: DARK, margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
            </div>
          )}

          {/* EDUCATION */}
          {education.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#000000', margin: '0 0 14px 0', textTransform: 'lowercase' as const, letterSpacing: '0.02em' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: DARK }}>{edu.degree}</div>
                  <div style={{ fontSize: '14px', color: GRAY, marginTop: '2px' }}>{edu.school || edu.institution}</div>
                  <div style={{ fontSize: '13px', color: GRAY }}>{edu.graduationDate}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* SKILLS */}
          {skillList.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#000000', margin: '0 0 14px 0', textTransform: 'lowercase' as const, letterSpacing: '0.02em' }}>Skills :</h2>
              <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: '14px', color: DARK, lineHeight: '1.9' }}>
                {skillList.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#000000', margin: '0 0 14px 0', textTransform: 'lowercase' as const, letterSpacing: '0.02em' }}>Experience :</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '22px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: DARK }}>{exp.position || exp.role}</div>
                  <div style={{ fontSize: '14px', color: GRAY, marginTop: '2px' }}>
                    {exp.company}{exp.company && (exp.startDate || exp.endDate) ? ' | ' : ''}{exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                  </div>
                  {exp.description && (
                    <ul style={{ margin: '4px 0 0 0', padding: '0 0 0 18px', fontSize: '14px', color: DARK, lineHeight: '1.75' }}>
                      {exp.description.split('\n').filter(Boolean).map((line, li) => <li key={li}>{line}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {projList.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#000000', margin: '0 0 14px 0', textTransform: 'lowercase' as const, letterSpacing: '0.02em' }}>Projects :</h2>
              {projList.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: DARK }}>{proj.name}</div>
                  {proj.description && <div style={{ fontSize: '14px', color: GRAY, marginTop: '2px', lineHeight: '1.7' }}>{proj.description}</div>}
                </div>
              ))}
            </div>
          )}

          {/* CERTIFICATIONS */}
          {certList.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#000000', margin: '0 0 14px 0', textTransform: 'lowercase' as const, letterSpacing: '0.02em' }}>Certifications :</h2>
              {certList.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: DARK }}>{cert.name}</div>
                  <div style={{ fontSize: '14px', color: GRAY, marginTop: '2px' }}>{cert.issuer}{cert.issuer && cert.date ? ' \u2013 ' : ''}{cert.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(BrownAccentDecorativeComponent);
