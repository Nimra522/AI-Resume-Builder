const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
    validate: {
      validator: function(v) {
        // Regex to match only letters and spaces, not starting or ending with space
        return /^([a-zA-Z]+\s?[a-zA-Z]*)*$/.test(v) && !/^[\s].*|.*[\s]$/.test(v);
      },
      message: 'Name must contain only letters and spaces, and cannot start or end with a space'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    // Password is only required for local email users
    required: function() { return this.authProvider === 'email'; }
  },
  profileImage: {
    type: String,
    default: ''
  },
  authProvider: {
    type: String,
    enum: ['email', 'google'],
    default: 'email'
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorPhone: {
    type: String,
    default: ''
  },
  twoFactorOTP: {
    type: String,
    default: ''
  },
  twoFactorOTPExpiry: {
    type: Date,
    default: null
  },
  twoFactorVerified: {
    type: Boolean,
    default: false
  },
  twoFactorLastResend: {
    type: Date,
    default: null
  },
  phone: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  plan: {
    type: String,
    enum: ['Free', 'Pro', 'Premium'],
    default: 'Free'
  },
  stripeCustomerId: {
    type: String,
    default: ''
  },
  stripeSubscriptionId: {
    type: String,
    default: ''
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid', 'inactive'],
    default: 'inactive'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  autoSave: {
    type: Boolean,
    default: true
  },
  passwordChangedAt: {
    type: Date,
    default: null
  },
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  }

});

module.exports = mongoose.model('User', UserSchema);