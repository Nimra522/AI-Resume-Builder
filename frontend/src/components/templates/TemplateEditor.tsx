
import React, { useState } from 'react';
import { ResumeData, Experience, Education, Project, Certification } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { FormSection } from '../ui/FormSection';
import { ChevronDown, ChevronUp, Plus, Save, ArrowLeft, User, Briefcase, GraduationCap, Code, FolderGit2, Award, AlertCircle } from 'lucide-react';
import { useFieldValidation } from '../../hooks/useFieldValidation';
import { LOCATION_OPTIONS, LocationOption } from '../../data/locations';

interface TemplateEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onBack: () => void;
  onSave?: () => void;
  hideHeader?: boolean;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({ 
  data, 
  onChange, 
  onBack, 
  onSave,
  hideHeader = false 
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // No validation restrictions - all inputs are unrestricted

  // State for name field validation error
  const [nameError, setNameError] = useState<string>('');
  
  // State for email field validation error
  const [emailError, setEmailError] = useState<string>('');
  
  // State for phone field validation error
  const [phoneError, setPhoneError] = useState<string>('');
  
  // State for selected country code


  // State for location suggestions
  const [showLocationSuggestions, setShowLocationSuggestions] = useState<boolean>(false);
  const [filteredLocations, setFilteredLocations] = useState<LocationOption[]>(LOCATION_OPTIONS);
  
  // State for linkedin/website field validation error
  const [linkedinError, setLinkedinError] = useState<string>('');

  const updatePersonalInfo = (field: string, value: string) => {
    // Apply validation only to the Name field
    if (field === 'fullName') {
      // Check if the value matches the required format
      const nameRegex = /^[A-Za-z][A-Za-z\s]{0,48}[A-Za-z]$|^[A-Za-z]+$/;
      const trimmedValue = value.trim();
      
      // Validate the name format and update error state
      if (value && !nameRegex.test(trimmedValue)) {
        if (!/^[A-Za-z ]+$/.test(value)) {
          setNameError('Name must contain only letters and spaces, and cannot start or end with a space');
        } else if (trimmedValue.length < 2 || trimmedValue.length > 50) {
          setNameError('Name must be between 2 and 50 characters');
        } else if (/^\s|\s$/.test(value)) {
          setNameError('Name must contain only letters and spaces, and cannot start or end with a space');
        }
      } else if (nameError && (nameRegex.test(trimmedValue) || !value)) {
        // Clear the error if the name becomes valid (or is empty)
        setNameError('');
      }
    }
    
    // No validation for other fields - accept all input
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };
  
  // Handle phone validation on blur
  const handlePhoneBlur = (value: string) => {
    // Allow only numeric digits
    const phoneRegex = /^[0-9]*$/;
    if (value && !phoneRegex.test(value)) {
      setPhoneError('Only valid phone numbers are allowed');
      return;
    }
    
    // Check length constraints (min 7, max 15 digits)
    if (value && (value.length < 7 || value.length > 15)) {
      setPhoneError('Phone number must be between 7 and 15 digits');
      return;
    }
    
    setPhoneError(''); // Clear error if valid
  };
  
  // Handle email validation on blur
  const handleEmailBlur = (value: string) => {
    // Allow only valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setEmailError('Only valid emails are allowed (e.g. name@example.com)');
    } else {
      setEmailError(''); // Clear error if valid or empty
    }
  };
  
  // Handle linkedin/website validation on blur
  const handleLinkedinBlur = (value: string) => {
    // Allow empty values (optional field)
    if (!value) {
      setLinkedinError('');
      return;
    }
    
    // Allow only valid URL format
    try {
      // Add protocol if missing for validation purposes
      const urlWithProtocol = value.startsWith('http://') || value.startsWith('https://') ? value : 'https://' + value;
      new URL(urlWithProtocol);
      setLinkedinError(''); // Clear error if valid
    } catch {
      setLinkedinError('Only valid links are allowed (e.g., https://example.com)');
    }
  };

  // Generic handler for array updates
  const updateItem = (section: keyof ResumeData, id: string, field: string, value: any) => {
    // @ts-ignore
    const updatedList = data[section].map((item: any) => 
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, [section]: updatedList });
  };

  const addItem = (section: keyof ResumeData, newItem: any) => {
    // @ts-ignore
    onChange({ ...data, [section]: [newItem, ...data[section]] });
    setOpenSections(prev => ({ ...prev, [newItem.id]: true }));
  };

  const removeItem = (section: keyof ResumeData, id: string) => {
    // @ts-ignore
    onChange({ ...data, [section]: data[section].filter((item: any) => item.id !== id) });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim());
    onChange({ ...data, skills: skillsArray });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header - Conditionally Rendered */}
      {!hideHeader && (
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <button onClick={onBack} className="flex items-center text-text-muted hover:text-primary transition-colors text-sm font-medium">
            <ArrowLeft size={16} className="mr-1" /> Back
          </button>
          <h2 className="font-bold text-text-main">Editor</h2>
          {onSave && <Button size="sm" variant="primary" icon={<Save size={14}/>} onClick={onSave}>Save</Button>}
        </div>
      )}

      {/* Scrollable Form Area */}
      <div className="flex-grow p-4 space-y-6 pb-20">
        
        {/* Personal Info */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
           <div 
             className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between cursor-pointer"
             onClick={() => toggleSection('personal')}
           >
             <h3 className="font-bold text-text-main flex items-center gap-2">
               <User size={18} className="text-primary" /> Personal Information
             </h3>
             {openSections['personal'] ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
           </div>
           
           {openSections['personal'] && (
             <div className="p-5 space-y-4 animate-fade-in">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Input 
                   label="Full Name" 
                   value={data.personalInfo.fullName} 
                   onChange={e => updatePersonalInfo('fullName', e.target.value)} 
                   placeholder="e.g. John Doe"
                   error={nameError}
                 />
                 <Input 
                   label="Job Title"
                   value={data.personalInfo.jobTitle} 
                   onChange={e => updatePersonalInfo('jobTitle', e.target.value)}
                   placeholder="e.g. Software Engineer"
                 />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Input 
                   label="Email"
                   value={data.personalInfo.email} 
                   onChange={e => updatePersonalInfo('email', e.target.value)}
                   onBlur={(e) => handleEmailBlur(e.target.value)}
                   placeholder="john@example.com"
                   error={emailError}
                 />
               <Input 
                 label="Phone"
                 value={data.personalInfo.phone} 
                 onChange={e => updatePersonalInfo('phone', e.target.value)} 
                 onBlur={(e) => handlePhoneBlur(e.target.value)}
                 placeholder="Enter phone number"
                 error={phoneError}
               />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                   <label className="block text-sm font-medium text-text-main">Location</label>
                   <div className="relative">
                     <input
                       type="text"
                       value={data.personalInfo.location}
                       onChange={(e) => {
                         const value = e.target.value;
                         updatePersonalInfo('location', value);
                                         
                         // Filter location suggestions based on input
                         if (value.length > 0) {
                           const filtered = LOCATION_OPTIONS.filter(loc => 
                             loc.name.toLowerCase().includes(value.toLowerCase())
                           );
                           setFilteredLocations(filtered);
                           setShowLocationSuggestions(true);
                         } else {
                           setFilteredLocations(LOCATION_OPTIONS);
                           setShowLocationSuggestions(false);
                         }
                       }}
                       onFocus={() => {
                         if (data.personalInfo.location.length > 0) {
                           setShowLocationSuggestions(true);
                         }
                       }}
                       onBlur={() => {
                         // Delay hiding suggestions to allow clicking
                         setTimeout(() => setShowLocationSuggestions(false), 200);
                       }}
                       placeholder="City, Country"
                       className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-text-main placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm"
                     />
                     {showLocationSuggestions && (
                       <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                         {filteredLocations.length > 0 ? (
                           filteredLocations.map((loc) => (
                             <div
                               key={loc.id}
                               className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                               onClick={() => {
                                 updatePersonalInfo('location', loc.name);
                                 setShowLocationSuggestions(false);
                               }}
                             >
                               {loc.name}
                             </div>
                           ))
                         ) : (
                           <div className="px-4 py-2 text-gray-500">No locations found</div>
                         )}
                       </div>
                     )}
                   </div>
                 </div>
                 <Input 
                   label="LinkedIn / Website"
                   value={data.personalInfo.linkedin} 
                   onChange={e => updatePersonalInfo('linkedin', e.target.value)}
                   onBlur={(e) => handleLinkedinBlur(e.target.value)}
                   placeholder="linkedin.com/in/johndoe"
                   error={linkedinError}
                 />
               </div>
               <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-text-main">Professional Summary</label>
                  <textarea 
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    rows={4}
                    value={data.personalInfo.summary}
                    onChange={e => updatePersonalInfo('summary', e.target.value)}
                    placeholder="Briefly describe your professional background and goals..."
                  />
                </div>
             </div>
           )}
        </div>

        {/* Experience */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
             <h3 className="font-bold text-text-main flex items-center gap-2">
               <Briefcase size={18} className="text-primary" /> Experience
             </h3>
             <Button 
               size="sm" 
               variant="outline" 
               icon={<Plus size={14} />} 
               onClick={() => addItem('experience', {
                 id: Date.now().toString(),
                 company: '',
                 role: '',
                 startDate: '',
                 endDate: '',
                 current: false,
                 description: ''
               })}
             >
               Add
             </Button>
          </div>
          {data.experience.map((exp) => (
            <FormSection
              key={exp.id}
              title={exp.company || 'New Position'}
              subtitle={exp.role}
              isOpen={!!openSections[exp.id]}
              onToggle={() => toggleSection(exp.id)}
              onRemove={() => removeItem('experience', exp.id)}
            >
              <div className="space-y-4">
                <Input label="Job Title" value={exp.role} onChange={e => updateItem('experience', exp.id, 'role', e.target.value)} placeholder='e.g. Software Engineer' />
                <Input label="Company" value={exp.company} onChange={e => updateItem('experience', exp.id, 'company', e.target.value)} placeholder='e.g. Google' />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Start Date" value={exp.startDate} onChange={e => updateItem('experience', exp.id, 'startDate', e.target.value)} placeholder='MM/YYYY' />
                  <Input label="End Date" value={exp.endDate} onChange={e => updateItem('experience', exp.id, 'endDate', e.target.value)} disabled={exp.current} placeholder='MM/YYYY' />
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" checked={exp.current} onChange={e => updateItem('experience', exp.id, 'current', e.target.checked)} className="rounded text-primary focus:ring-primary" />
                    <label className="text-sm text-text-main">I currently work here</label>
                </div>
                <textarea className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" rows={3} value={exp.description} onChange={e => updateItem('experience', exp.id, 'description', e.target.value)} placeholder='Briefly describe your role and responsibilities...' />
              </div>
            </FormSection>
          ))}
        </div>

        {/* Education */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
             <h3 className="font-bold text-text-main flex items-center gap-2">
               <GraduationCap size={18} className="text-primary" /> Education
             </h3>
             <Button size="sm" variant="outline" icon={<Plus size={14} />} onClick={() => addItem('education', { id: Date.now().toString(), school: '', degree: '', graduationDate: '', description: '' })}>Add</Button>
          </div>
          {data.education.map((edu) => (
            <FormSection key={edu.id} title={edu.school || 'Add School'} subtitle={edu.degree} isOpen={!!openSections[edu.id]} onToggle={() => toggleSection(edu.id)} onRemove={() => removeItem('education', edu.id)}>
              <div className="space-y-4">
                <Input label="School/University" value={edu.school} onChange={e => updateItem('education', edu.id, 'school', e.target.value)} placeholder='e.g. Stanford University' />
                <Input label="Degree/Major" value={edu.degree} onChange={e => updateItem('education', edu.id, 'degree', e.target.value)} placeholder='e.g. B.S. Computer Science' />
                <Input label="Graduation Date" value={edu.graduationDate} onChange={e => updateItem('education', edu.id, 'graduationDate', e.target.value)} placeholder='YYYY' />
              </div>
            </FormSection>
          ))}
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
           <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection('skills')}>
             <h3 className="font-bold text-text-main flex items-center gap-2"><Code size={18} className="text-primary" /> Skills</h3>
             {openSections['skills'] ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
           </div>
           {openSections['skills'] && (
             <div className="p-5 animate-fade-in space-y-2">
               <label className="block text-sm text-text-muted">Separate skills with commas</label>
               <textarea className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" rows={4} value={data.skills.join(', ')} onChange={handleSkillsChange} placeholder='e.g. React, TypeScript, Figma, Project Management...'  />
             </div>
           )}
        </div>

         {/* Projects */}
         <div className="space-y-3">
          <div className="flex items-center justify-between">
             <h3 className="font-bold text-text-main flex items-center gap-2"><FolderGit2 size={18} className="text-primary" /> Projects</h3>
             <Button size="sm" variant="outline" icon={<Plus size={14} />} onClick={() => addItem('projects', { id: Date.now().toString(), name: '', description: '', link: '' })}>Add</Button>
          </div>
          {data.projects.map((proj) => (
            <FormSection key={proj.id} title={proj.name || 'Add Project'} isOpen={!!openSections[proj.id]} onToggle={() => toggleSection(proj.id)} onRemove={() => removeItem('projects', proj.id)}>
              <div className="space-y-4">
                <Input label="Project Name" value={proj.name} onChange={e => updateItem('projects', proj.id, 'name', e.target.value)} placeholder='e.g. E-commerce Platform' />
                <Input label="Link" value={proj.link} onChange={e => updateItem('projects', proj.id, 'link', e.target.value)} placeholder='e.g. https://github.com/username/project' />
                <textarea className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" rows={2} value={proj.description} onChange={e => updateItem('projects', proj.id, 'description', e.target.value)} placeholder='Briefly describe your project and its achievements...' />
              </div>
            </FormSection>
          ))}
        </div>

        {/* Certifications */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
             <h3 className="font-bold text-text-main flex items-center gap-2"><Award size={18} className="text-primary" /> Certifications</h3>
             <Button size="sm" variant="outline" icon={<Plus size={14} />} onClick={() => addItem('certifications', { id: Date.now().toString(), name: '', issuer: '', date: '' })}>Add</Button>
          </div>
          {data.certifications.map((cert) => (
            <FormSection key={cert.id} title={cert.name || 'Add Certification'} subtitle={cert.issuer} isOpen={!!openSections[cert.id]} onToggle={() => toggleSection(cert.id)} onRemove={() => removeItem('certifications', cert.id)}>
              <div className="space-y-4">
                <Input label="Certification Name" value={cert.name} onChange={e => updateItem('certifications', cert.id, 'name', e.target.value)} placeholder='e.g. Amazon Web Services' />
                <Input label="Issuing Organization" value={cert.issuer} onChange={e => updateItem('certifications', cert.id, 'issuer', e.target.value)} placeholder='e.g. AWS Certified Solutions Architect' />
                <Input label="Date" value={cert.date} onChange={e => updateItem('certifications', cert.id, 'date', e.target.value)} placeholder='YYYY' />
              </div>
            </FormSection>
          ))}
        </div>

      </div>
    </div>
  );
};
