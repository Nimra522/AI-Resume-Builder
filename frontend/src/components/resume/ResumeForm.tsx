import React, { useState, useRef } from 'react';
import { ResumeData, Experience, Education, Project, Certification } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { FormSection } from '../ui/FormSection';
import { Plus, User, Briefcase, GraduationCap, Code, FolderGit2, Award, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, RefreshCw, Loader2, X, Save } from 'lucide-react';
import { LOCATION_OPTIONS, LocationOption } from '../../data/locations';
import { useClickOutside } from '../../hooks/useClickOutside';

import { useAuth } from '../../context/AuthContext';
import { apiUrl } from '../../utils/api';

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

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange, onSave, isSaving }) => {
  const { token } = useAuth();
  
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

  const validateExperienceRole = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return '';
    if (trimmedValue.length > 100) return 'Job title must be at most 100 characters.';
    if (!/^[A-Za-z0-9 ,./#+&()-]+$/.test(trimmedValue)) {
      return 'Use letters, numbers, spaces, hyphens, slashes, dots, plus, hash, commas, parentheses, or ampersands.';
    }
    return '';
  };

  const validateExperienceCompany = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return '';
    if (trimmedValue.length > 100) return 'Company name must be at most 100 characters.';
    if (!/^[A-Za-z0-9 .,&'()/-]+$/.test(trimmedValue)) {
      return 'Company name contains unsupported characters.';
    }
    return '';
  };

  const validateExperienceDescription = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      if (value.length > 0) return 'Description cannot be empty spaces only.';
      return '';
    }
    if (trimmedValue.length > 500) return 'Description must be at most 500 characters.';
    return '';
  };

  const validateExperienceDateRange = (startDate: string, endDate: string, current: boolean) => {
    const errors = { startDate: '', endDate: '' };
    if (!startDate) return errors;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(`${startDate}T00:00:00`);

    if (start > today) {
      errors.startDate = 'Start date cannot be in the future.';
    }

    if (current || !endDate) {
      return errors;
    }

    const end = new Date(`${endDate}T00:00:00`);
    if (end < start) {
      errors.endDate = 'End date cannot be before start date.';
    }

    return errors;
  };

  const updateExperienceItem = (id: string, field: keyof Experience, value: string | boolean) => {
    const normalizedValue = field === 'role' || field === 'company'
      ? (typeof value === 'string' ? value.trim() : value)
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
        nextErrors.role = validateExperienceRole(currentItem.role);
      } else if (field === 'company') {
        nextErrors.company = validateExperienceCompany(currentItem.company);
      } else if (field === 'description') {
        nextErrors.description = validateExperienceDescription(currentItem.description);
      } else if (field === 'startDate' || field === 'endDate' || field === 'current') {
        const dateErrors = validateExperienceDateRange(
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
    const normalizedValue = typeof value === 'string' ? value.trim() : value;
    const updatedEducation = data.education.map(item =>
      item.id === id ? { ...item, [field]: normalizedValue } : item
    );
    onChange({ ...data, education: updatedEducation });

    const currentItem = updatedEducation.find(item => item.id === id);
    if (!currentItem) return;

    setEducationErrors(prev => {
      const nextErrors = { ...(prev[id] || {}) };
      if (field === 'school') {
        nextErrors.school = validateEducationSchool(currentItem.school);
      } else if (field === 'degree') {
        nextErrors.degree = validateEducationDegree(currentItem.degree);
      } else if (field === 'graduationDate') {
        nextErrors.graduationDate = validateEducationGraduationDate(currentItem.graduationDate);
      } else if (field === 'description') {
        nextErrors.description = validateEducationDescription(currentItem.description);
      }
      return { ...prev, [id]: nextErrors };
    });
  };

  // --- Project Update Handler ---
  const updateProjectItem = (id: string, field: keyof Project, value: string) => {
    const normalizedValue = typeof value === 'string' ? value.trim() : value;
    const updatedProjects = data.projects.map(item =>
      item.id === id ? { ...item, [field]: normalizedValue } : item
    );
    onChange({ ...data, projects: updatedProjects });

    const currentItem = updatedProjects.find(item => item.id === id);
    if (!currentItem) return;

    setProjectErrors(prev => {
      const nextErrors = { ...(prev[id] || {}) };
      if (field === 'name') {
        nextErrors.name = validateProjectName(currentItem.name);
      } else if (field === 'link') {
        nextErrors.link = validateProjectLink(currentItem.link || '');
      } else if (field === 'description') {
        nextErrors.description = validateProjectDescription(currentItem.description);
      }
      return { ...prev, [id]: nextErrors };
    });
  };

  // --- Certification Update Handler ---
  const updateCertificationItem = (id: string, field: keyof Certification, value: string) => {
    const normalizedValue = typeof value === 'string' ? value.trim() : value;
    const updatedCertifications = data.certifications.map(item =>
      item.id === id ? { ...item, [field]: normalizedValue } : item
    );
    onChange({ ...data, certifications: updatedCertifications });

    const currentItem = updatedCertifications.find(item => item.id === id);
    if (!currentItem) return;

    setCertificationErrors(prev => {
      const nextErrors = { ...(prev[id] || {}) };
      if (field === 'name') {
        nextErrors.name = validateCertificationName(currentItem.name);
      } else if (field === 'issuer') {
        nextErrors.issuer = validateCertificationIssuer(currentItem.issuer);
      } else if (field === 'date') {
        nextErrors.date = validateCertificationDate(currentItem.date);
      }
      return { ...prev, [id]: nextErrors };
    });
  };

  // Step navigation functions
  const goToNextStep = () => {
    if (currentStep === 1) {
      const fullNameError = validateFullName(data.personalInfo.fullName.trim());
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
      const fullNameError = validateFullName(data.personalInfo.fullName.trim());
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
  
  const validateFullName = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return 'Full name is required.';
    if (trimmedValue.length < 2) return 'Full name must be at least 2 characters.';
    if (trimmedValue.length > 100) return 'Full name must be at most 100 characters.';
    if (!/^[\p{L}\s.'-]+$/u.test(trimmedValue)) {
      return 'Use letters, spaces, hyphens, apostrophes, or periods only.';
    }
    return '';
  };

  const validateJobTitle = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return '';
    if (trimmedValue.length > 100) return 'Job title must be at most 100 characters.';
    if (!/^[A-Za-z0-9 ,./#+&()-]+$/.test(trimmedValue)) {
      return 'Use letters, numbers, spaces, hyphens, slashes, dots, plus, hash, commas, parentheses, or ampersands.';
    }
    return '';
  };

  const validateEmail = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return '';
    if (trimmedValue.length > 254) return 'Email must be at most 254 characters.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedValue)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const validatePhone = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return '';
    if (trimmedValue.length > 30) return 'Phone number must be at most 30 characters.';
    if (!/^[0-9 +().-]+$/.test(trimmedValue)) {
      return 'Use numbers, spaces, plus, hyphens, or parentheses only.';
    }
    return '';
  };

  const validateLocation = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return '';
    if (trimmedValue.length > 100) return 'Location must be at most 100 characters.';
    return '';
  };

  const validateLinkedin = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return '';
    if (trimmedValue.length > 255) return 'Link must be at most 255 characters.';

    let urlToTest = trimmedValue;
    if (!/^https?:\/\//i.test(trimmedValue) && !trimmedValue.startsWith('www.')) {
      urlToTest = `https://${trimmedValue}`;
    }

    try {
      const url = new URL(urlToTest);
      if (!url.hostname.includes('.')) {
        throw new Error('Invalid hostname');
      }
      return '';
    } catch {
      return 'Please enter a valid website or profile URL.';
    }
  };

  const validateSummary = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return '';
    if (trimmedValue.length > 1000) return 'Professional summary must be at most 1000 characters.';
    return '';
  };

  // --- Education Validation ---
  const validateEducationSchool = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return 'School / University is required.';
    if (trimmedValue.length > 100) return 'School name must be at most 100 characters.';
    return '';
  };

  const validateEducationDegree = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return 'Degree / Major is required.';
    if (trimmedValue.length > 100) return 'Degree must be at most 100 characters.';
    return '';
  };

  const validateEducationGraduationDate = (value: string) => {
    if (!value) return '';
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(date.getTime())) return 'Invalid date format.';
    if (date > today) return 'Graduation date cannot be in the future.';
    return '';
  };

  const validateEducationDescription = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return '';
    if (trimmedValue.length > 500) return 'Description must be at most 500 characters.';
    return '';
  };

  // --- Projects Validation ---
  const validateProjectName = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return 'Project name is required.';
    if (trimmedValue.length > 100) return 'Project name must be at most 100 characters.';
    return '';
  };

  const validateProjectLink = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return '';
    if (trimmedValue.length > 255) return 'Link must be at most 255 characters.';
    let urlToTest = trimmedValue;
    if (!/^https?:\/\//i.test(trimmedValue) && !trimmedValue.startsWith('www.')) {
      urlToTest = `https://${trimmedValue}`;
    }
    try {
      new URL(urlToTest);
      return '';
    } catch {
      return 'Please enter a valid URL.';
    }
  };

  const validateProjectDescription = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return '';
    if (trimmedValue.length > 500) return 'Description must be at most 500 characters.';
    return '';
  };

  // --- Certifications Validation ---
  const validateCertificationName = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return 'Certification name is required.';
    if (trimmedValue.length > 100) return 'Certification name must be at most 100 characters.';
    return '';
  };

  const validateCertificationIssuer = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return 'Issuing organization is required.';
    if (trimmedValue.length > 100) return 'Issuer name must be at most 100 characters.';
    return '';
  };

  const validateCertificationDate = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return '';
    // Check if it's a valid year (4 digits)
    if (!/^\d{4}$/.test(trimmedValue)) {
      return 'Please enter a valid year (e.g. 2023).';
    }
    const year = parseInt(trimmedValue);
    const currentYear = new Date().getFullYear();
    if (year > currentYear) return 'Year cannot be in the future.';
    return '';
  };

  // --- Centralized Save Validation ---
  interface ValidationErrors {
    personalInfo: {
      fullName?: string;
      email?: string;
      jobTitle?: string;
      phone?: string;
      location?: string;
      linkedin?: string;
      summary?: string;
    };
    experience: Record<string, any>;
    education: Record<string, any>;
    projects: Record<string, any>;
    certifications: Record<string, any>;
  }

  const validateResumeBeforeSave = (): { isValid: boolean; errors: ValidationErrors } => {
    const errors: ValidationErrors = {
      personalInfo: {},
      experience: {},
      education: {},
      projects: {},
      certifications: {},
    };
    let isValid = true;

    // Validate Personal Info
    const nameErr = validateFullName(data.personalInfo.fullName);
    if (nameErr) {
      errors.personalInfo.fullName = nameErr;
      isValid = false;
    }
    const emailErr = validateEmail(data.personalInfo.email);
    if (emailErr) {
      errors.personalInfo.email = emailErr;
      isValid = false;
    }
    const jobTitleErr = validateJobTitle(data.personalInfo.jobTitle);
    if (jobTitleErr) {
      errors.personalInfo.jobTitle = jobTitleErr;
      isValid = false;
    }
    const phoneErr = validatePhone(data.personalInfo.phone);
    if (phoneErr) {
      errors.personalInfo.phone = phoneErr;
      isValid = false;
    }
    const locationErr = validateLocation(data.personalInfo.location);
    if (locationErr) {
      errors.personalInfo.location = locationErr;
      isValid = false;
    }
    const linkedinErr = validateLinkedin(data.personalInfo.linkedin);
    if (linkedinErr) {
      errors.personalInfo.linkedin = linkedinErr;
      isValid = false;
    }
    const summaryErr = validateSummary(data.personalInfo.summary);
    if (summaryErr) {
      errors.personalInfo.summary = summaryErr;
      isValid = false;
    }

    // Validate Experience
    data.experience.forEach(exp => {
      const roleErr = validateExperienceRole(exp.role);
      const companyErr = validateExperienceCompany(exp.company);
      const descErr = validateExperienceDescription(exp.description);
      const dateErrs = validateExperienceDateRange(exp.startDate, exp.current ? '' : exp.endDate, exp.current);
      
      const expErrors: any = {};
      if (roleErr) {
        expErrors.role = roleErr;
        isValid = false;
      }
      if (companyErr) {
        expErrors.company = companyErr;
        isValid = false;
      }
      if (!exp.startDate) {
        expErrors.startDate = 'Start date is required.';
        isValid = false;
      } else if (dateErrs.startDate) {
        expErrors.startDate = dateErrs.startDate;
        isValid = false;
      }
      if (!exp.current && !exp.endDate) {
        expErrors.endDate = 'End date is required if not currently working.';
        isValid = false;
      } else if (dateErrs.endDate) {
        expErrors.endDate = dateErrs.endDate;
        isValid = false;
      }
      if (descErr) {
        expErrors.description = descErr;
        isValid = false;
      }
      if (Object.keys(expErrors).length > 0) {
        errors.experience[exp.id] = expErrors;
      }
    });

    // Validate Education
    data.education.forEach(edu => {
      const schoolErr = validateEducationSchool(edu.school);
      const degreeErr = validateEducationDegree(edu.degree);
      const dateErr = validateEducationGraduationDate(edu.graduationDate);
      const descErr = validateEducationDescription(edu.description);

      const eduErrors: any = {};
      if (schoolErr) {
        eduErrors.school = schoolErr;
        isValid = false;
      }
      if (degreeErr) {
        eduErrors.degree = degreeErr;
        isValid = false;
      }
      if (dateErr) {
        eduErrors.graduationDate = dateErr;
        isValid = false;
      }
      if (descErr) {
        eduErrors.description = descErr;
        isValid = false;
      }
      if (Object.keys(eduErrors).length > 0) {
        errors.education[edu.id] = eduErrors;
      }
    });

    // Validate Projects
    data.projects.forEach(proj => {
      const nameErr = validateProjectName(proj.name);
      const linkErr = validateProjectLink(proj.link || '');
      const descErr = validateProjectDescription(proj.description);

      const projErrors: any = {};
      if (nameErr) {
        projErrors.name = nameErr;
        isValid = false;
      }
      if (linkErr) {
        projErrors.link = linkErr;
        isValid = false;
      }
      if (descErr) {
        projErrors.description = descErr;
        isValid = false;
      }
      if (Object.keys(projErrors).length > 0) {
        errors.projects[proj.id] = projErrors;
      }
    });

    // Validate Certifications
    data.certifications.forEach(cert => {
      const nameErr = validateCertificationName(cert.name);
      const issuerErr = validateCertificationIssuer(cert.issuer);
      const dateErr = validateCertificationDate(cert.date);

      const certErrors: any = {};
      if (nameErr) {
        certErrors.name = nameErr;
        isValid = false;
      }
      if (issuerErr) {
        certErrors.issuer = issuerErr;
        isValid = false;
      }
      if (dateErr) {
        certErrors.date = dateErr;
        isValid = false;
      }
      if (Object.keys(certErrors).length > 0) {
        errors.certifications[cert.id] = certErrors;
      }
    });

    return { isValid, errors };
  };

  const updatePersonalInfo = (field: string, value: string) => {
    const trimmedValue = value.trim();
    const normalizedValue = field === 'summary' ? value.trim() : trimmedValue;

    if (field === 'fullName') {
      setNameError(value ? validateFullName(normalizedValue) : '');
    } else if (field === 'jobTitle') {
      setJobTitleError(validateJobTitle(normalizedValue));
    } else if (field === 'email') {
      setEmailError(validateEmail(normalizedValue));
    } else if (field === 'phone') {
      setPhoneError(validatePhone(normalizedValue));
    } else if (field === 'location') {
      setLocationError(validateLocation(normalizedValue));
    } else if (field === 'linkedin') {
      setLinkedinError(validateLinkedin(normalizedValue));
    } else if (field === 'summary') {
      setSummaryError(validateSummary(normalizedValue));
    }

    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: normalizedValue }
    });
  };

  const handleFullNameBlur = (value: string) => {
    setNameError(validateFullName(value.trim()));
  };

  // Handle phone validation on blur
  const handlePhoneBlur = (value: string) => {
    setPhoneError(validatePhone(value.trim()));
  };
  
  // Handle email validation on blur
  const handleEmailBlur = (value: string) => {
    setEmailError(validateEmail(value.trim()));
  };

  const handleLinkedinBlur = (value: string) => {
    setLinkedinError(validateLinkedin(value.trim()));
  };

  const handleLocationBlur = (value: string) => {
    setLocationError(validateLocation(value.trim()));
  };

  const handleSummaryBlur = (value: string) => {
    setSummaryError(validateSummary(value.trim()));
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
                  onBlur={(e) => setJobTitleError(validateJobTitle(e.target.value.trim()))}
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
                <Input 
                  label="Phone"
                  value={data.personalInfo.phone} 
                  onChange={e => updatePersonalInfo('phone', e.target.value)} 
                  onBlur={(e) => handlePhoneBlur(e.target.value)}
                  placeholder="Enter phone number"
                  error={phoneError}
                  maxLength={30}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-800">Location</label>
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
                    className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 shadow-sm"
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
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => generateExperienceDescription(exp.id, exp.role, exp.company)}
                              disabled={!exp.role.trim() || !exp.company.trim() || aiLoading.experiences[exp.id]}
                              icon={aiLoading.experiences[exp.id] ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                            >
                              {aiLoading.experiences[exp.id] ? 'Generating...' : 'Generate Description'}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
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
                            [edu.id]: { ...prev[edu.id], school: validateEducationSchool(edu.school) }
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
                            [edu.id]: { ...prev[edu.id], degree: validateEducationDegree(edu.degree) }
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
                            [edu.id]: { ...prev[edu.id], graduationDate: validateEducationGraduationDate(edu.graduationDate) }
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
                              [edu.id]: { ...prev[edu.id], description: validateEducationDescription(edu.description) }
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
                            [proj.id]: { ...prev[proj.id], name: validateProjectName(proj.name) }
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
                            [proj.id]: { ...prev[proj.id], link: validateProjectLink(proj.link || '') }
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
                              [proj.id]: { ...prev[proj.id], description: validateProjectDescription(proj.description) }
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
                            [cert.id]: { ...prev[cert.id], name: validateCertificationName(cert.name) }
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
                            [cert.id]: { ...prev[cert.id], issuer: validateCertificationIssuer(cert.issuer) }
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
                            [cert.id]: { ...prev[cert.id], date: validateCertificationDate(cert.date) }
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
                    setSaveError('');
                    // Clean skills before saving
                    const cleanedSkills = data.skills.filter(s => s.trim() !== '');
                    if (cleanedSkills.length !== data.skills.length) {
                      onChange({ ...data, skills: cleanedSkills });
                    }

                    const { isValid, errors } = validateResumeBeforeSave();
                    
                    if (!isValid) {
                      setSaveError('Please fix the highlighted errors before saving your resume.');
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
                      
                      // Scroll to first invalid section
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      return;
                    }

                    onSave();
                  }}
                  disabled={isSaving}
                  icon={isSaving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  iconPosition="left"
                  className="px-3 py-1.5 shadow-sm text-xs h-8"
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
};
