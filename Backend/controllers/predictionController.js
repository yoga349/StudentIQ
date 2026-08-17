import { predictStudentPerformance } from "../services/mlService.js";
import Prediction from "../models/Prediction.js";

const getPerformanceCategory = (score) => {
  if (score >= 15) {
    return "Excellent";
  }

  if (score >= 12) {
    return "Good";
  }

  if (score >= 8) {
    return "Average";
  }

  return "Needs Improvement";
};



const getRiskLevel = (score, studentData) => {
  let riskPoints = 0;

  // Predicted score
  if (score < 8) {
    riskPoints += 3;
  } else if (score < 12) {
    riskPoints += 2;
  } else if (score < 15) {
    riskPoints += 1;
  }

  // Previous failures
  if (studentData.failures >= 2) {
    riskPoints += 2;
  } else if (studentData.failures === 1) {
    riskPoints += 1;
  }

  // Absences
  if (studentData.absences >= 15) {
    riskPoints += 2;
  } else if (studentData.absences >= 10) {
    riskPoints += 1;
  }

  // Previous grades
  if (
    studentData.G1 < 8 ||
    studentData.G2 < 8
  ) {
    riskPoints += 2;
  } else if (
    studentData.G1 < 12 ||
    studentData.G2 < 12
  ) {
    riskPoints += 1;
  }

  if (riskPoints >= 5) {
    return "High";
  }

  if (riskPoints >= 2) {
    return "Medium";
  }

  return "Low";
};

const generateRecommendations = (
  score,
  studentData
) => {
  const recommendations = [];

  if (studentData.G2 < 12) {
    recommendations.push(
      "Focus on improving your latest academic performance."
    );
  }

  if (studentData.absences >= 10) {
    recommendations.push(
      "Try to reduce absences and maintain regular attendance."
    );
  }

  if (studentData.studytime <= 2) {
    recommendations.push(
      "Consider increasing your weekly study time."
    );
  }

  if (studentData.failures >= 1) {
    recommendations.push(
      "Give extra attention to subjects where you previously struggled."
    );
  }

  if (studentData.famsup === "no") {
    recommendations.push(
      "Consider seeking additional academic support from teachers or mentors."
    );
  }

  if (
    studentData.schoolsup === "no" &&
    score < 12
  ) {
    recommendations.push(
      "Academic support programs may help improve your performance."
    );
  }

  if (score >= 15) {
    recommendations.push(
      "Maintain your current study routine and academic performance."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Continue following a consistent study routine and monitor your progress."
    );
  }

  return recommendations.slice(0, 4);
};


export const predictPerformance = async (req, res) => {
  try {
    const studentData = req.body;

    

    // 1. Call ML service
    const prediction = await predictStudentPerformance(
      studentData
    );

    console.log("ML prediction:", prediction);

    // 2. Get predicted score
    const predictedScore = Number(
      prediction.predicted_score
    );

    // Make sure prediction is valid
    if (Number.isNaN(predictedScore)) {
      throw new Error(
        "Invalid prediction received from ML service"
      );
    }

    // 3. Calculate performance
    const performance =
      getPerformanceCategory(predictedScore);

    // 4. Calculate risk
    const riskLevel = getRiskLevel(
      predictedScore,
      studentData
    );

    // 5. Generate recommendations
    const recommendations =
      generateRecommendations(
        predictedScore,
        studentData
      );

    

    // 6. Save prediction to MongoDB
    const savedPrediction =
      await Prediction.create({
        inputData: {
          studytime: Number(studentData.studytime),
          failures: Number(studentData.failures),
          absences: Number(studentData.absences),
          G1: Number(studentData.G1),
          G2: Number(studentData.G2),
          Medu: Number(studentData.Medu),
          Fedu: Number(studentData.Fedu),

          higher: studentData.higher,
          internet: studentData.internet,
          schoolsup: studentData.schoolsup,
          famsup: studentData.famsup,
        },

        // IMPORTANT:
        // These names must exactly match
        // Prediction.js
        predictedScore: predictedScore,
        performance: performance,
        riskLevel: riskLevel,
        recommendations: recommendations,
      });

  

    // 7. Send response to frontend
    res.status(200).json({
      success: true,

      data: {
        predictionId: savedPrediction._id,

        predicted_score: predictedScore,

        performance: performance,

        riskLevel: riskLevel,

        recommendations: recommendations,
      },
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};