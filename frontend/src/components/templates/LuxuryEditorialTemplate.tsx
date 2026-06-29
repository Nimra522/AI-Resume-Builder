import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, Globe, MapPin, Linkedin, User, Briefcase, GraduationCap, Star } from 'lucide-react';

interface LuxuryEditorialProps {
  data: ResumeData;
}

const LuxuryEditorialComponent: React.FC<LuxuryEditorialProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  const contactItems = [
    { icon: Phone, value: personalInfo.phone },
    { icon: Mail, value: personalInfo.email },
    { icon: Globe, value: personalInfo.website },
    { icon: MapPin, value: personalInfo.location },
    { icon: Linkedin, value: personalInfo.linkedin },
  ].filter(item => item.value);

  return (
    <div className="w-full min-h-[1122px] bg-white text-[#222222] font-['Poppins','Inter',sans-serif] flex">
      {/* Left Sidebar */}
      <div className="w-[34%] flex flex-col">
        {/* Brown top section with profile photo */}
        <div className="bg-[#A86A34] pt-8 pb-12 flex justify-center">
          {personalInfo.photoUrl ? (
            <div className="w-32 h-36 rounded-[20px] overflow-hidden border-4 border-white shadow-lg">
              <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-32 h-36 rounded-[20px] bg-white/20 flex items-center justify-center border-4 border-white shadow-lg">
              <User size={40} className="text-white/60" />
            </div>
          )}
        </div>

        {/* White sidebar content */}
        <div className="bg-white p-6 space-y-6 flex-1">
          {contactItems.length > 0 && (
            <section>
              <h2 className="text-[18px] font-bold uppercase tracking-wider text-[#A86A34] mb-3">Contact</h2>
              <div className="space-y-2.5">
                {contactItems.map((item, i) => (
                  <p key={i} className="text-[11px] text-[#666666] flex items-center gap-2">
                    <item.icon size={14} className="text-[#666666] flex-shrink-0" />
                    <span className="break-all">{item.value}</span>
                  </p>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-[18px] font-bold uppercase tracking-wider text-[#A86A34] mb-3">Education</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold text-[#222222]">{edu.degree}</p>
                    <p className="text-[11px] text-[#666666]">{edu.school}</p>
                    {edu.graduationDate && <p className="text-[10px] text-[#999999]">{edu.graduationDate}</p>}
                    {edu.description && <p className="text-[11px] text-[#666666] mt-0.5 leading-relaxed">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-[18px] font-bold uppercase tracking-wider text-[#A86A34] mb-3">Expertise</h2>
              <div className="space-y-1">
                {skills.map((s, i) => (
                  <p key={i} className="text-[11px] text-[#666666] pl-3 relative before:absolute before:left-0 before:top-0 before:text-[11px] before:text-[#A86A34] before:content-['\\2022']">
                    {s}
                  </p>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>

      {/* Right Content */}
      <div className="w-[66%] p-8 space-y-7">
        {/* Header */}
        <header className="mb-2">
          <h1 className="text-[52px] font-extrabold text-[#A86A34] leading-[0.95] tracking-tight mb-1">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-lg text-[#666666] font-medium">
            {personalInfo.jobTitle || 'Professional Title'}
          </p>
        </header>

        {/* Profile */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-[18px] font-bold uppercase tracking-wider text-[#222222] mb-3 flex items-center gap-2">
              <User size={16} className="text-[#666666]" /> Profile
            </h2>
            <p className="text-[11px] text-[#666666] leading-relaxed whitespace-pre-wrap">{personalInfo.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-[18px] font-bold uppercase tracking-wider text-[#222222] mb-4 flex items-center gap-2">
              <Briefcase size={16} className="text-[#666666]" /> Work Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="flex gap-4">
                  {/* Dates column */}
                  <div className="w-24 flex-shrink-0 pt-0.5">
                    <p className="text-[10px] text-[#A86A34] font-medium">
                      {exp.startDate}{exp.startDate && (exp.current || exp.endDate) ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  {/* Timeline divider */}
                  <div className="w-px bg-[#A86A34] flex-shrink-0" />
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#222222]">{exp.role}</p>
                    <p className="text-[11px] text-[#A86A34] font-medium">{exp.company}</p>
                    {exp.description && (
                      <div className="mt-1.5 space-y-0.5">
                        {exp.description.split('\n').filter(Boolean).map((line, li) => (
                          <p key={li} className="text-[11px] text-[#666666] leading-relaxed pl-3 relative before:absolute before:left-0 before:top-0 before:text-[11px] before:text-[#A86A34] before:content-['\\2022']">
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-[18px] font-bold uppercase tracking-wider text-[#222222] mb-3 flex items-center gap-2">
              <Star size={16} className="text-[#666666]" /> Projects
            </h2>
            <div className="space-y-3">
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
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-[18px] font-bold uppercase tracking-wider text-[#222222] mb-3 flex items-center gap-2">
              <GraduationCap size={16} className="text-[#666666]" /> Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-sm font-bold text-[#222222]">{cert.name}</p>
                  <p className="text-[11px] text-[#666666]">{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default React.memo(LuxuryEditorialComponent);
