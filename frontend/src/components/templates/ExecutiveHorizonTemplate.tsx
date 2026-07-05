import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, User, Linkedin } from 'lucide-react';

const ExecutiveHorizonComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-white text-[#1F2937] font-['Inter',sans-serif] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      <div className="h-[3px] bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#2563EB]" />

      <div className="flex min-h-[1116px]">
        {/* Left Sidebar — #F8FAFC */}
        <div className="w-[32%] flex-shrink-0 bg-[#F8FAFC] pt-8 pb-8 px-6 flex flex-col items-start">
          <div className="w-[100px] h-[100px] rounded-xl overflow-hidden border-2 border-[#E5E7EB] bg-white flex items-center justify-center mb-5 shadow-sm">
            {personalInfo.photoUrl ? (
              <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <User size={36} className="text-[#2563EB]" />
            )}
          </div>

          <h1 className="text-[34px] font-bold text-[#1F2937] leading-tight tracking-[-0.01em]">
            {personalInfo.fullName || 'Full Name'}
          </h1>
          <p className="text-[18px] text-[#2563EB] uppercase tracking-[0.15em] font-medium mt-1.5">
            {personalInfo.jobTitle || 'Executive'}
          </p>

          <div className="w-10 h-[2px] bg-[#2563EB] my-4" />

          {personalInfo.summary && (
            <div className="mb-4">
              <p className="text-[11px] text-[#6B7280] leading-[1.7] whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}

          <div className="w-full border-t border-[#E5E7EB] my-3" />

          <div className="w-full space-y-2.5 text-[11px] text-[#6B7280]">
            {personalInfo.phone && (
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={11} className="text-[#2563EB]" />
                </div>
                <span dir="ltr">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={11} className="text-[#2563EB]" />
                </div>
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={11} className="text-[#2563EB]" />
                </div>
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                  <Linkedin size={11} className="text-[#2563EB]" />
                </div>
                <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-[#E5E7EB]" />

        {/* Right Content */}
        <div className="flex-1 pt-8 pb-8 px-7 space-y-6">

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-[18px] font-bold text-[#1F2937] uppercase tracking-[0.12em]">Experience</h2>
              <div className="w-8 h-[2px] bg-[#2563EB] mt-1.5 mb-4" />
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <p className="text-[15px] font-bold text-[#1F2937]">{exp.role}</p>
                      <p className="text-[11px] text-[#6B7280] whitespace-nowrap ml-2 flex-shrink-0">
                        {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    <p className="text-[13px] text-[#2563EB] font-medium mt-0.5">{exp.company}</p>
                    {exp.description && (
                      <ul className="mt-1.5 space-y-0.5">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px] text-[#6B7280] leading-[1.6]">
                            <span className="text-[#2563EB] mt-0.5 flex-shrink-0">&#x2022;</span>
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

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-[18px] font-bold text-[#1F2937] uppercase tracking-[0.12em]">Education</h2>
              <div className="w-8 h-[2px] bg-[#2563EB] mt-1.5 mb-4" />
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <p className="text-[15px] font-bold text-[#1F2937]">{edu.degree}</p>
                      <p className="text-[13px] text-[#6B7280] mt-0.5">{edu.school}</p>
                    </div>
                    <p className="text-[11px] text-[#6B7280] whitespace-nowrap ml-2 flex-shrink-0">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-[18px] font-bold text-[#1F2937] uppercase tracking-[0.12em]">Skills</h2>
              <div className="w-8 h-[2px] bg-[#2563EB] mt-1.5 mb-4" />
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span key={i} className="inline-block px-3 py-1.5 rounded-md bg-[#2563EB]/10 text-[#2563EB] text-[11px] font-medium">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-[18px] font-bold text-[#1F2937] uppercase tracking-[0.12em]">Certifications</h2>
              <div className="w-8 h-[2px] bg-[#2563EB] mt-1.5 mb-4" />
              <div className="space-y-2">
                {certifications.map((c) => (
                  <div key={c.id} className="flex justify-between items-baseline">
                    <div>
                      <p className="text-[13px] font-medium text-[#1F2937]">{c.name}</p>
                      <p className="text-[11px] text-[#6B7280]">{c.issuer}</p>
                    </div>
                    <p className="text-[11px] text-[#6B7280] whitespace-nowrap ml-2 flex-shrink-0">{c.date || ''}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-[18px] font-bold text-[#1F2937] uppercase tracking-[0.12em]">Projects</h2>
              <div className="w-8 h-[2px] bg-[#2563EB] mt-1.5 mb-4" />
              <div className="space-y-2">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <p className="text-[13px] font-medium text-[#1F2937]">{proj.name}</p>
                    {proj.description && <p className="text-[11px] text-[#6B7280] mt-0.5 leading-[1.6]">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-[3px] bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#2563EB]" />
    </div>
  );
};

export default React.memo(ExecutiveHorizonComponent);
