require('dotenv').config();
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const User = require('../models/User');
const Resume = require('../models/Resume');
const twilio = require('twilio');
const crypto = require('crypto');
const { sendEmail } = require('../utils/emailService');
const { validateLocation } = require('../utils/resumeValidation');

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Format phone number to E.164 format (add Pakistan country code if missing)
const formatPhoneNumber = (phone) => {
  // Remove all non-digit characters except +
  let cleanPhone = phone.replace(/[^\d+]/g, '');
  
  // If it starts with 03, assume it's a Pakistani number and add +92
  if (cleanPhone.startsWith('03')) {
    cleanPhone = '+92' + cleanPhone.substring(1);
  }
  // If it starts with 3 (without country code), add +92
  else if (cleanPhone.startsWith('3') && cleanPhone.length === 10) {
    cleanPhone = '+92' + cleanPhone;
  }
  // If it doesn't start with +, assume it's Pakistani and add +92
  else if (!cleanPhone.startsWith('+') && cleanPhone.length === 10) {
    cleanPhone = '+92' + cleanPhone;
  }
  
  return cleanPhone;
};

// Real SMS Service using Twilio
const sendSMS = async (to, message) => {
  // DEMO OTP Mode: log OTP to console instead of sending via Twilio
  if (process.env.DEMO_OTP_MODE === 'true') {
    const otp = message.match(/\d{6}/)?.[0] || 'Unknown';
    console.log('========================================');
    console.log('DEMO OTP MODE ENABLED');
    console.log('Phone:', to);
    console.log('OTP:', otp);
    console.log('Message:', message);
    console.log('Expiry: 10 minutes');
    console.log('========================================');
    return { success: true, demoMode: true };
  }

  try {
    console.log('🔍 sendSMS function called with:', { to, message });
    console.log('🔍 Twilio environment variables status:');
    console.log('   TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID ? '✅ Loaded' : '❌ Missing');
    console.log('   TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN ? '✅ Loaded' : '❌ Missing');
    console.log('   TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER || '❌ Not set');
    
    // Format the phone number
    const formattedTo = formatPhoneNumber(to);
    
    console.log(`📱 Phone number formatting: ${to} → ${formattedTo}`);
    console.log(`📱 Attempting to send SMS to: ${formattedTo}`);
    console.log(`📱 Message content: ${message}`);
    
    console.log('🔍 Calling Twilio client.messages.create()...');
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedTo
    });
    console.log('✅ Twilio API call completed successfully');
    console.log(`✅ SMS sent successfully to ${formattedTo}`);
    console.log(`✅ Message SID: ${result.sid}`);
    console.log(`✅ Message status: ${result.status}`);
    
    return { success: true, sid: result.sid, status: result.status };
  } catch (error) {
    console.error('❌ SMS sending failed with detailed error:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error status:', error.status);
    console.error('Error moreInfo:', error.moreInfo);
    console.error('Error details:', error.details);
    if (error.response) {
      console.error('Error response body:', error.response.body);
    }
    return { success: false, error: error.message, fullError: error };
  }
};

// Generate random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const JWT_SECRET = process.env.JWT_SECRET;

/* =======================
   JWT HELPER
======================= */
// Initialize Google OAuth2 client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.fullName,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

/* =======================
   CONTROLLERS
======================= */

// 1. Get current user
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    
    // Format the response to include all needed fields
    console.log('Sending user data with passwordChangedAt:', user.passwordChangedAt);
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImage: user.profileImage,
      username: user.username || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || '',
      plan: (user.plan || 'free').toLowerCase(),
      twoFactorEnabled: user.twoFactorEnabled || false,
      autoSave: user.autoSave,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      passwordChangedAt: user.passwordChangedAt
    });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// 2. Two-factor authentication controllers
const setup2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { phone } = req.body;
    
    // Validate phone number
    if (!phone || phone.length < 10) {
      return res.status(400).json({ message: 'Valid phone number required (minimum 10 digits)' });
    }
    
    // Format phone number for validation
    const formattedPhone = formatPhoneNumber(phone);
    console.log(`📱 Formatted phone number for validation: ${formattedPhone}`);
    
    // Generate OTP
    const otp = generateOTP();
    
    // Save formatted phone and OTP to user
    user.twoFactorPhone = formattedPhone;
    user.twoFactorOTP = otp;
    user.twoFactorOTPExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.twoFactorEnabled = false; // Not enabled until verified
    user.twoFactorVerified = false;
    await user.save();
    
    console.log('🔍 About to call sendSMS from setup2FA');
    // Send OTP via SMS
    const smsResult = await sendSMS(phone, `Your ResumeBuilder 2FA verification code is: ${otp}. Valid for 10 minutes.`);
    console.log('🔍 sendSMS result:', smsResult);
    
    if (!smsResult.success) {
      console.log('❌ sendSMS failed in setup2FA');
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send SMS. Please try again.' 
      });
    }
    console.log('✅ sendSMS succeeded in setup2FA');
    
    return res.status(200).json({
      success: true,
      message: 'OTP sent to your phone',
      phone: phone.slice(-4) // Return last 4 digits for display
    });
  } catch (error) {
    console.error('2FA setup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const verify2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { otp } = req.body;
    
    if (!user.twoFactorPhone || !user.twoFactorOTP) {
      return res.status(400).json({ message: '2FA not set up' });
    }
    
    // Verify OTP
    if (user.twoFactorOTP !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    // Check if OTP is expired
    if (user.twoFactorOTPExpiry < Date.now()) {
      return res.status(400).json({ message: 'OTP expired' });
    }
    
    // Success - clear OTP and complete 2FA setup
    user.twoFactorEnabled = true;
    user.twoFactorVerified = true;
    user.twoFactorOTP = null; // Clear OTP after successful verification
    user.twoFactorOTPExpiry = null;
    await user.save();
    
    return res.status(200).json({ success: true, message: '2FA enabled successfully' });
  } catch (error) {
    console.error('2FA verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const disable2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { otp } = req.body;
    
    // If 2FA is enabled, require OTP verification
    if (user.twoFactorEnabled) {
      if (!otp) {
        return res.status(400).json({ message: 'OTP required to disable 2FA' });
      }
      
      // Check if OTP is expired
      if (new Date() > user.twoFactorOTPExpiry) {
        return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
      }
      
      // Verify OTP
      if (user.twoFactorOTP !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
    }
    
    // Disable 2FA
    user.twoFactorEnabled = false;
    user.twoFactorVerified = false;
    user.twoFactorPhone = '';
    user.twoFactorOTP = '';
    user.twoFactorOTPExpiry = null;
    await user.save();
    
    return res.status(200).json({ success: true, message: '2FA disabled successfully' });
  } catch (error) {
    console.error('2FA disable error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const resendOTP = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!user.twoFactorPhone) {
      return res.status(400).json({ message: 'No phone number set for 2FA' });
    }
    
    // Rate limiting - 30 second cooldown
    if (user.twoFactorLastResend && 
        new Date() - user.twoFactorLastResend < 30 * 1000) {
      return res.status(429).json({ 
        message: 'Please wait 30 seconds before requesting another OTP' 
      });
    }
    
    // Generate new OTP
    const otp = generateOTP();
    
    user.twoFactorOTP = otp;
    user.twoFactorOTPExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.twoFactorLastResend = new Date(); // Track last resend time
    await user.save();
    
    // Send OTP via SMS
    const smsResult = await sendSMS(user.twoFactorPhone, `Your ResumeBuilder 2FA verification code is: ${otp}. Valid for 10 minutes.`);
    
    if (!smsResult.success) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send SMS. Please try again.' 
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'OTP resent successfully'
    });
  } catch (error) {
    console.error('2FA resend error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 3. Profile controllers
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update allowed fields
    const { name, fullName, username, phone, location, bio, profileImage } = req.body;
    
    if (name || fullName) user.fullName = name || fullName;
    if (username !== undefined) user.username = username;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) {
      const locErr = validateLocation(location);
      if (locErr) {
        return res.status(400).json({ message: locErr });
      }
      user.location = location;
    }
    if (bio !== undefined) user.bio = bio;
    if (profileImage !== undefined) user.profileImage = profileImage; // Add profileImage handling
    
    // Update last login timestamp
    user.lastLogin = new Date();
    
    await user.save();
    
    // Return updated user data
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImage: user.profileImage,
      username: user.username || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || '',
      plan: (user.plan || 'free').toLowerCase(),
      twoFactorEnabled: user.twoFactorEnabled || false,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      passwordChangedAt: user.passwordChangedAt
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 4. Password controllers
const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { currentPassword, newPassword } = req.body;
    
    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Validate new password length
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    
    // Update password and record change timestamp
    user.passwordHash = newPasswordHash;
    user.passwordChangedAt = new Date();
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 5. Preferences controllers
const updatePreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { autoSave } = req.body;
    
    // Update preferences
    if (autoSave !== undefined) {
      user.autoSave = autoSave;
    }
    
    await user.save();
    
    res.json({ 
      message: 'Preferences updated successfully',
      autoSave: user.autoSave
    });
  } catch (error) {
    console.error('Preferences update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 6. Account controllers
const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete all related resumes
    await Resume.deleteMany({ user: user._id });
    
    // Delete the user document
    await User.findByIdAndDelete(user._id);
    
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Account deletion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 7. Authentication controllers (no token required)
const login = async (req, res) => {
  try {
    const { email, password, twoFactorOTP } = req.body;
    const normalizedEmail = (email || '').trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user || user.authProvider !== 'email') {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check 2FA
    if (user.twoFactorEnabled && user.twoFactorVerified) {

      // First login attempt - send OTP
      if (!twoFactorOTP) {

        const otp = generateOTP();

        user.twoFactorOTP = otp;
        user.twoFactorOTPExpiry = Date.now() + 10 * 60 * 1000;

        await user.save();

        const smsResult = await sendSMS(
          user.twoFactorPhone,
          `Your ResumeBuilder login code is: ${otp}. Valid for 10 minutes.`
        );

        if (!smsResult.success) {
          return res.status(500).json({
            message: 'Failed to send 2FA code. Please try again.'
          });
        }

        return res.status(401).json({
          message: '2FA required',
          twoFactorRequired: true,
          phone: user.twoFactorPhone.slice(-4)
        });
      }


      // Verify entered OTP
      if (user.twoFactorOTP !== twoFactorOTP) {
        return res.status(400).json({
          message: 'Invalid OTP'
        });
      }


      // Check expiry
      if (user.twoFactorOTPExpiry < Date.now()) {
        return res.status(400).json({
          message: 'OTP expired'
        });
      }


      // Clear OTP
      user.twoFactorOTP = null;
      user.twoFactorOTPExpiry = null;
    }


    // Update login time
    user.lastLogin = new Date();

    await user.save();


    const token = generateToken(user);

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
        twoFactorEnabled: user.twoFactorEnabled || false
      }
    });


  } catch (error) {

    console.error('Login error:', error);

    return res.status(500).json({
      message: 'Server error'
    });

  }
};

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  const normalizedEmail = (email || '').trim().toLowerCase();

  // Server-side validation for name
  // Validate name format: only letters and spaces, no numbers or special characters
  if (!fullName || typeof fullName !== 'string') {
    return res.status(400).json({ message: 'Name is required' });
  }
  
  const nameRegex = /^[A-Za-z][A-Za-z\s]{0,48}[A-Za-z]$|^[A-Za-z]+$/;
  if (!nameRegex.test(fullName.trim())) {
    return res.status(400).json({ message: 'Name must contain only letters and spaces, and cannot start or end with a space' });
  }
  
  if (fullName.trim().length < 2 || fullName.trim().length > 50) {
    return res.status(400).json({ message: 'Name must be between 2 and 50 characters' });
  }

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser)
    return res.status(400).json({ message: 'User already exists' });

  // Validate password length
  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    fullName,
    email: normalizedEmail,
    passwordHash,
    authProvider: 'email',
  });

  await user.save();

  const token = generateToken(user);
  res.status(201).json({ 
    token, 
    user: { 
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImage: user.profileImage,
      passwordChangedAt: user.passwordChangedAt
    } 
  });
};

const googleLoginStart = (req, res) => {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `${process.env.BACKEND_URL || 'https://ai-resume-builder-production-25cb.up.railway.app'}/api/auth/google/callback`;
  
  // Generate a random state parameter for CSRF protection
  const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  // Store the state in the session for validation in the callback
  req.session.googleOAuthState = state;
  req.session.googleOAuthStateTimestamp = Date.now();
  
  console.log('Generated OAuth state:', state);
  console.log('Session after storing state:', req.session);
  
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    redirect_uri: GOOGLE_REDIRECT_URI,
    client_id: GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    state: state,  // Add state parameter for CSRF protection
  };

  const qs = new URLSearchParams(options);
  const redirectUrl = `${rootUrl}?${qs.toString()}`;
  console.log('Redirecting to Google OAuth:', redirectUrl);
  res.redirect(redirectUrl);
};

const googleCallback = async (req, res) => {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `${process.env.BACKEND_URL || 'https://ai-resume-builder-production-25cb.up.railway.app'}/api/auth/google/callback`;
  const FRONTEND_URL = process.env.FRONTEND_URL || 'https://resumecraft-taupe.vercel.app';
  
  const code = req.query.code;
  const receivedState = req.query.state; // Get the state parameter from Google callback

  console.log('Google callback received:', { code: !!code, state: receivedState });
  console.log('Session data:', req.session);

  // Validate the state parameter to prevent CSRF attacks
  const storedState = req.session.googleOAuthState;
  const stateTimestamp = req.session.googleOAuthStateTimestamp;

  console.log('State validation:', { storedState, receivedState, stateTimestamp });

  // Clear the stored state immediately to prevent replay attacks
  delete req.session.googleOAuthState;
  delete req.session.googleOAuthStateTimestamp;

  // Check if state exists and hasn't expired (10 minute limit)
  if (!storedState || !receivedState || storedState !== receivedState) {
    console.error('Invalid or missing state parameter for Google OAuth');
    console.error('Expected:', storedState, 'Received:', receivedState);
    return res.redirect(`${FRONTEND_URL}/login?error=csrf_detected`);
  }

  // Check if state has expired (more than 10 minutes old)
  if (stateTimestamp && (Date.now() - stateTimestamp) > 10 * 60 * 1000) { // 10 minutes
    console.error('Expired state parameter for Google OAuth');
    return res.redirect(`${FRONTEND_URL}/login?error=state_expired`);
  }

  if (!code) {
    return res.redirect(`${FRONTEND_URL}/login?error=no_code`);
  }

  try {
    // Exchange code for token
    const tokenRes = await fetch(
      'https://oauth2.googleapis.com/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: GOOGLE_REDIRECT_URI,
          grant_type: 'authorization_code',
        }),
      }
    );

    const tokenData = await tokenRes.json();
    console.log('Token exchange result:', { hasIdToken: !!tokenData.id_token, hasAccessToken: !!tokenData.access_token });

    if (!tokenData.id_token) {
      console.error('No ID token received from Google');
      return res.redirect(`${FRONTEND_URL}/login?error=invalid_token`);
    }

    // Verify the ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: tokenData.id_token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const googleUserId = payload['sub'];
    const email = (payload['email'] || '').trim().toLowerCase();
    const emailVerified = payload['email_verified'];

    console.log('Google user data:', { email, emailVerified, name: payload['name'] });

    // Validate the token claims
    if (!emailVerified) {
      console.error('Email not verified by Google');
      return res.redirect(`${FRONTEND_URL}/login?error=email_not_verified`);
    }

    // Check if the issuer is valid
    const iss = payload['iss'];
    if (iss !== 'https://accounts.google.com' && iss !== 'accounts.google.com') {
      console.error('Invalid token issuer:', iss);
      return res.redirect(`${FRONTEND_URL}/login?error=invalid_issuer`);
    }

    // Check if the audience matches our client ID
    const aud = payload['aud'];
    if (aud !== GOOGLE_CLIENT_ID) {
      console.error('Invalid token audience:', aud);
      return res.redirect(`${FRONTEND_URL}/login?error=invalid_audience`);
    }

    // Check if the token is expired (this is also checked internally by google-auth-library)
    const exp = payload['exp'];
    const now = Math.floor(Date.now() / 1000);
    if (exp < now) {
      console.error('ID token has expired');
      return res.redirect(`${FRONTEND_URL}/login?error=token_expired`);
    }

    // Find or create user based on Google email
    let user = await User.findOne({ email: email });

    if (!user) {
      // Create new user
      user = new User({
        fullName: payload['name'] || email.split('@')[0], // Use name from Google or email prefix
        email: email,
        profileImage: payload['picture'],
        authProvider: 'google',
        googleId: googleUserId,
        isEmailVerified: true,
        passwordChangedAt: null // Google users don't have traditional passwords
      });
      console.log('Created new user:', user.email);
    } else {
      // Existing user - check if they have a local account
      if (user.authProvider === 'email') {
        // Link Google account to existing local account
        user.authProvider = 'google';
        user.googleId = googleUserId;
        user.isEmailVerified = true;
        console.log('Linked Google account to existing user:', user.email);
      }
      // Update profile info
      user.fullName = payload['name'] || user.fullName;
      user.profileImage = payload['picture'];
      user.lastLogin = new Date();
      console.log('Updated existing user:', user.email);
    }

    await user.save();

    const token = generateToken(user);
    console.log('Generated JWT token for user:', user.email);
    
    // Secure redirect to frontend with token
    const redirectUrl = `${FRONTEND_URL}/auth/google/callback?token=${encodeURIComponent(token)}`;
    console.log('Redirecting to:', redirectUrl);
    return res.redirect(redirectUrl);
  } catch (err) {
    console.error('Google Auth Error:', err);
    
    // More specific error handling
    let errorParam = 'auth_failed';
    if (err.message && err.message.includes('invalid_grant')) {
      errorParam = 'invalid_grant';
    } else if (err.message && err.message.includes('ID token has expired')) {
      errorParam = 'token_expired';
    } else if (err.message && err.message.includes('Wrong audience')) {
      errorParam = 'invalid_audience';
    } else if (err.message && err.message.includes('Wrong issuer')) {
      errorParam = 'invalid_issuer';
    }
    
    // Redirect to frontend with error
    return res.redirect(`${FRONTEND_URL}/login?error=${errorParam}`);
  }
};

/* =======================
   STRIPE PAYMENT CONTROLLER
======================= */
const createCheckoutSession = async (req, res) => {
  try {
    // Validate Stripe secret key
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ 
        message: 'Payment configuration error: Missing Stripe secret key',
        error: 'STRIPE_SECRET_KEY not configured' 
      });
    }

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
    const { userId, plan } = req.body;
    
    // Validate required fields
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: plan || 'Premium Plan',
            description: 'ResumeCraft Premium Subscription'
          },
          unit_amount: plan === 'premium' ? 2000 : 1200, // $20 for premium, $12 for pro (in cents)
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'https://resumecraft-taupe.vercel.app'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'https://resumecraft-taupe.vercel.app'}/pricing`,
      metadata: {
        userId: userId,
        plan: plan  // Include the plan information in metadata
      },
    });

    console.log('Stripe session created successfully:', session.id);
    console.log('Full session object:', JSON.stringify(session, null, 2));
    console.log('Success URL being sent to Stripe:', `${process.env.FRONTEND_URL || 'https://resumecraft-taupe.vercel.app'}/payment-success?session_id={CHECKOUT_SESSION_ID}`);
    console.log('Cancel URL being sent to Stripe:', `${process.env.FRONTEND_URL || 'https://resumecraft-taupe.vercel.app'}/pricing`);
    console.log('Frontend URL from env:', process.env.FRONTEND_URL);
    
    res.json({ sessionId: session.id, sessionUrl: session.url });
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    // Check if it's a Stripe-specific error
    if (error.type === 'StripeCardError') {
      res.status(400).json({ message: `Payment failed: ${error.message}` });
    } else if (error.type === 'StripeInvalidRequestError') {
      res.status(400).json({ message: `Invalid request: ${error.message}` });
    } else if (!process.env.STRIPE_SECRET_KEY) {
      res.status(500).json({ message: 'Payment configuration error: Missing Stripe secret key' });
    } else {
      res.status(500).json({ 
        message: 'Payment processing failed', 
        error: error.message,
        stripeError: error.type
      });
    }
  }
};

// Password reset controllers
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Still return 200 OK for security (don't reveal email exists)
      return res.json({ message: 'Password reset instructions sent to your email' });
    }
    
    // Check if user is a Google user (no password)
    if (user.authProvider === 'google') {
      return res.status(400).json({ 
        message: 'Google account users cannot reset passwords. Please use Google sign-in.' 
      });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    // Set token and expiration (1 hour)
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
    await user.save();
    
    // Construct reset URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
    
    console.log('Password reset requested for:', email);
    console.log('Reset URL:', resetUrl);
    
    // Send password reset email (wrapped in try/catch for security)
    try {
      await sendEmail({
        to: user.email,
        subject: 'Reset your ResumeAI password',
        html: `<p>Hi ${user.name || 'User'},</p>
               <p>Click the link below to reset your password. This link expires in 1 hour.</p>
               <p><a href="${resetUrl}">Reset Password</a></p>
               <p>If you didn't request this, you can safely ignore this email.</p>`
      });
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      // Don't reveal email sending failure to user for security
    }
    
    // Always return generic success message for security
    res.json({ 
      message: 'Password reset instructions sent to your email'
    });
    
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // Hash the token to match the stored hash
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
    
    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    
    // Validate new password
    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    
    // Set new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = newPasswordHash;
    user.passwordChangedAt = new Date();
    
    // Clear reset token fields
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    
    await user.save();
    
    res.json({ message: 'Password reset successful' });
    
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCurrentUser,
  setup2FA,
  verify2FA,
  disable2FA,
  resendOTP,
  updateProfile,
  updatePassword,
  updatePreferences,
  deleteAccount,
  login,
  signup,
  googleLoginStart,
  googleCallback,
  forgotPassword,
  resetPassword
};