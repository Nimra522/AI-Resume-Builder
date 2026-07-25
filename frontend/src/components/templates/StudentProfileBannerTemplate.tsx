import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe, Linkedin, Camera } from 'lucide-react';

interface Props { data: ResumeData; }

const CHARCOAL = '#242021';
const DARK = '#333333';
const GRAY = '#666666';

const StudentProfileBannerComponent: React.FC<Props> = ({ data }) => {
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
    { icon: Linkedin, value: personalInfo.linkedin },
  ].filter(c => c.value);

  const skillList = skills || [];
  const certList = certifications || [];
  const projList = projects || [];

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', color: DARK, fontFamily: '"Poppins","Montserrat","Inter",sans-serif', boxSizing: 'border-box' }}>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />

      {/* Dark Charcoal Banner */}
      <div style={{ background: CHARCOAL, minHeight: '190px', position: 'relative', display: 'flex', alignItems: 'center', paddingLeft: '220px' }}>
        {/* Circular Photo - overlapping top and bottom */}
        <div style={{
          position: 'absolute', left: '40px', top: '50%', transform: 'translateY(-50%)',
          width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden',
          border: '6px solid #FFFFFF', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          background: '#F0F0F0', cursor: 'pointer', zIndex: 2,
        }} onClick={() => fileRef.current?.click()}>
          {photoSrc ? (
            <img src={photoSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#BBBBBB', gap: '6px' }}>
              <Camera size={36} />
              <span style={{ fontSize: '11px' }}>Photo</span>
            </div>
          )}
        </div>

        {/* Name + Title on Right */}
        <div>
          <h1 style={{ fontSize: '64px', fontWeight: 800, color: '#FFFFFF', margin: 0, lineHeight: 1.05, letterSpacing: '0.01em' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '16px', fontWeight: 400, color: 'rgba(255,255,255,0.7)', margin: '4px 0 0 0', letterSpacing: '0.05em' }}>
            {personalInfo.jobTitle || 'Student'}
          </p>
        </div>
      </div>

      {/* Body: Two Equal Columns */}
      <div style={{ display: 'flex', gap: '32px', padding: '36px 40px 28px 40px' }}>
        {/* Left Column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* PROFILE */}
          {personalInfo.summary && (
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#000000', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Profile</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.75', color: DARK, margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
            </div>
          )}

          {/* CONTACT ME */}
          {contactItems.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#000000', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Contact Me</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {contactItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon size={14} color="#FFFFFF" strokeWidth={2} />
                    </div>
                    <span style={{ fontSize: '14px', color: GRAY }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* EDUCATION */}
          {education.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#000000', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '18px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: DARK }}>{edu.institution || edu.school}</div>
                  <div style={{ fontSize: '14px', color: GRAY, marginTop: '2px' }}>{edu.degree}</div>
                  {edu.description && (
                    <p style={{ fontSize: '14px', color: GRAY, margin: '4px 0 0 0', lineHeight: '1.6' }}>{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* COMPUTER SKILL */}
          {skillList.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#000000', margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Computer Skill</h2>
              <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: '15px', color: DARK, lineHeight: '1.8' }}>
                {skillList.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {/* Projects */}
          {projList.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#000000', margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Projects</h2>
              {projList.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: DARK }}>{proj.name}</div>
                  {proj.description && <p style={{ fontSize: '14px', color: GRAY, margin: '2px 0 0 0', lineHeight: '1.6' }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certList.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#000000', margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Certifications</h2>
              {certList.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: DARK }}>{cert.name}</div>
                  {cert.issuer && <p style={{ fontSize: '14px', color: GRAY, margin: '2px 0 0 0' }}>{cert.issuer}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(StudentProfileBannerComponent);
