import { Request, Response } from "express";
import { getRideById } from "../services/rideService.js";
import { getPassengersRideService } from "../services/getRidePassengerService.js";
import { getUserInformation } from "./userController.js";
import { getUserSerivce } from "../services/userService.js";

export async function getPassengersRide(req: Request, res: Response) {
  try {
    const userId = Number((req as any).user.userId);
    const rideId = Number(req.params.rideId);

    if (isNaN(rideId)) {
      return res.status(400).json({ message: "ID da corrida inválido" });
    }

    const ride = await getRideById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Corrida não encontrada" });
    }

 
    if (ride.user_id !== userId) {
      return res.status(403).json({ message: "Sem permissão" });
    }

    const passengers = await getPassengersRideService(rideId);
   

    return res.status(200).json({
      message: "Passageiros encontrados",
      passengers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar passageiros" });
  }
}
