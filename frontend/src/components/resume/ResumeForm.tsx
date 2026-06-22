import React, { useState } from 'react';
import { ResumeData, Experience, Education, Project, Certification, Language, AdditionalInfo } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { FormSection } from '../ui/FormSection';
import { Plus, User, Briefcase, GraduationCap, Code, FolderGit2, Award, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, RefreshCw, Loader2, X } from 'lucide-react';
import { LOCATION_OPTIONS, LocationOption } from '../../data/locations';

import { useAuth } from '../../context/AuthContext';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

// Step configuration
const steps = [
  { id: 1, title: 'Personal Info', icon: User, color: 'text-indigo-600' },
  { id: 2, title: 'Experience', icon: Briefcase, color: 'text-indigo-600' },
  { id: 3, title: 'Education', icon: GraduationCap, color: 'text-indigo-600' },
  { id: 4, title: 'Skills', icon: Code, color: 'text-indigo-600' },
  { id: 5, title: 'Projects', icon: FolderGit2, color: 'text-indigo-600' },
  { id: 6, title: 'Certifications', icon: Award, color: 'text-indigo-600' },
];

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  const { token } = useAuth();
  
  // Multi-step wizard state
  const [currentStep, setCurrentStep] = useState(1);
  
  // Use a map to track open states for accordions (keep existing functionality)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
  });

  // AI Loading states
  const [aiLoading, setAiLoading] = useState<{
    summary: boolean;
    experiences: Record<string, boolean>;
    skills: boolean;
    improveText: Record<string, boolean>;
  }>({ summary: false, experiences: {}, skills: false, improveText: {} });

  // State for suggested skills
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);

  // State for improve text modal
  const [improveModal, setImproveModal] = useState<{
    isOpen: boolean;
    field: 'summary' | 'experience' | 'education' | 'project';
    id?: string;
    original: string;
    improved: string;
  } | null>(null);

  // Helper to make API calls
  const callAI = async (endpoint: string, payload: any) => {
    try {
      const response = await fetch(`/api/ai${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Failed to call AI');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      alert('Something went wrong with AI. Please try again.');
      throw error;
    }
  };

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Step navigation functions
  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // AI Handlers
  const generateSummary = async () => {
    setAiLoading(prev => ({ ...prev, summary: true }));
    try {
      const res = await callAI('/generate-summary', {
        experience: data.experience,
        education: data.education,
        skills: data.skills,
        jobTitle: data.personalInfo.jobTitle,
        objective: '',
      });
      updatePersonalInfo('summary', res.summary);
    } finally {
      setAiLoading(prev => ({ ...prev, summary: false }));
    }
  };

  const generateExperienceDescription = async (id: string, role: string, company: string) => {
    setAiLoading(prev => ({ ...prev, experiences: { ...prev.experiences, [id]: true } }));
    try {
      const res = await callAI('/generate-experience', { role, company });
      // @ts-ignore - dynamic field access
      updateItem('experience', id, 'description', res.description);
    } finally {
      setAiLoading(prev => ({ ...prev, experiences: { ...prev.experiences, [id]: false } }));
    }
  };

  const suggestSkills = async () => {
    setAiLoading(prev => ({ ...prev, skills: true }));
    try {
      const res = await callAI('/suggest-skills', {
        experience: data.experience,
        education: data.education,
        existingSkills: data.skills,
      });
      setSuggestedSkills(res.skills);
    } finally {
      setAiLoading(prev => ({ ...prev, skills: false }));
    }
  };

  const addSuggestedSkill = (skill: string) => {
    if (!data.skills.includes(skill)) {
      onChange({ ...data, skills: [...data.skills, skill] });
    }
  };

  const improveText = async (
    field: 'summary' | 'experience' | 'education' | 'project',
    text: string,
    id?: string
  ) => {
    setAiLoading(prev => ({ ...prev, improveText: { ...prev.improveText, [field]: true } }));
    try {
      const res = await callAI('/improve-writing', { text });
      setImproveModal({
        isOpen: true,
        field,
        id,
        original: text,
        improved: res.improvedText,
      });
    } finally {
      setAiLoading(prev => ({ ...prev, improveText: { ...prev.improveText, [field]: false } }));
    }
  };

  const acceptImprovedText = () => {
    if (!improveModal) return;
    const { field, id, improved } = improveModal;
    if (field === 'summary') {
      updatePersonalInfo('summary', improved);
    } else if (field === 'experience' && id) {
      // @ts-ignore - dynamic field access
      updateItem('experience', id, 'description', improved);
    } else if (field === 'education' && id) {
      // @ts-ignore - dynamic field access
      updateItem('education', id, 'description', improved);
    } else if (field === 'project' && id) {
      // @ts-ignore - dynamic field access
      updateItem('projects', id, 'description', improved);
    }
    setImproveModal(null);
  };

  return (
    <div className="pb-20">
      {/* Current Step Content */}
      <div className="space-y-6">
        
        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <User size={20} className="text-indigo-600" />
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
            </div>
            <div className="space-y-4">
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
                <label className="block text-sm font-medium text-gray-800">Location</label>
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
                    className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 shadow-sm"
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
                  <label className="block text-sm font-medium text-gray-800">Professional Summary</label>
                  <textarea 
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    rows={4}
                    value={data.personalInfo.summary}
                    onChange={e => updatePersonalInfo('summary', e.target.value)}
                    placeholder="Briefly describe your professional background and goals..."
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={generateSummary}
                      disabled={aiLoading.summary}
                      icon={aiLoading.summary ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                    >
                      {aiLoading.summary ? 'Generating...' : 'Generate AI Summary'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => improveText('summary', data.personalInfo.summary)}
                      disabled={!data.personalInfo.summary}
                    >
                      Improve with AI
                    </Button>
                  </div>

                </div>
            </div>
          </div>
        )}

        {/* Step 2: Experience */}
        {currentStep === 2 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Briefcase size={20} className="text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">Experience</h3>
              </div>
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
                Add Experience
              </Button>
            </div>
            <div className="space-y-4">
              {data.experience.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No experience added yet. Click "Add Experience" to start!
                </div>
              ) : (
                data.experience.map((exp) => (
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
                          className="rounded text-indigo-600 focus:ring-indigo-600 w-4 h-4"
                          />
                          <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-800">I currently work here</label>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-800">Description</label>
                        <textarea 
                          className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                          rows={4}
                          value={exp.description}
                          onChange={e => updateItem<Experience>('experience', exp.id, 'description', e.target.value)}
                          placeholder="• Achieved X by doing Y..."
                        />
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateExperienceDescription(exp.id, exp.role, exp.company)}
                            disabled={!exp.role || !exp.company || aiLoading.experiences[exp.id]}
                            icon={aiLoading.experiences[exp.id] ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                          >
                            {aiLoading.experiences[exp.id] ? 'Generating...' : 'Generate Description'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => improveText('experience', exp.description, exp.id)}
                            disabled={!exp.description}
                          >
                            Improve with AI
                          </Button>
                        </div>

                      </div>
                    </div>
                  </FormSection>
                ))
              )}
            </div>
          </div>
        )}

        {/* Step3: Education */}
        {currentStep === 3 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <GraduationCap size={20} className="text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">Education</h3>
              </div>
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
                Add Education
              </Button>
            </div>
            <div className="space-y-4">
              {data.education.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No education added yet. Click "Add Education" to start!
                </div>
              ) : (
                data.education.map((edu) => (
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
                        <label className="block text-sm font-medium text-gray-800">Description</label>
                        <textarea 
                          className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                          rows={2}
                          value={edu.description}
                          onChange={e => updateItem<Education>('education', edu.id, 'description', e.target.value)}
                          placeholder="Academic achievements, honors, relevant coursework..."
                        />
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => improveText('education', edu.description, edu.id)}
                            disabled={!edu.description}
                          >
                            Improve with AI
                          </Button>
                        </div>

                      </div>
                    </div>
                  </FormSection>
                ))
              )}
            </div>
          </div>
        )}

        {/* Step4: Skills */}
        {currentStep ===4 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <Code size={20} className="text-indigo-600" />
              <h3 className="text-xl font-bold text-gray-900">Skills</h3>
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-gray-600">Separate skills with commas</label>
              <textarea 
                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                rows={6}
                value={data.skills.join(', ')}
                onChange={handleSkillsChange}
                placeholder="React, TypeScript, Figma, Project Management..."
              />
              <div className="mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={suggestSkills}
                  disabled={aiLoading.skills}
                  icon={aiLoading.skills ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                >
                  {aiLoading.skills ? 'Suggesting...' : 'Suggest Skills'}
                </Button>
              </div>
              {suggestedSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {suggestedSkills.map((skill, idx) => (
                    <button
                      key={idx}
                      onClick={() => addSuggestedSkill(skill)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 hover:text-indigo-700 text-gray-700 text-sm rounded-full transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

        {/* Step5: Projects */}
        {currentStep ===5 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FolderGit2 size={20} className="text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">Projects</h3>
              </div>
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
                Add Project
              </Button>
            </div>
            <div className="space-y-4">
              {data.projects.length ===0 ? (
                <div className="text-center py-10 text-gray-500">
                  No projects added yet. Click "Add Project" to start!
                </div>
              ) : (
                data.projects.map((proj) => (
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
                        <label className="block text-sm font-medium text-gray-800">Description</label>
                        <textarea 
                          className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                          rows={2}
                          value={proj.description}
                          onChange={e => updateItem<Project>('projects', proj.id, 'description', e.target.value)}
                          placeholder="Describe your role and achievements in this project..."
                        />
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => improveText('project', proj.description, proj.id)}
                            disabled={!proj.description}
                          >
                            Improve with AI
                          </Button>
                        </div>

                      </div>
                    </div>
                  </FormSection>
                ))
              )}
            </div>
          </div>
        )}

        {/* Step6: Certifications */}
        {currentStep ===6 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Award size={20} className="text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">Certifications</h3>
              </div>
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
                Add Certification
              </Button>
            </div>
            <div className="space-y-4">
              {data.certifications.length ===0 ? (
                <div className="text-center py-10 text-gray-500">
                  No certifications added yet. Click "Add Certification" to start!
                </div>
              ) : (
                data.certifications.map((cert) => (
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
                ))
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 pt-6">
          <Button
            variant="outline"
            icon={<ChevronLeft size={16} />}
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep === steps.length ? (
            <div className="flex-1 text-right">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-lg text-white font-bold shadow-lg">
                <CheckCircle2 size={18} />
                <span>All steps completed!</span>
              </div>
            </div>
          ) : (
            <Button
              icon={<ChevronRight size={16} />}
              onClick={goToNextStep}
              iconPosition="right"
            >
              Next
            </Button>
          )}
        </div>

      </div>

      {/* Improve Text Modal */}
      {improveModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">Improve Your Text</h3>
              <button onClick={() => setImproveModal(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">Original</label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm line-through text-gray-500">
                  {improveModal.original}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-green-600 mb-1 block">Improved</label>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-gray-900">
                  {improveModal.improved}
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setImproveModal(null)}>
                Cancel
              </Button>
              <Button onClick={acceptImprovedText}>
                Accept Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
