import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe, User } from 'lucide-react';

interface PremiumSidebarTimelineProps {
  data: ResumeData;
}

const clean = (text: string): string => {
  if (!text) return text;
  return text
    .replace(/\\u2022/g, '\u2022')
    .replace(/\\u2013/g, '\u2013')
    .replace(/\\u2014/g, '\u2014')
    .replace(/\\u2018/g, '\u2018')
    .replace(/\\u2019/g, '\u2019')
    .replace(/\\u201c/g, '\u201c')
    .replace(/\\u201d/g, '\u201d')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '  ')
    .trim();
};

const COLORS = {
  primary: '#5A2747', sidebarBg: '#F5F2F6', text: '#222222',
  secondary: '#555555', divider: '#7A5570', white: '#FFFFFF',
};

const LINE_W = '2px';
const SQ_SIZE = 14;

const SectionTimeline: React.FC<{ title: string; icon: string; children: React.ReactNode; last?: boolean }> = ({ title, icon, children, last }) => (
  <div style={{ display: 'flex', gap: '12px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: SQ_SIZE, flexShrink: 0 }}>
      <div style={{
        width: SQ_SIZE, height: SQ_SIZE, background: COLORS.primary, display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: COLORS.white, fontWeight: 700, lineHeight: 1,
      }}>{icon}</div>
      {!last && <div style={{ width: LINE_W, flex: 1, minHeight: '20px', background: COLORS.divider }} />}
    </div>
    <div style={{ flex: 1, minWidth: 0, paddingBottom: last ? 0 : '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '0.04em', color: COLORS.text }}>{title}</span>
        <div style={{ flex: 1, height: '1px', background: COLORS.divider }} />
      </div>
      {children}
    </div>
  </div>
);

const PremiumSidebarTimelineComponent: React.FC<PremiumSidebarTimelineProps> = ({ data }) => {
  const { personalInfo, education, projects, skills, experience, certifications } = data;

  const contactItems = [
    { icon: Phone, label: 'Phone', value: personalInfo.phone },
    { icon: Mail, label: 'Email', value: personalInfo.email },
    { icon: MapPin, label: 'Address', value: personalInfo.location },
    { icon: Globe, label: 'Website', value: personalInfo.website },
  ].filter(item => item.value);

  return (
    <div style={{
      width: '100%', minHeight: '1122px', background: COLORS.white, color: COLORS.text,
      fontFamily: '"Poppins","Montserrat","Inter",sans-serif', display: 'flex',
    }}>
      {/* Sidebar */}
      <div style={{
        width: '30%', flexShrink: 0, background: COLORS.sidebarBg,
        padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '24px',
      }}>
        {/* Profile Photo */}
        {personalInfo.photoUrl ? (
          <div style={{
            width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden',
            border: `3px solid ${COLORS.primary}`, margin: '0 auto',
          }}>
            <img src={personalInfo.photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ) : (
          <div style={{
            width: '130px', height: '130px', borderRadius: '50%', margin: '0 auto',
            background: '#E8E0E8', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <User size={48} color={COLORS.divider} />
          </div>
        )}

        {/* Contact */}
        {contactItems.length > 0 && (
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: COLORS.primary, marginBottom: '12px' }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {contactItems.map((item, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <item.icon size={14} color={COLORS.primary} strokeWidth={1.5} />
                    <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: COLORS.text }}>{item.label}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: COLORS.secondary, marginTop: '1px', marginLeft: '22px', wordBreak: 'break-word' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Skills */}
        {skills.length > 0 && (
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: COLORS.primary, marginBottom: '10px' }}>Technical Skills</div>
            <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '12px', color: COLORS.secondary, lineHeight: '1.8' }}>
              {skills.map((s, i) => <li key={i}>{clean(s)}</li>)}
            </ul>
          </div>
        )}

      </div>

      {/* Main Content */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ background: COLORS.primary, padding: '28px 32px', minHeight: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 800, color: COLORS.white, margin: 0, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '14px', fontWeight: 500, color: '#D4B0C8', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px', marginBottom: 0 }}>
            {personalInfo.jobTitle || 'Professional Title'}
          </p>
        </div>

        {/* Timeline sections */}
        <div style={{ padding: '28px 32px 32px' }}>
          {/* Profile Summary */}
          {personalInfo.summary && (
            <SectionTimeline title="PROFILE" icon="P">
              <p style={{ fontSize: '13px', color: COLORS.secondary, lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap' }}>{clean(personalInfo.summary)}</p>
            </SectionTimeline>
          )}

          {/* Education */}
          {education.length > 0 && (
            <SectionTimeline title="EDUCATION" icon="E">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: COLORS.text }}>{edu.degree}</span>
                      {edu.graduationDate && <span style={{ fontSize: '12px', fontStyle: 'italic', color: COLORS.divider, whiteSpace: 'nowrap' }}>{edu.graduationDate}</span>}
                    </div>
                    <div style={{ fontSize: '13px', color: COLORS.primary, marginTop: '1px' }}>{edu.school}</div>
                    {edu.description && <div style={{ fontSize: '13px', color: COLORS.secondary, marginTop: '4px', lineHeight: '1.6' }}>{clean(edu.description)}</div>}
                  </div>
                ))}
              </div>
            </SectionTimeline>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <SectionTimeline title="EXPERIENCE" icon="W">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: COLORS.text }}>{exp.role}</span>
                      <span style={{ fontSize: '12px', fontStyle: 'italic', color: COLORS.divider, whiteSpace: 'nowrap' }}>
                        {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: COLORS.primary, marginTop: '1px' }}>{exp.company}</div>
                    {exp.description && (
                      <ul style={{ margin: '4px 0 0 0', padding: '0 0 0 16px', fontSize: '13px', color: COLORS.secondary, lineHeight: '1.7' }}>
                        {exp.description.split('\n').filter(Boolean).map((line, li) => <li key={li}>{clean(line)}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </SectionTimeline>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <SectionTimeline title="PROJECTS" icon="P">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: COLORS.text }}>{proj.name}</span>
                    <div style={{ fontSize: '13px', color: COLORS.secondary, marginTop: '3px', lineHeight: '1.6' }}>{clean(proj.description)}</div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div style={{ fontSize: '12px', fontStyle: 'italic', color: COLORS.divider, marginTop: '2px' }}>{proj.technologies.join(', ')}</div>
                    )}
                  </div>
                ))}
              </div>
            </SectionTimeline>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <SectionTimeline title="CERTIFICATIONS" icon="C">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ fontSize: '13px', color: COLORS.secondary }}>{cert.name} <span style={{ color: COLORS.divider }}>\u2014 {cert.issuer}</span></div>
                ))}
              </div>
            </SectionTimeline>
          )}

        </div>
      </div>
    </div>
  );
};

export default React.memo(PremiumSidebarTimelineComponent);
