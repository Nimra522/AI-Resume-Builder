import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface SunsetRetroTemplateProps {
  data: ResumeData;
}

const SunsetRetroTemplateComponent: React.FC<SunsetRetroTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 text-slate-800 shadow-xl">
      {/* Funky Header */}
      <div className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 px-10 py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="relative">
          <h1 className="text-5xl font-black text-white tracking-widest mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
          <p className="text-2xl text-orange-100 font-semibold">{personalInfo.jobTitle || 'Your Job Title'}</p>
        </div>
      </div>

      {/* Bar with contact info */}
      <div className="bg-slate-900 px-10 py-4 flex flex-wrap justify-center gap-8 text-sm text-white">
        {personalInfo.location && (
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-orange-400" />
            {personalInfo.location}
          </div>
        )}
        {personalInfo.email && (
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-pink-400" />
            <span className="break-all">{personalInfo.email}</span>
          </div>
        )}
        {personalInfo.phone && (
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-purple-400" />
            {personalInfo.phone}
          </div>
        )}
        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-yellow-400" />
            <span className="break-all">{personalInfo.linkedin || personalInfo.website}</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-10 py-10">
        <div className="lg:col-span-2 space-y-8">
          {personalInfo.summary && (
            <div className="bg-white rounded-2xl p-6 border-2 border-orange-200 shadow-md">
              <h3 className="text-xl font-black text-orange-800 mb-4 uppercase tracking-wider">Professional Summary</h3>
              <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border-2 border-pink-200 shadow-md">
              <h3 className="text-xl font-black text-pink-800 mb-6 uppercase tracking-wider">Experience</h3>
              <div className="space-y-7">
                {experience.map((exp) => (
                  <div key={exp.id} className="pb-6 border-b border-pink-100 last:pb-0 last:border-0">
                    <div className="flex justify-between items-baseline mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{exp.role || 'Job Title'}</h4>
                        <p className="text-pink-700 font-semibold">{exp.company || 'Company Name'}</p>
                      </div>
                      <span className="text-sm text-slate-600 bg-gradient-to-r from-orange-100 to-pink-100 px-3 py-1 rounded-full font-medium">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-md">
              <h3 className="text-xl font-black text-purple-800 mb-5 uppercase tracking-wider">Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-gradient-to-br from-orange-50 to-pink-50 p-5 rounded-xl border border-orange-200">
                    <h4 className="font-bold text-slate-900">{proj.name || 'Project Name'}</h4>
                    {proj.link && (
                      <a href={proj.link} className="text-xs text-orange-700 hover:underline mt-1 block break-all" target="_blank" rel="noopener noreferrer">
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

        <div className="lg:col-span-1 space-y-8">
          {skills.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border-2 border-yellow-200 shadow-md">
              <h3 className="text-xl font-black text-yellow-800 mb-4 uppercase tracking-wider">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-900 rounded-full text-xs font-bold border border-yellow-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border-2 border-orange-200 shadow-md">
              <h3 className="text-xl font-black text-orange-800 mb-4 uppercase tracking-wider">Education</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="pb-3 border-b border-orange-100 last:border-0 last:pb-0">
                    <div className="font-bold text-slate-900">{edu.school || 'School Name'}</div>
                    <div className="text-orange-700">{edu.degree || 'Degree'}</div>
                    {edu.graduationDate && <div className="text-sm text-slate-600 mt-1">{edu.graduationDate}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border-2 border-pink-200 shadow-md">
              <h3 className="text-xl font-black text-pink-800 mb-4 uppercase tracking-wider">Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="pb-2 border-b border-pink-100 last:border-0 last:pb-0">
                    <div className="font-semibold text-slate-900">{cert.name || 'Certification'}</div>
                    <div className="text-sm text-slate-700">{cert.issuer || 'Issuer'}</div>
                    {cert.date && <div className="text-xs text-slate-500 mt-1">{cert.date}</div>}
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

export default React.memo(SunsetRetroTemplateComponent);
