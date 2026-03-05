import express from 'express';
import cors from "cors";
import userAuthRoutes from "./routes/userAuthRoutes.js";
const app=express();
app.use(cors());
app.use(express.json());
app.use(userAuthRoutes);
app.listen(3000,() => {
  console.log("Server init");
});