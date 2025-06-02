import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MyTeamPage from './pages/MyTeamPage';
import AvailablePage from './pages/AvailablePage';
import StandingsPage from './pages/StandingsPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';

function App() {
  const [teamName, setTeamName] = useState(localStorage.getItem('teamName'));

  useEffect(() => {
    const stored = localStorage.getItem('teamName');
    if (!stored) {
      setTeamName(null);
    }
  }, []);

  return (
    <Router>
      {teamName ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/my-team" />} />
            <Route path="/my-team" element={<MyTeamPage teamName={teamName} />} />
            <Route path="/available" element={<AvailablePage teamName={teamName} />} />
            <Route path="/standings" element={<StandingsPage />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="*" element={<LoginPage onLogin={(name) => {
            localStorage.setItem('teamName', name.toLowerCase());
            setTeamName(name.toLowerCase());
          }} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;