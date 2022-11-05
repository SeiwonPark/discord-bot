import {
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "@discordjs/builders";

export const Chat = new SlashCommandBuilder()
  .setName("chat")
  .setDescription("chat bot")
  .addStringOption((option: SlashCommandStringOption) =>
    option.setName("say").setDescription("say something").setRequired(true)
  )
  .toJSON();
