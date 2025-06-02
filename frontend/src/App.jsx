// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import MyTeamPage from "./pages/MyTeamPage";
import AvailableWrestlersPage from "./pages/AvailableWrestlersPage";
import StandingsPage from "./pages/StandingsPage";

function App() {
  const [teamName, setTeamName] = useState(localStorage.getItem("teamName") || "");

  useEffect(() => {
    const storedTeam = localStorage.getItem("teamName");
    if (!storedTeam) {
      // No team set yet, redirect to login
      window.location.pathname = "/";
    } else {
      setTeamName(storedTeam);
    }
  }, []);

  const handleLogin = (name) => {
    localStorage.setItem("teamName", name);
    setTeamName(name);
    window.location.pathname = "/my-team";
  };

  const handleLogout = () => {
    localStorage.removeItem("teamName");
    setTeamName("");
    window.location.pathname = "/";
  };

  return (
    <Router>
      {teamName && <NavBar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/my-team"
          element={teamName ? <MyTeamPage teamName={teamName} /> : <Navigate to="/" />}
        />
        <Route
          path="/available"
          element={teamName ? <AvailableWrestlersPage teamName={teamName} /> : <Navigate to="/" />}
        />
        <Route
          path="/standings"
          element={teamName ? <StandingsPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;