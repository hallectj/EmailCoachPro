import React from 'react';
import { renderToString } from 'react-dom/server';
import DiscountEmail from '../src/templates/promotional_emails/DiscountOfferEmail'; // Import the React component

interface PromotionEmailProps {
  name: string;
  coach_name: string;
  company: string;
  discount_percentage: number;
  coaching_program: string;
  key_benefits: string[];
  offer_deadline: string;
  cta_button_text: string;
  contact_email: string;
  website_link: string;
  booking_link: string;
  testimonial: string;
  testimonial_name: string;
}

// This function will render the PromotionEmail component into HTML string
export const renderPromotionEmail = async ({
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
}: PromotionEmailProps): Promise<string> => {
  const emailHtml = renderToString(
    React.createElement(DiscountEmail, {
      name: name,
      coach_name: coach_name,
      company: company,
      discount_percentage: discount_percentage,
      coaching_program: coaching_program,
      key_benefits: key_benefits,
      offer_deadline: offer_deadline,
      cta_button_text: cta_button_text,
      contact_email: contact_email,
      website_link: website_link,
      booking_link: booking_link,
      testimonial: testimonial,
      testimonial_name: testimonial_name,
    })
  );

  return emailHtml; // Return the rendered HTML string
};
