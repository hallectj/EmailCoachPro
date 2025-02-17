import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db";

//import routes
import testRoutes from "./routes/testRoutes";
import userRoutes from "./routes/userRoutes";
import emailRoutes from './routes/emailRoutes';
import emailTemplateRoutes from "./routes/emailTemplateRoutes";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", testRoutes);
app.use("/api", userRoutes);
app.use("/api", emailRoutes);
app.use("/api", emailTemplateRoutes);

// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   next();
// });

app.get("/", (req, res) => {
  res.send("EmailCoach Pro API is running...");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});