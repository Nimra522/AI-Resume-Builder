import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

interface FreshGraduateModernProps {
  data: ResumeData;
}

const SectionBanner: React.FC<{ title: string }> = ({ title }) => (
  <div
    className="relative bg-[#B07D65] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 w-full"
    style={{
      clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)',
    }}
  >
    {title}
  </div>
);

const FreshGraduateModernComponent: React.FC<FreshGraduateModernProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const hasContact = personalInfo.phone || personalInfo.email || personalInfo.location || personalInfo.linkedin;
  const hasExperience = experience.length > 0;
  const hasEducation = education.length > 0;
  const hasSkills = skills.length > 0;
  const hasSummary = personalInfo.summary;
  const hasProjects = projects && projects.length > 0;
  const hasCertifications = certifications.length > 0;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-700 shadow-xl relative overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="50" r="100" fill="#B07D65" />
          <circle cx="60" cy="160" r="70" fill="#D4A574" />
          <circle cx="190" cy="180" r="50" fill="#E8C9A0" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="160" height="160" rx="40" fill="#B07D65" />
          <circle cx="160" cy="40" r="30" fill="#D4A574" />
        </svg>
      </div>
      <div className="absolute top-1/3 left-1/3 w-32 h-32 opacity-[0.02] pointer-events-none">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,10 90,50 50,90 10,50" fill="#B07D65" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-start gap-6 px-8 pt-8 pb-6 border-b border-gray-200 relative z-10">
        <div className="w-24 h-24 rounded-lg bg-gray-50 flex-shrink-0 overflow-hidden border border-gray-200 flex items-center justify-center">
          {personalInfo.photoUrl ? (
            <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold uppercase tracking-[0.15em] text-gray-900 leading-tight">
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
          <div className="mt-2.5 h-[3px] w-28 bg-[#B07D65]" />
          <p className="mt-2.5 text-xs font-medium text-[#B07D65] uppercase tracking-[0.2em]">
            {personalInfo.jobTitle || 'Your Job Title'}
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex relative z-10">
        {/* Left Sidebar */}
        <div className="w-[30%] bg-[#FAF8F6] p-6 space-y-5 min-h-[500px]">
          {/* Contact */}
          {hasContact && (
            <div>
              <SectionBanner title="Contact" />
              <div className="mt-3 space-y-2.5 text-[11px]">
                {personalInfo.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="w-3.5 flex-shrink-0 flex justify-center">
                      <Phone size={12} className="text-[#B07D65]" />
                    </span>
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="w-3.5 flex-shrink-0 flex justify-center">
                      <Mail size={12} className="text-[#B07D65]" />
                    </span>
                    <span className="break-all">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="w-3.5 flex-shrink-0 flex justify-center">
                      <MapPin size={12} className="text-[#B07D65]" />
                    </span>
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="w-3.5 flex-shrink-0 flex justify-center">
                      <Linkedin size={12} className="text-[#B07D65]" />
                    </span>
                    <span className="break-all">{personalInfo.linkedin}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-[70%] p-6 space-y-5 min-h-[500px]">
          {/* About Me */}
          {hasSummary && (
            <div>
              <SectionBanner title="About Me" />
              <p className="mt-3 text-[11px] leading-relaxed text-gray-600 whitespace-pre-wrap">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {hasExperience && (
            <div>
              <SectionBanner title="Experience" />
              <div className="mt-3 space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-bold text-gray-800">{exp.role || 'Job Title'} <span className="font-normal text-gray-500">{exp.company ? `— ${exp.company}` : ''}</span></p>
                      <span className="text-[10px] text-gray-400 flex-shrink-0 ml-4 mt-0.5 font-medium">
                        {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-[11px] text-gray-600 mt-1 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {hasEducation && (
            <div>
              <SectionBanner title="Education" />
              <div className="mt-3 space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-800">{edu.school || 'School Name'}</p>
                      {edu.degree && (
                        <p className="text-[11px] text-gray-500 mt-0.5">{edu.degree}</p>
                      )}
                    </div>
                    {edu.graduationDate && (
                      <span className="text-[10px] text-gray-400 flex-shrink-0 ml-4 mt-0.5 font-medium">{edu.graduationDate}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {hasSkills && (
            <div>
              <SectionBanner title="Skills" />
              <ul className="mt-3 space-y-1">
                {skills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] text-gray-600">
                    <span className="text-[#B07D65] mt-0.5 text-[8px]">▶</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Projects */}
          {hasProjects && (
            <div>
              <SectionBanner title="Projects" />
              <div className="mt-3 space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <p className="text-sm font-bold text-gray-800">{proj.name}</p>
                    <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <p className="text-[10px] text-gray-400 mt-0.5">{proj.technologies.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {hasCertifications && (
            <div>
              <SectionBanner title="Certifications" />
              <div className="mt-3 space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-sm font-bold text-gray-800">{cert.name}</p>
                    <p className="text-[11px] text-gray-500">{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</p>
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

export default React.memo(FreshGraduateModernComponent);
