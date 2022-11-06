import { CommandInteraction, Client, Interaction } from "discord.js";

/**
 * Ping Command Handler
 */
export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      if (interaction.commandName !== "ping") {
        return;
      }
      await handlePingCommand(client, interaction);
    }
  });
};

/**
 * Wrapper and Runner for Ping Command
 * @param client Discord client instance
 * @param interaction The message that your application receives when a user uses an application command or a message component
 */
const handlePingCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  await interaction.deferReply();
  await interaction.followUp({
    content: "᭼ ᭼ ᭼ ᭼ 💥🏓 pong!",
    ephemeral: true,
  });
};
