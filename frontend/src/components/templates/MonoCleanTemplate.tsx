import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface MonoCleanTemplateProps {
  data: ResumeData;
}

const MonoCleanTemplateComponent: React.FC<MonoCleanTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-white text-gray-900 shadow-xl">
      {/* Header */}
      <div className="px-12 py-10 border-b border-gray-200">
        <h1 className="text-4xl font-light tracking-widest uppercase mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-xl text-gray-500 font-light tracking-wide">{personalInfo.jobTitle || 'Your Job Title'}</p>
        <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-600">
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span className="break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Globe size={14} />
              <span className="break-all">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe size={14} />
              <span className="break-all">{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-12 py-10 space-y-10">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-lg font-medium text-gray-400 uppercase tracking-widest mb-3 border-l-2 border-gray-300 pl-4">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed ml-4">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-lg font-medium text-gray-400 uppercase tracking-widest mb-6 border-l-2 border-gray-300 pl-4">Experience</h2>
            <div className="ml-4 space-y-8">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{exp.role || 'Job Title'}</h3>
                      <p className="text-gray-700">{exp.company || 'Company Name'}</p>
                    </div>
                    <span className="text-sm text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.description && <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-medium text-gray-400 uppercase tracking-widest mb-5 border-l-2 border-gray-300 pl-4">Projects</h2>
            <div className="ml-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-medium text-gray-900">{proj.name || 'Project Name'}</h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:underline block break-all">
                      {proj.link}
                    </a>
                  )}
                  {proj.description && <p className="text-sm text-gray-600 mt-1">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Three columns for skills, education, certifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {education.length > 0 && (
            <section>
              <h2 className="text-lg font-medium text-gray-400 uppercase tracking-widest mb-4 border-l-2 border-gray-300 pl-4">Education</h2>
              <div className="ml-4 space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-medium text-gray-900">{edu.school || 'School Name'}</h3>
                    <p className="text-gray-700 text-sm">{edu.degree || 'Degree'}</p>
                    {edu.graduationDate && <p className="text-xs text-gray-500 mt-1">{edu.graduationDate}</p>}
                    {edu.description && <p className="text-xs text-gray-600 mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-medium text-gray-400 uppercase tracking-widest mb-4 border-l-2 border-gray-300 pl-4">Skills</h2>
              <div className="ml-4 flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="text-sm text-gray-700">{skill}</span>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-medium text-gray-400 uppercase tracking-widest mb-4 border-l-2 border-gray-300 pl-4">Certifications</h2>
              <div className="ml-4 space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-medium text-gray-900 text-sm">{cert.name || 'Certification'}</h3>
                    <p className="text-xs text-gray-600">{cert.issuer || 'Issuer'}</p>
                    {cert.date && <p className="text-xs text-gray-500 mt-0.5">{cert.date}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MonoCleanTemplateComponent);
