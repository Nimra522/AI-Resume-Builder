import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

const MinimalBlackPhotoTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
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
  const nameParts = (personalInfo.fullName || 'Full Name').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Generate dotted line between text and date
  const DottedRow: React.FC<{ label: string; date: string }> = ({ label, date }) => (
    <div className="flex items-center gap-1 text-[15px] text-[#111111]">
      <span className="flex-shrink-0">{label}</span>
      <div className="flex-1 min-w-[20px] border-b border-dotted border-[#000000] self-center mx-1" style={{ borderBottomWidth: '1px', borderStyle: 'dotted', height: '1px' }} />
      <span className="flex-shrink-0 text-[14px]">{date}</span>
    </div>
  );

  return (
    <div className="w-full bg-white text-[#111111] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* Top thin divider */}
      <div className="mx-8 pt-7 pb-0">
        <div className="h-px bg-[#000000]" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-8 px-8 py-7">
        <div className="flex-shrink-0 w-[160px] h-[160px] bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => fileRef.current?.click()}>
          <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
          {photoSrc ? (
            <img src={photoSrc} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="1.5" className="w-12 h-12">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </div>
        <div>
          <h1 className="text-[60px] font-extrabold text-[#111111] uppercase leading-[1.05] tracking-[-0.01em]">
            {firstName}<br />{lastName || 'SURNAME'}
          </h1>
          <p className="text-[24px] font-bold text-[#111111] uppercase mt-1 tracking-[0.04em]">
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
      </div>

      {/* Bottom header divider */}
      <div className="mx-8 pb-0">
        <div className="h-px bg-[#000000]" />
      </div>

      {/* Main content */}
      <div className="flex px-8 pt-6 pb-8 gap-8">
        {/* Left column — ~42% */}
        <div className="w-[42%] flex-shrink-0 space-y-7">

          {/* PROFILE */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-center text-[22px] font-bold text-[#111111] uppercase tracking-[0.03em]">PROFILE</h2>
              <div className="mt-2">
                <div className="h-px bg-[#000000]" />
              </div>
              <div className="mt-2 mb-2">
                <div className="h-px bg-[#000000]" />
              </div>
              <p className="text-[14px] text-[#444444] leading-[1.8] text-justify whitespace-pre-wrap">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* EDUCATION */}
          {education.length > 0 && (
            <div>
              <h2 className="text-center text-[22px] font-bold text-[#111111] uppercase tracking-[0.03em]">EDUCATION</h2>
              <div className="mt-2">
                <div className="h-px bg-[#000000]" />
              </div>
              <div className="mt-2 mb-2">
                <div className="h-px bg-[#000000]" />
              </div>
              <div className="space-y-2.5">
                {education.map((edu) => (
                  <DottedRow
                    key={edu.id}
                    label={edu.school || edu.degree || 'Institution'}
                    date={edu.graduationDate || ''}
                  />
                ))}
              </div>
            </div>
          )}

          {/* SKILLS */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-center text-[22px] font-bold text-[#111111] uppercase tracking-[0.03em]">SKILLS</h2>
              <div className="mt-2">
                <div className="h-px bg-[#000000]" />
              </div>
              <div className="mt-2 mb-2">
                <div className="h-px bg-[#000000]" />
              </div>
              <ul className="space-y-1 pl-0">
                {skills.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] text-[#444444] leading-[1.6]">
                    <span className="text-[#000000] text-[16px] leading-none mt-0.5">&#x2022;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right column — ~58% */}
        <div className="flex-1 space-y-7">

          {/* WORK EXPERIENCE */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-center text-[22px] font-bold text-[#111111] uppercase tracking-[0.03em]">WORK EXPERIENCE</h2>
              <div className="mt-2">
                <div className="h-px bg-[#000000]" />
              </div>
              <div className="mt-2 mb-2">
                <div className="h-px bg-[#000000]" />
              </div>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="flex gap-3">
                    <div className="w-[4px] bg-[#000000] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline gap-2">
                        <p className="text-[18px] font-bold text-[#111111]">{exp.role}</p>
                        <p className="text-[14px] font-bold text-[#111111] flex-shrink-0">
                          {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                        </p>
                      </div>
                      <p className="text-[14px] text-[#444444]">{exp.company}</p>
                      {exp.description && (
                        <p className="text-[14px] text-[#444444] leading-[1.7] mt-1 text-justify">
                          {exp.description.split('\n').filter(Boolean).join(' ')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATIONS */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-center text-[22px] font-bold text-[#111111] uppercase tracking-[0.03em]">CERTIFICATIONS</h2>
              <div className="mt-2">
                <div className="h-px bg-[#000000]" />
              </div>
              <div className="mt-2 mb-2">
                <div className="h-px bg-[#000000]" />
              </div>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-[15px] font-bold text-[#111111]">{cert.name}</p>
                    <p className="text-[14px] text-[#444444]">{cert.issuer}</p>
                    {cert.date && <p className="text-[14px] text-[#444444]">{cert.date}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom contact bar */}
      <div className="mx-8">
        <div className="h-px bg-[#000000]" />
      </div>
      <div className="px-8 py-4 flex items-center justify-center gap-8 text-[14px] text-[#444444]">
        {personalInfo.phone && (
          <span className="flex items-center gap-2">
            <span className="w-[8px] h-[8px] bg-[#000000] rounded-full inline-block flex-shrink-0" />
            <span dir="ltr">{personalInfo.phone}</span>
          </span>
        )}
        {personalInfo.email && (
          <span className="flex items-center gap-2">
            <span className="w-[8px] h-[8px] bg-[#000000] rounded-full inline-block flex-shrink-0" />
            <span className="break-all">{personalInfo.email}</span>
          </span>
        )}
        {personalInfo.location && (
          <span className="flex items-center gap-2">
            <span className="w-[8px] h-[8px] bg-[#000000] rounded-full inline-block flex-shrink-0" />
            <span>{personalInfo.location}</span>
          </span>
        )}
        {personalInfo.linkedin && (
          <span className="flex items-center gap-2">
            <span className="w-[8px] h-[8px] bg-[#000000] rounded-full inline-block flex-shrink-0" />
            <span className="break-all">{personalInfo.linkedin}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default React.memo(MinimalBlackPhotoTemplate);
