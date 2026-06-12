
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileInfoCard } from '../components/profile/ProfileInfoCard';
import { QuickActions } from '../components/profile/QuickActions';
import { User, Shield, CreditCard, Save, X, Phone, MapPin, AtSign, AlignLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DetailedUserProfile } from '../data/mockProfile';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const UserProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Local form state
  const [editData, setEditData] = useState({
    name: '',
    username: '',
    phone: '',
    location: '',
    bio: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      setEditData({
        name: user.name,
        username: user.username || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  if (!user) return null;

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateProfile({
      name: editData.name,
      username: editData.username,
      phone: editData.phone,
      location: editData.location,
      bio: editData.bio
    });
    
    if (result.success) {
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      username: user.username || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || ''
    });
    setIsEditing(false);
  };

  // Convert Auth User to Detailed Profile for UI
  const detailedUser: DetailedUserProfile = {
    // Use user data as primary source, with fallbacks for missing fields
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username || 'Not set',
    phone: user.phone || 'Not provided',
    location: user.location || 'Not specified',
    bio: user.bio || '',
    joinedDate: user.joinedDate || 'Unknown',
    avatarUrl: user.avatarUrl || '',
    plan: user.plan || 'Free',
    accountStatus: 'Active',
    resumeCount: user.resumeCount || 0,
    lastLogin: user.lastLogin || 'Recent',
    twoFactorEnabled: user.twoFactorEnabled || false,
    passwordLastChanged: user.passwordLastChanged || 'Not available',
  } as DetailedUserProfile;

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)]">
        
        {/* Header */}
        <ProfileHeader 
          user={detailedUser} 
          isEditing={isEditing} 
          onEditToggle={() => isEditing ? handleCancel() : setIsEditing(true)} 
        />

        {/* Personal Information and Quick Actions side-by-side on large screens, stacked on small screens */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left Column: Info Cards / Form */}
          <div className="flex-1 space-y-6">
            
            {isEditing ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
                      <User size={18} />
                    </div>
                    <h3 className="font-bold text-text-main">Edit Personal Details</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleCancel} disabled={isSaving}>
                      <X size={16} className="mr-1" /> Discard
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleSave} isLoading={isSaving}>
                      <Save size={16} className="mr-1" /> Save Changes
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Full Name" 
                      icon={User} 
                      value={editData.name} 
                      onChange={(e) => setEditData({...editData, name: e.target.value})} 
                    />
                    <Input 
                      label="Username" 
                      icon={AtSign} 
                      value={editData.username} 
                      onChange={(e) => setEditData({...editData, username: e.target.value})} 
                      placeholder="alex_dev"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Email Address (Read-only)" 
                      value={user.email} 
                      disabled 
                      className="opacity-60 cursor-not-allowed"
                    />
                    <Input 
                      label="Phone Number" 
                      icon={Phone} 
                      value={editData.phone} 
                      onChange={(e) => setEditData({...editData, phone: e.target.value})} 
                    />
                  </div>
                  
                  <Input 
                    label="Location" 
                    icon={MapPin} 
                    value={editData.location} 
                    onChange={(e) => setEditData({...editData, location: e.target.value})} 
                  />
                  
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-text-main flex items-center gap-2">
                      <AlignLeft size={16} className="text-text-muted" /> Short Bio / Summary
                    </label>
                    <textarea 
                      className="w-full h-32 p-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none text-sm transition-all"
                      value={editData.bio}
                      onChange={(e) => setEditData({...editData, bio: e.target.value})}
                      placeholder="Tell us a bit about your professional background..."
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Personal Information */}
                <ProfileInfoCard 
                  title="Personal Information" 
                  icon={User}
                  delay="0.1s"
                  items={[
                    { label: 'Full Name', value: detailedUser.name },
                    { label: 'Username', value: detailedUser.username ? `@${detailedUser.username}` : 'Not set' },
                    { label: 'Email Address', value: detailedUser.email },
                    { label: 'Phone', value: detailedUser.phone },
                    { label: 'Location', value: detailedUser.location },
                    { label: 'Joined Date', value: detailedUser.joinedDate },
                  ]}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Account Info */}
                  <ProfileInfoCard 
                    title="Account Status" 
                    icon={CreditCard}
                    delay="0.2s"
                    items={[
                      { label: 'Current Plan', value: <span className="text-primary font-bold">{detailedUser.plan}</span> },
                      { label: 'Status', value: <span className="text-green-600">Active</span> },
                      { label: 'Saved Resumes', value: detailedUser.resumeCount },
                      { label: 'Last Login', value: detailedUser.lastLogin },
                    ]}
                  />

                  {/* Security Info */}
                  <ProfileInfoCard 
                    title="Security" 
                    icon={Shield}
                    delay="0.25s"
                    items={[
                      { 
                        label: 'Two-Factor Auth', 
                        value: detailedUser.twoFactorEnabled ? 
                          <span className="text-green-600">Enabled</span> : 
                          <span className="text-text-muted">Disabled</span> 
                      },
                      { label: 'Password Changed', value: detailedUser.passwordLastChanged },
                    ]}
                  />
                </div>
              </>
            )}

          </div>

          {/* Right Column: Quick Actions - Adjusted width for better balance */}
          <div className="lg:w-72 flex-shrink-0">
             <QuickActions />
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};
