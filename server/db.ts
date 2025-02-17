import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./models/Users";
import { EmailTemplate } from "./models/EmailTemplate";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, EmailTemplate]
  });
  
  export const connectDB = async () => {
    try {
      await AppDataSource.initialize();
      console.log("PostgreSQL Connected!");
    } catch (error) {
      console.error("Database connection failed:", error);
      process.exit(1);
    }
  };