import { CommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../commands";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
};

/**
 * Wrapper and Runner for Slash Command
 * @param client Discord client instance
 * @param interaction The message that your application receives when a user uses an application command or a message component
 */
const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find(
    (cmd) => cmd.name === interaction.commandName
  );
  if (!slashCommand) {
    interaction.followUp({ content: "An error has occurred" });
    return;
  }

  await interaction.deferReply();
  slashCommand.run(client, interaction);
};
