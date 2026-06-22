import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe, Briefcase, GraduationCap, Award, Code } from 'lucide-react';

interface AuroraGlowTemplateProps {
  data: ResumeData;
}

const AuroraGlowTemplateComponent: React.FC<AuroraGlowTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950 text-slate-100 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-indigo-500/30 to-cyan-500/30 blur-3xl"></div>
        <div className="relative px-10 py-12 border-b border-white/10">
          <div className="flex items-center gap-8">
            {personalInfo.fullName && (
              <div className="flex-shrink-0">
                {personalInfo.photoUrl ? (
                  <div className="w-32 h-32 rounded-2xl border-2 border-white/20 shadow-xl overflow-hidden">
                    <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500/50 to-indigo-500/50 border-2 border-white/20 flex items-center justify-center">
                    <span className="text-5xl"><img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" /></span>
                  </div>
                )}
              </div>
            )}
            <div className="flex-grow">
              <h1 className="text-5xl font-black tracking-tight text-white drop-shadow-lg">{personalInfo.fullName || 'Your Full Name'}</h1>
              <p className="text-2xl text-indigo-200 mt-2 font-medium">{personalInfo.jobTitle || 'Your Job Title'}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-sm opacity-90">
                {personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-purple-400" />
                    {personalInfo.location}
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-purple-400" />
                    <span className="break-all">{personalInfo.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-8 px-10 py-10">
        {/* Left Column */}
        <div className="col-span-4 space-y-8">
          {/* Contact Info */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-purple-300 mb-4 pb-2 border-b border-purple-500/30">Get In Touch</h3>
            <div className="space-y-3 text-sm">
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-cyan-400" />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-cyan-400" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-cyan-400" />
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-purple-300 mb-4 pb-2 border-b border-purple-500/30">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-purple-500/40 to-indigo-500/40 border border-purple-500/30 rounded-full text-xs font-semibold text-purple-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-purple-300 mb-4 pb-2 border-b border-purple-500/30">Education</h3>
              <div className="space-y-4 text-sm">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-white">{edu.school}</div>
                    <div className="text-indigo-200">{edu.degree}</div>
                    {edu.graduationDate && <div className="text-cyan-400 text-xs mt-1">{edu.graduationDate}</div>}
                    {edu.description && <div className="text-slate-300 text-xs mt-1">{edu.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-purple-300 mb-4 pb-2 border-b border-purple-500/30">Certifications</h3>
              <div className="space-y-3 text-sm">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-medium text-white">{cert.name}</div>
                    <div className="text-slate-300 text-xs">{cert.issuer} • {cert.date}</div>
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
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-7 border border-white/10">
              <h3 className="text-xl font-black text-white mb-4 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full"></div>
                Professional Summary
              </h3>
              <p className="text-slate-200 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-7 border border-white/10">
              <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full"></div>
                Experience
              </h3>
              <div className="space-y-7">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-purple-500/40 pl-6 pb-6 last:pb-0">
                    <div className="flex justify-between items-baseline mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                        <p className="text-indigo-300 font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-sm text-slate-400 font-medium bg-white/5 px-3 py-1 rounded-full">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-7 border border-white/10">
              <h3 className="text-xl font-black text-white mb-5 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full"></div>
                Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 p-5 rounded-xl border border-purple-500/20">
                    <h4 className="font-bold text-white">{proj.name}</h4>
                    {proj.link && (
                      <a href={proj.link} className="text-xs text-cyan-400 hover:text-cyan-300 underline block mt-1" target="_blank" rel="noopener noreferrer">
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

export default React.memo(AuroraGlowTemplateComponent);