import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, Globe, MapPin, Linkedin, Camera } from 'lucide-react';

interface Props { data: ResumeData; }

const NAVY = '#18275F';
const DARK = '#222222';
const GRAY = '#555555';

const RoundedPortfolioComponent: React.FC<Props> = ({ data }) => {
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

  const skillList = skills || [];
  const certList = certifications || [];
  const projList = projects || [];

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', color: DARK, fontFamily: '"Poppins","Montserrat","Inter",sans-serif', boxSizing: 'border-box' }}>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />

      {/* Top Row: Photo (left) + Header (right) */}
      <div style={{ display: 'flex' }}>
        {/* Left: Photo */}
        <div style={{ width: '34%', flexShrink: 0 }}>
          <div style={{ width: '100%', paddingBottom: '100%', position: 'relative', overflow: 'hidden', borderBottomRightRadius: '50px', background: '#F0F0F0', cursor: 'pointer' }} onClick={() => fileRef.current?.click()}>
            {photoSrc ? (
              <img src={photoSrc} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#BBBBBB', gap: '8px' }}>
                <Camera size={48} />
                <span style={{ fontSize: '14px' }}>Upload Photo</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Name + Title + Contact */}
        <div style={{ flex: 1, minWidth: 0, padding: '32px 32px 0 28px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <h1 style={{ fontSize: '60px', fontWeight: 900, color: '#000000', margin: 0, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '14px', fontWeight: 700, color: GRAY, margin: '6px 0 18px 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
          {contactItems.length > 0 && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {contactItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: NAVY, borderRadius: '50%', width: '36px', height: '36px', justifyContent: 'center', flexShrink: 0 }}>
                  <item.icon size={15} color="#FFFFFF" strokeWidth={2} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content: Two Columns */}
      <div style={{ display: 'flex' }}>
        {/* Left Column */}
        <div style={{ width: '34%', flexShrink: 0, padding: '28px 28px 28px 28px' }}>
          {/* EDUCATION */}
          {education.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#000000', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Education</h2>
              <hr style={{ border: 'none', borderTop: '2px solid #000000', margin: '0 0 16px 0', width: '40px' }} />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: GRAY, marginBottom: '2px' }}>{edu.graduationDate}</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: DARK }}>{edu.degree}</div>
                  <div style={{ fontSize: '15px', color: GRAY }}>{edu.school}</div>
                </div>
              ))}
            </div>
          )}

          {/* MY SKILLS */}
          {skillList.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#000000', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>My Skills</h2>
              <hr style={{ border: 'none', borderTop: '2px solid #000000', margin: '0 0 16px 0', width: '40px' }} />
              {skillList.map((s, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: DARK, marginBottom: '4px' }}>{s}</div>
                  <div style={{ height: '8px', borderRadius: '4px', background: '#E8E8E8', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.max(55, 100 - i * 8)}%`, height: '100%', borderRadius: '4px', background: '#000000' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {projList.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#000000', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Projects</h2>
              <hr style={{ border: 'none', borderTop: '2px solid #000000', margin: '0 0 16px 0', width: '40px' }} />
              {projList.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: DARK }}>{proj.name}</div>
                  {proj.description && <div style={{ fontSize: '14px', color: GRAY, marginTop: '2px' }}>{proj.description}</div>}
                </div>
              ))}
            </div>
          )}

          {/* CERTIFICATE */}
          {certList.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#000000', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Certificate</h2>
              <hr style={{ border: 'none', borderTop: '2px solid #000000', margin: '0 0 16px 0', width: '40px' }} />
              {certList.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: DARK }}>{cert.name}</div>
                  <div style={{ fontSize: '14px', color: GRAY }}>{cert.issuer}{cert.issuer && cert.date ? ' \u2013 ' : ''}{cert.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: 1, minWidth: 0, padding: '28px 32px 28px 0', display: 'flex', flexDirection: 'column' }}>
          {/* ABOUT ME */}
          {personalInfo.summary && (
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#000000', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>About Me</h2>
              <hr style={{ border: 'none', borderTop: '2px solid #000000', margin: '0 0 14px 0', width: '40px' }} />
              <p style={{ fontSize: '15px', lineHeight: '1.75', color: DARK, margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
            </div>
          )}

          {/* Navy Section: Work Experience + Awards */}
          {experience.length > 0 && (
            <div style={{ background: NAVY, borderTopLeftRadius: '40px', padding: '24px 28px 28px 28px', marginBottom: '28px' }}>
              {/* WORK EXPERIENCE */}
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Work Experience</h2>
              <hr style={{ border: 'none', borderTop: '2px solid rgba(255,255,255,0.4)', margin: '0 0 20px 0', width: '40px' }} />
              {experience.map((exp) => (
                <div key={exp.id} style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                  <div style={{ width: '35%', flexShrink: 0 }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>{exp.position || exp.role}</div>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginTop: '1px' }}>{exp.company}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                      {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(RoundedPortfolioComponent);
