import { useState } from "react";

import PredictionForm from "../components/PredictionForm";
import PredictionResult from "../components/PredictionResult";
import { predictPerformance } from "../services/predictionService";

function Prediction() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePrediction = async (studentData) => {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await predictPerformance(studentData);

      setResult(response);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to generate prediction. Please make sure the backend and ML service are running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#004f26]/40 bg-[#004f26]/10 px-4 py-2 text-sm font-medium text-[#0a9b55]">
            <span className="h-2 w-2 rounded-full bg-[#0a9b55]" />

            AI-Powered Academic Analysis
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Student Performance
            <span className="text-[#0a9b55]">
              {" "}Predictor
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Analyze previous academic performance and student
            information using machine learning to predict the
            expected final score.
          </p>
        </div>

        {error && (
          <div className="mx-auto mb-6 max-w-7xl rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8">

            <div className="mb-7">
              <div className="mb-2 flex items-center gap-3">

                <div className="h-8 w-1 rounded-full bg-[#004f26]" />

                <h2 className="text-xl font-semibold">
                  Student Information
                </h2>

              </div>

              <p className="text-sm text-slate-500">
                Enter the student's academic and behavioral information.
              </p>
            </div>

            <PredictionForm
              onPredict={handlePrediction}
              loading={loading}
            />

          </section>

          <section className="lg:sticky lg:top-8 lg:self-start">
            <PredictionResult result={result} />
          </section>

        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-600">
            StudentIQ uses a Gradient Boosting machine learning model
            for academic performance prediction.
          </p>
        </div>

      </div>
    </main>
  );
}

export default Prediction;