import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, Globe, MapPin, Linkedin, Camera } from 'lucide-react';

interface Props { data: ResumeData; }

const NAVY = '#343C50';
const DARK = '#30394D';
const GRAY = '#555555';
const BORDER = '#EAEAEA';

const DarkSidebarPortfolioComponent: React.FC<Props> = ({ data }) => {
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
    { icon: Linkedin, value: personalInfo.linkedin },
    { icon: MapPin, value: personalInfo.location },
  ].filter(c => c.value);

  const nameParts = (personalInfo.fullName || 'Your Name').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  const skillList = skills || [];
  const projectList = projects || [];
  const certList = certifications || [];

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', color: GRAY, fontFamily: '"Poppins","Montserrat",sans-serif', boxSizing: 'border-box' }}>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '30px 30px 0 30px', gap: '28px' }}>
        {/* Photo */}
        <div style={{ width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden', background: '#FFFFFF', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', flexShrink: 0 }} onClick={() => fileRef.current?.click()}>
          {photoSrc ? (
            <img src={photoSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#CCCCCC', gap: '6px', background: '#F5F5F5' }}>
              <Camera size={32} />
              <span style={{ fontSize: '10px' }}>Photo</span>
            </div>
          )}
        </div>

        {/* Name + Title */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: '60px', fontWeight: 300, color: DARK, margin: 0, lineHeight: 0.95 }}>
            {firstName}
          </h1>
          <h1 style={{ fontSize: '60px', fontWeight: 700, color: DARK, margin: 0, lineHeight: 0.95 }}>
            {lastName}
          </h1>
          <p style={{ fontSize: '24px', fontWeight: 500, color: GRAY, margin: '4px 0 0 0' }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
      </div>

      {/* Contact Row */}
      {contactItems.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '18px 30px 0 30px', gap: '8px', flexWrap: 'wrap' }}>
          {contactItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <item.icon size={14} color="#FFFFFF" strokeWidth={2} />
              </div>
              <span style={{ fontSize: '16px', color: GRAY }}>{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Main Body */}
      <div style={{ display: 'flex', marginTop: '24px' }}>
        {/* Left Sidebar 30% */}
        <div style={{ width: '30%', flexShrink: 0, background: NAVY, padding: '35px', color: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* About Me */}
          {personalInfo.summary && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>About Me</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'rgba(255,255,255,0.85)', margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>{edu.degree}</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>{edu.school || edu.institution}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{edu.graduationDate}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skillList.length > 0 && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Skills</h2>
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.9' }}>
                {skillList.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Right Content 70% */}
        <div style={{ flex: 1, minWidth: 0, padding: '40px 30px 30px 36px' }}>
          {/* Work Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: DARK, margin: '0 0 24px 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Work Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: DARK }}>{exp.position || exp.role}</div>
                    <div style={{ fontSize: '15px', fontWeight: 500, color: GRAY, whiteSpace: 'nowrap', marginLeft: '16px' }}>
                      {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <div style={{ fontSize: '15px', color: GRAY, marginTop: '2px', fontWeight: 500 }}>
                    {exp.company}{exp.company && exp.location ? ' | ' : ''}{exp.location || ''}
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: '14px', color: GRAY, margin: '8px 0 0 0', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projectList.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: DARK, margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Projects</h2>
              {projectList.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: DARK }}>{proj.name}</div>
                  {proj.description && <p style={{ fontSize: '14px', color: GRAY, margin: '4px 0 0 0', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{proj.description}</p>}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div style={{ fontSize: '13px', color: GRAY, marginTop: '4px' }}><strong>Technologies:</strong> {proj.technologies.join(', ')}</div>
                  )}
                  {proj.link && <div style={{ fontSize: '13px', color: NAVY, marginTop: '2px' }}>{proj.link}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certList.length > 0 && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: DARK, margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Certifications</h2>
              {certList.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: DARK }}>{cert.name}</div>
                  <div style={{ fontSize: '14px', color: GRAY, marginTop: '2px' }}>{cert.issuer}{cert.issuer && cert.date ? ' \u2013 ' : ''}{cert.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(DarkSidebarPortfolioComponent);
