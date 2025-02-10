import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { User } from "../models/Users";
import { sendWelcomeEmail } from '../utils/emailService';
import bcrypt from "bcryptjs";
import express from "express";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const createUser: express.RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role = "user" }: { name: string; email: string; password: string, role: "user" | "admin" } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    // Check if the email already exists
    const existingUser: User | null = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create and save the new user
    const newUser: User = userRepository.create({ name, email, password: hashedPassword, role });
    await userRepository.save(newUser);

    // Send welcome email
    await sendWelcomeEmail(newUser.email, newUser.name);

    // Respond with the created user
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: (error as Error).message });
  }
};
  
