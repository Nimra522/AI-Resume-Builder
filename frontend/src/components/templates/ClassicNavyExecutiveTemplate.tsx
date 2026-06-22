import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface ClassicNavyExecutiveTemplateProps {
  data: ResumeData;
}

const ClassicNavyExecutiveTemplateComponent: React.FC<ClassicNavyExecutiveTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-white text-gray-800 shadow-xl">
      {/* Header */}
      <div className="bg-slate-800 text-white px-10 py-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-xl text-slate-300 font-medium mb-4">{personalInfo.jobTitle || 'Your Job Title'}</p>
        <div className="flex flex-wrap gap-6 text-sm">
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span className="break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span className="break-all">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span className="break-all">{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-10 py-8 space-y-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-2 mb-4 uppercase tracking-wide">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-2 mb-4 uppercase tracking-wide">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{exp.role || 'Job Title'}</h3>
                      <p className="text-slate-700 font-medium">{exp.company || 'Company Name'}</p>
                    </div>
                    <span className="text-sm text-slate-600 font-medium">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-2 mb-4 uppercase tracking-wide">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-900">{proj.name || 'Project Name'}</h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-700 hover:underline block mt-1 break-all">
                      {proj.link}
                    </a>
                  )}
                  {proj.description && <p className="text-sm text-gray-700 mt-2">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two Columns for Skills, Education, Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-2 mb-4 uppercase tracking-wide">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <h3 className="font-semibold text-slate-900">{edu.school || 'School Name'}</h3>
                    <p className="text-slate-700">{edu.degree || 'Degree'}</p>
                    {edu.graduationDate && <p className="text-sm text-gray-600">{edu.graduationDate}</p>}
                    {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-2 mb-4 uppercase tracking-wide">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-medium border border-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="md:col-span-2">
              <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-2 mb-4 uppercase tracking-wide">Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h3 className="font-semibold text-slate-900">{cert.name || 'Certification Name'}</h3>
                    <p className="text-sm text-slate-700">{cert.issuer || 'Issuer'}</p>
                    {cert.date && <p className="text-xs text-gray-600 mt-1">{cert.date}</p>}
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

export default React.memo(ClassicNavyExecutiveTemplateComponent);
