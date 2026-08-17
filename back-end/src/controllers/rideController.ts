import { Request, Response } from "express";

import { getCarInformationService } from "../services/carService.js";
import {
  deleteRaceService,
  getDriverRaceInformationsService,
  getRideById,
  offerRide,
  updateRaceStatusService,
} from "../services/rideService.js";
import { getFilteredUserInformationService } from "../services/userService.js";

export async function registerRide(req: Request, res: Response) {
  
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

    const { modelo, placa, cor } = car;
    const { boarding, destination, boardingTime,cityDestination,cityBoarding} = req.body;
    console.log("ola");
    const date = new Date(boardingTime);

    if (!boarding || !destination || !boardingTime ||!cityBoarding||!cityDestination) {
      return res.status(400).json({ message: "Campos obrigatórios" });
    }

    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Data inválida" });
    }

    if (date < new Date()) {
      return res
        .status(400)
        .json({ message: "Horário no passado não permitido" });
    }
    console.log("Valores desestruturados:", { cityDestination, cityBoarding });
    const newRide = await offerRide(
      user.userId,
      nome,
      modelo,
      placa,
      cor,
      boarding,
      destination,
      boardingTime,
      cityDestination,
      cityBoarding
    );
    console.log("oi filho da puta");
    return res
      .status(201)
      .json({ message: "Carona registrada com sucesso", ride: newRide });
  } catch (error: any) {
    console.error("ERRO COMPLETO:", error);
    console.error("STACK:", error?.stack);

    return res.status(500).json({
      message: "Erro ao registrar carona",
      error: error?.message,
    });
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

export async function getDriverRaceInformations(req: Request, res: Response) {
  const userId = (req as any).user.userId;
  const result = await getDriverRaceInformationsService(userId);
  if (!result) {
    return res.status(200).json([]);
  }
  return res
    .status(201)
    .json({ message: "Suas caronas como motorista active==true", result });
}
export async function getRideByIdController(req: Request, res: Response) {
  try {
    const rideId = Number(req.params.rideId);
    if (!rideId) {
      return res.status(404).json({ message: "ID da corrida não fornecido" });
    }

    const result = await getRideById(rideId);
    if (!result)
      return res.status(404).json({ message: "Corrida não encontrada" });
    return res.status(201).json({ message: "Corrida encontrada", result });
  } catch (error) {
    console.log("Erro ao buscar carona por id", error);
  }
}
export async function deleteRide(req: Request, res: Response) {
  try {
    const userId = (req as any).user.userId;
    const rideid = Number(req.params.rideId);

    if (!rideid) {
      return res
        .status(404)
        .json({ message: "Corrida não encontrada para deletar" });
    }
    const ride = await getRideById(rideid);

    if (Number(ride.user_id) !== Number(userId)) {
      return res.status(403).json({ message: "Sem permissão para deletar" });
    }
    await deleteRaceService({ rideId: rideid, userId });

    return res.status(200).json({ message: "Corrida deletada com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao deletar carona" });
  }
}

export async function updateStatus(req: Request, res: Response) {
  try {
    const ownerId = (req as any).user.userId;
    const { userId } = req.body;
    const rideId = Number(req.params.rideId);
    if (!userId || !rideId)
      return res.status(404).json({ message: "Sem userid ou rideid" });
    const ride = await getRideById(rideId);
    const { status } = req.body;

    if (Number(ride.user_id) !== Number(ownerId)) {
      return res.status(403).json({ message: "Sem permissão para deletar" });
    }

    if (status != "accepted" && status != "rejected") {
  
      return res.status(400).json({ message: "Status não tolerado" });
    }
    await updateRaceStatusService(status, Number(rideId), Number(userId));
    return res
      .status(200)
      .json({ message: "Status do passageiro atualizado com sucesso" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Erro ao alterar status da corrida" });
  }
}
