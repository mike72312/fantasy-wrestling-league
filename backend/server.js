const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let data = {
  standings: [
    { manager: "Buddy", points: 85, team: ["Roman Reigns", "Becky Lynch"] },
    { manager: "Jon", points: 78, team: ["MJF", "Bianca Belair"] },
    { manager: "Sully", points: 66, team: ["Sami Zayn", "Kenny Omega"] }
  ],
  availableWrestlers: [
    "LA Knight", "Cody Rhodes", "Asuka", "Charlotte Flair", "Kevin Owens", "Solo Sikoa"
  ]
};

app.get("/api/standings", (req, res) => res.json(data.standings));

app.get("/api/draft", (req, res) => res.json(data.availableWrestlers));

app.post("/api/draft", (req, res) => {
  const { manager, wrestler } = req.body;
  const team = data.standings.find(entry => entry.manager === manager);
  if (team && !team.team.includes(wrestler) && data.availableWrestlers.includes(wrestler) && team.team.length < 8) {
    team.team.push(wrestler);
    data.availableWrestlers = data.availableWrestlers.filter(w => w !== wrestler);
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

app.post("/api/drop", (req, res) => {
  const { manager, wrestler } = req.body;
  const team = data.standings.find(entry => entry.manager === manager);
  if (team && team.team.includes(wrestler)) {
    team.team = team.team.filter(w => w !== wrestler);
    data.availableWrestlers.push(wrestler);
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));