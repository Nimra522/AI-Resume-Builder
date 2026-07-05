import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, Globe, MapPin, Linkedin } from 'lucide-react';

const OrangeAccentTimelineTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  const languages = certifications || [];
  const references = projects || [];

  return (
    <div className="w-full bg-white text-[#111111] font-['Inter',sans-serif] shadow-xl mx-auto overflow-hidden" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* Two-column top */}
      <div className="flex min-h-[300px]">
        {/* LEFT — Name + Title */}
        <div className="flex-1 px-8 pt-8">
          <h1 className="text-[58px] font-extrabold text-[#111111] uppercase leading-[1.05] tracking-[0.06em]">
            {personalInfo.fullName || 'Full Name'}
          </h1>
          <p className="text-[22px] font-medium text-[#111111] mt-2 tracking-[0.08em] uppercase">
            {personalInfo.jobTitle || 'Job Title'}
          </p>
          <div className="mt-4 h-px bg-[#222222]" />
        </div>

        {/* RIGHT — Photo + Orange bar + Contact */}
        <div className="w-[38%] flex-shrink-0 bg-white pt-8 pb-0 relative">
          {/* Orange accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F4B544]" />

          <div className="pl-5 pr-6">
            {/* Photo */}
            {personalInfo.photoUrl && (
              <div className="mb-5">
                <img src={personalInfo.photoUrl} alt="Profile" className="w-[180px] h-[180px] rounded-full object-cover mx-auto" />
              </div>
            )}

            {/* Contact Panel */}
            <div className="space-y-0">
              {personalInfo.phone && (
                <>
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-[28px] h-[28px] border border-[#222222] flex items-center justify-center flex-shrink-0">
                      <Phone size={13} className="text-[#111111]" />
                    </div>
                    <span className="text-[14px] text-[#555555]" dir="ltr">{personalInfo.phone}</span>
                  </div>
                  <div className="h-px bg-[#222222]" />
                </>
              )}
              {personalInfo.email && (
                <>
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-[28px] h-[28px] border border-[#222222] flex items-center justify-center flex-shrink-0">
                      <Mail size={13} className="text-[#111111]" />
                    </div>
                    <span className="text-[14px] text-[#555555] break-all">{personalInfo.email}</span>
                  </div>
                  <div className="h-px bg-[#222222]" />
                </>
              )}
              {personalInfo.website && (
                <>
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-[28px] h-[28px] border border-[#222222] flex items-center justify-center flex-shrink-0">
                      <Globe size={13} className="text-[#111111]" />
                    </div>
                    <span className="text-[14px] text-[#555555] break-all">{personalInfo.website}</span>
                  </div>
                  <div className="h-px bg-[#222222]" />
                </>
              )}
              {personalInfo.linkedin && (
                <>
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-[28px] h-[28px] border border-[#222222] flex items-center justify-center flex-shrink-0">
                      <Linkedin size={13} className="text-[#111111]" />
                    </div>
                    <span className="text-[14px] text-[#555555] break-all">{personalInfo.linkedin}</span>
                  </div>
                  <div className="h-px bg-[#222222]" />
                </>
              )}
              {personalInfo.location && (
                <>
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-[28px] h-[28px] border border-[#222222] flex items-center justify-center flex-shrink-0">
                      <MapPin size={13} className="text-[#111111]" />
                    </div>
                    <span className="text-[14px] text-[#555555]">{personalInfo.location}</span>
                  </div>
                  <div className="h-px bg-[#222222]" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex px-8 pt-6 pb-8 gap-8">
        {/* LEFT COLUMN — ~62% */}
        <div className="flex-1 space-y-6">

          {/* About Me */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-[20px] font-bold text-[#111111] mb-2">About Me</h2>
              <p className="text-[14px] text-[#555555] leading-[1.8] text-justify whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-[20px] font-bold text-[#111111] mb-3">Experience</h2>
              <div className="space-y-5">
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="relative pl-7">
                    <div className="absolute left-[6px] top-[6px] w-[11px] h-[11px] rounded-full border-2 border-[#444444] bg-white z-10" />
                    {idx < experience.length - 1 && (
                      <div className="absolute left-[11px] top-[16px] bottom-[-22px] w-px bg-[#444444]" />
                    )}
                    <div className="flex justify-between items-baseline gap-2">
                      <p className="text-[18px] font-bold text-[#111111]">{exp.role}</p>
                      <p className="text-[14px] text-[#555555] flex-shrink-0">
                        {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    <p className="text-[14px] text-[#555555]">
                      {exp.company}{exp.company && exp.location ? ' | ' : ''}{exp.location}
                    </p>
                    {exp.description && (
                      <ul className="mt-1.5 space-y-0.5">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i} className="flex items-start gap-2 text-[14px] text-[#555555] leading-[1.6]">
                            <span className="flex-shrink-0 text-[#111111] text-[16px] leading-none mt-0.5">&#x2022;</span>
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

          {/* References */}
          {references.length > 0 && (
            <div>
              <h2 className="text-[20px] font-bold text-[#111111] mb-3">References</h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {references.map((ref) => (
                  <div key={ref.id}>
                    <p className="text-[16px] font-bold text-[#111111]">{ref.name}</p>
                    <p className="text-[14px] text-[#555555]">{ref.description || ref.name}</p>
                    <p className="text-[14px] text-[#555555] mt-0.5">{personalInfo.phone}</p>
                    <p className="text-[14px] text-[#555555] break-all">{personalInfo.email}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — ~38% */}
        <div className="w-[38%] flex-shrink-0 space-y-6">

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-[20px] font-bold text-[#111111] mb-3">Education</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[15px] font-bold text-[#111111]">{edu.degree}</p>
                    <p className="text-[14px] text-[#555555]">{edu.school}</p>
                    <p className="text-[14px] text-[#555555]">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-[20px] font-bold text-[#111111] mb-3">Skills</h2>
              <div className="space-y-3">
                {skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[14px] text-[#111111] font-medium">{skill}</span>
                    </div>
                    <div className="h-[6px] bg-[#D8D8D8] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#222222] rounded-full"
                        style={{ width: `${Math.min(100, 60 + (i * 5) % 35)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-[20px] font-bold text-[#111111] mb-3">Languages</h2>
              <ul className="space-y-0.5">
                {languages.map((lang) => (
                  <li key={lang.id} className="flex items-start gap-2 text-[14px] text-[#555555] leading-[1.6]">
                    <span className="text-[#111111] text-[16px] leading-none mt-0.5">&#x2022;</span>
                    <span>{lang.name}{lang.issuer ? ` (${lang.issuer})` : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(OrangeAccentTimelineTemplate);
