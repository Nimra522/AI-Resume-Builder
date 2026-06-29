import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, Globe, Camera } from 'lucide-react';

interface Props { data: ResumeData; }

const DARK = '#3A3A3A';
const GRAY = '#777777';
const LIGHT_GRAY = '#CCCCCC';

const Triangle: React.FC<{ size: number; rotate?: string; style?: React.CSSProperties }> = ({ size, rotate, style }) => (
  <div style={{
    width: 0, height: 0,
    borderLeft: `${size * 0.5}px solid transparent`,
    borderRight: `${size * 0.5}px solid transparent`,
    borderBottom: `${size}px solid transparent`,
    position: 'absolute' as const,
    ...style,
  }}>
    {/* outline overlay */}
    <div style={{
      position: 'absolute' as const,
      top: '2px', left: '-0.5px',
      width: 0, height: 0,
      borderLeft: `${size * 0.5 - 1}px solid transparent`,
      borderRight: `${size * 0.5 - 1}px solid transparent`,
      borderBottom: `${size - 2}px solid #FFFFFF`,
    }} />
  </div>
);

const EditorialThinComponent: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications } = data;
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
  ].filter(c => c.value);

  const nameParts = (personalInfo.fullName || 'Your Name').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const title = personalInfo.jobTitle || 'Job Title';
  const titleWords = title.split(' ');
  const midIdx = Math.ceil(titleWords.length / 2);
  const titleLine1 = titleWords.slice(0, midIdx).join(' ');
  const titleLine2 = titleWords.slice(midIdx).join(' ');

  const skillList = skills || [];
  const projectList = projects || [];
  const certList = certifications || [];

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', color: DARK, fontFamily: '"Poppins","Inter","Montserrat",sans-serif', boxSizing: 'border-box', display: 'flex', minHeight: '1122px' }}>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />

      {/* Left Column 36% */}
      <div style={{ width: '36%', flexShrink: 0, padding: '48px 28px 28px 36px', display: 'flex', flexDirection: 'column', position: 'relative' as const }}>
        {/* Name */}
        <h1 style={{ fontSize: '76px', fontWeight: 200, color: DARK, margin: 0, lineHeight: 0.95, letterSpacing: '-0.02em' }}>
          {firstName}
        </h1>
        <h1 style={{ fontSize: '76px', fontWeight: 200, color: DARK, margin: 0, lineHeight: 0.95, letterSpacing: '-0.02em' }}>
          {lastName}
        </h1>

        {/* Job Title with slashes */}
        <div style={{ marginTop: '20px', marginBottom: '36px' }}>
          <p style={{ fontSize: '28px', fontWeight: 300, color: GRAY, margin: 0, lineHeight: 1.15 }}>/{titleLine1}</p>
          <p style={{ fontSize: '28px', fontWeight: 300, color: GRAY, margin: 0, lineHeight: 1.15 }}>{titleLine2}{titleLine2 ? '/' : '/'}</p>
        </div>

        {/* Three overlapping triangles */}
        <div style={{ position: 'relative', height: '120px', marginBottom: '36px' }}>
          <div style={{
            position: 'absolute', top: '10px', left: '10px',
            width: 0, height: 0,
            borderLeft: '40px solid transparent',
            borderRight: '40px solid transparent',
            borderBottom: '70px solid #CCCCCC',
          }} />
          <div style={{
            position: 'absolute', top: '10px', left: '10px',
            width: 0, height: 0,
            borderLeft: '38px solid transparent',
            borderRight: '38px solid transparent',
            borderBottom: '68px solid #FFFFFF',
          }} />

          <div style={{
            position: 'absolute', top: '30px', left: '30px',
            width: 0, height: 0,
            borderLeft: '35px solid transparent',
            borderRight: '35px solid transparent',
            borderBottom: '60px solid #CCCCCC',
          }} />
          <div style={{
            position: 'absolute', top: '30px', left: '30px',
            width: 0, height: 0,
            borderLeft: '33px solid transparent',
            borderRight: '33px solid transparent',
            borderBottom: '58px solid #FFFFFF',
          }} />

          <div style={{
            position: 'absolute', top: '50px', left: '50px',
            width: 0, height: 0,
            borderLeft: '30px solid transparent',
            borderRight: '30px solid transparent',
            borderBottom: '52px solid #CCCCCC',
          }} />
          <div style={{
            position: 'absolute', top: '50px', left: '50px',
            width: 0, height: 0,
            borderLeft: '28px solid transparent',
            borderRight: '28px solid transparent',
            borderBottom: '50px solid #FFFFFF',
          }} />
        </div>

        {/* Contact */}
        {contactItems.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
            {contactItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#EEEEEE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <item.icon size={15} color={GRAY} strokeWidth={1.5} />
                </div>
                <span style={{ fontSize: '13px', color: GRAY }}>{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Spacer to push photo down */}
        <div style={{ flex: 1 }} />

        {/* Profile Image */}
        <div style={{ width: '100%', paddingBottom: '113%', position: 'relative', overflow: 'hidden', background: '#F5F5F5', cursor: 'pointer' }} onClick={() => fileRef.current?.click()}>
          {photoSrc ? (
            <img src={photoSrc} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#BBBBBB', gap: '8px' }}>
              <Camera size={36} />
              <span style={{ fontSize: '12px' }}>Upload Photo</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Column 64% */}
      <div style={{ flex: 1, minWidth: 0, padding: '48px 36px 28px 36px' }}>
        {/* PROFILE */}
        {personalInfo.summary && (
          <div style={{ marginBottom: '28px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #D0D0D0', margin: '0 0 14px 0' }} />
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: DARK, margin: '0 0 10px 0', textTransform: 'lowercase' as const, letterSpacing: '0.03em' }}>Profile</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.8', color: GRAY, margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #D0D0D0', margin: '0 0 14px 0' }} />
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: DARK, margin: '0 0 16px 0', textTransform: 'lowercase' as const, letterSpacing: '0.03em' }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ display: 'flex', gap: '20px', marginBottom: '18px' }}>
                <div style={{ width: '35%', flexShrink: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: DARK }}>{exp.position || exp.role}</div>
                  <div style={{ fontSize: '13px', color: GRAY, marginTop: '2px' }}>{exp.company}</div>
                  <div style={{ fontSize: '12px', color: LIGHT_GRAY, marginTop: '2px' }}>
                    {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {exp.description && (
                    <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '14px', color: GRAY, lineHeight: '1.75' }}>
                      {exp.description.split('\n').filter(Boolean).map((line, li) => <li key={li}>{line}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #D0D0D0', margin: '0 0 14px 0' }} />
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: DARK, margin: '0 0 14px 0', textTransform: 'lowercase' as const, letterSpacing: '0.03em' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: DARK }}>{edu.degree}</div>
                <div style={{ fontSize: '13px', color: GRAY, marginTop: '2px' }}>{edu.school}</div>
              </div>
            ))}
          </div>
        )}

        {/* SKILLS */}
        {skillList.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #D0D0D0', margin: '0 0 14px 0' }} />
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: DARK, margin: '0 0 12px 0', textTransform: 'lowercase' as const, letterSpacing: '0.03em' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px' }}>
              {skillList.map((s, i) => (
                <span key={i} style={{ fontSize: '14px', color: GRAY, lineHeight: '1.8' }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS */}
        {certList.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #D0D0D0', margin: '0 0 14px 0' }} />
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: DARK, margin: '0 0 12px 0', textTransform: 'lowercase' as const, letterSpacing: '0.03em' }}>Certifications</h2>
            {certList.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: DARK }}>{cert.name}</div>
                <div style={{ fontSize: '13px', color: GRAY, marginTop: '2px' }}>{cert.issuer}{cert.issuer && cert.date ? ' \u2013 ' : ''}{cert.date}</div>
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS */}
        {projectList.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #D0D0D0', margin: '0 0 14px 0' }} />
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: DARK, margin: '0 0 12px 0', textTransform: 'lowercase' as const, letterSpacing: '0.03em' }}>Projects</h2>
            {projectList.map((proj) => (
              <div key={proj.id} style={{ display: 'flex', gap: '20px', marginBottom: '18px' }}>
                <div style={{ width: '35%', flexShrink: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: DARK }}>{proj.name}</div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div style={{ fontSize: '12px', color: LIGHT_GRAY, marginTop: '2px' }}>{proj.technologies.join(', ')}</div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {proj.description && (
                    <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '14px', color: GRAY, lineHeight: '1.75' }}>
                      {proj.description.split('\n').filter(Boolean).map((line, li) => <li key={li}>{line}</li>)}
                    </ul>
                  )}
                  {proj.link && <div style={{ fontSize: '12px', color: LIGHT_GRAY, marginTop: '2px' }}>{proj.link}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(EditorialThinComponent);
