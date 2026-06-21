import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface EmeraldExecutiveTemplateProps {
  data: ResumeData;
}

const EmeraldExecutiveTemplateComponent: React.FC<EmeraldExecutiveTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-900 shadow-xl">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white p-10 text-center">
        <h1 className="text-5xl font-black mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-2xl text-emerald-100">{personalInfo.jobTitle || 'Your Job Title'}</p>
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm opacity-90">
          {personalInfo.email && <div className="flex items-center gap-2"><Mail size={16} /> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={16} /> {personalInfo.phone}</div>}
          {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={16} /> {personalInfo.location}</div>}
        </div>
      </header>

      <div className="p-10 grid grid-cols-12 gap-10">
        {/* Left Column */}
        <div className="col-span-4 space-y-8">
          {skills.length > 0 && <section>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-emerald-700 mb-4 border-b-2 border-emerald-200 pb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">{skill}</span>)}
            </div>
          </section>}

          {education.length > 0 && <section>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-emerald-700 mb-4 border-b-2 border-emerald-200 pb-2">Education</h3>
            {education.map(edu => <div key={edu.id} className="mb-4">
              <div className="font-semibold text-gray-900">{edu.school}</div>
              <div className="text-sm text-gray-700">{edu.degree}</div>
              <div className="text-xs text-gray-500">{edu.graduationDate}</div>
            </div>)}
          </section>}

          {certifications.length > 0 && <section>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-emerald-700 mb-4 border-b-2 border-emerald-200 pb-2">Certifications</h3>
            {certifications.map(cert => <div key={cert.id} className="mb-3">
              <div className="font-semibold text-gray-900">{cert.name}</div>
              <div className="text-sm text-gray-700">{cert.organization}</div>
              <div className="text-xs text-gray-500">{cert.date}</div>
            </div>)}
          </section>}
        </div>

        {/* Right Column */}
        <div className="col-span-8 space-y-8">
          {personalInfo.summary && <section>
            <h3 className="text-xl font-bold text-emerald-800 mb-3">Professional Summary</h3>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>}

          {experience.length > 0 && <section>
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Experience</h3>
            {experience.map(exp => <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h4>
                  <p className="text-emerald-700 font-semibold">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{exp.description}</p>
            </div>)}
          </section>}

          {projects.length > 0 && <section>
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Projects</h3>
            {projects.map(proj => <div key={proj.id} className="mb-4">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">{proj.name}</h4>
                {proj.link && <a href={proj.link} className="text-xs text-emerald-600 underline">{proj.link}</a>}
              </div>
              <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
            </div>)}
          </section>}
        </div>
      </div>
    </div>
  );
};

export default React.memo(EmeraldExecutiveTemplateComponent);
