import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const predictPerformance = async (studentData) => {
  const response = await axios.post(
    `${API_URL}/predictions/predict`,
    studentData
  );

  return response.data;
};