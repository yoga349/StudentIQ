import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { getPredictionHistory } from "../services/predictionService";

function Dashboard() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPredictions = async () => {
      try {
        const response = await getPredictionHistory();
        setPredictions(response.data || []);
      } catch (error) {
        console.error("Dashboard history error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPredictions();
  }, []);

  const totalPredictions = predictions.length;

  const averageScore =
    totalPredictions > 0
      ? (
          predictions.reduce(
            (sum, prediction) =>
              sum + Number(prediction.predictedScore || 0),
            0
          ) / totalPredictions
        ).toFixed(2)
      : "0.00";

  const latestScore =
    totalPredictions > 0
      ? Number(predictions[0].predictedScore).toFixed(2)
      : "0.00";

  const lowRiskCount = predictions.filter(
    (prediction) => prediction.riskLevel === "Low"
  ).length;

  // Oldest → newest for chart
  const chartData = [...predictions]
    .reverse()
    .map((prediction, index) => ({
      name: `#${index + 1}`,
      score: Number(prediction.predictedScore),
    }));

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Hero */}
        <section className="mb-8 rounded-3xl border border-[#004f26]/30 bg-gradient-to-br from-[#004f26]/30 via-slate-900 to-slate-950 p-8 shadow-xl sm:p-10">
          <div className="max-w-3xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#004f26]/40 bg-[#004f26]/20 px-4 py-2 text-sm font-medium text-[#0a9b55]">
              <span className="h-2 w-2 rounded-full bg-[#0a9b55]" />
              Machine Learning Dashboard
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Welcome to{" "}
              <span className="text-[#0a9b55]">
                StudentIQ
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Analyze student academic performance using a
              machine learning model and get performance
              insights, risk assessment, and personalized
              recommendations.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/"
                className="rounded-xl bg-[#004f26] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0a6b3a] hover:shadow-lg hover:shadow-[#004f26]/30"
              >
                Start Prediction
              </a>

              <a
                href="/history"
                className="rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-[#004f26] hover:text-white"
              >
                View History
              </a>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">
              Total Predictions
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              {loading ? "—" : totalPredictions}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">
              Average Score
            </p>

            <p className="mt-2 text-3xl font-bold text-[#0a9b55]">
              {loading ? "—" : averageScore}
              {!loading && (
                <span className="ml-1 text-sm text-slate-500">
                  / 20
                </span>
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">
              Latest Score
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              {loading ? "—" : latestScore}
              {!loading && (
                <span className="ml-1 text-sm text-slate-500">
                  / 20
                </span>
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">
              Low Risk Predictions
            </p>

            <p className="mt-2 text-3xl font-bold text-[#0a9b55]">
              {loading ? "—" : lowRiskCount}
            </p>
          </div>

        </section>

        {/* Chart + Model Information */}
        <section className="grid gap-6 lg:grid-cols-3">

          {/* Chart */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">

            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Prediction Score Trend
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Predicted scores from previous analyses.
              </p>
            </div>

            {chartData.length < 2 ? (
              <div className="flex h-[320px] items-center justify-center">
                <div className="text-center">
                  <p className="text-slate-400">
                    Not enough predictions yet.
                  </p>

                  <p className="mt-2 text-sm text-slate-600">
                    Generate at least two predictions to
                    see the score trend.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#1e293b"
                    />

                    <XAxis
                      dataKey="name"
                      stroke="#64748b"
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      domain={[0, 20]}
                      stroke="#64748b"
                      tickLine={false}
                      axisLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #1e293b",
                        borderRadius: "12px",
                        color: "#ffffff",
                      }}
                      formatter={(value) => [
                        `${Number(value).toFixed(2)} / 20`,
                        "Predicted Score",
                      ]}
                    />

                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#0a9b55"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: "#004f26",
                        stroke: "#0a9b55",
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 7,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Model Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="mb-6">
              <p className="text-sm text-slate-500">
                Machine Learning
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Model Information
              </h2>
            </div>

            <div className="space-y-4">

              <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Algorithm
                </p>

                <p className="mt-2 font-semibold text-white">
                  Gradient Boosting
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Test R²
                </p>

                <p className="mt-2 text-2xl font-bold text-[#0a9b55]">
                  0.841
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Cross-Validation R²
                </p>

                <p className="mt-2 text-2xl font-bold text-[#0a9b55]">
                  0.806
                </p>
              </div>

              <div className="rounded-xl border border-[#004f26]/30 bg-[#004f26]/10 p-4">
                <p className="text-xs leading-5 text-slate-400">
                  The model predicts the student's expected
                  final academic score based on previous
                  academic and behavioral information.
                </p>
              </div>

            </div>
          </div>

        </section>

        {/* Features */}
        <section className="mt-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#004f26] text-white">
              ML
            </div>

            <h3 className="font-semibold">
              Machine Learning
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Gradient Boosting predicts expected final
              academic performance.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#004f26] text-white">
              AI
            </div>

            <h3 className="font-semibold">
              Smart Insights
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Performance and risk analysis provides
              actionable student insights.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#004f26] text-white">
              DB
            </div>

            <h3 className="font-semibold">
              Prediction History
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Previous predictions are stored securely in
              MongoDB for future analysis.
            </p>
          </div>

        </section>

      </div>
    </main>
  );
}

export default Dashboard;