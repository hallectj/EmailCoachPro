import React from 'react';
import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Text,
    Link,
    Heading,
    Row,
    Column,
    Hr,
  } from '@react-email/components';
  
  interface CoachingEmailProps {
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
  
  const DiscountOfferEmail = ({
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
  }: CoachingEmailProps) => (
    <Html>
      <Head />
      <Preview>{`Your exclusive ${discount_percentage}% discount – Act fast before it’s gone!`}</Preview>
      
      <Body style={main}>
        <Container style={container}>
          {/* Header Section */}
          <Section style={header}>
            <Heading as="h1" style={logo}>{company}</Heading>
            <Text style={headerText}>Exclusive Offer prepared for {name}</Text>
            <Text style={greeting}>From {coach_name}</Text>
          </Section>
          
          {/* Core Offer Section */}
          <Section style={offerCard}>
            <Text style={offerPercentage}>🔥 {discount_percentage}% OFF</Text>
            <Text style={programName}>{coaching_program} Program</Text>
            <Text style={deadlineText}><strong>Offer expires {offer_deadline} – Limited spots available!</strong></Text>
          </Section>
  
          {/* Benefits Section */}
          <Section style={benefitsSection}>
            <Heading as="h2" style={sectionHeading}>What You'll Gain:</Heading>
            {key_benefits.map((benefit, index) => (
              <Row key={index} style={benefitRow}>
                <Column width="10%">✅</Column>
                <Column width="90%">
                  <Text style={benefitText}>{benefit}</Text>
                </Column>
              </Row>
            ))}
          </Section>
  
          {/* Testimonial Section */}
          <Section style={testimonialSection}>
            <Text style={testimonialText}>"{testimonial}"</Text>
            <Text style={testimonialName}>- {testimonial_name}</Text>
          </Section>
  
          {/* CTA Section */}
          <Section style={ctaSection}>
            <Link
              href={booking_link}
              style={ctaButton}
            >
              {cta_button_text}
            </Link>
            <Text style={ctaSubtext}>Spots are filling fast – Secure yours today!</Text>
          </Section>
  
          {/* Closing Section */}
          <Section style={closingSection}>
            <Text style={signature}>{coach_name}</Text>
            <Text style={companyName}>{company} Coaching</Text>
            <Row>
              <Column>
                <Link href={`mailto:${contact_email}`} style={contactLink}>📧 {contact_email}</Link>
              </Column>
              <Column>
                <Link href={website_link} style={contactLink}>🌐 {website_link}</Link>
              </Column>
            </Row>
          </Section>
  
          <Hr style={divider} />
          
          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Sent with care to {name} • Not interested? 
              <Link href="{{unsubscribe_link}}" style={unsubscribeLink}> Unsubscribe</Link>
            </Text>
            <Text style={psText}>P.S. This is a limited-time opportunity – Don’t miss out!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );


  const main = {
    backgroundColor: '#f7fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
  };
  
  const container = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  };
  
  const header = {
    backgroundColor: '#2d3748',
    color: 'white',
    textAlign: 'center' as const,
    borderRadius: '8px 8px 0 0',
  };
  
  const logo = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };
  
  const headerText = {
    fontSize: '18px',
    opacity: 0.9,
  };
  
  const greeting = {
    fontSize: '18px',
    lineHeight: '1.5',
    margin: '30px 0',
  };
  
  const offerCard = {
    backgroundColor: '#f56565',
    color: 'white',
    padding: '30px',
    borderRadius: '8px',
    textAlign: 'center' as const,
    margin: '20px 0',
  };
  
  const offerPercentage = {
    fontSize: '42px',
    fontWeight: 'bold',
    margin: '0',
  };
  
  const programName = {
    fontSize: '24px',
    margin: '10px 0',
  };
  
  const deadlineText = {
    fontSize: '16px',
    opacity: 0.9,
  };
  
  const benefitsSection = {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    margin: '20px 0',
  };
  
  const sectionHeading = {
    fontSize: '20px',
    color: '#2d3748',
    marginBottom: '20px',
  };
  
  const benefitRow = {
    marginBottom: '15px',
  };
  
  const benefitText = {
    fontSize: '16px',
    color: '#4a5568',
    margin: '0',
  };
  
  const testimonialSection = {
    backgroundColor: '#e2e8f0',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center' as const,
    margin: '20px 0',
  };
  
  const testimonialText = {
    fontStyle: 'italic',
    fontSize: '16px',
    color: '#2d3748',
  };
  
  const testimonialName = {
    fontSize: '14px',
    color: '#718096',
    marginTop: '10px',
  };
  
  const ctaSection = {
    textAlign: 'center' as const,
    margin: '30px 0',
  };
  
  const ctaButton = {
    backgroundColor: '#38a169',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'inline-block',
    fontSize: '18px',
  };
  
  const ctaSubtext = {
    fontSize: '14px',
    color: '#718096',
    marginTop: '10px',
  };
  
  const closingSection = {
    textAlign: 'center' as const,
    margin: '30px 0',
  };
  
  const signature = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0',
  };
  
  const companyName = {
    fontSize: '16px',
    color: '#718096',
    margin: '5px 0 15px',
  };
  
  const contactLink = {
    color: '#4299e1',
    textDecoration: 'none',
    fontSize: '14px',
  };
  
  const divider = {
    borderColor: '#e2e8f0',
    margin: '30px 0',
  };
  
  const footer = {
    textAlign: 'center' as const,
  };
  
  const footerText = {
    fontSize: '12px',
    color: '#718096',
  };
  
  const unsubscribeLink = {
    color: '#718096',
    textDecoration: 'underline',
  };
  
  const psText = {
    fontSize: '14px',
    color: '#4a5568',
    marginTop: '20px',
  };
  
  export default DiscountOfferEmail;
  