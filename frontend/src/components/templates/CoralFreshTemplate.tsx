import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface CoralFreshTemplateProps {
  data: ResumeData;
}

const CoralFreshTemplateComponent: React.FC<CoralFreshTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-white text-slate-800 shadow-xl">
      {/* Header with coral accent */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-coral-500 via-red-400 to-pink-500"></div>
        <div className="px-10 py-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {personalInfo.photoUrl ? (
            <div className="w-32 h-32 rounded-full border-4 border-coral-100 shadow-lg overflow-hidden flex-shrink-0">
              <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-coral-100 shadow-lg overflow-hidden flex-shrink-0">
              <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
              <p className="text-xl text-coral-600 font-medium mb-4">{personalInfo.jobTitle || 'Your Job Title'}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-5 text-sm text-slate-600">
                {personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-coral-500" />
                    {personalInfo.location}
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-coral-500" />
                    <span className="break-all">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-coral-500" />
                    {personalInfo.phone}
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-coral-500" />
                    <span className="break-all">{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-coral-500" />
                    <span className="break-all">{personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-10 pb-10 space-y-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="bg-gradient-to-r from-coral-50 to-rose-50 rounded-2xl p-6 border border-coral-100">
            <h3 className="text-xl font-bold text-coral-800 mb-4">Professional Summary</h3>
            <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 border-b-2 border-coral-200 pb-2">Experience</h3>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-8 pb-6 border-l-2 border-coral-200 last:pb-0 last:border-0">
                  <div className="absolute -left-2.5 top-0 w-5 h-5 bg-coral-400 rounded-full border-3 border-white shadow-sm"></div>
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">{exp.role || 'Job Title'}</h4>
                      <p className="text-coral-700 font-medium">{exp.company || 'Company Name'}</p>
                    </div>
                    <span className="text-sm text-slate-600 bg-coral-50 px-3 py-1 rounded-full font-medium">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-5 border-b-2 border-rose-200 pb-2">Projects</h3>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-100">
                    <h4 className="font-semibold text-slate-900">{proj.name || 'Project Name'}</h4>
                    {proj.link && (
                      <a href={proj.link} className="text-xs text-rose-700 hover:underline block mt-1 break-all" target="_blank" rel="noopener noreferrer">
                        {proj.link}
                      </a>
                    )}
                    {proj.description && <p className="text-xs text-slate-700 mt-2">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-5 border-b-2 border-coral-200 pb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-gradient-to-r from-coral-100 to-rose-100 text-coral-800 rounded-full text-sm font-semibold border border-coral-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-5 border-b-2 border-pink-200 pb-2">Education</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-100">
                    <h4 className="font-semibold text-slate-900">{edu.school || 'School Name'}</h4>
                    <p className="text-pink-700">{edu.degree || 'Degree'}</p>
                    {edu.graduationDate && <p className="text-xs text-slate-600 mt-1">{edu.graduationDate}</p>}
                    {edu.description && <p className="text-xs text-slate-700 mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-5 border-b-2 border-rose-200 pb-2">Certifications</h3>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-gradient-to-r from-rose-50 to-coral-50 p-4 rounded-xl border border-rose-100">
                    <h4 className="font-semibold text-slate-900 text-sm">{cert.name || 'Certification'}</h4>
                    <p className="text-xs text-slate-700">{cert.issuer || 'Issuer'}</p>
                    {cert.date && <p className="text-xs text-slate-600 mt-0.5">{cert.date}</p>}
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

export default React.memo(CoralFreshTemplateComponent);
