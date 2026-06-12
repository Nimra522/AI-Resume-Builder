import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ExecutiveTemplateProps {
  data: ResumeData;
}

const ExecutiveTemplateComponent: React.FC<ExecutiveTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-800 shadow-xl flex flex-col">
      <div className="bg-slate-900 text-white p-12 text-center border-b-8 border-yellow-600">
         <h1 className="text-4xl font-serif font-bold tracking-wide mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
         <p className="text-yellow-500 uppercase tracking-widest text-sm font-bold">{personalInfo.jobTitle || 'Your Job Title'}</p>
      </div>
      <div className="bg-gray-100 p-4 flex justify-center gap-8 text-sm font-medium text-slate-700 border-b border-gray-200">
         <span className="flex items-center gap-2"><Mail size={14} /> {personalInfo.email || 'your.email@example.com'}</span>
         <span className="flex items-center gap-2"><Phone size={14} /> {personalInfo.phone || 'Your Phone Number'}</span>
         <span className="flex items-center gap-2"><MapPin size={14} /> {personalInfo.location || 'Your Location'}</span>
         {personalInfo.website && (
           <span className="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <circle cx="12" cy="12" r="10"></circle>
               <line x1="2" y1="12" x2="22" y2="12"></line>
               <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
             </svg>
             <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">
               {personalInfo.website}
             </a>
           </span>
         )}
         {personalInfo.linkedin && (
           <span className="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
               <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
             </svg>
             <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors break-all">
               {personalInfo.linkedin}
             </a>
           </span>
         )}
      </div>
      <div className="p-12 flex-grow">
         <div className="flex gap-12">
            <div className="w-2/3 space-y-10">
               <section>
                  <h3 className="text-slate-900 font-serif font-bold text-xl mb-4 flex items-center gap-3">
                    <span className="w-8 h-1 bg-yellow-600"></span> Profile
                  </h3>
                  <p className="text-slate-700 leading-relaxed">{personalInfo.summary || 'Your professional summary will appear here...'}</p>
               </section>
               <section>
                  <h3 className="text-slate-900 font-serif font-bold text-xl mb-6 flex items-center gap-3">
                    <span className="w-8 h-1 bg-yellow-600"></span> Experience
                  </h3>
                  {experience.map(exp => (
                    <div key={exp.id} className="mb-8 border-l-2 border-gray-200 pl-6 relative">
                      <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-yellow-600 rounded-full border-4 border-white"></div>
                      <h4 className="font-bold text-lg text-slate-900">{exp.role || 'Job Title'}</h4>
                      <div className="text-slate-500 font-medium mb-2">{exp.company || 'Company Name'} | {exp.startDate || 'Start Date'} - {exp.current ? 'Present' : exp.endDate || 'End Date'}</div>
                      <p className="text-slate-700 text-sm leading-relaxed">{exp.description || 'Experience description will appear here...'}</p>
                    </div>
                  ))}
               </section>
            </div>
            <div className="w-1/3 space-y-10">
               <section>
                  <h3 className="text-slate-900 font-serif font-bold text-xl mb-4 border-b-2 border-gray-200 pb-2">Skills</h3>
                  <div className="flex flex-col gap-2">
                     {skills.length > 0 ? skills.map(s => <div key={s} className="bg-gray-100 p-2 rounded text-sm font-medium text-slate-700">{s}</div>) : <div className="bg-gray-100 p-2 rounded text-sm font-medium text-slate-700">Skills will appear here...</div>}
                  </div>
               </section>
               <section>
                  <h3 className="text-slate-900 font-serif font-bold text-xl mb-4 border-b-2 border-gray-200 pb-2">Education</h3>
                  {education.map(edu => (
                    <div key={edu.id} className="mb-4">
                      <div className="font-bold text-slate-900">{edu.school || 'School Name'}</div>
                      <div className="text-sm text-slate-600">{edu.degree || 'Degree'}</div>
                      <div className="text-xs text-slate-400 mt-1">{edu.graduationDate || 'Graduation Date'}</div>
                    </div>
                  ))}
               </section>
            </div>
         </div>
      </div>
      <div className="p-12 border-t border-gray-200">
         <div className="flex gap-12">
            <div className="w-1/2">
               {projects && projects.length > 0 && (
               <section>
                  <h3 className="text-slate-900 font-serif font-bold text-xl mb-4 border-b-2 border-gray-200 pb-2">Projects</h3>
                  {projects.map(proj => (
                    <div key={proj.id} className="mb-4">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{proj.name || 'Project Name'}</span>
                        {proj.link && (
                          <a 
                            href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-yellow-600 hover:underline text-sm"
                          >
                            Link
                          </a>
                        )}
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed mt-1">{proj.description || 'Project description will appear here...'}</p>
                    </div>
                  ))}
               </section>
               )}
            </div>
            <div className="w-1/2">
               {certifications && certifications.length > 0 && (
               <section>
                  <h3 className="text-slate-900 font-serif font-bold text-xl mb-4 border-b-2 border-gray-200 pb-2">Certifications</h3>
                  {certifications.map(cert => (
                    <div key={cert.id} className="mb-4">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{cert.name || 'Certification Name'}</span>
                        <span className="text-slate-500 text-sm">{cert.date || 'Date'}</span>
                      </div>
                      <p className="text-slate-600 text-sm mt-1">{cert.issuer || 'Issuer'}</p>
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

export default React.memo(ExecutiveTemplateComponent);