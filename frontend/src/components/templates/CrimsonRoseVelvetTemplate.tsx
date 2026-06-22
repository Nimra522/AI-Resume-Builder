import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface CrimsonRoseVelvetTemplateProps {
  data: ResumeData;
}

const CrimsonRoseVelvetTemplateComponent: React.FC<CrimsonRoseVelvetTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50 text-slate-800 shadow-xl overflow-hidden">
      {/* Header: Crimson Gradient with Soft Blur */}
      <div className="bg-gradient-to-r from-rose-900 via-pink-900 to-rose-900 text-white px-10 py-12 relative">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-400 via-pink-500 to-transparent"></div>
        <div className="relative flex items-center gap-8">
          {personalInfo.photoUrl ? (
            <div className="w-36 h-36 rounded-3xl border-4 border-rose-400 shadow-2xl overflow-hidden flex-shrink-0">
              <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-36 h-36 rounded-3xl border-4 border-rose-400 shadow-2xl overflow-hidden flex-shrink-0">
              <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-grow">
            <h1 className="text-5xl font-black tracking-tight">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-2xl text-rose-200 mt-2 font-medium">{personalInfo.jobTitle || 'Your Job Title'}</p>
          </div>
        </div>
      </div>

      {/* Body: Card-Based Grid Layout */}
      <div className="px-10 py-10 space-y-8">
        {/* Top Row: Summary + Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <div className="lg:col-span-2 bg-white rounded-2xl p-7 shadow-sm border border-rose-100">
              <h3 className="text-xl font-black text-rose-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full"></div>
                Professional Summary
              </h3>
              <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
            <h3 className="text-sm font-bold uppercase tracking-widest text-rose-800 mb-4 pb-2 border-b border-rose-200">Contact</h3>
            <div className="space-y-3 text-sm">
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-rose-600" />
                  {personalInfo.location}
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-rose-600" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-rose-600" />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-rose-600" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-rose-600" />
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle Row: Experience */}
        {experience.length > 0 && (
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-rose-100">
            <h3 className="text-xl font-black text-rose-900 mb-6 flex items-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full"></div>
              Experience
            </h3>
            <div className="space-y-7">
              {experience.map((exp) => (
                <div key={exp.id} className="pb-6 border-b border-rose-50 last:pb-0 last:border-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{exp.role}</h4>
                      <p className="text-rose-700 font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-sm text-slate-500 font-medium bg-rose-50 px-3 py-1 rounded-full">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Row: Skills/Education/Certifications/Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-rose-800 mb-4 pb-2 border-b border-rose-200">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 border border-rose-200 rounded-full text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-rose-800 mb-4 pb-2 border-b border-rose-200">Education</h3>
              <div className="space-y-4 text-sm">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900">{edu.school}</div>
                    <div className="text-rose-700">{edu.degree}</div>
                    {edu.graduationDate && <div className="text-slate-500 text-xs mt-1">{edu.graduationDate}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-rose-800 mb-4 pb-2 border-b border-rose-200">Certifications</h3>
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

          {/* Projects */}
          {projects.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-rose-800 mb-4 pb-2 border-b border-rose-200">Projects</h3>
              <div className="space-y-3 text-sm">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="font-bold text-slate-900">{proj.name}</div>
                    {proj.link && (
                      <a href={proj.link} className="text-xs text-rose-700 hover:text-rose-600 underline block mt-1" target="_blank" rel="noopener noreferrer">
                        {proj.link}
                      </a>
                    )}
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

export default React.memo(CrimsonRoseVelvetTemplateComponent);