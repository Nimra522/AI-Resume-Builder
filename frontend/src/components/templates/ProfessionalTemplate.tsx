import React from 'react';
import { ResumeData } from '../../types';

interface ProfessionalTemplateProps {
  data: ResumeData;
}

const ProfessionalTemplateComponent: React.FC<ProfessionalTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-900 shadow-xl p-12 font-serif">
      <header className="border-b-2 border-gray-900 pb-6 mb-8 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-wide mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-lg text-gray-600 mb-4 italic">{personalInfo.jobTitle || 'Your Job Title'}</p>
        <div className="flex justify-center gap-4 text-sm text-gray-600 flex-wrap font-sans">
           <span>{personalInfo.location || 'Your Location'}</span> | 
           <span>{personalInfo.email || 'your.email@example.com'}</span> | 
           <span>{personalInfo.phone || 'Your Phone Number'}</span>
           {personalInfo.website && (
             <span>| <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors">{personalInfo.website}</a></span>
           )}
           {personalInfo.linkedin && (
             <span>| <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors break-all">{personalInfo.linkedin}</a></span>
           )}
        </div>
      </header>
      <section className="mb-8">
         <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wider">Summary</h3>
         <p className="text-sm leading-relaxed">{personalInfo.summary || 'Your professional summary will appear here...'}</p>
      </section>
      <section className="mb-8">
         <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wider">Experience</h3>
         {experience.map(exp => (
           <div key={exp.id} className="mb-6">
             <div className="flex justify-between font-bold text-base">
               <span>{exp.company || 'Company Name'}</span>
               <span className="font-sans text-sm font-normal text-gray-600">{exp.startDate || 'Start Date'} - {exp.current ? 'Present' : exp.endDate || 'End Date'}</span>
             </div>
             <div className="italic text-sm mb-2">{exp.role || 'Job Title'}</div>
             <p className="text-sm text-gray-700 whitespace-pre-wrap">{exp.description || 'Experience description will appear here...'}</p>
           </div>
         ))}
      </section>
      <div className="grid grid-cols-2 gap-8">
        <section>
           <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wider">Education</h3>
           {education.map(edu => (
             <div key={edu.id} className="mb-2">
                <div className="font-bold text-sm">{edu.school || 'School Name'}</div>
                <div className="text-sm italic">{edu.degree || 'Degree'}</div>
                <div className="text-xs text-gray-500 font-sans">{edu.graduationDate || 'Graduation Date'}</div>
             </div>
           ))}
        </section>
        <section>
          <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wider">Skills</h3>
          <p className="text-sm text-gray-700 leading-relaxed font-sans">{skills.length > 0 ? skills.join(' • ') : 'Skills will appear here...'}</p>
        </section>
      </div>
      {projects && projects.length > 0 && (
        <section className="mt-8">
          <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wider">Projects</h3>
          {projects.map(proj => (
            <div key={proj.id} className="mb-4">
              <div className="flex justify-between font-bold text-sm">
                <span>{proj.name || 'Project Name'}</span>
                {proj.link && (
                  <a 
                    href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {proj.link}
                  </a>
                )}
              </div>
              <p className="text-sm text-gray-700">{proj.description || 'Project description will appear here...'}</p>
            </div>
          ))}
        </section>
      )}
      {certifications && certifications.length > 0 && (
        <section className="mt-8">
          <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wider">Certifications</h3>
          {certifications.map(cert => (
            <div key={cert.id} className="mb-2">
              <div className="flex justify-between font-bold text-sm">
                <span>{cert.name || 'Certification Name'}</span>
                <span className="font-sans text-sm font-normal text-gray-600">{cert.date || 'Date'}</span>
              </div>
              <p className="text-sm text-gray-600 italic">{cert.issuer || 'Issuer'}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default React.memo(ProfessionalTemplateComponent);