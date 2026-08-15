import { predictStudentPerformance } from "../services/mlService.js";

export const predictPerformance = async (req, res) => {
  try {
    const studentData = req.body;

    const prediction = await predictStudentPerformance(studentData);

    res.status(200).json({
      success: true,
      data: prediction,
    });
  } catch (error) {
    console.error("Prediction Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};