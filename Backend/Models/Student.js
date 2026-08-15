import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 10,
      max: 100,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },

    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },

    studyTime: {
      type: Number,
      default: 0,
    },

    failures: {
      type: Number,
      default: 0,
      min: 0,
    },

    absences: {
      type: Number,
      default: 0,
      min: 0,
    },

    motherEducation: {
      type: Number,
      default: 0,
    },

    fatherEducation: {
      type: Number,
      default: 0,
    },

    higherEducation: {
      type: Boolean,
      default: true,
    },

    internetAccess: {
      type: Boolean,
      default: true,
    },

    schoolSupport: {
      type: Boolean,
      default: false,
    },

    familySupport: {
      type: Boolean,
      default: false,
    },

    g1: {
      type: Number,
      min: 0,
      max: 20,
      default: null,
    },

    g2: {
      type: Number,
      min: 0,
      max: 20,
      default: null,
    },

    predictedScore: {
      type: Number,
      min: 0,
      max: 20,
      default: null,
    },

    riskLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;