import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Linkedin, User } from 'lucide-react';

const GreenHeroExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
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

  return (
    <div className="w-full bg-white text-[#222222] font-['Inter',sans-serif] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* Hero Header */}
      <div className="relative flex items-start px-8 pt-8 gap-8 min-h-[200px]">
        {/* Left — Profile Image + Decorative Blocks */}
        <div className="relative w-[200px] h-[170px] flex-shrink-0">
          {/* Decorative green blocks */}
          <div className="absolute -top-3 -left-3 w-[80px] h-[60px] bg-[#123B2A] z-0" />
          <div className="absolute -top-1 -left-1 w-[100px] h-[40px] bg-[#123B2A] z-0" />
          {/* Profile Image */}
          <div className="relative z-10 w-full h-full overflow-hidden cursor-pointer" onClick={() => fileRef.current?.click()}>
            {photoSrc ? (
              <img src={photoSrc} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <User size={40} className="text-gray-400" />
              </div>
            )}
          </div>
          <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
        </div>

        {/* Right — Name + Job Title */}
        <div className="flex-1 pt-1">
          <h1 className="text-[58px] font-bold text-[#123B2A] uppercase leading-[1.05] tracking-[0.03em]">
            {personalInfo.fullName || 'Full Name'}
          </h1>
          <p className="text-[22px] font-medium text-[#555555] mt-1">
            {personalInfo.jobTitle || 'Job Title'}
          </p>
          <div className="mt-4 h-px bg-[#123B2A]" />

          {/* Contact */}
          <div className="flex items-center gap-6 mt-4 text-[14px] text-[#555555]">
            {personalInfo.phone && (
              <span className="flex items-center gap-2">
                <span className="w-[30px] h-[30px] bg-[#123B2A] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={13} className="text-white" />
                </span>
                <span dir="ltr">{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.email && (
              <span className="flex items-center gap-2">
                <span className="w-[30px] h-[30px] bg-[#123B2A] rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={13} className="text-white" />
                </span>
                <span className="break-all">{personalInfo.email}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-2">
                <span className="w-[30px] h-[30px] bg-[#123B2A] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={13} className="text-white" />
                </span>
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-2">
                <span className="w-[30px] h-[30px] bg-[#123B2A] rounded-full flex items-center justify-center flex-shrink-0">
                  <Linkedin size={13} className="text-white" />
                </span>
                <span className="break-all">{personalInfo.linkedin}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Thick Green Accent Bar */}
      <div className="mx-8 my-6 h-[18px] bg-[#123B2A]" />

      {/* Main Content */}
      <div className="flex px-8 pb-8 gap-8">
        {/* LEFT COLUMN — ~58% */}
        <div className="flex-1 space-y-6">

          {/* Summary */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-[20px] font-medium text-[#123B2A] uppercase tracking-[0.08em] mb-2">Summary</h2>
              <div className="h-px bg-[#123B2A] mb-3" />
              <p className="text-[14px] text-[#555555] leading-[1.8] text-justify whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}

          {/* Professional Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-[20px] font-medium text-[#123B2A] uppercase tracking-[0.08em] mb-2">Professional Experience</h2>
              <div className="h-px bg-[#123B2A] mb-3" />
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <p className="text-[17px] font-bold text-[#222222]">{exp.role}</p>
                    <p className="text-[14px] text-[#555555]">
                      {exp.company}{exp.company && (exp.startDate || exp.endDate) ? ' | ' : ''}
                      {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && (
                      <ul className="mt-1.5 space-y-0.5">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i} className="flex items-start gap-2 text-[14px] text-[#555555] leading-[1.6]">
                            <span className="flex-shrink-0 text-[#123B2A] text-[16px] leading-none mt-0.5">&#x2022;</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — ~42% */}
        <div className="w-[42%] flex-shrink-0 space-y-6">

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-[20px] font-medium text-[#123B2A] uppercase tracking-[0.08em] mb-2">Education</h2>
              <div className="h-px bg-[#123B2A] mb-3" />
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[15px] font-bold text-[#222222]">{edu.school}</p>
                    <p className="text-[14px] text-[#555555]">{edu.degree}</p>
                    <p className="text-[14px] text-[#555555]">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-[20px] font-medium text-[#123B2A] uppercase tracking-[0.08em] mb-2">Skills</h2>
              <div className="h-px bg-[#123B2A] mb-3" />
              <ul className="space-y-0.5">
                {skills.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] text-[#555555] leading-[1.6]">
                    <span className="flex-shrink-0 text-[#123B2A] text-[16px] leading-none mt-0.5">&#x2022;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-[20px] font-medium text-[#123B2A] uppercase tracking-[0.08em] mb-2">Projects</h2>
              <div className="h-px bg-[#123B2A] mb-3" />
              <div className="space-y-2">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <p className="text-[15px] font-bold text-[#222222]">{proj.name}</p>
                    {proj.description && (
                      <p className="text-[14px] text-[#555555] leading-[1.6]">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-[20px] font-medium text-[#123B2A] uppercase tracking-[0.08em] mb-2">Certifications</h2>
              <div className="h-px bg-[#123B2A] mb-3" />
              <ul className="space-y-0.5">
                {certifications.map((cert) => (
                  <li key={cert.id} className="flex items-start gap-2 text-[14px] text-[#555555] leading-[1.6]">
                    <span className="flex-shrink-0 text-[#123B2A] text-[16px] leading-none mt-0.5">&#x2022;</span>
                    <span>{cert.name}{cert.issuer ? ` — ${cert.issuer}` : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(GreenHeroExecutiveTemplate);
