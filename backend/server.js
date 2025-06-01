const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

let league = [
  { manager: "Buddy", points: 75, team: ["Roman Reigns", "Becky Lynch"] },
  { manager: "Jon", points: 68, team: ["Sami Zayn", "Bianca Belair"] },
  { manager: "Sully", points: 80, team: ["MJF", "Kenny Omega"] }
];

let draftPool = [
  "Gunther", "Rhea Ripley", "LA Knight", "Drew McIntyre",
  "Bayley", "Asuka", "Seth Rollins", "Charlotte Flair"
];

app.get("/api/standings", (req, res) => {
  res.json(league);
});

app.get("/api/draft", (req, res) => {
  res.json(draftPool);
});

app.post("/api/draft", (req, res) => {
  const { manager, wrestler } = req.body;
  const user = league.find(u => u.manager === manager);
  if (user && user.team.length < 8 && draftPool.includes(wrestler)) {
    user.team.push(wrestler);
    draftPool = draftPool.filter(w => w !== wrestler);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.post("/api/drop", (req, res) => {
  const { manager, wrestler } = req.body;
  const user = league.find(u => u.manager === manager);
  if (user && user.team.includes(wrestler)) {
    user.team = user.team.filter(w => w !== wrestler);
    draftPool.push(wrestler);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});