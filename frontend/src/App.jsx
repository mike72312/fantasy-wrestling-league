
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const api = "http://localhost:4000";

const Login = ({ setUser }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (input.trim()) {
      setUser(input);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl mb-4 font-bold">Log in to Your League</h2>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-2 mb-4 rounded text-black"
        />
        <button onClick={handleLogin} className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 w-full">
          Login
        </button>
      </div>
    </div>
  );
};

const Home = () => (
  <div className="p-6 text-center text-white">
    <h2 className="text-3xl font-semibold">🏆 Welcome to the Fantasy Wrestling League</h2>
    <p className="mt-4 text-gray-300">Use the navigation bar to manage your team, view standings, or check all rosters.</p>
  </div>
);

const Draft = ({ user }) => {
  const [available, setAvailable] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch(api + "/api/draft").then(res => res.json()).then(setAvailable);
    fetch(api + "/api/teams").then(res => res.json()).then(data => {
      const match = data.find(t => t.manager === user);
      if (match) setTeam(match.roster);
    });
  }, [user]);

  const add = (wrestler) => {
    if (team.length >= 8) return;
    fetch(api + "/api/team/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, wrestler })
    }).then(res => res.json()).then(updated => {
      setTeam(updated.roster);
      setAvailable(prev => prev.filter(w => w !== wrestler));
    });
  };

  const drop = (wrestler) => {
    fetch(api + "/api/team/drop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, wrestler })
    }).then(res => res.json()).then(updated => {
      setTeam(updated.roster);
      setAvailable(prev => [...prev, wrestler]);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 text-white">
      <div className="bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Your Team ({team.length}/8)</h3>
        <ul className="space-y-2">
          {team.map((w, i) => (
            <li key={i} className="flex justify-between items-center bg-gray-700 p-2 rounded">
              {w}
              <button onClick={() => drop(w)} className="text-red-400 hover:underline">Drop</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Available Wrestlers</h3>
        <ul className="space-y-2">
          {available.map((w, i) => (
            <li key={i} className="flex justify-between items-center bg-gray-700 p-2 rounded">
              {w}
              <button onClick={() => add(w)} className="text-green-400 hover:underline">Add</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Standings = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(api + "/api/standings").then(res => res.json()).then(setData);
  }, []);
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">🏅 League Standings</h2>
      <ul className="space-y-2">
        {data.map((s, i) => (
          <li key={i} className="bg-gray-800 p-3 rounded">{s.manager}: {s.points} pts</li>
        ))}
      </ul>
    </div>
  );
};

const Rosters = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    fetch(api + "/api/teams").then(res => res.json()).then(setTeams);
  }, []);
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">📋 Team Rosters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((t, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{t.manager}</h3>
            <ul className="list-disc ml-5 space-y-1">
              {t.roster.map((w, j) => <li key={j}>{w}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState("");

  return (
    <div className="bg-gray-900 min-h-screen">
      <nav className="bg-gray-800 text-white px-6 py-4 flex gap-6 font-medium">
        <span className="font-bold text-xl text-yellow-400">Fantasy Wrestling</span>
        <Link to="/">Home</Link>
        <Link to="/draft">Draft</Link>
        <Link to="/standings">Standings</Link>
        <Link to="/rosters">Rosters</Link>
      </nav>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login setUser={setUser} />} />
        <Route path="/draft" element={user ? <Draft user={user} /> : <Login setUser={setUser} />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/rosters" element={<Rosters />} />
      </Routes>
    </div>
  );
};

export default App;
