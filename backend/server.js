
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let data = JSON.parse(fs.readFileSync("data.json", "utf8"));

app.get("/api/standings", (req, res) => {
  res.json(data.standings);
});

app.get("/api/events", (req, res) => {
  res.json(data.events);
});

app.get("/api/draft", (req, res) => {
  res.json(data.availableWrestlers);
});

app.get("/api/teams", (req, res) => {
  res.json(data.teams);
});

app.post("/api/team/add", (req, res) => {
  const { username, wrestler } = req.body;
  const team = data.teams.find(t => t.manager === username);
  if (team && team.roster.length < 8 && data.availableWrestlers.includes(wrestler)) {
    team.roster.push(wrestler);
    data.availableWrestlers = data.availableWrestlers.filter(w => w !== wrestler);
  }
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json(team);
});

app.post("/api/team/drop", (req, res) => {
  const { username, wrestler } = req.body;
  const team = data.teams.find(t => t.manager === username);
  if (team && team.roster.includes(wrestler)) {
    team.roster = team.roster.filter(w => w !== wrestler);
    data.availableWrestlers.push(wrestler);
  }
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json(team);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
