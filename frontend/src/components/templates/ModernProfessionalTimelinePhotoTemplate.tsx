import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, MapPin, Mail, Globe, Linkedin, User } from 'lucide-react';

interface ModernProfessionalTimelinePhotoProps {
  data: ResumeData;
}

const ModernProfessionalTimelinePhotoComponent: React.FC<ModernProfessionalTimelinePhotoProps> = ({ data }) => {
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

  const contactLeft = [
    { icon: Phone, value: personalInfo.phone },
    { icon: MapPin, value: personalInfo.location },
  ].filter(item => item.value);

  const contactRight = [
    { icon: Mail, value: personalInfo.email },
    { icon: Globe, value: personalInfo.website },
    { icon: Linkedin, value: personalInfo.linkedin },
  ].filter(item => item.value);

  return (
    <div className="w-full min-h-[1122px] bg-white text-[#222222] p-10 font-['Inter','Poppins',sans-serif]">
      {/* Header: Name left, Photo right */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-[52px] font-extrabold text-[#222222] leading-[0.95] tracking-tight">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-lg text-[#666666] font-medium mt-1">
            {personalInfo.jobTitle || 'Professional Title'}
          </p>
        </div>
        <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 ml-4 cursor-pointer" onClick={() => fileRef.current?.click()}>
          <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
          {photoSrc ? (
            <img src={photoSrc} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-20 h-20 rounded bg-[#EDEDED] flex items-center justify-center">
              <User size={28} className="text-[#666666]" />
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#7C8C96] mb-5" />

      {/* Contact Section - Two columns */}
      {(contactLeft.length > 0 || contactRight.length > 0) && (
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="space-y-2">
            {contactLeft.map((item, i) => (
              <p key={i} className="text-[11px] text-[#666666] flex items-center gap-2">
                <span className="w-[18px] h-[18px] rounded-full border border-[#5A7080] flex items-center justify-center flex-shrink-0">
                  <item.icon size={10} className="text-[#5A7080]" />
                </span>
                {item.value}
              </p>
            ))}
          </div>
          <div className="space-y-2">
            {contactRight.map((item, i) => (
              <p key={i} className="text-[11px] text-[#666666] flex items-center gap-2">
                <span className="w-[18px] h-[18px] rounded-full border border-[#5A7080] flex items-center justify-center flex-shrink-0">
                  <item.icon size={10} className="text-[#5A7080]" />
                </span>
                <span className="break-all">{item.value}</span>
              </p>
            ))}
          </div>
        </div>
      )}

      {/* About Me */}
      {personalInfo.summary && (
        <section className="mb-5">
          <span className="inline-block bg-[#EDEDED] text-[18px] font-bold uppercase tracking-wider text-[#222222] px-4 py-1 mb-3">About Me</span>
          <p className="text-[11px] text-[#666666] leading-relaxed whitespace-pre-wrap">{personalInfo.summary}</p>
        </section>
      )}

      {/* Main divider */}
      <div className="h-px bg-[#7C8C96] mb-6" />

      {/* Two-column Main Content */}
      <div className="flex gap-8">
        {/* Left Column (30%) */}
        <div className="w-[30%] space-y-7">
          {education.length > 0 && (
            <section>
              <span className="inline-block bg-[#EDEDED] text-[18px] font-bold uppercase tracking-wider text-[#222222] px-4 py-1 mb-3">Education</span>
              <div className="space-y-3 mt-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold text-[#222222]">{edu.degree}</p>
                    <p className="text-[11px] text-[#666666]">{edu.school}</p>
                    {edu.graduationDate && <p className="text-[10px] text-[#999999]">{edu.graduationDate}</p>}
                    {edu.description && <p className="text-[11px] text-[#666666] mt-0.5 leading-relaxed">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <span className="inline-block bg-[#EDEDED] text-[18px] font-bold uppercase tracking-wider text-[#222222] px-4 py-1 mb-3">Skills</span>
              <div className="space-y-1 mt-3">
                {skills.map((s, i) => (
                  <p key={i} className="text-[11px] text-[#666666] pl-3 relative before:absolute before:left-0 before:top-0 before:text-[11px] before:text-[#666666] before:content-['\\2022']">
                    {s}
                  </p>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column (70%) */}
        <div className="w-[70%] space-y-7">
          {experience.length > 0 && (
            <section>
              <span className="inline-block bg-[#EDEDED] text-[18px] font-bold uppercase tracking-wider text-[#222222] px-4 py-1 mb-3">Work Experience</span>
              <div className="space-y-0 mt-3">
                {experience.map((exp, expIdx) => (
                  <div key={exp.id} className="flex gap-4">
                    <div className="flex flex-col items-center w-4 flex-shrink-0">
                      <div className="w-3 h-3 rounded-full border-2 border-[#5A7080] bg-white mt-1.5 flex-shrink-0" />
                      {expIdx < experience.length - 1 && <div className="w-0.5 flex-1 bg-[#5A7080] min-h-[20px]" />}
                    </div>
                    <div className="pb-6">
                      <p className="text-sm font-bold text-[#222222]">{exp.role}</p>
                      <p className="text-[11px] text-[#666666]">{exp.company}</p>
                      <p className="text-[10px] text-[#999999]">
                        {exp.startDate}{exp.startDate && (exp.current || exp.endDate) ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </p>
                      {exp.description && (
                        <p className="text-[11px] text-[#666666] mt-1.5 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <span className="inline-block bg-[#EDEDED] text-[18px] font-bold uppercase tracking-wider text-[#222222] px-4 py-1 mb-3">Projects</span>
              <div className="space-y-3 mt-3">
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

          {certifications.length > 0 && (
            <section>
              <span className="inline-block bg-[#EDEDED] text-[18px] font-bold uppercase tracking-wider text-[#222222] px-4 py-1 mb-3">Certifications</span>
              <div className="space-y-2 mt-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-sm font-bold text-[#222222]">{cert.name}</p>
                    <p className="text-[11px] text-[#666666]">{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</p>
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

export default React.memo(ModernProfessionalTimelinePhotoComponent);
