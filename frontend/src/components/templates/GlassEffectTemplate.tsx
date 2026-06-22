import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface GlassEffectTemplateProps {
  data: ResumeData;
}

const GlassEffectTemplateComponent: React.FC<GlassEffectTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-800 shadow-xl">
      {/* Header Section */}
      <div className="px-10 py-10">
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {personalInfo.photoUrl ? (
              <div className="w-32 h-32 rounded-2xl shadow-lg overflow-hidden flex-shrink-0 border-2 border-white/50">
                <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-2xl shadow-lg overflow-hidden flex-shrink-0 border-2 border-white/50">
                <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
              <p className="text-xl text-indigo-700 font-medium mb-4">{personalInfo.jobTitle || 'Your Job Title'}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-5 text-sm text-slate-700">
                {personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-blue-600" />
                    {personalInfo.location}
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-blue-600" />
                    <span className="break-all">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-blue-600" />
                    {personalInfo.phone}
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-blue-600" />
                    <span className="break-all">{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-blue-600" />
                    <span className="break-all">{personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-10 pb-10 space-y-6">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/40 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              Professional Summary
            </h3>
            <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/40 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              Experience
            </h3>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="bg-white/50 rounded-xl p-5 border border-white/30">
                  <div className="flex justify-between items-baseline mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">{exp.role || 'Job Title'}</h4>
                      <p className="text-indigo-700 font-medium">{exp.company || 'Company Name'}</p>
                    </div>
                    <span className="text-sm text-slate-600 bg-white/60 px-3 py-1 rounded-full border border-white/40">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Projects */}
          {projects.length > 0 && (
            <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/40 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                Projects
              </h3>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-white/50 rounded-xl p-4 border border-white/30">
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

          {/* Skills/Education/Certifications */}
          <div className="space-y-6">
            {skills.length > 0 && (
              <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/40 p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-slate-800 rounded-full text-xs font-semibold border border-white/50">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/40 p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-cyan-500"></div>
                  Education
                </h3>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="bg-white/50 rounded-xl p-4 border border-white/30">
                      <h4 className="font-semibold text-slate-900 text-sm">{edu.school || 'School Name'}</h4>
                      <p className="text-indigo-700 text-xs">{edu.degree || 'Degree'}</p>
                      {edu.graduationDate && <p className="text-slate-500 text-xs mt-1">{edu.graduationDate}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/40 p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
                  Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="bg-white/50 rounded-xl p-4 border border-white/30">
                      <h4 className="font-semibold text-slate-900 text-sm">{cert.name || 'Certification'}</h4>
                      <p className="text-slate-600 text-xs">{cert.issuer || 'Issuer'}</p>
                      {cert.date && <p className="text-slate-500 text-xs mt-1">{cert.date}</p>}
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

export default React.memo(GlassEffectTemplateComponent);
