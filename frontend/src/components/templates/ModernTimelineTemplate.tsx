import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Phone, Mail, Globe, Linkedin, User } from 'lucide-react';

interface ModernTimelineProps {
  data: ResumeData;
}

const SkillCircles: React.FC<{ skill: string }> = ({ skill }) => (
  <div className="flex items-center gap-2">
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full border border-gray-400"
          style={{ backgroundColor: i <= 3 ? '#6B7280' : 'transparent' }}
        />
      ))}
    </div>
    <span className="text-[11px] text-gray-700">{skill}</span>
  </div>
);

const TimelineDot: React.FC = () => (
  <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-gray-800 border-2 border-white shadow-sm z-10" />
);

const ModernTimelineComponent: React.FC<ModernTimelineProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  const hasContact = personalInfo.phone || personalInfo.email || personalInfo.location || personalInfo.website || personalInfo.linkedin;
  const hasSkills = skills.length > 0;
  const hasSummary = personalInfo.summary;
  const hasEducation = education.length > 0;
  const hasExperience = experience.length > 0;
  const hasProjects = projects && projects.length > 0;
  const hasCertifications = certifications.length > 0;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-800 shadow-xl flex">
      {/* Left Column */}
      <div className="w-[34%] bg-gray-50 p-6 flex flex-col items-center space-y-5">
        {/* Profile Photo */}
        <div className="w-28 h-28 rounded-sm bg-gray-200 overflow-hidden flex items-center justify-center border border-gray-300">
          {personalInfo.photoUrl ? (
            <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
          )}
        </div>

        {/* Name */}
        <div className="text-center w-full">
          <h1 className="text-xl font-bold text-gray-900 leading-tight">
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
        </div>

        {/* Job Title */}
        <div className="text-center w-full -mt-3">
          <p className="text-[11px] uppercase tracking-[0.15em] text-gray-500 font-medium">
            {personalInfo.jobTitle || 'Your Job Title'}
          </p>
        </div>

        {/* Divider */}
        <div className="w-8 h-[2px] bg-gray-800" />

        {/* Contact */}
        {hasContact && (
          <div className="w-full space-y-2.5">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-800 mb-2">
              Contact
            </h3>
            <div className="space-y-2">
              {personalInfo.location && (
                <div className="flex items-center gap-2.5 text-[11px] text-gray-600">
                  <div className="w-4 flex justify-center flex-shrink-0">
                    <MapPin size={12} className="text-gray-500" />
                  </div>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2.5 text-[11px] text-gray-600">
                  <div className="w-4 flex justify-center flex-shrink-0">
                    <Phone size={12} className="text-gray-500" />
                  </div>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2.5 text-[11px] text-gray-600">
                  <div className="w-4 flex justify-center flex-shrink-0">
                    <Mail size={12} className="text-gray-500" />
                  </div>
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2.5 text-[11px] text-gray-600">
                  <div className="w-4 flex justify-center flex-shrink-0">
                    <Globe size={12} className="text-gray-500" />
                  </div>
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2.5 text-[11px] text-gray-600">
                  <div className="w-4 flex justify-center flex-shrink-0">
                    <Linkedin size={12} className="text-gray-500" />
                  </div>
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        {hasSkills && (
          <div className="w-full space-y-2">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-800 mb-2">
              Skills
            </h3>
            <div className="space-y-1.5">
              {skills.map((skill, i) => (
                <SkillCircles key={i} skill={skill} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="w-[66%] p-6 space-y-6">
        {/* About Me */}
        {hasSummary && (
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-800 mb-3">
              About Me
            </h3>
            <p className="text-[11px] leading-relaxed text-gray-600 whitespace-pre-wrap">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Education Timeline */}
        {hasEducation && (
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-800 mb-3">
              Education
            </h3>
            <div className="relative pl-5 space-y-4">
              <div className="absolute left-[4px] top-2 bottom-2 w-px bg-gray-300" />
              {education.map((edu) => (
                <div key={edu.id} className="relative">
                  <TimelineDot />
                  <div className="flex justify-between items-start ml-3">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{edu.school || 'School Name'}</p>
                      {edu.degree && (
                        <p className="text-[11px] text-gray-500 mt-0.5">{edu.degree}</p>
                      )}
                    </div>
                    {edu.graduationDate && (
                      <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2 mt-0.5">{edu.graduationDate}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {hasProjects && (
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-800 mb-3">
              Projects
            </h3>
            <div className="relative pl-5 space-y-3">
              <div className="absolute left-[4px] top-2 bottom-2 w-px bg-gray-300" />
              {projects.map((proj) => (
                <div key={proj.id} className="relative">
                  <TimelineDot />
                  <div className="ml-3">
                    <p className="text-sm font-bold text-gray-900">
                      {proj.name}
                      {proj.link && <span className="text-[11px] font-normal text-gray-500 ml-2">| {proj.link}</span>}
                    </p>
                    <p className="text-[11px] leading-relaxed text-gray-600 mt-0.5">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <p className="text-[10px] text-gray-400 mt-0.5">{proj.technologies.join(', ')}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {hasCertifications && (
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-800 mb-3">
              Certifications
            </h3>
            <div className="relative pl-5 space-y-2">
              <div className="absolute left-[4px] top-2 bottom-2 w-px bg-gray-300" />
              {certifications.map((cert) => (
                <div key={cert.id} className="relative">
                  <TimelineDot />
                  <div className="ml-3">
                    <p className="text-sm font-bold text-gray-900">{cert.name}</p>
                    <p className="text-[11px] text-gray-500">{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience Timeline */}
        {hasExperience && (
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-800 mb-3">
              Work Experience
            </h3>
            <div className="relative pl-5 space-y-4">
              <div className="absolute left-[4px] top-2 bottom-2 w-px bg-gray-300" />
              {experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <TimelineDot />
                  <div className="flex justify-between items-start mb-0.5 ml-3">
                    <p className="text-sm font-bold text-gray-900">{exp.role || 'Job Title'}</p>
                    <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2 mt-0.5">
                      {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium mb-1">{exp.company || 'Company Name'}</p>
                  <p className="text-[11px] leading-relaxed text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ModernTimelineComponent);
