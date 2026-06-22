import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface CharcoalCorporateTemplateProps {
  data: ResumeData;
}

const CharcoalCorporateTemplateComponent: React.FC<CharcoalCorporateTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-white text-gray-800 shadow-xl">
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/3 bg-gray-900 text-white p-8">
          {personalInfo.photoUrl ? (
            <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-gray-700">
              <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-gray-700">
              <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}

          <h1 className="text-2xl font-bold text-center mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
          <p className="text-gray-300 text-center mb-6 font-medium">{personalInfo.jobTitle || 'Your Job Title'}</p>

          {/* Contact */}
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-700 pb-2">Contact</h3>
            <div className="space-y-3 text-sm">
              {personalInfo.location && (
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 text-gray-400" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Mail size={16} className="mt-0.5 text-gray-400" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-start gap-2">
                  <Phone size={16} className="mt-0.5 text-gray-400" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-start gap-2">
                  <Globe size={16} className="mt-0.5 text-gray-400" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-start gap-2">
                  <Globe size={16} className="mt-0.5 text-gray-400" />
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-700 pb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-700 pb-2">Education</h3>
              <div className="space-y-4 text-sm">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-medium text-white">{edu.school || 'School Name'}</div>
                    <div className="text-gray-300">{edu.degree || 'Degree'}</div>
                    {edu.graduationDate && <div className="text-gray-500 text-xs mt-1">{edu.graduationDate}</div>}
                    {edu.description && <div className="text-gray-400 text-xs mt-1">{edu.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-700 pb-2">Certifications</h3>
              <div className="space-y-3 text-sm">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-medium text-white">{cert.name || 'Certification'}</div>
                    <div className="text-gray-400 text-xs">{cert.issuer || 'Issuer'}</div>
                    {cert.date && <div className="text-gray-500 text-xs">{cert.date}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-full md:w-2/3 p-8">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300 pb-2">Professional Summary</h3>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-2">Experience</h3>
              <div className="space-y-7">
                {experience.map((exp) => (
                  <div key={exp.id} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                    <div className="flex justify-between items-baseline mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{exp.role || 'Job Title'}</h4>
                        <p className="text-gray-700 font-medium">{exp.company || 'Company Name'}</p>
                      </div>
                      <span className="text-sm text-gray-600">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-5 border-b-2 border-gray-300 pb-2">Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h4 className="font-semibold text-gray-900">{proj.name || 'Project Name'}</h4>
                    {proj.link && (
                      <a href={proj.link} className="text-xs text-blue-700 hover:underline mt-1 block break-all" target="_blank" rel="noopener noreferrer">
                        {proj.link}
                      </a>
                    )}
                    {proj.description && <p className="text-sm text-gray-700 mt-2">{proj.description}</p>}
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

export default React.memo(CharcoalCorporateTemplateComponent);
