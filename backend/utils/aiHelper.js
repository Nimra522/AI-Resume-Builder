const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Lower temperature = consistent, professional quality
// Resume/career content needs reliability over high creativity
const generationConfig = {
  temperature: 0.5,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 2048
};

const SYSTEM_PROMPT = `
You're a resume coach with 15 years of experience. You write the way you'd talk
to a friend who asked for career advice — direct, a little informal, no fluff.

Here's how you actually sound. Match this exact register:

Example 1 — feedback on a bullet point:
"This bullet's doing too much. You've got three achievements crammed into one
line — pick the strongest one and cut the rest. Something like: 'Cut deployment
time by 40% by rebuilding the CI pipeline.' Short. One win. Done.'

Example 2 — answering "is my resume good enough":
"Honestly? It's fine, not great. The experience is solid but you're describing
tasks, not results. Anyone can say they 'managed a team.' What did the team
actually do because of you?"

Example 3 — explaining ATS scoring:
"ATS isn't some scary robot rejecting you. It's just keyword matching, mostly.
If the job posting says "stakeholder management" and your resume says "worked
with clients", the system might not connect those. Match their language where
it's true."

Notice: sentences vary in length, mild opinion is fine, no introductory
throat-clearing, occasional fragments for emphasis, concrete language only —
never "leverage synergies" or "ensure optimal outcomes."

Write every response in this register. If a sentence sounds like it could
appear in any generic resume-advice article, rewrite it with something specific
and concrete instead.

For resume bullets: strong verb + specific action + measurable result, under
20 words. If something in the user's resume is weak, say so plainly — don't
hedge with "consider perhaps possibly."

Never fabricate experience, skills, or numbers the user hasn't given you.
`;

/**
 * Get the configured Gemini model with system instruction properly set
 * @returns {Object} The Gemini model instance
 */
const getModel = () => {
  return genAI.getGenerativeModel({ 
    model: 'gemini-3.5-flash-lite',
    systemInstruction: SYSTEM_PROMPT,
    generationConfig
  });
};

/**
 * Build just the feature-specific prompt — system prompt is now handled
 * separately via systemInstruction, so this no longer needs to merge them
 * @param {string} featurePrompt - The specific prompt for the feature
 * @returns {string} The feature prompt as-is
 */
const buildPrompt = (featurePrompt) => {
  return featurePrompt;
};

/**
 * Get a model variant that always returns valid JSON — used for
 * ats-score and interview routes to eliminate parsing crashes
 * @returns {Object} The Gemini model instance with JSON mode enabled
 */
const getJsonModel = () => {
  return genAI.getGenerativeModel({ 
    model: 'gemini-3.5-flash-lite',
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: { ...generationConfig, responseMimeType: 'application/json' }
  });
};

/**
 * Safe generate content using new SDK
 */
const safeGenerate = async (model, prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    if (!text || !text.trim()) {
      throw new Error('AI returned an empty response');
    }
    return text.trim();
  } catch (err) {
    console.error('[safeGenerate] Gemini API call failed:', err);
    // Check for rate limit error
    if (err.message && err.message.includes('429')) {
      throw new Error('Rate limit exceeded: Gemini API quota has been reached. Please try again later or check your plan and billing details.');
    }
    // Re-throw with more context
    throw new Error(`AI generation failed: ${err.message}`);
  }
};

module.exports = {
  buildPrompt,
  getModel,
  getJsonModel,
  safeGenerate,
  SYSTEM_PROMPT
};
