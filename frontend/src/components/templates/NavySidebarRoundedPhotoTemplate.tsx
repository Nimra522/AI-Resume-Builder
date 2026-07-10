import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, Globe, MapPin, Linkedin, Camera } from 'lucide-react';

interface Props { data: ResumeData; }

const NAVY = '#3D4657';
const DARK = '#222222';

const NavySidebarRoundedPhotoComponent: React.FC<Props> = ({ data }) => {
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
    { icon: Globe, value: personalInfo.website },
    { icon: Linkedin, value: personalInfo.linkedin },
    { icon: MapPin, value: personalInfo.location },
  ].filter(c => c.value);

  const certList = certifications || [];
  const projList = projects || [];

  const NavyHeading: React.FC<{ label: string }> = ({ label }) => (
    <div style={{ marginBottom: '12px' }}>
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</h2>
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.4)', margin: '4px 0 0 0' }} />
    </div>
  );

  const WhiteHeading: React.FC<{ label: string }> = ({ label }) => (
    <div style={{ marginBottom: '12px' }}>
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: NAVY, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</h2>
      <hr style={{ border: 'none', borderTop: '1px solid ' + NAVY, margin: '4px 0 0 0' }} />
    </div>
  );

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', fontFamily: '"Montserrat","Inter","Poppins",sans-serif', boxSizing: 'border-box' }}>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '28px 32px 0 32px', gap: '28px' }}>
        {/* Left: Navy box with photo */}
        <div style={{ background: NAVY, borderRadius: '16px', padding: '14px', flexShrink: 0 }}>
          <div style={{ width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', background: '#5A6374', cursor: 'pointer' }} onClick={() => fileRef.current?.click()}>
            {photoSrc ? (
              <img src={photoSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', gap: '6px' }}>
                <Camera size={28} />
                <span style={{ fontSize: '9px' }}>Photo</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Name + Title */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: NAVY, margin: 0, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '15px', fontWeight: 500, color: NAVY, margin: '4px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
      </div>

      {/* Contact Strip */}
      {contactItems.length > 0 && (
        <div style={{ background: NAVY, padding: '10px 32px', display: 'flex', justifyContent: 'space-around', margin: '20px 32px 0 32px', borderRadius: '8px', flexWrap: 'wrap', gap: '8px' }}>
          {contactItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <item.icon size={14} color="#FFFFFF" strokeWidth={2} />
              <span style={{ fontSize: '11px', color: '#FFFFFF' }}>{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Body: Two Columns */}
      <div style={{ display: 'flex', marginTop: '24px' }}>
        {/* Left Column - Navy */}
        <div style={{ width: '35%', flexShrink: 0, background: NAVY, padding: '20px 20px 28px 20px' }}>
          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <NavyHeading label="Education" />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>{edu.degree}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>{edu.school || edu.institution}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '1px' }}>{edu.graduationDate}{edu.graduationDate && edu.location ? ' | ' : ''}{edu.location || ''}</div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certList.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <NavyHeading label="Certifications" />
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '12px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.8' }}>
                {certList.map((cert) => <li key={cert.id}>{cert.name}{cert.issuer ? ` \u2013 ${cert.issuer}` : ''}</li>)}
              </ul>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <NavyHeading label="Skills" />
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '12px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.8' }}>
                {skills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column - White */}
        <div style={{ flex: 1, minWidth: 0, padding: '0 28px 28px 28px' }}>
          {/* About me */}
          {personalInfo.summary && (
            <div style={{ marginBottom: '24px' }}>
              <WhiteHeading label="About me" />
              <p style={{ fontSize: '13px', lineHeight: '1.7', color: DARK, margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <WhiteHeading label="Experience" />
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: NAVY }}>{exp.position || exp.role}</span>
                    <span style={{ fontSize: '12px', color: NAVY, whiteSpace: 'nowrap', marginLeft: '12px' }}>
                      {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: DARK, marginTop: '2px' }}>{exp.company}</div>
                  {exp.description && (
                    <p style={{ fontSize: '12px', color: DARK, margin: '4px 0 0 0', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projList.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <WhiteHeading label="Projects" />
              {projList.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: NAVY }}>{proj.name}</div>
                  {proj.description && <p style={{ fontSize: '12px', color: DARK, margin: '2px 0 0 0', lineHeight: '1.6' }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(NavySidebarRoundedPhotoComponent);
