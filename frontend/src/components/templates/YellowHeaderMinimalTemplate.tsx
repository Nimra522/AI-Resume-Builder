import React from 'react';
import { ResumeData } from '../../types';

const YellowHeaderMinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="w-full bg-white text-black font-['Inter',sans-serif] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* Yellow Header */}
      <div className="bg-[#F5C518] px-8 pt-6 pb-5">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[44px] font-bold text-black leading-tight">
              {personalInfo.fullName || 'Full Name'}
            </h1>
            <p className="text-[16px] font-normal text-black mt-1">
              {personalInfo.jobTitle || 'Job Title'}
            </p>
          </div>
          <div className="text-right text-[13px] text-black leading-relaxed flex-shrink-0">
            {personalInfo.phone && <p dir="ltr">{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
            {personalInfo.website && <p className="break-all">{personalInfo.website}</p>}
            {personalInfo.linkedin && <p className="break-all">{personalInfo.linkedin}</p>}
            {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
          </div>
        </div>
      </div>

      {/* About Me */}
      {personalInfo.summary && (
        <div className="px-8 pt-5 pb-3">
          <h2 className="text-[14px] font-bold text-black uppercase tracking-[0.04em]">About Me</h2>
          <div className="h-px bg-black mt-1 mb-2" />
          <p className="text-[13px] text-black leading-[1.7] whitespace-pre-wrap">{personalInfo.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <div className="px-8 pt-3 pb-3">
          <h2 className="text-[14px] font-bold text-black uppercase tracking-[0.04em]">Work Experience</h2>
          <div className="h-px bg-black mt-1 mb-3" />
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-4">
                  <p className="text-[14px] font-bold text-black">
                    {exp.company}{exp.company && exp.role ? ' — ' : ''}{exp.role}
                  </p>
                  <p className="text-[13px] font-bold text-black flex-shrink-0">
                    {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                {exp.description && (
                  <div className="mt-1">
                    <p className="text-[13px] text-black leading-[1.6]">
                      {exp.description.split('\n')[0]}
                    </p>
                    {exp.description.split('\n').length > 1 && (
                      <ul className="mt-1 space-y-0.5">
                        {exp.description.split('\n').slice(1).filter(Boolean).map((line, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-black leading-[1.6]">
                            <span className="flex-shrink-0 text-black text-[14px] leading-none mt-0.5">&#x2022;</span>
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
        </div>
      )}

      {/* Education & Skills — Light Gray Footer */}
      <div className="bg-[#F0F0F0] mt-4 px-8 py-5 flex">
        {/* Education */}
        {education.length > 0 && (
          <div className="flex-1 pr-6 relative">
            <div className="absolute right-0 top-0 bottom-0 w-px bg-black" />
            <h2 className="text-[14px] font-bold text-black uppercase tracking-[0.04em] mb-3">Education</h2>

            {/* Horizontal timeline with dots */}
            <div className="relative">
              <div className="absolute top-[7px] left-[8px] right-[8px] h-px bg-black" />
              <div className="flex justify-between relative">
                {education.map((edu) => (
                  <div key={edu.id} className="flex flex-col items-center text-center flex-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-black z-10 mb-2" />
                    <p className="text-[12px] font-bold text-black">{edu.graduationDate || 'Date'}</p>
                    <p className="text-[12px] font-bold text-black mt-1">{edu.school}</p>
                    {edu.degree && (
                      <p className="text-[11px] text-black mt-0.5">{edu.degree}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex-1 pl-6">
            <h2 className="text-[14px] font-bold text-black uppercase tracking-[0.04em] mb-3">Skills</h2>
            <ul className="space-y-0.5">
              {skills.map((s, i) => (
                <li key={i} className="text-[13px] text-black leading-[1.6] list-disc list-inside">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(YellowHeaderMinimalTemplate);
