
import { UserProfile } from '../types';

export interface Activity {
  id: string;
  type: 'edit' | 'download' | 'login' | 'tool';
  description: string;
  timestamp: string;
}

export interface DetailedUserProfile extends UserProfile {
  username: string;
  phone: string;
  location: string;
  bio: string;
  joinedDate: string;
  plan: 'Free' | 'Pro' | 'Premium';
  accountStatus: 'Active' | 'Suspended';
  resumeCount: number;
  lastLogin: string;
  twoFactorEnabled: boolean;
  passwordLastChanged: string;
  recentActivity: Activity[];
}

export const MOCK_PROFILE: DetailedUserProfile = {
  id: 'u1',
  name: 'Alex Jordan',
  username: 'alexjordan_dev',
  email: 'alex.jordan@example.com',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  // Added bio property
  bio: 'Creative and detail-oriented Product Designer with 5+ years of experience in building user-centric digital products. Passionate about solving complex problems through elegant design solutions.',
  joinedDate: 'October 24, 2023',
  plan: 'Free',
  accountStatus: 'Active',
  resumeCount: 4,
  lastLogin: 'Today, 10:42 AM',
  twoFactorEnabled: false,
  passwordLastChanged: '2 months ago',
  recentActivity: [
    { id: 'a1', type: 'edit', description: 'Edited "Software Engineer - Tech"', timestamp: '2 hours ago' },
    { id: 'a2', type: 'tool', description: 'Used AI Summary Generator', timestamp: '5 hours ago' },
    { id: 'a3', type: 'download', description: 'Downloaded "General Application" (PDF)', timestamp: 'Yesterday' },
    { id: 'a4', type: 'login', description: 'Logged in from New Device (Chrome, Mac)', timestamp: '2 days ago' }
  ]
};
