import express from "express";

import { AuthenticateToken } from "../middlewares/authenticateToken.js";
import { requestRide } from "../controllers/requestRideController.js";

const router= express.Router();


router.post("/request-ride/:rideId",AuthenticateToken,requestRide);

export default router;