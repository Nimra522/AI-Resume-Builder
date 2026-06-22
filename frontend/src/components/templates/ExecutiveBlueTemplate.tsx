import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, User } from 'lucide-react';

interface ExecutiveBlueProps {
  data: ResumeData;
}

const NavyCircleIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-6 h-6 rounded-full bg-[#1B2A4A] flex items-center justify-center flex-shrink-0">
    <div className="text-white">{children}</div>
  </div>
);

const ExecutiveBlueComponent: React.FC<ExecutiveBlueProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, certifications } = data;

  const hasContact = personalInfo.phone || personalInfo.email || personalInfo.location;
  const hasSkills = skills.length > 0;
  const hasSummary = personalInfo.summary;
  const hasEducation = education.length > 0;
  const hasExperience = experience.length > 0;
  const hasLanguages = certifications.length > 0;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-800 shadow-xl flex flex-col">
      {/* Header - Full width navy block */}
      <div className="w-full bg-[#1B2A4A] px-8 pt-6 pb-7 relative">
        <div className="flex items-center gap-5">
          {/* Square Profile Photo - overlaps header and sidebar */}
          <div className="w-[88px] h-[88px] bg-gray-300 overflow-hidden border-2 border-white shadow-md flex-shrink-0 flex items-center justify-center relative z-10 -mb-[-32px]">
            {personalInfo.photoUrl ? (
              <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="flex-1 min-w-0 pt-2">
            <h1 className="font-serif font-bold text-2xl text-white leading-tight">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <p className="font-sans text-[12px] text-white/80 mt-1 tracking-wide">
              {personalInfo.jobTitle || 'Your Job Title'}
            </p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-1">
        {/* Left Column - Light Blue-Grey */}
        <div className="w-[32%] bg-[#EDF2F7] p-6 space-y-5 flex flex-col">
          {/* About Me */}
          {hasSummary && (
            <div>
              <h3 className="font-serif font-bold text-[12px] text-[#1B2A4A] uppercase tracking-wider mb-2">
                About me
              </h3>
              <p className="font-sans text-[11px] leading-relaxed text-gray-700 whitespace-pre-wrap">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Contact */}
          {hasContact && (
            <div>
              <h3 className="font-serif font-bold text-[12px] text-[#1B2A4A] uppercase tracking-wider mb-2">
                Contact
              </h3>
              <div className="space-y-2.5">
                {personalInfo.phone && (
                  <div className="flex items-center gap-2.5">
                    <NavyCircleIcon><Phone size={12} /></NavyCircleIcon>
                    <span className="font-sans text-[10px] text-gray-700">{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-2.5">
                    <NavyCircleIcon><Mail size={12} /></NavyCircleIcon>
                    <span className="font-sans text-[10px] text-gray-700 break-all">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2.5">
                    <NavyCircleIcon><MapPin size={12} /></NavyCircleIcon>
                    <span className="font-sans text-[10px] text-gray-700">{personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* More information */}
          {personalInfo.website && (
            <div>
              <h3 className="font-serif font-bold text-[12px] text-[#1B2A4A] uppercase tracking-wider mb-2">
                More information
              </h3>
              <ul className="space-y-1">
                {personalInfo.website.split('\n').filter(Boolean).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-[11px] text-gray-700">
                    <span className="text-gray-500">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column - White */}
        <div className="w-[68%] p-6 space-y-5 flex flex-col">
          {/* Work Experience */}
          {hasExperience && (
            <div>
              <h3 className="font-serif font-bold text-[12px] text-[#1B2A4A] uppercase tracking-wider mb-3">
                Work experience
              </h3>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <p className="font-sans font-bold text-[11px] text-[#1B2A4A]">
                      {exp.role || 'Job Title'}
                    </p>
                    <p className="font-sans text-[10px] text-gray-500 mt-0.5">
                      {exp.company || 'Company Name'}
                      {exp.company && (exp.startDate || exp.endDate) ? ' | ' : ''}
                      {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </p>
                    <ul className="mt-1 space-y-0.5">
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i} className="flex items-start gap-2 font-sans text-[10px] text-gray-700">
                          <span className="text-gray-500 mt-0.5">-</span>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Academic Data */}
          {hasEducation && (
            <div>
              <h3 className="font-serif font-bold text-[12px] text-[#1B2A4A] uppercase tracking-wider mb-3">
                Academic data
              </h3>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-sans font-bold text-[11px] text-[#1B2A4A]">
                      {edu.school || 'School Name'}
                    </p>
                    <p className="font-sans text-[10px] text-gray-500 mt-0.5">
                      {edu.degree || ''}
                      {edu.degree && edu.graduationDate ? ' | ' : ''}
                      {edu.graduationDate || ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Split: Skills | Languages */}
          {(hasSkills || hasLanguages) && (
            <div className="flex gap-6 mt-auto pt-4">
              {/* Skills */}
              {hasSkills && (
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-[12px] text-[#1B2A4A] uppercase tracking-wider mb-2">
                    Skills
                  </h3>
                  <p className="font-sans text-[10px] text-gray-700 leading-relaxed">
                    {skills.join(', ')}
                  </p>
                </div>
              )}

              {/* Languages */}
              {hasLanguages && (
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-[12px] text-[#1B2A4A] uppercase tracking-wider mb-2">
                    Languages
                  </h3>
                  <div className="space-y-2">
                    {certifications.map((lang) => (
                      <div key={lang.id}>
                        <p className="font-sans font-bold text-[10px] text-[#1B2A4A]">
                          {lang.name}
                        </p>
                        <p className="font-sans text-[9px] text-gray-600">
                          {lang.issuer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExecutiveBlueComponent);
