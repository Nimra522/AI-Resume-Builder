
import { SavedResume } from '../types';
import { INITIAL_RESUME_DATA } from './templates';
import { EXAMPLES } from './examples';

// Create variations of resume data
const techData = { ...EXAMPLES[0].data, personalInfo: { ...EXAMPLES[0].data.personalInfo, fullName: 'Alex Jordan' } };
const creativeData = { ...EXAMPLES[2].data, personalInfo: { ...EXAMPLES[2].data.personalInfo, fullName: 'Alex Jordan' } };

// Create realistic timestamps for mock data
const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
const threeWeeksAgo = new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString();

export const MOCK_RESUMES: SavedResume[] = [
  {
    id: 'res_1',
    title: 'Software Engineer - Tech',
    templateId: 'tech',
    lastEdited: twoHoursAgo,
    data: techData
  },
  {
    id: 'res_2',
    title: 'Product Design Portfolio',
    templateId: 'creative',
    lastEdited: twoDaysAgo,
    data: creativeData
  },
  {
    id: 'res_3',
    title: 'General Application',
    templateId: 'modern',
    lastEdited: oneWeekAgo,
    data: INITIAL_RESUME_DATA
  },
  {
    id: 'res_4',
    title: 'Consulting CV',
    templateId: 'professional',
    lastEdited: threeWeeksAgo,
    data: { ...INITIAL_RESUME_DATA, personalInfo: { ...INITIAL_RESUME_DATA.personalInfo, jobTitle: 'Management Consultant' } }
  }
];
