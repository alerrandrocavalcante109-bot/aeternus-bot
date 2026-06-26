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
let almas = {};

try {
  if (fs.existsSync("./economia.json")) {
    const raw = fs.readFileSync("./economia.json", "utf8");
    almas = JSON.parse(raw || "{}");
  } else {
    // cria o arquivo se não existir
    fs.writeFileSync("./economia.json", JSON.stringify(almas, null, 2));
  }
} catch (err) {
  console.error("Erro ao ler/gravar economia.json:", err);
}

// cooldowns (em ms)
const WORK_COOLDOWN = 5 * 60 * 1000; // 5 minutos
let lastWork = {};

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
    let dinheiro = almas[msg.author.id] || 0;
    msg.reply(`💰 Seu saldo: ${dinheiro}`);
  }

  // Comando A.work (antigo A.trabalhar) com cooldown
  if (comando === "work") {
    const now = Date.now();
    const last = lastWork[msg.author.id] || 0;
    const diff = now - last;

    if (diff < WORK_COOLDOWN) {
      const msLeft = WORK_COOLDOWN - diff;
      const minutes = Math.floor(msLeft / 60000);
      const seconds = Math.floor((msLeft % 60000) / 1000);
      const timeStr = `${minutes}m ${seconds}s`;
      msg.reply(`⏳ Você já trabalhou recentemente. Aguarde ${timeStr} antes de usar A.work novamente.`);
      return;
    }

    let ganho = Math.floor(Math.random() * 100);
    almas[msg.author.id] = (almas[msg.author.id] || 0) + ganho;
    lastWork[msg.author.id] = now;

    try {
      fs.writeFileSync("./economia.json", JSON.stringify(almas, null, 2));
    } catch (err) {
      console.error("Erro ao salvar economia.json:", err);
    }

    msg.reply(`💸 Você ganhou ${ganho}`);
  }
});

client.login(process.env.TOKEN);
