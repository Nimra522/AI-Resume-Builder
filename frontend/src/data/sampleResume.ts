import { ResumeData } from '../types';

export const SAMPLE_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Maya Chen',
    jobTitle: 'Senior Product Designer',
    email: 'maya.chen@example.com',
    phone: '+1 (415) 555-0198',
    location: 'San Francisco, CA',
    website: 'mayachen.design',
    linkedin: 'linkedin.com/in/mayachen',
    photoUrl: '/profile-placeholder.jpg',
    summary:
      'Strategic product designer with 8+ years of experience shaping SaaS products from discovery through launch. Skilled at translating customer insights into polished, accessible interfaces that improve activation, retention, and team velocity.',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Northstar Labs',
      role: 'Senior Product Designer',
      startDate: '2021',
      endDate: '',
      current: true,
      description:
        'Led design for a cross-platform analytics workspace used by 40,000+ monthly users.\nPartnered with product and engineering to reduce onboarding drop-off by 28%.\nBuilt a reusable design system that cut feature delivery time by two weeks per release.',
    },
    {
      id: 'exp-2',
      company: 'Luma Health',
      role: 'Product Designer',
      startDate: '2018',
      endDate: '2021',
      current: false,
      description:
        'Designed scheduling, messaging, and patient intake flows for healthcare teams.\nRan moderated research sessions and usability tests to validate new product bets.\nImproved task completion rates by 35% across mobile-first workflows.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'California College of the Arts',
      degree: 'BFA Interaction Design',
      graduationDate: '2017',
      description: 'Human-centered design, visual systems, prototyping, and service design.',
    },
  ],
  skills: [
    'Product Strategy',
    'UX Research',
    'Design Systems',
    'Figma',
    'Prototyping',
    'Accessibility',
    'Information Architecture',
    'Workshop Facilitation',
  ],
  projects: [
    {
      id: 'project-1',
      name: 'Insight Command Center',
      description:
        'Unified fragmented product metrics into a guided dashboard with custom alerts, cohort views, and executive summaries.',
      link: 'mayachen.design/insights',
      technologies: ['Figma', 'React', 'Amplitude'],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Certified UX Professional',
      issuer: 'Nielsen Norman Group',
      date: '2023',
    },
  ],
};
