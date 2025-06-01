const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let wrestlers = ["AJ Styles", "CM Punk", "Becky Lynch", "Sami Zayn", "Gunther"];
let teams = {
  mike: ["AJ Styles", "Becky Lynch"],
  jon: ["CM Punk"],
};

app.get('/api/available', (req, res) => {
  const drafted = new Set(Object.values(teams).flat().map(w => w.toLowerCase()));
  const available = wrestlers.filter(w => !drafted.has(w.toLowerCase()));
  res.json(available);
});

app.get('/api/team/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  res.json(teams[name] || []);
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
