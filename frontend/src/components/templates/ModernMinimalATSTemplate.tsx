import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, Globe, MapPin, Linkedin } from 'lucide-react';

interface ModernMinimalATSProps {
  data: ResumeData;
}

const ModernMinimalATSComponent: React.FC<ModernMinimalATSProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  const ACCENT = '#2454FF';
  const DARK = '#111111';

  const contactItems = [
    { icon: Phone, value: personalInfo.phone },
    { icon: Mail, value: personalInfo.email },
    { icon: MapPin, value: personalInfo.location },
    { icon: Globe, value: personalInfo.website },
    { icon: Linkedin, value: personalInfo.linkedin },
  ].filter(item => item.value);

  const nameParts = personalInfo.fullName?.trim().split(' ') || [];
  const firstName = nameParts[0] || 'Your';
  const lastName = nameParts.slice(1).join(' ') || 'Name';

  const Dot = () => <span className="inline-block w-1 h-1 rounded-full mx-3 align-middle" style={{ backgroundColor: ACCENT }} />;

  return (
    <div className="w-full min-h-[1122px] bg-white text-[#111111] font-['Inter','Montserrat',sans-serif]">
      {/* Header - Blue outlined rectangle */}
      <div className="mx-8 mt-8 mb-6">
        <div className="border-2 flex items-stretch" style={{ borderColor: ACCENT, minHeight: '160px' }}>
          {/* Left: Name + Title */}
          <div className="flex-1 p-6 pr-0 flex flex-col justify-center">
            <h1 className="text-[52px] font-extrabold leading-[1] tracking-tight">
              <span className="text-[#111111]">{firstName}</span>{' '}
              <span style={{ color: ACCENT }}>{lastName}</span>
            </h1>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mt-1.5" style={{ color: ACCENT }}>
              {personalInfo.jobTitle || 'Professional Title'}
            </p>
          </div>

          {/* Right: Profile Photo */}
          {personalInfo.photoUrl ? (
            <div className="w-[140px] flex-shrink-0 relative overflow-hidden">
              <img
                src={personalInfo.photoUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* Two-column body */}
      <div className="flex mx-8 gap-10 pb-6">
        {/* Left Column ~60% */}
        <div className="flex-[3] min-w-0">
          {/* About Me */}
          {personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-[28px] font-bold text-[#111111] mb-2">About Me</h2>
              <div className="h-[2px] w-12 mb-3" style={{ backgroundColor: ACCENT }} />
              <p className="text-[15px] text-[#111111] leading-relaxed whitespace-pre-wrap">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-[28px] font-bold text-[#111111] mb-2">Experience</h2>
              <div className="h-[2px] w-12 mb-4" style={{ backgroundColor: ACCENT }} />
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <h3 className="text-[20px] font-bold text-[#111111]">{exp.role}</h3>
                        <p className="text-[15px] font-medium" style={{ color: ACCENT }}>{exp.company}</p>
                      </div>
                      <p className="text-[14px] text-[#666666] whitespace-nowrap flex-shrink-0">
                        {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    {exp.description && (
                      <div className="mt-1.5 space-y-1">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <p key={i} className="text-[15px] text-[#111111] leading-relaxed pl-4 relative before:absolute before:left-0 before:top-0 before:content-['\\2022']">
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-[28px] font-bold text-[#111111] mb-2">Education</h2>
              <div className="h-[2px] w-12 mb-4" style={{ backgroundColor: ACCENT }} />
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <h3 className="text-[20px] font-bold text-[#111111]">{edu.degree}</h3>
                        <p className="text-[15px] font-medium" style={{ color: ACCENT }}>{edu.school}</p>
                      </div>
                      <p className="text-[14px] text-[#666666] whitespace-nowrap flex-shrink-0">{edu.graduationDate}</p>
                    </div>
                    {edu.description && <p className="text-[15px] text-[#111111] mt-1 leading-relaxed">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column ~40% */}
        <div className="flex-[2] min-w-0">
          {/* Contact */}
          {contactItems.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#111111] mb-3">Contact</h2>
              <div className="space-y-2">
                {contactItems.map((item, i) => (
                  <p key={i} className="flex items-center gap-2 text-[15px] text-[#111111]">
                    <item.icon size={15} style={{ color: ACCENT }} className="flex-shrink-0" />
                    <span className="break-all">{item.value}</span>
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#111111] mb-3">Skills</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {skills.map((s, i) => (
                  <p key={i} className="text-[15px] text-[#111111] pl-4 relative before:absolute before:left-0 before:top-0 before:content-['\\2022'] before:text-[15px]" style={{ '--dot': ACCENT } as React.CSSProperties}>
                    {s}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#111111] mb-3">Projects</h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <p className="text-[15px] font-bold text-[#111111]">
                      {proj.name}
                      {proj.link && <span className="text-[14px] font-normal text-[#666666] ml-2">| {proj.link}</span>}
                    </p>
                    <p className="text-[15px] text-[#111111] mt-0.5 leading-relaxed">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <p className="text-[13px] text-[#999999] mt-0.5">{proj.technologies.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#111111] mb-3">Certifications</h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-[15px] font-bold text-[#111111]">{cert.name}</p>
                    <p className="text-[14px] text-[#666666]">{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ModernMinimalATSComponent);
