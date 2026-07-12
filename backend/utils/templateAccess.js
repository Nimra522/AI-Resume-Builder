// Template access map for all templates
const templateAccessMap = {
  modern: 'Free',
  professional: 'Free',
  minimalist: 'Free',
  executive: 'Free',
  creative: 'Free',
  academic: 'Free',
  compact: 'Pro',
  startup: 'Pro',
  'modern-timeline': 'Pro',
  'warm-professional': 'Pro',
  'executive-blue': 'Pro',
  'monochrome-frame': 'Pro',
  'retro-contour': 'Pro',
  'fresh-graduate-modern': 'Pro',
  'fluid-capsule': 'Pro',
  'brown-elegant': 'Pro',
  'minimalist-full-width': 'Pro',
  'minimalist-magazine': 'Pro',
  'forest-green': 'Pro',
  'vertical-elegant': 'Pro',
  'royal-executive': 'Pro',
  'navy-horizon': 'Pro',
  'modern-blue-geometric': 'Pro',
  'maison-elite': 'Pro',
  lorna: 'Pro',
  'legacy-ceo': 'Pro',
  'heritage-corporate': 'Pro',
  'graphic-designer-portfolio': 'Pro',
  'executive-vogue': 'Pro',
  'executive-prestige': 'Pro',
  'executive-horizon': 'Pro',
  'empire-executive': 'Pro',
  'editorial-luxe': 'Pro',
  anaisha: 'Premium',
  'dark-red-executive': 'Premium',
  'modern-purple': 'Premium',
  'creative-professional': 'Premium',
  'luxury-executive': 'Premium',
  'elegant-monochrome': 'Premium',
  'modern-professional': 'Premium',
  'executive-minimal': 'Premium',
  isabel: 'Premium',
  'corporate-band': 'Premium',
  elegant: 'Premium',
  'platinum-board': 'Premium',
  'chairman-signature': 'Premium',
  'boardroom-elite': 'Premium',
  'executive-blue-2': 'Premium',
  'royal-executive-2': 'Premium',
  'template-1': 'Premium',
  'template-2': 'Premium',
  'single-column-professional': 'Premium',
  'editorial-executive': 'Premium',
  'minimal-grid': 'Premium',
  'modern-minimal-timeline': 'Premium',
  'modern-corporate-photo': 'Premium',
  'modern-professional-timeline-photo': 'Premium',
  'luxury-editorial': 'Premium',
  'premium-executive-minimal': 'Premium',
  'modern-editorial-timeline': 'Premium',
  'modernist-editorial': 'Premium',
  'premium-sidebar-timeline': 'Premium',
  'classic-bw': 'Premium',
  'overlapping-portfolio': 'Premium',
  'decorative-circles': 'Premium',
  'single-column-navy-corporate': 'Premium',
  'rounded-portfolio': 'Premium',
  'black-header-minimal': 'Premium',
  'editorial-thin': 'Premium',
  'student-profile-banner': 'Premium',
  'serif-executive': 'Premium',
  'sidebar-gray-profile': 'Premium',
  'brown-accent-decorative': 'Premium',
  'dark-sidebar-portfolio': 'Premium',
  'dark-sidebar-timeline': 'Premium',
  'pill-rotated-timeline': 'Premium',
  'dark-header-pills': 'Premium',
  'warm-cream-sectional': 'Premium',
  'lavender-accent-repeating': 'Premium',
  'blue-header-three-column': 'Premium',
  'grey-boxed-headings': 'Premium',
  'light-sidebar-sections': 'Premium',
  'blue-framed-timeline': 'Premium',
  'navy-profile-timeline': 'Premium',
  'navy-sidebar-rounded-photo': 'Premium',
  'blue-sidebar-dot-indicators': 'Premium',
  'corporate-clean': 'Premium',
  'corporate-timeline': 'Premium',
  'halftone-timeline': 'Premium',
  'royal-blue-timeline': 'Premium',
  'engineer-portfolio': 'Premium',
  'executive-blue-banner': 'Premium',
  'minimal-black-photo': 'Premium',
  'single-column-black-panel': 'Premium',
  'orange-accent-timeline': 'Premium',
  'green-hero-executive': 'Premium',
  'green-geo-corporate': 'Premium',
  'teal-block-header': 'Premium',
  'graphic-designer-split-header': 'Premium',
  'minimal-corporate-blue-banner': 'Premium',
  'yellow-header-minimal': 'Premium',
  'three-panel-black-timeline': 'Premium'
};

// Plan hierarchy
const PLAN_HIERARCHY = {
  Free: 0,
  Pro: 1,
  Premium: 2,
};

// Get required plan for a template
const getTemplateRequiredPlan = (templateId) => {
  return templateAccessMap[templateId] || 'Free';
};

// Check if user can access a template
const canUserAccessTemplate = (userPlan, templateId) => {
  const requiredPlan = getTemplateRequiredPlan(templateId);
  // Normalize userPlan to capitalized first letter
  const normalizedUserPlan = userPlan ? (userPlan.charAt(0).toUpperCase() + userPlan.slice(1).toLowerCase()) : 'Free';
  const userPlanLevel = PLAN_HIERARCHY[normalizedUserPlan];
  const requiredPlanLevel = PLAN_HIERARCHY[requiredPlan];
  return userPlanLevel >= requiredPlanLevel;
};

module.exports = {
  getTemplateRequiredPlan,
  canUserAccessTemplate,
  templateAccessMap,
  PLAN_HIERARCHY,
};
