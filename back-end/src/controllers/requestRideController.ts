import { Request, Response } from "express";
import {
  findPassengerInRace,
  howManyInRace,
  registerPassengerRace,
} from "../services/passengerService.js";
import { getRideById } from "../services/rideService.js";

export async function requestRide(req: Request, res: Response) {
  try {
    const userId = (req as any).user.userId;
    const rideId = Number(req.params.rideId);

    if (isNaN(rideId) || !userId) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    const ride = await getRideById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Carona não existe" });
    }

    if (ride.driver_id === userId) {
      return res.status(400).json({ message: "Motorista não pode entrar" });
    }

    const alreadyExists = await findPassengerInRace(rideId, userId);
    if (alreadyExists) {
      return res.status(400).json({ message: "Já está na carona" });
    }

    const seatsTaken = await howManyInRace(rideId);

    if (seatsTaken >= ride.available_seats) {
      return res.status(400).json({ message: "Carona lotada" });
    }

    const newPassenger = await registerPassengerRace(
      userId,
      rideId,
      "pending"
    );

    return res.status(201).json({
      message: "Solicitação enviada",
      newPassenger,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro interno",
    });
  }
}