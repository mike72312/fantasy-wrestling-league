import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('teamName');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/my-team" className="hover:underline">My Team</Link>
        <Link to="/available" className="hover:underline">Available</Link>
        <Link to="/standings" className="hover:underline">Standings</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">
        Logout
      </button>
    </nav>
  );
}

export default NavBar;