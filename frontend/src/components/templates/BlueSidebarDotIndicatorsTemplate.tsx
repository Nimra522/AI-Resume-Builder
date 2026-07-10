import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Camera, Linkedin } from 'lucide-react';

interface Props { data: ResumeData; }

const BLUE = '#4B5C77';
const DARK = '#333333';
const DOT_EMPTY = '#D0D0D0';

const SkillDots5: React.FC<{ level: number }> = ({ level }) => (
  <span style={{ display: 'inline-flex', gap: '5px', marginLeft: '8px' }}>
    {[0, 1, 2, 3, 4].map((i) => (
      <span key={i} style={{
        width: '10px', height: '10px', borderRadius: '50%',
        background: i < level ? BLUE : DOT_EMPTY,
        display: 'inline-block',
      }} />
    ))}
  </span>
);

const BlueSidebarDotIndicatorsComponent: React.FC<Props> = ({ data }) => {
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
    { icon: MapPin, value: personalInfo.location },
    { icon: Linkedin, value: personalInfo.linkedin },
  ].filter(c => c.value);

  const skillList = skills || [];
  const projectList = projects || [];
  const certList = certifications || [];

  const BlueHeading: React.FC<{ label: string }> = ({ label }) => (
    <div style={{ marginBottom: '12px' }}>
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</h2>
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.4)', margin: '4px 0 0 0' }} />
    </div>
  );

  const WhiteHeading: React.FC<{ label: string }> = ({ label }) => (
    <div style={{ marginBottom: '12px' }}>
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: BLUE, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</h2>
      <hr style={{ border: 'none', borderTop: '1px solid ' + BLUE, margin: '4px 0 0 0' }} />
    </div>
  );

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', fontFamily: '"Montserrat","Inter","Poppins",sans-serif', boxSizing: 'border-box' }}>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '28px 32px 0 32px', gap: '28px', background: BLUE }}>
        {/* Left: Rounded box with photo */}
        <div style={{ background: '#5D6E89', borderRadius: '16px', padding: '12px', flexShrink: 0 }}>
          <div style={{ width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', background: '#7B8BA5', cursor: 'pointer' }} onClick={() => fileRef.current?.click()}>
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
          <h1 style={{ fontSize: '46px', fontWeight: 800, color: '#FFFFFF', margin: 0, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: '4px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
      </div>

      {/* Body: Two Columns */}
      <div style={{ display: 'flex' }}>
        {/* Left Column - Blue */}
        <div style={{ width: '35%', flexShrink: 0, background: BLUE, padding: '20px 20px 28px 20px' }}>
          {/* Contact */}
          {contactItems.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <BlueHeading label="Contact" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {contactItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <item.icon size={14} color="#FFFFFF" strokeWidth={2} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <BlueHeading label="Education" />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>{edu.degree}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>{edu.school || edu.institution}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '1px' }}>{edu.graduationDate}{edu.graduationDate && edu.description ? ' | ' : ''}{edu.description || ''}</div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certList.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <BlueHeading label="Certifications" />
              {certList.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>{cert.name}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>{cert.issuer}{cert.issuer && cert.date ? ' | ' : ''}{cert.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - White */}
        <div style={{ flex: 1, minWidth: 0, padding: '20px 28px 28px 28px' }}>
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
              <div style={{ position: 'relative' as const, paddingLeft: '20px' }}>
                {/* Vertical line */}
                <div style={{ position: 'absolute', left: '7px', top: '4px', bottom: '4px', width: '2px', background: BLUE }} />
                {experience.map((exp, idx) => (
                  <div key={exp.id} style={{ position: 'relative' as const, marginBottom: idx < experience.length - 1 ? '20px' : '0' }}>
                    {/* Dot */}
                    <div style={{ position: 'absolute', left: '-16px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', background: BLUE, zIndex: 1 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: BLUE }}>{exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}</span>
                      <span style={{ fontSize: '11px', color: DARK, marginLeft: '12px' }}>{exp.location || ''}</span>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: DARK, marginTop: '2px' }}>{exp.position || exp.role}</div>
                    <div style={{ fontSize: '13px', color: DARK, marginTop: '1px' }}>{exp.company}</div>
                    {exp.description && (
                      <ul style={{ margin: '4px 0 0 0', padding: '0 0 0 14px', fontSize: '12px', color: DARK, lineHeight: '1.7' }}>
                        {exp.description.split('\n').filter(Boolean).map((line, li) => <li key={li}>{line}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projectList.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <WhiteHeading label="Projects" />
              {projectList.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: DARK }}>{proj.name}</div>
                  {proj.description && <div style={{ fontSize: '12px', color: DARK, marginTop: '2px', lineHeight: '1.6' }}>{proj.description}</div>}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{proj.technologies.join(', ')}</div>
                  )}
                  {proj.link && <div style={{ fontSize: '11px', color: BLUE, marginTop: '1px' }}>{proj.link}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Skill */}
          {skillList.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <WhiteHeading label="Skill" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {skillList.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: DARK }}>{s}</span>
                    <SkillDots5 level={(i % 4) + 1} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(BlueSidebarDotIndicatorsComponent);
