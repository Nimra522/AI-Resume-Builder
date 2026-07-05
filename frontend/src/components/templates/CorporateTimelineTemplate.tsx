import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, Globe, MapPin, Linkedin } from 'lucide-react';

const CorporateTimelineTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications } = data;

  return (
    <div className="w-full bg-white text-[#222222] font-['Inter',sans-serif] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* Header */}
      <div className="px-8 pt-8 pb-0">
        <h1 className="text-[38px] font-bold text-[#222222] uppercase tracking-[0.15em] leading-tight">
          {personalInfo.fullName || 'FULL NAME'}
        </h1>
        <p className="text-[20px] text-[#666666] font-medium tracking-[0.08em] mt-2">
          {personalInfo.jobTitle || 'Job Title'}
        </p>
        <div className="w-full h-[3px] bg-black mt-5 mb-6" />
      </div>

      {/* Career Summary */}
      {personalInfo.summary && (
        <div className="px-8 mb-5">
          <h2 className="text-[20px] font-medium text-[#222222] uppercase tracking-[0.12em] mb-2">Career Summary</h2>
          <p className="text-[14px] text-[#666666] leading-[1.8] text-justify whitespace-pre-wrap">{personalInfo.summary}</p>
        </div>
      )}

      {/* Two-Column Body */}
      <div className="flex px-8 gap-8">
        {/* Left Column — 36% */}
        <div className="w-[36%] flex-shrink-0 space-y-5">

          {/* Contact */}
          <div>
            <h2 className="text-[20px] font-medium text-[#222222] uppercase tracking-[0.12em] mb-3">Contact</h2>
            <div className="space-y-2.5 text-[14px] text-[#666666]">
              {personalInfo.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="text-[#222222] flex-shrink-0" />
                  <span dir="ltr">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2.5">
                  <Mail size={14} className="text-[#222222] flex-shrink-0" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2.5">
                  <Globe size={14} className="text-[#222222] flex-shrink-0" />
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2.5">
                  <Linkedin size={14} className="text-[#222222] flex-shrink-0" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2.5">
                  <MapPin size={14} className="text-[#222222] flex-shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-[20px] font-medium text-[#222222] uppercase tracking-[0.12em] mb-3">Education</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[16px] font-medium text-[#222222]">{edu.degree}</p>
                    <p className="text-[14px] text-[#666666] mt-0.5">{edu.school}</p>
                    <p className="text-[14px] text-[#666666] mt-0.5">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-[20px] font-medium text-[#222222] uppercase tracking-[0.12em] mb-3">Skills</h2>
              <ul className="space-y-1">
                {skills.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] text-[#666666] leading-[1.6]">
                    <span className="text-[#222222] flex-shrink-0 text-[18px] leading-none mt-[-1px]">&#x2022;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-[#E5E7EB] flex-shrink-0" />

        {/* Right Column — 64% */}
        <div className="flex-1 space-y-5">

          {/* Work Experience — Timeline */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-[20px] font-medium text-[#222222] uppercase tracking-[0.12em] mb-3">Work Experience</h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="relative pl-6">
                    {/* Timeline line */}
                    {idx < experience.length - 1 && (
                      <div className="absolute left-[5px] top-[14px] bottom-[-16px] w-px bg-[#333333]" />
                    )}
                    {/* Circle marker */}
                    <div className="absolute left-0 top-[5px] w-[11px] h-[11px] rounded-full border-2 border-[#333333] bg-white" />
                    <div>
                      <p className="text-[16px] font-medium text-[#222222]">{exp.role}</p>
                      <p className="text-[14px] text-[#666666]">{exp.company}</p>
                      <p className="text-[14px] text-[#666666] mt-0.5">
                        {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </p>
                      {exp.description && (
                        <ul className="mt-1.5 space-y-0.5">
                          {exp.description.split('\n').filter(Boolean).map((line, i) => (
                            <li key={i} className="flex items-start gap-2 text-[14px] text-[#666666] leading-[1.6]">
                              <span className="text-[#222222] flex-shrink-0 text-[18px] leading-none mt-[-1px]">&#x2022;</span>
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reference — using certifications data */}
          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-[20px] font-medium text-[#222222] uppercase tracking-[0.12em] mb-3">Reference</h2>
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((ref) => (
                  <div key={ref.id}>
                    <p className="text-[16px] font-medium text-[#222222]">{ref.name}</p>
                    <p className="text-[14px] text-[#666666]">{ref.issuer}</p>
                    <p className="text-[14px] text-[#666666]">{personalInfo.phone}</p>
                    <p className="text-[14px] text-[#666666] break-all">{personalInfo.email}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(CorporateTimelineTemplate);
