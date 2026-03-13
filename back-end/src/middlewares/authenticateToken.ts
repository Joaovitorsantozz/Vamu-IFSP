import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
export async function AuthenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token nao fornecido no authenticate token" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    (req as any).user = decoded;
    next();
  });
}