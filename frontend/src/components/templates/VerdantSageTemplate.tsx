import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface VerdantSageTemplateProps {
  data: ResumeData;
}

const VerdantSageTemplateComponent: React.FC<VerdantSageTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-stone-50 text-slate-800 shadow-xl overflow-hidden">
      {/* Header: Full-Width Sage Bar */}
      <div className="bg-gradient-to-r from-sage-700 via-emerald-700 to-sage-700 text-white px-10 py-10">
        <div className="flex items-center justify-between gap-8">
          <div className="flex-grow">
            <h1 className="text-5xl font-black tracking-tight">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-2xl text-emerald-200 mt-2 font-medium">{personalInfo.jobTitle || 'Your Job Title'}</p>
          </div>
          {personalInfo.photoUrl ? (
            <div className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl overflow-hidden flex-shrink-0">
              <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl overflow-hidden flex-shrink-0">
              <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Main: 2-Column Grid with Centered Divider */}
      <div className="grid grid-cols-12 gap-8 px-10 py-10">
        {/* Left Column: Summary, Experience, Projects */}
        <div className="col-span-7 space-y-8">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-sage-100">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-sage-500 rounded-full"></div>
                Professional Summary
              </h3>
              <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience Timeline */}
          {experience.length > 0 && (
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-sage-100">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-sage-500 rounded-full"></div>
                Experience
              </h3>
              <div className="relative border-l-2 border-emerald-300 pl-8 ml-4 space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute -left-10 top-0 w-4 h-4 bg-gradient-to-br from-emerald-500 to-sage-500 rounded-full border-4 border-white shadow-sm"></div>
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
        </div>

        {/* Right Column: Contact, Skills, Education, Certifications */}
        <div className="col-span-5 space-y-8">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100">
            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-800 mb-4 pb-2 border-b border-emerald-200">Contact</h3>
            <div className="space-y-3 text-sm">
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-emerald-600" />
                  {personalInfo.location}
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-emerald-600" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-emerald-600" />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-emerald-600" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-emerald-600" />
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-800 mb-4 pb-2 border-b border-emerald-200">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200 rounded-full text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-800 mb-4 pb-2 border-b border-emerald-200">Education</h3>
              <div className="space-y-4 text-sm">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900">{edu.school}</div>
                    <div className="text-emerald-700">{edu.degree}</div>
                    {edu.graduationDate && <div className="text-slate-500 text-xs mt-1">{edu.graduationDate}</div>}
                    {edu.description && <div className="text-slate-600 text-xs mt-1">{edu.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications & Projects */}
          <div className="grid grid-cols-1 gap-4">
            {certifications.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100">
                <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-800 mb-4 pb-2 border-b border-emerald-200">Certifications</h3>
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
            {projects.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100">
                <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-800 mb-4 pb-2 border-b border-emerald-200">Featured Projects</h3>
                <div className="space-y-3 text-sm">
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <div className="font-bold text-slate-900">{proj.name}</div>
                      {proj.link && (
                        <a href={proj.link} className="text-xs text-emerald-700 hover:text-emerald-600 underline block mt-1" target="_blank" rel="noopener noreferrer">
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
    </div>
  );
};

export default React.memo(VerdantSageTemplateComponent);