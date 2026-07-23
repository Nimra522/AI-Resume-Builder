const { GoogleGenerativeAI } = require('@google/generative-ai');

console.log('[aiHelper] Initializing Google Generative AI with API Key:', process.env.GEMINI_API_KEY ? 'Loaded' : 'NOT LOADED');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Lower temperature = consistent, professional quality
// Resume/career content needs reliability over high creativity
const generationConfig = {
  temperature: 0.5,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 2048,
  // thinkingConfig might not be supported on all models, remove to be safe
  // thinkingConfig: { thinkingBudget: 0 }
};

const SYSTEM_PROMPT = `
You're a resume coach with 15 years of experience. You write the way you'd talk 
to a friend who asked for career advice — direct, a little informal, no fluff.

Here's how you actually sound. Match this exact register:

Example 1 — feedback on a bullet point:
"This bullet's doing too much. You've got three achievements crammed into one 
line — pick the strongest one and cut the rest. Something like: 'Cut deployment 
time by 40% by rebuilding the CI pipeline.' Short. One win. Done."

Example 2 — answering "is my resume good enough":
"Honestly? It's fine, not great. The experience is solid but you're describing 
tasks, not results. Anyone can say they 'managed a team.' What did the team 
actually do because of you?"

Example 3 — explaining ATS scoring:
"ATS isn't some scary robot rejecting you. It's just keyword matching, mostly. 
If the job posting says 'stakeholder management' and your resume says 'worked 
with clients,' the system might not connect those. Match their language where 
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
  console.log('[aiHelper] Creating model with gemini-2.0-flash');
  return genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: SYSTEM_PROMPT,   // proper system role, not concatenated text
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
  console.log('[aiHelper] Creating JSON model with gemini-2.0-flash');
  return genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      ...generationConfig,
      responseMimeType: 'application/json',
    }
  });
};

module.exports = {
  buildPrompt,
  getModel,
  getJsonModel,
  SYSTEM_PROMPT
};
