const express = require('express');
const { accessTemplate, openTemplateEditor, verifyTemplateDownload } = require('../controllers/templatesController');
const authenticateToken = require('../middleware/auth');
const { requireTemplateAccess } = require('../middleware/requirePlan');

const router = express.Router();

router.use(authenticateToken);

router.post('/access', requireTemplateAccess, accessTemplate);
router.post('/editor', requireTemplateAccess, openTemplateEditor);
router.post('/download', requireTemplateAccess, verifyTemplateDownload);

module.exports = router;
