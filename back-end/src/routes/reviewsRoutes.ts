import express from "express";
import { AuthenticateToken } from "../middlewares/authenticateToken.js";
import { getReviews } from "../controllers/reviewsController.js";

const router = express.Router();

router.get("/reviews/:user_id",AuthenticateToken,getReviews);
export default router;