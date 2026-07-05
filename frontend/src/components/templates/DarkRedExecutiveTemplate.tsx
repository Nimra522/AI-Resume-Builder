import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

const DarkRedExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full bg-white text-[#1F2937] font-['Inter',sans-serif] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* Top accent bar */}
      <div className="h-[3px] bg-[#8C1D18]" />

      <div className="px-8 pt-8 pb-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-[44px] font-bold text-[#1F2937] leading-tight tracking-[-0.01em]">
              {personalInfo.fullName || 'Full Name'}
            </h1>
            <p className="text-[18px] text-[#8C1D18] font-medium mt-1">
              {personalInfo.jobTitle || 'Professional Title'}
            </p>
          </div>
          <div className="text-right text-[13px] text-[#6B7280] space-y-1.5 flex-shrink-0 ml-4">
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5 justify-end">
                <Phone size={11} className="text-[#8C1D18]" />
                <span dir="ltr">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-1.5 justify-end">
                <Mail size={11} className="text-[#8C1D18]" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1.5 justify-end">
                <MapPin size={11} className="text-[#8C1D18]" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1.5 justify-end">
                <Linkedin size={11} className="text-[#8C1D18]" />
                <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        <div className="h-px bg-[#E5E7EB] mb-6" />

        {/* Two-Column Layout */}
        <div className="flex gap-8">
          {/* Left Column — 65% */}
          <div className="flex-1 space-y-7">

            {/* Profile */}
            {personalInfo.summary && (
              <div>
                <h2 className="text-[20px] font-bold text-[#1F2937] tracking-[-0.01em]">Profile</h2>
                <div className="w-8 h-[2px] bg-[#8C1D18] mt-2 mb-3" />
                <p className="text-[14px] text-[#6B7280] leading-[1.8] whitespace-pre-wrap">{personalInfo.summary}</p>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div>
                <h2 className="text-[20px] font-bold text-[#1F2937] tracking-[-0.01em]">Experience</h2>
                <div className="w-8 h-[2px] bg-[#8C1D18] mt-2 mb-4" />
                <div className="space-y-5">
                  {experience.map((exp, idx) => (
                    <div key={exp.id} className="relative pl-5 border-l-2 border-[#E5E7EB]">
                      <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#8C1D18] border-2 border-white" />
                      <div className="flex justify-between items-baseline">
                        <p className="text-[15px] font-bold text-[#1F2937]">{exp.role}</p>
                        <p className="text-[13px] text-[#6B7280] whitespace-nowrap ml-2 flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                      </div>
                      <p className="text-[14px] text-[#8C1D18] font-medium mt-0.5">{exp.company}</p>
                      {exp.description && <p className="text-[14px] text-[#6B7280] mt-1.5 leading-[1.7] whitespace-pre-wrap">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-[20px] font-bold text-[#1F2937] tracking-[-0.01em]">Education</h2>
                <div className="w-8 h-[2px] bg-[#8C1D18] mt-2 mb-4" />
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="relative pl-5 border-l-2 border-[#E5E7EB]">
                      <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#8C1D18] border-2 border-white" />
                      <p className="text-[15px] font-bold text-[#1F2937]">{edu.degree}</p>
                      <p className="text-[14px] text-[#6B7280] mt-0.5">{edu.school} <span className="text-[#8C1D18]">·</span> {edu.graduationDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <div>
                <h2 className="text-[20px] font-bold text-[#1F2937] tracking-[-0.01em]">Projects</h2>
                <div className="w-8 h-[2px] bg-[#8C1D18] mt-2 mb-4" />
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div key={proj.id} className="border border-[#E5E7EB] rounded-lg p-4">
                      <p className="text-[15px] font-bold text-[#1F2937]">{proj.name}</p>
                      {proj.description && <p className="text-[14px] text-[#6B7280] mt-1 leading-[1.7]">{proj.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column — 35% */}
          <div className="w-[35%] flex-shrink-0 space-y-6">

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-[20px] font-bold text-[#1F2937] tracking-[-0.01em]">Skills</h2>
                <div className="w-8 h-[2px] bg-[#8C1D18] mt-2 mb-3" />
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span key={i} className="inline-block px-3 py-1.5 rounded-md border border-[#E5E7EB] bg-[#FAFAFA] text-[#6B7280] text-[13px] leading-relaxed">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-[20px] font-bold text-[#1F2937] tracking-[-0.01em]">Certifications</h2>
                <div className="w-8 h-[2px] bg-[#8C1D18] mt-2 mb-3" />
                <div className="space-y-2">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <p className="text-[14px] font-medium text-[#1F2937]">{c.name}</p>
                      <p className="text-[13px] text-[#6B7280]">{c.issuer}{c.date ? ` · ${c.date}` : ''}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DarkRedExecutiveTemplate);
