import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, Globe, MapPin, Linkedin, User } from 'lucide-react';

interface ModernEditorialTimelineProps {
  data: ResumeData;
}

const ModernEditorialTimelineComponent: React.FC<ModernEditorialTimelineProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;
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

  const ACCENT = '#C7A37A';

  const contactLeft = [
    { icon: Phone, value: personalInfo.phone },
    { icon: MapPin, value: personalInfo.location },
  ].filter(item => item.value);

  const contactRight = [
    { icon: Mail, value: personalInfo.email },
    { icon: Globe, value: personalInfo.website },
    { icon: Linkedin, value: personalInfo.linkedin },
  ].filter(item => item.value);

  const SectionDivider = () => <div className="h-[2px] my-8" style={{ backgroundColor: ACCENT }} />;

  return (
    <div className="w-full min-h-[1122px] bg-white text-[#222222] p-10 font-['Poppins','Inter',sans-serif]">
      {/* Header */}
      <div className="flex gap-8 mb-4">
        {/* Profile Photo */}
        <div className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0 border-4 shadow-sm cursor-pointer" style={{ borderColor: ACCENT }} onClick={() => fileRef.current?.click()}>
          <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
          {photoSrc ? (
            <img src={photoSrc} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#F5EDE4' }}>
              <User size={36} style={{ color: ACCENT }} />
            </div>
          )}
        </div>

        {/* Name & Title */}
        <div className="flex-1 min-w-0">
          <h1 className="text-[56px] font-extrabold text-[#222222] leading-[0.95] tracking-tight mb-1">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-[22px] font-medium mb-4" style={{ color: ACCENT }}>
            {personalInfo.jobTitle || 'Professional Title'}
          </p>

          {/* Contact - Two columns */}
          {(contactLeft.length > 0 || contactRight.length > 0) && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[11px] text-[#666666]">
              <div className="space-y-1">
                {contactLeft.map((item, i) => (
                  <p key={i} className="flex items-center gap-1.5">
                    <item.icon size={13} style={{ color: ACCENT }} className="flex-shrink-0" />
                    {item.value}
                  </p>
                ))}
              </div>
              <div className="space-y-1">
                {contactRight.map((item, i) => (
                  <p key={i} className="flex items-center gap-1.5">
                    <item.icon size={13} style={{ color: ACCENT }} className="flex-shrink-0" />
                    <span className="break-all">{item.value}</span>
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          {personalInfo.summary && (
            <p className="text-[11px] text-[#666666] leading-relaxed mt-3 whitespace-pre-wrap">{personalInfo.summary}</p>
          )}
        </div>
      </div>

      <SectionDivider />

      {/* Two-column layout: Left (26%) titles, Right (74%) content */}
      <div className="flex gap-8">
        {/* Left Column - Section Titles */}
        <div className="w-[26%] flex-shrink-0 space-y-8 pt-1">
          {experience.length > 0 && (
            <h2 className="text-[20px] font-bold uppercase tracking-wider text-[#222222]">Career</h2>
          )}
          {education.length > 0 && (
            <h2 className="text-[20px] font-bold uppercase tracking-wider text-[#222222]">Education</h2>
          )}
          {skills.length > 0 && (
            <h2 className="text-[20px] font-bold uppercase tracking-wider text-[#222222]">Skills</h2>
          )}
          {certifications.length > 0 && (
            <h2 className="text-[20px] font-bold uppercase tracking-wider text-[#222222]">Certifications</h2>
          )}
          {projects && projects.length > 0 && (
            <h2 className="text-[20px] font-bold uppercase tracking-wider text-[#222222]">Projects</h2>
          )}
        </div>

        {/* Right Column - Content */}
        <div className="flex-1 min-w-0 space-y-8">
          {/* Work Experience */}
          {experience.length > 0 && (
            <section>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="flex gap-6">
                    {/* Left: Dates + Company */}
                    <div className="w-36 flex-shrink-0">
                      <p className="text-[15px] font-bold" style={{ color: ACCENT }}>
                        {exp.startDate}{exp.startDate && (exp.current || exp.endDate) ? ' \u2013 ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </p>
                      <p className="text-[18px] font-bold text-[#222222] mt-1">{exp.company}</p>
                    </div>
                    {/* Right: Title + Bullets */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#222222]">{exp.role}</p>
                      {exp.description && (
                        <div className="mt-1.5 space-y-0.5">
                          {exp.description.split('\n').filter(Boolean).map((line, li) => (
                            <p key={li} className="text-[11px] text-[#666666] leading-relaxed pl-3 relative before:absolute before:left-0 before:top-0 before:text-[11px] before:content-['\\2022']" style={{ color: '#666666' }}>
                              {line}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <div className="space-y-5">
                {education.map((edu) => (
                  <div key={edu.id} className="flex gap-6">
                    <div className="w-36 flex-shrink-0">
                      <p className="text-[15px] font-bold" style={{ color: ACCENT }}>{edu.graduationDate || ''}</p>
                      <p className="text-[18px] font-bold text-[#222222] mt-1">{edu.degree}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#222222]">{edu.school}</p>
                      {edu.description && <p className="text-[11px] text-[#666666] mt-1 leading-relaxed">{edu.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <div className="flex flex-wrap gap-x-1 gap-y-1 text-[11px] text-[#666666]">
                {skills.map((s, i) => (
                  <span key={i}>
                    {i > 0 && <span className="mx-1" style={{ color: ACCENT }}>/</span>}
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-sm font-bold text-[#222222]">{cert.name}</p>
                    <p className="text-[11px] text-[#666666]">{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <p className="text-sm font-bold text-[#222222]">
                      {proj.name}
                      {proj.link && <span className="text-[11px] font-normal text-[#666666] ml-2">| {proj.link}</span>}
                    </p>
                    <p className="text-[11px] text-[#666666] mt-0.5 leading-relaxed">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <p className="text-[10px] text-[#999999] mt-0.5">{proj.technologies.join(', ')}</p>
                    )}
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

export default React.memo(ModernEditorialTimelineComponent);
