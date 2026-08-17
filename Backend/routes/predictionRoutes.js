import express from "express";
import {
  predictPerformance,
} from "../controllers/predictionController.js";

import {
  getPredictionHistory,
} from "../controllers/predictionHistoryController.js";

const router = express.Router();

router.post("/predict", predictPerformance);

router.get("/history", getPredictionHistory);

export default router;