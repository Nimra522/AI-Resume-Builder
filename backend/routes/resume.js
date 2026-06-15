const express = require('express');
const mongoose = require('mongoose');
const Resume = require('../models/Resume');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

const isValidResumeId = (id) => typeof id === 'string' && mongoose.Types.ObjectId.isValid(id);

router.post('/save', authenticateToken, async (req, res) => {
  try {
    const { resumeId, title, data, templateId, atsScore } = req.body;
    const userId = req.user.id;
    const resolvedTemplateId = templateId || 'modern';

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
      'title atsScore lastEdited'
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

    res.json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
