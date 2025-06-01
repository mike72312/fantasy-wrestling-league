
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MyTeamPage from "./pages/MyTeamPage";
import AvailableWrestlersPage from "./pages/AvailableWrestlersPage";
import StandingsPage from "./pages/StandingsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [teamName, setTeamName] = useState(localStorage.getItem("teamName"));

  if (!teamName) {
    return <LoginPage onLogin={(name) => {
      localStorage.setItem("teamName", name);
      setTeamName(name);
    }} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <nav className="bg-white shadow p-4 flex justify-between">
          <div className="font-bold">Fantasy Wrestling League</div>
          <div className="space-x-4">
            <Link to="/">My Team</Link>
            <Link to="/available">Available Wrestlers</Link>
            <Link to="/standings">Standings</Link>
            <button onClick={() => {
              localStorage.removeItem("teamName");
              window.location.reload();
            }}>Logout</button>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<MyTeamPage teamName={teamName} />} />
          <Route path="/available" element={<AvailableWrestlersPage teamName={teamName} />} />
          <Route path="/standings" element={<StandingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
