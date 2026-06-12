import React from 'react';
import { ResumeData } from '../../types';

interface MinimalistTemplateProps {
  data: ResumeData;
}

const MinimalistTemplateComponent: React.FC<MinimalistTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-700 shadow-xl p-16 font-sans">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-thin text-gray-900 mb-4 tracking-tight">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">{personalInfo.jobTitle || 'Your Job Title'}</p>
        <div className="flex justify-center gap-6 text-xs text-gray-500 font-medium uppercase tracking-wider">
           <span>{personalInfo.email || 'your.email@example.com'}</span>
           <span>{personalInfo.phone || 'Your Phone Number'}</span>
           <span>{personalInfo.location || 'Your Location'}</span>
           {personalInfo.website && (
             <span>
               <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors">
                 {personalInfo.website}
               </a>
             </span>
           )}
           {personalInfo.linkedin && (
             <span>
               <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors break-all">
                 {personalInfo.linkedin}
               </a>
             </span>
           )}
        </div>
      </header>
      <div className="max-w-2xl mx-auto space-y-12">
         <section>
           <p className="text-center text-sm leading-8 text-gray-600">{personalInfo.summary || 'Your professional summary will appear here...'}</p>
         </section>
         <section>
           <h3 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-8">Experience</h3>
           {experience.map(exp => (
             <div key={exp.id} className="mb-10 text-center">
               <h4 className="font-medium text-gray-900 text-lg mb-1">{exp.role || 'Job Title'}</h4>
               <div className="text-xs text-gray-400 mb-3 uppercase tracking-wide">{exp.company || 'Company Name'} • {exp.startDate || 'Start Date'} - {exp.current ? 'Present' : exp.endDate || 'End Date'}</div>
               <p className="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">{exp.description || 'Experience description will appear here...'}</p>
             </div>
           ))}
         </section>
         <section>
           <h3 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-8">Education & Skills</h3>
           <div className="text-center space-y-4">
             {education.map(edu => (
               <div key={edu.id} className="text-sm">
                 <span className="font-medium text-gray-900">{edu.school || 'School Name'}</span> <span className="text-gray-400">/</span> {edu.degree || 'Degree'}
               </div>
             ))}
             <div className="pt-4 text-xs leading-6 text-gray-500 max-w-lg mx-auto">
               {skills.length > 0 ? skills.join('   /   ') : 'Skills will appear here...'}
             </div>
           </div>
         </section>
         {projects && projects.length > 0 && (
         <section>
           <h3 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-8">Projects</h3>
           <div className="text-center space-y-4">
             {projects.map(proj => (
               <div key={proj.id} className="text-sm text-left max-w-lg mx-auto">
                 <div className="font-medium text-gray-900 flex justify-between">
                   <span>{proj.name || 'Project Name'}</span>
                   {proj.link && (
                     <a 
                       href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-blue-600 hover:underline text-xs"
                     >
                       {proj.link}
                     </a>
                   )}
                 </div>
                 <p className="text-gray-600 pt-1">{proj.description || 'Project description will appear here...'}</p>
               </div>
             ))}
           </div>
         </section>
         )}
         {certifications && certifications.length > 0 && (
         <section>
           <h3 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-8">Certifications</h3>
           <div className="text-center space-y-4">
             {certifications.map(cert => (
               <div key={cert.id} className="text-sm text-left max-w-lg mx-auto">
                 <div className="font-medium text-gray-900 flex justify-between">
                   <span>{cert.name || 'Certification Name'}</span>
                   <span className="text-gray-400 text-xs">{cert.date || 'Date'}</span>
                 </div>
                 <p className="text-gray-600 pt-1">{cert.issuer || 'Issuer'}</p>
               </div>
             ))}
           </div>
         </section>
         )}
      </div>
    </div>
  );
};

export default React.memo(MinimalistTemplateComponent);