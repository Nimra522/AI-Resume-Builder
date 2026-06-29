import React from 'react';
import { ResumeData } from '../../types';

interface TechTemplateProps {
  data: ResumeData;
}

const TechTemplateComponent: React.FC<TechTemplateProps> = ({ data }) => {
  const { personalInfo, experience, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-gray-50 text-gray-800 shadow-xl font-mono p-8 border-l-8 border-green-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">&lt;{personalInfo.fullName || 'Your Full Name'} /&gt;</h1>
        <p className="text-gray-500">// {personalInfo.jobTitle || 'Your Job Title'}</p>
        <div className="mt-4 text-xs bg-gray-200 p-3 rounded inline-block">
          const contact = {'{'} 
          email: "{personalInfo.email || 'your.email@example.com'}", 
          phone: "{personalInfo.phone || 'Your Phone Number'}"
          {personalInfo.website && `, website: "${personalInfo.website}"`}
          {personalInfo.linkedin && `, linkedin: "${personalInfo.linkedin}"`}
          {'}'};
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">Experience.log</h3>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6 relative pl-6 border-l border-gray-300">
              <div className="absolute -left-[5px] top-2 w-2 h-2 bg-green-500 rounded-full"></div>
              <h4 className="font-bold">{exp.role || 'Job Title'} @ {exp.company || 'Company Name'}</h4>
              <div className="text-xs text-gray-400 mb-2">[{exp.startDate || 'Start Date'} ... {exp.current ? 'NOW' : exp.endDate || 'End Date'}]</div>
              <p className="text-sm">{exp.description || 'Experience description will appear here...'}</p>
            </div>
          ))}
          {projects && projects.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">Projects.json</h3>
            <div className="space-y-6">
              {projects.map(proj => (
                <div key={proj.id} className="relative pl-6 border-l border-gray-300">
                  <div className="absolute -left-[5px] top-2 w-2 h-2 bg-green-500 rounded-full"></div>
                  <h4 className="font-bold">{proj.name || 'Project Name'}</h4>
                  {proj.link && (
                    <div className="text-xs text-gray-400 mb-2">
                      <a 
                        href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        {proj.link}
                      </a>
                    </div>
                  )}
                  <p className="text-sm">{proj.description || 'Project description will appear here...'}</p>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>
        <div className="col-span-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">Skills.json</h3>
          <div className="bg-gray-800 text-green-400 p-4 rounded text-xs leading-5">
            [<br/>
            {skills.length > 0 ? skills.map((s, i) => (
              <span key={s}>&nbsp;&nbsp;"{s}"{i < skills.length - 1 ? ',' : ''}<br/></span>
            )) : <span>&nbsp;&nbsp;"Skills will appear here..."<br/></span>}
            ]
          </div>
          {certifications && certifications.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">Certificates.json</h3>
            <div className="bg-gray-800 text-green-400 p-4 rounded text-xs leading-5">
              [<br/>
              {certifications.map((cert, i) => (
                <span key={cert.id}>&nbsp;&nbsp;"{cert.name || 'Certification Name'} ({cert.issuer || 'Issuer'})"{i < certifications.length - 1 ? ',' : ''}<br/></span>
              ))}
              ]
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TechTemplateComponent);