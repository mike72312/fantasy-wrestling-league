import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MyTeamPage from './pages/MyTeamPage';
import AvailableWrestlersPage from './pages/AvailableWrestlersPage';
import StandingsPage from './pages/StandingsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <ul className="flex gap-6 text-lg font-semibold">
            <li><Link to="/" className="hover:underline">My Team</Link></li>
            <li><Link to="/available" className="hover:underline">Available Wrestlers</Link></li>
            <li><Link to="/standings" className="hover:underline">Standings</Link></li>
          </ul>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<MyTeamPage />} />
            <Route path="/available" element={<AvailableWrestlersPage />} />
            <Route path="/standings" element={<StandingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;