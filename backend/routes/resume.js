const express = require('express');
const mongoose = require('mongoose');
const Resume = require('../models/Resume');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');
const { validateResumeBeforeSave } = require('../utils/resumeValidation');
const { canUserAccessTemplate } = require('../utils/templateAccess');
const router = express.Router();

const isValidResumeId = (id) => typeof id === 'string' && mongoose.Types.ObjectId.isValid(id);

router.post('/save', authenticateToken, async (req, res) => {
  try {
    const { resumeId, title, data, templateId, atsScore, thumbnail } = req.body;
    
    // Validate required title
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Resume title is required' });
    }

    // Validate resume data
    if (!data) {
      return res.status(400).json({ message: 'Resume data is required' });
    }
    const { isValid } = validateResumeBeforeSave(data);
    if (!isValid) {
      return res.status(400).json({ message: 'Please fix the errors in your resume before saving' });
    }
    
    const userId = req.user.id;
    const user = await User.findById(userId);
    const resolvedTemplateId = templateId || 'modern';

    // Check template access before saving
    if (!canUserAccessTemplate(user?.plan, resolvedTemplateId)) {
      return res.status(403).json({ message: 'You do not have access to this template' });
    }

    const updateData = {
      user: userId,
      title,
      data,
      templateId: resolvedTemplateId,
      lastEdited: Date.now()
    };

    if (atsScore !== undefined) {
      updateData.atsScore = atsScore;
    }

    if (thumbnail !== undefined) {
      updateData.thumbnail = thumbnail;
    }

    let resume;

    if (resumeId) {
      if (!isValidResumeId(resumeId)) {
        return res.status(400).json({ message: 'Invalid resume id' });
      }

      resume = await Resume.findOneAndUpdate(
        { _id: resumeId, user: userId },
        updateData,
        { new: true, upsert: true }
      );
    } else {
      resume = new Resume(updateData);
      await resume.save();
    }

    res.json(resume);
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/all', authenticateToken, async (req, res) => {
  try {
    const resumes = await Resume.find(
      { user: req.user.id },
      'title atsScore lastEdited data templateId thumbnail'
    ).sort({ lastEdited: -1 });

    res.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    if (!isValidResumeId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid resume id' });
    }

    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    if (!isValidResumeId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid resume id' });
    }

    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check template access before returning resume data
    const user = await User.findById(req.user.id);
    if (!canUserAccessTemplate(user?.plan, resume.templateId)) {
      return res.status(403).json({ message: 'You do not have access to this resume' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
