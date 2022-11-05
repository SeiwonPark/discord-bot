import { SlashCommandBuilder } from "@discordjs/builders";

/**
 * Ping pong test
 * command: `/ping`
 */
export const Ping = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("ping pong test")
  .toJSON();
