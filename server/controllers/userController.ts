import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { User } from "../models/Users";
import { sendWelcomeEmail } from '../utils/emailService';
import bcrypt from "bcryptjs";
import express from "express";
import { AuthRequest } from "../interfaces";

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

export const getAllProfiles = async (req: AuthRequest, res: Response): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  try {
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profiles', error: (error as Error).message });
  }
};

export const viewProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: req.user.id } });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.json(user);
};

export const editProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const { name, bio } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  try {
    const user = await userRepository.findOne({ where: { id: req.user.id } });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.name = name || user.name;
    user.bio = bio || user.bio;

    await userRepository.save(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: (error as Error).message });
  }
};

export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  const { currentPassword, newPassword } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  try {
    const user = await userRepository.findOne({ where: { id: req.user.id } });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid current password' });
      return;
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await userRepository.save(user);

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error changing password', error: (error as Error).message });
  }
};

