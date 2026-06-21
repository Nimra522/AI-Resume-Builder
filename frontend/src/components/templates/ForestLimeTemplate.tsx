import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface ForestLimeTemplateProps {
  data: ResumeData;
}

const ForestLimeTemplateComponent: React.FC<ForestLimeTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-900 shadow-xl flex">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gradient-to-b from-emerald-800 to-green-800 text-white p-8">
        <h2 className="text-3xl font-black mb-2">{personalInfo.fullName || 'Your Full Name'}</h2>
        <p className="text-lg text-emerald-100 mb-6">{personalInfo.jobTitle || 'Your Job Title'}</p>
        
        <div className="space-y-3 text-sm opacity-90 mb-8">
          {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={14} /> {personalInfo.location}</div>}
          {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} /> <span className="break-all">{personalInfo.email}</span></div>}
          {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} /> {personalInfo.phone}</div>}
        </div>
        
        {skills.length > 0 && <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-emerald-100 mb-3 border-b border-emerald-400 pb-1">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-medium">{skill}</span>)}
          </div>
        </div>}

        {education.length > 0 && <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-emerald-100 mb-3 border-b border-emerald-400 pb-1">Education</h3>
          {education.map(edu => <div key={edu.id} className="mb-3">
            <div className="font-semibold text-sm">{edu.school}</div>
            <div className="text-xs text-emerald-200">{edu.degree}</div>
            <div className="text-xs opacity-80">{edu.graduationDate}</div>
          </div>)}
        </div>}
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-10 space-y-8">
        {personalInfo.summary && <section className="bg-emerald-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-emerald-800 mb-3">Professional Summary</h3>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>}

        {experience.length > 0 && <section>
          <h3 className="text-xl font-bold text-emerald-800 mb-4">Experience</h3>
          {experience.map(exp => <div key={exp.id} className="mb-6 border-l-3 border-lime-500 pl-5">
            <div className="flex justify-between items-baseline mb-2">
              <div>
                <h4 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h4>
                <p className="text-lime-700 font-semibold">{exp.company}</p>
              </div>
              <span className="text-sm text-gray-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{exp.description}</p>
          </div>)}
        </section>}

        <div className="grid grid-cols-2 gap-6">
          {projects.length > 0 && <section>
            <h3 className="text-lg font-bold text-emerald-800 mb-4">Projects</h3>
            {projects.map(proj => <div key={proj.id} className="bg-lime-50 rounded-lg p-4 mb-3">
              <h4 className="font-semibold text-gray-900">{proj.name}</h4>
              {proj.link && <a href={proj.link} className="text-xs text-lime-700 underline">{proj.link}</a>}
              <p className="text-sm text-gray-700 mt-2">{proj.description}</p>
            </div>)}
          </section>}

          {certifications.length > 0 && <section>
            <h3 className="text-lg font-bold text-emerald-800 mb-4">Certifications</h3>
            {certifications.map(cert => <div key={cert.id} className="bg-emerald-50 rounded-lg p-4 mb-3">
              <h4 className="font-semibold text-gray-900 text-sm">{cert.name}</h4>
              <div className="text-xs text-gray-600">{cert.organization} • {cert.date}</div>
            </div>)}
          </section>}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ForestLimeTemplateComponent);
