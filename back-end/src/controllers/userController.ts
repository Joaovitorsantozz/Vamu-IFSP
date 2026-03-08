import bcrypt from "bcrypt";
import { registerUser, loginUser } from "../services/userService.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
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

export async function userlogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Campos faltando" });
    }

    const result = await loginUser(email);

    if (result.length === 0) {
      return res.status(400).json({
        message: "Email ou senha incorretos",
        sucessfull: false,
      });
    }

    const user = result[0];

    const isPasswordValid = await bcrypt.compare(password, user.senha);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Email ou senha incorretos",
        sucessfull: false,
      });
    }

    const { senha, ...userWithoutPassword } = user;

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "2h" },
    );

    return res.status(200).json({
      message: "Login bem-sucedido",
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erro ao logar usuário", err });
  }
}