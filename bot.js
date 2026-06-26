const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = "A.";

// carregar dados
let economia = {};

try {
  if (fs.existsSync("./economia.json")) {
    const raw = fs.readFileSync("./economia.json", "utf8");
    economia = JSON.parse(raw || "{}");
  } else {
    // cria o arquivo se não existir
    fs.writeFileSync("./economia.json", JSON.stringify(economia, null, 2));
  }
} catch (err) {
  console.error("Erro ao ler/gravar economia.json:", err);
}

client.on("ready", () => {
  console.log(`🤖 Logado como ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.slice(prefix.length).trim().split(/\s+/);
  const comando = args.shift().toLowerCase();

  // Comando A.atm (antigo A.saldo)
  if (comando === "atm") {
    let dinheiro = economia[msg.author.id] || 0;
    msg.reply(`💰 Seu saldo: ${dinheiro}`);
  }

  // Comando A.work (antigo A.trabalhar)
  if (comando === "work") {
    let ganho = Math.floor(Math.random() * 100);
    economia[msg.author.id] = (economia[msg.author.id] || 0) + ganho;

    try {
      fs.writeFileSync("./economia.json", JSON.stringify(economia, null, 2));
    } catch (err) {
      console.error("Erro ao salvar economia.json:", err);
    }

    msg.reply(`💸 Você ganhou ${ganho}`);
  }
});

client.login(process.env.TOKEN);
