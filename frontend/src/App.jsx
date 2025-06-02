import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MyTeamPage from './pages/MyTeamPage';
import AvailableWrestlersPage from './pages/AvailableWrestlersPage';
import StandingsPage from './pages/StandingsPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';

function App() {
  const teamName = localStorage.getItem('teamName');

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={teamName ? <Navigate to="/my-team" /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-team" element={<MyTeamPage />} />
        <Route path="/available" element={<AvailableWrestlersPage />} />
        <Route path="/standings" element={<StandingsPage />} />
      </Routes>
    </div>
  );
}

export default App;