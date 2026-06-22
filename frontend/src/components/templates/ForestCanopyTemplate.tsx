import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface ForestCanopyTemplateProps {
  data: ResumeData;
}

const ForestCanopyTemplateComponent: React.FC<ForestCanopyTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-emerald-50 text-slate-800 shadow-xl">
      {/* Sidebar Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white px-8 py-10">
          {/* Photo & Name */}
          <div className="mb-10">
            {personalInfo.photoUrl ? (
              <div className="w-36 h-36 rounded-full mx-auto border-4 border-emerald-600 shadow-emerald-500/30 overflow-hidden mb-6">
                <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-36 h-36 rounded-full mx-auto border-4 border-emerald-600 shadow-emerald-500/30 overflow-hidden mb-6">
                <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <h1 className="text-3xl font-black text-center leading-tight">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-emerald-200 text-center text-lg font-medium mt-2">{personalInfo.jobTitle || 'Your Job Title'}</p>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-4 pb-2 border-b border-emerald-700/50">Contact</h3>
            <div className="space-y-3 text-sm">
              {personalInfo.location && (
                <div className="flex items-center gap-3 text-emerald-100">
                  <MapPin size={16} className="text-emerald-400" />
                  {personalInfo.location}
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-3 text-emerald-100">
                  <Mail size={16} className="text-emerald-400" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-3 text-emerald-100">
                  <Phone size={16} className="text-emerald-400" />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-3 text-emerald-100">
                  <Globe size={16} className="text-emerald-400" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-3 text-emerald-100">
                  <Globe size={16} className="text-emerald-400" />
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-4 pb-2 border-b border-emerald-700/50">Skills</h3>
              <div className="space-y-2">
                {skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-emerald-400 to-green-400"></div>
                    <span className="text-sm text-emerald-100">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-4 pb-2 border-b border-emerald-700/50">Education</h3>
              <div className="space-y-4 text-sm">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-semibold text-emerald-50">{edu.school}</div>
                    <div className="text-emerald-200">{edu.degree}</div>
                    {edu.graduationDate && <div className="text-emerald-400 text-xs">{edu.graduationDate}</div>}
                    {edu.description && <div className="text-emerald-300 text-xs mt-1">{edu.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-4 pb-2 border-b border-emerald-700/50">Certifications</h3>
              <div className="space-y-3 text-sm">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-medium text-emerald-50">{cert.name}</div>
                    <div className="text-emerald-300 text-xs">{cert.issuer} • {cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content Area */}
        <div className="w-2/3 px-10 py-10">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <div className="mb-8 bg-white rounded-2xl p-8 shadow-sm border border-emerald-100">
              <h3 className="text-xl font-black text-emerald-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-600 to-green-600 rounded-full"></div>
                Professional Summary
              </h3>
              <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8 bg-white rounded-2xl p-8 shadow-sm border border-emerald-100">
              <h3 className="text-xl font-black text-emerald-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-600 to-green-600 rounded-full"></div>
                Experience
              </h3>
              <div className="space-y-7">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-emerald-200 pl-6 pb-6 last:pb-0">
                    <div className="flex justify-between items-baseline mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{exp.role}</h4>
                        <p className="text-emerald-700 font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-sm text-slate-500 font-medium bg-emerald-50 px-3 py-1 rounded-full">
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
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-emerald-100">
              <h3 className="text-xl font-black text-emerald-900 mb-5 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-600 to-green-600 rounded-full"></div>
                Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-gradient-to-br from-emerald-50 to-green-50 p-5 rounded-xl border border-emerald-100">
                    <h4 className="font-bold text-emerald-900">{proj.name}</h4>
                    {proj.link && (
                      <a href={proj.link} className="text-xs text-emerald-700 hover:text-emerald-600 underline block mt-1" target="_blank" rel="noopener noreferrer">
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

export default React.memo(ForestCanopyTemplateComponent);