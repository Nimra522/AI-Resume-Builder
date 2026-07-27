const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  console.log('Sending email via Resend:', { to, subject, htmlLength: html?.length });

  const fromAddress = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const fromName = 'ResumeAI';

  const { data, error } = await resend.emails.send({
    from: `"${fromName}" <${fromAddress}>`,
    to,
    subject,
    html
  });

  if (error) {
    console.error('Resend email error:', error);
    throw error;
  }

  console.log('Email sent successfully via Resend:', data?.id);
};

module.exports = { sendEmail };
