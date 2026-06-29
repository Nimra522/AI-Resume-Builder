import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe, Linkedin, User } from 'lucide-react';

interface PremiumExecutiveMinimalProps {
  data: ResumeData;
}

const PremiumExecutiveMinimalComponent: React.FC<PremiumExecutiveMinimalProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  const ACCENT = '#C7AB95';
  const skillColumns = (() => {
    const cols: string[][] = [[], [], []];
    skills.forEach((s, i) => cols[i % 3].push(s));
    return cols;
  })();

  const contactItems = [
    { value: personalInfo.phone },
    { value: personalInfo.email },
    { value: personalInfo.location },
    { value: personalInfo.website },
    { value: personalInfo.linkedin },
  ].filter(item => item.value);

  const SectionDivider = () => <div className="h-px bg-[#D8D8D8] my-6" />;

  return (
    <div className="w-full min-h-[1122px] bg-white text-[#222222] p-10 font-['Inter','Poppins',sans-serif]">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-[56px] font-extrabold leading-[0.9] tracking-tight mb-1" style={{ color: ACCENT }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-lg uppercase tracking-[0.25em] text-[#666666] font-medium">
            {personalInfo.jobTitle || 'Professional Title'}
          </p>
          {/* Contact row */}
          {contactItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-0 mt-3 text-[11px] text-[#666666]">
              {contactItems.map((item, i) => (
                <span key={i} className="flex items-center">
                  {i > 0 && <span className="mx-2 h-3 w-px bg-[#D8D8D8]" />}
                  {item.value}
                </span>
              ))}
            </div>
          )}
        </div>
        {personalInfo.photoUrl ? (
          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 ml-4 shadow-sm">
            <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded bg-[#F5F0EB] flex items-center justify-center flex-shrink-0 ml-4">
            <User size={22} className="text-[#C7AB95]" />
          </div>
        )}
      </div>

      {/* Thick header divider */}
      <div className="h-[3px] mb-6" style={{ backgroundColor: ACCENT }} />

      {/* Summary */}
      {personalInfo.summary && (
        <>
          <div className="flex gap-6">
            <div className="w-[22%] flex-shrink-0">
              <h2 className="text-[18px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>About Me</h2>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-[#666666] leading-relaxed whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          </div>
          <SectionDivider />
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <div className="flex gap-6">
            <div className="w-[22%] flex-shrink-0">
              <h2 className="text-[18px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Education</h2>
            </div>
            <div className="flex-1 min-w-0">
              <div className={`grid ${education.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-x-8 gap-y-4`}>
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold text-[#222222]">{edu.degree}</p>
                    <p className="text-[11px] text-[#666666]">{edu.school}</p>
                    {edu.graduationDate && <p className="text-[10px] text-[#999999]">{edu.graduationDate}</p>}
                    {edu.description && <p className="text-[11px] text-[#666666] mt-0.5 leading-relaxed">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <SectionDivider />
        </>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <>
          <div className="flex gap-6">
            <div className="w-[22%] flex-shrink-0">
              <h2 className="text-[18px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Work Experience</h2>
            </div>
            <div className="flex-1 min-w-0 space-y-5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <p className="text-sm font-bold text-[#222222]">{exp.role}</p>
                    <p className="text-[11px] text-[#999999] flex-shrink-0">
                      {exp.startDate}{exp.startDate && (exp.current || exp.endDate) ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  <p className="text-[11px] text-[#666666] mt-0.5">{exp.company}</p>
                  {exp.description && (
                    <div className="mt-1.5 space-y-0.5">
                      {exp.description.split('\n').filter(Boolean).map((line, li) => (
                        <p key={li} className="text-[11px] text-[#666666] leading-relaxed pl-3 relative before:absolute before:left-0 before:top-0 before:text-[11px] before:text-[#666666] before:content-['\\2022']">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <SectionDivider />
        </>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <>
          <div className="flex gap-6">
            <div className="w-[22%] flex-shrink-0">
              <h2 className="text-[18px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Skills</h2>
            </div>
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                {skillColumns.map((col, ci) => (
                  <div key={ci} className="space-y-1">
                    {col.map((s, i) => (
                      <p key={i} className="text-[11px] text-[#666666] pl-3 relative before:absolute before:left-0 before:top-0 before:text-[11px] before:text-[#666666] before:content-['\\2022']">
                        {s}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <SectionDivider />
        </>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <>
          <div className="flex gap-6">
            <div className="w-[22%] flex-shrink-0">
              <h2 className="text-[18px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Projects</h2>
            </div>
            <div className="flex-1 min-w-0 space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p className="text-sm font-bold text-[#222222]">
                    {proj.name}
                    {proj.link && <span className="text-[11px] font-normal text-[#666666] ml-2">| {proj.link}</span>}
                  </p>
                  <p className="text-[11px] text-[#666666] mt-0.5 leading-relaxed">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[10px] text-[#999999] mt-0.5">{proj.technologies.join(', ')}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <SectionDivider />
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <div className="flex gap-6">
            <div className="w-[22%] flex-shrink-0">
              <h2 className="text-[18px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Certifications</h2>
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-sm font-bold text-[#222222]">{cert.name}</p>
                  <p className="text-[11px] text-[#666666]">{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
          <SectionDivider />
        </>
      )}

      {/* Footer strip */}
      <div className="h-2 w-full rounded" style={{ backgroundColor: '#F5F0EB' }} />
    </div>
  );
};

export default React.memo(PremiumExecutiveMinimalComponent);
