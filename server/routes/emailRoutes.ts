import express from 'express';
import { sendTestEmail, sendWelcomeEmailController } from '../controllers/emailController';

const router = express.Router();

router.post('/emails/send-test-email', sendTestEmail);
router.post('/emails/send-welcome-email', sendWelcomeEmailController);

export default router;
