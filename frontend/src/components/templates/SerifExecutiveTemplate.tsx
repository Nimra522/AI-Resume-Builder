import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Camera } from 'lucide-react';

interface Props { data: ResumeData; }

const DARK = '#222222';
const GRAY = '#555555';

const SerifExecutiveComponent: React.FC<Props> = ({ data }) => {
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
    { label: 'Email', value: personalInfo.email },
    { label: 'Address', value: personalInfo.location },
    { label: 'Phone', value: personalInfo.phone },
    { label: 'Website', value: personalInfo.website },
    { label: 'LinkedIn', value: personalInfo.linkedin },
  ].filter(c => c.value);

  const mid = Math.ceil(contactItems.length / 2);
  const col1 = contactItems.slice(0, mid);
  const col2 = contactItems.slice(mid);
  const skillList = skills || [];
  const certList = certifications || [];
  const projList = projects || [];

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', color: DARK, fontFamily: '"Cormorant Garamond","Libre Baskerville","Playfair Display",serif', boxSizing: 'border-box', padding: '44px 48px' }}>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />

      {/* Header */}
      <div style={{ display: 'flex', gap: '36px', alignItems: 'center', marginBottom: '20px' }}>
        {/* Photo */}
        <div style={{ width: '170px', height: '170px', borderRadius: '16px', overflow: 'hidden', background: '#F0F0F0', flexShrink: 0, cursor: 'pointer' }} onClick={() => fileRef.current?.click()}>
          {photoSrc ? (
            <img src={photoSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#BBBBBB', gap: '6px' }}>
              <Camera size={36} />
              <span style={{ fontSize: '12px' }}>Upload Photo</span>
            </div>
          )}
        </div>

        {/* Name + Title */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: '60px', fontWeight: 700, color: '#000000', margin: 0, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '38px', fontWeight: 600, color: DARK, margin: '2px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid #999999', margin: '0 0 16px 0' }} />

      {/* Contact - two columns */}
      {contactItems.length > 0 && (
        <div style={{ display: 'flex', gap: '48px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
            {col1.map((item, i) => (
              <div key={i} style={{ fontSize: '15px', color: GRAY, lineHeight: '1.5' }}>
                {item.value}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
            {col2.map((item, i) => (
              <div key={i} style={{ fontSize: '15px', color: GRAY, lineHeight: '1.5' }}>
                {item.value}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROFESSIONAL SUMMARY */}
      {personalInfo.summary && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#000000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Professional Summary</h2>
          <hr style={{ border: 'none', borderTop: '1px solid #D0D0D0', margin: '8px 0 14px 0' }} />
          <p style={{ fontSize: '16px', lineHeight: '1.75', color: DARK, margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* PROFESSIONAL EXPERIENCE */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#000000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Professional Experience</h2>
          <hr style={{ border: 'none', borderTop: '1px solid #D0D0D0', margin: '8px 0 16px 0' }} />
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: DARK }}>{exp.position || exp.role}</div>
              <div style={{ fontSize: '16px', color: DARK, marginTop: '1px' }}>{exp.company}{exp.company && exp.startDate ? ', ' : ''}{exp.startDate}</div>
              <div style={{ fontSize: '15px', color: GRAY, marginTop: '1px' }}>
                {exp.location || ''}{exp.location && (exp.endDate || exp.current) ? ' | ' : ''}{exp.current ? 'Present' : exp.endDate ? `\u2013 ${exp.endDate}` : ''}
              </div>
              {exp.description && (
                <ul style={{ margin: '6px 0 0 0', padding: '0 0 0 20px', fontSize: '15px', color: DARK, lineHeight: '1.7' }}>
                  {exp.description.split('\n').filter(Boolean).map((line, li) => <li key={li}>{line}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#000000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Education</h2>
          <hr style={{ border: 'none', borderTop: '1px solid #D0D0D0', margin: '8px 0 16px 0' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 48px' }}>
            {education.map((edu) => (
              <div key={edu.id} style={{ flex: '1 1 200px', minWidth: '180px', marginBottom: '12px' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: DARK }}>{edu.degree}</div>
                <div style={{ fontSize: '15px', color: DARK }}>{edu.school || edu.institution}</div>
                <div style={{ fontSize: '14px', color: GRAY }}>{edu.graduationDate}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SKILLS */}
      {skillList.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#000000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Skills</h2>
          <hr style={{ border: 'none', borderTop: '1px solid #D0D0D0', margin: '8px 0 16px 0' }} />
          <p style={{ fontSize: '15px', color: DARK, margin: 0, lineHeight: '1.7' }}>{skillList.join(', ')}</p>
        </div>
      )}

      {/* PROJECTS */}
      {projList.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#000000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Projects</h2>
          <hr style={{ border: 'none', borderTop: '1px solid #D0D0D0', margin: '8px 0 16px 0' }} />
          {projList.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: DARK }}>{proj.name}</div>
              {proj.description && <div style={{ fontSize: '15px', color: GRAY, marginTop: '4px', lineHeight: '1.7' }}>{proj.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* CERTIFICATIONS */}
      {certList.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#000000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Certifications</h2>
          <hr style={{ border: 'none', borderTop: '1px solid #D0D0D0', margin: '8px 0 16px 0' }} />
          {certList.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: DARK }}>{cert.name}</div>
              <div style={{ fontSize: '15px', color: GRAY, marginTop: '2px' }}>{cert.issuer}{cert.issuer && cert.date ? ' \u2013 ' : ''}{cert.date}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(SerifExecutiveComponent);
