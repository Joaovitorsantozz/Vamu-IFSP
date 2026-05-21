import express from "express";

import { AuthenticateToken } from "../middlewares/authenticateToken.js";
import { requestRide } from "../controllers/requestRideController.js";
import { getPassengersRide } from "../controllers/getRidePassengersController.js";

const router= express.Router();


router.post("/request-ride/:rideId",AuthenticateToken,requestRide);
router.get('/get-passengers-in-ride/:rideId',AuthenticateToken,getPassengersRide);
export default router;