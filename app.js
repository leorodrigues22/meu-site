const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const FILE = "agendamentos.json";

app.post("/agendar", (req, res) => {
  const novo = req.body;
  let dados = [];

  if (fs.existsSync(FILE)) {
    dados = JSON.parse(fs.readFileSync(FILE));
  }

  const jaExiste = dados.find(a => a.data === novo.data);
  if (jaExiste) {
    return res.json({ status: "erro", msg: "Essa data já está ocupada" });
  }

  dados.push(novo);
  fs.writeFileSync(FILE, JSON.stringify(dados, null, 2));

  res.json({ status: "ok" });
});

app.get("/agendamentos", (req, res) => {
  if (fs.existsSync(FILE)) {
    res.json(JSON.parse(fs.readFileSync(FILE)));
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
