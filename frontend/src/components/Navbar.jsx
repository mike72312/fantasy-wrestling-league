import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/my-team">My Team</Link> | 
      <Link to="/available">Available Wrestlers</Link> | 
      <Link to="/standings">Standings</Link>
    </nav>
  );
}
