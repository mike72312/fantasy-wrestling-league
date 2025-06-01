import { Routes, Route, Link } from 'react-router-dom';
import MyTeamPage from './pages/MyTeamPage';
import AvailableWrestlersPage from './pages/AvailableWrestlersPage';
import StandingsPage from './pages/StandingsPage';

function App() {
  return (
    <div>
      <nav style={{ backgroundColor: '#333', padding: '1rem' }}>
        <Link to="/" style={{ color: '#fff', marginRight: '1rem' }}>My Team</Link>
        <Link to="/available" style={{ color: '#fff', marginRight: '1rem' }}>Available Wrestlers</Link>
        <Link to="/standings" style={{ color: '#fff' }}>Standings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MyTeamPage />} />
        <Route path="/available" element={<AvailableWrestlersPage />} />
        <Route path="/standings" element={<StandingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
