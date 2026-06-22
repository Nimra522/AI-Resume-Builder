import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin } from 'lucide-react';

interface RetroContourProps {
  data: ResumeData;
}

const SevenPetalFlower: React.FC = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="3" fill="#C8674F" />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => {
      const angle = (i * 2 * Math.PI) / 7 - Math.PI / 2;
      const cx = 18 + 10 * Math.cos(angle);
      const cy = 18 + 10 * Math.sin(angle);
      return (
        <circle key={i} cx={cx} cy={cy} r="6.5" fill="none" stroke="#C8674F" strokeWidth="1.8" opacity="0.9" />
      );
    })}
  </svg>
);

const CircleDot: React.FC = () => (
  <div className="w-[7px] h-[7px] rounded-full bg-[#3D2B1F] flex-shrink-0 mt-[5px]" />
);

const RetroContourComponent: React.FC<RetroContourProps> = ({ data }) => {
  const { personalInfo, education, experience, skills } = data;

  const hasContact = personalInfo.phone || personalInfo.email || personalInfo.location;
  const hasSkills = skills.length > 0;
  const hasSummary = personalInfo.summary;
  const hasEducation = education.length > 0;
  const hasExperience = experience.length > 0;

  const leftHasContent = hasSkills || hasSummary;

  return (
    <div className="w-full h-full min-h-[1000px] bg-[#FDF8F3] text-[#3D2B1F] shadow-xl relative overflow-hidden p-7">
      {/* Header Section */}
      <div className="relative mb-8">
        {/* Flower + Photo positioned on the left, overlapping the pill */}
        <div className="flex items-center relative z-10">
          {/* Flower and Photo group */}
          <div className="flex-shrink-0 flex items-start mr-[-12px] relative">
            {/* Flower badge top-left of photo */}
            <div className="absolute -top-2 -left-2 z-20">
              <SevenPetalFlower />
            </div>
            {/* Circular Profile Photo */}
            <div className="w-[78px] h-[78px] rounded-full bg-gray-200 overflow-hidden border-2 border-[#3D2B1F] flex items-center justify-center relative z-10">
              {personalInfo.photoUrl ? (
                <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
              )}
            </div>
          </div>

          {/* Horizontal Pill Outline Container */}
          <div className="flex-1 border-2 border-[#3D2B1F] rounded-full py-4 pl-16 pr-8 min-h-[78px] flex flex-col justify-center">
            <h1 className="font-serif italic font-bold text-xl text-[#3D2B1F] leading-tight">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            {hasContact && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                {personalInfo.phone && (
                  <div className="flex items-center gap-1.5">
                    <CircleDot />
                    <span className="text-[10px] text-[#3D2B1F]">{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-1.5">
                    <CircleDot />
                    <span className="text-[10px] text-[#3D2B1F] break-all">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-1.5">
                    <CircleDot />
                    <span className="text-[10px] text-[#3D2B1F]">{personalInfo.location}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6">
        {/* Left Column - Vertical Pill Outline */}
        {leftHasContent && (
          <div className="w-[32%] flex-shrink-0">
            <div className="border-2 border-[#3D2B1F] rounded-[40px] p-5 space-y-5 h-full">
              {/* Skills */}
              {hasSkills && (
                <div>
                  <h3 className="font-sans font-bold uppercase text-[10px] tracking-[0.15em] text-[#3D2B1F] mb-2">
                    Skills
                  </h3>
                  <ul className="space-y-1">
                    {skills.map((skill, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-[#3D2B1F]">
                        <span className="text-[#C8674F] mt-0.5 text-[8px]">&#x25C9;</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* About Me */}
              {hasSummary && (
                <div>
                  <h3 className="font-sans font-bold uppercase text-[10px] tracking-[0.15em] text-[#3D2B1F] mb-2">
                    About Me
                  </h3>
                  <ul className="space-y-1">
                    {personalInfo.summary.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-[#3D2B1F]">
                        <span className="text-[#C8674F] mt-0.5 text-[8px]">&#x25C9;</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Right Column */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Work Experience */}
          {hasExperience && (
            <div>
              <h3 className="font-serif italic text-sm text-[#C8674F] mb-3">
                Mes expériences
              </h3>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <p className="font-sans font-bold text-[12px] text-[#3D2B1F] uppercase">
                        {exp.role || 'Job Title'}&nbsp;
                        <span className="font-sans font-bold text-[12px] text-[#3D2B1F] not-italic normal-case">
                          {exp.company || 'Company Name'}
                        </span>
                      </p>
                      <span className="text-[10px] text-[#3D2B1F] flex-shrink-0 ml-2 mt-0.5">
                        {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <ul className="mt-1 space-y-0.5">
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-[#3D2B1F]">
                          <span className="text-[#3D2B1F] mt-[5px] text-[6px]">&#x25CF;</span>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {hasEducation && (
            <div>
              <h3 className="font-serif italic text-sm text-[#C8674F] mb-3">
                Mes formations
              </h3>
              <ul className="space-y-1">
                {education.map((edu) => (
                  <li key={edu.id} className="flex items-start gap-2 text-[11px] text-[#3D2B1F]">
                    <span className="text-[#3D2B1F] mt-[5px] text-[6px]">&#x25CF;</span>
                    {[edu.degree, edu.school, edu.graduationDate].filter(Boolean).join(' — ')}
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

export default React.memo(RetroContourComponent);
