import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RosterPage from './pages/RosterPage';
import AvailablePage from './pages/AvailablePage';
import StandingsPage from './pages/StandingsPage';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-team" element={<RosterPage />} />
        <Route path="/available" element={<AvailablePage />} />
        <Route path="/standings" element={<StandingsPage />} />
      </Routes>
    </Router>
  );
}
