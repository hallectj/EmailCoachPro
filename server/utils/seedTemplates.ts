import { AppDataSource } from '../db';
import { EmailTemplate } from '../models/EmailTemplate';

export const seedTemplates = async () => {
    await AppDataSource.initialize();
    const templateRepository = AppDataSource.getRepository(EmailTemplate);
  
    // Define your templates (you can expand this list)
    const templates = [
      {
        name: 'Promotion Email',
        subject: 'Exclusive Offer for You!',
        category: 'Promotion',
        premium: false,
        template_data: { 
          template: 'DiscountOfferEmail',  // The name of the template being used
          fields: [
            'name',                   // The name of the recipient
            'coach_name',             // The name of the coach
            'company',                // The name of the company
            'discount_percentage',    // The discount percentage for the offer
            'coaching_program',       // The name of the coaching program
            'key_benefits',           // The list of key benefits (possibly an array of strings)
            'offer_deadline',         // The deadline for the offer (e.g., "March 1st, 2025")
            'cta_button_text',        // The call-to-action button text (e.g., "Claim Your Spot Now")
            'contact_email',          // The contact email for inquiries
            'website_link',           // The link to the website
            'booking_link',           // The link to book coaching sessions
            'testimonial',            // A testimonial from a past client
            'testimonial_name',       // The name of the person providing the testimonial
          ]  // List of dynamic fields that will be replaced in the template
        },
        createdAt: new Date(),
      },
      // Add more templates as needed
    ];
  
    // Insert templates if they don't already exist
    for (const template of templates) {
      const existingTemplate = await templateRepository.findOne({ 
        where: { name: template.name } 
      });
      if (!existingTemplate) {
        await templateRepository.save(template);
      }
    }
  
    // Close the connection (optional)
    //await AppDataSource.destroy();
};

seedTemplates()
  .then(() => console.log("Seeding completed!"))
  .catch((err) => console.error("Seeding failed:", err));
