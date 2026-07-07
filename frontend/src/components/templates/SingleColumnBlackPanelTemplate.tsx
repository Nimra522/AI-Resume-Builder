import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { User } from 'lucide-react';

const SingleColumnBlackPanelTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications } = data;
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
  const additionalInfo = certifications || [];

  return (
    <div className="w-full bg-white text-[#111111] font-['Inter',sans-serif] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* Header */}
      <div className="flex justify-between items-start px-8 pt-8 pb-4 gap-8">
        <div className="flex-1">
          <h1 className="text-[44px] font-extrabold text-[#111111] uppercase leading-tight tracking-[0.01em]">
            {personalInfo.fullName || 'Full Name'}
          </h1>
          <p className="text-[16px] text-[#555555] mt-1 font-medium">
            {personalInfo.jobTitle || 'Job Title'}
          </p>

          {/* Contact Info Box */}
          <div className="mt-4 bg-[#1F1F1F] rounded-lg px-5 py-4 text-white space-y-1 max-w-[320px]">
            {personalInfo.location && (
              <p className="text-[13px] leading-relaxed">
                <span className="font-bold">Address:</span><br />
                <span className="font-normal opacity-90">{personalInfo.location}</span>
              </p>
            )}
            {personalInfo.phone && (
              <p className="text-[13px] leading-relaxed">
                <span className="font-bold">Phone:</span><br />
                <span className="font-normal opacity-90" dir="ltr">{personalInfo.phone}</span>
              </p>
            )}
            {personalInfo.email && (
              <p className="text-[13px] leading-relaxed">
                <span className="font-bold">Email:</span><br />
                <span className="font-normal opacity-90 break-all">{personalInfo.email}</span>
              </p>
            )}
            {personalInfo.website && (
              <p className="text-[13px] leading-relaxed">
                <span className="font-bold">Website:</span><br />
                <span className="font-normal opacity-90 break-all">{personalInfo.website}</span>
              </p>
            )}
            {personalInfo.linkedin && (
              <p className="text-[13px] leading-relaxed">
                <span className="font-bold">LinkedIn:</span><br />
                <span className="font-normal opacity-90 break-all">{personalInfo.linkedin}</span>
              </p>
            )}
          </div>
        </div>

        <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
        {photoSrc ? (
          <div className="flex-shrink-0 cursor-pointer" onClick={() => fileRef.current?.click()}>
            <img src={photoSrc} alt="Profile" className="w-[140px] h-[140px] object-cover" />
          </div>
        ) : (
          <div className="flex-shrink-0 w-[140px] h-[140px] bg-gray-100 flex items-center justify-center cursor-pointer" onClick={() => fileRef.current?.click()}>
            <User size={48} className="text-gray-400" />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8 space-y-6">

        {/* ABOUT ME */}
        {personalInfo.summary && (
          <div>
            <div className="bg-[#1F1F1F] rounded-lg px-4 py-2.5 mb-3">
              <h2 className="text-[18px] font-bold text-white uppercase tracking-[0.02em]">About Me</h2>
            </div>
            <p className="text-[14px] text-[#555555] leading-[1.8] text-justify whitespace-pre-wrap pl-0">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* WORK EXPERIENCE */}
        {experience.length > 0 && (
          <div>
            <div className="bg-[#1F1F1F] rounded-lg px-4 py-2.5 mb-3">
              <h2 className="text-[18px] font-bold text-white uppercase tracking-[0.02em]">Work Experience</h2>
            </div>
            <div className="space-y-4 pl-0">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <div>
                      <p className="text-[18px] font-bold text-[#111111]">{exp.role}</p>
                      <p className="text-[14px] text-[#555555]">{exp.company}</p>
                    </div>
                    <p className="text-[14px] text-[#555555] flex-shrink-0">
                      {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  {exp.description && (
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i} className="flex items-start gap-2 text-[14px] text-[#555555] leading-[1.6]">
                          <span className="flex-shrink-0 text-[#111111] text-[16px] leading-none mt-0.5">&#x2022;</span>
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

        {/* EDUCATION */}
        {education.length > 0 && (
          <div>
            <div className="bg-[#1F1F1F] rounded-lg px-4 py-2.5 mb-3">
              <h2 className="text-[18px] font-bold text-white uppercase tracking-[0.02em]">Education</h2>
            </div>
            <div className="space-y-3 pl-0">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <div>
                      <p className="text-[16px] font-bold text-[#111111]">{edu.degree || edu.school}</p>
                      {edu.degree && edu.school && (
                        <p className="text-[14px] text-[#555555]">{edu.school}</p>
                      )}
                    </div>
                    <p className="text-[14px] text-[#555555] flex-shrink-0">{edu.graduationDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADDITIONAL INFORMATION */}
        {(skills.length > 0 || additionalInfo.length > 0) && (
          <div>
            <div className="bg-[#1F1F1F] rounded-lg px-4 py-2.5 mb-3">
              <h2 className="text-[18px] font-bold text-white uppercase tracking-[0.02em]">Additional Information</h2>
            </div>
            <div className="space-y-1 pl-0">
              {skills.length > 0 && (
                <>
                  <p className="text-[14px] font-bold text-[#111111]">Technical Skills</p>
                  <ul className="space-y-0.5 mb-2">
                    {skills.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-[14px] text-[#555555] leading-[1.6]">
                        <span className="flex-shrink-0 text-[#111111] text-[16px] leading-none mt-0.5">&#x2022;</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {additionalInfo.length > 0 && (
                <>
                  <p className="text-[14px] font-bold text-[#111111]">Certifications</p>
                  <ul className="space-y-0.5">
                    {additionalInfo.map((cert) => (
                      <li key={cert.id} className="flex items-start gap-2 text-[14px] text-[#555555] leading-[1.6]">
                        <span className="flex-shrink-0 text-[#111111] text-[16px] leading-none mt-0.5">&#x2022;</span>
                        <span>{cert.name}{cert.issuer ? ` — ${cert.issuer}` : ''}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SingleColumnBlackPanelTemplate);
