import { SlashCommandBuilder } from "@discordjs/builders";

/**
 * Ping pong test
 * command: `/ping`
 */
export const Ping = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("⭐️ A simple ping pong test")
  .toJSON();
