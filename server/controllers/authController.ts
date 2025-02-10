import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../db";
import { User } from "../models/Users";
import dotenv from "dotenv";

dotenv.config();

// Controller for user login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: { email: string; password: string } =  req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    //const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: (error as Error).message });
  }
};
