import React from 'react';
import { ResumeData } from '../../types';

interface StartupTemplateProps {
  data: ResumeData;
}

const StartupTemplateComponent: React.FC<StartupTemplateProps> = ({ data }) => {
  // Check if we're in PDF generation context
  const isPdfContext = typeof document !== 'undefined' && 
    (document.querySelector && document.querySelector('[data-pdf-mode="true"]') !== null || 
     (window.location && window.location.hash.includes('pdf')) ||
     (document.documentElement && document.documentElement.classList.contains('html2canvas')));
  const { personalInfo, experience, education, skills, projects, certifications } = data;
  const fullName = personalInfo.fullName || 'Your Full Name';
  const nameParts = fullName.split(' ');

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-800 shadow-xl flex flex-col" data-template-context={isPdfContext ? "pdf" : "browser"}>
       <div className="h-4 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 w-full"></div>
       <div className={`${isPdfContext ? 'p-8' : 'p-10'}`}>
          <header className="flex justify-between items-start mb-12">
             <div>
                <h1 className={`startup-name ${isPdfContext ? 'text-4xl font-extrabold text-orange-600 pb-2' : 'text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600 pb-2'}`}>
                  {nameParts[0]}<br/>
                  {nameParts.slice(1).join(' ')}
                </h1>
                <p className="text-xl font-medium text-gray-400 mt-2">{personalInfo.jobTitle || 'Your Job Title'}</p>
             </div>
             <div className="text-right space-y-1 text-sm font-bold text-gray-600">
                <div className="hover:text-pink-500 transition-colors">{personalInfo.email || 'your.email@example.com'}</div>
                <div className="hover:text-pink-500 transition-colors">{personalInfo.phone || 'Your Phone Number'}</div>
                <div className="hover:text-pink-500 transition-colors">{personalInfo.location || 'Your Location'}</div>
                {personalInfo.website && (
                  <div className="hover:text-pink-500 transition-colors">
                    <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors">
                      {personalInfo.website}
                    </a>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="hover:text-pink-500 transition-colors">
                    <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors break-all">
                      {personalInfo.linkedin}
                    </a>
                  </div>
                )}
             </div>
          </header>

          <div className={`${isPdfContext ? 'grid grid-cols-1 gap-6' : 'grid grid-cols-3 gap-10'}`}>
             <div className={`${isPdfContext ? 'space-y-6 mb-8' : 'col-span-1 space-y-8'}`}>
                <section>
                   <h3 className="text-sm font-black uppercase text-gray-400 mb-4">About Me</h3>
                   <p className="text-sm font-medium leading-relaxed">{personalInfo.summary || 'Your professional summary will appear here...'}</p>
                </section>
                <section>
                   <h3 className="text-sm font-black uppercase text-gray-400 mb-4">Superpowers</h3>
                   <div className="flex flex-col gap-2">
                      {skills.length > 0 ? skills.map(s => (
                         <div key={s} className="bg-orange-50 text-orange-600 px-3 py-2 rounded-lg text-sm font-bold border border-orange-100">
                            {s}
                         </div>
                      )) : <div className="bg-orange-50 text-orange-600 px-3 py-2 rounded-lg text-sm font-bold border border-orange-100">Skills will appear here...</div>}
                   </div>
                </section>
             </div>
             <div className={`${isPdfContext ? 'space-y-8' : 'col-span-2 space-y-10'}`}>
                <section>
                   <h3 className="text-2xl font-bold mb-6 text-gray-800">Work History</h3>
                   {experience.map(exp => (
                      <div key={exp.id} className="mb-8 group">
                         <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold group-hover:text-pink-600 transition-colors">{exp.role || 'Job Title'}</h4>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-500 font-medium">{exp.company || 'Company Name'}</span>
                         </div>
                         <p className="text-gray-600 text-sm leading-relaxed">{exp.description || 'Experience description will appear here...'}</p>
                      </div>
                   ))}
                </section>
                <section>
                   <h3 className="text-2xl font-bold mb-6 text-gray-800">Education</h3>
                   {education.map(edu => (
                      <div key={edu.id} className="bg-gray-50 p-4 rounded-xl">
                         <div className="font-bold">{edu.school || 'School Name'}</div>
                         <div className="text-sm text-gray-500">{edu.degree || 'Degree'}</div>
                      </div>
                   ))}
                </section>
                {certifications && certifications.length > 0 && (
                <section>
                   <h3 className="text-2xl font-bold mb-6 text-gray-800">Certifications</h3>
                   <div className="grid grid-cols-2 gap-4">
                     {certifications.map(cert => (
                        <div key={cert.id} className="bg-gray-50 p-4 rounded-xl">
                           <div className="font-bold">{cert.name || 'Certification Name'}</div>
                           <div className="text-sm text-gray-500">{cert.issuer || 'Issuer'}</div>
                           <div className="text-xs text-gray-400 mt-1">{cert.date || 'Date'}</div>
                        </div>
                     ))}
                   </div>
                </section>
                )}
                {projects && projects.length > 0 && (
                <section>
                   <h3 className="text-2xl font-bold mb-6 text-gray-800">Projects</h3>
                   {projects.map(proj => (
                      <div key={proj.id} className="bg-gray-50 p-4 rounded-xl mb-4">
                         <div className="font-bold">{proj.name || 'Project Name'}</div>
                         {proj.link && (
                           <a 
                             href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="text-sm text-pink-500 hover:underline"
                           >
                             {proj.link}
                           </a>
                         )}
                         <p className="text-sm text-gray-500 mt-2">{proj.description || 'Project description will appear here...'}</p>
                      </div>
                   ))}
                </section>
                )}
             </div>
          </div>
       </div>
    </div>
  );
};

export default React.memo(StartupTemplateComponent);