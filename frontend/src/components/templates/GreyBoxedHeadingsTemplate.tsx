import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, MapPin, Mail, Camera } from 'lucide-react';

interface Props { data: ResumeData; }

const PAGE_BG = '#F5F5F5';
const BOX_BG = '#E0E0E0';
const DARK = '#000000';
const MUTED = '#555555';

const GreyBoxedHeadingsComponent: React.FC<Props> = ({ data }) => {
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
    { icon: Phone, label: 'Phone', value: personalInfo.phone },
    { icon: MapPin, label: 'Address', value: personalInfo.location },
    { icon: Mail, label: 'Email', value: personalInfo.email },
  ].filter(c => c.value);

  const skillList = skills || [];
  const certList = certifications || [];
  const projList = projects || [];

  const GreyBox: React.FC<{ label: string }> = ({ label }) => (
    <div style={{ background: BOX_BG, padding: '5px 14px', display: 'inline-block', marginBottom: '12px' }}>
      <h2 style={{ fontSize: '13px', fontWeight: 700, color: DARK, margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</h2>
    </div>
  );

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: PAGE_BG, fontFamily: '"Montserrat",sans-serif', boxSizing: 'border-box', paddingTop: '0' }}>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />

      {/* Top Contact Strip */}
      {contactItems.length > 0 && (
        <div style={{ background: '#E8E8E8', padding: '10px 36px', display: 'flex', justifyContent: 'space-between' }}>
          {contactItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <item.icon size={14} color={DARK} strokeWidth={2} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: DARK, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '36px 36px 28px 36px' }}>
        {/* Left: Name + Title */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '68px', fontWeight: 900, color: DARK, margin: 0, lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '20px', fontWeight: 500, color: DARK, margin: '6px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>

        {/* Right: Profile Image */}
        <div style={{ flexShrink: 0, marginLeft: '24px' }}>
          <div style={{
            width: '160px', height: '160px', border: '2px solid #D0D0D0', padding: '6px',
            background: '#FFFFFF', cursor: 'pointer', boxSizing: 'border-box' as const,
          }} onClick={() => fileRef.current?.click()}>
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', background: '#F0F0F0' }}>
              {photoSrc ? (
                <img src={photoSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#BBBBBB', gap: '6px' }}>
                  <Camera size={32} />
                  <span style={{ fontSize: '10px' }}>Photo</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Two Columns */}
      <div style={{ display: 'flex', gap: '32px', padding: '0 36px 28px 36px' }}>
        {/* Left Column ~65% */}
        <div style={{ flex: 2, minWidth: 0 }}>
          {/* About Me */}
          {personalInfo.summary && (
            <div style={{ marginBottom: '24px' }}>
              <GreyBox label="About Me" />
              <p style={{ fontSize: '13px', lineHeight: '1.75', color: MUTED, margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <GreyBox label="Work Experience" />
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: DARK, textTransform: 'uppercase' }}>
                    {exp.company}{exp.company && (exp.position || exp.role) ? ', ' : ''}{exp.position || exp.role}
                    {(exp.startDate || exp.endDate) ? <span style={{ fontWeight: 700 }}> ({exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate})</span> : ''}
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: '13px', color: MUTED, margin: '4px 0 0 0', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column ~35% */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <GreyBox label="Education" />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '14px' }}>
                  {edu.graduationDate && <div style={{ fontSize: '12px', fontWeight: 700, color: MUTED }}>({edu.graduationDate})</div>}
                  <div style={{ fontSize: '14px', fontWeight: 700, color: DARK, marginTop: '2px' }}>{edu.school || edu.institution}</div>
                  <div style={{ fontSize: '13px', color: MUTED, marginTop: '2px' }}>{edu.degree}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skillList.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <GreyBox label="Skills" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {skillList.map((s, i) => (
                  <div key={i} style={{ fontSize: '13px', color: MUTED }}>{s}</div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projList.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <GreyBox label="Projects" />
              {projList.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: DARK }}>{proj.name}</div>
                  {proj.description && <div style={{ fontSize: '12px', color: MUTED, marginTop: '2px', lineHeight: '1.6' }}>{proj.description}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certList.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <GreyBox label="Certifications" />
              {certList.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: DARK }}>{cert.name}</div>
                  <div style={{ fontSize: '12px', color: MUTED, marginTop: '1px' }}>{cert.issuer}{cert.issuer && cert.date ? ' \u2013 ' : ''}{cert.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(GreyBoxedHeadingsComponent);
