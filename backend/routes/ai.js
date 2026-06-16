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

module.exports = router;
