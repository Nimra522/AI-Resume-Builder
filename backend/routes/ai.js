const express = require('express');
const authenticateToken = require('../middleware/auth');
const { buildPrompt, getModel, getJsonModel, safeGenerate } = require('../utils/aiHelper');
const router = express.Router();

// Generate Bullet Points
router.post('/generate', authenticateToken, async (req, res) => {
  try {
    const { jobTitle, company, industry, yearsExp } = req.body;

    if (!jobTitle || !company) {
      return res.status(400).json({ message: 'jobTitle and company are required' });
    }

    const model = getModel();
    const featurePrompt = `Write 4 powerful, achievement-focused resume bullet points for a ${jobTitle} at ${company} in ${industry || 'this field'} with ${yearsExp || 'some'} years experience.
    Use strong action verbs and make it sound realistic. Return only 4 bullet points, one per line.`;

    const text = await safeGenerate(model, buildPrompt(featurePrompt));
    res.json({ bulletPoints: text.split('\n').filter(line => line.trim()) });
  } catch (error) {
    console.error('[generate] Error generating bullet points:', error);
    res.status(500).json({ message: 'Failed to generate bullet points', error: error.message });
  }
});

// Generate Professional Summary
router.post('/generate-summary', authenticateToken, async (req, res) => {
  try {
    const { jobTitle, experience, education, skills, objective } = req.body;

    if (!jobTitle) {
      return res.status(400).json({ message: 'jobTitle is required' });
    }

    const model = getModel();

    // Build context from actual resume data
    let contextParts = [];
    if (experience && experience.length > 0) {
      const expLines = experience.map(e =>
        `- ${e.role || 'Role'} at ${e.company || 'Company'}`
      );
      contextParts.push(`Experience:\n${expLines.join('\n')}`);
    }
    if (education && education.length > 0) {
      const eduLines = education.map(e =>
        `- ${e.degree || 'Degree'} in ${e.fieldOfStudy || e.field || ''} from ${e.school || 'School'}`
      );
      contextParts.push(`Education:\n${eduLines.join('\n')}`);
    }
    if (skills && skills.length > 0) {
      contextParts.push(`Skills: ${skills.join(', ')}`);
    }
    const contextStr = contextParts.length > 0 ? `\n\nUser's actual background:\n${contextParts.join('\n')}` : '';

    let featurePrompt = `Write a professional resume summary (3-4 sentences, ~80-100 words) for a ${jobTitle}.${contextStr} Base the summary on the actual experience, education, and skills listed above — do not invent a specific company, named achievements, or fabricated metrics that aren't listed.`;

    // Add explicit output format instructions
    featurePrompt += `

OUTPUT FORMAT RULES:
- Return ONLY the summary text. No introduction, no explanation, no meta-commentary about what you're doing.
- Do not say things like "here's how I'd put it" or "okay, so you need".
- Start directly with the summary content itself.`;

    let text = await safeGenerate(model, buildPrompt(featurePrompt));

    // Server-side safety cleanup
    text = text.trim();
    
    // Check for conversational starters and clean them
    const conversationalStarters = ['Okay', 'Sure', 'Here', 'Alright', 'So'];
    for (const starter of conversationalStarters) {
      if (text.startsWith(starter)) {
        const colonIndex = text.indexOf(':');
        if (colonIndex !== -1) {
          text = text.substring(colonIndex + 1).trim();
        }
        break;
      }
    }

    res.json({ summary: text });
  } catch (error) {
    console.error('[generate-summary] Error generating summary:', error);
    res.status(500).json({ message: 'Failed to generate summary', error: error.message });
  }
});

// Generate Experience Description
router.post('/generate-experience', authenticateToken, async (req, res) => {
  try {
    const { role, company, keywords } = req.body;

    if (!role || !company) {
      return res.status(400).json({ message: 'role and company are required' });
    }

    const model = getModel();
    let featurePrompt;

    if (keywords && keywords.trim()) {
      featurePrompt = `The user did these things: '${keywords}'. Expand these into 4-5 proper resume bullet points for a ${role} at ${company}. Do not add achievements beyond what's listed. Use strong action verbs.`;
    } else {
      featurePrompt = `Write 4-5 generic but realistic resume bullet points for a ${role} at ${company}. Do not invent specific projects, named products, or fabricated metrics. Use placeholders like '[X]%' where a number would normally go, or omit numbers entirely.`;
    }

    // Add explicit output format instructions with example
    featurePrompt += `

OUTPUT FORMAT RULES:
- Return ONLY the bullet points. No introduction, no explanation, no closing remarks.
- Do not say things like "here are some bullets" or "remember to customize these".
- Each bullet must be on its own separate line, starting with "• ".
- Do not number them.
- Do not add any text before the first bullet or after the last one.

CORRECT OUTPUT EXAMPLE:
• Led cross-functional team initiatives
• Streamlined operational processes
• Improved customer satisfaction metrics`;

    let text = await safeGenerate(model, buildPrompt(featurePrompt));

    // Server-side safety filter: keep only lines starting with "•"
    text = text.split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('•'))
      .join('\n');

    res.json({ description: text });
  } catch (error) {
    console.error('[generate-experience] Error generating experience description:', error);
    res.status(500).json({ message: 'Failed to generate description', error: error.message });
  }
});

// Suggest Skills
router.post('/suggest-skills', authenticateToken, async (req, res) => {
  try {
    const { jobTitle, existingSkills = [] } = req.body;

    if (!jobTitle) {
      return res.status(400).json({ message: 'jobTitle is required' });
    }

    const model = getModel();
    const existingSkillsText = existingSkills.length > 0 ? `Do not repeat these already-listed skills: ${existingSkills.join(', ')}` : '';
    const featurePrompt = `Suggest 10-12 skills relevant to a ${jobTitle} role. ${existingSkillsText} Return common technical and soft skills expected for this role, comma-separated, no numbering.`;

    const text = await safeGenerate(model, buildPrompt(featurePrompt));
    res.json({
      skills: text.split(',').map(s => s.trim()).filter(s => s.length > 0)
    });
  } catch (error) {
    console.error('[suggest-skills] Error suggesting skills:', error);
    res.status(500).json({ message: 'Failed to suggest skills', error: error.message });
  }
});

// Improve Writing/Grammar
router.post('/improve-writing', authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'text is required' });
    }

    const model = getModel();
    const featurePrompt = `Improve this text for a professional resume: "${text}".
    Make it more concise, professional, and grammatically correct while keeping the original meaning.
    Use strong action verbs where appropriate. Return only the improved text, no extra explanation.`;

    const improvedText = await safeGenerate(model, buildPrompt(featurePrompt));
    res.json({ improvedText, originalText: text });
  } catch (error) {
    console.error('[improve-writing] Error improving text:', error);
    res.status(500).json({ message: 'Failed to improve text', error: error.message });
  }
});

// ATS Score — uses JSON mode
router.post('/ats-score', authenticateToken, async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ message: 'resumeText and jobDescription are required' });
    }

    const jsonModel = getJsonModel();
    const featurePrompt = `Compare this resume to the job description. Return JSON with this exact shape:
    {
      "score": number 0-100,
      "matched": [array of keywords found in both],
      "missing": [array of important keywords from job description missing in resume],
      "tip": string (a practical, actionable tip for improvement)
    }

    RESUME: ${resumeText}
    JOB DESCRIPTION: ${jobDescription}`;

    const text = await safeGenerate(jsonModel, featurePrompt);
    // Clean any markdown code fences if present
    const cleanText = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    const data = JSON.parse(cleanText);
    res.json(data);
  } catch (error) {
    console.error('[ats-score] Error calculating ATS score:', error);
    res.status(500).json({ message: 'Failed to calculate ATS score', error: error.message });
  }
});

// Interview Questions — uses JSON mode
router.post('/interview', authenticateToken, async (req, res) => {
  try {
    const { resumeText, jobTitle } = req.body;

    if (!resumeText || !jobTitle) {
      return res.status(400).json({ message: 'resumeText and jobTitle are required' });
    }

    const jsonModel = getJsonModel();
    const featurePrompt = `Generate 5 thoughtful interview questions for a ${jobTitle} role based on this resume.
    Return JSON with this exact shape:
    {
      "questions": [
        {
          "question": string,
          "modelAnswer": string (a strong sample answer),
          "tip": string (a practical tip for answering this question)
        }
      ]
    }

    RESUME: ${resumeText}`;

    const text = await safeGenerate(jsonModel, featurePrompt);
    // Clean any markdown code fences if present
    const cleanText = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    const data = JSON.parse(cleanText);
    res.json(data);
  } catch (error) {
    console.error('[interview] Error generating interview questions:', error);
    res.status(500).json({ message: 'Failed to generate interview questions', error: error.message });
  }
});

// AI Chatbot for Resume Help
router.post('/chat', authenticateToken, async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'message is required' });
    }

    const model = getModel();
    const conversationContext = history
      .map(msg => `${msg.sender === 'user' ? 'User' : 'You'}: ${msg.text}`)
      .join('\n');

    const featurePrompt = `${conversationContext}\n\nUser: ${message}\n\nYou:`;
    const aiResponse = await safeGenerate(model, buildPrompt(featurePrompt));

    res.json({ response: aiResponse });
  } catch (error) {
    console.error('[chat] Error with chatbot:', error);
    res.status(500).json({ message: 'Failed to get chatbot response', error: error.message });
  }
});

module.exports = router;
