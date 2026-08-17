import { useEffect, useState } from "react";
import { getPredictionHistory } from "../services/predictionService";

function PredictionHistory() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPredictionHistory();

      setPredictions(response.data || []);
    } catch (err) {
      console.error("History error:", err);

      setError(
        "Unable to load prediction history."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const getPerformanceStyle = (performance) => {
    if (performance === "Excellent") {
      return "bg-[#004f26]/10 text-[#0a9b55] border-[#004f26]/30";
    }

    if (performance === "Good") {
      return "bg-[#004f26]/10 text-[#0a9b55] border-[#004f26]/30";
    }

    if (performance === "Average") {
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }

    return "bg-red-500/10 text-red-400 border-red-500/20";
  };

  const getRiskStyle = (risk) => {
    if (risk === "Low") {
      return "bg-[#004f26]/10 text-[#0a9b55] border-[#004f26]/30";
    }

    if (risk === "Medium") {
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }

    return "bg-red-500/10 text-red-400 border-red-500/20";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#004f26]/40 bg-[#004f26]/10 px-4 py-2 text-sm font-medium text-[#0a9b55]">
            <span className="h-2 w-2 rounded-full bg-[#0a9b55]" />
            StudentIQ
          </div>

          <h1 className="text-4xl font-bold">
            Prediction History
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Review previous student performance predictions,
            performance levels, and academic risk assessments.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-[#0a9b55]" />

              <p className="text-sm text-slate-400">
                Loading prediction history...
              </p>
            </div>
          </div>
        ) : predictions.length === 0 ? (
          /* Empty State */
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-8">
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#004f26]/40 bg-[#004f26]/10">
                <span className="text-2xl text-[#0a9b55]">
                  ✦
                </span>
              </div>

              <h2 className="text-xl font-semibold">
                No Predictions Yet
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Generate your first student performance prediction
                to see it here.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Summary */}
            <div className="mb-6 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-500">
                  Total Predictions
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {predictions.length}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-500">
                  Average Predicted Score
                </p>

                <p className="mt-2 text-3xl font-bold text-[#0a9b55]">
                  {(
                    predictions.reduce(
                      (sum, item) =>
                        sum + Number(item.predictedScore || 0),
                      0
                    ) / predictions.length
                  ).toFixed(2)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-500">
                  Latest Prediction
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {Number(
                    predictions[0].predictedScore
                  ).toFixed(2)}
                </p>
              </div>

            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 md:block">

              <div className="overflow-x-auto">
                <table className="w-full text-left">

                  <thead className="border-b border-slate-800 bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400">
                        Date
                      </th>

                      <th className="px-6 py-4 text-sm font-medium text-slate-400">
                        Predicted Score
                      </th>

                      <th className="px-6 py-4 text-sm font-medium text-slate-400">
                        Performance
                      </th>

                      <th className="px-6 py-4 text-sm font-medium text-slate-400">
                        Risk
                      </th>

                      <th className="px-6 py-4 text-sm font-medium text-slate-400">
                        G1
                      </th>

                      <th className="px-6 py-4 text-sm font-medium text-slate-400">
                        G2
                      </th>

                      <th className="px-6 py-4 text-sm font-medium text-slate-400">
                        Absences
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {predictions.map((prediction) => (
                      <tr
                        key={prediction._id}
                        className="border-b border-slate-800/70 transition hover:bg-slate-800/30"
                      >
                        <td className="px-6 py-5">
                          <p className="font-medium text-white">
                            {formatDate(prediction.createdAt)}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {formatTime(prediction.createdAt)}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <span className="text-xl font-bold text-[#0a9b55]">
                            {Number(
                              prediction.predictedScore
                            ).toFixed(2)}
                          </span>

                          <span className="ml-1 text-sm text-slate-500">
                            / 20
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${getPerformanceStyle(
                              prediction.performance
                            )}`}
                          >
                            {prediction.performance}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${getRiskStyle(
                              prediction.riskLevel
                            )}`}
                          >
                            {prediction.riskLevel}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-slate-300">
                          {prediction.inputData?.G1 ?? "-"}
                        </td>

                        <td className="px-6 py-5 text-slate-300">
                          {prediction.inputData?.G2 ?? "-"}
                        </td>

                        <td className="px-6 py-5 text-slate-300">
                          {prediction.inputData?.absences ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 md:hidden">
              {predictions.map((prediction) => (
                <div
                  key={prediction._id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                >
                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="text-sm text-slate-500">
                        {formatDate(prediction.createdAt)}
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        {formatTime(prediction.createdAt)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#0a9b55]">
                        {Number(
                          prediction.predictedScore
                        ).toFixed(2)}
                      </p>

                      <p className="text-xs text-slate-500">
                        out of 20
                      </p>
                    </div>

                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs ${getPerformanceStyle(
                        prediction.performance
                      )}`}
                    >
                      {prediction.performance}
                    </span>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs ${getRiskStyle(
                        prediction.riskLevel
                      )}`}
                    >
                      {prediction.riskLevel} Risk
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-800 pt-4">

                    <div>
                      <p className="text-xs text-slate-600">
                        G1
                      </p>

                      <p className="mt-1 font-medium text-slate-300">
                        {prediction.inputData?.G1 ?? "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-600">
                        G2
                      </p>

                      <p className="mt-1 font-medium text-slate-300">
                        {prediction.inputData?.G2 ?? "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-600">
                        Absences
                      </p>

                      <p className="mt-1 font-medium text-slate-300">
                        {prediction.inputData?.absences ?? "-"}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default PredictionHistory;