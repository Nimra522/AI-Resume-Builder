import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface TechStartupModernTemplateProps {
  data: ResumeData;
}

const TechStartupModernTemplateComponent: React.FC<TechStartupModernTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-gradient-to-b from-slate-50 to-white text-slate-800 shadow-xl">
      {/* Header */}
      <div className="px-12 py-12 bg-white border-b border-slate-200">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {personalInfo.photoUrl ? (
            <div className="w-36 h-36 rounded-full border-4 border-blue-100 shadow-lg overflow-hidden">
              <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-36 h-36 rounded-full border-4 border-blue-100 shadow-lg overflow-hidden">
              <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-5xl font-black text-slate-900 mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-2xl text-blue-700 font-semibold mb-4">{personalInfo.jobTitle || 'Your Job Title'}</p>
            <div className="flex flex-wrap gap-5 text-sm">
              {personalInfo.location && (
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin size={16} className="text-blue-600" />
                  {personalInfo.location}
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail size={16} className="text-blue-600" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone size={16} className="text-blue-600" />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Globe size={16} className="text-blue-600" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-12 py-10 space-y-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
              Professional Summary
            </h3>
            <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
              Experience
            </h3>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="pb-5 border-b border-slate-200 last:border-0 last:pb-0">
                  <div className="flex justify-between items-baseline mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">{exp.role || 'Job Title'}</h4>
                      <p className="text-blue-700 font-medium">{exp.company || 'Company Name'}</p>
                    </div>
                    <span className="text-sm text-slate-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-900 rounded-full text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-semibold text-slate-900">{edu.school || 'School Name'}</div>
                    <div className="text-blue-700">{edu.degree || 'Degree'}</div>
                    {edu.graduationDate && <div className="text-xs text-slate-600 mt-1">{edu.graduationDate}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-medium text-slate-900 text-sm">{cert.name || 'Certification'}</div>
                    <div className="text-slate-600 text-xs">{cert.issuer || 'Issuer'}</div>
                    {cert.date && <div className="text-slate-500 text-xs mt-1">{cert.date}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
              Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-slate-900">{proj.name || 'Project Name'}</h4>
                  {proj.link && (
                    <a href={proj.link} className="text-xs text-blue-700 hover:underline block mt-1 break-all" target="_blank" rel="noopener noreferrer">
                      {proj.link}
                    </a>
                  )}
                  {proj.description && <p className="text-xs text-slate-700 mt-2">{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(TechStartupModernTemplateComponent);
