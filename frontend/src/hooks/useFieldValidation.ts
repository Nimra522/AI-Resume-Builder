import { useState, useCallback } from 'react';

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

interface FieldValidationRules {
  jobTitle?: boolean;
  email?: boolean;
  phone?: boolean;
  location?: boolean;
  linkedin?: boolean;
}

export const useFieldValidation = (rules: FieldValidationRules = {}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((fieldName: string, value: string): string => {
    let errorMessage = '';

    switch (fieldName) {
      case 'jobTitle':
        if (rules.jobTitle) {
          const jobTitleRegex = /^[A-Za-z0-9 \-\/]*$/;
          if (value && !jobTitleRegex.test(value)) {
            errorMessage = 'Job title can only contain letters, numbers, spaces, hyphens, and slashes';
          }
        }
        break;

      case 'email':
        if (rules.email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (value && !emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address (example@domain.com)';
          }
        }
        break;

      case 'phone':
        if (rules.phone) {
          const phoneRegex = /^\+?[0-9 \-]*$/;
          if (value && !phoneRegex.test(value)) {
            errorMessage = 'Phone can only contain digits, spaces, hyphens, and optional + at start';
          }
        }
        break;

      case 'location':
        if (rules.location) {
          const locationRegex = /^[A-Za-z ,\-]*$/;
          if (value && !locationRegex.test(value)) {
            errorMessage = 'Location can only contain letters, spaces, commas, and hyphens';
          }
        }
        break;

      case 'linkedin':
        if (rules.linkedin) {
          if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
            errorMessage = 'URL must start with http:// or https://';
          }
        }
        break;
    }

    return errorMessage;
  }, [rules]);

  const validateAllFields = useCallback((fields: Record<string, string>): ValidationResult => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(fields).forEach(fieldName => {
      const errorMessage = validateField(fieldName, fields[fieldName]);
      if (errorMessage) {
        newErrors[fieldName] = errorMessage;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return { isValid, errors: Object.entries(newErrors).map(([field, message]) => ({ field, message })) };
  }, [validateField]);

  const clearError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateField,
    validateAllFields,
    clearError,
    clearAllErrors,
    hasErrors: Object.keys(errors).length > 0
  };
};