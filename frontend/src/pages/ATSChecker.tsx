import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNotifications } from '../context/NotificationContext';
import { Button } from '../components/ui/Button';
import { apiUrl } from '../utils/api';
import { Link } from 'react-router-dom';
import {
  FileSearch,
  Upload,
  CheckCircle2,
  XCircle,
  Lightbulb,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Lock,
  Star,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface ATSResult {
  score: number;
  matched: string[];
  missing: string[];
  tip: string;
}

const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
};

const getScoreBg = (score: number): string => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
};

const getScoreLabel = (score: number): string => {
  if (score >= 80) return 'Great Match';
  if (score >= 60) return 'Good Match';
  if (score >= 40) return 'Needs Work';
  return 'Poor Match';
};

export const ATSChecker: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { addNotification } = useNotifications();

  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userPlan = (user?.plan || 'Free').toLowerCase();
  const isPremium = userPlan === 'premium';

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      showToast('Please enter both resume text and job description.', 'warning');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(apiUrl('/ai/ats-score'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('resume_ai_token')}`
        },
        body: JSON.stringify({
          resumeText: resumeText.trim(),
          jobDescription: jobDescription.trim()
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to analyze. Please try again.');
      }

      const data: ATSResult = await response.json();
      setResult(data);
    } catch (err: any) {
      const msg = err.message || 'Something went wrong. Please try again.';
      setError(msg);
      showToast(msg, 'error');
      addNotification(msg, 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setResumeText('');
    setJobDescription('');
    setResult(null);
    setError(null);
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-[calc(100vh-80px)] space-y-6">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-2">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl text-indigo-600 mb-4 shadow-sm border border-indigo-100">
            <FileSearch size={28} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            ATS Compatibility Checker
          </h1>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
            Paste your resume and a job description to see how well they match.
            Get a score, matched keywords, missing skills, and actionable tips.
          </p>
        </div>

        {/* Premium Gate */}
        {!isPremium && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium Feature</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                ATS Compatibility Check is available exclusively for Premium members.
                Upgrade to see how your resume stacks up against any job description.
              </p>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <Sparkles size={18} />
                Upgrade to Premium
              </Link>
            </div>
          </div>
        )}

        {/* Main Content */}
        {isPremium && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Inputs */}
            <div className="space-y-5">
              {/* Resume Text */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <Upload size={16} className="text-indigo-600" />
                  Resume Text
                </label>
                <textarea
                  rows={10}
                  className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm resize-none text-sm"
                  placeholder="Paste your resume content here..."
                  value={resumeText}
                  onChange={e => setResumeText(e.target.value)}
                />
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <FileSearch size={16} className="text-indigo-600" />
                  Job Description
                </label>
                <textarea
                  rows={10}
                  className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm resize-none text-sm"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleAnalyze}
                  isLoading={isAnalyzing}
                  disabled={!resumeText.trim() || !jobDescription.trim()}
                  icon={<FileSearch size={18} />}
                  fullWidth
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Compatibility'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClear}
                  disabled={isAnalyzing}
                >
                  Clear
                </Button>
              </div>
            </div>

            {/* Right Column: Results */}
            <div className="space-y-5">
              {/* Loading State */}
              {isAnalyzing && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 flex flex-col items-center justify-center min-h-[400px]">
                  <Loader2 size={40} className="animate-spin text-indigo-600 mb-4" />
                  <p className="text-gray-500 font-medium">Analyzing your resume...</p>
                  <p className="text-sm text-gray-400 mt-1">Comparing against job description</p>
                </div>
              )}

              {/* Error State */}
              {error && !isAnalyzing && (
                <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Analysis Failed</h3>
                  <p className="text-gray-500 mb-6">{error}</p>
                  <Button variant="outline" onClick={() => setError(null)}>
                    Try Again
                  </Button>
                </div>
              )}

              {/* Results */}
              {result && !isAnalyzing && !error && (
                <>
                  {/* Score Card */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Compatibility Score</p>
                    <div className="relative w-36 h-36 mx-auto mb-4">
                      <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 36 36">
                        <circle
                          cx="18" cy="18" r="15.5"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="18" cy="18" r="15.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeDasharray={`${result.score * 0.97} 100`}
                          strokeLinecap="round"
                          className={getScoreColor(result.score)}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-3xl font-black ${getScoreColor(result.score)}`}>
                          {result.score}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">/100</span>
                      </div>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      result.score >= 80 ? 'bg-green-100 text-green-700' :
                      result.score >= 60 ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {getScoreLabel(result.score)}
                    </span>
                  </div>

                  {/* Matched Keywords */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                        <CheckCircle2 size={18} />
                      </div>
                      <h3 className="font-bold text-gray-900">Matched Keywords</h3>
                    </div>
                    {result.matched.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {result.matched.map((kw, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">No matching keywords found.</p>
                    )}
                  </div>

                  {/* Missing Keywords */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                        <XCircle size={18} />
                      </div>
                      <h3 className="font-bold text-gray-900">Missing Keywords</h3>
                    </div>
                    {result.missing.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {result.missing.map((kw, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">No missing keywords — great alignment!</p>
                    )}
                  </div>

                  {/* Tip */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 shadow-sm p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Lightbulb size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Improvement Tip</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">{result.tip}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Empty State */}
              {!result && !isAnalyzing && !error && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
                  <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-5">
                    <TrendingUp size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Check?</h3>
                  <p className="text-gray-500 max-w-sm">
                    Paste your resume and a job description on the left, then click
                    <span className="font-semibold text-indigo-600"> Analyze Compatibility</span>.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
