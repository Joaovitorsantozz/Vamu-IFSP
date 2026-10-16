import express from "express";
import getUserNotifications, { deleteNotification } from "../controllers/notificationController";
import { AuthenticateToken } from "../middlewares/authenticateToken";

const router = express.Router();

router.get("/notifications",AuthenticateToken,getUserNotifications);
router.delete("/delete-notification/:id",AuthenticateToken,deleteNotification);
export default router;