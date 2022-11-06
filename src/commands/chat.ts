import {
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "@discordjs/builders";

/**
 * Chatbot
 * command: `/chat say: <Enter Text>`
 */
export const Chat = new SlashCommandBuilder()
  .setName("chat")
  .setDescription("⭐️ Chat bot")
  .addStringOption((option: SlashCommandStringOption) =>
    option.setName("say").setDescription("💬 say something").setRequired(true)
  )
  .toJSON();
