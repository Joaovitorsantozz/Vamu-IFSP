import { Request, Response } from "express";
import { NotificationService } from "../services/notificationService";
export default async function getUserNotifications(
  req: Request,
  res: Response,
) {
  try {
    const userId = (req as any).user.userId;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const notifications = await NotificationService.getByUserId(userId);

    return res.status(200).json({
      message: "Notificações buscadas com sucesso",
      notifications,
    });
  } catch (error) {
    console.log("Erro ao buscar notificações:", error);
    return res
      .status(500)
      .json({ message: "Erro interno ao buscar notificações" });
  }
}
export async function deleteNotification(req: Request, res: Response) {
  try {
    const userId = (req as any).user.userId;
    const rawId = req.params.id;

    const notificationId = Array.isArray(rawId) ? rawId[0] : rawId;

    if (!userId || !notificationId) {
      return res.status(400).json({ message: "ID da notificação inválido" });
    }

    const deleted = await NotificationService.delete(notificationId, userId);

    if (!deleted) {
      return res.status(404).json({ message: "Notificação não encontrada" });
    }

    return res.status(200).json({
      message: "Notificação excluída com sucesso",
    });
  } catch (error) {
    console.log("Erro ao excluir notificação:", error);
    return res
      .status(500)
      .json({ message: "Erro interno ao excluir notificação" });
  }
}
