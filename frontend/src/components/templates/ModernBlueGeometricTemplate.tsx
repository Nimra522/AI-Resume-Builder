import React from 'react';
import { ResumeData } from '../../types';
import { User } from 'lucide-react';

interface ModernBlueGeometricProps {
  data: ResumeData;
}

const SemiCircleProgress: React.FC<{ level: number }> = ({ level }) => {
  const r = 13;
  const circumference = Math.PI * r;
  const offset = circumference - (Math.min(100, Math.max(0, level)) / 100) * circumference;
  return (
    <svg width="32" height="18" viewBox="0 0 32 18" className="flex-shrink-0">
      <path d="M 3 17 A 13 13 0 0 1 29 17" fill="none" stroke="#e5e7eb" strokeWidth="4" strokeLinecap="round" />
      <path d="M 3 17 A 13 13 0 0 1 29 17" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"
        strokeDasharray={circumference} strokeDashoffset={offset} />
    </svg>
  );
};

const parseSkillLevel = (skill: string): { name: string; level: number } => {
  const colonIdx = skill.lastIndexOf(':');
  if (colonIdx > 0) {
    const num = parseInt(skill.slice(colonIdx + 1), 10);
    if (num >= 1 && num <= 100) return { name: skill.slice(0, colonIdx).trim(), level: num };
  }
  return { name: skill, level: 70 };
};

const GeometricCorner: React.FC<{ position: 'tr' | 'bl' }> = ({ position }) => {
  const isTR = position === 'tr';
  return (
    <svg
      className={`absolute ${isTR ? 'top-0 right-0' : 'bottom-0 left-0'} pointer-events-none`}
      width="100" height="100" viewBox="0 0 100 100"
    >
      <path
        d={isTR
          ? 'M 100 0 L 100 60 Q 100 100 60 100 L 0 100'
          : 'M 0 100 L 0 40 Q 0 0 40 0 L 100 0'}
        fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.25"
      />
      <path
        d={isTR
          ? 'M 100 0 L 100 40 Q 100 80 60 80 L 0 80'
          : 'M 0 100 L 0 60 Q 0 20 40 20 L 100 20'}
        fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.15"
      />
    </svg>
  );
};

const ModernBlueGeometricComponent: React.FC<ModernBlueGeometricProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const hasContact = personalInfo.phone || personalInfo.email || personalInfo.location || personalInfo.linkedin;
  const hasSkills = skills.length > 0;
  const hasSummary = personalInfo.summary;
  const hasEducation = education.length > 0;
  const hasExperience = experience.length > 0;
  const hasCertifications = certifications.length > 0;
  const hasAddInfo = projects.length > 0;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-800 shadow-xl relative overflow-hidden">
      <GeometricCorner position="tr" />
      <GeometricCorner position="bl" />

      <div className="flex relative z-10">
        {/* Left Panel */}
        <div className="w-[30%] bg-gray-50 p-5 flex flex-col items-center space-y-4 min-h-[1000px]">
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border-4 border-white shadow-md">
            {data.personalInfo.photoUrl ? (
              <img src={data.personalInfo.photoUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="text-gray-400" />
            )}
          </div>

          <div className="text-center w-full">
            <h1 className="text-xl font-bold text-gray-900 leading-tight">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-[12px] text-[#3B82F6] font-medium mt-0.5">{personalInfo.jobTitle || 'Your Job Title'}</p>
          </div>

          {hasContact && (
            <div className="w-full space-y-1.5">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-black border-b border-gray-200 pb-1">Contact</h3>
              <div className="text-[11px] text-gray-700 space-y-1">
                {personalInfo.phone && <p><span className="text-[#3B82F6] font-medium">P:</span> {personalInfo.phone}</p>}
                {personalInfo.email && <p className="break-all"><span className="text-[#3B82F6] font-medium">E:</span> {personalInfo.email}</p>}
                {personalInfo.location && <p><span className="text-[#3B82F6] font-medium">L:</span> {personalInfo.location}</p>}
                {personalInfo.linkedin && <p className="break-all"><span className="text-[#3B82F6] font-medium">In:</span> {personalInfo.linkedin}</p>}
              </div>
            </div>
          )}

          {hasCertifications && (
            <div className="w-full space-y-1.5">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-black border-b border-gray-200 pb-1">Certifications</h3>
              <div className="space-y-0.5 text-[11px] text-gray-700">
                {certifications.map((c) => (
                  <div key={c.id} className="flex justify-between">
                    <span>{c.name}</span>
                    <span className="text-gray-500">{c.issuer}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex-1 p-5 space-y-4">
          {/* About Me */}
          {hasSummary && (
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-black mb-1.5">About Me</h3>
              <div className="w-8 h-[2px] bg-[#3B82F6] mb-2" />
              <p className="text-[12px] leading-relaxed text-gray-600 whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {hasExperience && (
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-black mb-1.5">Work Experience</h3>
              <div className="w-8 h-[2px] bg-[#3B82F6] mb-2" />
              <div className="space-y-2.5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <p className="text-[15px] font-bold text-gray-900">{exp.role}</p>
                      <span className="text-[13px] text-gray-400 flex-shrink-0 ml-2">{exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium">{exp.company}</p>
                    <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {hasEducation && (
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-black mb-1.5">Education</h3>
              <div className="w-8 h-[2px] bg-[#3B82F6] mb-2" />
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <p className="text-[15px] font-bold text-gray-900">{edu.school}</p>
                      <span className="text-[13px] text-gray-400 flex-shrink-0 ml-2">{edu.graduationDate}</span>
                    </div>
                    <p className="text-[11px] text-gray-500">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {hasSkills && (
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-black mb-1.5">Skills</h3>
              <div className="w-8 h-[2px] bg-[#3B82F6] mb-2" />
              <div className="space-y-1.5">
                {skills.map((skill, i) => {
                  const { name, level } = parseSkillLevel(skill);
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[11px] text-gray-700 flex-1">{name}</span>
                      <SemiCircleProgress level={level} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Additional Information */}
          {hasAddInfo && (
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-black mb-1.5">Additional Information</h3>
              <div className="w-8 h-[2px] bg-[#3B82F6] mb-2" />
              <ul className="space-y-0.5 text-[11px] text-gray-700">
                {projects.map((p) => (
                  <li key={p.id} className="flex items-start gap-2">
                    <span className="text-[#3B82F6] mt-0.5">&#x2022;</span>
                    <span><strong>{p.name}</strong>{p.description ? `: ${p.description}` : ''}</span>
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

export default React.memo(ModernBlueGeometricComponent);
