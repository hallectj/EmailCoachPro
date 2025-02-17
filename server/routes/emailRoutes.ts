import express from 'express';
import { sendPromotionEmail, sendTestEmail, sendWelcomeEmailController } from '../controllers/emailController';

const router = express.Router();

router.post('/emails/send-test-email', sendTestEmail);
router.post('/emails/send-welcome-email', sendWelcomeEmailController);
router.post('/emails/send-promotion-email', sendPromotionEmail);

export default router;
