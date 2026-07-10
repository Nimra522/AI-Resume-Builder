import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe, Linkedin } from 'lucide-react';

interface MinimalGridProps {
  data: ResumeData;
}

const MinimalGridComponent: React.FC<MinimalGridProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  const contactItems = [
    { icon: Phone, value: personalInfo.phone },
    { icon: Mail, value: personalInfo.email },
    { icon: MapPin, value: personalInfo.location },
    { icon: Globe, value: personalInfo.website },
    { icon: Linkedin, value: personalInfo.linkedin },
  ].filter(item => item.value);

  return (
    <div className="w-full min-h-[1122px] bg-white p-3 font-['Inter','Lato',sans-serif]">
      <div className="border border-[#D9D9D9] h-full">
        {/* Header */}
        <header className="text-center pt-10 pb-6 px-8">
          <h1 className="text-[52px] font-extrabold text-[#222222] leading-[0.95] tracking-tight mb-2">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-lg text-[#666666] font-medium">
            {personalInfo.jobTitle || 'Professional Title'}
          </p>
        </header>

        {/* Divider below header */}
        <div className="h-px bg-[#D9D9D9] mx-8" />

        {/* Two-column layout */}
        <div className="flex min-h-[600px]">
          {/* Left Column (38%) */}
          <div className="w-[38%] border-r border-[#D9D9D9] p-6 space-y-7">
            {education.length > 0 && (
              <section>
                <h2 className="text-[20px] font-bold uppercase tracking-[0.15em] text-[#222222] mb-4">Education</h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <p className="text-sm font-bold text-[#222222]">{edu.degree}</p>
                      <p className="text-[11px] text-[#666666] mt-0.5">{edu.school}</p>
                      {edu.graduationDate && <p className="text-[10px] text-[#999999] mt-0.5">{edu.graduationDate}</p>}
                      {edu.description && <p className="text-[11px] text-[#666666] mt-1 leading-relaxed">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {skills.length > 0 && (
              <section>
                <h2 className="text-[20px] font-bold uppercase tracking-[0.15em] text-[#222222] mb-4">Skills</h2>
                <div className="space-y-2">
                  {skills.map((s, i) => (
                    <p key={i} className="text-[11px] text-[#666666] flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border border-[#333333] flex items-center justify-center flex-shrink-0">
                        <span className="text-[8px] text-[#333333]">&#10003;</span>
                      </span>
                      {s}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {contactItems.length > 0 && (
              <section>
                <h2 className="text-[20px] font-bold uppercase tracking-[0.15em] text-[#222222] mb-4">Contact</h2>
                <div className="space-y-2.5">
                  {contactItems.map((item, i) => (
                    <p key={i} className="text-[11px] text-[#666666] flex items-center gap-2">
                      <item.icon size={13} className="text-[#333333] flex-shrink-0" />
                      <span>{item.value}</span>
                    </p>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column (62%) */}
          <div className="w-[62%] p-6 space-y-7">
            {experience.length > 0 && (
              <section>
                <h2 className="text-[20px] font-bold uppercase tracking-[0.15em] text-[#222222] mb-4">Work Experience</h2>
                <div className="space-y-5">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <p className="text-sm font-bold text-[#222222]">{exp.role}</p>
                      <p className="text-[11px] text-[#666666] mt-0.5">{exp.company}</p>
                      <p className="text-[10px] text-[#999999] mt-0.5">
                        {exp.startDate}{exp.startDate && (exp.current || exp.endDate) ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </p>
                      {exp.description && (
                        <p className="text-[11px] text-[#666666] mt-2 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects && projects.length > 0 && (
              <section>
                <h2 className="text-[20px] font-bold uppercase tracking-[0.15em] text-[#222222] mb-4">Projects</h2>
                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <p className="text-sm font-bold text-[#222222]">
                        {proj.name}
                        {proj.link && <span className="text-[11px] font-normal text-[#666666] ml-2">| {proj.link}</span>}
                      </p>
                      <p className="text-[11px] text-[#666666] mt-1 leading-relaxed">{proj.description}</p>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <p className="text-[10px] text-[#999999] mt-0.5">{proj.technologies.join(', ')}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications.length > 0 && (
              <section>
                <h2 className="text-[20px] font-bold uppercase tracking-[0.15em] text-[#222222] mb-4">Certification</h2>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <p className="text-sm font-bold text-[#222222]">{cert.name}</p>
                      <p className="text-[11px] text-[#666666]">{cert.issuer}</p>
                      {cert.date && <p className="text-[10px] text-[#999999]">{cert.date}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MinimalGridComponent);
