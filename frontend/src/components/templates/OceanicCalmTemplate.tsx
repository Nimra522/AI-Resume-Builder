import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface OceanicCalmTemplateProps {
  data: ResumeData;
}

const OceanicCalmTemplateComponent: React.FC<OceanicCalmTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-50 text-slate-800 shadow-xl overflow-hidden">
      {/* Header with Wave Gradient */}
      <div className="relative bg-gradient-to-r from-teal-800 via-cyan-700 to-teal-800 text-white px-10 py-12">
        <div className="relative flex items-center gap-8">
          {personalInfo.photoUrl ? (
            <div className="w-36 h-36 rounded-3xl border-4 border-white shadow-xl overflow-hidden flex-shrink-0">
              <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-36 h-36 rounded-3xl border-4 border-white shadow-xl overflow-hidden flex-shrink-0">
              <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-grow">
            <h1 className="text-5xl font-black tracking-tight">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-2xl text-cyan-200 mt-2 font-medium">{personalInfo.jobTitle || 'Your Job Title'}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500"></div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-8 px-10 py-10">
        {/* Left Column */}
        <div className="col-span-4 space-y-8">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-cyan-100">
            <h3 className="text-sm font-bold uppercase tracking-widest text-teal-700 mb-4 pb-2 border-b border-cyan-200">Contact</h3>
            <div className="space-y-3 text-sm">
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-cyan-600" />
                  {personalInfo.location}
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-cyan-600" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-cyan-600" />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-cyan-600" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-cyan-600" />
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-cyan-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-teal-700 mb-4 pb-2 border-b border-cyan-200">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-cyan-100 to-teal-100 text-teal-800 border border-cyan-200 rounded-full text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-cyan-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-teal-700 mb-4 pb-2 border-b border-cyan-200">Education</h3>
              <div className="space-y-4 text-sm">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900">{edu.school}</div>
                    <div className="text-teal-700">{edu.degree}</div>
                    {edu.graduationDate && <div className="text-slate-500 text-xs mt-1">{edu.graduationDate}</div>}
                    {edu.description && <div className="text-slate-600 text-xs mt-1">{edu.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-cyan-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-teal-700 mb-4 pb-2 border-b border-cyan-200">Certifications</h3>
              <div className="space-y-3 text-sm">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-medium text-slate-900">{cert.name}</div>
                    <div className="text-slate-600 text-xs">{cert.issuer} • {cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-8 space-y-8">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-cyan-100">
              <h3 className="text-xl font-black text-teal-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full"></div>
                Professional Summary
              </h3>
              <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-cyan-100">
              <h3 className="text-xl font-black text-teal-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full"></div>
                Experience
              </h3>
              <div className="space-y-7">
                {experience.map((exp) => (
                  <div key={exp.id} className="pb-6 border-b border-cyan-100 last:pb-0 last:border-0">
                    <div className="flex justify-between items-baseline mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{exp.role}</h4>
                        <p className="text-cyan-700 font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-sm text-slate-500 font-medium bg-cyan-50 px-3 py-1 rounded-full">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-cyan-100">
              <h3 className="text-xl font-black text-teal-900 mb-5 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full"></div>
                Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-gradient-to-br from-cyan-50 to-teal-50 p-5 rounded-xl border border-cyan-100">
                    <h4 className="font-bold text-teal-900">{proj.name}</h4>
                    {proj.link && (
                      <a href={proj.link} className="text-xs text-cyan-700 hover:text-cyan-600 underline block mt-1" target="_blank" rel="noopener noreferrer">
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
    </div>
  );
};

export default React.memo(OceanicCalmTemplateComponent);