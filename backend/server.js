
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

let wrestlers = [
  { name: "AJ Styles", points: 10 },
  { name: "Becky Lynch", points: 15 },
  { name: "Gunther", points: 20 },
];

let teams = {
  Mike: ["AJ Styles", "Becky Lynch"],
  Buddy: ["Gunther"],
  Jon: [],
  Sully: []
};

app.get('/api/teams', (req, res) => {
  res.json(teams);
});

app.get('/api/team/:name', (req, res) => {
  const teamName = req.params.name;
  const team = teams[teamName] || [];
  res.json(team.map(name => wrestlers.find(w => w.name === name)));
});

app.get('/api/wrestlers', (req, res) => {
  const drafted = new Set(Object.values(teams).flat());
  const available = wrestlers.filter(w => !drafted.has(w.name));
  res.json(available);
});

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});
