import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ setTeamName }) => (
  <nav>
    <Link to='/'>My Team</Link>
    <Link to='/available'>Available</Link>
    <Link to='/standings'>Standings</Link>
    <button onClick={() => { localStorage.removeItem('teamName'); setTeamName(null); }}>Logout</button>
  </nav>
);

export default NavBar;