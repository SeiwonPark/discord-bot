import { Client } from "discord.js";
import ready from "./config";
import { config } from "dotenv";
import slashCommandHandler from "./handler/slash";

config();
const TOKEN = process.env.TOKEN;
console.log("Bot is starting...");

const client = new Client({
  intents: [],
});

ready(client);
slashCommandHandler(client);
client.login(TOKEN);
