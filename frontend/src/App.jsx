
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MyTeamPage from './pages/MyTeamPage';
import AvailableWrestlersPage from './pages/AvailableWrestlersPage';
import StandingsPage from './pages/StandingsPage';

function App() {
  const [teamName, setTeamName] = useState(localStorage.getItem('teamName') || '');

  useEffect(() => {
    if (teamName) {
      localStorage.setItem('teamName', teamName);
    }
  }, [teamName]);

  if (!teamName) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Enter Your Team Name</h2>
        <input
          type="text"
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="e.g. Mike"
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
      </div>
    );
  }

  return (
    <div>
      <nav style={{ backgroundColor: '#333', padding: '1rem' }}>
        <Link to="/" style={{ color: '#fff', marginRight: '1rem' }}>My Team</Link>
        <Link to="/available" style={{ color: '#fff', marginRight: '1rem' }}>Available Wrestlers</Link>
        <Link to="/standings" style={{ color: '#fff' }}>Standings</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<MyTeamPage teamName={teamName} />} />
          <Route path="/available" element={<AvailableWrestlersPage teamName={teamName} />} />
          <Route path="/standings" element={<StandingsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
