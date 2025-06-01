const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const standings = [
  { manager: "Alex", points: 85 },
  { manager: "Jordan", points: 78 },
  { manager: "Taylor", points: 66 }
];

const events = [
  "AEW Dynamite - Wednesday",
  "WWE SmackDown - Friday",
  "WWE Raw - Monday"
];

const draftableWrestlers = [
  "Roman Reigns",
  "Kenny Omega",
  "Bianca Belair",
  "MJF",
  "Becky Lynch",
  "Sami Zayn"
];

const results = [
  {
    wrestler: "Roman Reigns",
    actions: ["win", "promo", "title defense"]
  },
  {
    wrestler: "MJF",
    actions: ["loss", "promo"]
  },
  {
    wrestler: "Bianca Belair",
    actions: ["win", "title win", "heel turn"]
  },
  {
    wrestler: "Becky Lynch",
    actions: ["promo"]
  },
  {
    wrestler: "Sami Zayn",
    actions: ["loss"]
  }
];

const userTeams = {}; // store user teams in memory

app.get("/api/standings", (req, res) => res.json(standings));
app.get("/api/events", (req, res) => res.json(events));
app.get("/api/draft", (req, res) => res.json(draftableWrestlers));
app.get("/api/results", (req, res) => res.json(results));

app.get("/api/team/:username", (req, res) => {
  const name = req.params.username.toLowerCase();
  res.json(userTeams[name] || []);
});

app.post("/api/team/:username", (req, res) => {
  const name = req.params.username.toLowerCase();
  const team = req.body.team;
  if (Array.isArray(team)) {
    userTeams[name] = team;
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Invalid team data" });
  }
});

app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
});
