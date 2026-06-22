import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface AiryLightTemplateProps {
  data: ResumeData;
}

const AiryLightTemplateComponent: React.FC<AiryLightTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-slate-50 text-slate-800 shadow-xl">
      {/* Centered Header */}
      <div className="px-12 py-12 text-center border-b border-slate-200">
        <h1 className="text-3xl font-light tracking-wide mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-lg text-slate-500 mb-6">{personalInfo.jobTitle || 'Your Job Title'}</p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
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

      {/* Content with generous spacing */}
      <div className="px-12 py-10 space-y-12">
        {/* Left-aligned sections */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-base font-medium text-slate-400 uppercase tracking-wider mb-4">Professional Summary</h2>
            <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-base font-medium text-slate-400 uppercase tracking-wider mb-6">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-slate-900">{exp.role || 'Job Title'}</h3>
                      <p className="text-slate-600">{exp.company || 'Company Name'}</p>
                    </div>
                    <span className="text-sm text-slate-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.description && <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-base font-medium text-slate-400 uppercase tracking-wider mb-5">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="font-medium text-slate-900">{proj.name || 'Project Name'}</h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-600 hover:underline block break-all">
                      {proj.link}
                    </a>
                  )}
                  {proj.description && <p className="text-xs text-slate-600 mt-2">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.length > 0 && (
            <section>
              <h2 className="text-base font-medium text-slate-400 uppercase tracking-wider mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-medium text-slate-900">{edu.school || 'School Name'}</h3>
                    <p className="text-slate-600 text-sm">{edu.degree || 'Degree'}</p>
                    {edu.graduationDate && <p className="text-xs text-slate-500 mt-1">{edu.graduationDate}</p>}
                    {edu.description && <p className="text-xs text-slate-600 mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-base font-medium text-slate-400 uppercase tracking-wider mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="text-sm text-slate-700">{skill}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        {certifications.length > 0 && (
          <section>
            <h2 className="text-base font-medium text-slate-400 uppercase tracking-wider mb-4">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="font-medium text-slate-900 text-sm">{cert.name || 'Certification'}</h3>
                  <p className="text-xs text-slate-600">{cert.issuer || 'Issuer'}</p>
                  {cert.date && <p className="text-xs text-slate-500 mt-0.5">{cert.date}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default React.memo(AiryLightTemplateComponent);
