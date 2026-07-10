import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

const GreenGeoCorporateTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  const languages = certifications || [];
  const achievements = projects || [];

  return (
    <div className="w-full bg-white text-[#2B2B2B] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* HEADER — Full-width dark green */}
      <div className="relative bg-[#184B37] px-8 pt-8 pb-7 overflow-hidden" style={{ minHeight: '200px' }}>
        {/* Decorative geometric circles */}
        <div className="absolute right-[-30px] top-[-40px] w-[220px] h-[220px] rounded-full bg-white opacity-[0.08]" />
        <div className="absolute right-[40px] top-[-10px] w-[160px] h-[160px] rounded-full bg-white opacity-[0.08]" />

        <div className="relative z-10">
          <h1 className="font-['Georgia',serif] text-[60px] text-white font-medium leading-[1.1]">
            {personalInfo.fullName || 'Full Name'}
          </h1>
          <p className="font-['Inter',sans-serif] text-[24px] text-white font-medium mt-1">
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT — Two columns */}
      <div className="flex">
        {/* LEFT COLUMN — 35% gray sidebar */}
        <div className="w-[35%] flex-shrink-0 bg-[#F4F4F2] px-6 py-6 space-y-6">

          {/* Professional Summary */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-[20px] font-bold text-[#184B37] mb-2">Professional Summary</h2>
              <p className="text-[14px] text-[#666666] leading-[1.8] text-justify whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-[20px] font-bold text-[#184B37] mb-2">Education</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[14px] font-bold text-[#2B2B2B]">{edu.degree}</p>
                    <p className="text-[14px] text-[#666666]">{edu.school}</p>
                    <p className="text-[14px] text-[#666666]">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-[20px] font-bold text-[#184B37] mb-2">Technical Skills</h2>
              <ul className="space-y-0.5">
                {skills.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] text-[#666666] leading-[1.6]">
                    <span className="flex-shrink-0 text-[#184B37] text-[16px] leading-none mt-0.5">&#x2022;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-[20px] font-bold text-[#184B37] mb-2">Languages</h2>
              <ul className="space-y-0.5">
                {languages.map((lang) => (
                  <li key={lang.id} className="flex items-start gap-2 text-[14px] text-[#666666] leading-[1.6]">
                    <span className="flex-shrink-0 text-[#184B37] text-[16px] leading-none mt-0.5">&#x2022;</span>
                    <span>{lang.name}{lang.issuer ? ` — ${lang.issuer}` : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — 65% white */}
        <div className="flex-1 px-6 py-6 space-y-6">

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-[20px] font-bold text-[#184B37] mb-3">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={exp.id}>
                    <p className="text-[18px] font-bold text-[#2B2B2B]">{exp.role}</p>
                    <p className="text-[16px] text-[#666666]">
                      {exp.company}{exp.company && (exp.startDate || exp.endDate) ? ' | ' : ''}
                      {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && (
                      <ul className="mt-1.5 space-y-0.5">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i} className="flex items-start gap-2 text-[14px] text-[#666666] leading-[1.6]">
                            <span className="flex-shrink-0 text-[#184B37] text-[16px] leading-none mt-0.5">&#x2022;</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {idx < experience.length - 1 && (
                      <div className="mt-3 h-px bg-[#D9D9D9]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <div>
              <h2 className="text-[20px] font-bold text-[#184B37] mb-2">Achievements</h2>
              <ul className="space-y-0.5">
                {achievements.map((ach) => (
                  <li key={ach.id} className="flex items-start gap-2 text-[14px] text-[#666666] leading-[1.6]">
                    <span className="flex-shrink-0 text-[#184B37] text-[16px] leading-none mt-0.5">&#x2022;</span>
                    <span>{ach.name}{ach.description ? ` — ${ach.description}` : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER — Full-width dark green */}
      <div className="bg-[#184B37] px-8 py-3 flex items-center justify-center gap-8" style={{ minHeight: '55px' }}>
        {personalInfo.phone && (
          <span className="flex items-center gap-2 text-[14px] text-white">
            <span className="w-[24px] h-[24px] rounded-full border border-white flex items-center justify-center flex-shrink-0">
              <Phone size={12} className="text-white" />
            </span>
            <span dir="ltr">{personalInfo.phone}</span>
          </span>
        )}
        {personalInfo.email && (
          <span className="flex items-center gap-2 text-[14px] text-white">
            <span className="w-[24px] h-[24px] rounded-full border border-white flex items-center justify-center flex-shrink-0">
              <Mail size={12} className="text-white" />
            </span>
            <span className="break-all">{personalInfo.email}</span>
          </span>
        )}
        {personalInfo.location && (
          <span className="flex items-center gap-2 text-[14px] text-white">
            <span className="w-[24px] h-[24px] rounded-full border border-white flex items-center justify-center flex-shrink-0">
              <MapPin size={12} className="text-white" />
            </span>
            <span>{personalInfo.location}</span>
          </span>
        )}
        {personalInfo.linkedin && (
          <span className="flex items-center gap-2 text-[14px] text-white">
            <span className="w-[24px] h-[24px] rounded-full border border-white flex items-center justify-center flex-shrink-0">
              <Linkedin size={12} className="text-white" />
            </span>
            <span className="break-all">{personalInfo.linkedin}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default React.memo(GreenGeoCorporateTemplate);
