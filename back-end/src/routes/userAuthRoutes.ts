import express from "express";
import { register, userlogin } from "../controllers/userController.js";

const router = express.Router();

router.post("/user-register", register);
router.post("/login", userlogin);
export default router;
