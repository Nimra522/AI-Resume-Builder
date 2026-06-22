import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface CharcoalAmberNoirTemplateProps {
  data: ResumeData;
}

const CharcoalAmberNoirTemplateComponent: React.FC<CharcoalAmberNoirTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-slate-950 text-slate-100 shadow-xl overflow-hidden">
      {/* Header: Full-Height Left Sidebar */}
      <div className="flex">
        {/* Left Sidebar: Charcoal with Amber Accents */}
        <div className="w-1/3 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white px-8 py-10">
          {/* Photo/Name/Job Title */}
          <div className="mb-10">
            {personalInfo.photoUrl ? (
            <div className="w-36 h-36 rounded-3xl mx-auto border-4 border-amber-500 shadow-2xl shadow-amber-500/10 overflow-hidden mb-6">
              <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-36 h-36 rounded-3xl mx-auto border-4 border-amber-500 shadow-2xl shadow-amber-500/10 overflow-hidden mb-6">
              <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
            <h1 className="text-3xl font-black text-center leading-tight">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-amber-300 text-center text-lg font-medium mt-2">{personalInfo.jobTitle || 'Your Job Title'}</p>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 pb-2 border-b border-amber-900/50">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              {personalInfo.location && (
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin size={16} className="text-amber-500" />
                  {personalInfo.location}
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail size={16} className="text-amber-500" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone size={16} className="text-amber-500" />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-3 text-slate-300">
                  <Globe size={16} className="text-amber-500" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-3 text-slate-300">
                  <Globe size={16} className="text-amber-500" />
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 pb-2 border-b border-amber-900/50">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-amber-900/50 to-slate-800/50 text-amber-200 border border-amber-800/50 rounded-full text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 pb-2 border-b border-amber-900/50">Education</h3>
              <div className="space-y-4 text-sm">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-amber-200">{edu.school}</div>
                    <div className="text-amber-400">{edu.degree}</div>
                    {edu.graduationDate && <div className="text-slate-400 text-xs mt-1">{edu.graduationDate}</div>}
                    {edu.description && <div className="text-slate-300 text-xs mt-1">{edu.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 pb-2 border-b border-amber-900/50">Certifications</h3>
              <div className="space-y-3 text-sm">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-medium text-amber-200">{cert.name}</div>
                    <div className="text-slate-400 text-xs">{cert.issuer} • {cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content Area: Light Charcoal */}
        <div className="w-2/3 bg-slate-900 px-10 py-10">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <div className="mb-8 bg-slate-800/50 rounded-2xl p-7 border border-slate-700">
              <h3 className="text-xl font-black text-amber-300 mb-4 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                Professional Summary
              </h3>
              <p className="text-slate-300 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8 bg-slate-800/50 rounded-2xl p-7 border border-slate-700">
              <h3 className="text-xl font-black text-amber-300 mb-6 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                Experience
              </h3>
              <div className="space-y-7">
                {experience.map((exp) => (
                  <div key={exp.id} className="pb-6 border-b border-slate-700 last:pb-0 last:border-0">
                    <div className="flex justify-between items-baseline mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                        <p className="text-amber-500 font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-sm text-slate-400 font-medium bg-amber-900/30 px-3 py-1 rounded-full">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="bg-slate-800/50 rounded-2xl p-7 border border-slate-700">
              <h3 className="text-xl font-black text-amber-300 mb-5 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-5 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-amber-200">{proj.name}</h4>
                    {proj.link && (
                      <a href={proj.link} className="text-xs text-amber-500 hover:text-amber-400 underline block mt-1" target="_blank" rel="noopener noreferrer">
                        {proj.link}
                      </a>
                    )}
                    {proj.description && <p className="text-xs text-slate-300 mt-2">{proj.description}</p>}
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

export default React.memo(CharcoalAmberNoirTemplateComponent);