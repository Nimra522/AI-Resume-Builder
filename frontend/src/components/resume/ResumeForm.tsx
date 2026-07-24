import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { ResumeData, Experience, Education, Project, Certification } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { FormSection } from '../ui/FormSection';
import { Plus, User, Briefcase, GraduationCap, Code, FolderGit2, Award, ChevronLeft, ChevronRight, ChevronDown, CheckCircle2, Sparkles, RefreshCw, Loader2, X, Save } from 'lucide-react';
import { LOCATION_OPTIONS, LocationOption } from '../../data/locations';
import { useClickOutside } from '../../hooks/useClickOutside';

import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useNotifications } from '../../context/NotificationContext';
import { apiUrl } from '../../utils/api';
import * as resumeValidation from '../../utils/resumeValidation';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onSave?: () => void;
  isSaving?: boolean;
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

export interface ResumeFormHandle {
  validate: () => { isValid: boolean };
}

export const ResumeForm = forwardRef<ResumeFormHandle, ResumeFormProps>(({ data, onChange, onSave, isSaving }, ref) => {
  const { token } = useAuth();
  const { showToast } = useToast();
  const { addNotification } = useNotifications();
  
  // Multi-step wizard state
  const [currentStep, setCurrentStep] = useState(1);
  
  // Use a map to track open states for accordions (keep existing functionality)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
  });

  const [experienceErrors, setExperienceErrors] = useState<Record<string, {
    role?: string;
    company?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
  }>>({});

  const [educationErrors, setEducationErrors] = useState<Record<string, {
    school?: string;
    degree?: string;
    graduationDate?: string;
    description?: string;
  }>>({});

  const [projectErrors, setProjectErrors] = useState<Record<string, {
    name?: string;
    link?: string;
    description?: string;
  }>>({});

  const [certificationErrors, setCertificationErrors] = useState<Record<string, {
    name?: string;
    issuer?: string;
    date?: string;
  }>>({});

  const [saveError, setSaveError] = useState<string>('');

  // Reusable validation function for both bottom save button and top save button (via ref)
  const doValidate = (): { isValid: boolean } => {
    setSaveError('');
    // Clean skills before saving
    const cleanedSkills = data.skills.filter(s => s.trim() !== '');
    if (cleanedSkills.length !== data.skills.length) {
      onChange({ ...data, skills: cleanedSkills });
    }

    const { isValid, errors } = resumeValidation.validateResumeBeforeSave(data);
    
    if (!isValid) {
      const msg = 'Please fix the highlighted errors before saving your resume.';
      setSaveError(msg);
      showToast(msg, 'error');
      addNotification(msg, 'error');
      // Update all error states
      if (errors.personalInfo.fullName) setNameError(errors.personalInfo.fullName);
      if (errors.personalInfo.email) setEmailError(errors.personalInfo.email);
      if (errors.personalInfo.jobTitle) setJobTitleError(errors.personalInfo.jobTitle);
      if (errors.personalInfo.phone) setPhoneError(errors.personalInfo.phone);
      if (errors.personalInfo.location) setLocationError(errors.personalInfo.location);
      if (errors.personalInfo.linkedin) setLinkedinError(errors.personalInfo.linkedin);
      if (errors.personalInfo.summary) setSummaryError(errors.personalInfo.summary);
      
      setExperienceErrors(errors.experience);
      setEducationErrors(errors.education);
      setProjectErrors(errors.projects);
      setCertificationErrors(errors.certifications);
      
      // Find first error section and navigate to that step
      let firstErrorStep = 1; // Default to Personal Info (step 1)
      const hasPersonalErrors = Object.values(errors.personalInfo).some(err => !!err);
      
      if (hasPersonalErrors) {
        firstErrorStep = 1;
      } else if (Object.keys(errors.experience).length > 0) {
        firstErrorStep = 2;
        // Open the first experience item's accordion that has errors
        const firstExpIdWithError = Object.keys(errors.experience)[0];
        setOpenSections(prev => ({ ...prev, [firstExpIdWithError]: true }));
      } else if (Object.keys(errors.education).length > 0) {
        firstErrorStep = 3;
        // Open the first education item's accordion that has errors
        const firstEduIdWithError = Object.keys(errors.education)[0];
        setOpenSections(prev => ({ ...prev, [firstEduIdWithError]: true }));
      } else if (Object.keys(errors.projects).length > 0) {
        firstErrorStep = 5;
        // Open the first project item's accordion that has errors
        const firstProjIdWithError = Object.keys(errors.projects)[0];
        setOpenSections(prev => ({ ...prev, [firstProjIdWithError]: true }));
      } else if (Object.keys(errors.certifications).length > 0) {
        firstErrorStep = 6;
        // Open the first certification item's accordion that has errors
        const firstCertIdWithError = Object.keys(errors.certifications)[0];
        setOpenSections(prev => ({ ...prev, [firstCertIdWithError]: true }));
      }
      
      // Update current step to show the first error section
      setCurrentStep(firstErrorStep);
      
      // Wait a little bit for the step to render before scrolling
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }

    return { isValid };
  };

  // Expose validate function to parent via ref
  useImperativeHandle(ref, () => ({
    validate: doValidate
  }));

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
      const response = await fetch(apiUrl(`/ai${endpoint}`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: 'Unknown error' };
        }
        if (response.status === 401) {
          throw new Error('Session expired, please log in again');
        }
        throw new Error(errorData.error || errorData.message || 'Failed to call AI');
      }
      return await response.json();
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Something went wrong with AI. Please try again.');
      throw error;
    }
  };

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateExperienceItem = (id: string, field: keyof Experience, value: string | boolean) => {
    const normalizedValue = field === 'role' || field === 'company'
      ? value
      : field === 'description'
        ? (typeof value === 'string' && value.trim() === '' ? '' : value)
        : value;

    const updatedExperience = data.experience.map(item => {
      if (item.id !== id) return item;

      if (field === 'current' && typeof normalizedValue === 'boolean' && normalizedValue) {
        return { ...item, current: normalizedValue, endDate: '' };
      }

      return { ...item, [field]: normalizedValue };
    });

    onChange({ ...data, experience: updatedExperience });

    const currentItem = updatedExperience.find(item => item.id === id);
    if (!currentItem) return;

    setExperienceErrors(prev => {
      const nextErrors = { ...(prev[id] || {}) };
      if (field === 'role') {
        nextErrors.role = resumeValidation.validateExperienceRole(currentItem.role);
      } else if (field === 'company') {
        nextErrors.company = resumeValidation.validateExperienceCompany(currentItem.company);
      } else if (field === 'description') {
        nextErrors.description = resumeValidation.validateExperienceDescription(currentItem.description);
      } else if (field === 'startDate' || field === 'endDate' || field === 'current') {
        const dateErrors = resumeValidation.validateExperienceDateRange(
          currentItem.startDate,
          currentItem.current ? '' : currentItem.endDate,
          currentItem.current
        );
        nextErrors.startDate = dateErrors.startDate;
        nextErrors.endDate = dateErrors.endDate;
      }

      return { ...prev, [id]: nextErrors };
    });
  };

  // --- Education Update Handler ---
  const updateEducationItem = (id: string, field: keyof Education, value: string) => {
    const normalizedValue = value;
    const updatedEducation = data.education.map(item =>
      item.id === id ? { ...item, [field]: normalizedValue } : item
    );
    onChange({ ...data, education: updatedEducation });

    const currentItem = updatedEducation.find(item => item.id === id);
    if (!currentItem) return;

    setEducationErrors(prev => {
      const nextErrors = { ...(prev[id] || {}) };
      if (field === 'school') {
        nextErrors.school = resumeValidation.validateEducationSchool(currentItem.school);
      } else if (field === 'degree') {
        nextErrors.degree = resumeValidation.validateEducationDegree(currentItem.degree);
      } else if (field === 'graduationDate') {
        nextErrors.graduationDate = resumeValidation.validateEducationGraduationDate(currentItem.graduationDate);
      } else if (field === 'description') {
        nextErrors.description = resumeValidation.validateEducationDescription(currentItem.description);
      }
      return { ...prev, [id]: nextErrors };
    });
  };

  // --- Project Update Handler ---
  const updateProjectItem = (id: string, field: keyof Project, value: string) => {
    const normalizedValue = value;
    const updatedProjects = data.projects.map(item =>
      item.id === id ? { ...item, [field]: normalizedValue } : item
    );
    onChange({ ...data, projects: updatedProjects });

    const currentItem = updatedProjects.find(item => item.id === id);
    if (!currentItem) return;

    setProjectErrors(prev => {
      const nextErrors = { ...(prev[id] || {}) };
      if (field === 'name') {
        nextErrors.name = resumeValidation.validateProjectName(currentItem.name);
      } else if (field === 'link') {
        nextErrors.link = resumeValidation.validateProjectLink(currentItem.link || '');
      } else if (field === 'description') {
        nextErrors.description = resumeValidation.validateProjectDescription(currentItem.description);
      }
      return { ...prev, [id]: nextErrors };
    });
  };

  // --- Certification Update Handler ---
  const updateCertificationItem = (id: string, field: keyof Certification, value: string) => {
    const normalizedValue = value;
    const updatedCertifications = data.certifications.map(item =>
      item.id === id ? { ...item, [field]: normalizedValue } : item
    );
    onChange({ ...data, certifications: updatedCertifications });

    const currentItem = updatedCertifications.find(item => item.id === id);
    if (!currentItem) return;

    setCertificationErrors(prev => {
      const nextErrors = { ...(prev[id] || {}) };
      if (field === 'name') {
        nextErrors.name = resumeValidation.validateCertificationName(currentItem.name);
      } else if (field === 'issuer') {
        nextErrors.issuer = resumeValidation.validateCertificationIssuer(currentItem.issuer);
      } else if (field === 'date') {
        nextErrors.date = resumeValidation.validateCertificationDate(currentItem.date);
      }
      return { ...prev, [id]: nextErrors };
    });
  };

  // Step navigation functions
  const goToNextStep = () => {
    if (currentStep === 1) {
      const fullNameError = resumeValidation.validateFullName(data.personalInfo.fullName.trim());
      setNameError(fullNameError);
      if (fullNameError) {
        return;
      }
    }

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
    if (currentStep === 1 && step > currentStep) {
      const fullNameError = resumeValidation.validateFullName(data.personalInfo.fullName.trim());
      setNameError(fullNameError);
      if (fullNameError) {
        return;
      }
    }

    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // No validation restrictions - all inputs are unrestricted
  
    // State for email field validation error
    const [emailError, setEmailError] = useState<string>('');

  // --- Handlers ---

  // State for name field validation error
  const [nameError, setNameError] = useState<string>('');
  const [jobTitleError, setJobTitleError] = useState<string>('');
  
  // State for phone field validation error
  const [phoneError, setPhoneError] = useState<string>('');
  const [locationError, setLocationError] = useState<string>('');
  const [linkedinError, setLinkedinError] = useState<string>('');
  const [summaryError, setSummaryError] = useState<string>('');
  
  // State for location suggestions
  const [showLocationSuggestions, setShowLocationSuggestions] = useState<boolean>(false);
  const [filteredLocations, setFilteredLocations] = useState<LocationOption[]>(LOCATION_OPTIONS);
  const locationRef = useRef<HTMLDivElement>(null);
  
  // Close location dropdown when clicking outside
  useClickOutside(locationRef, () => {
    setShowLocationSuggestions(false);
  });

  const COUNTRY_CODES = [
    { code: '+92', country: 'PK', label: 'Pakistan' },
    { code: '+1', country: 'US', label: 'United States / Canada' },
    { code: '+44', country: 'GB', label: 'United Kingdom' },
    { code: '+971', country: 'AE', label: 'UAE' },
    { code: '+966', country: 'SA', label: 'Saudi Arabia' },
    { code: '+91', country: 'IN', label: 'India' },
    { code: '+61', country: 'AU', label: 'Australia' },
    { code: '+49', country: 'DE', label: 'Germany' },
    { code: '+33', country: 'FR', label: 'France' },
    { code: '+39', country: 'IT', label: 'Italy' },
    { code: '+34', country: 'ES', label: 'Spain' },
    { code: '+86', country: 'CN', label: 'China' },
    { code: '+81', country: 'JP', label: 'Japan' },
    { code: '+82', country: 'KR', label: 'South Korea' },
    { code: '+65', country: 'SG', label: 'Singapore' },
    { code: '+60', country: 'MY', label: 'Malaysia' },
    { code: '+62', country: 'ID', label: 'Indonesia' },
    { code: '+90', country: 'TR', label: 'Turkey' },
    { code: '+7', country: 'RU', label: 'Russia' },
    { code: '+55', country: 'BR', label: 'Brazil' },
    { code: '+52', country: 'MX', label: 'Mexico' },
    { code: '+20', country: 'EG', label: 'Egypt' },
    { code: '+27', country: 'ZA', label: 'South Africa' },
    { code: '+234', country: 'NG', label: 'Nigeria' },
    { code: '+880', country: 'BD', label: 'Bangladesh' },
    { code: '+63', country: 'PH', label: 'Philippines' },
    { code: '+84', country: 'VN', label: 'Vietnam' },
    { code: '+66', country: 'TH', label: 'Thailand' },
    { code: '+31', country: 'NL', label: 'Netherlands' },
    { code: '+41', country: 'CH', label: 'Switzerland' },
    { code: '+64', country: 'NZ', label: 'New Zealand' },
    { code: '+46', country: 'SE', label: 'Sweden' },
    { code: '+47', country: 'NO', label: 'Norway' },
    { code: '+45', country: 'DK', label: 'Denmark' },
    { code: '+358', country: 'FI', label: 'Finland' },
    { code: '+353', country: 'IE', label: 'Ireland' },
    { code: '+48', country: 'PL', label: 'Poland' },
    { code: '+852', country: 'HK', label: 'Hong Kong' },
    { code: '+886', country: 'TW', label: 'Taiwan' },
  ];

  // Phone country code dropdown state
  const [showPhoneDropdown, setShowPhoneDropdown] = useState<boolean>(false);
  const phoneDropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(phoneDropdownRef, () => {
    setShowPhoneDropdown(false);
  });

  const handleCountryCodeSelect = (newCode: string) => {
    const currentCode = data.personalInfo.countryCode || '+1';
    const currentPhone = data.personalInfo.phone;
    const localNumber = currentPhone.startsWith(currentCode)
      ? currentPhone.slice(currentCode.length).replace(/[^\d\s\-()]/g, '').trim()
      : currentPhone.replace(/[^\d\s\-()]/g, '').trim();
    const newPhone = newCode + localNumber;

    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, countryCode: newCode, phone: newPhone }
    });

    if (newPhone) {
      setPhoneError(resumeValidation.validatePhone(newPhone));
    } else {
      setPhoneError('');
    }
    setShowPhoneDropdown(false);
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // Detect paste of full international number with + prefix
    if (raw.startsWith('+')) {
      const matched = COUNTRY_CODES.find(c => raw.startsWith(c.code));
      if (matched) {
        const localPart = raw.slice(matched.code.length).replace(/[^\d\s\-()]/g, '').trim();
        if (localPart) {
          const newPhone = matched.code + localPart;
          onChange({
            ...data,
            personalInfo: { ...data.personalInfo, countryCode: matched.code, phone: newPhone }
          });
          const err = resumeValidation.validatePhone(newPhone);
          setPhoneError(err || '');
          return;
        }
      }
    }

    const filtered = raw.replace(/[^\d\s\-()]/g, '').trim();
    const code = data.personalInfo.countryCode || '+1';
    const newPhone = code + filtered;

    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, phone: newPhone }
    });

    if (newPhone) {
      setPhoneError(resumeValidation.validatePhone(newPhone));
    } else {
      setPhoneError('');
    }
  };

  const displayPhoneNumber = () => {
    const code = data.personalInfo.countryCode || '+1';
    const phone = data.personalInfo.phone;
    return phone.startsWith(code) ? phone.slice(code.length).trim() : phone.trim();
  };
  


  const updatePersonalInfo = (field: string, value: string) => {
    const normalizedValue = value;

    if (field === 'fullName') {
      if (nameError) setNameError('');
    } else if (field === 'jobTitle') {
      setJobTitleError(resumeValidation.validateJobTitle(value.trim()));
    } else if (field === 'email') {
      setEmailError(resumeValidation.validateEmail(value.trim()));
    } else if (field === 'phone') {
      setPhoneError(resumeValidation.validatePhone(value.trim()));
    } else if (field === 'location') {
      setLocationError(resumeValidation.validateLocation(value.trim()));
    } else if (field === 'linkedin') {
      setLinkedinError(resumeValidation.validateLinkedin(value.trim()));
    } else if (field === 'summary') {
      setSummaryError(resumeValidation.validateSummary(value.trim()));
    }

    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: normalizedValue }
    });
  };

  const handleFullNameBlur = (value: string) => {
    setNameError(resumeValidation.validateFullName(value.trim()));
  };

  // Handle phone validation on blur
  const handlePhoneBlur = () => {
    setPhoneError(resumeValidation.validatePhone(data.personalInfo.phone));
  };
  
  // Handle email validation on blur
  const handleEmailBlur = (value: string) => {
    setEmailError(resumeValidation.validateEmail(value.trim()));
  };

  const handleLinkedinBlur = (value: string) => {
    setLinkedinError(resumeValidation.validateLinkedin(value.trim()));
  };

  const handleLocationBlur = (value: string) => {
    setLocationError(resumeValidation.validateLocation(value.trim()));
  };

  const handleSummaryBlur = (value: string) => {
    setSummaryError(resumeValidation.validateSummary(value.trim()));
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
    const nextItems = [newItem, ...(data[section] as unknown as any[])];
    onChange({ ...data, [section]: nextItems });
    setOpenSections(prev => ({ ...prev, [newItem.id]: true }));

    if (section === 'experience') {
      window.setTimeout(() => {
        document.getElementById(`experience-section-${newItem.id}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 120);
    }
  };

  const removeItem = (section: keyof ResumeData, id: string) => {
    // @ts-ignore
    onChange({ ...data, [section]: (data[section] as any[]).filter(item => item.id !== id) });
  };

  // Skills
  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
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
        jobTitle: data.personalInfo.jobTitle,
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
                  onBlur={(e) => handleFullNameBlur(e.target.value)}
                  placeholder="e.g. John Doe" 
                  error={nameError}
                  required
                  maxLength={100}
                />
                <Input 
                  label="Job Title"
                  value={data.personalInfo.jobTitle} 
                  onChange={e => updatePersonalInfo('jobTitle', e.target.value)} 
                  onBlur={(e) => setJobTitleError(resumeValidation.validateJobTitle(e.target.value.trim()))}
                  placeholder="e.g. Software Engineer"
                  error={jobTitleError}
                  maxLength={100}
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
                  maxLength={254}
                />
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-text-main">Phone</label>
                  <div className="flex w-full">
                    <div className="relative" ref={phoneDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setShowPhoneDropdown(!showPhoneDropdown)}
                        className="h-[47px] w-[45px] px-1 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 text-sm font-medium text-text-main flex items-center gap-1 transition-colors"
                      >
                        {data.personalInfo.countryCode || '+1'}
                        <ChevronDown size={20} strokeWidth={4} className="text-gray-500" />
                      </button>
                      {showPhoneDropdown && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 min-w-[180px]">
                          {COUNTRY_CODES.map(c => (
                            <button
                              key={c.code + c.country}
                              type="button"
                              onClick={() => handleCountryCodeSelect(c.code)}
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-indigo-50 transition-colors ${
                                (data.personalInfo.countryCode || '+1') === c.code ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700'
                              }`}
                            >
                              <span>{c.country}</span>
                              <span className="text-gray-400 ml-2">{c.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      value={displayPhoneNumber()}
                      onChange={handlePhoneInputChange}
                      onBlur={handlePhoneBlur}
                      placeholder="300 1234567"
                      className="flex-1 block w-full rounded-r-lg border border-gray-300 bg-white px-4 py-2.5 text-text-main placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm"
                    />
                  </div>
                  {phoneError && (
                    <p className="text-sm text-red-500">{phoneError}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-main">Location</label>
                <div className="relative" ref={locationRef}>
                  <input
                    type="text"
                    placeholder="City, Country"
                    value={data.personalInfo.location}
                    onChange={(e) => {
                      const value = e.target.value;
                      updatePersonalInfo('location', value);
                      
                      // Filter location suggestions based on input
                      const filtered = LOCATION_OPTIONS.filter(loc => 
                        loc.name.toLowerCase().includes(value.toLowerCase())
                      ).slice(0,8);
                      setFilteredLocations(filtered);
                      setShowLocationSuggestions(true);
                    }}
                    onBlur={(e) => handleLocationBlur(e.target.value)}
                    onFocus={() => {
                      setShowLocationSuggestions(true);
                    }}
                    maxLength={100}
                    className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-text-main placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm"
                  />
                  {showLocationSuggestions && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredLocations.length > 0 ? (
                        filteredLocations.map((loc) => (
                          <div
                            key={loc.id}
                            className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition-colors"
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
                  placeholder="linkedin.com/in/john"
                  error={linkedinError}
                  maxLength={255}
                />
              </div>
              <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-800">Professional Summary</label>
                  <textarea 
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    rows={4}
                    value={data.personalInfo.summary}
                    onChange={e => updatePersonalInfo('summary', e.target.value)}
                    onBlur={(e) => handleSummaryBlur(e.target.value)}
                    placeholder="Briefly describe your professional background and goals..."
                    maxLength={1000}
                  />
                  {summaryError && (
                    <p className="text-sm text-red-500">{summaryError}</p>
                  )}
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
                  <div key={exp.id} id={`experience-section-${exp.id}`}>
                    <FormSection
                      title={exp.company || 'Add Company'}
                      subtitle={exp.role}
                      isOpen={!!openSections[exp.id]}
                      onToggle={() => toggleSection(exp.id)}
                      onRemove={() => {
                        if (window.confirm('Are you sure you want to remove this experience?')) {
                          removeItem('experience', exp.id);
                        }
                      }}
                    >
                      <div className="space-y-4">
                        <Input
                          label="Job Title"
                          value={exp.role}
                          error={experienceErrors[exp.id]?.role || ''}
                          onChange={e => updateExperienceItem(exp.id, 'role', e.target.value)}
                          placeholder="e.g. Software Engineer"
                        />
                        <Input
                          label="Company"
                          value={exp.company}
                          error={experienceErrors[exp.id]?.company || ''}
                          onChange={e => updateExperienceItem(exp.id, 'company', e.target.value)}
                          placeholder="e.g. Google"
                        />
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <Input
                            label="Start Date"
                            type="date"
                            value={exp.startDate}
                            error={experienceErrors[exp.id]?.startDate || ''}
                            onChange={e => updateExperienceItem(exp.id, 'startDate', e.target.value)}
                          />
                          <Input
                            label="End Date"
                            type="date"
                            disabled={exp.current}
                            value={exp.endDate}
                            error={experienceErrors[exp.id]?.endDate || ''}
                            onChange={e => updateExperienceItem(exp.id, 'endDate', e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                            type="checkbox" 
                            id={`current-${exp.id}`}
                            checked={exp.current}
                            onChange={e => updateExperienceItem(exp.id, 'current', e.target.checked)}
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
                            maxLength={500}
                            onChange={e => updateExperienceItem(exp.id, 'description', e.target.value)}
                            placeholder="• Developed responsive web applications using React
• Improved application performance by 30%"
                          />
                          <div className="flex items-center justify-between gap-2 text-sm">
                            <span className="text-red-500">{experienceErrors[exp.id]?.description || ''}</span>
                            <span className={`${exp.description.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
                              {exp.description.length}/500
                            </span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="whitespace-nowrap"
                              onClick={() => generateExperienceDescription(exp.id, exp.role, exp.company)}
                              disabled={!exp.role.trim() || !exp.company.trim() || aiLoading.experiences[exp.id]}
                              icon={aiLoading.experiences[exp.id] ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                            >
                              {aiLoading.experiences[exp.id] ? 'Generating...' : 'Generate Description'}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="whitespace-nowrap"
                              onClick={() => improveText('experience', exp.description, exp.id)}
                              disabled={!exp.role.trim() || !exp.company.trim() || !exp.description.trim()}
                            >
                              Improve with AI
                            </Button>
                          </div>

                        </div>
                      </div>
                    </FormSection>
                  </div>
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
                      <Input 
                        label="School / University" 
                        value={edu.school} 
                        onChange={e => updateEducationItem(edu.id, 'school', e.target.value)} 
                        onBlur={() => {
                          setEducationErrors(prev => ({
                            ...prev,
                            [edu.id]: { ...prev[edu.id], school: resumeValidation.validateEducationSchool(edu.school) }
                          }));
                        }}
                        placeholder="e.g. Stanford University" 
                        error={educationErrors[edu.id]?.school}
                        maxLength={100}
                      />
                      <Input 
                        label="Degree / Major" 
                        value={edu.degree} 
                        onChange={e => updateEducationItem(edu.id, 'degree', e.target.value)} 
                        onBlur={() => {
                          setEducationErrors(prev => ({
                            ...prev,
                            [edu.id]: { ...prev[edu.id], degree: resumeValidation.validateEducationDegree(edu.degree) }
                          }));
                        }}
                        placeholder="e.g. B.S. Computer Science" 
                        error={educationErrors[edu.id]?.degree}
                        maxLength={100}
                      />
                      <Input 
                        label="Graduation Date" 
                        type="date" 
                        value={edu.graduationDate} 
                        onChange={e => updateEducationItem(edu.id, 'graduationDate', e.target.value)} 
                        onBlur={() => {
                          setEducationErrors(prev => ({
                            ...prev,
                            [edu.id]: { ...prev[edu.id], graduationDate: resumeValidation.validateEducationGraduationDate(edu.graduationDate) }
                          }));
                        }}
                        error={educationErrors[edu.id]?.graduationDate}
                      />
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-800">Description</label>
                        <textarea 
                          className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                          rows={2}
                          value={edu.description}
                          onChange={e => updateEducationItem(edu.id, 'description', e.target.value)}
                          onBlur={() => {
                            setEducationErrors(prev => ({
                              ...prev,
                              [edu.id]: { ...prev[edu.id], description: resumeValidation.validateEducationDescription(edu.description) }
                            }));
                          }}
                          placeholder="Academic achievements, honors, relevant coursework..."
                          maxLength={500}
                        />
                        {educationErrors[edu.id]?.description && (
                          <p className="text-sm text-red-500">{educationErrors[edu.id].description}</p>
                        )}
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
                      <Input 
                        label="Project Name" 
                        value={proj.name} 
                        onChange={e => updateProjectItem(proj.id, 'name', e.target.value)} 
                        onBlur={() => {
                          setProjectErrors(prev => ({
                            ...prev,
                            [proj.id]: { ...prev[proj.id], name: resumeValidation.validateProjectName(proj.name) }
                          }));
                        }}
                        placeholder="e.g. E-commerce Platform" 
                        error={projectErrors[proj.id]?.name}
                        maxLength={100}
                      />
                      <Input 
                        label="Link (Optional)" 
                        placeholder="github.com/project" 
                        value={proj.link} 
                        onChange={e => updateProjectItem(proj.id, 'link', e.target.value)} 
                        onBlur={() => {
                          setProjectErrors(prev => ({
                            ...prev,
                            [proj.id]: { ...prev[proj.id], link: resumeValidation.validateProjectLink(proj.link || '') }
                          }));
                        }}
                        error={projectErrors[proj.id]?.link}
                        maxLength={255}
                      />
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-800">Description</label>
                        <textarea 
                          className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                          rows={2}
                          value={proj.description}
                          onChange={e => updateProjectItem(proj.id, 'description', e.target.value)}
                          onBlur={() => {
                            setProjectErrors(prev => ({
                              ...prev,
                              [proj.id]: { ...prev[proj.id], description: resumeValidation.validateProjectDescription(proj.description) }
                            }));
                          }}
                          placeholder="Describe your role and achievements in this project..."
                          maxLength={500}
                        />
                        {projectErrors[proj.id]?.description && (
                          <p className="text-sm text-red-500">{projectErrors[proj.id].description}</p>
                        )}
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
                      <Input 
                        label="Certification Name" 
                        value={cert.name} 
                        onChange={e => updateCertificationItem(cert.id, 'name', e.target.value)} 
                        onBlur={() => {
                          setCertificationErrors(prev => ({
                            ...prev,
                            [cert.id]: { ...prev[cert.id], name: resumeValidation.validateCertificationName(cert.name) }
                          }));
                        }}
                        placeholder="e.g. AWS Certified Solutions Architect" 
                        error={certificationErrors[cert.id]?.name}
                        maxLength={100}
                      />
                      <Input 
                        label="Issuing Organization" 
                        value={cert.issuer} 
                        onChange={e => updateCertificationItem(cert.id, 'issuer', e.target.value)} 
                        onBlur={() => {
                          setCertificationErrors(prev => ({
                            ...prev,
                            [cert.id]: { ...prev[cert.id], issuer: resumeValidation.validateCertificationIssuer(cert.issuer) }
                          }));
                        }}
                        placeholder="e.g. Amazon Web Services" 
                        error={certificationErrors[cert.id]?.issuer}
                        maxLength={100}
                      />
                      <Input 
                        label="Date" 
                        placeholder="YYYY" 
                        value={cert.date} 
                        onChange={e => updateCertificationItem(cert.id, 'date', e.target.value)} 
                        onBlur={() => {
                          setCertificationErrors(prev => ({
                            ...prev,
                            [cert.id]: { ...prev[cert.id], date: resumeValidation.validateCertificationDate(cert.date) }
                          }));
                        }}
                        error={certificationErrors[cert.id]?.date}
                      />
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
            <div className="flex-1 flex items-center justify-end gap-4">
              <div className="inline-flex items-center gap-2 text-gray-600 font-medium">
                <CheckCircle2 size={18} className="text-indigo-600" />
                <span>All sections completed!</span>
              </div>
              {saveError && (
                <div className="text-red-500 text-sm flex items-center gap-1 w-full">
                  <span>{saveError}</span>
                </div>
              )}
              {onSave && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const { isValid } = doValidate();
                    if (isValid && onSave) {
                      onSave();
                    }
                  }}
                  disabled={isSaving}
                  icon={isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                  iconPosition="left"
                >
                  {isSaving ? 'Saving...' : 'Save Resume'}
                </Button>
              )}
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
});
