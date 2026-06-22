import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface WarmPeachElegantTemplateProps {
  data: ResumeData;
}

const WarmPeachElegantTemplateComponent: React.FC<WarmPeachElegantTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-peach-50 text-slate-900 shadow-xl">
      {/* Header */}
      <div className="px-12 py-12 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white">
        <h1 className="text-5xl font-black mb-2 text-center">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-2xl text-amber-100 font-semibold mb-4 text-center">{personalInfo.jobTitle || 'Your Job Title'}</p>
        <div className="flex flex-wrap justify-center gap-5 text-sm">
          {personalInfo.location && (
            <div className="flex items-center gap-2 text-amber-100">
              <MapPin size={16} />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center gap-2 text-amber-100">
              <Mail size={16} />
              <span className="break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2 text-amber-100">
              <Phone size={16} />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2 text-amber-100">
              <Globe size={16} />
              <span className="break-all">{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-12 py-10 space-y-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm">
            <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
              Professional Summary
            </h3>
            <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm">
            <h3 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
              Experience
            </h3>
            <div className="space-y-6">
              {experience.map((exp) => (
              <div key={exp.id} className="pb-5 border-b border-amber-200 last:border-0 last:pb-0">
                <div className="flex justify-between items-baseline mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">{exp.role || 'Job Title'}</h4>
                    <p className="text-amber-700 font-medium">{exp.company || 'Company Name'}</p>
                  </div>
                  <span className="text-sm text-slate-600 bg-amber-100 px-3 py-1 rounded-full font-medium">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
              </div>
            ))}
          </div>
          </section>
        )}

        {/* Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Education */}
          {education.length > 0 && (
            <section className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm">
              <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-semibold text-slate-900">{edu.school || 'School Name'}</h4>
                    <p className="text-amber-700">{edu.degree || 'Degree'}</p>
                    {edu.graduationDate && <p className="text-xs text-slate-600 mt-1">{edu.graduationDate}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm">
              <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 rounded-full text-sm font-semibold">
                  {skill}
                </span>
              ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm">
              <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h4 className="font-semibold text-slate-900 text-sm">{cert.name || 'Certification'}</h4>
                    <p className="text-slate-700 text-xs">{cert.issuer || 'Issuer'}</p>
                    {cert.date && <p className="text-slate-600 text-xs mt-1">{cert.date}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <section className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm">
            <h3 className="text-xl font-bold text-amber-900 mb-5 flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
              Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <h4 className="font-semibold text-slate-900">{proj.name || 'Project Name'}</h4>
                  {proj.link && (
                    <a href={proj.link} className="text-xs text-amber-700 hover:underline block mt-1 break-all" target="_blank" rel="noopener noreferrer">
                      {proj.link}
                    </a>
                  )}
                  {proj.description && <p className="text-xs text-slate-700 mt-2">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default React.memo(WarmPeachElegantTemplateComponent);
