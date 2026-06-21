import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface IndigoTimelineProTemplateProps {
  data: ResumeData;
}

const IndigoTimelineProTemplateComponent: React.FC<IndigoTimelineProTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-900 shadow-xl">
      {/* Header */}
      <header className="bg-indigo-900 text-white p-10 text-center">
        <h1 className="text-5xl font-black mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-2xl text-indigo-200">{personalInfo.jobTitle || 'Your Job Title'}</p>
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm opacity-90">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
        </div>
      </header>

      <div className="p-10 grid grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="col-span-8 space-y-8">
          {personalInfo.summary && <section>
            <h3 className="text-xl font-bold text-indigo-700 mb-3">Summary</h3>
            <p className="text-gray-700 text-lg leading-relaxed">{personalInfo.summary}</p>
          </section>}

          {experience.length > 0 && <section>
            <h3 className="text-xl font-bold text-indigo-700 mb-4">Experience</h3>
            {experience.map(exp => <div key={exp.id} className="relative pl-6 mb-6 border-l-2 border-indigo-400 last:pb-0">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-600 rounded-full border-2 border-white"></div>
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h4>
                  <p className="text-indigo-600">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{exp.description}</p>
            </div>)}
          </section>}

          {projects.length > 0 && <section>
            <h3 className="text-xl font-bold text-indigo-700 mb-3">Projects</h3>
            {projects.map(proj => <div key={proj.id} className="mb-2">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">{proj.name}</h4>
                {proj.link && <a href={proj.link} className="text-xs text-indigo-600 underline">{proj.link}</a>}
              </div>
              <p className="text-sm text-gray-700">{proj.description}</p>
            </div>)}
          </section>}
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-8">
          {skills.length > 0 && <section>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-indigo-700 mb-3 border-b border-indigo-200 pb-1">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">{skill}</span>)}
            </div>
          </section>}

          {education.length > 0 && <section>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-indigo-700 mb-3 border-b border-indigo-200 pb-1">Education</h3>
            {education.map(edu => <div key={edu.id} className="mb-3">
              <div className="font-semibold text-gray-900">{edu.school}</div>
              <div className="text-sm text-gray-700">{edu.degree}</div>
              <div className="text-xs text-gray-500">{edu.graduationDate}</div>
            </div>)}
          </section>}

          {certifications.length > 0 && <section>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-indigo-700 mb-3 border-b border-indigo-200 pb-1">Certifications</h3>
            {certifications.map(cert => <div key={cert.id} className="mb-2">
              <p className="text-sm text-gray-700"><span className="font-semibold">{cert.name}</span>, {cert.organization} ({cert.date})</p>
            </div>)}
          </section>}
        </div>
      </div>
    </div>
  );
};

export default React.memo(IndigoTimelineProTemplateComponent);
