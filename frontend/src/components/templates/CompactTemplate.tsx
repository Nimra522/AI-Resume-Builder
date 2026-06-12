import React from 'react';
import { ResumeData } from '../../types';

interface CompactTemplateProps {
  data: ResumeData;
}

const CompactTemplateComponent: React.FC<CompactTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-900 shadow-xl p-8 font-sans text-sm">
      <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold uppercase">{personalInfo.fullName || 'Your Full Name'}</h1>
          <p className="font-bold text-gray-500">{personalInfo.jobTitle || 'Your Job Title'}</p>
        </div>
        <div className="text-right text-xs">
          <div>{personalInfo.email || 'your.email@example.com'}</div>
          <div>{personalInfo.phone || 'Your Phone Number'}</div>
          <div>{personalInfo.location || 'Your Location'}</div>
          {personalInfo.website && (
            <div>
              <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors">
                {personalInfo.website}
              </a>
            </div>
          )}
          {personalInfo.linkedin && (
            <div>
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors break-all">
                {personalInfo.linkedin}
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <section>
            <h3 className="font-bold uppercase border-b border-gray-300 mb-2">Summary</h3>
            <p className="text-xs text-justify">{personalInfo.summary || 'Your professional summary will appear here...'}</p>
          </section>
          <section>
            <h3 className="font-bold uppercase border-b border-gray-300 mb-2">Experience</h3>
            {experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between font-bold text-xs">
                  <span>{exp.company || 'Company Name'}</span>
                  <span>{exp.startDate || 'Start Date'} - {exp.current ? 'Present' : exp.endDate || 'End Date'}</span>
                </div>
                <div className="text-xs italic mb-1">{exp.role || 'Job Title'}</div>
                <p className="text-xs text-gray-700">{exp.description || 'Experience description will appear here...'}</p>
              </div>
            ))}
          </section>
        </div>
        <div className="space-y-6">
          <section>
            <h3 className="font-bold uppercase border-b border-gray-300 mb-2">Education</h3>
            {education.map(edu => (
              <div key={edu.id} className="mb-2">
                <div className="font-bold text-xs">{edu.school || 'School Name'}</div>
                <div className="text-xs">{edu.degree || 'Degree'}</div>
                <div className="text-xs text-gray-500">{edu.graduationDate || 'Graduation Date'}</div>
              </div>
            ))}
          </section>
          <section>
            <h3 className="font-bold uppercase border-b border-gray-300 mb-2">Skills</h3>
            <div className="grid grid-cols-2 gap-1">
              {skills.length > 0 ? skills.map(s => <div key={s} className="text-xs">• {s}</div>) : <div className="text-xs">• Skills will appear here...</div>}
            </div>
          </section>
          {projects && projects.length > 0 && (
            <section>
              <h3 className="font-bold uppercase border-b border-gray-300 mb-2">Projects</h3>
              {projects.map(p => (
                <div key={p.id} className="mb-2">
                  <div className="font-bold text-xs">{p.name || 'Project Name'}</div>
                  <div className="text-xs text-gray-600">{p.description || 'Project description will appear here...'}</div>
                </div>
              ))}
            </section>
          )}
          {certifications && certifications.length > 0 && (
            <section>
              <h3 className="font-bold uppercase border-b border-gray-300 mb-2">Certifications</h3>
              {certifications.map(c => (
                <div key={c.id} className="mb-2">
                  <div className="font-bold text-xs">{c.name || 'Certification Name'}</div>
                  <div className="text-xs text-gray-600">{c.issuer || 'Issuer'}</div>
                  <div className="text-xs text-gray-500">{c.date || 'Date'}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(CompactTemplateComponent);