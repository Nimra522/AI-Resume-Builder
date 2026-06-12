
import React from 'react';
import { BlogPost } from '../types';

export const BLOG_CATEGORIES = ["All", "Resume Tips", "Career Advice", "Job Interview", "Templates"];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '10 Tips to Beat the ATS (Applicant Tracking System)',
    category: 'Resume Tips',
    description: 'Learn how to optimize your resume keywords and formatting to ensure it gets seen by a human recruiter.',
    author: {
      name: 'Sarah Lee',
      role: 'HR Specialist',
      avatarSeed: 'Sarah'
    },
    publishedAt: 'Oct 24, 2023',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
    content: (
      <div className="space-y-6 text-text-main leading-relaxed">
        <p>
          In today's digital age, 75% of resumes are never seen by human eyes. They are filtered out by Applicant Tracking Systems (ATS). 
          To land that interview, you first need to beat the bot.
        </p>
        <h3 className="text-2xl font-bold text-text-main mt-8 mb-4">1. Use Standard Headings</h3>
        <p>
          Creativity is great, but not when it confuses the software. Stick to standard headings like "Experience," "Education," and "Skills" rather than "My Journey" or "Knowledge Base."
        </p>
        <h3 className="text-2xl font-bold text-text-main mt-8 mb-4">2. Optimize for Keywords</h3>
        <p>
          Read the job description carefully. If they ask for "Project Management" and "Agile," make sure those exact terms appear in your resume.
        </p>
        <blockquote className="border-l-4 border-primary pl-4 italic text-lg my-6 bg-gray-50 py-2 pr-2">
          "The goal isn't to trick the system, but to speak its language so your qualifications shine through."
        </blockquote>
        <h3 className="text-2xl font-bold text-text-main mt-8 mb-4">3. Avoid Complex Formatting</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Avoid tables and columns which can parse incorrectly.</li>
          <li>Do not use graphics or charts to display skills.</li>
          <li>Stick to standard fonts like Arial, Calibri, or Inter.</li>
        </ul>
      </div>
    )
  },
  {
    id: '2',
    title: 'How to Answer "Tell Me About Yourself"',
    category: 'Job Interview',
    description: 'Master the most common interview question with our simple 3-step formula designed to impress hiring managers.',
    author: {
      name: 'David Chen',
      role: 'Career Coach',
      avatarSeed: 'David'
    },
    publishedAt: 'Nov 02, 2023',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    content: (
      <div className="space-y-6 text-text-main leading-relaxed">
        <p>
          It's usually the first question, and it sets the tone for the entire interview. Yet, many candidates ramble or recite their resume.
        </p>
        <h3 className="text-2xl font-bold text-text-main mt-8 mb-4">The Present-Past-Future Formula</h3>
        <p>
          Structure your answer chronologically but strategically:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Present:</strong> Briefly mention your current role and a recent big win.</li>
          <li><strong>Past:</strong> Mention 2-3 key skills or experiences from previous jobs that are relevant to *this* job.</li>
          <li><strong>Future:</strong> Explain why you are excited about this specific opportunity.</li>
        </ul>
      </div>
    )
  },
  {
    id: '3',
    title: 'Why Soft Skills Matter More Than You Think',
    category: 'Career Advice',
    description: 'Technical skills get you the interview, but soft skills get you the job. Discover the top 5 soft skills employers want.',
    author: {
      name: 'Emily Rose',
      role: 'Recruiter',
      avatarSeed: 'Emily'
    },
    publishedAt: 'Nov 15, 2023',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
    content: (
      <div className="space-y-6 text-text-main leading-relaxed">
        <p>
           While coding languages and certifications are vital, companies are increasingly hiring for emotional intelligence, adaptability, and communication.
        </p>
        <h3 className="text-2xl font-bold text-text-main mt-8 mb-4">Top 5 Soft Skills in 2024</h3>
        <ol className="list-decimal pl-6 space-y-2">
            <li>Communication</li>
            <li>Teamwork</li>
            <li>Problem-solving</li>
            <li>Time Management</li>
            <li>Critical Thinking</li>
        </ol>
      </div>
    )
  },
  {
    id: '4',
    title: 'Top 5 Resume Templates for Creative Roles',
    category: 'Templates',
    description: 'Applying for design or marketing roles? Check out these layouts that balance creativity with professionalism.',
    author: {
      name: 'Alex Morgan',
      role: 'Designer',
      avatarSeed: 'Alex'
    },
    publishedAt: 'Nov 20, 2023',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1598301567125-6268476e9c28?auto=format&fit=crop&q=80&w=800',
    content: (
       <div className="space-y-6 text-text-main leading-relaxed">
        <p>For creative industries, a standard black-and-white resume might not cut it. You need to show your style—but keep it readable.</p>
        <p>Check out our "Modern Creative" template in the dashboard. It uses a splash of color in the header and a two-column layout to maximize white space.</p>
       </div>
    )
  },
  {
    id: '5',
    title: 'Navigating Career Changes in Your 30s',
    category: 'Career Advice',
    description: 'It is never too late to pivot. Strategies for leveraging transferable skills when switching industries.',
    author: {
      name: 'Sarah Lee',
      role: 'HR Specialist',
      avatarSeed: 'Sarah'
    },
    publishedAt: 'Dec 05, 2023',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    content: (
      <div className="space-y-6 text-text-main leading-relaxed">
         <p>Switching careers can be daunting. You might feel like you're starting from scratch, but you aren't. You have transferable skills.</p>
         <h3 className="text-2xl font-bold text-text-main mt-8 mb-4">Identify Your Core Competencies</h3>
         <p>Leadership, project management, and communication are universal. Highlight these on your resume rather than specific technical tasks from your old industry.</p>
      </div>
    )
  }
];
