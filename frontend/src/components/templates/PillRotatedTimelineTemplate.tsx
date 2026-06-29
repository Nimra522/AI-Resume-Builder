import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Camera } from 'lucide-react';

interface Props { data: ResumeData; }

const GRAY_BG = '#EAEAEA';
const DARK = '#000000';
const GRAY = '#555555';

const PillRotatedTimelineComponent: React.FC<Props> = ({ data }) => {
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
    { icon: Mail, value: personalInfo.email },
    { icon: Phone, value: personalInfo.phone },
    { icon: MapPin, value: personalInfo.location },
  ].filter(c => c.value);

  const nameParts = (personalInfo.fullName || 'Your Name').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  const skillList = skills || [];
  const awardList = certifications || [];
  const projList = projects || [];

  const SectionLine: React.FC<{ label: string }> = ({ label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
      <span style={{ fontSize: '20px', fontWeight: 700, color: DARK, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: '4px', background: DARK, maxWidth: '60px' }} />
    </div>
  );

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', fontFamily: '"Montserrat","Poppins",sans-serif', boxSizing: 'border-box', display: 'flex' }}>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />

      {/* Left Column */}
      <div style={{ width: '34%', flexShrink: 0 }}>
        {/* Grey Block Top */}
        <div style={{ background: GRAY_BG, padding: '28px 20px 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Profile Image */}
          <div style={{ width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden', background: '#D0D0D0', cursor: 'pointer', marginBottom: '20px' }} onClick={() => fileRef.current?.click()}>
            {photoSrc ? (
              <img src={photoSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#999999', gap: '6px' }}>
                <Camera size={32} />
                <span style={{ fontSize: '10px' }}>Photo</span>
              </div>
            )}
          </div>

          {/* Contact */}
          {contactItems.length > 0 && (
            <div style={{ width: '100%' }}>
              <SectionLine label="CONTACT" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
                {contactItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <item.icon size={14} color={DARK} strokeWidth={2} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: GRAY }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* White Bottom */}
        <div style={{ background: '#FFFFFF', padding: '20px 20px 28px 20px' }}>
          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <SectionLine label="EDUCATION" />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '14px', paddingLeft: '14px', position: 'relative' as const }}>
                  <div style={{ position: 'absolute', left: '0', top: '6px', width: '6px', height: '6px', borderRadius: '50%', background: DARK }} />
                  <div style={{ fontSize: '14px', fontWeight: 700, color: DARK }}>{edu.school || edu.institution}</div>
                  <div style={{ fontSize: '13px', fontStyle: 'italic', color: GRAY, marginTop: '1px' }}>{edu.degree}</div>
                  {edu.graduationDate && <div style={{ fontSize: '12px', color: GRAY, marginTop: '1px' }}>Completed in {edu.graduationDate}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Skill */}
          {skillList.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <SectionLine label="SKILL" />
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: GRAY, lineHeight: '1.9' }}>
                {skillList.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {/* Projects */}
          {projList.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <SectionLine label="PROJECTS" />
              {projList.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '12px', paddingLeft: '14px', position: 'relative' as const }}>
                  <div style={{ position: 'absolute', left: '0', top: '6px', width: '6px', height: '6px', borderRadius: '50%', background: DARK }} />
                  <div style={{ fontSize: '14px', fontWeight: 700, color: DARK }}>{proj.name}</div>
                  {proj.description && <div style={{ fontSize: '12px', color: GRAY, marginTop: '2px' }}>{proj.description}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Awards */}
          {awardList.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <SectionLine label="AWARDS" />
              {awardList.map((a) => (
                <div key={a.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', color: GRAY }}>{a.date}{a.date && a.issuer ? ' | ' : ''}{a.issuer}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: DARK }}>{a.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column - White */}
      <div style={{ flex: 1, minWidth: 0, background: '#FFFFFF', padding: '28px 32px 28px 28px' }}>
        {/* Name + Title */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '54px', fontWeight: 900, color: DARK, margin: 0, lineHeight: 1 }}>
            {firstName} {lastName}
          </h1>
          <p style={{ fontSize: '16px', fontWeight: 400, color: GRAY, margin: '4px 0 0 0', letterSpacing: '0.15em' }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>

        {/* PROFILE */}
        {personalInfo.summary && (
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: DARK, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Profile</h2>
            <p style={{ fontSize: '13px', lineHeight: '1.8', color: GRAY, margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* WORK EXPERIENCE */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: DARK, margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Work Experience</h2>
            {experience.map((exp) => {
              const dateText = `${exp.startDate || ''}${exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}${exp.current ? 'Present' : exp.endDate || ''}`;
              return (
                <div key={exp.id} style={{ display: 'flex', gap: '16px', marginBottom: '22px' }}>
                  {/* Pill with rotated date */}
                  <div style={{ flexShrink: 0, width: '40px', display: 'flex', alignItems: 'stretch' }}>
                    <div style={{
                      width: '40px', border: '1.5px solid #000000', borderRadius: '20px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      writingMode: 'vertical-rl' as const, textOrientation: 'mixed' as const,
                      transform: 'rotate(180deg)', fontSize: '11px', fontWeight: 600, color: DARK,
                      padding: '10px 0', letterSpacing: '0.05em',
                    }}>
                      {dateText}
                    </div>
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: DARK }}>{exp.position || exp.role}</div>
                    <div style={{ fontSize: '14px', color: GRAY, marginTop: '1px' }}>{exp.company}</div>
                    {exp.description && (
                      <p style={{ fontSize: '13px', color: GRAY, margin: '4px 0 0 0', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default React.memo(PillRotatedTimelineComponent);
