import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe, Linkedin, User } from 'lucide-react';

interface AnaishaProps {
  data: ResumeData;
}

const SectionHeading: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-3 mb-4">
    <h3 className="text-[14px] font-extrabold text-[#1a2332] uppercase tracking-[0.1em] whitespace-nowrap">{text}</h3>
    <div className="flex-1 h-px bg-black/20" />
  </div>
);

const SplitEntry: React.FC<{
  leftTop: string; leftBottom?: string; rightTop: string; rightBottom?: string;
}> = ({ leftTop, leftBottom, rightTop, rightBottom }) => (
  <div className="flex gap-4 mb-3.5">
    <div className="w-[110px] flex-shrink-0">
      <p className="text-[13px] font-semibold text-gray-700 leading-tight">{leftTop}</p>
      {leftBottom && <p className="text-[13px] text-gray-500 mt-0.5">{leftBottom}</p>}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[13px] font-bold text-[#1a2332]">{rightTop}</p>
      {rightBottom && <p className="text-[13px] text-gray-600 mt-0.5 leading-relaxed whitespace-pre-wrap">{rightBottom}</p>}
    </div>
  </div>
);

const AnaishaComponent: React.FC<AnaishaProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;

  const nameParts = personalInfo.fullName
    ? personalInfo.fullName.trim().split(/\s+/)
    : ['ANAISHA', 'PARVATI'];
  const row1 = nameParts.slice(0, Math.ceil(nameParts.length / 2)).join(' ');
  const row2 = nameParts.slice(Math.ceil(nameParts.length / 2)).join(' ');

  return (
    <div className="w-full min-h-[1122px] bg-white text-black font-['Inter',sans-serif] shadow-xl mx-auto" style={{ maxWidth: '793px' }}>
      {/* Header Block - Light Gray */}
      <div className="bg-[#F0F2F5] px-8 pt-7 pb-6">
        <div className="flex items-center gap-6">
          {/* Left: Name */}
          <div className="flex-1">
            <h1 className="text-[26px] font-bold text-[#1a2332] leading-tight tracking-[0.04em]">
              {row1 && <span className="block">{row1}</span>}
              {row2 && <span className="block">{row2}</span>}
            </h1>
            <p className="text-[13px] font-semibold text-gray-600 uppercase tracking-[0.18em] mt-1.5">{personalInfo.jobTitle || 'JOB TITLE'}</p>
          </div>

          {/* Center: Profile Photo */}
          <div className="w-[85px] h-[85px] rounded-full overflow-hidden flex-shrink-0 bg-gray-200 flex items-center justify-center">
            {personalInfo.photoUrl ? (
              <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <User size={32} className="text-gray-400" />
            )}
          </div>

          {/* Right: Contact */}
          <div className="text-right text-[13px] text-gray-700 space-y-1.5 flex-shrink-0">
            {personalInfo.phone && <div className="flex items-center gap-1.5 justify-end"><span>{personalInfo.phone}</span><Phone size={10} className="text-gray-500 flex-shrink-0" /></div>}
            {personalInfo.email && <div className="flex items-center gap-1.5 justify-end"><span className="break-all">{personalInfo.email}</span><Mail size={10} className="text-gray-500 flex-shrink-0" /></div>}
            {personalInfo.location && <div className="flex items-center gap-1.5 justify-end"><span>{personalInfo.location}</span><MapPin size={10} className="text-gray-500 flex-shrink-0" /></div>}
            {personalInfo.website && <div className="flex items-center gap-1.5 justify-end"><span className="break-all">{personalInfo.website}</span><Globe size={10} className="text-gray-500 flex-shrink-0" /></div>}
            {personalInfo.linkedin && <div className="flex items-center gap-1.5 justify-end"><span className="break-all">{personalInfo.linkedin}</span><Linkedin size={10} className="text-gray-500 flex-shrink-0" /></div>}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="px-8 py-5">

        {/* About Me */}
        {personalInfo.summary && (
          <div className="mb-5">
            <SectionHeading text="ABOUT ME" />
            <p className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap">{personalInfo.summary}</p>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-5">
            <SectionHeading text="EDUCATION" />
            {education.map((edu) => (
              <SplitEntry
                key={edu.id}
                leftTop={edu.graduationDate || 'Year'}
                leftBottom={edu.school || 'Institution'}
                rightTop={edu.degree || 'Degree'}
                rightBottom={edu.description}
              />
            ))}
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-5">
            <SectionHeading text="EXPERIENCE" />
            {experience.map((exp) => (
              <SplitEntry
                key={exp.id}
                leftTop={`${exp.startDate || ''}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.current ? 'Present' : exp.endDate || ''}`}
                leftBottom={exp.company}
                rightTop={exp.role || 'Job Title'}
                rightBottom={exp.description}
              />
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-5">
            <SectionHeading text="SKILLS" />
            <div className="grid grid-cols-3 gap-x-4">
              {skills.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-gray-700 mb-1">
                  <span className="w-1 h-1 rounded-full bg-gray-500 flex-shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-5">
            <SectionHeading text="PROJECTS" />
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <p className="text-[13px] font-bold text-[#1a2332]">{proj.name}</p>
                {proj.description && <p className="text-[13px] text-gray-600 mt-0.5 leading-relaxed">{proj.description}</p>}
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="text-[13px] text-gray-500 mt-0.5">{proj.technologies.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-5">
            <SectionHeading text="CERTIFICATIONS" />
            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-[13px] font-bold text-[#1a2332]">{cert.name}</p>
                  <p className="text-[13px] text-gray-600">{cert.issuer}</p>
                  {cert.date && <p className="text-[13px] text-gray-500 mt-0.5">{cert.date}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default React.memo(AnaishaComponent);
