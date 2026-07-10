import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, Globe, MapPin, Linkedin, User, Award } from 'lucide-react';

interface SectionTitleProps {
  text: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ text }) => (
  <div className="flex items-center gap-3 mb-4">
    <h3 className="text-[18px] font-bold text-[#222222] uppercase tracking-[0.12em]">{text}</h3>
    <div className="flex-1 h-px bg-[#DDDDDD]" />
  </div>
);

const LornaComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-[#222222] font-['Inter',sans-serif] shadow-xl mx-auto overflow-hidden">
      <div className="pt-8 pb-0 text-center px-8">
        <h1 className="text-[56px] font-bold text-[#222222] leading-[1.05] tracking-[-0.02em] font-['Playfair_Display',Georgia,serif]">
          {personalInfo.fullName?.toUpperCase() || 'FULL NAME'}
        </h1>
        <p className="text-[18px] text-[#555555] uppercase tracking-[0.25em] mt-2 font-medium">
          {personalInfo.jobTitle || 'PROFESSIONAL TITLE'}
        </p>
      </div>

      <div className="flex justify-center mt-8 mb-8 px-8">
        {(personalInfo.phone || personalInfo.email || personalInfo.website || personalInfo.location || personalInfo.linkedin) && (
          <div className="w-full bg-[#F5F5F5] rounded-xl p-[18px]">
            <div className="flex justify-between gap-4">
              {personalInfo.email && (
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center flex-shrink-0">
                    <Mail size={14} className="text-[#A07B53]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-[#555555] uppercase tracking-[0.1em] font-medium">Email</p>
                    <p className="text-[12px] text-[#222222] mt-0.5 truncate">{personalInfo.email}</p>
                  </div>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center flex-shrink-0">
                    <Phone size={14} className="text-[#A07B53]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-[#555555] uppercase tracking-[0.1em] font-medium">Phone</p>
                    <p className="text-[12px] text-[#222222] mt-0.5 truncate">{personalInfo.phone}</p>
                  </div>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-[#A07B53]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-[#555555] uppercase tracking-[0.1em] font-medium">Location</p>
                    <p className="text-[12px] text-[#222222] mt-0.5 truncate">{personalInfo.location}</p>
                  </div>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center flex-shrink-0">
                    <Globe size={14} className="text-[#A07B53]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-[#555555] uppercase tracking-[0.1em] font-medium">Website</p>
                    <p className="text-[12px] text-[#222222] mt-0.5 truncate">{personalInfo.website}</p>
                  </div>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center flex-shrink-0">
                    <Linkedin size={14} className="text-[#A07B53]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-[#555555] uppercase tracking-[0.1em] font-medium">LinkedIn</p>
                    <p className="text-[12px] text-[#222222] mt-0.5 truncate">{personalInfo.linkedin}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-8 px-8 pb-8">
        <div className="w-[35%] flex-shrink-0 space-y-7">
          {personalInfo.summary && (
            <div>
              <SectionTitle text="About Me" />
              <p className="text-[14px] text-[#555555] leading-[1.8] whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <SectionTitle text="Skills" />
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span key={i} className="inline-block px-4 py-2 rounded-lg border border-[#E8E8E8] bg-[#F9F9F9] text-[#555555] text-[12px] leading-relaxed">{s}</span>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <SectionTitle text="Certifications" />
              <div className="space-y-3">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[14px] text-[#222222] font-medium">{c.name}</span>
                      <span className="text-[12px] text-[#555555]">{c.issuer}</span>
                    </div>
                    <div className="w-full h-[6px] bg-[#F0F0F0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#A07B53] rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <SectionTitle text="Achievements" />
              <div className="space-y-3">
                {projects.map((p) => (
                  <div key={p.id} className="flex items-start gap-3 bg-white border border-[#E8E8E8] rounded-lg p-[14px] shadow-sm">
                    <div className="w-7 h-7 rounded-full bg-[#F5F0EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Award size={13} className="text-[#A07B53]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#222222]">{p.name}</p>
                      {p.description && <p className="text-[12px] text-[#555555] mt-0.5">{p.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-7">
          {experience.length > 0 && (
            <div>
              <SectionTitle text="Experience" />
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-[#E8E8E8]">
                    <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[#A07B53] border-2 border-white" />
                    <div className="bg-white border border-[#E8E8E8] rounded-lg p-[18px] shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[17px] font-semibold text-[#222222]">{exp.role}</p>
                          <p className="text-[14px] text-[#555555] mt-0.5">{exp.company}</p>
                        </div>
                        <p className="text-[12px] text-[#555555] whitespace-nowrap ml-2 flex-shrink-0">{exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                      </div>
                      {exp.description && <p className="text-[14px] text-[#555555] mt-3 leading-[1.7]">{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <SectionTitle text="Education" />
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white border border-[#E8E8E8] rounded-lg p-[18px] shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[17px] font-semibold text-[#222222]">{edu.degree}</p>
                        <p className="text-[14px] text-[#555555] mt-0.5">{edu.school}</p>
                      </div>
                      <p className="text-[12px] text-[#555555] whitespace-nowrap ml-2 flex-shrink-0">{edu.graduationDate}</p>
                    </div>
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

export default React.memo(LornaComponent);
