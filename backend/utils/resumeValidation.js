
// Personal Info Validation
const validateFullName = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return 'Full name is required.';
  if (trimmedValue.length < 2) return 'Full name must be at least 2 characters.';
  if (trimmedValue.length > 100) return 'Full name must be at most 100 characters.';
  if (!/^[\p{L}\s.'-]+$/u.test(trimmedValue)) {
    return 'Use letters, spaces, hyphens, apostrophes, or periods only.';
  }
  return '';
};

const validateJobTitle = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return '';
  if (trimmedValue.length > 100) return 'Job title must be at most 100 characters.';
  if (!/^[A-Za-z0-9 ,./#+&()-]+$/.test(trimmedValue)) {
    return 'Use letters, numbers, spaces, hyphens, slashes, dots, plus, hash, commas, parentheses, or ampersands.';
  }
  return '';
};

const validateEmail = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return '';
  if (trimmedValue.length > 254) return 'Email must be at most 254 characters.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedValue)) {
    return 'Please enter a valid email address.';
  }
  return '';
};

const validatePhone = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return '';
  const digits = trimmedValue.replace(/\D/g, '');
  if (digits.length < 7) return 'Phone number must have at least 7 digits.';
  if (digits.length > 15) return 'Phone number must have at most 15 digits.';
  if (!/^[\d\s\-+()]+$/.test(trimmedValue)) {
    return 'Use numbers, spaces, plus, hyphens, or parentheses only.';
  }
  return '';
};

const validateLocation = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return '';
  if (trimmedValue.length > 100) return 'Location must be at most 100 characters.';
  return '';
};

const validateLinkedin = (value) => {
  const trimmedValue = value ? value.trim() : '';
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
    return 'Please enter a valid website or profile URL.';
  }
};

const validateSummary = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return '';
  if (trimmedValue.length > 1000) return 'Professional summary must be at most 1000 characters.';
  return '';
};

// Experience Validation
const validateExperienceRole = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return '';
  if (trimmedValue.length > 100) return 'Job title must be at most 100 characters.';
  if (!/^[A-Za-z0-9 ,./#+&()-]+$/.test(trimmedValue)) {
    return 'Use letters, numbers, spaces, hyphens, slashes, dots, plus, hash, commas, parentheses, or ampersands.';
  }
  return '';
};

const validateExperienceCompany = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return '';
  if (trimmedValue.length > 100) return 'Company name must be at most 100 characters.';
  if (!/^[A-Za-z0-9 .,&'()/-]+$/.test(trimmedValue)) {
    return 'Company name contains unsupported characters.';
  }
  return '';
};

const validateExperienceDescription = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (value && !trimmedValue) return 'Description cannot be empty spaces only.';
  if (!trimmedValue) return '';
  if (trimmedValue.length > 500) return 'Description must be at most 500 characters.';
  return '';
};

const validateExperienceDateRange = (startDate, endDate, current) => {
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

// Education Validation
const validateEducationSchool = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return 'School / University is required.';
  if (trimmedValue.length > 100) return 'School name must be at most 100 characters.';
  return '';
};

const validateEducationDegree = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return 'Degree / Major is required.';
  if (trimmedValue.length > 100) return 'Degree must be at most 100 characters.';
  return '';
};

const validateEducationGraduationDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (isNaN(date.getTime())) return 'Invalid date format.';
  if (date > today) return 'Graduation date cannot be in the future.';
  return '';
};

const validateEducationDescription = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return '';
  if (trimmedValue.length > 500) return 'Description must be at most 500 characters.';
  return '';
};

// Projects Validation
const validateProjectName = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return 'Project name is required.';
  if (trimmedValue.length > 100) return 'Project name must be at most 100 characters.';
  return '';
};

const validateProjectLink = (value) => {
  const trimmedValue = value ? value.trim() : '';
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

const validateProjectDescription = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return '';
  if (trimmedValue.length > 500) return 'Description must be at most 500 characters.';
  return '';
};

// Certifications Validation
const validateCertificationName = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return 'Certification name is required.';
  if (trimmedValue.length > 100) return 'Certification name must be at most 100 characters.';
  return '';
};

const validateCertificationIssuer = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return 'Issuing organization is required.';
  if (trimmedValue.length > 100) return 'Issuer name must be at most 100 characters.';
  return '';
};

const validateCertificationDate = (value) => {
  const trimmedValue = value ? value.trim() : '';
  if (!trimmedValue) return '';
  if (!/^\d{4}$/.test(trimmedValue)) {
    return 'Please enter a valid year (e.g. 2023).';
  }
  const year = parseInt(trimmedValue, 10);
  const currentYear = new Date().getFullYear();
  if (year > currentYear) return 'Year cannot be in the future.';
  return '';
};

// Main Validation Function
const validateResumeBeforeSave = (data) => {
  const errors = {
    personalInfo: {},
    experience: {},
    education: {},
    projects: {},
    certifications: {},
  };
  let isValid = true;

  // Validate Personal Info
  if (data?.personalInfo) {
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
  }

  // Validate Experience
  if (data?.experience) {
    data.experience.forEach(exp => {
      const roleErr = validateExperienceRole(exp.role);
      const companyErr = validateExperienceCompany(exp.company);
      const descErr = validateExperienceDescription(exp.description);
      const dateErrs = validateExperienceDateRange(exp.startDate, exp.current ? '' : exp.endDate, exp.current);
      
      const expErrors = {};
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
  }

  // Validate Education
  if (data?.education) {
    data.education.forEach(edu => {
      const schoolErr = validateEducationSchool(edu.school);
      const degreeErr = validateEducationDegree(edu.degree);
      const dateErr = validateEducationGraduationDate(edu.graduationDate);
      const descErr = validateEducationDescription(edu.description);

      const eduErrors = {};
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
  }

  // Validate Projects
  if (data?.projects) {
    data.projects.forEach(proj => {
      const nameErr = validateProjectName(proj.name);
      const linkErr = validateProjectLink(proj.link);
      const descErr = validateProjectDescription(proj.description);

      const projErrors = {};
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
  }

  // Validate Certifications
  if (data?.certifications) {
    data.certifications.forEach(cert => {
      const nameErr = validateCertificationName(cert.name);
      const issuerErr = validateCertificationIssuer(cert.issuer);
      const dateErr = validateCertificationDate(cert.date);

      const certErrors = {};
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
  }

  return { isValid, errors };
};

module.exports = { validateResumeBeforeSave, validateLocation };

