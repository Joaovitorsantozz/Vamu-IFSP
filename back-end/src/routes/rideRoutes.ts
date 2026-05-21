import express from "express";

import { registerRide,getDriverInformations, getDriverRaceInformations, deleteRide, getRideByIdController, updateStatus } from "../controllers/rideController.js";
import { AuthenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

// preciso da rota pra enviar as informações da carona
//preciso da rota

router.post("/offer-ride", AuthenticateToken,registerRide);
router.get("/get-user-information-to-offer-ride",AuthenticateToken,getDriverInformations);
router.get("/my-races-as-driver",AuthenticateToken,getDriverRaceInformations);
router.get("/get-ride-by-id/:rideId",AuthenticateToken,getRideByIdController);
router.delete("/delete-race/:rideId",AuthenticateToken,deleteRide);
router.patch("/change-ride-status/:rideId",AuthenticateToken,updateStatus);
export default router;