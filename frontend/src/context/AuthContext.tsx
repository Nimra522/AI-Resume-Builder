
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, SavedResume } from '../types';
import { useNotifications } from './NotificationContext';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string; twoFactorRequired?: boolean }>;
  loginWithToken: (token: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; message: string }>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  updatePreferences: (preferences: { autoSave?: boolean }) => Promise<{ success: boolean; message: string; autoSave?: boolean }>;
  deleteAccount: () => Promise<{ success: boolean; message: string }>;
  isLoginModalOpen: boolean;
  openLoginModal: (redirectPath?: string) => void;
  closeLoginModal: () => void;
  loginRedirectPath: string;
  refreshUserData: () => Promise<void>;
  updateResumeCount: () => Promise<void>;
  setup2FA: (phone: string) => Promise<{ success: boolean; phone?: string; message?: string }>;
  verify2FA: (otp: string) => Promise<{ success: boolean; message: string }>;
  disable2FA: (otp: string) => Promise<{ success: boolean; message: string }>;
  resend2FAOTP: () => Promise<{ success: boolean; message: string }>;
  loginWith2FA: (email: string, password: string, otp: string) => Promise<{ success: boolean; message: string; twoFactorRequired?: boolean }>;
  createCheckoutSession: (plan: string) => Promise<{ success: boolean; sessionId?: string; sessionUrl?: string; message?: string; error?: any }>;
  verifyTemplateAccess: (templateId: string, action: 'access' | 'editor' | 'download') => Promise<{ success: boolean; status?: number; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

const SESSION_KEY = 'resume_ai_token';
const API_URL = '/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginRedirectPath, setLoginRedirectPath] = useState('/dashboard');
  
  const { addNotification, clearNotifications } = useNotifications();

  useEffect(() => {
    const savedToken = localStorage.getItem(SESSION_KEY);
    if (savedToken) {
      setToken(savedToken);
      validateToken(savedToken);
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const userData = await res.json();
        
        const storeKey = `saved_resumes_${userData._id}`;
        const savedResumes: SavedResume[] = JSON.parse(localStorage.getItem(storeKey) || '[]');

        // Check for local overrides (mocking profile updates when server persistence is limited)
        const localProfileKey = `user_profile_data_${userData._id}`;
        const localProfile = JSON.parse(localStorage.getItem(localProfileKey) || '{}');
        const { plan: _ignoredPlan, ...safeLocalProfile } = localProfile;

        // Format the joined date from createdAt
        const joinedDate = new Date(userData.createdAt).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        const normalizedPlan = (userData.plan || 'free').toLowerCase();

        setUser({ 
          id: userData._id, 
          name: safeLocalProfile.name || userData.fullName, 
          email: userData.email, 
          username: userData.username || safeLocalProfile.username || '',
          phone: userData.phone || safeLocalProfile.phone || '',
          location: userData.location || safeLocalProfile.location || '',
          avatarUrl: safeLocalProfile.profileImage || userData.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.fullName.split(' ')[0]}`,
          resumeCount: savedResumes.length,
          lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
          joinedDate: joinedDate,
          autoSave: userData.autoSave !== undefined ? userData.autoSave : true,
          passwordLastChanged: userData.passwordChangedAt ? 
            new Date(userData.passwordChangedAt).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            }) : (userData.authProvider === 'google' ? 'Using Google Sign-in' : 'Not available'),
          ...safeLocalProfile,
          plan: normalizedPlan
        });
        setIsAuthenticated(true);
        setToken(token);
      } else {
        // Handle unauthorized/expired token
        const errorData = await res.json().catch(() => ({}));
        console.warn('Token validation failed:', errorData.message || res.statusText);
        logout();
      }
    } catch (e: any) {
      console.error('Token validation error:', e);
      // Only logout on network errors, not on invalid tokens
      // logout(); // Commented out to prevent automatic logout on network issues
    }
  };

  const refreshUserData = async () => {
    if (token) await validateToken(token);
  };

  // Function to update resume count without full token validation
  const updateResumeCount = async () => {
    if (!user || !user.id) return;
    
    const storeKey = `saved_resumes_${user.id}`;
    const savedResumes: SavedResume[] = JSON.parse(localStorage.getItem(storeKey) || '[]');
    
    setUser(prevUser => {
      if (!prevUser) return null;
      return {
        ...prevUser,
        resumeCount: savedResumes.length
      };
    });
  };

  const loginWithToken = async (newToken: string) => {
    localStorage.setItem(SESSION_KEY, newToken);
    setToken(newToken);
    await validateToken(newToken);
    addNotification("Signed in successfully with Google", "success");
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: name, email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        return { success: false, message: data.message || 'Registration failed' };
      }

      if (!data.token || !data.user) {
        return { success: false, message: 'Invalid server response' };
      }

      localStorage.setItem(SESSION_KEY, data.token);
      setToken(data.token);
      await validateToken(data.token);
      addNotification(`Welcome to ResumeCraft, ${data.user.fullName.split(' ')[0]}!`, "success");
      return { success: true, message: 'Success' };
    } catch (e: any) {
      console.error('Signup error:', e);
      return { success: false, message: e.message || 'Network error. Please try again.' };
    }
  };

  const login = async (email: string, password: string, twoFactorToken?: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, twoFactorOTP: twoFactorToken }) // Changed parameter name to match backend
      });
      
      const data = await res.json();
      
      // Handle 2FA required case (401 status)
      if (data.twoFactorRequired) {
        return { success: false, message: data.message, twoFactorRequired: true };
      }
      
      // Handle other error responses
      if (!res.ok) {
        return { success: false, message: data.message || 'Login failed' };
      }

      if (!data.token) {
        return { success: false, message: 'Invalid server response' };
      }

      localStorage.setItem(SESSION_KEY, data.token);
      setToken(data.token);
      await validateToken(data.token);
      addNotification(`Welcome back, ${data.user.fullName.split(' ')[0]}!`, "success");
      return { success: true, message: 'Success' };
    } catch (e: any) {
      console.error('Login error:', e);
      return { success: false, message: e.message || 'Network error. Please try again.' };
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { success: false, message: 'Not authenticated' };
    
    try {
      const token = localStorage.getItem(SESSION_KEY);
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        addNotification(result.message || 'Failed to update profile', "error");
        return { success: false, message: result.message || 'Failed to update profile' };
      }
      
      // Update user state with server response
      const storeKey = `saved_resumes_${user.id}`;
      const savedResumes: SavedResume[] = JSON.parse(localStorage.getItem(storeKey) || '[]');
      
      // Format the joined date from createdAt
      const joinedDate = new Date(result.createdAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      const normalizedPlan = (result.plan || 'free').toLowerCase();
      const updatedUser = {
        id: result._id,
        name: result.fullName,
        email: result.email,
        username: result.username || '',
        phone: result.phone || '',
        location: result.location || '',
        avatarUrl: result.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${result.fullName.split(' ')[0]}`,
        profileImage: result.profileImage || '', // Add profileImage to user state
        plan: normalizedPlan,
        resumeCount: savedResumes.length,
        lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
        joinedDate: joinedDate,
        bio: result.bio || '',
        twoFactorEnabled: result.twoFactorEnabled || false,
        autoSave: user.autoSave // Preserve autoSave from current user state
      };
      
      setUser(updatedUser);
      
      // Also update local storage for consistency
      const localProfileKey = `user_profile_data_${user.id}`;
      const { plan: _ignoredPlan, ...profileToStore } = updatedUser;
      localStorage.setItem(localProfileKey, JSON.stringify(profileToStore));
      
      addNotification("Profile updated successfully", "success");
      return { success: true, message: 'Profile updated' };
    } catch (error) {
      console.error('Profile update error:', error);
      addNotification("Network error. Please try again.", "error");
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) return { success: false, message: 'Not authenticated' };
    
    try {
      const token = localStorage.getItem(SESSION_KEY);
      const res = await fetch(`${API_URL}/auth/password`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        addNotification(result.message || 'Failed to update password', "error");
        return { success: false, message: result.message || 'Failed to update password' };
      }
      
      addNotification("Password updated successfully", "success");
      return { success: true, message: 'Password updated successfully' };
    } catch (error) {
      console.error('Password update error:', error);
      addNotification("Network error. Please try again.", "error");
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const updatePreferences = async (preferences: { autoSave?: boolean }) => {
    if (!user) return { success: false, message: 'Not authenticated' };
    
    try {
      const token = localStorage.getItem(SESSION_KEY);
      const res = await fetch(`${API_URL}/users/preferences`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(preferences)
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        addNotification(result.message || 'Failed to update preferences', "error");
        return { success: false, message: result.message || 'Failed to update preferences' };
      }
      
      // Update user state with new preferences
      setUser(prevUser => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          autoSave: result.autoSave
        };
      });
      
      addNotification("Preferences updated successfully", "success");
      return { 
        success: true, 
        message: 'Preferences updated successfully',
        autoSave: result.autoSave
      };
    } catch (error) {
      console.error('Preferences update error:', error);
      addNotification("Network error. Please try again.", "error");
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const deleteAccount = async () => {
    if (!user) return { success: false, message: 'Not authenticated' };
    
    try {
      const token = localStorage.getItem(SESSION_KEY);
      const res = await fetch(`${API_URL}/auth/account`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        addNotification(result.message || 'Failed to delete account', "error");
        return { success: false, message: result.message || 'Failed to delete account' };
      }
      
      // Clear local storage
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(`saved_resumes_${user.id}`);
      localStorage.removeItem(`user_profile_data_${user.id}`);
      
      // Clear user state
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear notifications
      clearNotifications();
      
      addNotification("Your account has been deleted successfully", "info");
      return { success: true, message: 'Account deleted successfully' };
    } catch (error) {
      console.error('Account deletion error:', error);
      addNotification("Network error. Please try again.", "error");
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    addNotification("Logged out safely", "info");
  };

  const openLoginModal = (path: string = '/dashboard') => {
    // Parse the path to extract template ID if present
    const urlParams = new URLSearchParams(path.split('?')[1] || '');
    const templateId = urlParams.get('id');
    
    if (templateId) {
      // Store the template ID for post-login redirect
      localStorage.setItem('post_login_redirect_template', templateId);
    }
    
    setLoginRedirectPath(path);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => setIsLoginModalOpen(false);

  // 2FA Methods - Phone OTP based
  const setup2FA = async (phone: string) => {
    if (!user) return { success: false, message: 'Not authenticated' };
    
    try {
      const token = localStorage.getItem(SESSION_KEY);
      const res = await fetch(`${API_URL}/auth/2fa/setup`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ phone })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        return { success: false, message: data.message || 'Failed to setup 2FA' };
      }
      
      return { 
        success: true, 
        phone: data.phone, 
        message: 'OTP sent to your phone' 
      };
    } catch (error) {
      console.error('2FA setup error:', error);
      return { success: false, message: 'Network error' };
    }
  };

  const verify2FA = async (otp: string) => {
    if (!user) return { success: false, message: 'Not authenticated' };
    
    try {
      const authToken = localStorage.getItem(SESSION_KEY);
      const res = await fetch(`${API_URL}/auth/2fa/verify`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ otp })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        return { success: false, message: data.message || 'Failed to verify 2FA' };
      }
      
      // Refresh user data to get updated 2FA status
      await refreshUserData();
      
      return { success: true, message: '2FA enabled successfully' };
    } catch (error) {
      console.error('2FA verification error:', error);
      return { success: false, message: 'Network error' };
    }
  };

  const disable2FA = async (otp: string) => {
    if (!user) return { success: false, message: 'Not authenticated' };
    
    try {
      const authToken = localStorage.getItem(SESSION_KEY);
      const res = await fetch(`${API_URL}/auth/2fa/disable`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ otp })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        return { success: false, message: data.message || 'Failed to disable 2FA' };
      }
      
      // Refresh user data to get updated 2FA status
      await refreshUserData();
      
      return { success: true, message: '2FA disabled successfully' };
    } catch (error) {
      console.error('2FA disable error:', error);
      return { success: false, message: 'Network error' };
    }
  };

  const resend2FAOTP = async () => {
    if (!user) return { success: false, message: 'Not authenticated' };
    
    try {
      const authToken = localStorage.getItem(SESSION_KEY);
      const res = await fetch(`${API_URL}/auth/2fa/resend`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        return { success: false, message: data.message || 'Failed to resend OTP' };
      }
      
      return { success: true, message: 'OTP resent successfully' };
    } catch (error) {
      console.error('2FA resend error:', error);
      return { success: false, message: 'Network error' };
    }
  };

  const loginWith2FA = async (email: string, password: string, otp: string) => {
    return await login(email, password, otp);
  };

  const createCheckoutSession = async (plan: string) => {
    if (!user) return { success: false, message: 'Not authenticated' };
    
    try {
      const token = localStorage.getItem(SESSION_KEY);
      const res = await fetch(`${API_URL}/subscription/checkout`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: user.id, plan })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        return { success: false, message: data.message || 'Failed to create checkout session', error: data.error };
      }
      
      return { success: true, sessionId: data.sessionId, sessionUrl: data.sessionUrl };
    } catch (error: any) {
      console.error('Checkout session creation error:', error);
      return { success: false, message: 'Network error. Please try again.', error: error.message };
    }
  };

  const verifyTemplateAccess = async (templateId: string, action: 'access' | 'editor' | 'download') => {
    if (!user) return { success: false, status: 401, message: 'Not authenticated' };
    
    try {
      const token = localStorage.getItem(SESSION_KEY);
      const res = await fetch(`${API_URL}/templates/${action}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ templateId })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { success: false, status: res.status, message: data.message || 'Access denied' };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Template access check error:', error);
      return { success: false, status: 500, message: 'Network error. Please try again.' };
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      token,
      login,
      loginWithToken,
      signup,
      logout,
      updateProfile,
      updatePassword,
      updatePreferences,
      deleteAccount,
      isLoginModalOpen,
      openLoginModal,
      closeLoginModal,
      loginRedirectPath,
      refreshUserData,
      updateResumeCount,
      setup2FA,
      verify2FA,
      disable2FA,
      resend2FAOTP,
      loginWith2FA,
      createCheckoutSession,
      verifyTemplateAccess
    }}>
      {children}
    </AuthContext.Provider>
  );
};
