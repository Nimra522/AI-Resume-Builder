import React from 'react';
import { ResumeData } from '../../types';
import { Star } from 'lucide-react';

interface CreativeTemplateProps {
  data: ResumeData;
}

const CreativeTemplateComponent: React.FC<CreativeTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-800 shadow-xl p-8">
      <div className="border-4 border-indigo-200 h-full p-8 rounded-3xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full -mr-32 -mt-32 z-0"></div>
         <div className="relative z-10 grid grid-cols-12 gap-8 h-full">
            <div className="col-span-12 mb-8">
               <h1 className="text-5xl font-black text-indigo-900 mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
               <p className="text-2xl font-light text-indigo-500">{personalInfo.jobTitle || 'Your Job Title'}</p>
               <div className="flex gap-4 mt-4 text-sm font-bold text-gray-500">
                  <span>{personalInfo.email || 'your.email@example.com'}</span>
                  <span>{personalInfo.phone || 'Your Phone Number'}</span>
                  <span>{personalInfo.location || 'Your Location'}</span>
                  {personalInfo.website && (
                    <span>
                      <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-700 transition-colors">
                        {personalInfo.website}
                      </a>
                    </span>
                  )}
                  {personalInfo.linkedin && (
                    <span>
                      <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-700 transition-colors break-all">
                        {personalInfo.linkedin}
                      </a>
                    </span>
                  )}
               </div>
            </div>
            <div className="col-span-4 space-y-8">
               <div className="bg-indigo-50 p-6 rounded-2xl">
                  <h3 className="font-black text-indigo-900 mb-4 uppercase text-sm">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                     {skills.length > 0 ? skills.map(s => <span key={s} className="px-3 py-1 bg-white rounded-full text-xs font-bold text-indigo-600 shadow-sm">{s}</span>) : <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-indigo-600 shadow-sm">Skills will appear here...</span>}
                  </div>
               </div>
               <div className="bg-pink-50 p-6 rounded-2xl">
                  <h3 className="font-black text-pink-900 mb-4 uppercase text-sm">Education</h3>
                  {education.map(edu => (
                    <div key={edu.id} className="mb-4 last:mb-0">
                       <div className="font-bold text-gray-800">{edu.school || 'School Name'}</div>
                       <div className="text-xs text-pink-600 font-bold">{edu.degree || 'Degree'}</div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="col-span-8 space-y-8">
               <div className="bg-gray-50 p-8 rounded-2xl">
                  <h3 className="font-black text-gray-900 mb-6 uppercase text-sm flex items-center gap-2">
                     <Star className="text-indigo-500" size={16} fill="currentColor"/> Work Experience
                  </h3>
                  {experience.map(exp => (
                    <div key={exp.id} className="mb-8 last:mb-0">
                       <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-xl text-gray-800">{exp.role || 'Job Title'}</h4>
                          <span className="bg-gray-200 px-2 py-1 rounded text-xs font-bold">{exp.startDate || 'Start Date'} - {exp.current ? 'Now' : exp.endDate || 'End Date'}</span>
                       </div>
                       <div className="text-indigo-600 font-bold text-sm mb-2">{exp.company || 'Company Name'}</div>
                       <p className="text-sm text-gray-600 leading-relaxed">{exp.description || 'Experience description will appear here...'}</p>
                    </div>
                  ))}
               </div>
               {projects && projects.length > 0 && (
               <div className="bg-gray-50 p-8 rounded-2xl">
                  <h3 className="font-black text-gray-900 mb-6 uppercase text-sm flex items-center gap-2">
                     <Star className="text-indigo-500" size={16} fill="currentColor"/> Projects
                  </h3>
                  {projects.map(proj => (
                    <div key={proj.id} className="mb-6 last:mb-0">
                       <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-xl text-gray-800">{proj.name || 'Project Name'}</h4>
                          {proj.link && (
                            <a 
                              href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-indigo-600 text-xs hover:underline"
                            >
                              {proj.link}
                            </a>
                          )}
                       </div>
                       <p className="text-sm text-gray-600 leading-relaxed">{proj.description || 'Project description will appear here...'}</p>
                    </div>
                  ))}
               </div>
               )}
               {certifications && certifications.length > 0 && (
               <div className="bg-gray-50 p-8 rounded-2xl">
                  <h3 className="font-black text-gray-900 mb-6 uppercase text-sm flex items-center gap-2">
                     <Star className="text-indigo-500" size={16} fill="currentColor"/> Certifications
                  </h3>
                  {certifications.map(cert => (
                    <div key={cert.id} className="mb-4">
                       <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-gray-800">{cert.name || 'Certification Name'}</h4>
                          <span className="text-xs text-gray-500 font-bold">{cert.date || 'Date'}</span>
                       </div>
                       <p className="text-sm text-indigo-600">{cert.issuer || 'Issuer'}</p>
                    </div>
                  ))}
               </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default React.memo(CreativeTemplateComponent);