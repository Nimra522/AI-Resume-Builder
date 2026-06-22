import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface NeonCreativeTemplateProps {
  data: ResumeData;
}

const NeonCreativeTemplateComponent: React.FC<NeonCreativeTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-gray-900 text-white shadow-xl">
      {/* Full-width Header with Gradient */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 px-10 py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          {personalInfo.photoUrl ? (
            <div className="w-36 h-36 rounded-full border-4 border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] overflow-hidden flex-shrink-0">
              <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-36 h-36 rounded-full border-4 border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] overflow-hidden flex-shrink-0">
              <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-xl md:text-2xl text-cyan-200 font-semibold">{personalInfo.jobTitle || 'Your Job Title'}</p>
          </div>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="bg-gray-800 px-10 py-4 flex flex-wrap justify-center gap-8 text-sm border-y border-gray-700">
        {personalInfo.location && (
          <div className="flex items-center gap-2 text-cyan-300">
            <MapPin size={16} />
            {personalInfo.location}
          </div>
        )}
        {personalInfo.email && (
          <div className="flex items-center gap-2 text-purple-300">
            <Mail size={16} />
            <span className="break-all">{personalInfo.email}</span>
          </div>
        )}
        {personalInfo.phone && (
          <div className="flex items-center gap-2 text-blue-300">
            <Phone size={16} />
            {personalInfo.phone}
          </div>
        )}
        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="flex items-center gap-2 text-fuchsia-300">
            <Globe size={16} />
            <span className="break-all">{personalInfo.linkedin || personalInfo.website}</span>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-10 py-10">
        {/* Left Column (Skills, Education, Certifications) */}
        <div className="lg:col-span-1 space-y-8">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-cyan-400 mb-4 uppercase tracking-wide">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-purple-700 to-cyan-700 rounded-full text-xs font-semibold shadow-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-purple-400 mb-4 uppercase tracking-wide">Education</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="pb-3 border-b border-gray-700 last:border-0 last:pb-0">
                    <div className="font-semibold text-white">{edu.school || 'School Name'}</div>
                    <div className="text-cyan-300 text-sm">{edu.degree || 'Degree'}</div>
                    {edu.graduationDate && <div className="text-gray-400 text-xs mt-1">{edu.graduationDate}</div>}
                    {edu.description && <div className="text-gray-300 text-xs mt-1">{edu.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-blue-400 mb-4 uppercase tracking-wide">Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="pb-2 border-b border-gray-700 last:border-0 last:pb-0">
                    <div className="font-medium text-white">{cert.name || 'Certification'}</div>
                    <div className="text-gray-400 text-xs">{cert.issuer || 'Issuer'}</div>
                    {cert.date && <div className="text-fuchsia-300 text-xs">{cert.date}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Summary, Experience, Projects) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-fuchsia-400 mb-4 uppercase tracking-wide">Professional Summary</h3>
              <p className="text-gray-200 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-purple-400 mb-6 uppercase tracking-wide">Experience</h3>
              <div className="space-y-7">
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="relative pl-8 pb-7 border-l-2 border-purple-500 last:pb-0 last:border-0">
                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full border-2 border-gray-900"></div>
                    <div className="flex justify-between items-baseline mb-2">
                      <div>
                        <h4 className="text-xl font-bold text-white">{exp.role || 'Job Title'}</h4>
                        <p className="text-cyan-300 font-medium">{exp.company || 'Company Name'}</p>
                      </div>
                      <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-cyan-400 mb-5 uppercase tracking-wide">Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
                    <h4 className="font-bold text-white mb-2">{proj.name || 'Project Name'}</h4>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:text-cyan-300 underline block break-all">
                        {proj.link}
                      </a>
                    )}
                    {proj.description && <p className="text-sm text-gray-300 mt-2">{proj.description}</p>}
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

export default React.memo(NeonCreativeTemplateComponent);
