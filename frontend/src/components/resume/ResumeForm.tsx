import React, { useState, useEffect } from 'react';
import { ResumeData, Experience, Education, Project, Certification } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { FormSection } from '../ui/FormSection';
import { Plus, User, Briefcase, GraduationCap, Code, FolderGit2, Award, ChevronUp, ChevronDown } from 'lucide-react';
import { LOCATION_OPTIONS, LocationOption } from '../../data/locations';
import { FAQExamples } from '../faq/FAQExamples';


interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  // Use a map to track open states for accordions
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // No validation restrictions - all inputs are unrestricted
  
    // State for email field validation error
    const [emailError, setEmailError] = useState<string>('');

  // --- Handlers ---

  // State for name field validation error
  const [nameError, setNameError] = useState<string>('');
  
  // State for phone field validation error
  const [phoneError, setPhoneError] = useState<string>('');
  
  // State for location suggestions
  const [showLocationSuggestions, setShowLocationSuggestions] = useState<boolean>(false);
  const [filteredLocations, setFilteredLocations] = useState<LocationOption[]>(LOCATION_OPTIONS);
  
  // State for linkedin/website field validation error
  const [linkedinError, setLinkedinError] = useState<string>('');

  const updatePersonalInfo = (field: string, value: string) => {
    // Apply validation to the Name field
    if (field === 'fullName') {
      // Allow only alphabets and spaces
      const nameRegex = /^[A-Za-z ]*$/;
      if (!nameRegex.test(value)) {
        setNameError('Only valid names are allowed');
        return; // Don't update if invalid
      } else {
        setNameError(''); // Clear error if valid
      }
    }
    
    // Apply validation to the LinkedIn/Website field
    if (field === 'linkedin') {
      // Allow empty values (optional field)
      if (!value) {
        setLinkedinError('');
      } else {
        // Validate the URL as the user types, but be smart about it
        // For a valid URL, we minimally need a domain with a dot (e.g. "example.com")
        const hasDomainPattern = value.includes('.');
        
        if (hasDomainPattern) {
          try {
            // Add protocol if missing for validation purposes
            let urlToTest = value;
            if (!value.startsWith('http://') && !value.startsWith('https://')) {
              urlToTest = 'https://' + value;
            }
            new URL(urlToTest);
            setLinkedinError(''); // Clear error if valid
          } catch {
            setLinkedinError('Only valid links are allowed (e.g., https://example.com)');
          }
        } else {
          // If no dot present, likely still typing, don't show error
          setLinkedinError('');
        }
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

// Generic handler for array updates (Experience, Education, Projects, Certs)
  const updateItem = <T extends { id: string }>(
    section: keyof ResumeData, 
    id: string, 
    field: keyof T, 
    value: any
  ) => {
    // @ts-ignore - dynamic key access is tricky with TS, simplistic approach here
    const updatedList = (data[section] as T[]).map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, [section]: updatedList });
  };

  // Specialized handler for boolean fields (checkboxes)
  const updateBooleanItem = <T extends { id: string }>(
    section: keyof ResumeData,
    id: string,
    field: keyof T,
    value: boolean
  ) => {
    updateItem(section, id, field, value);
  };

  const addItem = (section: keyof ResumeData, newItem: any) => {
    // @ts-ignore
    onChange({ ...data, [section]: [newItem, ...data[section]] });
    // Open the new item immediately
    setOpenSections(prev => ({ ...prev, [newItem.id]: true }));
  };

  const removeItem = (section: keyof ResumeData, id: string) => {
    // @ts-ignore
    onChange({ ...data, [section]: (data[section] as any[]).filter(item => item.id !== id) });
  };

  // Skills
  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim());
    onChange({ ...data, skills: skillsArray });
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* 1. Personal Info */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-visible">
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
                   placeholder="City, Country"
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
                 placeholder="linkedin.com/in/john"
                 error={linkedinError}
               />
             </div>
             <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-main">Professional Summary</label>
                <textarea 
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  rows={4}
                  value={data.personalInfo.summary}
                  onChange={e => updatePersonalInfo('summary', e.target.value)}
                  placeholder="Briefly describe your professional background and goals..."
                />
                <FAQExamples 
                  field="summary" 
                  currentValue={data.personalInfo.summary} 
                  onValueChange={(value) => updatePersonalInfo('summary', value)} 
                />
              </div>
           </div>
         )}
      </div>

      {/* 2. Experience */}
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
            title={exp.company || 'Add Company'}
            subtitle={exp.role}
            isOpen={!!openSections[exp.id]}
            onToggle={() => toggleSection(exp.id)}
            onRemove={() => removeItem('experience', exp.id)}
          >
             <div className="space-y-4">
                <Input label="Job Title" value={exp.role} onChange={e => updateItem<Experience>('experience', exp.id, 'role', e.target.value)} placeholder="e.g. Software Engineer" />
                <Input label="Company" value={exp.company} onChange={e => updateItem<Experience>('experience', exp.id, 'company', e.target.value)} placeholder="e.g. Google" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Start Date" type="text" placeholder="MM/YYYY" value={exp.startDate} onChange={e => updateItem<Experience>('experience', exp.id, 'startDate', e.target.value)} />
                  <Input label="End Date" type="text" placeholder="MM/YYYY" disabled={exp.current} value={exp.endDate} onChange={e => updateItem<Experience>('experience', exp.id, 'endDate', e.target.value)} />
                </div>
                <div className="flex items-center gap-2">
                    <input 
                    type="checkbox" 
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={e => updateBooleanItem<Experience>('experience', exp.id, 'current', e.target.checked)}
                    className="rounded text-primary focus:ring-primary w-4 h-4"
                    />
                    <label htmlFor={`current-${exp.id}`} className="text-sm text-text-main">I currently work here</label>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-text-main">Description</label>
                  <textarea 
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    rows={4}
                    value={exp.description}
                    onChange={e => updateItem<Experience>('experience', exp.id, 'description', e.target.value)}
                    placeholder="• Achieved X by doing Y..."
                  />
                  <FAQExamples 
                    field="description" 
                    currentValue={exp.description} 
                    onValueChange={(value) => updateItem<Experience>('experience', exp.id, 'description', value)} 
                  />
                </div>
             </div>
          </FormSection>
        ))}
      </div>

      {/* 3. Education */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
           <h3 className="font-bold text-text-main flex items-center gap-2">
             <GraduationCap size={18} className="text-primary" /> Education
           </h3>
           <Button 
             size="sm" 
             variant="outline" 
             icon={<Plus size={14} />} 
             onClick={() => addItem('education', {
               id: Date.now().toString(),
               school: '',
               degree: '',
               graduationDate: '',
               description: ''
             })}
           >
             Add
           </Button>
        </div>
        
        {data.education.map((edu) => (
          <FormSection
            key={edu.id}
            title={edu.school || 'Add School'}
            subtitle={edu.degree}
            isOpen={!!openSections[edu.id]}
            onToggle={() => toggleSection(edu.id)}
            onRemove={() => removeItem('education', edu.id)}
          >
             <div className="space-y-4">
                <Input label="School / University" value={edu.school} onChange={e => updateItem<Education>('education', edu.id, 'school', e.target.value)} placeholder="e.g. Stanford University" />
                <Input label="Degree / Major" value={edu.degree} onChange={e => updateItem<Education>('education', edu.id, 'degree', e.target.value)} placeholder="e.g.g. B.S. Computer Science" />
                <Input label="Graduation Date" placeholder="YYYY" value={edu.graduationDate} onChange={e => updateItem<Education>('education', edu.id, 'graduationDate', e.target.value)} />
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-text-main">Description</label>
                  <textarea 
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    rows={2}
                    value={edu.description}
                    onChange={e => updateItem<Education>('education', edu.id, 'description', e.target.value)}
                    placeholder="Academic achievements, honors, relevant coursework..."
                  />
                  <FAQExamples 
                    field="description" 
                    currentValue={edu.description} 
                    onValueChange={(value) => updateItem<Education>('education', edu.id, 'description', value)} 
                  />
                </div>
             </div>
          </FormSection>
        ))}
      </div>

      {/* 4. Skills */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-visible">
         <div 
           className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between cursor-pointer"
           onClick={() => toggleSection('skills')}
         >
           <h3 className="font-bold text-text-main flex items-center gap-2">
             <Code size={18} className="text-primary" /> Skills
           </h3>
           {openSections['skills'] ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
         </div>
         
         {openSections['skills'] && (
           <div className="p-5 animate-fade-in space-y-2">
             <label className="block text-sm text-text-muted">Separate skills with commas</label>
             <textarea 
                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                rows={3}
                value={data.skills.join(', ')}
                onChange={handleSkillsChange}
                placeholder="React, TypeScript, Figma, Project Management..."
              />
              <FAQExamples 
                field="skills" 
                currentValue={data.skills.join(', ')} 
                onValueChange={(value) => {
                  const skillsArray = value.split(',').map(s => s.trim());
                  onChange({ ...data, skills: skillsArray });
                }} 
              />
           </div>
         )}
      </div>

      {/* 5. Projects */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
           <h3 className="font-bold text-text-main flex items-center gap-2">
             <FolderGit2 size={18} className="text-primary" /> Projects
           </h3>
           <Button 
             size="sm" 
             variant="outline" 
             icon={<Plus size={14} />} 
             onClick={() => addItem('projects', {
               id: Date.now().toString(),
               name: '',
               description: '',
               link: ''
             })}
           >
             Add
           </Button>
        </div>
        
        {data.projects.map((proj) => (
          <FormSection
            key={proj.id}
            title={proj.name || 'Add Project'}
            isOpen={!!openSections[proj.id]}
            onToggle={() => toggleSection(proj.id)}
            onRemove={() => removeItem('projects', proj.id)}
          >
             <div className="space-y-4">
                <Input label="Project Name" value={proj.name} onChange={e => updateItem<Project>('projects', proj.id, 'name', e.target.value)} placeholder="e.g. E-commerce Platform" />
                <Input label="Link (Optional)" placeholder="github.com/project" value={proj.link} onChange={e => updateItem<Project>('projects', proj.id, 'link', e.target.value)} />
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-text-main">Description</label>
                  <textarea 
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    rows={2}
                    value={proj.description}
                    onChange={e => updateItem<Project>('projects', proj.id, 'description', e.target.value)}
                    placeholder="Describe your role and achievements in this project..."
                  />
                  <FAQExamples 
                    field="description" 
                    currentValue={proj.description} 
                    onValueChange={(value) => updateItem<Project>('projects', proj.id, 'description', value)} 
                  />
                </div>
             </div>
          </FormSection>
        ))}
      </div>

      {/* 6. Certifications */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
           <h3 className="font-bold text-text-main flex items-center gap-2">
             <Award size={18} className="text-primary" /> Certifications
           </h3>
           <Button 
             size="sm" 
             variant="outline" 
             icon={<Plus size={14} />} 
             onClick={() => addItem('certifications', {
               id: Date.now().toString(),
               name: '',
               issuer: '',
               date: ''
             })}
           >
             Add
           </Button>
        </div>
        
        {data.certifications.map((cert) => (
          <FormSection
            key={cert.id}
            title={cert.name || 'Add Certification'}
            subtitle={cert.issuer}
            isOpen={!!openSections[cert.id]}
            onToggle={() => toggleSection(cert.id)}
            onRemove={() => removeItem('certifications', cert.id)}
          >
             <div className="space-y-4">
                <Input label="Certification Name" value={cert.name} onChange={e => updateItem<Certification>('certifications', cert.id, 'name', e.target.value)} placeholder="e.g. AWS Certified Solutions Architect" />
                <Input label="Issuing Organization" value={cert.issuer} onChange={e => updateItem<Certification>('certifications', cert.id, 'issuer', e.target.value)} placeholder="e.g. Amazon Web Services" />
                <Input label="Date" placeholder="YYYY" value={cert.date} onChange={e => updateItem<Certification>('certifications', cert.id, 'date', e.target.value)} />
             </div>
          </FormSection>
        ))}
      </div>

    </div>
  );
};
