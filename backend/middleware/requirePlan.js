/**
 * Middleware to require specific plan access
 * Usage: requirePlan('pro') or requirePlan('premium')
 */
const User = require('../models/User');

const templateAccessMap = {
  modern: 'free',
  professional: 'pro',
  minimalist: 'free',
  executive: 'premium',
  creative: 'pro',
  tech: 'premium',
  academic: 'free',
  compact: 'free',
  elegant: 'free',
  startup: 'pro'
};

const requirePlan = (requiredPlan) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

      // Plan hierarchy: free < pro < premium
      const planHierarchy = {
        'free': 0,
        'pro': 1,
        'premium': 2
      };

      const normalizedUserPlan = (user.plan || 'free').toLowerCase();
      const normalizedRequiredPlan = requiredPlan.toLowerCase();
      const userPlanLevel = planHierarchy[normalizedUserPlan] || 0;
      const requiredPlanLevel = planHierarchy[normalizedRequiredPlan] || 0;

      // Check if user has required plan level or higher
      if (userPlanLevel >= requiredPlanLevel) {
        // Attach user plan info to request for downstream use
        req.userPlan = normalizedUserPlan;
        req.userPlanLevel = userPlanLevel;
        next();
      } else {
        return res.status(403).json({
          success: false,
          message: `Access denied. ${requiredPlan} plan or higher required.`,
          currentPlan: normalizedUserPlan,
          requiredPlan: requiredPlan
        });
      }

    } catch (error) {
      console.error('Error in requirePlan middleware:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };
};

const requireTemplateAccess = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const templateId = req.body.templateId || req.query.templateId || req.params.templateId;
    if (!templateId) {
      return res.status(400).json({
        success: false,
        message: 'Template ID is required'
      });
    }

    const requiredAccess = templateAccessMap[templateId];
    if (!requiredAccess) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    const userPlan = (user.plan || 'free').toLowerCase();
    const planHierarchy = {
      free: 0,
      pro: 1,
      premium: 2
    };
    const userPlanLevel = planHierarchy[userPlan] ?? 0;
    const requiredPlanLevel = planHierarchy[requiredAccess] ?? 0;

    if (userPlanLevel >= requiredPlanLevel) {
      req.userPlan = userPlan;
      req.templateAccess = { templateId, requiredAccess };
      return next();
    }

    return res.status(403).json({
      success: false,
      message: 'Access denied for this template',
      currentPlan: userPlan,
      requiredPlan: requiredAccess
    });
  } catch (error) {
    console.error('Error in requireTemplateAccess middleware:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Pre-defined middlewares for common use cases
const requirePro = requirePlan('pro');
const requirePremium = requirePlan('premium');

module.exports = {
  requirePlan,
  requireTemplateAccess,
  requirePro,
  requirePremium
};
