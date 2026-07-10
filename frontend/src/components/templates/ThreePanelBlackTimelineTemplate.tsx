import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { User } from 'lucide-react';

const ThreePanelBlackTimelineTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
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
  const nameParts = (personalInfo.fullName || 'Full Name').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return (
    <div className="w-full bg-white text-black font-['Inter',sans-serif] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* HEADER — Three blocks */}
      <div className="flex h-[200px]">
        {/* Left — Photo */}
        <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
        <div className="w-[200px] flex-shrink-0 overflow-hidden cursor-pointer" onClick={() => fileRef.current?.click()}>
          {photoSrc ? (
            <img src={photoSrc} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <User size={48} className="text-gray-400" />
            </div>
          )}
        </div>

        {/* Center — Name */}
        <div className="flex-1 flex items-center px-6">
          <div>
            <h1 className="text-[58px] font-extrabold text-black leading-[0.95] tracking-[-0.01em]">
              {firstName || 'FULL'}<br />{lastName || 'NAME'}
            </h1>
          </div>
        </div>

        {/* Right — Black panel with job title */}
        <div className="w-[200px] bg-black flex-shrink-0 flex items-center px-5">
          <p className="text-white text-[18px] font-bold leading-[1.2]">
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
      </div>

      {/* CONTACT ROW */}
      <div className="px-8 pt-4 pb-2">
        <div className="flex justify-between items-center">
          {personalInfo.website && (
            <span className="flex items-center gap-2 text-[12px] text-[#555555]">
              <span className="w-[6px] h-[6px] bg-black rounded-full inline-block flex-shrink-0" />
              <span className="break-all">{personalInfo.website}</span>
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-2 text-[12px] text-[#555555]">
              <span className="w-[6px] h-[6px] bg-black rounded-full inline-block flex-shrink-0" />
              <span className="break-all">{personalInfo.linkedin}</span>
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-2 text-[12px] text-[#555555]">
              <span className="w-[6px] h-[6px] bg-black rounded-full inline-block flex-shrink-0" />
              <span dir="ltr">{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.email && (
            <span className="flex items-center gap-2 text-[12px] text-[#555555]">
              <span className="w-[6px] h-[6px] bg-black rounded-full inline-block flex-shrink-0" />
              <span className="break-all">{personalInfo.email}</span>
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-2 text-[12px] text-[#555555]">
              <span className="w-[8px] h-[8px] bg-black rounded-full inline-block flex-shrink-0" />
              <span>{personalInfo.location}</span>
            </span>
          )}
        </div>
        <div className="h-px bg-[#CFCFCF] mt-3" />
      </div>

      {/* ABOUT ME */}
      {personalInfo.summary && (
        <div className="px-8 pt-5 pb-2">
          <h2 className="text-[24px] font-bold text-black uppercase tracking-[0.02em]">About Me</h2>
          <p className="text-[13px] text-black leading-[1.8] mt-2 whitespace-pre-wrap">{personalInfo.summary}</p>
          <div className="h-px bg-[#CFCFCF] mt-5" />
        </div>
      )}

      {/* WORK EXPERIENCE — Vertical Timeline */}
      {experience.length > 0 && (
        <div className="px-8 pt-5 pb-2">
          <h2 className="text-[24px] font-bold text-black uppercase tracking-[0.02em] mb-5">Work Experience</h2>
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-[10px] bottom-[10px] w-px bg-black" />

            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <div key={exp.id} className="relative">
                  {/* Node */}
                  <div className="absolute left-[-28px] top-[4px] w-[10px] h-[10px] rounded-full bg-black z-10" />

                  <div className="flex gap-6">
                    {/* Left — Job Title */}
                    <div className="w-[35%] flex-shrink-0">
                      <p className="text-[18px] font-bold text-black">{exp.role}</p>
                    </div>
                    {/* Right — Details */}
                    <div className="flex-1">
                      <p className="text-[13px] text-[#555555]">
                        {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </p>
                      {exp.company && (
                        <p className="text-[16px] font-bold text-black mt-1">{exp.company}</p>
                      )}
                      {exp.location && (
                        <p className="text-[13px] text-[#555555]">{exp.location}</p>
                      )}
                      {exp.description && (
                        <ul className="mt-2 space-y-0.5">
                          {exp.description.split('\n').filter(Boolean).map((line, i) => (
                            <li key={i} className="flex items-start gap-2 text-[13px] text-black leading-[1.6]">
                              <span className="flex-shrink-0 text-black text-[14px] leading-none mt-0.5">&#x2022;</span>
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-px bg-[#CFCFCF] mt-6" />
        </div>
      )}

      {/* EDUCATION & SKILLS — Two column */}
      <div className="flex px-8 pt-5 pb-4 gap-8">
        {/* Education */}
        {education.length > 0 && (
          <div className="flex-1">
            <h2 className="text-[24px] font-bold text-black uppercase tracking-[0.02em] mb-3">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-[16px] font-bold text-black">{edu.school}</p>
                  <p className="text-[13px] text-[#555555]">{edu.graduationDate}</p>
                  <p className="text-[13px] text-black">{edu.degree}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex-1">
            <h2 className="text-[24px] font-bold text-black uppercase tracking-[0.02em] mb-3">Skills</h2>
            <ul className="space-y-0.5">
              {skills.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-black leading-[1.6]">
                  <span className="flex-shrink-0 text-black text-[14px] leading-none mt-0.5">&#x2022;</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CERTIFICATIONS & PROJECTS — Two column */}
      <div className="flex px-8 pb-8 gap-8">
        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="flex-1">
            <h2 className="text-[24px] font-bold text-black uppercase tracking-[0.02em] mb-3">Certifications</h2>
            <ul className="space-y-0.5">
              {certifications.map((cert) => (
                <li key={cert.id} className="flex items-start gap-2 text-[13px] text-black leading-[1.6]">
                  <span className="flex-shrink-0 text-black text-[14px] leading-none mt-0.5">&#x2022;</span>
                  <span>{cert.name}{cert.issuer ? ` — ${cert.issuer}` : ''}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="flex-1">
            <h2 className="text-[24px] font-bold text-black uppercase tracking-[0.02em] mb-3">Projects</h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p className="text-[14px] font-bold text-black">{proj.name}</p>
                  {proj.description && (
                    <p className="text-[13px] text-black leading-[1.6]">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ThreePanelBlackTimelineTemplate);
