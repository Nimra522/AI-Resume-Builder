import { TEMPLATES } from '../data/templates';

// Plan hierarchy for checking access
export const PLAN_HIERARCHY = {
  Free: 0,
  Pro: 1,
  Premium: 2,
};

// Get required plan for a template
export const getTemplateRequiredPlan = (templateId: string): 'Free' | 'Pro' | 'Premium' => {
  const template = TEMPLATES.find(t => t.id === templateId);
  if (!template) {
    return 'Free'; // Default to Free if template not found
  }
  // Convert template.access to our plan names
  const access = template.access.toLowerCase();
  if (access === 'pro') return 'Pro';
  if (access === 'paid' || access === 'premium') return 'Premium';
  return 'Free';
};

// Check if user can access a template
export const canUserAccessTemplate = (userPlan: 'Free' | 'Pro' | 'Premium' | 'free' | 'pro' | 'premium' | null | undefined, templateId: string): boolean => {
  const requiredPlan = getTemplateRequiredPlan(templateId);
  // Normalize userPlan to capitalized first letter
  const normalizedUserPlan = userPlan ? (userPlan.charAt(0).toUpperCase() + userPlan.slice(1).toLowerCase()) as 'Free' | 'Pro' | 'Premium' : 'Free';
  const userPlanLevel = PLAN_HIERARCHY[normalizedUserPlan];
  const requiredPlanLevel = PLAN_HIERARCHY[requiredPlan];
  return userPlanLevel >= requiredPlanLevel;
};
