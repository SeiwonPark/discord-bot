import { Client, Interaction, CommandInteraction } from "discord.js";
import cleverbot from "cleverbot-free";

/**
 * Chat Command Handler
 */
export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (
      interaction.isChatInputCommand() ||
      interaction.isContextMenuCommand()
    ) {
      if (interaction.commandName !== "chat") {
        return;
      }
      await handleChatCommand(client, interaction);
    }
  });
};

/**
 * Wrapper and Runner for Chat Command
 * @param client Discord client instance
 * @param interaction The message that your application receives when a user uses an application command or a message component
 */
const handleChatCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  await interaction.deferReply();
  const say = interaction.options.get("say")?.value as string;
  const res = await cleverbot(say);
  await interaction.followUp({
    content: res,
    ephemeral: true,
  });
};
