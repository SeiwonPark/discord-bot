import { SlashCommandBuilder } from "@discordjs/builders";

export const Ping = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("ping pong test")
  .toJSON();
