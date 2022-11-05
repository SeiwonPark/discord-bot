import {
  CommandInteraction,
  Client,
  ChatInputApplicationCommandData,
} from "discord.js";

/**
 * Simple Slash Command
 */
export interface SlashCommand extends ChatInputApplicationCommandData {
  name: string;
  run: (client: Client, interaction: CommandInteraction) => void;
  cooldown?: number;
}
