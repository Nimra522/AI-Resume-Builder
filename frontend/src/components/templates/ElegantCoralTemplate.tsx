import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface ElegantCoralTemplateProps {
  data: ResumeData;
}

const ElegantCoralTemplateComponent: React.FC<ElegantCoralTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-gradient-to-b from-white to-orange-50 text-slate-800 shadow-xl">
      {/* Header */}
      <div className="px-12 py-12 bg-gradient-to-r from-coral-600 via-orange-500 to-pink-500 text-white">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {personalInfo.photoUrl ? (
            <div className="w-36 h-36 rounded-full border-4 border-white shadow-xl overflow-hidden">
              <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-36 h-36 rounded-full border-4 border-white shadow-xl overflow-hidden">
              <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-black mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-2xl text-orange-100 font-semibold mb-4">{personalInfo.jobTitle || 'Your Job Title'}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-5 text-sm">
              {personalInfo.location && (
                <div className="flex items-center gap-2 text-orange-100">
                  <MapPin size={16} />
                  {personalInfo.location}
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2 text-orange-100">
                  <Mail size={16} />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2 text-orange-100">
                  <Phone size={16} />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2 text-orange-100">
                  <Globe size={16} />
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
          <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-sm">
            <h3 className="text-xl font-bold text-orange-900 mb-4">Professional Summary</h3>
            <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-sm">
            <h3 className="text-xl font-bold text-orange-900 mb-6">Experience</h3>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="pb-5 border-b border-orange-200 last:border-0 last:pb-0">
                  <div className="flex justify-between items-baseline mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">{exp.role || 'Job Title'}</h4>
                      <p className="text-orange-700 font-medium">{exp.company || 'Company Name'}</p>
                    </div>
                    <span className="text-sm text-slate-600 bg-orange-100 px-3 py-1 rounded-full font-medium">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-sm">
              <h3 className="text-xl font-bold text-orange-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-900 rounded-full text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-sm">
              <h3 className="text-xl font-bold text-orange-900 mb-4">Education</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-semibold text-slate-900">{edu.school || 'School Name'}</div>
                    <div className="text-orange-700">{edu.degree || 'Degree'}</div>
                    {edu.graduationDate && <div className="text-xs text-slate-600 mt-1">{edu.graduationDate}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-sm">
              <h3 className="text-xl font-bold text-orange-900 mb-4">Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-semibold text-slate-900 text-sm">{cert.name || 'Certification'}</div>
                    <div className="text-slate-700 text-xs">{cert.issuer || 'Issuer'}</div>
                    {cert.date && <div className="text-slate-600 text-xs mt-1">{cert.date}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-sm">
            <h3 className="text-xl font-bold text-orange-900 mb-5">Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl border border-orange-200">
                  <h4 className="font-semibold text-slate-900">{proj.name || 'Project Name'}</h4>
                  {proj.link && (
                    <a href={proj.link} className="text-xs text-orange-700 hover:underline block mt-1 break-all" target="_blank" rel="noopener noreferrer">
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

export default React.memo(ElegantCoralTemplateComponent);
