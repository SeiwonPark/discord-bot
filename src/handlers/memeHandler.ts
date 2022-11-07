import { Client, Interaction, CommandInteraction } from "discord.js";
import jimp from "jimp";

const MEME_COMMANDS = {
  blur: {
    key: "blur",
    execute: async function (client: Client, interaction: CommandInteraction) {
      await handleBlurCommand(client, interaction);
    },
  },
  pixel: {
    key: "pixel",
    execute: async function (client: Client, interaction: CommandInteraction) {
      await handlePixelateCommand(client, interaction);
    },
  },
};

/**
 * Meme Command Handlers
 */
export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (
      interaction.isChatInputCommand() ||
      interaction.isContextMenuCommand()
    ) {
      if (!Object.keys(MEME_COMMANDS).includes(interaction.commandName)) {
        return;
      }

      Object.entries(MEME_COMMANDS).find(([key, value]) => {
        if (key === interaction.commandName) {
          return value.execute(client, interaction);
        }
      });
    }
  });
};

/**
 * Wrapper and Runner for `/blur` Command
 * @param client Discord client instance
 * @param interaction The message that your application receives when a user uses an application command or a message component
 */
const handleBlurCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  await interaction.deferReply();

  const targetUser = interaction.options.get("user")?.user;

  let rawUserURL = targetUser!.displayAvatarURL();
  if (rawUserURL.includes(".webp")) {
    rawUserURL = rawUserURL.slice(0, rawUserURL.lastIndexOf(".")) + ".png";
  }
  const avatar = await jimp.read(rawUserURL);
  avatar.blur(5);
  const result = "result.png";
  await avatar.writeAsync(result);

  await interaction.followUp({
    files: [result],
    ephemeral: true,
  });
};

/**
 * Wrapper and Runner for `/pixel` Command
 * @param client Discord client instance
 * @param interaction The message that your application receives when a user uses an application command or a message component
 */
const handlePixelateCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  await interaction.deferReply();

  const targetUser = interaction.options.get("user")?.user;

  let rawUserURL = targetUser!.displayAvatarURL();
  if (rawUserURL.includes(".webp")) {
    rawUserURL = rawUserURL.slice(0, rawUserURL.lastIndexOf(".")) + ".png";
  }
  const avatar = await jimp.read(rawUserURL);
  avatar.pixelate(10);
  const result = "result.png";
  await avatar.writeAsync(result);

  await interaction.followUp({
    files: [result],
    ephemeral: true,
  });
};
