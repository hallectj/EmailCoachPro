import { Request, Response, NextFunction } from "express";
import jwt, { Jwt } from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthRequest } from "../interfaces";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded as any;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
