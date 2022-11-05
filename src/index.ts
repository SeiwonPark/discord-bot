import { Client, REST, Routes, GatewayIntentBits } from "discord.js";
import ready from "./configs";
import { config } from "dotenv";
import pingCommandHandler from "./handlers/pingHandler";
import chatCommandHandler from "./handlers/chatHandler";
import { Chat } from "./commands/chat";
import { Ping } from "./commands/ping";

config();
const TOKEN = process.env.TOKEN || "";
const CLIENT_ID = process.env.CLIENT_ID || "";
const GUILD_ID = process.env.GUILD_ID || "";

console.log("Bot is starting...");

const rest = new REST({ version: "10" }).setToken(TOKEN);

const client = new Client({
  intents: [
    // GatewayIntentBits.Guilds,
    // GatewayIntentBits.GuildMessages,
    // GatewayIntentBits.MessageContent,
  ],
});

ready(client);
pingCommandHandler(client);
chatCommandHandler(client);

async function init() {
  const commands = [Ping, Chat];
  try {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    client.login(TOKEN);
  } catch (err) {
    console.log(err);
  }
}

init();
``