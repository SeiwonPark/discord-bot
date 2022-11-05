import { CommandInteraction, Client } from "discord.js";
import { SlashCommand } from "src/interfaces";

export const Ping: SlashCommand = {
  name: "ping",
  description: "Returns a 'pong' ",
  type: 1,
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = "᭼ ᭼ ᭼ ᭼ 💥🏓 pong!";

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
  cooldown: 10,
};
