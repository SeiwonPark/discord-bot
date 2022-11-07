import {
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "@discordjs/builders";

/**
 * Sentimental analyzer
 * command: `/feel say: <Enter Text>`
 */
export const Feel = new SlashCommandBuilder()
  .setName("feel")
  .setDescription("⭐️ Sentimental analyzer")
  .addStringOption((option: SlashCommandStringOption) =>
    option.setName("say").setDescription("💬 say something").setRequired(true)
  )
  .toJSON();
