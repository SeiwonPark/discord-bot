import { Client } from "discord.js";
import ready from "./ready";
import { config } from "dotenv";

config();
const TOKEN = process.env.TOKEN;
console.log("Bot is starting...");

const client = new Client({
  intents: [],
});

ready(client);
client.login(TOKEN);
