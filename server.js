const express = require("express");
const app = express();

const bot = require("./bot");

app.use(express.json());

app.post("/economia", (req, res) => {
  bot.ativarEconomia();
  res.send("Economia ativada!");
});

app.get("/", (req, res) => {
  res.send("Servidor do Aeternus funcionando!");
});

app.listen(3000, () => {
  console.log("🌐 Servidor online");
});