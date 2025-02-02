import express from "express";
import { Request } from "express";
import { User } from "./models/Users";
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any
}