const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

let teams = [
  { name: "Mike", wrestlers: ["Sami Zayn", "Gunther", "Becky Lynch"] },
  { name: "Buddy", wrestlers: ["Finn Bálor", "AJ Styles", "Bayley"] }
];

let wrestlers = ["Sami Zayn", "Gunther", "Becky Lynch", "Finn Bálor", "AJ Styles", "Bayley", "Iyo Sky", "Rhea Ripley", "Rey Mysterio"];

app.get('/api/teams', (req, res) => {
  res.json(teams);
});

app.get('/api/wrestlers', (req, res) => {
  const picked = new Set(teams.flatMap(t => t.wrestlers.map(w => w.toLowerCase())));
  const available = wrestlers.filter(w => !picked.has(w.toLowerCase()));
  res.json(available);
});

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});
