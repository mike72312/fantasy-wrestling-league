
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MyTeamPage from './pages/MyTeamPage';
import AvailableWrestlersPage from './pages/AvailableWrestlersPage';
import StandingsPage from './pages/StandingsPage';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <Link to="/" style={{ margin: '0 1rem' }}>My Team</Link>
        <Link to="/available" style={{ margin: '0 1rem' }}>Available Wrestlers</Link>
        <Link to="/standings" style={{ margin: '0 1rem' }}>Standings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MyTeamPage />} />
        <Route path="/available" element={<AvailableWrestlersPage />} />
        <Route path="/standings" element={<StandingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
