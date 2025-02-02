import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db";

//import routes
import testRoutes from "./routes/testRoutes";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", testRoutes);

app.get("/", (req, res) => {
  res.send("EmailCoach Pro API is running...");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});