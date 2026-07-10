import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, Globe, MapPin, Linkedin, User } from 'lucide-react';

interface ModernCorporatePhotoProps {
  data: ResumeData;
}

const ModernCorporatePhotoComponent: React.FC<ModernCorporatePhotoProps> = ({ data }) => {
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

  const contactItems = [
    { icon: Phone, value: personalInfo.phone },
    { icon: Mail, value: personalInfo.email },
    { icon: Globe, value: personalInfo.website },
    { icon: MapPin, value: personalInfo.location },
    { icon: Linkedin, value: personalInfo.linkedin },
  ].filter(item => item.value);

  return (
    <div className="w-full min-h-[1122px] bg-white text-[#111111] font-['Poppins','Inter',sans-serif] flex">
      {/* Left Column (34%) - Pastel Blue */}
      <div className="w-[34%] bg-[#EAF5FF] p-6 flex flex-col items-center space-y-6">
        {/* Profile Photo */}
        <div className="w-28 h-28 rounded overflow-hidden flex-shrink-0 mt-2 cursor-pointer" onClick={() => fileRef.current?.click()}>
          <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
          {photoSrc ? (
            <img src={photoSrc} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full rounded bg-white/60 flex items-center justify-center">
              <User size={36} className="text-[#555555]" />
            </div>
          )}
        </div>

        {/* Contact */}
        {contactItems.length > 0 && (
          <section className="w-full">
            <h2 className="text-[18px] font-bold uppercase tracking-wider text-[#111111] mb-3">Contact</h2>
            <div className="space-y-2.5">
              {contactItems.map((item, i) => (
                <p key={i} className="text-[11px] text-[#555555] flex items-center gap-2">
                  <item.icon size={13} className="text-[#111111] flex-shrink-0" />
                  <span className="break-all">{item.value}</span>
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="w-full">
            <h2 className="text-[18px] font-bold uppercase tracking-wider text-[#111111] mb-3">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-sm font-bold text-[#111111]">{edu.degree}</p>
                  <p className="text-[11px] text-[#555555]">{edu.school}</p>
                  {edu.graduationDate && <p className="text-[10px] text-[#777777]">{edu.graduationDate}</p>}
                  {edu.description && <p className="text-[11px] text-[#555555] mt-0.5 leading-relaxed">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Right Column (66%) - White */}
      <div className="w-[66%] flex flex-col">
        <div className="p-8 pb-0">
          {/* Header */}
          <header className="mb-5">
            <h1 className="text-[54px] font-extrabold text-[#111111] leading-[0.95] tracking-tight mb-1">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-lg uppercase tracking-[0.2em] text-[#555555] font-medium">
              {personalInfo.jobTitle || 'Professional Title'}
            </p>
          </header>

          {/* Divider */}
          <div className="w-full h-px bg-black mb-5" />

          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-[20px] font-bold uppercase tracking-wider text-[#111111] mb-2">Profile</h2>
              <p className="text-[11px] text-[#555555] leading-relaxed whitespace-pre-wrap">{personalInfo.summary}</p>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-[20px] font-bold uppercase tracking-wider text-[#111111] mb-4">Skills</h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {skills.map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[11px] text-[#111111] font-medium">{s}</p>
                    </div>
                    <div className="w-full h-[6px] bg-[#D0E4F5] rounded-full overflow-hidden">
                      <div className="h-full bg-black rounded-full" style={{ width: `${Math.max(60, 100 - i * 8)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Experience Section - Pastel Blue Background */}
        <div className="flex-1 bg-[#EAF5FF] p-8 pt-6">
          {experience.length > 0 && (
            <section>
              <h2 className="text-[20px] font-bold uppercase tracking-wider text-[#111111] mb-5">Experience</h2>
              <div className="space-y-0">
                {experience.map((exp, expIdx) => (
                  <div key={exp.id} className="flex gap-4">
                    {/* Timeline */}
                    <div className="flex flex-col items-center w-4 flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-black mt-1.5 flex-shrink-0" />
                      {expIdx < experience.length - 1 && <div className="w-0.5 flex-1 bg-black min-h-[20px]" />}
                    </div>
                    {/* Content */}
                    <div className={`pb-6 ${expIdx < experience.length - 1 ? '' : ''}`}>
                      <p className="text-sm font-bold text-[#111111]">{exp.role}</p>
                      <p className="text-[11px] text-[#555555]">
                        {exp.startDate}{exp.startDate && (exp.current || exp.endDate) ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </p>
                      <p className="text-[11px] text-[#111111] font-medium mt-0.5">{exp.company}</p>
                      {exp.description && (
                        <div className="mt-1.5 space-y-0.5">
                          {exp.description.split('\n').filter(Boolean).map((line, li) => (
                            <p key={li} className="text-[11px] text-[#555555] leading-relaxed pl-3 relative before:absolute before:left-0 before:top-0 before:text-[11px] before:text-[#555555] before:content-['\\2022']">
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

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="mt-2">
              <h2 className="text-[20px] font-bold uppercase tracking-wider text-[#111111] mb-4">Projects</h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="flex gap-4">
                    <div className="w-3 h-3 rounded-full bg-black mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-[#111111]">
                        {proj.name}
                        {proj.link && <span className="text-[11px] font-normal text-[#555555] ml-2">| {proj.link}</span>}
                      </p>
                      <p className="text-[11px] text-[#555555] mt-0.5 leading-relaxed">{proj.description}</p>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <p className="text-[10px] text-[#777777] mt-0.5">{proj.technologies.join(', ')}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="mt-6">
              <h2 className="text-[20px] font-bold uppercase tracking-wider text-[#111111] mb-4">Certifications</h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex gap-4">
                    <div className="w-3 h-3 rounded-full bg-black mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-[#111111]">{cert.name}</p>
                      <p className="text-[11px] text-[#555555]">{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</p>
                    </div>
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

export default React.memo(ModernCorporatePhotoComponent);
