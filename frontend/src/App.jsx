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

  const container = {
    fontFamily: "Arial, sans-serif",
    padding: "40px",
    backgroundColor: "#f4f4f8",
    minHeight: "100vh",
    color: "#333",
  };

  const card = {
    backgroundColor: "#fff",
    padding: "24px",
    marginBottom: "24px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };

  const button = {
    padding: "6px 12px",
    marginLeft: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  };

  const heading = {
    marginBottom: "16px",
    color: "#222"
  };

  return (
    <div style={container}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#111" }}>Fantasy Wrestling League</h1>
      {!loggedIn ? (
        <div style={card}>
          <h2 style={heading}>Login</h2>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your name" style={{ padding: "8px", width: "60%" }} />
          <button style={button} onClick={() => setLoggedIn(true)}>Join</button>
        </div>
      ) : (
        <>
          <div style={card}>
            <h2 style={heading}>Welcome, {username}</h2>
          </div>

          <div style={card}>
            <h3 style={heading}>Your Team ({myTeam.length}/8)</h3>
            <ul>
              {myTeam.map(w => (
                <li key={w}>
                  {w} <button style={{ ...button, backgroundColor: "#dc3545" }} onClick={() => dropWrestler(w)}>Drop</button>
                </li>
              ))}
            </ul>
          </div>

          <div style={card}>
            <h3 style={heading}>Available Wrestlers</h3>
            <ul>
              {available.map(w => (
                <li key={w}>
                  {w} <button disabled={myTeam.length >= 8} style={button} onClick={() => addWrestler(w)}>Add</button>
                </li>
              ))}
            </ul>
          </div>

          <div style={card}>
            <h3 style={heading}>League Standings</h3>
            <ul>
              {standings.map(s => (
                <li key={s.manager}>
                  <strong>{s.manager}</strong>: {s.points} pts
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default App;