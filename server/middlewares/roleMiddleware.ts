import e, { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../interfaces";

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Access denied. Admins only." });
    return;
  } 
  next();
};