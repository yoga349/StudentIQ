import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    inputData: {
      studytime: {
        type: Number,
        required: true,
      },

      failures: {
        type: Number,
        required: true,
      },

      absences: {
        type: Number,
        required: true,
      },

      G1: {
        type: Number,
        required: true,
      },

      G2: {
        type: Number,
        required: true,
      },

      Medu: {
        type: Number,
        required: true,
      },

      Fedu: {
        type: Number,
        required: true,
      },

      higher: {
        type: String,
        enum: ["yes", "no"],
        required: true,
      },

      internet: {
        type: String,
        enum: ["yes", "no"],
        required: true,
      },

      schoolsup: {
        type: String,
        enum: ["yes", "no"],
        required: true,
      },

      famsup: {
        type: String,
        enum: ["yes", "no"],
        required: true,
      },
    },

    predictedScore: {
      type: Number,
      required: true,
    },

    performance: {
      type: String,
      required: true,
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    recommendations: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Prediction = mongoose.model(
  "Prediction",
  predictionSchema
);

export default Prediction;