import { Template } from '../types';

export const TEMPLATES: Template[] = [
  {
    id: 'modern',
    name: 'Modern Clean',
    tag: 'Popular',
    description: 'A clean, two-column layout perfect for tech and creative roles.',
    thumbnailUrl: '/thumbnails/modern.png',
    thumbnailClass: 'bg-white border-l-8 border-primary',

    access: 'free',
    requiresAuth: false,
    watermark: true,
    atsOptimized: false,
  },

  {
    id: 'professional',
    name: 'Professional',
    tag: 'Corporate',
    description: 'Traditional structure with a modern touch, great for corporate jobs.',
    thumbnailUrl: '/thumbnails/professional.png',
    thumbnailClass: 'bg-white border-t-8 border-gray-800',

    access: 'free',
    requiresAuth: false,
    watermark: true,
    atsOptimized: true,
  },

  {
    id: 'minimalist',
    name: 'Minimalist',
    tag: 'Clean',
    description: 'Focus purely on content with elegant typography and whitespace.',
    thumbnailUrl: '/thumbnails/minimalist.png',
    thumbnailClass: 'bg-white flex flex-col items-center pt-4',

    access: 'free',
    requiresAuth: false,
    watermark: true,
    atsOptimized: false,
  },

  {
    id: 'executive',
    name: 'Executive',
    tag: 'Senior',
    description: 'Bold header and authoritative fonts for senior positions.',
    thumbnailUrl: '/thumbnails/executive.png',
    thumbnailClass: 'bg-slate-900 border-b-8 border-gold-500',

    access: 'free',
    requiresAuth: false,
    watermark: true,
    atsOptimized: true,
  },

  {
    id: 'creative',
    name: 'Creative',
    tag: 'Unique',
    description: 'Unique grid layout with accent colors to stand out.',
    thumbnailUrl: '/thumbnails/creative.png',
    thumbnailClass: 'bg-indigo-50 border-2 border-indigo-200',

    access: 'free',
    requiresAuth: false,
    watermark: true,
    atsOptimized: false,
  },

  {
    id: 'tech',
    name: 'Tech Stack',
    tag: 'Developer',
    description: 'Monospace fonts and skill-focused sidebar for developers.',
    thumbnailUrl: '/thumbnails/tech.png',
    thumbnailClass: 'bg-gray-100 border-l-4 border-green-500',

    access: 'free',
    requiresAuth: false,
    price: 12.99,
    watermark: true,
    atsOptimized: true,
  },

  {
    id: 'academic',
    name: 'Academic',
    tag: 'Scholar',
    description: 'Formal layout with clear sections, perfect for academic and research positions.',
    thumbnailUrl: '/thumbnails/academic.png',
    thumbnailClass: 'bg-stone-50 border-4 border-double border-stone-200',

    access: 'free',
    requiresAuth: false,
    watermark: true,
    atsOptimized: false,
  },
  
  {
    id: 'compact',
    name: 'Compact',
    tag: 'Efficient',
    description: 'Space-saving design with dense information layout for maximum content.',
    thumbnailUrl: '/thumbnails/compact.png',
    thumbnailClass: 'bg-white border-b-2 border-gray-900',

    access: 'free',
    requiresAuth: false,
    watermark: true,
    atsOptimized: true,
  },

  {
    id: 'elegant',
    name: 'Elegant',
    tag: 'Sophisticated',
    description: 'Refined typography and balanced layout for premium professional presentation.',
    thumbnailUrl: '/thumbnails/elegant.png',
    thumbnailClass: 'bg-white border-t-4 border-rose-300',

    access: 'free',
    requiresAuth: false,
    watermark: true,
    atsOptimized: false,
  },
  
  {
    id: 'startup',
    name: 'Startup',
    tag: 'Modern',
    description: 'Bold, energetic design with gradient accents for entrepreneurial professionals.',
    thumbnailUrl: '/thumbnails/startup.png',
    thumbnailClass: 'bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500',

    access: 'free',
    requiresAuth: false,
    watermark: true,
    atsOptimized: false,
  },

  {
    id: 'modern-timeline',
    name: 'Modern Timeline',
    tag: 'Professional',
    description: 'Clean timeline layout with circular skill indicators and monochrome design. ATS-friendly.',
    thumbnailUrl: '/thumbnails/modern-timeline.jpg',
    thumbnailClass: 'bg-gray-50',

    access: 'free',
    requiresAuth: false,
    watermark: true,
    atsOptimized: true,
  },

  {
    id: 'warm-professional',
    name: 'Warm Professional',
    tag: 'Elegant',
    description: 'Warm-toned two-column layout with star-rated skills, custom photo frame, and abstract circle accents.',
    thumbnailUrl: '/thumbnails/warm-professional.jpg',
    thumbnailClass: 'bg-[#FDFBF7]',

    access: 'free',
    requiresAuth: false,
    watermark: true,
    atsOptimized: true,
  },

  {
    id: 'executive-blue',
    name: 'The Executive Blue',
    tag: 'Corporate',
    description: 'Navy blue color-blocked layout with light grey sidebar, serif headings, and clean corporate aesthetic.',
    thumbnailUrl: '/thumbnails/executive-blue.jpg',
    thumbnailClass: 'bg-[#1B2A4A]',

    access: 'free',
    requiresAuth: false,
    watermark: true,
    atsOptimized: true,
  },

  {
    id: 'monochrome-frame',
    name: 'The Monochrome Frame',
    tag: 'Minimalist',
    description: 'Black-and-white minimalist layout with framed right sidebar overlapping the profile photo.',
    thumbnailUrl: '/thumbnails/monochrome-frame.jpg',
    thumbnailClass: 'bg-white',

    access: 'free',
    requiresAuth: false,
    watermark: true,
    atsOptimized: true,
  },

  {
    id: 'retro-contour',
    name: 'The Retro Contour',
    tag: 'Retro',
    description: 'Retro-modern design with pill-shaped outlines, soft terracotta accents, and script-italic headings.',
    thumbnailUrl: '/thumbnails/retro-contour.jpg',
    thumbnailClass: 'bg-[#FDF8F3]',

    access: 'free',
    requiresAuth: false,
    watermark: true,
    atsOptimized: true,
  },

  {
    id: 'fresh-graduate-modern',
    name: 'Fresh Graduate Modern',
    tag: 'Modern',
    description: 'Clean two-column layout with arrow-style section headers and soft beige accents. Perfect for fresh graduates.',
    thumbnailUrl: '/thumbnails/fresh-graduate-modern.jpg',
    thumbnailClass: 'bg-[#FAF8F6]',

    access: 'free',
    requiresAuth: false,
    watermark: true,
    atsOptimized: true,
  },
];

export const INITIAL_RESUME_DATA = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  additionalInfo: [],
};
