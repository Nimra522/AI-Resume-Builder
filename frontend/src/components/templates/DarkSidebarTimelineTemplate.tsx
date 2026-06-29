import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Camera, Phone, Mail, MapPin, GraduationCap, Briefcase, User, Settings } from 'lucide-react';

interface Props { data: ResumeData; }

const DARK_BG = '#5C5A56';
const LIGHT_BG = '#F3F2EF';
const DARK_TEXT = '#4A4A4A';

const DarkSidebarTimelineComponent: React.FC<Props> = ({ data }) => {
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
  ].filter(c => c.value);

  const nameParts = (personalInfo.fullName || 'Your Name').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  const skillList = skills || [];

  const TimelineEntry: React.FC<{
    items: { id: string; date?: string; title: string; subtitle?: string; extra?: string; bullets?: string }[];
    icon: React.ReactNode;
  }> = ({ items, icon }) => (
    <div style={{ position: 'relative' as const }}>
      {items.map((item, idx) => (
        <div key={item.id} style={{ display: 'flex', gap: '14px', marginBottom: idx < items.length - 1 ? '0' : '0' }}>
          {/* Timeline line + dot */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '16px', flexShrink: 0 }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: DARK_BG, marginTop: '4px', zIndex: 1 }} />
            {idx < items.length - 1 && <div style={{ width: '2px', flex: 1, background: '#C0BDB8', marginTop: '2px' }} />}
          </div>
          {/* Content */}
          <div style={{ flex: 1, minWidth: 0, paddingBottom: idx < items.length - 1 ? '24px' : '0' }}>
            {item.date && <div style={{ fontSize: '13px', fontWeight: 700, color: DARK_TEXT, marginBottom: '2px' }}>{item.date}</div>}
            <div style={{ fontSize: '14px', fontWeight: 700, color: DARK_TEXT, textTransform: 'uppercase' as const }}>{item.title}</div>
            {item.subtitle && <div style={{ fontSize: '13px', color: DARK_TEXT, marginTop: '2px' }}>{item.subtitle}</div>}
            {item.extra && <div style={{ fontSize: '13px', color: DARK_TEXT, marginTop: '2px' }}>{item.extra}</div>}
            {item.bullets && (
              <ul style={{ margin: '4px 0 0 0', padding: '0 0 0 16px', fontSize: '13px', color: DARK_TEXT, lineHeight: '1.7' }}>
                {item.bullets.split('\n').filter(Boolean).map((line, li) => <li key={li}>{line}</li>)}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ width: '100%', maxWidth: '210mm', margin: '0 auto', background: '#FFFFFF', fontFamily: '"Poppins","Montserrat",sans-serif', boxSizing: 'border-box', display: 'flex' }}>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />

      {/* Left Column - Dark Background */}
      <div style={{ width: '36%', flexShrink: 0, background: DARK_BG, color: '#FFFFFF', padding: '32px 24px 28px 24px', display: 'flex', flexDirection: 'column' }}>
        {/* Profile Image */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <div style={{ width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden', background: '#6B6965', border: '4px solid rgba(255,255,255,0.15)', cursor: 'pointer' }} onClick={() => fileRef.current?.click()}>
            {photoSrc ? (
              <img src={photoSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', gap: '6px' }}>
                <Camera size={36} />
                <span style={{ fontSize: '11px' }}>Photo</span>
              </div>
            )}
          </div>
        </div>

        {/* About Me */}
        {personalInfo.summary && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} strokeWidth={2} /> About Me
            </h2>
            <p style={{ fontSize: '13px', lineHeight: '1.8', color: 'rgba(255,255,255,0.85)', margin: 0, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Contact */}
        {contactItems.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} strokeWidth={2} /> Contact
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {contactItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={16} color="#FFFFFF" strokeWidth={2} />
                  </div>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skillList.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={18} strokeWidth={2} /> Skills
            </h2>
            <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.9' }}>
              {skillList.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: 700, lineHeight: 1 }}>P</span> Projects
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.95)' }}>{proj.name}</div>
                  {proj.description && <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '2px', lineHeight: '1.5' }}>{proj.description}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: 700, lineHeight: 1 }}>C</span> Certifications
            </h2>
            <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.9' }}>
              {certifications.map((cert) => <li key={cert.id}>{cert.name}{cert.issuer ? ` \u2013 ${cert.issuer}` : ''}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column - Light Background */}
      <div style={{ flex: 1, minWidth: 0, background: LIGHT_BG, padding: '36px 32px 28px 32px' }}>
        {/* Name + Title */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '52px', fontWeight: 700, color: DARK_TEXT, margin: 0, lineHeight: 0.95 }}>
            {firstName}
          </h1>
          <h1 style={{ fontSize: '52px', fontWeight: 700, color: DARK_TEXT, margin: 0, lineHeight: 0.95 }}>
            {lastName}
          </h1>
          <p style={{ fontSize: '18px', fontWeight: 400, color: '#777777', margin: '6px 0 0 0' }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>

        {/* Education Timeline */}
        {education.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: DARK_TEXT, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={20} strokeWidth={2} /> Education
            </h2>
            <TimelineEntry
              icon={<GraduationCap size={16} />}
              items={education.map(edu => ({
                id: edu.id,
                date: edu.graduationDate,
                title: edu.school || edu.institution || '',
                subtitle: edu.degree,
                extra: edu.description || undefined,
              }))}
            />
          </div>
        )}

        {/* Experience Timeline */}
        {experience.length > 0 && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: DARK_TEXT, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={20} strokeWidth={2} /> Experience
            </h2>
            <TimelineEntry
              icon={<Briefcase size={16} />}
              items={experience.map(exp => ({
                id: exp.id,
                date: `${exp.startDate || ''}${exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}${exp.current ? 'Present' : exp.endDate || ''}`,
                title: exp.position || exp.role || '',
                subtitle: exp.company || undefined,
                bullets: exp.description || undefined,
              }))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(DarkSidebarTimelineComponent);
