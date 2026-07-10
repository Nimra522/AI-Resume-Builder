import React from 'react';
import { ResumeData } from '../../types';

const MinimalCorporateBlueBannerTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full bg-white text-[#111111] font-['Poppins',sans-serif] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* HEADER */}
      <div className="flex min-h-[130px]">
        {/* Left — Blue Name Block */}
        <div className="flex w-[42%] flex-shrink-0">
          {/* Dark blue vertical strip */}
          <div className="w-[40px] bg-[#0D4AA3] flex-shrink-0" />
          {/* Blue rectangle */}
          <div className="flex-1 bg-[#1565D8] flex items-center px-6">
            <h1 className="text-[40px] font-extrabold text-white leading-[1.05]">
              {(personalInfo.fullName || 'FULL NAME').split(' ')[0] || 'NAME'}
              <br />
              {(personalInfo.fullName || 'FULL NAME').split(' ').slice(1).join(' ') || 'SURNAME'}
            </h1>
          </div>
        </div>

        {/* Right — Light gray area with job title */}
        <div className="flex-1 bg-[#F4F4F4] flex items-start justify-end px-6 pt-5">
          <p className="text-[20px] font-normal text-[#111111]">
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
      </div>

      {/* CONTACT ROW */}
      <div className="px-8 pt-1">
        <div className="h-px bg-[#111111]" />
        <div className="flex justify-between items-center py-2 text-[14px] text-[#333333]">
          {personalInfo.phone && <span dir="ltr">{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span className="break-all">{personalInfo.website}</span>}
          {personalInfo.linkedin && <span className="break-all">{personalInfo.linkedin}</span>}
          {personalInfo.email && <span className="break-all">{personalInfo.email}</span>}
        </div>
        <div className="h-px bg-[#111111]" />
      </div>

      {/* ABOUT ME */}
      {personalInfo.summary && (
        <div className="px-8 pt-6 pb-4">
          <h2 className="text-[24px] font-bold text-[#111111] uppercase tracking-[0.02em]">About Me</h2>
          <p className="text-[14px] text-[#333333] leading-[1.7] mt-2 max-w-[95%] whitespace-pre-wrap">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* EDUCATION + SKILLS ROW */}
      <div className="flex px-8 py-4 gap-2">
        {/* LEFT — Education with timeline */}
        {education.length > 0 && (
          <div className="flex-[72] pr-6 relative">
            {/* Vertical divider */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-[#111111]" />

            <h2 className="text-[18px] font-bold text-[#111111] uppercase tracking-[0.02em] mb-4">Education</h2>

            {/* Horizontal Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-[9px] left-[10px] right-[10px] h-px bg-[#000000]" />

              <div className="flex justify-between relative">
                {education.map((edu, idx) => (
                  <div key={edu.id} className="flex flex-col items-center text-center flex-1">
                    {/* Node */}
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-[#000000] bg-white z-10 mb-2" />
                    {/* Date */}
                    <p className="text-[12px] font-medium text-[#333333]">{edu.graduationDate || 'Date'}</p>
                    {/* University */}
                    <p className="text-[13px] font-semibold text-[#111111] mt-1">{edu.school}</p>
                    {/* Degree */}
                    {edu.degree && (
                      <p className="text-[12px] text-[#333333] mt-0.5">{edu.degree}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RIGHT — Skills */}
        {skills.length > 0 && (
          <div className="flex-[28] pl-6">
            <h2 className="text-[18px] font-bold text-[#111111] uppercase tracking-[0.02em] mb-3">Skills</h2>
            <ul className="space-y-1">
              {skills.map((s, i) => (
                <li key={i} className="text-[13px] text-[#333333] leading-[1.6] list-disc list-inside">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* WORK EXPERIENCE */}
      {experience.length > 0 && (
        <div className="bg-[#F3F3F3] px-8 py-6 mt-4">
          <h2 className="text-[18px] font-bold text-[#111111] uppercase tracking-[0.02em] mb-4">Work Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-4">
                  <div>
                    <p className="text-[14px] font-bold uppercase text-[#111111]">{exp.company}</p>
                    <p className="text-[13px] font-semibold text-[#333333]">{exp.role}</p>
                  </div>
                  <p className="text-[12px] font-medium text-[#333333] flex-shrink-0">
                    {exp.startDate}{exp.startDate && exp.endDate ? '–' : ''}{exp.current ? 'NOW' : exp.endDate}
                  </p>
                </div>
                {exp.description && (
                  <div className="mt-2">
                    <p className="text-[13px] text-[#333333] leading-[1.7]">
                      {exp.description.split('\n')[0]}
                    </p>
                    {exp.description.split('\n').length > 1 && (
                      <ul className="mt-1.5 space-y-0.5">
                        {exp.description.split('\n').slice(1).filter(Boolean).map((line, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-[#333333] leading-[1.6]">
                            <span className="flex-shrink-0 text-[#111111] text-[14px] leading-none mt-0.5">&#x2022;</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mt-6">
              <h2 className="text-[18px] font-bold text-[#111111] uppercase tracking-[0.02em] mb-3">Projects</h2>
              <div className="space-y-2">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <p className="text-[14px] font-bold text-[#111111]">{proj.name}</p>
                    {proj.description && (
                      <p className="text-[13px] text-[#333333] leading-[1.6]">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mt-6">
              <h2 className="text-[18px] font-bold text-[#111111] uppercase tracking-[0.02em] mb-3">Certifications</h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-[14px] font-bold text-[#111111]">{cert.name}</p>
                    <p className="text-[13px] text-[#333333]">{cert.issuer}{cert.issuer && cert.date ? ' — ' : ''}{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* FOOTER */}
      <div className="h-[36px] bg-[#76A7E6]" />
    </div>
  );
};

export default React.memo(MinimalCorporateBlueBannerTemplate);
