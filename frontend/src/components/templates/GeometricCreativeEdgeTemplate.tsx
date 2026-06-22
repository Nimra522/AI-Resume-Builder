import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface GeometricCreativeEdgeTemplateProps {
  data: ResumeData;
}

const GeometricCreativeEdgeTemplateComponent: React.FC<GeometricCreativeEdgeTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-white text-slate-900 shadow-xl overflow-hidden">
      {/* Header with Geometric Accent */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-br-full"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-pink-500 to-purple-500 rounded-tl-full"></div>
        <div className="relative px-12 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {personalInfo.photoUrl ? (
              <div className="w-36 h-36 rounded-2xl shadow-2xl overflow-hidden border-4 border-white z-10">
                <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-36 h-36 rounded-2xl shadow-2xl overflow-hidden border-4 border-white z-10">
                <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-5xl font-black text-slate-900 mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
              <p className="text-2xl text-cyan-600 font-semibold mb-4">{personalInfo.jobTitle || 'Your Job Title'}</p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-700">
                {personalInfo.location && (
                  <div className="flex items-center gap-2 bg-cyan-50 px-3 py-1.5 rounded-full border border-cyan-200">
                    <MapPin size={16} className="text-cyan-600" />
                    {personalInfo.location}
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
                    <Mail size={16} className="text-blue-600" />
                    <span className="break-all">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
                    <Phone size={16} className="text-purple-600" />
                    {personalInfo.phone}
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-2 bg-pink-50 px-3 py-1.5 rounded-full border border-pink-200">
                    <Globe size={16} className="text-pink-600" />
                    <span className="break-all">{personalInfo.linkedin}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-12 py-10 space-y-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 p-6 rounded-2xl border border-cyan-100">
            <h3 className="text-2xl font-black text-cyan-800 mb-4">Professional Summary</h3>
            <p className="text-slate-700 leading-relaxed text-lg">{personalInfo.summary}</p>
          </div>
        )}

        {/* Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Experience */}
          {experience.length > 0 && (
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border-2 border-cyan-200">
              <h3 className="text-2xl font-black text-cyan-800 mb-6 border-l-4 border-cyan-500 pl-4">Experience</h3>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="pb-5 border-b border-cyan-100 last:border-0 last:pb-0">
                    <div className="flex justify-between items-baseline mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">{exp.role || 'Job Title'}</h4>
                        <p className="text-cyan-700 font-semibold">{exp.company || 'Company Name'}</p>
                      </div>
                      <span className="text-sm text-slate-600 bg-cyan-100 px-3 py-1 rounded-full font-medium">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Skills */}
            {skills.length > 0 && (
              <div className="bg-white p-5 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-4 border-l-4 border-blue-500 pl-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div className="bg-white p-5 rounded-2xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-800 mb-4 border-l-4 border-purple-500 pl-4">Projects</h3>
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                      <h4 className="font-semibold text-slate-900">{proj.name || 'Project Name'}</h4>
                      {proj.link && (
                        <a href={proj.link} className="text-xs text-purple-700 hover:underline block mt-1 break-all" target="_blank" rel="noopener noreferrer">
                          {proj.link}
                        </a>
                      )}
                      {proj.description && <p className="text-xs text-slate-700 mt-1">{proj.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className="bg-white p-5 rounded-2xl border-2 border-pink-200">
                <h3 className="text-xl font-bold text-pink-800 mb-4 border-l-4 border-pink-500 pl-4">Education</h3>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h4 className="font-semibold text-slate-900">{edu.school || 'School Name'}</h4>
                      <p className="text-pink-700">{edu.degree || 'Degree'}</p>
                      {edu.graduationDate && <p className="text-xs text-slate-600 mt-1">{edu.graduationDate}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="bg-white p-5 rounded-2xl border-2 border-orange-200">
                <h3 className="text-xl font-bold text-orange-800 mb-4 border-l-4 border-orange-500 pl-4">Certifications</h3>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <h4 className="font-semibold text-slate-900 text-sm">{cert.name || 'Certification'}</h4>
                      <p className="text-orange-700 text-xs">{cert.issuer || 'Issuer'}</p>
                      {cert.date && <p className="text-xs text-slate-600 mt-1">{cert.date}</p>}
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

export default React.memo(GeometricCreativeEdgeTemplateComponent);
