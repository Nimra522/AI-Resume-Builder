const nodemailer = require('nodemailer');

// Required environment variables:
// EMAIL_USER=your_gmail_address@gmail.com
// EMAIL_PASS=your_gmail_app_password
// (Gmail app password: https://myaccount.google.com/apppasswords)

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"ResumeAI" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
};

module.exports = { sendEmail };
