import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface SlateAmberTemplateProps {
  data: ResumeData;
}

const SlateAmberTemplateComponent: React.FC<SlateAmberTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-slate-50 text-gray-900 shadow-xl">
      {/* Header */}
      <header className="bg-slate-700 text-white p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-xl text-amber-300 mt-1">{personalInfo.jobTitle || 'Your Job Title'}</p>
          </div>
          <div className="text-right text-sm space-y-2">
            {personalInfo.email && <div className="text-slate-200">{personalInfo.email}</div>}
            {personalInfo.phone && <div className="text-slate-200">{personalInfo.phone}</div>}
            {personalInfo.location && <div className="text-slate-200">{personalInfo.location}</div>}
          </div>
        </div>
      </header>

      <div className="p-8 space-y-8">
        {personalInfo.summary && <section className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-amber-500">
          <h3 className="text-lg font-bold text-slate-800 mb-3">Professional Summary</h3>
          <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
        </section>}

        {experience.length > 0 && <section>
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">EX</span>
            Experience
          </h3>
          {experience.map(exp => <div key={exp.id} className="mb-6 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-baseline mb-2">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{exp.jobTitle}</h4>
                <p className="text-amber-700 font-semibold">{exp.company}</p>
              </div>
              <span className="text-sm text-slate-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
            </div>
            <p className="text-slate-700 whitespace-pre-wrap">{exp.description}</p>
          </div>)}
        </section>}

        <div className="grid grid-cols-3 gap-6">
          {skills.length > 0 && <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-700 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">{skill}</span>)}
            </div>
          </div>}

          {education.length > 0 && <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-700 mb-4">Education</h3>
            {education.map(edu => <div key={edu.id} className="mb-3 last:mb-0">
              <div className="font-semibold text-slate-900 text-sm">{edu.school}</div>
              <div className="text-xs text-slate-600">{edu.degree} • {edu.graduationDate}</div>
            </div>)}
          </div>}

          {(projects.length > 0 || certifications.length > 0) && <div className="bg-white rounded-xl p-6 shadow-sm">
            {projects.length > 0 && <div className="mb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-700 mb-2">Projects</h3>
              {projects.slice(0, 2).map(proj => <div key={proj.id} className="mb-1 text-xs">
                <span className="font-semibold">{proj.name}</span>
              </div>)}
            </div>}
            {certifications.length > 0 && <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-700 mb-2">Certifications</h3>
              {certifications.slice(0, 2).map(cert => <div key={cert.id} className="mb-1 text-xs">
                <span className="font-semibold">{cert.name}</span>
              </div>)}
            </div>}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SlateAmberTemplateComponent);
