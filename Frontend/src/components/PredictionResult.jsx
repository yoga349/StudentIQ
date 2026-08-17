function PredictionResult({ result }) {
  if (!result) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-8">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#004f26]/40 bg-[#004f26]/10">
            <span className="text-2xl">✦</span>
          </div>

          <h3 className="text-lg font-semibold text-white">
            Ready to Predict
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Enter the student's academic information and click
            "Predict Performance" to generate an ML prediction.
          </p>
        </div>
      </div>
    );
  }

  const score = Number(result.data.predicted_score);

  let performance = "Needs Improvement";
  let performanceClass = "text-red-400";
  let performanceBg = "bg-red-500/10 border-red-500/20";

  if (score >= 15) {
    performance = "Excellent";
    performanceClass = "text-[#0a9b55]";
    performanceBg = "bg-[#004f26]/10 border-[#004f26]/30";
  } else if (score >= 12) {
    performance = "Good";
    performanceClass = "text-[#0a9b55]";
    performanceBg = "bg-[#004f26]/10 border-[#004f26]/30";
  } else if (score >= 8) {
    performance = "Average";
    performanceClass = "text-yellow-400";
    performanceBg = "bg-yellow-500/10 border-yellow-500/20";
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
          Predicted Final Score
        </p>

        <div className="mt-4 flex items-end justify-center gap-2">
          <h2 className="text-7xl font-bold tracking-tight text-[#0a9b55]">
            {score.toFixed(2)}
          </h2>

          <span className="mb-3 text-lg text-slate-500">
            / 20
          </span>
        </div>
      </div>

      <div
        className={`mt-8 rounded-xl border p-5 text-center ${performanceBg}`}
      >
        <p className="text-sm text-slate-400">
          Expected Performance
        </p>

        <p className={`mt-2 text-2xl font-bold ${performanceClass}`}>
          {performance}
        </p>
      </div>

      <div className="mt-5 rounded-xl border border-slate-800 bg-slate-800/60 p-5">
        <p className="text-sm text-slate-400">
          Machine Learning Model
        </p>

        <p className="mt-2 font-semibold text-white">
          Gradient Boosting Regressor
        </p>

        <p className="mt-1 text-xs text-slate-500">
          R² score: 0.841 on the test split
        </p>
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#004f26]/20 bg-[#004f26]/5 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#004f26]">
          <span className="text-sm text-white">✓</span>
        </div>

        <div>
          <p className="text-sm font-medium text-white">
            Prediction Generated
          </p>

          <p className="text-xs text-slate-500">
            Based on the information provided.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PredictionResult;