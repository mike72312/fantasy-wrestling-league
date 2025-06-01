import React, { useState, useEffect } from 'react';

const scoringRules = {
  win: 5,
  loss: 0,
  "title win": 15,
  "title defense": 10,
  "title loss": -5,
  promo: 2,
  interference: 3,
  "heel turn": 10,
  "face turn": 10
};

export default function App() {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [standings, setStandings] = useState([]);
  const [events, setEvents] = useState([]);
  const [draftList, setDraftList] = useState([]);
  const [team, setTeam] = useState([]);
  const [results, setResults] = useState([]);
  const [teamScore, setTeamScore] = useState(0);

  useEffect(() => {
    if (loggedIn) {
      fetch('http://localhost:4000/api/standings').then(res => res.json()).then(setStandings);
      fetch('http://localhost:4000/api/events').then(res => res.json()).then(setEvents);
      fetch('http://localhost:4000/api/draft').then(res => res.json()).then(setDraftList);
      fetch('http://localhost:4000/api/results').then(res => res.json()).then(setResults);

      fetch(`http://localhost:4000/api/team/${username}`)
        .then(res => res.json())
        .then(setTeam)
        .catch(() => setTeam([]));
    }
  }, [loggedIn]);

  useEffect(() => {
    let total = 0;
    team.forEach(w => {
      const res = results.find(r => r.wrestler === w);
      if (res) {
        res.actions.forEach(a => total += scoringRules[a] || 0);
      }
    });
    setTeamScore(total);
  }, [team, results]);

  const saveTeam = (newTeam) => {
    fetch(`http://localhost:4000/api/team/${username}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ team: newTeam })
    });
  };

  const handleDraft = (wrestler) => {
    if (!team.includes(wrestler)) {
      const newTeam = [...team, wrestler];
      setTeam(newTeam);
      saveTeam(newTeam);
      setDraftList(draftList.filter(w => w !== wrestler));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Fantasy Wrestling League</h1>
      {!loggedIn ? (
        <>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <button onClick={() => setLoggedIn(true)}>Join League</button>
        </>
      ) : (
        <>
          <h2>Welcome, {username}</h2>
          <h3>Your Team Score: {teamScore} pts</h3>

          <div>
            <h4>Your Team</h4>
            <ul>
              {team.map((w, i) => (
                <li key={i}>
                  {w} — {
                    (results.find(r => r.wrestler === w)?.actions.reduce((sum, a) => sum + (scoringRules[a] || 0), 0)) || 0
                  } pts
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Draft Board</h4>
            {draftList.map((w, i) => (
              <button key={i} onClick={() => handleDraft(w)}>Draft {w}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
