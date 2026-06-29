import React from 'react';
import { ResumeData } from '../../types';
import { Phone, MapPin, Mail, Globe } from 'lucide-react';

interface EditorialExecutiveProps {
  data: ResumeData;
}

const EditorialExecutiveComponent: React.FC<EditorialExecutiveProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  const contactItems = [
    { icon: Phone, value: personalInfo.phone, key: 'phone' },
    { icon: MapPin, value: personalInfo.location, key: 'location' },
    { icon: Mail, value: personalInfo.email, key: 'email' },
    { icon: Globe, value: personalInfo.website, key: 'website' },
  ].filter(item => item.value);

  return (
    <div className="w-full min-h-[1122px] bg-white text-[#111111] p-12 font-['Inter','Helvetica',sans-serif]">
      {/* Header: Name left, Title right */}
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-[52px] font-extrabold text-[#111111] leading-[0.95] tracking-tight max-w-[60%]">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-lg uppercase tracking-[0.25em] text-[#555555] text-right">
            {personalInfo.jobTitle}
          </p>
        )}
      </div>

      {/* Contact row with circular icons on divider line */}
      {contactItems.length > 0 && (
        <div className="relative py-4 mb-1">
          <div className="absolute inset-x-0 top-1/2 h-px bg-black -translate-y-1/2" />
          <div className="relative flex justify-center gap-0">
            {contactItems.map((item, i) => (
              <div key={item.key} className="flex items-center">
                {i > 0 && <div className="w-6 md:w-10 h-px bg-black" />}
                <div className="flex items-center gap-2 px-3 bg-white z-10">
                  <div className="w-[18px] h-[18px] rounded-full border border-black flex items-center justify-center flex-shrink-0">
                    <item.icon size={10} className="text-black" />
                  </div>
                  <span className="text-[11px] text-[#555555] whitespace-nowrap">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Thin horizontal divider */}
      <div className="w-full h-px bg-black mb-8" />

      {/* Profile Section */}
      {personalInfo.summary && (
        <>
          <section className="mb-8">
            <h2 className="text-[22px] font-bold uppercase tracking-wider text-[#111111] mb-3">Profile</h2>
            <p className="text-[11px] text-[#555555] leading-relaxed whitespace-pre-wrap">{personalInfo.summary}</p>
          </section>
          <div className="w-full h-px bg-black mb-8" />
        </>
      )}

      {/* Two-column layout */}
      <div className="flex gap-10">
        {/* Left Column (65%) - Experience, Projects */}
        <div className="w-[65%] space-y-8">
          {experience.length > 0 && (
            <section>
              <h2 className="text-[22px] font-bold uppercase tracking-wider text-[#111111] mb-5">Experience</h2>
              <div className="space-y-7">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <p className="text-sm font-bold text-[#111111]">{exp.role}</p>
                    <p className="text-[11px] text-[#555555] mt-0.5">
                      {exp.company}{exp.company && (exp.startDate || exp.endDate || exp.current) ? ' | ' : ''}
                      {exp.startDate}{exp.startDate && (exp.current || exp.endDate) ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && (
                      <div className="mt-2 space-y-1">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <p key={i} className="text-[11px] text-[#555555] leading-relaxed pl-3 relative before:absolute before:left-0 before:top-0 before:text-[11px] before:text-[#555555] before:content-['\\2022']">
                            {line}
                          </p>
                        ))}
                      </div>
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
                      {proj.link && (
                        <span className="text-[11px] font-normal text-[#555555] ml-2">| {proj.link}</span>
                      )}
                    </p>
                    <p className="text-[11px] text-[#555555] mt-1 leading-relaxed">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <p className="text-[10px] text-[#777777] mt-0.5">{proj.technologies.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (35%) - Education, Skills, Certifications */}
        <div className="w-[35%] space-y-8">
          {education.length > 0 && (
            <section>
              <h2 className="text-[22px] font-bold uppercase tracking-wider text-[#111111] mb-5">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold text-[#111111]">{edu.degree}</p>
                    <p className="text-[11px] text-[#555555]">{edu.school}</p>
                    {edu.graduationDate && <p className="text-[10px] text-[#777777]">{edu.graduationDate}</p>}
                    {edu.description && <p className="text-[11px] text-[#555555] mt-1 leading-relaxed">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

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
              <div className="space-y-1">
                {certifications.map((cert) => (
                  <p key={cert.id} className="text-[11px] text-[#555555] pl-3 relative before:absolute before:left-0 before:top-0 before:text-[11px] before:text-[#555555] before:content-['\\2022']">
                    {cert.name}{cert.issuer ? <span className="text-[#777777]"> — {cert.issuer}</span> : ''}
                  </p>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default React.memo(EditorialExecutiveComponent);
