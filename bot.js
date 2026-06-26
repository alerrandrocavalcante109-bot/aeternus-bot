const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => {
  console.log(`🤖 Logado como ${client.user.tag}`);
});

// Todos os comandos/remessas de mensagens foram removidos conforme solicitado.

client.login(process.env.TOKEN);
