const accessTemplate = (req, res) => {
  const templateId = req.templateAccess?.templateId;
  const requiredAccess = req.templateAccess?.requiredAccess;
  return res.status(200).json({
    success: true,
    templateId,
    requiredAccess
  });
};

const openTemplateEditor = (req, res) => {
  const templateId = req.templateAccess?.templateId;
  return res.status(200).json({
    success: true,
    templateId
  });
};

const verifyTemplateDownload = (req, res) => {
  const templateId = req.templateAccess?.templateId;
  return res.status(200).json({
    success: true,
    templateId
  });
};

module.exports = {
  accessTemplate,
  openTemplateEditor,
  verifyTemplateDownload
};
