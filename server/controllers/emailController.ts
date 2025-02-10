import { Request, Response } from 'express';
import { sendEmail } from '../utils/emailService';
import { sendWelcomeEmail } from '../utils/emailService';

export const sendWelcomeEmailController = async (req: Request, res: Response): Promise<void> => {
    const { to, name } = req.body;
  
    if (!to || !name) {
      res.status(400).json({ error: 'Missing required fields: to, name' });
      return;
    }
  
    try {
      const emailResponse = await sendWelcomeEmail(to, name);
      res.json({ success: true, response: emailResponse });
    } catch (error) {
      console.error('Email sending error:', error);
      res.status(500).json({ error: 'Failed to send welcome email' });
    }
  };


export const sendTestEmail = async (req: Request, res: Response): Promise<void> => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const emailResponse = await sendEmail(to, subject, `<p>${message}</p>`);
    res.json({ success: true, response: emailResponse });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};


