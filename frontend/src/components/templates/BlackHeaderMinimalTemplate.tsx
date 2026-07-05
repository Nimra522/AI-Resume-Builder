import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, Globe, MapPin, Linkedin, Camera, User, Briefcase, GraduationCap, Award, Circle } from 'lucide-react';

interface Props { data: ResumeData; }

const DARK = '#333333';
const GRAY = '#666666';

const SkillDots: React.FC<{ level: number }> = ({ level }) => (
  <span style={{ display: 'inline-flex', gap: '5px', marginLeft: '8px' }}>
    {[0, 1, 2, 3].map((i) => (
      <span key={i} style={{
        width: '10px', height: '10px', borderRadius: '50%',
        background: i < level ? '#000000' : '#D0D0D0',
        display: 'inline-block',
      }} />
    ))}
  </span>
);

const BlackHeaderMinimalComponent: React.FC<Props> = ({ data }) => {
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

  const nameParts = (personalInfo.fullName || 'Your Name').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const skillList = skills || [];
  const certList = certifications || [];
  const projectList = projects || [];

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', color: DARK, fontFamily: '"Poppins","Montserrat","Inter",sans-serif', boxSizing: 'border-box' }}>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />

      {/* Black Header */}
      <div style={{ background: '#000000', padding: '28px 36px', display: 'flex', alignItems: 'center', minHeight: '160px' }}>
        {/* Left: Contact */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {contactItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <item.icon size={14} color="#000000" strokeWidth={2} />
              </div>
              <span style={{ fontSize: '13px', color: '#FFFFFF' }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Right: Name + Title */}
        <div style={{ textAlign: 'right' as const, flexShrink: 0 }}>
          <h1 style={{ fontSize: '62px', fontWeight: 900, color: '#FFFFFF', margin: 0, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            {firstName}
          </h1>
          <h1 style={{ fontSize: '62px', fontWeight: 900, color: '#FFFFFF', margin: 0, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            {lastName}
          </h1>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#CCCCCC', margin: '6px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
      </div>

      {/* Body: Two Columns */}
      <div style={{ display: 'flex' }}>
        {/* Left Column 64% */}
        <div style={{ flex: 1, minWidth: 0, padding: '36px 36px 28px 36px' }}>
          {/* ABOUT ME */}
          {personalInfo.summary && (
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#000000', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={22} strokeWidth={1.5} /> About Me
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.75', color: DARK, margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
            </div>
          )}

          {/* WORK EXPERIENCE */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#000000', margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Briefcase size={22} strokeWidth={1.5} /> Work Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: DARK }}>{exp.position || exp.role}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '2px' }}>
                    <span style={{ fontSize: '15px', color: GRAY }}>{exp.company}</span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: GRAY, whiteSpace: 'nowrap', marginLeft: '12px' }}>
                      {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: '15px', lineHeight: '1.7', color: DARK, margin: '6px 0 0 0', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* EDUCATION */}
          {education.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#000000', margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <GraduationCap size={22} strokeWidth={1.5} /> Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: DARK }}>{edu.degree}</div>
                      <div style={{ fontSize: '15px', color: GRAY, marginTop: '2px' }}>{edu.school}</div>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: GRAY, whiteSpace: 'nowrap', marginLeft: '12px' }}>{edu.graduationDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {projectList.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#000000', margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Briefcase size={22} strokeWidth={1.5} /> Projects
              </h2>
              {projectList.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: DARK }}>{proj.name}</div>
                  {proj.description && <p style={{ fontSize: '15px', lineHeight: '1.7', color: DARK, margin: '4px 0 0 0', whiteSpace: 'pre-wrap' }}>{proj.description}</p>}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div style={{ fontSize: '14px', color: GRAY, marginTop: '2px' }}>{proj.technologies.join(', ')}</div>
                  )}
                  {proj.link && <div style={{ fontSize: '14px', color: GRAY, marginTop: '2px' }}>{proj.link}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column 36% */}
        <div style={{ width: '36%', flexShrink: 0, padding: '36px 36px 28px 0' }}>
          {/* Profile Image */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ width: '100%', paddingBottom: '100%', position: 'relative', overflow: 'hidden', background: '#F0F0F0', cursor: 'pointer' }} onClick={() => fileRef.current?.click()}>
              {photoSrc ? (
                <img src={photoSrc} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#BBBBBB', gap: '8px' }}>
                  <Camera size={40} />
                  <span style={{ fontSize: '13px' }}>Upload Photo</span>
                </div>
              )}
            </div>
          </div>

          {/* MY SKILLS */}
          {skillList.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#000000', margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>My Skills</h2>
              {skillList.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: DARK }}>{s}</span>
                  <SkillDots level={(i % 4) + 1} />
                </div>
              ))}
            </div>
          )}

          {/* CERTIFICATE */}
          {certList.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#000000', margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Certificate</h2>
              {certList.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: DARK }}>{cert.name}</div>
                  <div style={{ fontSize: '13px', color: GRAY }}>{cert.issuer}{cert.issuer && cert.date ? ' \u2013 ' : ''}{cert.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(BlackHeaderMinimalComponent);
