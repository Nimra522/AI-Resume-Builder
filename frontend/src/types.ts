import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon?: LucideIcon;
  isButton?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  profileImage?: string;  // Add profileImage field
  plan: 'Free' | 'Pro' | 'Premium';
  resumeCount: number;
  lastLogin: string;
  // Added profile fields to interface
  username?: string;
  phone?: string;
  location?: string;
  bio?: string;
  joinedDate?: string;
  twoFactorEnabled?: boolean;
  passwordLastChanged?: string;
  autoSave?: boolean;
}

export interface AppState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  theme: 'light' | 'dark';
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  description: string;
  content: React.ReactNode;
  author: {
    name: string;
    role: string;
    avatarSeed: string;
  };
  publishedAt: string;
  readTime: string;
  imageUrl: string;
}

// --- Resume Types ---

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  graduationDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
  technologies?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}


export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    countryCode?: string;
    location: string;
    website: string;
    linkedin: string;
    jobTitle: string;
    summary: string;
    photoUrl?: string;
  };
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
}

export interface Template {
  id: string;
  name: string;
  tag: string; // Style tag like "Modern", "ATS-Friendly"
  description: string;
  thumbnailUrl: string; // URL for high-quality preview
  thumbnailClass: string;

  // 🔐 SaaS access control
  access: 'free' | 'pro' | 'paid';
  requiresAuth: boolean;

  // 🎯 Feature flags
  watermark: boolean;        // watermark on PDF for free users
  atsOptimized: boolean;     // ATS-friendly badge

  // 💳 Paid template pricing (optional)
  price?: number;
}


export interface Example {
  id: string;
  title: string;
  role: string;
  description: string;
  layoutType: string;
  thumbnailUrl: string;
  colorAccent: string;
  data: ResumeData;
}

export interface SavedResume {
  id: string;
  title: string;
  templateId: string;
  lastEdited: string;
  data: ResumeData;
  thumbnail?: string;
}