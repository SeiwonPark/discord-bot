/**
 * Meme creator
 */

import {
  SlashCommandBuilder,
  SlashCommandUserOption,
} from "@discordjs/builders";

/**
 * Blurred profile creator
 * command: `/blur <user>`
 */
export const Blur = new SlashCommandBuilder()
  .setName("blur")
  .setDescription("⭐️ Blur user's profile!")
  .addUserOption((option: SlashCommandUserOption) =>
    option.setName("user").setDescription("✅ Select user!").setRequired(true)
  )
  .toJSON();

/**
 * Pixelate profile creator
 * command: `/pixel <user>`
 */
export const Pixelate = new SlashCommandBuilder()
  .setName("pixel")
  .setDescription("⭐️ Pixelate user's profile!")
  .addUserOption((option: SlashCommandUserOption) =>
    option.setName("user").setDescription("✅ Select user!").setRequired(true)
  )
  .toJSON();
