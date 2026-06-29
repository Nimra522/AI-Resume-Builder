import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Camera, Phone, Mail, MapPin } from 'lucide-react';

interface Props { data: ResumeData; }

const NAVY = '#0D3B73';
const DARK = '#333333';
const GRAY = '#555555';

const SingleColumnNavyCorporateComponent: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const fileRef = useRef<HTMLInputElement>(null);
  const [photoSrc, setPhotoSrc] = useState<string>(personalInfo.photoUrl || '');

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => { setPhotoSrc(ev.target?.result as string); };
      reader.readAsDataURL(file);
    }
  }, []);

  const contact = [
    { icon: Phone, value: personalInfo.phone },
    { icon: Mail, value: personalInfo.email },
    { icon: MapPin, value: personalInfo.location },
  ].filter(c => c.value);

  const skillList = skills || [];
  const certList = certifications || [];
  const projList = projects || [];

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', color: DARK, fontFamily: '"Montserrat","Poppins","Inter",sans-serif', boxSizing: 'border-box', padding: '48px 44px' }}>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />

      {/* Header */}
      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', marginBottom: '36px' }}>
        {/* Left: Photo + Contact */}
        <div style={{ width: '110px', flexShrink: 0 }}>
          <div style={{ width: '110px', height: '110px', borderRadius: '55px', overflow: 'hidden', background: '#F0F0F0', position: 'relative', cursor: 'pointer' }} onClick={() => fileRef.current?.click()}>
            {photoSrc ? (
              <img src={photoSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#BBBBBB', gap: '4px' }}>
                <Camera size={24} />
                <span style={{ fontSize: '10px' }}>Photo</span>
              </div>
            )}
          </div>
          {contact.length > 0 && (
            <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {contact.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: DARK }}>
                  <item.icon size={13} color={NAVY} strokeWidth={2} style={{ flexShrink: 0 }} />
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Name + Title */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: '52px', fontWeight: 800, color: NAVY, margin: '0 0 6px 0', lineHeight: 1, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '18px', fontStyle: 'italic', color: GRAY, margin: '0', fontWeight: 400 }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '2px solid #E0E0E0', margin: '0 0 32px 0' }} />

      {/* SUMMARY */}
      {personalInfo.summary && (
        <>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: NAVY, margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Summary</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.75', color: DARK, margin: '0 0 32px 0', whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
        </>
      )}

      {/* WORK EXPERIENCE */}
      {experience.length > 0 && (
        <>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: NAVY, margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Work Experience</h2>
          <div style={{ marginBottom: '32px' }}>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: DARK, margin: 0 }}>{exp.company}</h3>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: DARK, whiteSpace: 'nowrap', marginLeft: '16px' }}>
                    {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p style={{ fontSize: '15px', color: GRAY, margin: '2px 0 6px 0', fontStyle: 'italic' }}>{exp.role}</p>
                {exp.description && (
                  <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: '15px', color: DARK, lineHeight: '1.7' }}>
                    {exp.description.split('\n').filter(Boolean).map((line, li) => <li key={li}>{line}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: NAVY, margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Education</h2>
          <div style={{ marginBottom: '32px' }}>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: DARK, margin: 0 }}>{edu.degree || edu.school}</h3>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: DARK, whiteSpace: 'nowrap', marginLeft: '16px' }}>{edu.graduationDate}</span>
                </div>
                {edu.school && edu.degree && <p style={{ fontSize: '15px', color: GRAY, margin: '2px 0 6px 0', fontStyle: 'italic' }}>{edu.school}</p>}
                {edu.description && (
                  <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: '15px', color: DARK, lineHeight: '1.7' }}>
                    {edu.description.split('\n').filter(Boolean).map((line, li) => <li key={li}>{line}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* TECHNICAL SKILLS */}
      {skillList.length > 0 && (
        <>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: NAVY, margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Technical Skills</h2>
          <p style={{ fontSize: '15px', color: DARK, margin: '0 0 32px 0', lineHeight: '1.7' }}>{skillList.join(', ')}</p>
        </>
      )}

      {/* CERTIFICATIONS */}
      {certList.length > 0 && (
        <>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: NAVY, margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Certifications</h2>
          <ul style={{ margin: '0 0 32px 0', padding: '0 0 0 18px', fontSize: '15px', color: DARK, lineHeight: '1.7' }}>
            {certList.map((c) => <li key={c.id}>{c.name}{c.issuer ? ` \u2013 ${c.issuer}` : ''}{c.date ? ` (${c.date})` : ''}</li>)}
          </ul>
        </>
      )}

      {/* PROJECTS */}
      {projList.length > 0 && (
        <>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: NAVY, margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Projects</h2>
          <ul style={{ margin: '0 0 32px 0', padding: '0 0 0 18px', fontSize: '15px', color: DARK, lineHeight: '1.7' }}>
            {projList.map((p) => <li key={p.id}>{p.name}{p.description ? `: ${p.description}` : ''}</li>)}
          </ul>
        </>
      )}
    </div>
  );
};

export default React.memo(SingleColumnNavyCorporateComponent);
