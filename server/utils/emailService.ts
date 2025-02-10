import { Resend } from 'resend';
import { render } from '@react-email/render';
import React from 'react';
import WelcomeEmail from '../src/templates/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev', // Change this to your verified sender email
      to,
      subject,
      html,
    });

    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

// New function for sending a dynamic welcome email
export const sendWelcomeEmail = async (to: string, name: string) => {
  const emailHtml = await render(React.createElement(WelcomeEmail, { name })); // Render the React component to HTML

  return await sendEmail(to, "Welcome to EmailCoach Pro!", emailHtml); // Send the email via resend
};
