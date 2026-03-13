import { Request, Response } from "express";
import { getCarInformationService, registerCarInformationService } from "../services/carService.js";
export async function registerCarInformations(req: Request, res: Response) {
  try {
    const { carModel, placa, cor } = req.body;
    const userId = (req as any).user.userId;
    if (!userId || !carModel || !placa || !cor) {
      return res.status(400).json({ message: "Campos faltando" });
    }
    const normalizatedPlaca = placa.replace("-", "").toUpperCase();
    const placaRegex: RegExp = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
    if (!placaRegex.test(normalizatedPlaca)) {
      return res.status(400).json({ message: "Placa inválida" });
    }
    const result = await registerCarInformationService(
      userId,
      carModel,
      normalizatedPlaca,
      cor,
    );
    res.status(201).json({
      message: "Informações do carro atualizadas",
      result,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Erro ao atualizar informações do carro", err });
  }
}
export async function getCarInformation(req: Request, res: Response) {
  try {
    const userId = (req as any).user.userId;
    const result = await getCarInformationService(userId);
    if (!result) {
      return res.status(404).json({ message: "Informações do carro não encontradas" });
    }
    res.status(200).json({
      message: "Informações do carro obtidas com sucesso",
      result,
    }); 
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Erro ao obter informações do carro", err });
  } 
}