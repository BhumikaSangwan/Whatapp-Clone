import express from "express";
import authMiddleware from "../middleware/auth.js";
import { getWhatsAppData } from "../controller/whatsapp.js";

const router = express.Router();

router.get("/", authMiddleware, getWhatsAppData);

export default router;