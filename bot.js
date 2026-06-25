const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let economia = {};

client.on("ready", () => {
  console.log(`🤖 Logado como ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  if (msg.content === "!ping") {
    msg.reply("🏓 Pong!");
  }

  if (msg.content === "!saldo") {
    let dinheiro = economia[msg.author.id] || 0;
    msg.reply(`💰 Seu saldo: ${dinheiro}`);
  }

  if (msg.content === "!trabalhar") {
    let ganho = Math.floor(Math.random() * 100);
    economia[msg.author.id] = (economia[msg.author.id] || 0) + ganho;
    msg.reply(`💸 Você ganhou ${ganho}`);
  }
});

client.login(process.env.TOKEN);