
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
      '1 Resume Template',
      'Basic Writing Suggestions',
      'Export to TXT',
      '7-day access to history'
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
      'All Premium Templates',
      'Advanced Writing Assistance',
      'Export to PDF & Word',
      'Cover Letter Generator',
      'No Branding'
    ],
    buttonText: 'Upgrade to Pro',
    buttonVariant: 'primary'
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Ultimate power for career growth.',
    priceMonthly: 20,
    features: [
      'Everything in Pro',
      'Resume Optimization Tips',
      'ATS Compatibility Check',
      'Priority Support',
      '1-on-1 Career Coaching (1hr/mo)'
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
    question: "What happens to my resumes if I downgrade to Free?",
    answer: "Your resumes will be saved, but you will only be able to edit and download the most recent one. Premium templates will be locked until you resubscribe, but your data remains safe."
  },
  {
    question: "Do you offer a student discount?",
    answer: "Yes! We offer a 50% discount for students with a valid educational email address. Please contact our support team to get your unique discount code."
  },
  {
    question: "Do you offer a refund policy?",
    answer: "We offer a 7-day money-back guarantee. If you are not satisfied with our Pro or Premium plan, simply reach out to us within the first 7 days for a full refund."
  }
];
