import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface TechModernTemplateProps {
  data: ResumeData;
}

const TechModernTemplateComponent: React.FC<TechModernTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-white text-slate-800 shadow-xl">
      {/* Header with sidebar accent */}
      <div className="flex">
        <div className="w-2 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"></div>
        <div className="flex-1 px-10 py-8 border-b border-slate-200">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
          <p className="text-xl text-slate-600 font-medium mb-4">{personalInfo.jobTitle || 'Your Job Title'}</p>
          <div className="flex flex-wrap gap-5 text-sm">
            {personalInfo.location && (
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin size={16} className="text-indigo-500" />
                {personalInfo.location}
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-2 text-slate-600">
                <Mail size={16} className="text-indigo-500" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2 text-slate-600">
                <Phone size={16} className="text-indigo-500" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2 text-slate-600">
                <Globe size={16} className="text-indigo-500" />
                <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2 text-slate-600">
                <Globe size={16} className="text-indigo-500" />
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-2"></div>
        <div className="flex-1 px-10 py-8">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
              <h3 className="text-lg font-semibold text-indigo-800 mb-3">Professional Summary</h3>
              <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
                Experience
              </h3>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-baseline mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900">{exp.role || 'Job Title'}</h4>
                        <p className="text-indigo-700 font-medium">{exp.company || 'Company Name'}</p>
                      </div>
                      <span className="text-sm text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-300">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                    <h4 className="font-semibold text-slate-900">{proj.name || 'Project Name'}</h4>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-700 hover:underline block mt-1 break-all">
                        {proj.link}
                      </a>
                    )}
                    {proj.description && <p className="text-xs text-slate-700 mt-2">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills/Education/Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-slate-800 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Education</h3>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="font-medium text-slate-900">{edu.school || 'School Name'}</div>
                      <div className="text-slate-700 text-sm">{edu.degree || 'Degree'}</div>
                      {edu.graduationDate && <div className="text-xs text-slate-500 mt-0.5">{edu.graduationDate}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Certifications</h3>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <div className="font-medium text-slate-900 text-sm">{cert.name || 'Certification'}</div>
                      <div className="text-slate-600 text-xs">{cert.issuer || 'Issuer'}</div>
                      {cert.date && <div className="text-slate-500 text-xs mt-0.5">{cert.date}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TechModernTemplateComponent);
