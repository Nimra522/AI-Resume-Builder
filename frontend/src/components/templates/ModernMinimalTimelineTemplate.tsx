import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Phone, Mail, Globe, Linkedin } from 'lucide-react';

interface ModernMinimalTimelineProps {
  data: ResumeData;
}

const ModernMinimalTimelineComponent: React.FC<ModernMinimalTimelineProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  const contactItems = [
    { icon: MapPin, value: personalInfo.location },
    { icon: Phone, value: personalInfo.phone },
    { icon: Mail, value: personalInfo.email },
    { icon: Globe, value: personalInfo.website },
    { icon: Linkedin, value: personalInfo.linkedin },
  ].filter(item => item.value);

  return (
    <div className="w-full min-h-[1122px] bg-white text-[#111111] p-12 font-['Inter','Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-[58px] font-bold text-[#111111] leading-[0.95] tracking-tight mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl text-[#555555] font-medium">
          {personalInfo.jobTitle || 'Professional Title'}
        </p>
      </header>

      {/* Summary + Timeline line */}
      {personalInfo.summary && (
        <div className="flex gap-5 mb-0">
          <div className="w-px bg-black flex-shrink-0" />
          <div className="pb-8">
            <h2 className="text-[22px] font-bold uppercase tracking-wider text-[#111111] mb-3">Summary</h2>
            <p className="text-[11px] text-[#555555] leading-relaxed whitespace-pre-wrap">{personalInfo.summary}</p>
          </div>
        </div>
      )}

      {/* Contact Bar */}
      {contactItems.length > 0 && (
        <div className="bg-[#EFEFEF] py-3 px-5 mb-8">
          <div className="flex justify-center gap-6 md:gap-10 text-[11px] text-[#555555] flex-wrap">
            {contactItems.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <item.icon size={13} className="text-black flex-shrink-0" />
                {item.value}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education (with timeline line) */}
      {education.length > 0 && (
        <div className="flex gap-5 mb-8">
          <div className="w-px bg-black flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h2 className="text-[22px] font-bold uppercase tracking-wider text-[#111111] mb-5">Education</h2>
            <div className={`grid ${education.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-x-8 gap-y-5`}>
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-sm font-bold text-[#111111]">{edu.degree}</p>
                  <p className="text-[11px] text-[#555555] mt-0.5">{edu.school}</p>
                  {edu.graduationDate && <p className="text-[10px] text-[#999999] mt-0.5">{edu.graduationDate}</p>}
                  {edu.description && <p className="text-[11px] text-[#555555] mt-1 leading-relaxed">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Two-column Main Content */}
      <div className="flex gap-10">
        {/* Left Column (65%) */}
        <div className="w-[65%] space-y-8">
          {experience.length > 0 && (
            <section>
              <h2 className="text-[22px] font-bold uppercase tracking-wider text-[#111111] mb-5">Work Experience</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline gap-4">
                      <p className="text-sm font-bold text-[#111111]">{exp.role}</p>
                      <p className="text-[11px] text-[#555555] flex-shrink-0">
                        {exp.startDate}{exp.startDate && (exp.current || exp.endDate) ? '\u2013' : ''}{exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    <p className="text-[11px] text-[#555555] mt-0.5">{exp.company}</p>
                    {exp.description && (
                      <p className="text-[11px] text-[#555555] mt-2 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-[22px] font-bold uppercase tracking-wider text-[#111111] mb-5">Projects</h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <p className="text-sm font-bold text-[#111111]">
                      {proj.name}
                      {proj.link && <span className="text-[11px] font-normal text-[#555555] ml-2">| {proj.link}</span>}
                    </p>
                    <p className="text-[11px] text-[#555555] mt-1 leading-relaxed">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <p className="text-[10px] text-[#999999] mt-0.5">{proj.technologies.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (35%) */}
        <div className="w-[35%] space-y-8">
          {skills.length > 0 && (
            <section>
              <h2 className="text-[22px] font-bold uppercase tracking-wider text-[#111111] mb-4">Skills</h2>
              <div className="space-y-1">
                {skills.map((s, i) => (
                  <p key={i} className="text-[11px] text-[#555555] pl-3 relative before:absolute before:left-0 before:top-0 before:text-[11px] before:text-[#555555] before:content-['\\2022']">
                    {s}
                  </p>
                ))}
              </div>
            </section>
          )}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-[22px] font-bold uppercase tracking-wider text-[#111111] mb-4">Certifications</h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-sm font-bold text-[#111111]">{cert.name}</p>
                    <p className="text-[11px] text-[#555555]">{cert.issuer}</p>
                    {cert.date && <p className="text-[10px] text-[#999999]">{cert.date}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}


        </div>
      </div>
    </div>
  );
};

export default React.memo(ModernMinimalTimelineComponent);
