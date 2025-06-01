import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MyTeamPage from "./pages/MyTeamPage";
import LoginPage from "./pages/LoginPage";
import AvailablePage from "./pages/AvailablePage";
import StandingsPage from "./pages/StandingsPage";

function ProtectedRoute({ children }) {
  const teamName = localStorage.getItem("teamName");
  return teamName ? children : <Navigate to="/login" />;
}

function NavBar() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    setTeamName(localStorage.getItem("teamName") || "");
  }, []);

  const logout = () => {
    localStorage.removeItem("teamName");
    navigate("/login");
  };

  if (!teamName) return null;

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex space-x-4">
        <button onClick={() => navigate("/my-team")}>My Team</button>
        <button onClick={() => navigate("/available")}>Available Wrestlers</button>
        <button onClick={() => navigate("/standings")}>Standings</button>
      </div>
      <button onClick={logout} className="hover:underline">
        Log Out
      </button>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-team" element={<ProtectedRoute><MyTeamPage /></ProtectedRoute>} />
        <Route path="/available" element={<ProtectedRoute><AvailablePage /></ProtectedRoute>} />
        <Route path="/standings" element={<ProtectedRoute><StandingsPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
