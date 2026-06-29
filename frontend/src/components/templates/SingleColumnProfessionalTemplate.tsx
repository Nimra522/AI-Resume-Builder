import React from 'react';
import { ResumeData } from '../../types';

interface SingleColumnProfessionalProps {
  data: ResumeData;
}

const SingleColumnProfessionalComponent: React.FC<SingleColumnProfessionalProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  const contactItems = [
    personalInfo.phone,
    personalInfo.email,
    personalInfo.website,
    personalInfo.location,
  ].filter(Boolean);

  const columns = (() => {
    const cols: string[][] = [[], [], []];
    skills.forEach((s, i) => cols[i % 3].push(s));
    return cols;
  })();

  const hasThreeColSections = certifications.length > 0;

  return (
    <div className="w-full min-h-[1122px] bg-white text-[#333333] p-12 font-['Inter','Open_Sans',sans-serif]">
      <header className="text-center pt-8 pb-10">
        <h1 className="text-[42px] font-light text-[#333333] mb-2 leading-tight tracking-tight">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-[#666666] mb-6">
          {personalInfo.jobTitle || 'Professional Title'}
        </p>
        {contactItems.length > 0 && (
          <div className="flex justify-center gap-0 text-xs text-[#666666] flex-wrap">
            {contactItems.map((item, i) => (
              <span key={i}>
                {i > 0 && <span className="mx-2">|</span>}
                {item}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="max-w-[700px] mx-auto space-y-10">
        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider text-[#333333] mb-5">Skills</h2>
            <div className="grid grid-cols-3 gap-x-6 gap-y-1">
              {columns.map((col, ci) => (
                <div key={ci} className="space-y-1">
                  {col.map((s, i) => (
                    <p key={i} className="text-xs text-[#666666] leading-relaxed pl-3 relative before:absolute before:left-0 before:top-[2px] before:text-xs before:text-[#666666] before:content-['\\2022']">
                      {s}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider text-[#333333] mb-5">Work Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <p className="text-sm font-bold text-[#333333]">{exp.role}</p>
                  <p className="text-xs text-[#666666] mt-0.5">
                    {exp.company}{exp.company && (exp.startDate || exp.endDate || exp.current) ? ' | ' : ''}
                    {exp.startDate}{exp.startDate && (exp.current || exp.endDate) ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-xs text-[#666666] mt-2 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {hasThreeColSections && (
          <section>
            <div className="grid grid-cols-3 gap-6">
              {certifications.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-wider text-[#333333] mb-4">Certifications</h2>
                  <div className="space-y-3">
                    {certifications.map((cert) => (
                      <div key={cert.id}>
                        <p className="text-xs font-semibold text-[#333333]">{cert.name}</p>
                        <p className="text-[10px] text-[#666666]">{cert.issuer}</p>
                        {cert.date && <p className="text-[10px] text-[#666666]">{cert.date}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider text-[#333333] mb-5">Education</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-sm font-bold text-[#333333]">{edu.degree}</p>
                  <p className="text-xs text-[#666666]">{edu.school}</p>
                  {edu.graduationDate && <p className="text-[10px] text-[#999999]">{edu.graduationDate}</p>}
                  {edu.description && <p className="text-xs text-[#666666] mt-1 leading-relaxed">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider text-[#333333] mb-5">Projects</h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p className="text-sm font-bold text-[#333333]">
                    {proj.name}
                    {proj.link && (
                      <span className="text-xs font-normal text-[#666666] ml-2">
                        | {proj.link}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[#666666] mt-1 leading-relaxed">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[10px] text-[#999999] mt-0.5">{proj.technologies.join(', ')}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default React.memo(SingleColumnProfessionalComponent);
