import { Request, RequestHandler, Response } from "express";
import { AppDataSource } from "../db";
import { EmailTemplate } from "../models/EmailTemplate";
import { AuthRequest } from "../interfaces";
import { sendEmail } from "../utils/emailService";
import { seedTemplates } from "../utils/seedTemplates";

const TEMPLATE_ACCESS_CONTROL = process.env.TEMPLATES_ACCESS_CONTROL === "true";

export const getEmailTemplates = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const emailTemplateRepository = AppDataSource.getRepository(EmailTemplate);
      
    let templates;
    if (TEMPLATE_ACCESS_CONTROL) {
      // If master switch is ON, return all templates
      templates = await emailTemplateRepository.find();
    } else {
      // Check user role
      const isProUser = req.user?.role === "pro"; // Ensure req.user is populated
      templates = await emailTemplateRepository.find({
        where: isProUser ? {} : { premium: false },
      });
    }
  
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching email templates", error: (error as Error).message });
  }
};

export const createEmailTemplate: RequestHandler = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { name, subject, category, premium, template_data } = req.body;

    const emailTemplateRepository = AppDataSource.getRepository(EmailTemplate);

    const newTemplate = emailTemplateRepository.create({
      name,
      subject,
      category,
      premium,
      template_data,
    });

    await emailTemplateRepository.save(newTemplate);

    res.status(201).json(newTemplate); // Returning Response
  } catch (error) {
    res.status(500).json({ message: "Error creating email template", error: (error as Error).message });
  }
};

export const sendPromotionEmail = async (req: Request, res: Response) => {
  try {
    // Check if any templates exist
    const templateRepository = AppDataSource.getRepository(EmailTemplate);
    const existingTemplates = await templateRepository.find();

    // If no templates are found, seed them
    if (existingTemplates.length === 0) {
      await seedTemplates(); // Run seedTemplate function to populate the templates
      console.log('Templates seeded successfully.');
    }

    // Continue with sending the email logic...
    const { to, subject, htmlContent } = req.body;
    const response = await sendEmail(to, subject, htmlContent); // Assuming sendEmail function is defined
    res.json({
      success: true,
      message: 'Promotion email sent successfully',
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to send promotion email',
    });
  }
};
