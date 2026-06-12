export interface FaqExample {
  id: string;
  category: string;
  field: string;
  title: string;
  content: string;
  industry?: string;
}

export const FAQ_EXAMPLES: FaqExample[] = [
  // Professional Summary Examples
  {
    id: 'ps1',
    category: 'professional-summary',
    field: 'summary',
    title: 'Teacher Professional Summary',
    content: 'Dedicated educator with 5+ years of experience in elementary education. Proven track record of improving student engagement and academic performance through innovative teaching methods and personalized learning approaches. Committed to fostering a positive classroom environment that promotes critical thinking and creativity.',
    industry: 'Education'
  },
  {
    id: 'ps2',
    category: 'professional-summary',
    field: 'summary',
    title: 'Software Developer Professional Summary',
    content: 'Experienced software developer with expertise in JavaScript, React, and Node.js. Successfully delivered 15+ web applications with 99% uptime and improved performance by 40%. Passionate about writing clean, maintainable code and mentoring junior developers.',
    industry: 'Technology'
  },
  {
    id: 'ps3',
    category: 'professional-summary',
    field: 'summary',
    title: 'Marketing Manager Professional Summary',
    content: 'Results-driven marketing manager with 6+ years of experience driving brand awareness and revenue growth. Led digital campaigns that increased online sales by 35% and managed budgets up to $500K. Expert in social media marketing, SEO, and data analytics.',
    industry: 'Marketing'
  },
  {
    id: 'ps4',
    category: 'professional-summary',
    field: 'summary',
    title: 'Healthcare Professional Summary',
    content: 'Compassionate registered nurse with 8+ years of experience in critical care and patient advocacy. Consistently maintained patient satisfaction scores above 95% and reduced hospital readmission rates by 20% through comprehensive discharge planning and follow-up care.',
    industry: 'Healthcare'
  },
  {
    id: 'ps5',
    category: 'professional-summary',
    field: 'summary',
    title: 'Sales Professional Summary',
    content: 'Top-performing sales executive with 7+ years of experience exceeding quarterly targets by an average of 120%. Built and led high-performing teams that increased regional revenue by $2M annually. Skilled in consultative selling and relationship building.',
    industry: 'Sales'
  },
  {
    id: 'ps6',
    category: 'professional-summary',
    field: 'summary',
    title: 'Finance Professional Summary',
    content: 'Certified financial analyst with 5+ years of experience in investment banking and portfolio management. Managed assets worth $50M+ and consistently delivered returns above market average. Strong analytical skills with expertise in financial modeling and risk assessment.',
    industry: 'Finance'
  },

  // Skills Examples
  {
    id: 'sk1',
    category: 'skills',
    field: 'skills',
    title: 'Technical Skills for Developers',
    content: 'JavaScript, TypeScript, React, Node.js, Python, SQL, HTML5, CSS3, Git, REST APIs, Agile Methodologies, Cloud Computing, AWS, Docker, Jest, Redux'
  },
  {
    id: 'sk2',
    category: 'skills',
    field: 'skills',
    title: 'Marketing Skills',
    content: 'Digital Marketing, SEO/SEM, Social Media Marketing, Content Strategy, Email Marketing, Analytics, Brand Management, Market Research, Campaign Management, CRM Systems'
  },
  {
    id: 'sk3',
    category: 'skills',
    field: 'skills',
    title: 'Leadership & Management Skills',
    content: 'Team Leadership, Strategic Planning, Project Management, Budget Management, Process Improvement, Change Management, Stakeholder Engagement, Performance Management'
  },
  {
    id: 'sk4',
    category: 'skills',
    field: 'skills',
    title: 'Design & Creative Skills',
    content: 'Adobe Creative Suite, Figma, Sketch, UX/UI Design, Wireframing, Prototyping, User Research, Visual Design, Brand Identity, Typography, Print Design'
  },
  {
    id: 'sk5',
    category: 'skills',
    field: 'skills',
    title: 'Business & Finance Skills',
    content: 'Financial Analysis, Budget Planning, Forecasting, Risk Assessment, Financial Modeling, Investment Analysis, Tax Preparation, Audit, Business Strategy'
  },
  {
    id: 'sk6',
    category: 'skills',
    field: 'skills',
    title: 'Healthcare Skills',
    content: 'Patient Care, Medical Procedures, Electronic Health Records, Clinical Documentation, Patient Advocacy, Emergency Response, Medication Administration'
  },

  // Experience Description Examples
  {
    id: 'exp1',
    category: 'experience-description',
    field: 'description',
    title: 'Achievement-focused Experience Description',
    content: '• Increased department productivity by 25% through implementation of new workflow processes\n• Led cross-functional team of 8 members to complete project 2 weeks ahead of schedule\n• Reduced operational costs by $50K annually through strategic vendor negotiations'
  },
  {
    id: 'exp2',
    category: 'experience-description',
    field: 'description',
    title: 'Leadership-focused Experience Description',
    content: '• Managed team of 12 direct reports, resulting in 95% employee retention rate\n• Mentored 5 junior staff members, all of whom received promotions within 18 months\n• Developed training programs that improved team performance metrics by 30%'
  },
  {
    id: 'exp3',
    category: 'experience-description',
    field: 'description',
    title: 'Sales-focused Experience Description',
    content: '• Exceeded annual sales quota by 130%, generating $2.5M in new revenue\n• Developed relationships with 50+ enterprise clients, achieving 98% retention rate\n• Identified and pursued new market opportunities that expanded territory by 40%'
  },
  {
    id: 'exp4',
    category: 'experience-description',
    field: 'description',
    title: 'Technical-focused Experience Description',
    content: '• Developed and deployed 10+ web applications using React and Node.js\n• Optimized application performance by 45% through code refactoring and caching strategies\n• Implemented CI/CD pipeline that reduced deployment time by 70%'
  },
  {
    id: 'exp5',
    category: 'experience-description',
    field: 'description',
    title: 'Customer Service-focused Experience Description',
    content: '• Maintained 99% customer satisfaction rating throughout tenure\n• Resolved 150+ escalated customer issues per month with 95% resolution rate\n• Trained 20+ new hires on customer service protocols and procedures'
  },
  {
    id: 'exp6',
    category: 'experience-description',
    field: 'description',
    title: 'Operations-focused Experience Description',
    content: '• Streamlined inventory management process, reducing waste by 35%\n• Improved supply chain efficiency by coordinating with 15+ suppliers\n• Implemented quality assurance protocols that decreased defects by 50%'
  },

  // Education Description Examples
  {
    id: 'edu1',
    category: 'education-description',
    field: 'description',
    title: 'Academic Achievement Description',
    content: 'Graduated Magna Cum Laude with 3.8 GPA. Recipient of Dean\'s List for 6 consecutive semesters. Completed capstone project on sustainable business practices with distinction.'
  },
  {
    id: 'edu2',
    category: 'education-description',
    field: 'description',
    title: 'Leadership in Education',
    content: 'Served as President of Student Engineering Society for 2 years. Organized conferences attended by 300+ students. Led fundraising efforts that raised $15K for scholarship fund.'
  },
  {
    id: 'edu3',
    category: 'education-description',
    field: 'description',
    title: 'Research Experience',
    content: 'Conducted research on machine learning algorithms under Professor supervision. Published findings in peer-reviewed journal. Presented at National Computer Science Conference.'
  },
  {
    id: 'edu4',
    category: 'education-description',
    field: 'description',
    title: 'Study Abroad Experience',
    content: 'Participated in International Business Program in Germany. Studied global market strategies and completed internship with multinational corporation. Developed fluency in German language.'
  },

  // Project Description Examples
  {
    id: 'proj1',
    category: 'project-description',
    field: 'description',
    title: 'Web Application Project',
    content: 'Developed full-stack e-commerce application using React, Node.js, and MongoDB. Implemented user authentication, payment processing, and admin dashboard. Deployed on AWS with 99.9% uptime.'
  },
  {
    id: 'proj2',
    category: 'project-description',
    field: 'description',
    title: 'Data Analysis Project',
    content: 'Analyzed customer behavior data for Fortune 500 client using Python and Tableau. Identified trends that led to 15% increase in conversion rates. Created interactive dashboards for stakeholders.'
  },
  {
    id: 'proj3',
    category: 'project-description',
    field: 'description',
    title: 'Mobile App Project',
    content: 'Built cross-platform mobile app using React Native. Integrated with REST API and implemented offline functionality. Achieved 4.8-star rating on app stores with 10K+ downloads.'
  },
  {
    id: 'proj4',
    category: 'project-description',
    field: 'description',
    title: 'UX/UI Design Project',
    content: 'Redesigned user interface for SaaS platform, resulting in 25% improvement in user engagement. Conducted user research and usability testing. Created interactive prototypes in Figma.'
  },


];

export const getFaqsByField = (field: string) => {
  return FAQ_EXAMPLES.filter(faq => faq.field === field);
};

export const getFaqsByCategory = (category: string) => {
  return FAQ_EXAMPLES.filter(faq => faq.category === category);
};