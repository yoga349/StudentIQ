import Prediction from "../models/Prediction.js";

export const getPredictionHistory = async (req, res) => {
  try {
    const predictions = await Prediction.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: predictions.length,
      data: predictions,
    });
  } catch (error) {
    console.error(
      "Prediction History Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch prediction history",
    });
  }
};