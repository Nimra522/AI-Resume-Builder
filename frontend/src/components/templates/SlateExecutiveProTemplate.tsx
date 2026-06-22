import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface SlateExecutiveProTemplateProps {
  data: ResumeData;
}

const SlateExecutiveProTemplateComponent: React.FC<SlateExecutiveProTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-white text-slate-800 shadow-xl">
      {/* Header */}
      <div className="bg-slate-800 text-white px-12 py-10">
        <h1 className="text-5xl font-bold tracking-wide mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-2xl text-slate-300 font-medium mb-4">{personalInfo.jobTitle || 'Your Job Title'}</p>
        <div className="flex flex-wrap gap-6 text-sm text-slate-200">
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

      {/* Main Content */}
      <div className="px-12 py-10 space-y-10">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-xl font-bold text-slate-800 border-b-3 border-slate-700 pb-2 mb-4 uppercase tracking-wider">
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-800 border-b-3 border-slate-700 pb-2 mb-6 uppercase tracking-wider">
              Professional Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="pb-6 border-b border-slate-300 last:border-0 last:pb-0">
                  <div className="flex justify-between items-baseline mb-3">
                    <div>
                      <h3 className="text-2xl font-semibold text-slate-900">{exp.role || 'Job Title'}</h3>
                      <p className="text-xl text-slate-700 font-medium">{exp.company || 'Company Name'}</p>
                    </div>
                    <span className="text-lg text-slate-600 font-medium bg-slate-100 px-4 py-1 rounded-full">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-slate-700 text-base leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Three Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-700 pb-2 mb-4 uppercase tracking-wider">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-lg font-semibold text-slate-900">{edu.school || 'School Name'}</h3>
                    <p className="text-slate-700">{edu.degree || 'Degree'}</p>
                    {edu.graduationDate && <p className="text-slate-600 text-sm mt-1">{edu.graduationDate}</p>}
                    {edu.description && <p className="text-slate-600 text-sm mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-700 pb-2 mb-4 uppercase tracking-wider">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-100 text-slate-800 rounded-full text-base font-medium border border-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-700 pb-2 mb-4 uppercase tracking-wider">
                Certifications
              </h2>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="text-base font-semibold text-slate-900">{cert.name || 'Certification'}</h3>
                    <p className="text-slate-700 text-sm">{cert.issuer || 'Issuer'}</p>
                    {cert.date && <p className="text-slate-600 text-xs mt-1">{cert.date}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-800 border-b-3 border-slate-700 pb-2 mb-5 uppercase tracking-wider">
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">{proj.name || 'Project Name'}</h3>
                  {proj.link && (
                    <a href={proj.link} className="text-sm text-blue-700 hover:underline block mt-2 break-all" target="_blank" rel="noopener noreferrer">
                      {proj.link}
                    </a>
                  )}
                  {proj.description && <p className="text-sm text-slate-700 mt-2">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default React.memo(SlateExecutiveProTemplateComponent);
