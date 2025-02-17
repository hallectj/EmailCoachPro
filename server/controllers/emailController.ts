import { Request, Response } from 'express';
import { sendEmail } from '../utils/emailService';
import { AppDataSource } from '../db'; // Adjust the path as necessary
import { sendWelcomeEmail } from '../utils/emailService';
import { EmailTemplate } from '../models/EmailTemplate';
import { renderPromotionEmail } from '../utils/renderPromotionEmail';

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


export const sendPromotionEmail = async (req: Request, res: Response): Promise<any> => {
  try {

    // Ensure the database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const {
      templateId,
      recipient_email,
      name,
      coach_name,
      company,
      discount_percentage,
      coaching_program,
      key_benefits,
      offer_deadline,
      cta_button_text,
      contact_email,
      website_link,
      booking_link,
      testimonial,
      testimonial_name
    } = req.body;

    // Find the template by its ID
    const templateRepository = AppDataSource.getRepository(EmailTemplate);
    const template = await templateRepository.findOneBy({ id: templateId });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found',
      });
    }

    // Render the dynamic email HTML content using the template and passed data
    const emailHtml = await renderPromotionEmail({
      name,
      coach_name,
      company,
      discount_percentage,
      coaching_program,
      key_benefits,
      offer_deadline,
      cta_button_text,
      contact_email,
      website_link,
      booking_link,
      testimonial,
      testimonial_name,
    });

    // Send the email using the render function
    const response = await sendEmail(recipient_email, template.subject, emailHtml);
    return res.json({
      success: true,
      message: 'Promotion email sent successfully',
      data: response,
    });
  } catch (error) {
    console.error('Error sending promotion email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send promotion email',
    });
  }
};