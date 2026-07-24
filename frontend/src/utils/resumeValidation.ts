
import { ResumeData } from '../types';

// Personal Info Validation
export interface PersonalInfoErrors {
  fullName?: string;
  email?: string;
  jobTitle?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  summary?: string;
}

export interface ExperienceItemErrors {
  role?: string;
  company?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface EducationItemErrors {
  school?: string;
  degree?: string;
  graduationDate?: string;
  description?: string;
}

export interface ProjectItemErrors {
  name?: string;
  link?: string;
  description?: string;
}

export interface CertificationItemErrors {
  name?: string;
  issuer?: string;
  date?: string;
}

export interface ValidationErrors {
  personalInfo: PersonalInfoErrors;
  experience: Record<string, ExperienceItemErrors>;
  education: Record<string, EducationItemErrors>;
  projects: Record<string, ProjectItemErrors>;
  certifications: Record<string, CertificationItemErrors>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

// --- Individual Validation Functions ---
export const validateFullName = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return 'Full name is required.';
  if (trimmedValue.length < 2) return 'Full name must be at least 2 characters.';
  if (trimmedValue.length > 100) return 'Full name must be at most 100 characters.';
  if (!/^[\p{L}\s.'-]+$/u.test(trimmedValue)) {
    return 'Use letters, spaces, hyphens, apostrophes, or periods only.';
  }
  return '';
};

export const validateJobTitle = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return '';
  if (trimmedValue.length > 100) return 'Job title must be at most 100 characters.';
  if (!/^[A-Za-z0-9 ,./#+&()-]+$/.test(trimmedValue)) {
    return 'Use letters, numbers, spaces, hyphens, slashes, dots, plus, hash, commas, parentheses, or ampersands.';
  }
  return '';
};

export const validateEmail = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return '';
  if (trimmedValue.length > 254) return 'Email must be at most 254 characters.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedValue)) {
    return 'Please enter a valid email address.';
  }
  return '';
};

export const validatePhone = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return '';
  const digits = trimmedValue.replace(/\D/g, '');
  if (digits.length < 7) return 'Phone number must have at least 7 digits.';
  if (digits.length > 15) return 'Phone number must have at most 15 digits.';
  if (!/^[\d\s\-+()]+$/.test(trimmedValue)) {
    return 'Use numbers, spaces, plus, hyphens, or parentheses only.';
  }
  return '';
};

export const validateLocation = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return '';
  if (trimmedValue.length > 100) return 'Location must be at most 100 characters.';
  return '';
};

export const validateLinkedin = (value: string): string => {
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

export const validateSummary = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return '';
  if (trimmedValue.length > 1000) return 'Professional summary must be at most 1000 characters.';
  return '';
};

// --- Experience Validation ---
export const validateExperienceRole = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return '';
  if (trimmedValue.length > 100) return 'Job title must be at most 100 characters.';
  if (!/^[A-Za-z0-9 ,./#+&()-]+$/.test(trimmedValue)) {
    return 'Use letters, numbers, spaces, hyphens, slashes, dots, plus, hash, commas, parentheses, or ampersands.';
  }
  return '';
};

export const validateExperienceCompany = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return '';
  if (trimmedValue.length > 100) return 'Company name must be at most 100 characters.';
  if (!/^[A-Za-z0-9 .,&'()/-]+$/.test(trimmedValue)) {
    return 'Company name contains unsupported characters.';
  }
  return '';
};

export const validateExperienceDescription = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    if (value.length > 0) return 'Description cannot be empty spaces only.';
    return '';
  }
  if (trimmedValue.length > 500) return 'Description must be at most 500 characters.';
  return '';
};

export const validateExperienceDateRange = (startDate: string, endDate: string, current: boolean): { startDate?: string; endDate?: string } => {
  const errors: { startDate?: string; endDate?: string } = {};
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

// --- Education Validation ---
export const validateEducationSchool = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return 'School / University is required.';
  if (trimmedValue.length > 100) return 'School name must be at most 100 characters.';
  return '';
};

export const validateEducationDegree = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return 'Degree / Major is required.';
  if (trimmedValue.length > 100) return 'Degree must be at most 100 characters.';
  return '';
};

export const validateEducationGraduationDate = (value: string): string => {
  if (!value) return '';
  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (isNaN(date.getTime())) return 'Invalid date format.';
  if (date > today) return 'Graduation date cannot be in the future.';
  return '';
};

export const validateEducationDescription = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return '';
  if (trimmedValue.length > 500) return 'Description must be at most 500 characters.';
  return '';
};

// --- Projects Validation ---
export const validateProjectName = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return 'Project name is required.';
  if (trimmedValue.length > 100) return 'Project name must be at most 100 characters.';
  return '';
};

export const validateProjectLink = (value: string): string => {
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

export const validateProjectDescription = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return '';
  if (trimmedValue.length > 500) return 'Description must be at most 500 characters.';
  return '';
};

// --- Certifications Validation ---
export const validateCertificationName = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return 'Certification name is required.';
  if (trimmedValue.length > 100) return 'Certification name must be at most 100 characters.';
  return '';
};

export const validateCertificationIssuer = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return 'Issuing organization is required.';
  if (trimmedValue.length > 100) return 'Issuer name must be at most 100 characters.';
  return '';
};

export const validateCertificationDate = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return '';
  if (!/^\d{4}$/.test(trimmedValue)) {
    return 'Please enter a valid year (e.g. 2023).';
  }
  const year = parseInt(trimmedValue);
  const currentYear = new Date().getFullYear();
  if (year > currentYear) return 'Year cannot be in the future.';
  return '';
};

// --- Main Validation Function ---
export const validateResumeBeforeSave = (data: ResumeData): ValidationResult => {
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
    
    const expErrors: ExperienceItemErrors = {};
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

    const eduErrors: EducationItemErrors = {};
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

    const projErrors: ProjectItemErrors = {};
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

    const certErrors: CertificationItemErrors = {};
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

