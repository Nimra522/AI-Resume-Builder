import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface TealCyanTemplateProps {
  data: ResumeData;
}

const TealCyanTemplateComponent: React.FC<TealCyanTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-teal-50 text-gray-900 shadow-xl">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-black">{personalInfo.fullName || 'Your Full Name'}</h1>
          <p className="text-xl text-teal-100 mt-2">{personalInfo.jobTitle || 'Your Job Title'}</p>
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm opacity-95">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
          </div>
        </div>
      </header>

      <div className="p-8 space-y-8">
        {personalInfo.summary && <section className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-teal-500">
          <h3 className="text-lg font-bold text-teal-800 mb-3">Professional Summary</h3>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>}

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-7 space-y-8">
            {experience.length > 0 && <section className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-teal-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
                Experience
              </h3>
              {experience.map(exp => <div key={exp.id} className="mb-6 last:mb-0 border-b border-teal-50 last:border-0 pb-6 last:pb-0">
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h4>
                    <p className="text-teal-700 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{exp.description}</p>
              </div>)}
            </section>}

            {projects.length > 0 && <section className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-teal-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-cyan-500 rounded-full"></span>
                Projects
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {projects.map(proj => <div key={proj.id} className="bg-cyan-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">{proj.name}</h4>
                  {proj.link && <a href={proj.link} className="text-xs text-cyan-700 underline">{proj.link}</a>}
                  <p className="text-sm text-gray-700 mt-2">{proj.description}</p>
                </div>)}
              </div>
            </section>}
          </div>

          {/* Right Column */}
          <div className="col-span-5 space-y-8">
            {skills.length > 0 && <section className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-teal-700 mb-4 border-b border-teal-100 pb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-semibold">{skill}</span>)}
              </div>
            </section>}

            {education.length > 0 && <section className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-teal-700 mb-4 border-b border-teal-100 pb-2">Education</h3>
              {education.map(edu => <div key={edu.id} className="mb-4 last:mb-0">
                <div className="font-semibold text-gray-900">{edu.school}</div>
                <div className="text-sm text-gray-700">{edu.degree}</div>
                <div className="text-xs text-teal-600">{edu.graduationDate}</div>
              </div>)}
            </section>}

            {certifications.length > 0 && <section className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-teal-700 mb-4 border-b border-teal-100 pb-2">Certifications</h3>
              {certifications.map(cert => <div key={cert.id} className="mb-3 last:mb-0">
                <div className="font-semibold text-gray-900 text-sm">{cert.name}</div>
                <div className="text-xs text-gray-600">{cert.organization} • {cert.date}</div>
              </div>)}
            </section>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TealCyanTemplateComponent);
