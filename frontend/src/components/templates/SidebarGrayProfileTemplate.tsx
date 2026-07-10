import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Camera } from 'lucide-react';

interface Props { data: ResumeData; }

const GRAY_BG = '#D9D9D9';
const DARK = '#2A2A2A';
const GRAY = '#666666';
const BLUE = '#5A6FD8';

const SidebarGrayProfileComponent: React.FC<Props> = ({ data }) => {
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
    personalInfo.phone,
    personalInfo.email,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
  ].filter(Boolean);

  const skillList = skills || [];
  const projList = projects || [];
  const certList = certifications || [];

  const nameParts = (personalInfo.fullName || 'Your Name').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', color: DARK, fontFamily: '"Poppins","Montserrat","Inter",sans-serif', boxSizing: 'border-box', display: 'flex', minHeight: '1122px' }}>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />

      {/* Left Sidebar 38% */}
      <div style={{ width: '38%', flexShrink: 0, background: GRAY_BG, padding: '36px 24px 28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Profile Photo */}
        <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', background: '#FFFFFF', cursor: 'pointer', marginBottom: '20px' }} onClick={() => fileRef.current?.click()}>
          {photoSrc ? (
            <img src={photoSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#AAAAAA', gap: '6px', background: '#E8E8E8' }}>
              <Camera size={36} />
              <span style={{ fontSize: '11px' }}>Photo</span>
            </div>
          )}
        </div>

        {/* Name */}
        <h1 style={{ fontSize: '58px', fontWeight: 800, color: DARK, margin: 0, lineHeight: 1, textTransform: 'uppercase', textAlign: 'center' as const, letterSpacing: '0.02em' }}>
          {firstName}
        </h1>
        <h1 style={{ fontSize: '58px', fontWeight: 800, color: DARK, margin: 0, lineHeight: 1, textTransform: 'uppercase', textAlign: 'center' as const, letterSpacing: '0.02em' }}>
          {lastName}
        </h1>

        {/* Job Title */}
        <p style={{ fontSize: '14px', fontWeight: 600, color: BLUE, margin: '8px 0 28px 0', textAlign: 'center' as const }}>
          {personalInfo.jobTitle || 'Job Title'}
        </p>

        {/* Contact */}
        {contactItems.length > 0 && (
          <div style={{ width: '100%', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: DARK, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Contact</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {contactItems.map((item, i) => (
                <div key={i} style={{ fontSize: '14px', color: GRAY }}>{item}</div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skillList.length > 0 && (
          <div style={{ width: '100%', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: DARK, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Skills</h2>
            <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: '14px', color: GRAY, lineHeight: '1.8' }}>
              {skillList.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        )}

        {/* Projects */}
        {projList.length > 0 && (
          <div style={{ width: '100%', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: DARK, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Projects</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {projList.map((proj) => (
                <div key={proj.id} style={{ fontSize: '14px', color: GRAY }}>
                  <span style={{ fontWeight: 700, color: DARK }}>{proj.name}</span>
                  {proj.description ? ` \u2013 ${proj.description}` : ''}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certList.length > 0 && (
          <div style={{ width: '100%', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: DARK, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Certifications</h2>
            <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: '14px', color: GRAY, lineHeight: '1.8' }}>
              {certList.map((cert) => <li key={cert.id}>{cert.name}{cert.issuer ? ` \u2013 ${cert.issuer}` : ''}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* Right Content 62% */}
      <div style={{ flex: 1, minWidth: 0, padding: '40px 40px 28px 40px' }}>
        {/* EDUCATION */}
        {education.length > 0 && (
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 700, color: DARK, margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: DARK }}>{edu.degree}</div>
                <div style={{ fontSize: '15px', color: GRAY, marginTop: '2px' }}>
                  {edu.school || edu.institution}{edu.school && edu.location ? ', ' : ''}{edu.location || ''}
                </div>
                <div style={{ fontSize: '14px', color: GRAY, marginTop: '2px' }}>{edu.graduationDate}</div>
                {edu.description && (
                  <p style={{ fontSize: '14px', color: GRAY, margin: '4px 0 0 0', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* PROFESSIONAL EXPERIENCE */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 700, color: DARK, margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: DARK }}>{exp.position || exp.role}</div>
                <div style={{ fontSize: '15px', color: GRAY, marginTop: '2px' }}>
                  {exp.company}{exp.company && (exp.startDate || exp.endDate) ? ' | ' : ''}{exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                </div>
                {exp.description && (
                  <p style={{ fontSize: '14px', color: GRAY, margin: '6px 0 0 0', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SidebarGrayProfileComponent);
