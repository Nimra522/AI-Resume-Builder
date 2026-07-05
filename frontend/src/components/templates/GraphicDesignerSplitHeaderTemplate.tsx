import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

const GraphicDesignerSplitHeaderTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="w-full bg-gray-100 font-['Poppins',sans-serif] shadow-xl mx-auto overflow-hidden relative" style={{ maxWidth: '793px', minHeight: '1122px' }}>
      {/* White card */}
      <div className="bg-white mx-auto overflow-hidden relative" style={{ minHeight: '1122px' }}>
        {/* Two-tone Header */}
        <div className="relative h-[210px] flex">
          <div className="w-1/2 bg-[#566273]" />
          <div className="w-1/2 bg-[#233650]" />
        </div>

        {/* Dark navy footer strip */}
        <div className="absolute bottom-0 left-0 right-0 h-[55px] bg-[#233650]" />

        {/* Profile Photo — centered, overlapping header and content */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[130px] z-10">
          <div className="w-[180px] h-[180px] rounded-full overflow-hidden shadow-lg">
            {personalInfo.photoUrl ? (
              <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="1.5" className="w-16 h-16">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Name + Title */}
        <div className="text-center pt-[100px] pb-0 px-8">
          <h1 className="text-[38px] font-extrabold text-[#233650] uppercase leading-tight tracking-[0.02em]">
            {personalInfo.fullName || 'Full Name'}
          </h1>
          <p className="text-[20px] font-bold text-[#233650] uppercase mt-1 tracking-[0.04em]">
            {personalInfo.jobTitle || 'Job Title'}
          </p>
          <div className="w-[60px] h-px bg-[#233650] mx-auto mt-4" />
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="text-center px-12 pt-4 pb-0">
            <p className="text-[16px] text-[#2f3744] leading-[1.8] max-w-[560px] mx-auto whitespace-pre-wrap">
              {personalInfo.summary}
            </p>
            <div className="w-[60px] h-px bg-[#233650] mx-auto mt-4" />
          </div>
        )}

        {/* Main Content */}
        <div className="flex px-8 pt-5 pb-20 gap-10">
          {/* LEFT — 58% */}
          <div className="flex-1 space-y-5">

            {/* Work Experience */}
            {experience.length > 0 && (
              <div>
                <h2 className="text-[20px] font-bold text-[#233650] mb-3">Work Experience</h2>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <p className="text-[16px] font-semibold text-[#2f3744]">{exp.role}</p>
                      <p className="text-[14px] text-[#2f3744]">
                        {exp.company}{exp.company && (exp.startDate || exp.endDate) ? ' | ' : ''}
                        {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </p>
                      {exp.description && (
                        <ul className="mt-1 space-y-0.5">
                          {exp.description.split('\n').filter(Boolean).map((line, i) => (
                            <li key={i} className="flex items-start gap-2 text-[14px] text-[#2f3744] leading-[1.6]">
                              <span className="flex-shrink-0 text-[#233650] text-[16px] leading-none mt-0.5">&#x2022;</span>
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
          </div>

          {/* RIGHT — 42% */}
          <div className="w-[42%] flex-shrink-0 space-y-5">

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-[20px] font-bold text-[#233650] mb-3">Education</h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <p className="text-[14px] font-bold text-[#2f3744]">{edu.degree}</p>
                      <p className="text-[14px] text-[#2f3744]">{edu.graduationDate}</p>
                      {edu.school && (
                        <ul className="mt-0.5 space-y-0.5">
                          <li className="flex items-start gap-2 text-[14px] text-[#2f3744] leading-[1.6]">
                            <span className="flex-shrink-0 text-[#233650] text-[14px] leading-none mt-0.5">&#x2022;</span>
                            <span>{edu.school}</span>
                          </li>
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expert Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-[20px] font-bold text-[#233650] mb-3">Expert Skills</h2>
                <div className="space-y-3">
                  {skills.map((skill, i) => (
                    <div key={i} className="flex items-center justify-between gap-3">
                      <span className="text-[14px] text-[#2f3744] flex-shrink-0">{skill}</span>
                      <div className="w-[90px] h-[8px] bg-[#D8D8D8] rounded-full overflow-hidden flex-shrink-0">
                        <div
                          className="h-full bg-[#233650] rounded-full"
                          style={{ width: `${Math.min(100, 55 + (i * 6) % 40)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            <div>
              <h2 className="text-[20px] font-bold text-[#233650] mb-3">Contact</h2>
              <div className="space-y-2">
                {personalInfo.phone && (
                  <div className="flex items-center gap-3 text-[14px] text-[#2f3744]">
                    <span className="w-[30px] h-[30px] bg-[#233650] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={14} className="text-white" />
                    </span>
                    <span dir="ltr">{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-3 text-[14px] text-[#2f3744]">
                    <span className="w-[30px] h-[30px] bg-[#233650] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={14} className="text-white" />
                    </span>
                    <span className="break-all">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-3 text-[14px] text-[#2f3744]">
                    <span className="w-[30px] h-[30px] bg-[#233650] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={14} className="text-white" />
                    </span>
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-3 text-[14px] text-[#2f3744]">
                    <span className="w-[30px] h-[30px] bg-[#233650] rounded-full flex items-center justify-center flex-shrink-0">
                      <Linkedin size={14} className="text-white" />
                    </span>
                    <span className="break-all">{personalInfo.linkedin}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GraphicDesignerSplitHeaderTemplate);
