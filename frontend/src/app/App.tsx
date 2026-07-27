
import React from 'react';
import { Layout, FullWidthLayout } from '../components/layout/Layout';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { PrivacyPolicy } from '../pages/PrivacyPolicy';
import { TermsOfService } from '../pages/TermsOfService';
import { CookiePolicy } from '../pages/CookiePolicy';
import { ForgotPassword } from '../pages/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword';
import { GoogleCallback } from '../pages/GoogleCallback';
import { BlogList } from '../pages/BlogList';
import { BlogDetail } from '../pages/BlogDetail';
import { TemplatesPage } from '../pages/TemplatesPage';
import { ExamplesPage } from '../pages/ExamplesPage';
import { ExamplePreview } from '../pages/ExamplePreview';
import { ResumeBuilder } from '../pages/ResumeBuilder';
import { MyResumesPage } from '../pages/MyResumesPage';
import { SettingsPage } from '../pages/SettingsPage';
import { PricingPage } from '../pages/PricingPage';
import { UserProfilePage } from '../pages/UserProfilePage';
import { DashboardOverview } from '../pages/DashboardOverview';
import { HelpSupportPage } from '../pages/HelpSupportPage';
import { ATSChecker } from '../pages/ATSChecker';
import { PaymentSuccess } from '../pages/PaymentSuccess';
import { PaymentCancel } from '../pages/PaymentCancel';
import { BrowserRouter, useLocation, Link } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { LoginModal } from '../components/ui/LoginModal';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

const PlaceholderDashboard: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center space-y-4 animate-fade-in p-8">
    <div className="p-4 bg-primary/10 rounded-full">
      <h2 className="text-2xl font-bold text-primary">{title}</h2>
    </div>
    <p className="text-text-muted max-w-md">This dashboard feature is coming soon.</p>
    <Link to="/dashboard" className="text-primary hover:underline">Back to Builder</Link>
  </div>
);

const AppRoutes: React.FC = () => {
  const { pathname, search } = useLocation();

  if (pathname === '/') return <FullWidthLayout><Home /></FullWidthLayout>;

  const mainLayoutRoutes = [
    '/about', '/contact', 
    '/privacy', '/terms', '/cookies', '/forgot-password', 
    '/templates', '/examples', '/pricing'
  ];

  if (pathname === '/login' || pathname === '/signup' || pathname.startsWith('/reset-password/')) {
    return (
      <FullWidthLayout>
        {pathname === '/login' && <Login />}
        {pathname === '/signup' && <Signup />}
        {pathname.startsWith('/reset-password/') && <ResetPassword />}
      </FullWidthLayout>
    );
  }

  if (pathname === '/blog' || pathname.startsWith('/blog/')) {
    return (
      <Layout>
        {pathname === '/blog' ? <BlogList /> : <BlogDetail id={pathname.split('/')[2]} />}
      </Layout>
    );
  }

  // Handle Example Previews separately (No Layout)
  if (pathname.startsWith('/examples/')) {
    return <ExamplePreview id={pathname.split('/')[2]} />;
  }

  if (mainLayoutRoutes.includes(pathname)) {
    return (
      <Layout>
        {pathname === '/about' && <About />}
        {pathname === '/contact' && <Contact />}
        {pathname === '/privacy' && <PrivacyPolicy />}
        {pathname === '/terms' && <TermsOfService />}
        {pathname === '/cookies' && <CookiePolicy />}
        {pathname === '/forgot-password' && <ForgotPassword />}
        {pathname === '/templates' && <TemplatesPage />}
        {pathname === '/examples' && <ExamplesPage />}
        {pathname === '/pricing' && <PricingPage />}
      </Layout>
    );
  }

  if (pathname === '/dashboard') {
    if (search.includes('?edit=') || search.includes('?template=')) {
      return <ResumeBuilder />;
    }
    return <DashboardOverview />;
  }

  if (pathname.startsWith('/dashboard') || pathname === '/settings' || pathname === '/profile') {
    return (
      <ProtectedRoute>
        {pathname === '/dashboard/resumes' && <MyResumesPage />}
        {(pathname === '/dashboard/profile' || pathname === '/profile') && <UserProfilePage />}
        {pathname === '/dashboard/support' && <HelpSupportPage />}
        {pathname === '/dashboard/ats-checker' && <ATSChecker />}
        {pathname === '/settings' && <SettingsPage />}
        {pathname.startsWith('/dashboard/') && 
         !['/dashboard', '/dashboard/resumes', '/dashboard/profile', '/dashboard/support', '/dashboard/ats-checker'].includes(pathname) &&
         <PlaceholderDashboard title={pathname.replace('/dashboard/', '').toUpperCase()} />
        }
      </ProtectedRoute>
    );
  }
  
  if (pathname === '/auth/google/callback') return <GoogleCallback />;
  if (pathname === '/payment-success') return <PaymentSuccess />;
  if (pathname === '/payment-cancel') return <PaymentCancel />;

  return <FullWidthLayout><Home /></FullWidthLayout>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <LoginModal />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
