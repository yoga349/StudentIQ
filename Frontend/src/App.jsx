import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import PredictionHistory from "./pages/PredictionHistory";

function Navbar() {
  const navClass = ({ isActive }) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-[#004f26] text-white shadow-lg shadow-[#004f26]/20"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <nav className="border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        <NavLink
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#004f26] font-bold text-white shadow-lg shadow-[#004f26]/20">
            S
          </div>

          <span className="text-lg font-bold text-white">
            Student<span className="text-[#0a9b55]">IQ</span>
          </span>
        </NavLink>

        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            end
            className={navClass}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/predict"
            className={navClass}
          >
            Predictor
          </NavLink>

          <NavLink
            to="/history"
            className={navClass}
          >
            History
          </NavLink>
        </div>

      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/predict"
            element={<Prediction />}
          />

          <Route
            path="/history"
            element={<PredictionHistory />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;