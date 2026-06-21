import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface RoseBlushTemplateProps {
  data: ResumeData;
}

const RoseBlushTemplateComponent: React.FC<RoseBlushTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-rose-50 text-gray-900 shadow-xl">
      {/* Header */}
      <header className="bg-gradient-to-r from-rose-200 to-pink-200 p-10 text-center">
        <h1 className="text-4xl font-black text-rose-800">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-xl text-rose-600 mt-2">{personalInfo.jobTitle || 'Your Job Title'}</p>
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-rose-700">
          {personalInfo.email && <div className="flex items-center gap-2"><Mail size={16} /> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={16} /> {personalInfo.phone}</div>}
          {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={16} /> {personalInfo.location}</div>}
        </div>
      </header>

      <div className="p-10 space-y-8">
        {personalInfo.summary && <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-rose-700 mb-3 border-b border-rose-100 pb-2">Professional Summary</h3>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>}

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-5 space-y-8">
            {skills.length > 0 && <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-rose-700 mb-4 border-b border-rose-100 pb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-semibold">{skill}</span>)}
              </div>
            </div>}

            {education.length > 0 && <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-rose-700 mb-4 border-b border-rose-100 pb-2">Education</h3>
              {education.map(edu => <div key={edu.id} className="mb-4 last:mb-0">
                <div className="font-semibold text-gray-900">{edu.school}</div>
                <div className="text-sm text-gray-700">{edu.degree}</div>
                <div className="text-xs text-rose-600">{edu.graduationDate}</div>
              </div>)}
            </div>}

            {certifications.length > 0 && <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-rose-700 mb-4 border-b border-rose-100 pb-2">Certifications</h3>
              {certifications.map(cert => <div key={cert.id} className="mb-3 last:mb-0">
                <div className="font-semibold text-sm text-gray-900">{cert.name}</div>
                <div className="text-xs text-gray-600">{cert.organization} • {cert.date}</div>
              </div>)}
            </div>}
          </div>

          {/* Right Column */}
          <div className="col-span-7 space-y-8">
            {experience.length > 0 && <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-rose-700 mb-4 border-b border-rose-100 pb-2">Experience</h3>
              {experience.map(exp => <div key={exp.id} className="mb-6 last:mb-0 border-b border-rose-50 last:border-0 pb-6 last:pb-0">
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h4>
                    <p className="text-rose-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{exp.description}</p>
              </div>)}
            </div>}

            {projects.length > 0 && <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-rose-700 mb-4 border-b border-rose-100 pb-2">Projects</h3>
              {projects.map(proj => <div key={proj.id} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">{proj.name}</h4>
                  {proj.link && <a href={proj.link} className="text-xs text-rose-600 underline">{proj.link}</a>}
                </div>
                <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
              </div>)}
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RoseBlushTemplateComponent);
