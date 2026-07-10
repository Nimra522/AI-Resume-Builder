const User = require('../models/User');

// Initialize Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const normalizePlanValue = (value) => {
  if (!value || typeof value !== 'string') return 'Free';

  const trimmedValue = value.trim();
  if (!trimmedValue) return 'Free';

  const lowerValue = trimmedValue.toLowerCase();
  if (lowerValue === 'pro') return 'Pro';
  if (lowerValue === 'premium') return 'Premium';
  if (lowerValue === 'free') return 'Free';

  return 'Free';
};

/**
 * Handle Stripe webhook events
 * POST /api/webhook
 */
const stripeWebhook = async (req, res) => {
  console.log('=== STRIPE WEBHOOK RECEIVED ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Headers:', {
    'stripe-signature': req.headers['stripe-signature'],
    'content-type': req.headers['content-type'],
    'content-length': req.headers['content-length']
  });
  console.log('Raw body length:', req.body?.length || 0);
  
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Log environment variables status
  console.log('Environment check:');
  console.log('- STRIPE_WEBHOOK_SECRET configured:', !!endpointSecret);
  console.log('- STRIPE_WEBHOOK_SECRET length:', endpointSecret?.length || 0);

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log('✅ Webhook signature verified successfully');
    console.log('Event type:', event.type);
    console.log('Event ID:', event.id);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    console.error('Error details:', {
      signature: sig,
      bodySample: req.body?.slice(0, 100) || 'No body',
      secretLength: endpointSecret?.length || 0
    });
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('Processing event:', event.type);
  
  try {
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event);
        break;
        
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event);
        break;
        
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event);
        break;
        
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event);
        break;
        
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event);
        break;
        
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event);
        break;
        
      default:
        console.log(`ℹ️  Unhandled event type: ${event.type}`);
    }
    
    // Send success response
    res.json({ received: true });
    
  } catch (error) {
    console.error('❌ Error processing webhook event:', error);
    res.status(500).json({ 
      error: 'Webhook processing failed',
      details: error.message 
    });
  }
  
  console.log('=== WEBHOOK PROCESSING COMPLETED ===');
};

// Handle successful checkout session
const handleCheckoutSessionCompleted = async (event) => {
  const session = event.data.object;
  console.log('=== PROCESSING CHECKOUT SESSION COMPLETED ===');
  console.log('Session details:', {
    id: session.id,
    customer: session.customer,
    status: session.status,
    metadata: session.metadata
  });

  const userId = session.metadata?.userId;
  const plan = session.metadata?.plan;
  
  if (!userId) {
    console.error('❌ No userId found in session metadata');
    throw new Error('No userId in session metadata');
  }

  const user = await User.findById(userId);
  if (!user) {
    console.error('❌ User not found:', userId);
    throw new Error('User not found');
  }

  console.log('Found user:', {
    email: user.email,
    currentPlan: user.plan,
    userId: user._id
  });

  // Update user with Stripe customer and subscription info
  user.stripeCustomerId = session.customer;
  user.stripeSubscriptionId = session.subscription;
  
  // Set plan based on metadata or price detection
  let assignedPlan = 'Pro'; // Default fallback
  
  if (plan) {
    const normalizedPlan = normalizePlanValue(plan);
    if (['Pro', 'Premium'].includes(normalizedPlan)) {
      assignedPlan = normalizedPlan;
    }
  } else if (session.subscription) {
    // Try to detect plan from subscription items
    try {
      const subscription = await stripe.subscriptions.retrieve(session.subscription);
      const priceId = subscription.items.data[0]?.price?.id;
      
      if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) {
        assignedPlan = 'Premium';
      } else if (priceId === process.env.STRIPE_PRO_PRICE_ID) {
        assignedPlan = 'Pro';
      }
    } catch (error) {
      console.error('Error detecting plan from subscription:', error.message);
    }
  }

  user.plan = normalizePlanValue(assignedPlan);
  user.subscriptionStatus = 'active';
  
  await user.save();
  
  console.log(`✅ User ${userId} upgraded to ${assignedPlan} plan`);
  console.log('Updated user details:', {
    email: user.email,
    newPlan: user.plan,
    stripeCustomerId: user.stripeCustomerId,
    stripeSubscriptionId: user.stripeSubscriptionId
  });
};

// Handle subscription creation
const handleSubscriptionCreated = async (event) => {
  const subscription = event.data.object;
  console.log('=== PROCESSING SUBSCRIPTION CREATED ===');
  console.log('Subscription ID:', subscription.id);
  console.log('Customer ID:', subscription.customer);
  
  // Find user by Stripe customer ID
  const user = await User.findOne({ stripeCustomerId: subscription.customer });
  if (!user) {
    console.error('❌ User not found for customer:', subscription.customer);
    return;
  }

  user.stripeSubscriptionId = subscription.id;
  user.subscriptionStatus = subscription.status;
  await user.save();
  
  console.log(`✅ Subscription created for user ${user.email}`);
};

// Handle subscription updates
const handleSubscriptionUpdated = async (event) => {
  const subscription = event.data.object;
  console.log('=== PROCESSING SUBSCRIPTION UPDATED ===');
  console.log('Subscription ID:', subscription.id);
  console.log('Status:', subscription.status);
  
  const user = await User.findOne({ stripeCustomerId: subscription.customer });
  if (!user) {
    console.error('❌ User not found for customer:', subscription.customer);
    return;
  }

  user.subscriptionStatus = subscription.status;
  
  // If subscription is canceled, downgrade user plan
  if (subscription.status === 'canceled' || subscription.cancel_at_period_end) {
    user.plan = normalizePlanValue('free');
    console.log(`⚠️  User ${user.email} downgraded to Free plan due to subscription cancellation`);
  }
  
  await user.save();
  console.log(`✅ Subscription updated for user ${user.email}: ${subscription.status}`);
};

// Handle subscription deletion
const handleSubscriptionDeleted = async (event) => {
  const subscription = event.data.object;
  console.log('=== PROCESSING SUBSCRIPTION DELETED ===');
  
  const user = await User.findOne({ stripeCustomerId: subscription.customer });
  if (!user) {
    console.error('❌ User not found for customer:', subscription.customer);
    return;
  }

  user.plan = normalizePlanValue('free');
  user.stripeSubscriptionId = '';
  user.subscriptionStatus = '';
  await user.save();
  
  console.log(`✅ User ${user.email} downgraded to Free plan - subscription deleted`);
};

// Handle successful invoice payment
const handleInvoicePaymentSucceeded = async (event) => {
  const invoice = event.data.object;
  console.log('=== PROCESSING INVOICE PAYMENT SUCCEEDED ===');
  console.log('Invoice ID:', invoice.id);
  
  const user = await User.findOne({ stripeCustomerId: invoice.customer });
  if (user) {
    console.log(`✅ Payment succeeded for user ${user.email}`);
  }
};

// Handle failed invoice payment
const handleInvoicePaymentFailed = async (event) => {
  const invoice = event.data.object;
  console.log('=== PROCESSING INVOICE PAYMENT FAILED ===');
  console.log('Invoice ID:', invoice.id);
  
  const user = await User.findOne({ stripeCustomerId: invoice.customer });
  if (user) {
    console.log(`⚠️  Payment failed for user ${user.email}`);
    // Could send notification to user here
  }
};

module.exports = {
  stripeWebhook
};