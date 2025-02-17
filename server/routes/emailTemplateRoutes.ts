import express from "express";
import { createEmailTemplate } from "../controllers/emailTemplateController";

const router = express.Router();

router.post("/email-templates", createEmailTemplate);

export default router;
