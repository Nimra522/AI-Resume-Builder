
import { Example, ResumeData } from '../types';

const BASE_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    jobTitle: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  additionalInfo: []
};

// Fix: Use any for overrides to allow partial nested objects while maintaining a simple data creation helper
const createData = (overrides: any): ResumeData => ({
  ...BASE_DATA,
  ...overrides,
  personalInfo: { ...BASE_DATA.personalInfo, ...overrides.personalInfo }
});

export const EXAMPLES: Example[] = [
  {
    id: 'software-engineer',
    title: 'Senior Software Engineer',
    role: 'Tech & Engineering',
    description: 'A performance-focused resume highlighting cloud architecture and full-stack expertise.',
    layoutType: 'modern',
    thumbnailUrl: '/dist/assets/templates/Teck stack.jpg',
    colorAccent: 'bg-green-500',
    data: createData({
      personalInfo: {
        fullName: 'James Wilson',
        jobTitle: 'Senior Software Engineer',
        email: 'j.wilson@dev.com',
        phone: '(555) 123-9999',
        location: 'Seattle, WA',
        website: 'jameswilson.dev',
        linkedin: 'linkedin.com/in/jameswilson',
        summary: 'Full-stack developer with 8+ years of experience in building scalable web applications. Proficient in React, Node.js, and AWS.'
      },
      experience: [
        { id: '1', company: 'CloudScale Inc.', role: 'Senior Engineer', startDate: '2019-03', endDate: 'Present', current: true, description: 'Architected microservices handling 1M+ daily requests.' },
        { id: '2', company: 'TechStartups LLC', role: 'Software Engineer', startDate: '2017-06', endDate: '2019-02', current: false, description: 'Developed full-stack applications using React and Node.js.' },
        { id: '3', company: 'InnovateSoft', role: 'Junior Developer', startDate: '2016-01', endDate: '2017-05', current: false, description: 'Collaborated on enterprise software solutions using Java and Angular.' }
      ],
      education: [
        { id: '1', school: 'University of Washington', degree: 'BS Computer Science', graduationDate: '2015', description: 'Minor in Mathematics' }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'Python', 'SQL', 'Git'],
      projects: [
        { id: '1', name: 'Real-time Chat Application', description: 'Developed a scalable chat application using React, Socket.IO, and Redis.' },
        { id: '2', name: 'E-commerce Microservices', description: 'Designed and deployed a microservices architecture for e-commerce platform.' }
      ],
      certifications: [
        { id: '1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2020' },
        { id: '2', name: 'Certified Kubernetes Administrator', issuer: 'CNCF', date: '2021' }
      ]
    })
  },
  {
    id: 'designer',
    title: 'Product Designer',
    role: 'Creative & UI/UX',
    description: 'Portfolio-style layout emphasizing visual design and user research methodologies.',
    layoutType: 'creative',
    thumbnailUrl: '/dist/assets/templates/creative.jpg',
    colorAccent: 'bg-pink-500',
    data: createData({
      personalInfo: {
        fullName: 'Mia Khaleesi',
        jobTitle: 'Product Designer',
        email: 'mia@design.io',
        phone: '(555) 987-6543',
        location: 'Brooklyn, NY',
        website: 'miakhaleesi.design',
        linkedin: 'linkedin.com/in/miakhaleesi',
        summary: 'User-centric designer focused on creating intuitive digital experiences through research-driven design.'
      },
      experience: [
        { id: '1', company: 'Design Hub', role: 'UX Designer', startDate: '2020-01', endDate: 'Present', current: true, description: 'Led end-to-end design for top-tier fintech applications.' },
        { id: '2', company: 'Creative Studio', role: 'UI Designer', startDate: '2018-03', endDate: '2019-12', current: false, description: 'Created wireframes and prototypes for mobile applications.' },
        { id: '3', company: 'Digital Agency', role: 'Junior Designer', startDate: '2016-06', endDate: '2018-02', current: false, description: 'Designed user interfaces for various client websites.' }
      ],
      education: [
        { id: '1', school: 'Parsons School of Design', degree: 'BFA Graphic Design', graduationDate: '2016', description: 'Concentration in Digital Design' }
      ],
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Design Systems', 'UI/UX', 'Interaction Design', 'Visual Design'],
      projects: [
        { id: '1', name: 'Finance App Redesign', description: 'Redesigned user flows for banking application, resulting in 30% increase in user engagement.' },
        { id: '2', name: 'E-commerce Platform', description: 'Designed complete UX for online shopping platform serving 100K+ users.' }
      ],
      certifications: [
        { id: '1', name: 'Google UX Design Certificate', issuer: 'Google', date: '2019' },
        { id: '2', name: 'Figma Professional Certification', issuer: 'Figma', date: '2020' }
      ]
    })
  },
  {
    id: 'marketing-manager',
    title: 'Marketing Manager',
    role: 'Marketing & Growth',
    description: 'Results-driven layout focusing on campaign analytics and revenue growth.',
    layoutType: 'modern',
    thumbnailUrl: '/dist/assets/templates/modern.jpg',
    colorAccent: 'bg-indigo-500',
    data: createData({
      personalInfo: {
        fullName: 'Amanda Clarke',
        jobTitle: 'Marketing Manager',
        email: 'amanda@growth.com',
        phone: '(555) 456-7890',
        location: 'Austin, TX',
        website: 'amandaclarke.marketing',
        linkedin: 'linkedin.com/in/amandaclarke',
        summary: 'Strategic marketing leader with a track record of increasing ROI by 45% through multi-channel campaigns.'
      },
      experience: [
        { id: '1', company: 'Growth Labs', role: 'Marketing Lead', startDate: '2018-06', endDate: 'Present', current: true, description: 'Managed $2M annual ad spend with 3.5x return.' },
        { id: '2', company: 'BrandBoost Co.', role: 'Marketing Specialist', startDate: '2016-02', endDate: '2018-05', current: false, description: 'Executed digital marketing campaigns resulting in 60% lead generation increase.' },
        { id: '3', company: 'AdvertiseNow', role: 'Junior Marketer', startDate: '2014-08', endDate: '2016-01', current: false, description: 'Assisted in social media and content marketing initiatives.' }
      ],
      education: [
        { id: '1', school: 'University of Texas', degree: 'BS Marketing', graduationDate: '2014', description: 'Magna Cum Laude' }
      ],
      skills: ['SEO', 'PPC', 'Google Analytics', 'Content Strategy', 'Email Marketing', 'Social Media', 'Brand Management', 'Campaign Management', 'CRM Systems'],
      projects: [
        { id: '1', name: 'Q4 Holiday Campaign', description: 'Managed integrated holiday campaign that increased sales by 40% YoY.' },
        { id: '2', name: 'Brand Awareness Initiative', description: 'Launched brand awareness campaign reaching 2M+ prospects.' }
      ],
      certifications: [
        { id: '1', name: 'Google Ads Certified', issuer: 'Google', date: '2019' },
        { id: '2', name: 'HubSpot Content Marketing', issuer: 'HubSpot', date: '2020' }
      ]
    })
  },
  {
    id: 'student',
    title: 'University Student',
    role: 'Academic & Internship',
    description: 'Clean layout prioritizing education, internships, and campus leadership.',
    layoutType: 'academic',
    thumbnailUrl: '/dist/assets/templates/academic.jpg',
    colorAccent: 'bg-blue-400',
    data: createData({
      personalInfo: {
        fullName: 'Ethan Hunt',
        jobTitle: 'Computer Science Student',
        email: 'ethan@university.edu',
        phone: '(555) 234-5678',
        location: 'Stanford, CA',
        website: 'ethanhunt.studentportfolio.com',
        linkedin: 'linkedin.com/in/ethanhunt',
        summary: 'Third-year CS student with a 3.9 GPA and passion for Artificial Intelligence.'
      },
      experience: [
        { id: '1', company: 'Stanford CS Department', role: 'Teaching Assistant', startDate: '2023-09', endDate: 'Present', current: true, description: 'Assist professors with course material and mentor students in programming.' },
        { id: '2', company: 'Campus Innovation Lab', role: 'Research Assistant', startDate: '2023-01', endDate: '2023-05', current: false, description: 'Conducted research on machine learning algorithms for natural language processing.' },
        { id: '3', company: 'Local Startup', role: 'Summer Intern', startDate: '2022-06', endDate: '2022-08', current: false, description: 'Developed web applications using React and Node.js.' }
      ],
      education: [
        { id: '1', school: 'Stanford University', degree: 'BS in Computer Science', graduationDate: '2025', description: 'Dean\'s List • Relevant Coursework: Algorithms, Data Structures, AI, ML' }
      ],
      skills: ['Python', 'Java', 'C++', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'Algorithms', 'Data Structures', 'Machine Learning', 'Teamwork'],
      projects: [
        { id: '1', name: 'AI Chatbot for Campus Services', description: 'Developed an AI-powered chatbot to assist students with common campus queries.' },
        { id: '2', name: 'Campus Event Management System', description: 'Built a web application for organizing and promoting campus events.' }
      ],
      certifications: [
        { id: '1', name: 'Python for Everybody Specialization', issuer: 'Coursera', date: '2022' },
        { id: '2', name: 'CS50\'s Introduction to Computer Science', issuer: 'Harvard', date: '2021' }
      ]
    })
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    role: 'Data Science & BI',
    description: 'Logical structure highlighting technical toolsets and data-driven insights.',
    layoutType: 'professional',
    thumbnailUrl: '/dist/assets/templates/professional.jpg',
    colorAccent: 'bg-slate-700',
    data: createData({
      personalInfo: {
        fullName: 'Sarah Chen',
        jobTitle: 'Data Analyst',
        email: 'sarah.c@data.com',
        phone: '(555) 345-6789',
        location: 'Chicago, IL',
        website: 'sarahchen.dataanalyst.com',
        linkedin: 'linkedin.com/in/sarahchen',
        summary: 'Analytical professional skilled in SQL, Tableau, and Python for complex data modeling.'
      },
      experience: [
        { id: '1', company: 'Global Insights', role: 'Data Analyst', startDate: '2021-02', endDate: 'Present', current: true, description: 'Developed automated dashboards reducing reporting time by 60%.' },
        { id: '2', company: 'Business Intelligence Corp', role: 'Junior Data Analyst', startDate: '2019-07', endDate: '2021-01', current: false, description: 'Performed data analysis and created reports for client accounts.' },
        { id: '3', company: 'Analytics Plus', role: 'Data Intern', startDate: '2018-05', endDate: '2018-08', current: false, description: 'Assisted in data cleaning and visualization projects.' }
      ],
      education: [
        { id: '1', school: 'University of Illinois', degree: 'MS Data Science', graduationDate: '2019', description: 'Thesis: Predictive Modeling for Retail Sales' }
      ],
      skills: ['SQL', 'Python', 'R', 'Tableau', 'PowerBI', 'Excel', 'Statistical Analysis', 'Machine Learning', 'Data Visualization', 'Pandas', 'NumPy'],
      projects: [
        { id: '1', name: 'Customer Segmentation Model', description: 'Built predictive model identifying customer segments with 85% accuracy.' },
        { id: '2', name: 'Sales Forecasting Dashboard', description: 'Created interactive dashboard for forecasting quarterly sales trends.' }
      ],
      certifications: [
        { id: '1', name: 'Tableau Desktop Specialist', issuer: 'Tableau', date: '2020' },
        { id: '2', name: 'Google Data Analytics Certificate', issuer: 'Google', date: '2019' }
      ]
    })
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    role: 'Product & Strategy',
    description: 'Executive layout focused on roadmap delivery and stakeholder management.',
    layoutType: 'executive',
    thumbnailUrl: '/dist/assets/templates/Executive.jpg',
    colorAccent: 'bg-yellow-600',
    data: createData({
      personalInfo: {
        fullName: 'Robert Sterling',
        jobTitle: 'Senior Product Manager',
        email: 'robert@product.io',
        phone: '(555) 567-8901',
        location: 'Denver, CO',
        website: 'robertsterling.pm',
        linkedin: 'linkedin.com/in/robertsterling',
        summary: 'PMP certified PM with 5 years experience leading cross-functional teams in SaaS.'
      },
      experience: [
        { id: '1', company: 'SaaS Giant', role: 'Product Manager', startDate: '2019-09', endDate: 'Present', current: true, description: 'Launched mobile app with 500k+ downloads in first year.' },
        { id: '2', company: 'TechVentures', role: 'Associate PM', startDate: '2017-03', endDate: '2019-08', current: false, description: 'Managed product roadmap for enterprise software solutions.' },
        { id: '3', company: 'StartupXYZ', role: 'Product Coordinator', startDate: '2015-06', endDate: '2017-02', current: false, description: 'Coordinated product launches and gathered user feedback.' }
      ],
      education: [
        { id: '1', school: 'Colorado State University', degree: 'MBA', graduationDate: '2017', description: 'Specialization in Product Management' },
        { id: '2', school: 'University of Colorado', degree: 'BS Business Administration', graduationDate: '2015', description: 'Concentration in Marketing' }
      ],
      skills: ['Agile', 'Scrum', 'JIRA', 'Product Roadmap', 'Market Research', 'User Stories', 'A/B Testing', 'Stakeholder Management', 'Data Analysis', 'Roadmapping'],
      projects: [
        { id: '1', name: 'Mobile App Launch', description: 'Led cross-functional team to launch mobile application with 500k+ downloads.' },
        { id: '2', name: 'Enterprise Feature Rollout', description: 'Delivered enterprise feature to 1000+ premium clients.' }
      ],
      certifications: [
        { id: '1', name: 'PMP Certification', issuer: 'PMI', date: '2018' },
        { id: '2', name: 'Certified Scrum Product Owner', issuer: 'Scrum Alliance', date: '2019' }
      ]
    })
  },
  {
    id: 'freelancer',
    title: 'Freelancer / Consultant',
    role: 'Independent Work',
    description: 'Versatile layout showcasing project variety and specialized skills.',
    layoutType: 'compact',
    thumbnailUrl: '/dist/assets/templates/compact.jpg',
    colorAccent: 'bg-orange-500',
    data: createData({
      personalInfo: {
        fullName: 'Jordan Lee',
        jobTitle: 'Senior Business Consultant',
        email: 'jordan@consulting.com',
        phone: '(555) 678-9012',
        location: 'Remote',
        website: 'jordanlee.consulting',
        linkedin: 'linkedin.com/in/jordanlee',
        summary: 'Expert consultant helping businesses scale through operational efficiency and brand strategy.'
      },
      experience: [
        { id: '1', company: 'Self-Employed', role: 'Business Consultant', startDate: '2018-01', endDate: 'Present', current: true, description: 'Provided strategic consulting services to 50+ businesses across various industries.' },
        { id: '2', company: 'Management Consulting Firm', role: 'Senior Consultant', startDate: '2015-03', endDate: '2017-12', current: false, description: 'Led consulting projects for Fortune 500 companies focusing on operational improvements.' },
        { id: '3', company: 'Strategy Plus', role: 'Business Analyst', startDate: '2013-06', endDate: '2015-02', current: false, description: 'Analyzed business processes and recommended improvement strategies.' }
      ],
      education: [
        { id: '1', school: 'Wharton School', degree: 'MBA', graduationDate: '2013', description: 'Concentration in Strategy and Operations' },
        { id: '2', school: 'University of Pennsylvania', degree: 'BS Economics', graduationDate: '2011', description: 'Magna Cum Laude' }
      ],
      skills: ['Project Management', 'Strategy', 'Branding', 'Communication', 'Business Analysis', 'Operations', 'Financial Modeling', 'Change Management', 'Team Leadership', 'Negotiation'],
      projects: [
        { id: '1', name: 'Brand Re-launch', description: 'Complete overhaul for a mid-sized e-commerce brand.' },
        { id: '2', name: 'Operational Efficiency', description: 'Streamlined operations for manufacturing firm, saving $2M annually.' },
        { id: '3', name: 'Market Entry Strategy', description: 'Developed market entry strategy for tech startup expanding to Europe.' }
      ],
      certifications: [
        { id: '1', name: 'Project Management Professional (PMP)', issuer: 'PMI', date: '2016' },
        { id: '2', name: 'Six Sigma Black Belt', issuer: 'ASQ', date: '2017' }
      ]
    })
  },
  {
    id: 'fresh-graduate',
    title: 'Fresh Graduate',
    role: 'Early Career',
    description: 'ATS-friendly design perfect for entry-level positions and career changes.',
    layoutType: 'minimalist',
    thumbnailUrl: '/dist/assets/templates/minimalist.jpg',
    colorAccent: 'bg-gray-400',
    data: createData({
      personalInfo: {
        fullName: 'Emily Davis',
        jobTitle: 'Recent Graduate',
        email: 'emily@career.com',
        phone: '(555) 789-0123',
        location: 'Boston, MA',
        website: 'emilydavis.portfolio.com',
        linkedin: 'linkedin.com/in/emilydavis',
        summary: 'Highly motivated graduate seeking to leverage strong communication skills and academic background in a fast-paced environment.'
      },
      experience: [
        { id: '1', company: 'ABC Marketing Agency', role: 'Marketing Intern', startDate: '2022-06', endDate: '2022-08', current: false, description: 'Assisted in social media campaigns and market research projects.' },
        { id: '2', company: 'Boston University', role: 'Research Assistant', startDate: '2021-09', endDate: '2022-05', current: false, description: 'Conducted academic research on consumer behavior patterns.' },
        { id: '3', company: 'Community Outreach', role: 'Volunteer Coordinator', startDate: '2020-01', endDate: '2021-05', current: false, description: 'Organized volunteer activities and managed community outreach programs.' }
      ],
      education: [
        { id: '1', school: 'Boston University', degree: 'BA in Communications', graduationDate: '2023', description: 'GPA: 3.8 • Relevant Coursework: Public Relations, Digital Marketing, Consumer Psychology' }
      ],
      skills: ['Microsoft Office', 'Public Speaking', 'Social Media', 'Research', 'Writing', 'Event Planning', 'Project Coordination', 'Customer Service', 'Team Collaboration', 'Time Management'],
      projects: [
        { id: '1', name: 'Student Organization Leadership', description: 'Led university organization with 100+ members, organizing 10+ events annually.' },
        { id: '2', name: 'Marketing Campaign Project', description: 'Developed comprehensive marketing campaign for local nonprofit, increasing engagement by 40%.' }
      ],
      certifications: [
        { id: '1', name: 'Google Analytics Certificate', issuer: 'Google', date: '2022' },
        { id: '2', name: 'Social Media Marketing Certificate', issuer: 'HubSpot', date: '2023' }
      ]
    })
  }
];
