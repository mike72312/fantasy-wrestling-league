import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MyTeamPage from './pages/MyTeamPage';
import AvailablePage from './pages/AvailablePage';
import StandingsPage from './pages/StandingsPage';
import NavBar from './components/NavBar';

const App = () => {
  const [teamName, setTeamName] = React.useState(localStorage.getItem('teamName'));

  if (!teamName) return <LoginPage setTeamName={setTeamName} />;

  return (
    <Router>
      <NavBar setTeamName={setTeamName} />
      <Routes>
        <Route path='/' element={<MyTeamPage teamName={teamName} />} />
        <Route path='/available' element={<AvailablePage teamName={teamName} />} />
        <Route path='/standings' element={<StandingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;