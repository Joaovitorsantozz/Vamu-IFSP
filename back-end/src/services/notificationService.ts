import dotenv from "dotenv";

import pool from "../database.js";
dotenv.config();
export interface CreateNotificationDTO {
  userId: number | string;
  type: string;
  title: string;
  message: string;
  link?: string;
  metadata?: Record<string, any>;
}

export class NotificationService {
  public static async create(data: CreateNotificationDTO) {
    const { userId, type, title, message, link, metadata } = data;

    if (!userId) {
      throw new Error(
        "O campo 'userId' é obrigatório para enviar uma notificação.",
      );
    }

    const query = `
      INSERT INTO notifications (
        user_id, 
        type, 
        title, 
        message, 
        link, 
        read, 
        metadata
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      userId,
      type,
      title,
      message,
      link || null,
      false,
      metadata ? JSON.stringify(metadata) : "{}",
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  public static async notifyRideRequested(params: {
    driverId: number | string;
    passengerId: number | string;
    rideId: number;
    passengerName?: string;
  }) {
    // é a notificação que aparece pro motorista que teve uma corrida requisitada
    const { driverId, passengerId, rideId, passengerName } = params;

    const sender = passengerName ? passengerName : `O usuário ${passengerId}`;

    return this.create({
      userId: driverId,
      type: "RIDE_REQUESTED",
      title: "Corrida Requisitada",
      message: `${sender} requisitou sua corrida.`,
      link: `${process.env.FRONTEND_URL}/manage-ride/${rideId}`,
      metadata: { rideId, passengerId },
    });
  }

  public static async notifyRideAccepted(params: {
    passengerId: number | string;
    rideId: number;
  }) {
    // é a notificação que aparece pro usuario que teve uma corrida aceita
    return this.create({
      userId: params.passengerId,
      type: "RIDE_ACCEPTED",
      title: "Solicitação Aceita!",
      message: "Sua solicitação de carona foi aceita pelo motorista.",
      link: `${process.env.FRONTEND_URL}/dashboard`,
      metadata: { rideId: params.rideId },
    });
  }
  public static async getByUserId(userId: number | string) {
    const query = `
      SELECT id, type, title, message, link, metadata, read, created_at 
      FROM notifications 
      WHERE user_id = $1 
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }
  public static async notifyDriverRideAccepted(params: {
    driverId: number | string;
    passengerName?: string;
    passengerId?: number | string;
    rideId: number;
  }) {
    const { driverId, passengerName, passengerId, rideId } = params;
    const passenger = passengerName
      ? passengerName
      : `o usuário ${passengerId}`;

    return this.create({
      userId: driverId,
      type: "DRIVER_RIDE_ACCEPTED",
      title: "Corrida Aceita",
      message: `Você aceitou uma corrida de ${passenger}.`,
      link: `${process.env.FRONTEND_URL}/manage-ride/${rideId}`,
      metadata: { rideId, passengerId },
    });
  }

  public static async notifyPassengerRideRequested(params: {
    passengerId: number | string;
    driverName?: string;
    driverId?: number | string;
    rideId: number;
  }) {
    const { passengerId, driverName, driverId, rideId } = params;
    const driver = driverName ? driverName : "o motorista";

    return this.create({
      userId: passengerId,
      type: "PASSENGER_RIDE_REQUESTED",
      title: "Pedido Enviado",
      message: `Você enviou um pedido de corrida para ${driver}.`,
      link: `${process.env.FRONTEND_URL}/dashboard`,
      metadata: { rideId, driverId },
    });
  }
  public static async delete(id: number | string, userId: number | string) {
    const query = `DELETE FROM notifications WHERE id = $1 AND user_id = $2 RETURNING *;`;
    const { rows } = await pool.query(query, [id, userId]);
    return rows[0];
  }
}
