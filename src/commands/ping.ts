import { CommandInteraction, Client } from "discord.js";
import { SlashCommand } from "src/interfaces";

export const Ping: SlashCommand = {
  name: "ping",
  description: "Returns a 'pong'",
  /**
   * CommandInteraction types
   *
   * 1: Ping,
   * 2: ApplicationCommand,
   * 3: MessageComponent,
   * 4: ApplicationCommandAutocomplete,
   * 5: ModalSubmit
   */
  type: 1,
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = "᭼ ᭼ ᭼ ᭼ 💥🏓 pong!";
    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
  cooldown: 5, // expiration time(unit: seconds)
};
