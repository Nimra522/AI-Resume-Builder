import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface SoftCyanMinimalTemplateProps {
  data: ResumeData;
}

const SoftCyanMinimalTemplateComponent: React.FC<SoftCyanMinimalTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-cyan-50 text-slate-900 shadow-xl">
      {/* Header */}
      <div className="px-12 py-12 bg-white border-b border-cyan-100">
        <h1 className="text-4xl font-light text-cyan-900 mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-xl text-cyan-700 font-light mb-6">{personalInfo.jobTitle || 'Your Job Title'}</p>
        <div className="flex flex-wrap gap-6 text-sm text-slate-700">
          {personalInfo.location && (
            <div className="flex items-center gap-2 text-cyan-700">
              <MapPin size={16} />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center gap-2 text-cyan-700">
              <Mail size={16} />
              <span className="break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2 text-cyan-700">
              <Phone size={16} />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2 text-cyan-700">
              <Globe size={16} />
              <span className="break-all">{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-12 py-10 space-y-10">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="bg-white p-6 rounded-xl border border-cyan-100">
            <h2 className="text-base font-medium text-cyan-700 uppercase tracking-wider mb-3">Professional Summary</h2>
            <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="bg-white p-6 rounded-xl border border-cyan-100">
            <h2 className="text-base font-medium text-cyan-700 uppercase tracking-wider mb-6">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="pb-5 border-b border-cyan-100 last:border-0 last:pb-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-cyan-900">{exp.role || 'Job Title'}</h3>
                      <p className="text-cyan-700">{exp.company || 'Company Name'}</p>
                    </div>
                    <span className="text-sm text-slate-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.description && <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education */}
          {education.length > 0 && (
            <section className="bg-white p-6 rounded-xl border border-cyan-100">
              <h2 className="text-base font-medium text-cyan-700 uppercase tracking-wider mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-medium text-cyan-900">{edu.school || 'School Name'}</h3>
                    <p className="text-cyan-700 text-sm">{edu.degree || 'Degree'}</p>
                    {edu.graduationDate && <p className="text-xs text-slate-600 mt-1">{edu.graduationDate}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="bg-white p-6 rounded-xl border border-cyan-100">
              <h2 className="text-base font-medium text-cyan-700 uppercase tracking-wider mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.length > 0 && (
            <section className="bg-white p-6 rounded-xl border border-cyan-100">
              <h2 className="text-base font-medium text-cyan-700 uppercase tracking-wider mb-4">Projects</h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-medium text-cyan-900">{proj.name || 'Project Name'}</h3>
                    {proj.link && (
                      <a href={proj.link} className="text-xs text-cyan-700 hover:underline block mt-1 break-all" target="_blank" rel="noopener noreferrer">
                        {proj.link}
                      </a>
                    )}
                    {proj.description && <p className="text-xs text-slate-700 mt-1">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section className="bg-white p-6 rounded-xl border border-cyan-100">
              <h2 className="text-base font-medium text-cyan-700 uppercase tracking-wider mb-4">Certifications</h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-medium text-cyan-900 text-sm">{cert.name || 'Certification'}</h3>
                    <p className="text-slate-700 text-xs">{cert.issuer || 'Issuer'}</p>
                    {cert.date && <p className="text-xs text-slate-600 mt-1">{cert.date}</p>}
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

export default React.memo(SoftCyanMinimalTemplateComponent);
