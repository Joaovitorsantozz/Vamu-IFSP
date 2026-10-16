import { Request, Response } from "express";
import {
  findPassengerInRace,
  howManyInRace,
  registerPassengerRace,
} from "../services/passengerService.js";
import { getRideById } from "../services/rideService.js";

import { NotificationService } from "../services/notificationService.js";
import { getFilteredUserInformationService } from "../services/userService.js";

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

    if (ride.user_id === userId) {
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

    const newPassenger = await registerPassengerRace(userId, rideId, "pending");

    const driverInfo = await getFilteredUserInformationService(ride.user_id, [
      "nome",
    ]);

    const passengerInfo = await getFilteredUserInformationService(userId, [
      "nome",
    ]);

    await NotificationService.notifyRideRequested({
      driverId: ride.user_id,
      passengerId: userId,
      passengerName: passengerInfo?.nome,
      rideId: rideId,
    });

    await NotificationService.notifyPassengerRideRequested({
      passengerId: userId,
      driverId: ride.user_id,
      driverName: driverInfo?.nome,
      rideId: rideId,
    });

    return res.status(201).json({
      message: "Solicitação enviada",
      newPassenger,
    });
  } catch (error) {
    console.error("Erro ao solicitar carona:", error);
    return res.status(500).json({
      message: "Erro interno",
    });
  }
}
