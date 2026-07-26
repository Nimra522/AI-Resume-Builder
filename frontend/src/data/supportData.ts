
import { 
  User, 
  CreditCard, 
  FileText, 
  Palette, 
  Shield, 
  AlertCircle, 
  HelpCircle,
  LucideIcon
} from 'lucide-react';

export interface SupportCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface SupportFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SupportGuide {
  id: string;
  title: string;
  description: string;
  readTime: string;
}

export const SUPPORT_CATEGORIES: SupportCategory[] = [
  {
    id: 'account-resume',
    title: 'Account & Resume',
    description: 'Managing your account and resume creation.',
    icon: User
  },
  {
    id: 'subscription',
    title: 'Subscription & Plans',
    description: 'Plans, upgrades, and subscription management.',
    icon: CreditCard
  },
  {
    id: 'billing',
    title: 'Billing & Payments',
    description: 'Payment processing and billing inquiries.',
    icon: FileText
  }
];

export const SUPPORT_FAQS: SupportFAQ[] = [
  // Account & Resume FAQs
  {
    id: 'ar1',
    category: 'account-resume',
    question: 'How do I create a new resume?',
    answer: 'Navigate to the Resume Builder page from your dashboard. Click "Create New Resume" and select a template. Add your personal information, work experience, education, and skills. Click "Save Resume" when you are ready to store your resume in your account.'
  },
  {
    id: 'ar2',
    category: 'account-resume',
    question: 'Can I edit my resume after saving?',
    answer: 'Yes, all your resumes are fully editable at any time. Go to "My Resumes" in your dashboard, select the resume you want to edit, and click "Edit". Your progress is saved locally while you work. Click "Save Resume" to permanently save your changes.'
  },
  {
    id: 'ar3',
    category: 'account-resume',
    question: 'Where are my saved resumes?',
    answer: 'All your resumes are stored in the "My Resumes" section of your dashboard. You can access them anytime, edit them, or download them in PDF Format.'
  },

  // Subscription & Plans FAQs
  {
    id: 'sp1',
    category: 'subscription',
    question: 'What is the difference between Free, Pro, and Premium?',
    answer: 'Free Plan: Access to basic templates and standard features. Pro Plan ($12/month): Access to free templates plus professional pro templates. Premium Plan ($20/month): Access to all templates.'
  },
  {
    id: 'sp2',
    category: 'subscription',
    question: 'How do I upgrade my plan?',
    answer: 'You can upgrade your plan directly from the Pricing page. Simply visit the Pricing page, choose your desired plan, and complete the secure checkout process. Once your payment is successfully processed, your new features will be activated immediately.'
  },
  {
    id: 'sp3',
    category: 'subscription',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Subscription cancellation is not currently available from your dashboard. For any billing-related requests, please contact our support team.'
  },

  // Billing & Payments FAQs
  {
    id: 'bp1',
    category: 'billing',
    question: 'How are payments processed?',
    answer: 'All payments are securely processed through Stripe, a trusted payment processor. We do not store your credit card information on our servers. Your payment details are handled entirely by Stripe with bank-level security.'
  },
  {
    id: 'bp2',
    category: 'billing',
    question: 'My payment was successful but my plan is not updated.',
    answer: 'This can occasionally happen due to processing delays. Please refresh your dashboard page. If the issue persists after 10 minutes, contact our support team at support@resumecraft.com with your transaction details.'
  },
  {
    id: 'bp3',
    category: 'billing',
    question: 'Can I get a refund?',
    answer: 'Refund requests are handled on a case-by-case basis. Please contact our support team for assistance with payment-related issues.'
  }
];

export const SUPPORT_GUIDES: SupportGuide[] = [
  {
    id: 'g1',
    title: 'Getting Started Guide',
    description: 'Complete walkthrough of creating your first professional resume.',
    readTime: '5 min read'
  },
  {
    id: 'g2',
    title: 'Plan Comparison',
    description: 'Detailed breakdown of Free, Pro, and Premium plan features.',
    readTime: '3 min read'
  },
  {
    id: 'g3',
    title: 'Billing & Payments',
    description: 'How subscription billing works and payment security measures.',
    readTime: '4 min read'
  }
];
