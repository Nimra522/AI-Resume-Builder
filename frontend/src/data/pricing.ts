
import { Check, X } from 'lucide-react';

export interface PricingFeature {
  name: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  isPopular?: boolean;
  features: string[]; // For the card
  buttonText: string;
  buttonVariant: 'primary' | 'outline' | 'secondary';
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Essential tools to build a simple resume.',
    priceMonthly: 0,
    features: [
      '7 Resume Template',
      'Basic Writing Suggestions',
      'Export Resume as PDF',
      'Save and Manage Your Resume'
    ],
    buttonText: 'Start Free',
    buttonVariant: 'outline'
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Perfect for serious job seekers.',
    priceMonthly: 12,
    isPopular: true,
    features: [
      'Access to Pro Templates',
      'Advanced Writing Assistance',
      'Export Resume as PDF',
      'Premium Resume Designs'
    ],
    buttonText: 'Upgrade to Pro',
    buttonVariant: 'primary'
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Unlock advanced features for creating standout resumes.',
    priceMonthly: 20,
    features: [
      '100+ Resume Templates',
      'Everything in Pro',
      'Premium Templates Collection',
      'AI Assistancefor Resume writing'
    ],
    buttonText: 'Get Premium',
    buttonVariant: 'secondary'
  }
];

export const COMPARISON_FEATURES = [
  { category: 'Resume Building', items: [
    { name: 'Number of Resumes', free: '1', pro: 'Unlimited', premium: 'Unlimited' },
    { name: 'Templates', free: 'Basic Only', pro: 'All Premium', premium: 'All Premium' },
    { name: 'Custom Colors & Fonts', free: false, pro: true, premium: true },
    { name: 'Remove Branding', free: false, pro: true, premium: true },
  ]},
  { category: 'Resume Enhancement', items: [
    { name: 'Writing Suggestions', free: 'Limited', pro: 'Unlimited', premium: 'Unlimited' },
    { name: 'Resume Optimization', free: true, pro: true, premium: true },
    { name: 'Job Description Matcher', free: false, pro: true, premium: true },
    { name: 'Cover Letter Builder', free: false, pro: true, premium: true },
    { name: 'ATS Compatibility Check', free: false, pro: false, premium: true },
  ]},
  { category: 'Export & Support', items: [
    { name: 'PDF Download', free: false, pro: true, premium: true },
    { name: 'Word Download', free: false, pro: true, premium: true },
    { name: 'Email Support', free: 'Standard', pro: 'Priority', premium: '24/7 Dedicated' },
  ]}
];

export const PRICING_FAQS = [
  {
    question: "Can I upgrade my plan anytime?",
    answer: "Yes, you can upgrade your plan anytime. Payments are securely processed through Stripe, and your account access is updated after successful payment."
  },
  {
    question: "How are payments processed?",
    answer: "Yes! We offer a 50% discount for students with a valid educational email address. Please contact our support team to get your unique discount code."
  },
  {
    question: "What happens after upgrading my plan?",
    answer: "After successful payment, your account gets access to the templates and features included in your selected plan."
  },
  {
    question: "Can I access premium templates with the Free plan?",
    answer: "Free users can access available free templates, while Pro and Premium plans unlock additional template options."
  }
];
