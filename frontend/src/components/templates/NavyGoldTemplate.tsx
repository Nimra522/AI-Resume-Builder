import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface NavyGoldTemplateProps {
  data: ResumeData;
}

const NavyGoldTemplateComponent: React.FC<NavyGoldTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-slate-50 text-gray-900 shadow-xl">
      {/* Header */}
      <header className="bg-slate-900 text-white p-8 border-b-4 border-amber-500">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-xl text-amber-300 mt-1">{personalInfo.jobTitle || 'Your Job Title'}</p>
          </div>
          <div className="text-right text-sm space-y-2">
            {personalInfo.email && <div className="text-slate-300">{personalInfo.email}</div>}
            {personalInfo.phone && <div className="text-slate-300">{personalInfo.phone}</div>}
            {personalInfo.location && <div className="text-slate-300">{personalInfo.location}</div>}
          </div>
        </div>
      </header>

      <div className="p-8 grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-4 space-y-8">
          {skills.length > 0 && <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 mb-4 border-b border-slate-200 pb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-amber-100 text-amber-800 rounded text-xs font-semibold">{skill}</span>)}
            </div>
          </div>}

          {education.length > 0 && <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 mb-4 border-b border-slate-200 pb-2">Education</h3>
            {education.map(edu => <div key={edu.id} className="mb-4 last:mb-0">
              <div className="font-semibold text-slate-900">{edu.school}</div>
              <div className="text-sm text-slate-700">{edu.degree}</div>
              <div className="text-xs text-amber-600">{edu.graduationDate}</div>
            </div>)}
          </div>}

          {certifications.length > 0 && <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 mb-4 border-b border-slate-200 pb-2">Certifications</h3>
            {certifications.map(cert => <div key={cert.id} className="mb-3 last:mb-0">
              <div className="font-semibold text-slate-900 text-sm">{cert.name}</div>
              <div className="text-xs text-slate-600">{cert.organization} • {cert.date}</div>
            </div>)}
          </div>}
        </div>

        {/* Right Column */}
        <div className="col-span-8 space-y-8">
          {personalInfo.summary && <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-amber-500 pl-3">Professional Summary</h3>
            <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
          </div>}

          {experience.length > 0 && <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-amber-500 pl-3">Experience</h3>
            {experience.map(exp => <div key={exp.id} className="mb-6 last:mb-0 border-b border-slate-100 last:border-0 pb-6 last:pb-0">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{exp.jobTitle}</h4>
                  <p className="text-amber-700 font-semibold">{exp.company}</p>
                </div>
                <span className="text-sm text-slate-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-slate-700 whitespace-pre-wrap">{exp.description}</p>
            </div>)}
          </div>}

          {projects.length > 0 && <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-amber-500 pl-3">Projects</h3>
            <div className="grid grid-cols-2 gap-4">
              {projects.map(proj => <div key={proj.id} className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900">{proj.name}</h4>
                {proj.link && <a href={proj.link} className="text-xs text-amber-700 underline">{proj.link}</a>}
                <p className="text-sm text-slate-600 mt-2">{proj.description}</p>
              </div>)}
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default React.memo(NavyGoldTemplateComponent);
