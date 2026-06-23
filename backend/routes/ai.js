const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

router.post('/generate', authenticateToken, async (req, res) => {
  try {
    const { jobTitle, company, industry, yearsExp } = req.body;
    
    const prompt = `Write 4 powerful resume bullet points for a ${jobTitle} at ${company} in ${industry} with ${yearsExp} years experience. Use action verbs. Return only 4 bullet points, one per line.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ bulletPoints: text.trim().split('\n').filter(line => line.trim()) });
  } catch (error) {
    console.error('Error generating bullet points:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// New: Generate Professional Summary
router.post('/generate-summary', authenticateToken, async (req, res) => {
  try {
    const { experience, education, skills, objective, jobTitle } = req.body;
    
    const prompt = `Generate a professional resume summary (3-4 sentences, ~100 words) for a ${jobTitle || 'professional'}. Use this context:
    EXPERIENCE: ${JSON.stringify(experience)}
    EDUCATION: ${JSON.stringify(education)}
    SKILLS: ${skills.join(', ')}
    OBJECTIVE: ${objective || 'Not specified'}
    Return only the summary text, no additional formatting.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ summary: text.trim() });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ message: 'Error generating summary' });
  }
});

// New: Generate Experience Description
router.post('/generate-experience', authenticateToken, async (req, res) => {
  try {
    const { role, company } = req.body;
    
    const prompt = `Generate 4-5 strong resume bullet points for ${role} at ${company}. Use action verbs, quantify achievements where possible. Return bullet points starting with •, one per line. Don't include any other text.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ description: text.trim() });
  } catch (error) {
    console.error('Error generating experience description:', error);
    res.status(500).json({ message: 'Error generating description' });
  }
});

// New: Suggest Skills
router.post('/suggest-skills', authenticateToken, async (req, res) => {
  try {
    const { experience, education, existingSkills } = req.body;
    
    const prompt = `Suggest 10-15 relevant skills for this professional based on:
    EXPERIENCE: ${JSON.stringify(experience)}
    EDUCATION: ${JSON.stringify(education)}
    EXISTING SKILLS: ${existingSkills.join(', ')}
    Return only comma-separated list of skills, no numbering or bullet points.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ 
      skills: text.split(',').map(s => s.trim()).filter(s => s.length > 0) 
    });
  } catch (error) {
    console.error('Error suggesting skills:', error);
    res.status(500).json({ message: 'Error suggesting skills' });
  }
});

// New: Improve Writing/Grammar
router.post('/improve-writing', authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;
    
    const prompt = `Improve this text for a professional resume: "${text}". Make it concise, professional, grammatically perfect. Return only the improved text, no extra text.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const improvedText = response.text();
    
    res.json({ improvedText: improvedText.trim(), originalText: text });
  } catch (error) {
    console.error('Error improving text:', error);
    res.status(500).json({ message: 'Error improving text' });
  }
});

router.post('/ats-score', authenticateToken, async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    
    const prompt = `Compare this resume to job description. Return ONLY valid JSON no markdown no backticks: {score: number 0-100, matched: [keywords], missing: [keywords], tip: string} RESUME: ${resumeText} JOB DESCRIPTION: ${jobDescription}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    text = text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(text);
    
    res.json(data);
  } catch (error) {
    console.error('Error calculating ATS score:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/interview', authenticateToken, async (req, res) => {
  try {
    const { resumeText, jobTitle } = req.body;
    
    const prompt = `Generate 5 interview questions for ${jobTitle} based on this resume. Return ONLY valid JSON no markdown: {questions: [{question: string, modelAnswer: string, tip: string}]} RESUME: ${resumeText}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    text = text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(text);
    
    res.json(data);
  } catch (error) {
    console.error('Error generating interview questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Chat endpoint for the floating chat widget
router.post('/chat', authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;
    console.log('Incoming chat message:', message);

    const systemPrompt = `You are an AI Resume Assistant for ResumeCraft, a professional resume builder platform.

Your job is to help users:
- Write and improve resume summaries, skills, experience bullet points
- Suggest better phrasing for their job descriptions
- Fix formatting and grammar in resume content
- Recommend relevant skills for specific job roles
- Guide them on how to use ResumeCraft features (create resume, pick templates, edit sections)

How to use ResumeCraft:
1. Click "Create Your First Resume" on the Dashboard
2. Choose a template from Recommended Templates
3. Fill in your personal info, work experience, education, and skills
4. Download or share your finished resume

Always give specific, helpful answers. Never say "can you share more details?" unless you truly need more info. If the user asks a general question, answer it directly and helpfully.`;

    const fullPrompt = `${systemPrompt}\n\nUSER MESSAGE: ${message}\n\nYOUR RESPONSE:`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    console.log('Gemini response:', text);
    
    res.json({ reply: text.trim() });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ 
      message: 'Sorry, I\'m having trouble responding right now. Please try again.' 
    });
  }
});

module.exports = router;