import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe, Mountain } from 'lucide-react';

interface CrimsonSummitTemplateProps {
  data: ResumeData;
}

const CrimsonSummitTemplateComponent: React.FC<CrimsonSummitTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-rose-50 text-slate-800 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-900 via-red-900 to-rose-900 text-white px-10 py-12 border-b-4 border-orange-500">
        <div className="flex items-center gap-8">
          {personalInfo.photoUrl ? (
            <div className="w-32 h-32 rounded-3xl border-4 border-orange-500 shadow-2xl overflow-hidden flex-shrink-0">
              <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-3xl border-4 border-orange-500 shadow-2xl overflow-hidden flex-shrink-0">
              <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-grow">
            <h1 className="text-5xl font-black tracking-tight">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-2xl text-orange-200 mt-2 font-medium">{personalInfo.jobTitle || 'Your Job Title'}</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-8 px-10 py-10">
        {/* Left Column */}
        <div className="col-span-4 space-y-8">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
            <h3 className="text-sm font-bold uppercase tracking-widest text-rose-700 mb-4 pb-2 border-b border-orange-200">Contact</h3>
            <div className="space-y-3 text-sm">
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-orange-600" />
                  {personalInfo.location}
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-orange-600" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-orange-600" />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-orange-600" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-orange-600" />
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-rose-700 mb-4 pb-2 border-b border-orange-200">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-orange-100 to-rose-100 text-rose-800 border border-orange-200 rounded-full text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-rose-700 mb-4 pb-2 border-b border-orange-200">Education</h3>
              <div className="space-y-4 text-sm">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900">{edu.school}</div>
                    <div className="text-orange-700">{edu.degree}</div>
                    {edu.graduationDate && <div className="text-slate-500 text-xs mt-1">{edu.graduationDate}</div>}
                    {edu.description && <div className="text-slate-600 text-xs mt-1">{edu.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-rose-700 mb-4 pb-2 border-b border-orange-200">Certifications</h3>
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
          {/* Summary */}
          {personalInfo.summary && (
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-orange-100">
              <h3 className="text-xl font-black text-rose-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-rose-500 rounded-full"></div>
                Professional Summary
              </h3>
              <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience Timeline */}
          {experience.length > 0 && (
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-orange-100">
              <h3 className="text-xl font-black text-rose-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-rose-500 rounded-full"></div>
                Experience
              </h3>
              <div className="relative border-l-2 border-orange-300 pl-8 ml-4 space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute -left-10 top-0 w-4 h-4 bg-gradient-to-br from-orange-500 to-rose-500 rounded-full border-4 border-white shadow-sm"></div>
                    <div className="flex justify-between items-baseline mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{exp.role}</h4>
                        <p className="text-orange-700 font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-sm text-slate-500 font-medium bg-orange-50 px-3 py-1 rounded-full">
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
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-orange-100">
              <h3 className="text-xl font-black text-rose-900 mb-5 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-rose-500 rounded-full"></div>
                Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-gradient-to-br from-orange-50 to-rose-50 p-5 rounded-xl border border-orange-100">
                    <h4 className="font-bold text-rose-900">{proj.name}</h4>
                    {proj.link && (
                      <a href={proj.link} className="text-xs text-orange-700 hover:text-orange-600 underline block mt-1" target="_blank" rel="noopener noreferrer">
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

export default React.memo(CrimsonSummitTemplateComponent);