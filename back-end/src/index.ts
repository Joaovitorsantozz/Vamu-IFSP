import express from 'express';
import cors from "cors";
import userAuthRoutes from "./routes/userAuthRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";
import passengerRoutes from "./routes/passengerRoute.js"
import reviewRoutes from "./routes/reviewsRoutes.js"
const app=express();
app.use(cors());
app.use(express.json());
app.use(userAuthRoutes);
app.use(rideRoutes);
app.use(passengerRoutes);
app.use(reviewRoutes);
app.listen(3000,() => {
  console.log("Server init");
});

