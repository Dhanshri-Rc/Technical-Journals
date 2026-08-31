const nodemailer = require("nodemailer");
const env = require("../config/env");

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!env.smtp.host || !env.smtp.user) {
    console.warn("[mailer] SMTP not configured — emails will be skipped. Set SMTP_* in .env");
    return null;
  }
  transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: { user: env.smtp.user, pass: env.smtp.pass },
  });
  return transporter;
}

async function sendMail({ to, subject, html, text }) {
  const t = getTransporter();
  if (!t) return { skipped: true };
  try {
    const info = await t.sendMail({ from: env.smtp.from, to, subject, html, text });
    return { skipped: false, messageId: info.messageId };
  } catch (err) {
    // Never throw — a failed email must not roll back an already-saved DB record.
    console.error("[mailer] Failed to send email:", err.message);
    return { skipped: false, error: err.message };
  }
}

async function sendContactNotification(enquiry) {
  const html = `
    <h2>New Contact Enquiry</h2>
    <p><strong>Name:</strong> ${enquiry.name}</p>
    <p><strong>Email:</strong> ${enquiry.email}</p>
    <p><strong>Subject:</strong> ${enquiry.subject}</p>
    <p><strong>Message:</strong></p>
    <p>${enquiry.message.replace(/\n/g, "<br/>")}</p>
    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
  `;
  return sendMail({
    to: env.smtp.receiver || env.smtp.user,
    subject: `New Enquiry: ${enquiry.subject}`,
    html,
  });
}

async function sendContactAcknowledgement(enquiry) {
  const html = `
    <p>Hi ${enquiry.name},</p>
    <p>Thank you for contacting Technical Journals. We have received your message and our team will respond shortly.</p>
    <p><em>Your message:</em> ${enquiry.message.replace(/\n/g, "<br/>")}</p>
  `;
  return sendMail({
    to: enquiry.email,
    subject: "We received your message — Technical Journals",
    html,
  });
}

module.exports = { sendMail, sendContactNotification, sendContactAcknowledgement };
