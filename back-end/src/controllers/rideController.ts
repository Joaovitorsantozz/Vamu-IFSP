import { Request, Response } from "express";

import { getCarInformationService } from "../services/carService.js";
import { offerRide } from "../services/rideService.js";
import { getFilteredUserInformationService } from "../services/userService.js";
import { isValidTime } from "../middlewares/isValidTime.js";
export async function registerRide(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    console.log("USER", user);

    const { nome } = await getFilteredUserInformationService(user.userId, [
      "nome",
    ]);

    const car = await getCarInformationService(user.userId);
    if (!car) {
      return res
        .status(400)
        .json({ message: "Usuário não tem um carro registrado" });
    }

    const { modelo, placa, cor } = car;
    const { boarding, destination, boardingTime } = req.body;
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const timePart = boardingTime?.split("T")[1]?.slice(0, 5);

    const date = new Date(boardingTime);

    if (isNaN(date.getTime()) || !timeRegex.test(timePart)) {
      return res.status(400).json({ message: "Horário inválido" });
    }

    if (date < new Date()) {
      return res
        .status(400)
        .json({ message: "Horário no passado não permitido" });
    }
    const newRide = await offerRide(
      user.userId,
      nome,
      modelo,
      placa,
      cor,
      boarding,
      destination,
      boardingTime,
    );
    res
      .status(201)
      .json({ message: "Carona registrada com sucesso", ride: newRide });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao registrar carona" });
  }
}
export async function getDriverInformations(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const { nome } = await getFilteredUserInformationService(user.userId, [
      "nome",
    ]);

    const car = await getCarInformationService(user.userId);
    if (!car) {
      return res
        .status(400)
        .json({ message: "Usuário não tem um carro registrado" });
    }

    return res.status(201).json({
      message: "Informações adquiridas com sucesso",
      user: { ...user, nome },
      car,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao buscar informações do motorista" });
  }
}
