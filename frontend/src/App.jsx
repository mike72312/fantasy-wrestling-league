import React, { useState, useEffect } from "react";

const App = () => {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [standings, setStandings] = useState([]);
  const [available, setAvailable] = useState([]);
  const [myTeam, setMyTeam] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      fetch("/api/standings").then(res => res.json()).then(data => {
        setStandings(data);
        const user = data.find(u => u.manager === username);
        setMyTeam(user ? user.team : []);
      });
      fetch("/api/draft").then(res => res.json()).then(setAvailable);
    }
  }, [loggedIn]);

  const addWrestler = async (wrestler) => {
    const res = await fetch("/api/draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ manager: username, wrestler })
    });
    if (res.ok) {
      setMyTeam(prev => [...prev, wrestler]);
      setAvailable(prev => prev.filter(w => w !== wrestler));
    }
  };

  const dropWrestler = async (wrestler) => {
    const res = await fetch("/api/drop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ manager: username, wrestler })
    });
    if (res.ok) {
      setMyTeam(prev => prev.filter(w => w !== wrestler));
      setAvailable(prev => [...prev, wrestler]);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Fantasy Wrestling League</h1>
      {!loggedIn ? (
        <>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter name" />
          <button onClick={() => setLoggedIn(true)}>Join League</button>
        </>
      ) : (
        <>
          <h2>Welcome, {username}!</h2>
          <h3>Your Team ({myTeam.length}/8)</h3>
          <ul>
            {myTeam.map(w => (
              <li key={w}>
                {w} <button onClick={() => dropWrestler(w)}>Drop</button>
              </li>
            ))}
          </ul>

          <h3>Add Wrestlers</h3>
          <ul>
            {available.map(w => (
              <li key={w}>
                {w} <button disabled={myTeam.length >= 8} onClick={() => addWrestler(w)}>Add</button>
              </li>
            ))}
          </ul>

          <h3>League Standings</h3>
          <ul>
            {standings.map(s => (
              <li key={s.manager}>{s.manager}: {s.points} pts</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;