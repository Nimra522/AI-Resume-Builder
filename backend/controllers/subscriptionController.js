const User = require('../models/User');

// Initialize Stripe with secret key
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Create Stripe checkout session for subscription
 * POST /api/subscription/checkout
 */
const createCheckoutSession = async (req, res) => {
  try {
    const { plan } = req.body;
    const userId = req.user.id; // From auth middleware

    // Validate plan
    if (!plan || !['pro', 'premium'].includes(plan)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid plan. Must be "pro" or "premium"' 
      });
    }

    // Validate required environment variables
    const priceId = plan === 'pro' 
      ? process.env.STRIPE_PRO_PRICE_ID 
      : process.env.STRIPE_PREMIUM_PRICE_ID;

    if (!priceId) {
      return res.status(500).json({ 
        success: false, 
        message: `Price ID not configured for ${plan} plan` 
      });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Check if user already has this or higher plan
    if ((plan === 'pro' && user.plan === 'pro') || 
        (plan === 'pro' && user.plan === 'premium') ||
        (plan === 'premium' && user.plan === 'premium')) {
      return res.status(400).json({ 
        success: false, 
        message: `You already have ${user.plan} plan or higher` 
      });
    }

    // Create or get Stripe customer
    let stripeCustomerId = user.stripeCustomerId;
    
    if (!stripeCustomerId) {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.fullName,
        metadata: {
          userId: user._id.toString()
        }
      });
      stripeCustomerId = customer.id;
      
      // Update user with Stripe customer ID
      user.stripeCustomerId = stripeCustomerId;
      await user.save();
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer: stripeCustomerId,
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      success_url: `${process.env.FRONTEND_URL}/#/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/#/pricing`,
      metadata: {
        userId: user._id.toString(),
        plan: plan
      },
      subscription_data: {
        metadata: {
          userId: user._id.toString(),
          plan: plan
        }
      }
    });

    console.log(`✅ Checkout session created for user ${user.email} (${plan} plan): ${session.id}`);

    res.status(200).json({
      success: true,
      sessionId: session.id,
      sessionUrl: session.url
    });

  } catch (error) {
    console.error('❌ Error creating checkout session:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create checkout session',
      error: error.message 
    });
  }
};

/**
 * Get user's subscription status
 * GET /api/subscription/status
 */
const getSubscriptionStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    let subscriptionData = null;
    
    if (user.stripeSubscriptionId) {
      try {
        subscriptionData = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
      } catch (error) {
        console.error('Error retrieving subscription:', error.message);
        // Continue with basic user data if subscription retrieval fails
      }
    }

    res.status(200).json({
      success: true,
      subscription: {
        plan: user.plan,
        stripeCustomerId: user.stripeCustomerId,
        stripeSubscriptionId: user.stripeSubscriptionId,
        subscriptionStatus: user.subscriptionStatus,
        stripeSubscriptionDetails: subscriptionData
      }
    });

  } catch (error) {
    console.error('❌ Error getting subscription status:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve subscription status',
      error: error.message 
    });
  }
};

/**
 * Cancel user's subscription
 * POST /api/subscription/cancel
 */
const cancelSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    if (!user.stripeSubscriptionId) {
      return res.status(400).json({ 
        success: false, 
        message: 'No active subscription found' 
      });
    }

    // Cancel subscription at period end
    const subscription = await stripe.subscriptions.update(
      user.stripeSubscriptionId,
      { cancel_at_period_end: true }
    );

    // Update user's subscription status
    user.subscriptionStatus = subscription.status;
    await user.save();

    console.log(`✅ Subscription canceled for user ${user.email}: ${subscription.id}`);

    res.status(200).json({
      success: true,
      message: 'Subscription will be canceled at the end of the billing period',
      subscription: subscription
    });

  } catch (error) {
    console.error('❌ Error canceling subscription:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to cancel subscription',
      error: error.message 
    });
  }
};

/**
 * Reactivate user's subscription
 * POST /api/subscription/reactivate
 */
const reactivateSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    if (!user.stripeSubscriptionId) {
      return res.status(400).json({ 
        success: false, 
        message: 'No active subscription found' 
      });
    }

    // Reactivate subscription (cancel_at_period_end = false)
    const subscription = await stripe.subscriptions.update(
      user.stripeSubscriptionId,
      { cancel_at_period_end: false }
    );

    // Update user's subscription status
    user.subscriptionStatus = subscription.status;
    await user.save();

    console.log(`✅ Subscription reactivated for user ${user.email}: ${subscription.id}`);

    res.status(200).json({
      success: true,
      message: 'Subscription reactivated successfully',
      subscription: subscription
    });

  } catch (error) {
    console.error('❌ Error reactivating subscription:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to reactivate subscription',
      error: error.message 
    });
  }
};

module.exports = {
  createCheckoutSession,
  getSubscriptionStatus,
  cancelSubscription,
  reactivateSubscription
};
