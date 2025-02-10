import React from 'react';
import { Html, Head, Preview, Body, Container, Heading, Text } from '@react-email/components';

interface WelcomeEmailProps {
    name: string;
}

const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ name }: WelcomeEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Welcome to EmailCoach Pro!</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={heading}>Welcome to EmailCoach Pro, {name}!</Heading>                    
                    <Text style={paragraph}>Hello {name},</Text>
                    <Text style={paragraph}>We're excited to have you on board. Get started by exploring our email templates!</Text>
                    <Text style={paragraph}>Best regards,<br />The EmailCoach Pro Team</Text>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: '#f6f9fc',
    padding: '20px',
};

const container = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
};

const heading = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '20px',
};

export default WelcomeEmail;