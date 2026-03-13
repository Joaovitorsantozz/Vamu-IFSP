import express from "express";
import {
  getUserInformation,
  register,
  registerAboutUser,
  userlogin,
} from "../controllers/userController.js";
import { AuthenticateToken } from "../middlewares/authenticateToken.js";
import { getCarInformation, registerCarInformations } from "../controllers/carController.js";


const router = express.Router();

router.post("/user-register", register);
router.post("/login", userlogin);

//usuário perfil rotas
router.patch("/user-information", AuthenticateToken, registerAboutUser);
router.patch(
  "/register-car-information",
  AuthenticateToken,
  registerCarInformations,
);

router.get("/user-information", AuthenticateToken, getUserInformation);
router.get("/car-information", AuthenticateToken,getCarInformation);
export default router;
