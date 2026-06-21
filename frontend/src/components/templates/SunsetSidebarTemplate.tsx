import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface SunsetSidebarTemplateProps {
  data: ResumeData;
}

const SunsetSidebarTemplateComponent: React.FC<SunsetSidebarTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-900 shadow-xl flex">
      {/* Main Content */}
      <div className="w-2/3 p-10 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900">{personalInfo.fullName || 'Your Full Name'}</h1>
          <p className="text-xl text-orange-600">{personalInfo.jobTitle || 'Your Job Title'}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
            {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} /> {personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} /> {personalInfo.phone}</div>}
            {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={14} /> {personalInfo.location}</div>}
          </div>
        </div>

        {personalInfo.summary && <section>
          <h3 className="text-lg font-bold text-orange-700 mb-3 border-l-4 border-orange-500 pl-3">Professional Summary</h3>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>}

        {experience.length > 0 && <section>
          <h3 className="text-lg font-bold text-orange-700 mb-4 border-l-4 border-orange-500 pl-3">Experience</h3>
          {experience.map(exp => <div key={exp.id} className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <div>
                <h4 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h4>
                <p className="text-orange-600 font-semibold">{exp.company}</p>
              </div>
              <span className="text-sm text-gray-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{exp.description}</p>
          </div>)}
        </section>}

        {projects.length > 0 && <section>
          <h3 className="text-lg font-bold text-orange-700 mb-4 border-l-4 border-orange-500 pl-3">Projects</h3>
          {projects.map(proj => <div key={proj.id} className="mb-4">
            <h4 className="font-semibold text-gray-900">{proj.name}</h4>
            {proj.link && <a href={proj.link} className="text-sm text-orange-600 underline">{proj.link}</a>}
            <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
          </div>)}
        </section>}
      </div>

      {/* Right Sidebar (Sunset Gradient) */}
      <div className="w-1/3 bg-gradient-to-b from-orange-500 via-pink-500 to-purple-500 text-white p-10">
        {skills.length > 0 && <div className="mb-10">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-orange-100 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-medium">{skill}</span>)}
          </div>
        </div>}

        {education.length > 0 && <div className="mb-10">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-orange-100 mb-4">Education</h3>
          {education.map(edu => <div key={edu.id} className="mb-4">
            <div className="font-semibold">{edu.school}</div>
            <div className="text-sm text-orange-100">{edu.degree}</div>
            <div className="text-xs opacity-80">{edu.graduationDate}</div>
          </div>)}
        </div>}

        {certifications.length > 0 && <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-orange-100 mb-4">Certifications</h3>
          {certifications.map(cert => <div key={cert.id} className="mb-2">
            <div className="font-medium text-sm">{cert.name}</div>
            <div className="text-xs text-orange-100">{cert.organization}, {cert.date}</div>
          </div>)}
        </div>}
      </div>
    </div>
  );
};

export default React.memo(SunsetSidebarTemplateComponent);
