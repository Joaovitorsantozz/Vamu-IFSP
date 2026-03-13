import bcrypt from "bcrypt";
import {
  registerUser,
  loginUser,
  registerAboutUserService,
  getUserSerivce,
} from "../services/userService.js";
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

export async function registerAboutUser(req: Request, res: Response) {
  try {
    const { idade, semestre, curso, telefone, localidade, descricao } =
      req.body;
    const validFields = [
      idade,
      semestre,
      curso,
      telefone,
      localidade,
      descricao,
    ].filter((field) => field !== undefined);

    if (validFields.length === 0) {
      return res.status(400).json({ message: "Nenhum campo para atualizar" });
    }
    const userId = (req as any).user.userId;
    const result = await registerAboutUserService(
      idade,
      curso,
      semestre,
      telefone,
      localidade,
      descricao,
      userId,
    );
    if (!result) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res
      .status(200)
      .json({ message: "Informações atualizadas com sucesso", result });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Erro ao atualizar informações do usuário", err });
  }
}

export async function getUserInformation(req: Request, res: Response) {
  try {
    const userId = (req as any).user.userId;
    const user = await getUserSerivce(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    delete user.senha;
    return res.json({
      message: "Informações do usuário obtidas com sucesso",
      user,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Erro ao obter informações do usuário", err });
  }
}
