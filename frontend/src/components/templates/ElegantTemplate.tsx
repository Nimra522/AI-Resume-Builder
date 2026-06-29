import React from 'react';
import { ResumeData } from '../../types';

interface ElegantTemplateProps {
  data: ResumeData;
}

const ElegantTemplateComponent: React.FC<ElegantTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-700 shadow-xl p-12">
      <div className="border-t-4 border-rose-300 w-16 mx-auto mb-8"></div>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-serif text-gray-800 mb-3">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-rose-400 uppercase tracking-widest text-base font-bold mb-6">{personalInfo.jobTitle || 'Your Job Title'}</p>
        <p className="text-sm text-gray-500 italic max-w-lg mx-auto">{personalInfo.summary || 'Your professional summary will appear here...'}</p>
      </header>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 text-right space-y-8 border-r border-gray-100 pr-8">
          <section>
            <h3 className="font-serif text-lg text-gray-800 mb-4 italic">Contact</h3>
            <div className="text-sm space-y-2 text-gray-500">
              <div>{personalInfo.email || 'your.email@example.com'}</div>
              <div>{personalInfo.phone || 'Your Phone Number'}</div>
              <div>{personalInfo.location || 'Your Location'}</div>
              {personalInfo.website && (
                <div>
                  <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors">
                    {personalInfo.website}
                  </a>
                </div>
              )}
              {personalInfo.linkedin && (
                <div>
                  <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors break-all">
                    {personalInfo.linkedin}
                  </a>
                </div>
              )}
            </div>
          </section>
          <section>
            <h3 className="font-serif text-lg text-gray-800 mb-4 italic">Education</h3>
            {education.map(edu => (
              <div key={edu.id} className="mb-4">
                <div className="font-medium text-gray-800">{edu.school || 'School Name'}</div>
                <div className="text-xs text-rose-400">{edu.degree || 'Degree'}</div>
              </div>
            ))}
          </section>
          <section>
            <h3 className="font-serif text-lg text-gray-800 mb-4 italic">Expertise</h3>
            <div className="flex flex-wrap justify-end gap-2">
              {skills.length > 0 ? skills.map(s => <span key={s} className="text-sm text-gray-600">{s}</span>) : <span className="text-sm text-gray-600">Skills will appear here...</span>}
            </div>
          </section>
        </div>
        <div className="col-span-2 space-y-8">
          <section>
            <h3 className="font-serif text-lg text-gray-800 mb-6 italic border-b border-rose-100 pb-2 inline-block">Work Experience</h3>
            {experience.map(exp => (
              <div key={exp.id} className="mb-8 relative">
                <div className="flex items-baseline gap-2 mb-2">
                  <h4 className="font-bold text-gray-800">{exp.role || 'Job Title'}</h4>
                  <span className="text-xs text-rose-400">@ {exp.company || 'Company Name'}</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{exp.description || 'Experience description will appear here...'}</p>
              </div>
            ))}
          </section>
          {projects && projects.length > 0 && (
          <section>
            <h3 className="font-serif text-lg text-gray-800 mb-6 italic border-b border-rose-100 pb-2 inline-block">Projects</h3>
            {projects.map(proj => (
              <div key={proj.id} className="mb-8 relative">
                <div className="flex items-baseline gap-2 mb-2">
                  <h4 className="font-bold text-gray-800">{proj.name || 'Project Name'}</h4>
                  {proj.link && (
                    <a 
                      href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-rose-400 hover:underline"
                    >
                      Link
                    </a>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{proj.description || 'Project description will appear here...'}</p>
              </div>
            ))}
          </section>
          )}
          {certifications && certifications.length > 0 && (
          <section>
            <h3 className="font-serif text-lg text-gray-800 mb-6 italic border-b border-rose-100 pb-2 inline-block">Certifications</h3>
            {certifications.map(cert => (
              <div key={cert.id} className="mb-4">
                <div className="flex justify-between">
                  <h4 className="font-bold text-gray-800">{cert.name || 'Certification Name'}</h4>
                  <span className="text-xs text-rose-400">{cert.date || 'Date'}</span>
                </div>
                <p className="text-sm text-rose-400">{cert.issuer || 'Issuer'}</p>
              </div>
            ))}
          </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ElegantTemplateComponent);