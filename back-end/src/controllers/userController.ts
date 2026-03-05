import bcrypt from "bcrypt";
import { registerUser } from "../services/userService.js";
import { Request, Response } from "express";
export async function register(req: Request, res: Response) {
  try {
    const { name, email,  password } = req.body;
    if (!name || !email  || !password) {
      return res.status(400).json({ message: "Campos faltando" });
    }
    const bpass = await bcrypt.hash(password, 10);
    const result = await registerUser(name, email, bpass);
    if (!result) {
      return res.status(400).json({
        message: "Usuário ja existe",
        sucessfull: false,
      });
    }
    res.status(201).json({
      message: "Usuario Cadastrado",
      result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erro ao cadastrar usuário", err });
  }
}