import { Link } from 'react-router-dom';

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem('teamName');
    window.location.reload();
  };

  return (
    <nav>
      <Link to="/my-team">My Team</Link>
      <Link to="/available">Available</Link>
      <Link to="/standings">Standings</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}