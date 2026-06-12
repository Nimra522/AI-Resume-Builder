import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplateComponent: React.FC<ModernTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-800 shadow-xl flex">
      <div className="w-1/3 bg-slate-800 text-white p-6 md:p-8 space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">{personalInfo.fullName || 'Your Full Name'}</h1>
          <p className="text-indigo-300 text-lg font-medium">{personalInfo.jobTitle || 'Your Job Title'}</p>
        </div>
        <div className="space-y-3 text-sm opacity-90">
          <div className="flex items-center gap-2"><MapPin size={14}/> {personalInfo.location || 'Your Location'}</div>
          <div className="flex items-center gap-2"><Mail size={14} className="flex-shrink-0"/> <span className="break-all">{personalInfo.email || 'your.email@example.com'}</span></div>
          <div className="flex items-center gap-2"><Phone size={14}/> {personalInfo.phone || 'Your Phone Number'}</div>
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe size={14}/>
              <a 
                href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-indigo-200 transition-colors break-all"
              >
                {personalInfo.website}
              </a>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <a 
                href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-indigo-200 transition-colors break-all"
              >
                {personalInfo.linkedin}
              </a>
            </div>
          )}
        </div>
        <div className="pt-4 border-t border-slate-600">
          <h3 className="uppercase tracking-widest text-xs font-bold mb-4 text-indigo-300">Education</h3>
          {education.map(edu => (
            <div key={edu.id} className="mb-4 last:mb-0">
              <div className="font-bold">{edu.school}</div>
              <div className="text-sm italic text-slate-300">{edu.degree || 'Degree'}</div>
              <div className="text-xs text-slate-400">{edu.graduationDate || 'Graduation Date'}</div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-slate-600">
          <h3 className="uppercase tracking-widest text-xs font-bold mb-4 text-indigo-300">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="px-2 py-1 bg-slate-700 rounded text-xs">{skill || 'Skill'}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-2/3 p-6 md:p-8 space-y-8">
        <section>
           <h3 className="uppercase tracking-widest text-sm font-bold border-b-2 border-indigo-500 pb-2 mb-4 text-slate-800">Professional Summary</h3>
           <p className="text-sm leading-relaxed text-gray-600">{personalInfo.summary || 'Your professional summary will appear here...'}</p>
        </section>
        <section>
           <h3 className="uppercase tracking-widest text-sm font-bold border-b-2 border-indigo-500 pb-2 mb-4 text-slate-800">Experience</h3>
           <div className="space-y-6">
             {experience.map(exp => (
               <div key={exp.id}>
                 <div className="flex justify-between items-baseline mb-1">
                   <h4 className="font-bold text-lg text-gray-800">{exp.role || 'Job Title'}</h4>
                   <span className="text-xs text-gray-500 font-medium">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                 </div>
                 <div className="text-indigo-600 font-medium text-sm mb-2">{exp.company || 'Company Name'}</div>
                 <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{exp.description || 'Experience description will appear here...'}</p>
               </div>
             ))}
           </div>
        </section>
        {projects && projects.length > 0 && (
        <section className="pt-8 border-t border-gray-200">
          <h3 className="uppercase tracking-widest text-sm font-bold border-b-2 border-indigo-500 pb-2 mb-4 text-slate-800">Projects</h3>
          <div className="space-y-4">
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-800">{proj.name || 'Project Name'}</h4>
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
        </section>
        )}
        {certifications && certifications.length > 0 && (
        <section className="pt-8 border-t border-gray-200">
          <h3 className="uppercase tracking-widest text-sm font-bold border-b-2 border-indigo-500 pb-2 mb-4 text-slate-800">Certifications</h3>
          <div className="space-y-4">
            {certifications.map(cert => (
              <div key={cert.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-800">{cert.name || 'Certification Name'}</h4>
                  <span className="text-xs text-gray-500 font-medium">{cert.date || 'Date'}</span>
                </div>
                <p className="text-sm text-indigo-600">{cert.issuer || 'Issuer'}</p>
              </div>
            ))}
          </div>
        </section>
        )}
      </div>
    </div>
  );
};

export default React.memo(ModernTemplateComponent);