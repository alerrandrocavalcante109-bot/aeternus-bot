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
let economia = JSON.parse(fs.readFileSync("./economia.json", "utf8"));

client.on("ready", () => {
  console.log(`🤖 Logado como ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.slice(prefix.length).trim().split(" ");
  const comando = args.shift().toLowerCase();

  if (comando === "saldo") {
    let dinheiro = economia[msg.author.id] || 0;
    msg.reply(`💰 Seu saldo: ${dinheiro}`);
  }

  if (comando === "trabalhar") {
    let ganho = Math.floor(Math.random() * 100);
    economia[msg.author.id] = (economia[msg.author.id] || 0) + ganho;

    fs.writeFileSync("./economia.json", JSON.stringify(economia, null, 2));

    msg.reply(`💸 Você ganhou ${ganho}`);
  }
});

client.login(process.env.TOKEN);
