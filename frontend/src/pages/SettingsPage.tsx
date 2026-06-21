
import React, { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ToggleSwitch } from '../components/ui/ToggleSwitch';
import { Toast, ToastType } from '../components/ui/Toast';
import { DeleteAccountModal } from '../components/profile/DeleteAccountModal';
import { Camera, User, Lock, Palette, ShieldAlert, ShieldCheck, Save, X, Loader2, UserCircle, Phone, Mail, Bell, Monitor, CreditCard, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../components/layout/Navbar';
import { useNotifications } from '../context/NotificationContext';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile, updatePassword, deleteAccount, setup2FA, verify2FA, disable2FA, resend2FAOTP } = useAuth();
  const { navigate } = useLocation();
  const { addNotification } = useNotifications();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // --- Toast State ---
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: ToastType }>({
    visible: false,
    message: '',
    type: 'success'
  });

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ visible: true, message, type });
  };

  // Handle profile image upload
  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      addNotification("Please select a valid image (JPG, PNG, or WEBP)", "error");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      addNotification("Image size must be less than 5MB", "error");
      return;
    }

    // Process Image
    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      
      // Update profile with new image
      const result = await updateProfile({ profileImage: base64String });
      
      if (result.success) {
        addNotification("Profile picture updated successfully", "success");
      } else {
        addNotification(result.message || "Failed to update profile picture", "error");
      }
      
      setIsUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.onerror = () => {
      addNotification("Failed to read image file", "error");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // Handle profile image removal
  const handleRemoveProfileImage = async () => {
    if (!user) return;
    
    setIsRemoving(true);
    
    // Remove profile image by setting it to empty string
    const result = await updateProfile({ profileImage: '' });
    
    if (result.success) {
      addNotification("Profile picture removed successfully", "success");
    } else {
      addNotification(result.message || "Failed to remove profile picture", "error");
    }
    
    setIsRemoving(false);
  };

  // --- Profile State ---
  const [profile, setProfile] = useState({
    fullName: 'Alex Jordan',
    username: 'alexjordan_dev',
    email: 'alex.jordan@example.com'
  });

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.name,
        username: user.username || '',
        email: user.email
      });
    }
  }, [user]);

  // --- Account State ---
  const [account, setAccount] = useState({
    phone: '',
    twoFactor: false
  });

  // Load user account data on mount
  useEffect(() => {
    if (user) {
      setAccount({
        phone: user.phone || '',
        twoFactor: user.twoFactorEnabled || false
      });
      
    }
  }, [user]);

  // --- Password State ---
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // --- Loading States ---
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUpdating2FA, setIsUpdating2FA] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- Handlers ---

  const handleProfileSave = async () => {
    setIsSavingProfile(true);
    const result = await updateProfile({
      name: profile.fullName,
      username: profile.username
    });
    
    if (result.success) {
      showToast('Profile updated successfully');
    } else {
      showToast(result.message, 'error');
    }
    setIsSavingProfile(false);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      showToast('New passwords do not match', 'error');
      return;
    }
    if (password.new.length < 8) {
        showToast('Password must be at least 8 characters', 'error');
        return;
    }
    if (!password.current) {
      showToast('Current password is required', 'error');
      return;
    }

    setIsChangingPassword(true);
    
    const result = await updatePassword(password.current, password.new);
    
    if (result.success) {
      setPassword({ current: '', new: '', confirm: '' });
      showToast('Password changed successfully');
    } else {
      showToast(result.message, 'error');
    }
    
    setIsChangingPassword(false);
  };

  const handle2FAUpdate = async (enabled: boolean) => {
    if (!user) return;
    
    setIsUpdating2FA(true);
    
    if (enabled) {
      // Enable 2FA - call the setup API to send OTP to phone
      const phone = user.phone || '';
      
      if (!phone) {
        showToast('Please add a phone number first in Account Settings', 'error');
        setAccount(prev => ({ ...prev, twoFactor: false }));
        setIsUpdating2FA(false);
        return;
      }
      
      const result = await setup2FA(phone);
      
      if (result.success) {
        // Show OTP verification modal
        setTwoFASetupData({
          phone: phone,
          show: true
        });
        showToast('OTP sent to your phone ending in ' + result.phone, 'success');
      } else {
        showToast(result.message || 'Failed to setup 2FA', 'error');
        setAccount(prev => ({ ...prev, twoFactor: false }));
      }
    } else {
      // Disable 2FA - require current 2FA code
      if (user.twoFactorEnabled) {
        setTwoFADisableData({ show: true });
      } else {
        setAccount(prev => ({ ...prev, twoFactor: false }));
        showToast('2FA is already disabled', 'error');
      }
    }
    
    setIsUpdating2FA(false);
  };

  // 2FA Setup State - Phone OTP
  const [twoFASetupData, setTwoFASetupData] = useState({
    phone: '',
    show: false
  });
  const [twoFAVerifyCode, setTwoFAVerifyCode] = useState('');
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);
  const [twoFADisableData, setTwoFADisableData] = useState({ show: false });
  const [twoFADisableCode, setTwoFADisableCode] = useState('');
  const [isDisabling2FA, setIsDisabling2FA] = useState(false);

  // Handle 2FA verification
  const handle2FAVerify = async () => {
    if (!twoFAVerifyCode || twoFAVerifyCode.length < 6) {
      showToast('Please enter a valid 6-digit code', 'error');
      return;
    }
    
    setIsVerifying2FA(true);
    const result = await verify2FA(twoFAVerifyCode);
    
    if (result.success) {
      showToast('2FA enabled successfully!', 'success');
      setTwoFASetupData({ phone: '', show: false });
      setTwoFAVerifyCode('');
      // Refresh account state
      setAccount(prev => ({ ...prev, twoFactor: true }));
    } else {
      showToast(result.message || 'Invalid verification code', 'error');
    }
    
    setIsVerifying2FA(false);
  };

  // Handle 2FA disable
  const handle2FADisable = async () => {
    if (!twoFADisableCode || twoFADisableCode.length < 6) {
      showToast('Please enter a valid 6-digit code', 'error');
      return;
    }
    
    setIsDisabling2FA(true);
    const result = await disable2FA(twoFADisableCode);
    
    if (result.success) {
      showToast('2FA disabled successfully!', 'success');
      setTwoFADisableData({ show: false });
      setTwoFADisableCode('');
      // Refresh account state
      setAccount(prev => ({ ...prev, twoFactor: false }));
    } else {
      showToast(result.message || 'Invalid verification code', 'error');
    }
    
    setIsDisabling2FA(false);
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    const result = await deleteAccount();
    if (result.success) {
      setIsDeleting(false);
      setShowDeleteModal(false);
      navigate('/');
    } else {
      showToast(result.message, 'error');
      setIsDeleting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)]">
        
        {/* Page Header */}
        <div className="mb-8">
           <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
           <p className="text-gray-500 text-sm">Manage your account settings, preferences, and security.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN (Profile & Account) --- */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Profile Information */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <UserCircle size={24} className="text-indigo-600" />
                  <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
               </div>

               <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                  <div className="relative group">
                     <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-100 overflow-hidden">
                        {isUploading ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                          </div>
                        ) : (
                          <img 
                            src={user?.profileImage ? user.profileImage : user?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name?.split(' ')[0] || 'User'}`} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        )}
                     </div>
                     <button 
                       onClick={() => fileInputRef.current?.click()}
                       disabled={isUploading || isRemoving}
                       className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-gray-100 disabled:opacity-50"
                       title="Change Profile Picture"
                     >
                       <Camera size={16} />
                     </button>
                  </div>
                  <div className="flex-1">
                     <h4 className="font-semibold text-gray-900 mb-1">Profile Photo</h4>
                     <p className="text-xs text-gray-500 mb-2">
                       {user?.profileImage ? 'Click to change your profile photo' : 'Add a photo to personalize your account'}
                     </p>
                     <div className="flex gap-2">
                        <button 
                          onClick={() => fileInputRef.current?.click()} 
                          disabled={isUploading || isRemoving}
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors disabled:opacity-50"
                        >
                          Change
                        </button>
                        {user?.profileImage && (
                          <>
                            <span className="text-gray-300">|</span>
                            <button 
                              onClick={handleRemoveProfileImage} 
                              disabled={isUploading || isRemoving}
                              className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 flex items-center gap-1"
                            >
                              {isRemoving ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />}
                              Remove
                            </button>
                          </>
                        )}
                     </div>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    disabled={isUploading || isRemoving}
                  />
               </div>
               
               <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-800">Full Name</label>
                      <Input 
                        value={profile.fullName} 
                        onChange={e => setProfile({...profile, fullName: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-800">Username</label>
                      <Input 
                        value={profile.username} 
                        onChange={e => setProfile({...profile, username: e.target.value})} 
                        placeholder="@username"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-800">Email Address</label>
                    <div className="flex items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm">
                       {profile.email}
                       <span className="ml-auto text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-700 font-semibold">Verified</span>
                    </div>
                    <p className="text-xs text-gray-400">To change your email, please contact support.</p>
                  </div>
               </div>

               <div className="mt-8 pt-5 border-t border-gray-100 flex justify-end">
                 <Button onClick={handleProfileSave} isLoading={isSavingProfile} icon={<Save size={16}/>} className="shadow-sm">
                    Save Changes
                 </Button>
               </div>
            </div>

            {/* 2. Account Settings */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <Phone size={24} className="text-indigo-600" />
                  <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
               </div>

               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-800">Phone Number</label>
                    <Input 
                      value={account.phone} 
                      onChange={e => setAccount({...account, phone: e.target.value})} 
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  
                  <div className="border-t border-gray-100 pt-6">
                     <ToggleSwitch 
                       label="Two-Factor Authentication" 
                       description="Add an extra layer of security to your account."
                       checked={account.twoFactor} 
                       onChange={handle2FAUpdate}
                       disabled={isUpdating2FA}
                     />
                  </div>
               </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN (Password, Notifications, Danger) --- */}
          <div className="space-y-6">
             
             {/* Change Password */}
             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <Lock size={24} className="text-indigo-600" />
                  <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
                </div>

                <form onSubmit={handlePasswordUpdate} className="space-y-5">
                   <Input 
                     label="Current Password" 
                     type="password"
                     value={password.current}
                     onChange={e => setPassword({...password, current: e.target.value})}
                   />
                   <div className="grid grid-cols-1 gap-5">
                      <Input 
                        label="New Password" 
                        type="password"
                        value={password.new}
                        onChange={e => setPassword({...password, new: e.target.value})}
                      />
                      <Input 
                        label="Confirm New Password" 
                        type="password"
                        value={password.confirm}
                        onChange={e => setPassword({...password, confirm: e.target.value})}
                        error={password.confirm && password.new !== password.confirm ? "Passwords do not match" : undefined}
                      />
                   </div>
                   {/* Password Strength */}
                   {password.new && (
                     <div className="space-y-2 pt-1">
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                           <div 
                             className={`h-full transition-all duration-300 ${
                               password.new.length < 6 ? 'w-1/3 bg-red-500' : 
                               password.new.length < 10 ? 'w-2/3 bg-yellow-500' : 'w-full bg-green-500'
                             }`} 
                           />
                        </div>
                        <p className="text-xs text-gray-500 text-right font-medium">
                          {password.new.length < 6 ? 'Weak' : password.new.length < 10 ? 'Medium' : 'Strong'}
                        </p>
                     </div>
                   )}

                   <div className="pt-4">
                     <Button type="submit" isLoading={isChangingPassword} variant="outline" className="w-full shadow-sm">Update Password</Button>
                   </div>
                </form>
             </div>

             {/* Notifications */}
             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <Bell size={24} className="text-indigo-600" />
                  <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                </div>

                <div className="space-y-5">
                   <ToggleSwitch 
                     label="Email Notifications" 
                     description="Receive updates via email about your account and activity."
                     checked={true} 
                     onChange={() => {}}
                   />
                   <ToggleSwitch 
                     label="Marketing Emails" 
                     description="Get the latest tips, tutorials, and offers."
                     checked={false} 
                     onChange={() => {}}
                   />
                </div>
             </div>

             {/* Danger Zone */}
             <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldAlert size={24} className="text-red-500" />
                  <h2 className="text-xl font-bold text-gray-900">Danger Zone</h2>
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Permanently delete your account and all of your content. This action is not reversible, so please continue with caution.
                </p>
                <div className="flex justify-start">
                  <Button 
                    variant="outline" 
                    className="border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300 shadow-sm"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Account
                  </Button>
                </div>
             </div>

          </div>
        </div>

        {/* --- Modals & Overlays --- */}
        <Toast 
          message={toast.message} 
          type={toast.type} 
          isVisible={toast.visible} 
          onClose={() => setToast({...toast, visible: false})} 
        />
        
        {showDeleteModal && (
          <DeleteAccountModal 
            isDeleting={isDeleting}
            onConfirm={handleDeleteAccount}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}

        {/* 2FA Setup Modal */}
        {twoFASetupData.show && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in">
              <div className="text-center mb-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full flex items-center justify-center mb-6 border border-indigo-100">
                  <ShieldCheck className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Setup Two-Factor Authentication</h3>
                <p className="text-gray-500 mt-3">Enter the 6-digit code sent to your phone</p>
              </div>
              
              <div className="mb-8 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl text-center border border-indigo-100">
                <p className="text-sm text-gray-600 mb-2">OTP sent to:</p>
                <p className="font-bold text-gray-900 text-lg">***-***-{twoFASetupData.phone?.slice(-4)}</p>
              </div>
              
              <div className="space-y-6">
                <Input
                  label="Verification Code"
                  placeholder="Enter 6-digit OTP"
                  value={twoFAVerifyCode}
                  onChange={(e) => setTwoFAVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                />
                
                <div className="flex gap-4 pt-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setTwoFASetupData({ phone: '', show: false });
                      setTwoFAVerifyCode('');
                      setAccount(prev => ({ ...prev, twoFactor: false }));
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    className="flex-1 shadow-sm"
                    onClick={handle2FAVerify}
                    isLoading={isVerifying2FA}
                  >
                    Verify & Enable
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2FA Disable Modal */}
        {twoFADisableData.show && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in">
              <div className="text-center mb-8">
                <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 border border-red-100">
                  <ShieldAlert className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Disable Two-Factor Authentication</h3>
                <p className="text-gray-500 mt-3">Enter your current 2FA code to disable</p>
              </div>
              
              <div className="space-y-6">
                <Input
                  label="Current 2FA Code"
                  placeholder="Enter 6-digit code from your app"
                  value={twoFADisableCode}
                  onChange={(e) => setTwoFADisableCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                />
                
                <div className="flex gap-4 pt-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setTwoFADisableData({ show: false });
                      setTwoFADisableCode('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50 shadow-sm"
                    onClick={handle2FADisable}
                    isLoading={isDisabling2FA}
                  >
                    Disable 2FA
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};
