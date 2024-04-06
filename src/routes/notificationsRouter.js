import { Router } from "express";
import notificationController from "../controllers/notificationController.js";

const router = Router();

router.post("", notificationController.createNotification);

export default router;
