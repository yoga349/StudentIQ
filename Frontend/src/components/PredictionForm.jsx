import { useState } from "react";

const initialForm = {
  studytime: "",
  failures: "",
  absences: "",
  G1: "",
  G2: "",
  Medu: "",
  Fedu: "",
  higher: "yes",
  internet: "yes",
  schoolsup: "no",
  famsup: "yes",
};

const numericFields = [
  "studytime",
  "failures",
  "absences",
  "G1",
  "G2",
  "Medu",
  "Fedu",
];

function PredictionForm({ onPredict, loading }) {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasEmptyField = numericFields.some(
      (field) => formData[field] === ""
    );

    if (hasEmptyField) {
      setError("Please fill in all numeric fields.");
      return;
    }

    const convertedData = {
      ...formData,
      studytime: Number(formData.studytime),
      failures: Number(formData.failures),
      absences: Number(formData.absences),
      G1: Number(formData.G1),
      G2: Number(formData.G2),
      Medu: Number(formData.Medu),
      Fedu: Number(formData.Fedu),
    };

    if (
      convertedData.studytime < 1 ||
      convertedData.studytime > 4
    ) {
      setError("Study time must be between 1 and 4.");
      return;
    }

    if (
      convertedData.failures < 0 ||
      convertedData.failures > 3
    ) {
      setError("Previous failures must be between 0 and 3.");
      return;
    }

    if (convertedData.absences < 0) {
      setError("Absences cannot be negative.");
      return;
    }

    if (
      convertedData.G1 < 0 ||
      convertedData.G1 > 20 ||
      convertedData.G2 < 0 ||
      convertedData.G2 > 20
    ) {
      setError("G1 and G2 must be between 0 and 20.");
      return;
    }

    if (
      convertedData.Medu < 0 ||
      convertedData.Medu > 4 ||
      convertedData.Fedu < 0 ||
      convertedData.Fedu > 4
    ) {
      setError("Education values must be between 0 and 4.");
      return;
    }

    onPredict(convertedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Study Time */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Weekly Study Time
          </label>

          <p className="mb-2 text-xs text-slate-400">
            1: &lt;2 hrs · 2: 2–5 hrs · 3: 5–10 hrs · 4: &gt;10 hrs
          </p>

          <input
            type="number"
            name="studytime"
            min="1"
            max="4"
            value={formData.studytime}
            onChange={handleChange}
            placeholder="Enter 1–4"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#0a6b3a] focus:ring-1 focus:ring-[#0a6b3a]"
          />
        </div>

        {/* Previous Failures */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Previous Failures
          </label>

          <input
            type="number"
            name="failures"
            min="0"
            max="3"
            value={formData.failures}
            onChange={handleChange}
            placeholder="Enter 0–3"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#0a6b3a] focus:ring-1 focus:ring-[#0a6b3a]"
          />
        </div>

        {/* Absences */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Absences
          </label>

          <input
            type="number"
            name="absences"
            min="0"
            value={formData.absences}
            onChange={handleChange}
            placeholder="Enter number of absences"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#0a6b3a] focus:ring-1 focus:ring-[#0a6b3a]"
          />
        </div>

        {/* G1 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Previous Grade G1
          </label>

          <input
            type="number"
            name="G1"
            min="0"
            max="20"
            step="0.1"
            value={formData.G1}
            onChange={handleChange}
            placeholder="0–20"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#0a6b3a] focus:ring-1 focus:ring-[#0a6b3a]"
          />
        </div>

        {/* G2 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Previous Grade G2
          </label>

          <input
            type="number"
            name="G2"
            min="0"
            max="20"
            step="0.1"
            value={formData.G2}
            onChange={handleChange}
            placeholder="0–20"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#0a6b3a] focus:ring-1 focus:ring-[#0a6b3a]"
          />
        </div>

        {/* Mother Education */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Mother's Education
          </label>

          <p className="mb-2 text-xs text-slate-400">
            0: None · 1: Primary · 2: 5–9 years · 3: Secondary · 4: Higher
          </p>

          <input
            type="number"
            name="Medu"
            min="0"
            max="4"
            value={formData.Medu}
            onChange={handleChange}
            placeholder="0–4"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#0a6b3a] focus:ring-1 focus:ring-[#0a6b3a]"
          />
        </div>

        {/* Father Education */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Father's Education
          </label>

          <p className="mb-2 text-xs text-slate-400">
            0: None · 1: Primary · 2: 5–9 years · 3: Secondary · 4: Higher
          </p>

          <input
            type="number"
            name="Fedu"
            min="0"
            max="4"
            value={formData.Fedu}
            onChange={handleChange}
            placeholder="0–4"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#0a6b3a] focus:ring-1 focus:ring-[#0a6b3a]"
          />
        </div>

        {/* Higher Education */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Wants Higher Education?
          </label>

          <select
            name="higher"
            value={formData.higher}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-[#0a6b3a] focus:ring-1 focus:ring-[#0a6b3a]"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Internet */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Internet Access?
          </label>

          <select
            name="internet"
            value={formData.internet}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-[#0a6b3a] focus:ring-1 focus:ring-[#0a6b3a]"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* School Support */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            School Support?
          </label>

          <select
            name="schoolsup"
            value={formData.schoolsup}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-[#0a6b3a] focus:ring-1 focus:ring-[#0a6b3a]"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Family Support */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Family Support?
          </label>

          <select
            name="famsup"
            value={formData.famsup}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-[#0a6b3a] focus:ring-1 focus:ring-[#0a6b3a]"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#004f26] px-6 py-3 font-semibold text-white transition hover:bg-[#0a6b3a] hover:shadow-lg hover:shadow-[#004f26]/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Predicting..." : "Predict Performance"}
      </button>
    </form>
  );
}

export default PredictionForm;