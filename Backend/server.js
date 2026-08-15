import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import predictionRoutes from "./routes/predictionRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/predictions", predictionRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "StudentIQ API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});