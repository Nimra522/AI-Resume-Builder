import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe, User, Star } from 'lucide-react';

interface IsabelMercadoProps {
  data: ResumeData;
}

const StarRating: React.FC<{ level: number }> = ({ level }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={10}
        className={i <= level ? 'text-amber-600 fill-amber-600' : 'text-gray-300'}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

const parseSkillLevel = (skill: string): { name: string; level: number } => {
  const colonIdx = skill.lastIndexOf(':');
  if (colonIdx > 0) {
    const num = parseInt(skill.slice(colonIdx + 1), 10);
    if (num >= 1 && num <= 5) {
      return { name: skill.slice(0, colonIdx).trim(), level: num };
    }
  }
  return { name: skill, level: 5 };
};

const IsabelMercadoComponent: React.FC<IsabelMercadoProps> = ({ data }) => {
  const { personalInfo, education, experience, skills } = data;

  const hasContact = personalInfo.phone || personalInfo.email || personalInfo.location || personalInfo.website;
  const hasSkills = skills.length > 0;
  const hasSummary = personalInfo.summary;
  const hasEducation = education.length > 0;
  const hasExperience = experience.length > 0;

  return (
    <div className="w-full h-full min-h-[1000px] bg-[#FDFBF7] text-gray-800 shadow-xl relative overflow-hidden">
      {/* Abstract Overlapping Circles - Top Right */}
      <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none opacity-60">
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <circle cx="220" cy="80" r="120" fill="#8B6F5C" opacity="0.08" />
          <circle cx="160" cy="40" r="90" fill="#6B5B4E" opacity="0.06" />
          <circle cx="260" cy="180" r="80" fill="#A0897A" opacity="0.05" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 px-8 pt-8 pb-6">
        <div className="flex items-start gap-6">
          {/* Profile Photo - custom shape */}
          <div
            className="w-24 h-28 bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-300 flex items-center justify-center"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)',
              borderRadius: '0 20px 0 0',
            }}
          >
            {personalInfo.photoUrl ? (
              <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <h1 className="text-2xl font-bold text-[#2C2C2C] uppercase tracking-[0.12em] leading-tight">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <div className="mt-2 w-16 h-[3px] bg-[#8B6F5C]" />
            <p className="mt-2 text-[11px] font-medium text-[#8B6F5C] uppercase tracking-[0.25em]">
              {personalInfo.jobTitle || 'Your Job Title'}
            </p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex relative z-10">
        {/* Left Column */}
        <div className="w-[33%] bg-[#F8F5F0] p-6 space-y-5 min-h-[600px]">
          {/* About Me */}
          {hasSummary && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6F5C] mb-2.5">
                About Me
              </h3>
              <p className="text-[11px] leading-relaxed text-gray-600 whitespace-pre-wrap">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Skills */}
          {hasSkills && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6F5C] mb-2.5">
                Skills
              </h3>
              <div className="space-y-2.5">
                {skills.map((skill, i) => {
                  const { name, level } = parseSkillLevel(skill);
                  return (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-[11px] text-gray-700">{name}</span>
                      <StarRating level={level} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Contact */}
          {hasContact && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6F5C] mb-2.5">
                Contact
              </h3>
              <div className="space-y-2.5">
                {personalInfo.phone && (
                  <div className="flex items-center gap-2.5 text-[10px] text-gray-600">
                    <div className="w-4 flex justify-center flex-shrink-0">
                      <Phone size={11} className="text-[#8B6F5C]" />
                    </div>
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-2.5 text-[10px] text-gray-600">
                    <div className="w-4 flex justify-center flex-shrink-0">
                      <Mail size={11} className="text-[#8B6F5C]" />
                    </div>
                    <span className="break-all">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2.5 text-[10px] text-gray-600">
                    <div className="w-4 flex justify-center flex-shrink-0">
                      <MapPin size={11} className="text-[#8B6F5C]" />
                    </div>
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-2.5 text-[10px] text-gray-600">
                    <div className="w-4 flex justify-center flex-shrink-0">
                      <Globe size={11} className="text-[#8B6F5C]" />
                    </div>
                    <span className="break-all">{personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-[67%] p-6 space-y-6 min-h-[600px]">
          {/* Education */}
          {hasEducation && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6F5C] mb-3">
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-bold text-[#2C2C2C]">{edu.school || 'School Name'}</p>
                      {edu.graduationDate && (
                        <span className="text-[9px] text-gray-400 flex-shrink-0 ml-2 mt-0.5">{edu.graduationDate}</span>
                      )}
                    </div>
                    {edu.degree && (
                      <p className="text-[11px] text-gray-500 mt-0.5">{edu.degree}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {hasExperience && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6F5C] mb-3">
                Experience Work
              </h3>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-0.5">
                      <p className="text-sm font-bold text-[#2C2C2C]">{exp.role || 'Job Title'}</p>
                      <span className="text-[9px] text-gray-400 flex-shrink-0 ml-2 mt-0.5">
                        {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium mb-1">{exp.company || 'Company Name'}</p>
                    <p className="text-[11px] leading-relaxed text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(IsabelMercadoComponent);
