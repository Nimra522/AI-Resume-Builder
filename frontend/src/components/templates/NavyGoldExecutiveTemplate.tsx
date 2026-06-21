import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface NavyGoldExecutiveTemplateProps {
  data: ResumeData;
}

const NavyGoldExecutiveTemplateComponent: React.FC<NavyGoldExecutiveTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-slate-50 text-gray-900 shadow-xl">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-5xl font-black">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-2xl text-amber-400 mt-2">{personalInfo.jobTitle || 'Your Job Title'}</p>
          </div>
          <div className="text-right text-sm space-y-2 mt-4 md:mt-0">
            {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} /> {personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} /> {personalInfo.phone}</div>}
            {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={14} /> {personalInfo.location}</div>}
            {personalInfo.linkedin && <div className="flex items-center gap-2"><Globe size={14} /> {personalInfo.linkedin}</div>}
          </div>
        </div>
      </header>

      <div className="p-10 grid grid-cols-12 gap-10">
        {/* Left Column */}
        <div className="col-span-4 space-y-8">
          {skills.length > 0 && (
            <section className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-amber-500">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-800 mb-4 border-b border-slate-200 pb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-medium">{skill}</span>)}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-amber-500">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-800 mb-4 border-b border-slate-200 pb-2">Education</h3>
              {education.map(edu => (
                <div key={edu.id} className="mb-4 last:mb-0">
                  <div className="font-semibold text-slate-900">{edu.school}</div>
                  <div className="text-sm text-slate-700">{edu.degree}</div>
                  <div className="text-xs text-amber-700">{edu.graduationDate}</div>
                </div>
              ))}
            </section>
          )}

          {certifications.length > 0 && (
            <section className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-amber-500">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-800 mb-4 border-b border-slate-200 pb-2">Certifications</h3>
              {certifications.map(cert => (
                <div key={cert.id} className="mb-3 last:mb-0">
                  <div className="font-semibold text-slate-900 text-sm">{cert.name}</div>
                  <div className="text-xs text-slate-600">{cert.organization} • {cert.date}</div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-8 space-y-8">
          {personalInfo.summary && (
            <section className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-amber-500">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Professional Summary</h3>
              <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-amber-500">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Experience</h3>
              {experience.map(exp => (
                <div key={exp.id} className="mb-6 last:mb-0 border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{exp.jobTitle}</h4>
                      <p className="text-amber-700 font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-sm text-slate-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-slate-700 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-amber-500">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map(proj => (
                  <div key={proj.id} className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900">{proj.name}</h4>
                    {proj.link && <a href={proj.link} className="text-xs text-amber-700 underline">{proj.link}</a>}
                    <p className="text-sm text-slate-700 mt-2">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(NavyGoldExecutiveTemplateComponent);
