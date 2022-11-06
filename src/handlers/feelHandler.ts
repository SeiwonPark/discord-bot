// @ts-ignore
import aposToLexForm from "apos-to-lex-form";
// @ts-ignore
import SpellCorrector from "spelling-corrector";
import { WordTokenizer, SentimentAnalyzer, PorterStemmer } from "natural";
import { removeStopwords } from "stopword";
import { Client, Interaction, CommandInteraction } from "discord.js";

/**
 * Feel Command Handler
 */
export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (
      interaction.isChatInputCommand() ||
      interaction.isContextMenuCommand()
    ) {
      if (interaction.commandName !== "feel") {
        return;
      }
      await handleFeelCommand(client, interaction);
    }
  });
};

/**
 * Wrapper and Runner for Feel Command
 * @param client Discord client instance
 * @param interaction The message that your application receives when a user uses an application command or a message component
 */
const handleFeelCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  await interaction.deferReply();
  const say = interaction.options.get("say")?.value as string;
  const res = await analyzeSentiment(say);
  await interaction.followUp({
    content: res,
    ephemeral: true,
  });
};

const analyzeSentiment = async (str: string): Promise<string> => {
  if (!str.trim()) {
    return "blank";
  }

  // Tokenize sentence
  const tokenizer = new WordTokenizer();
  const lexed = aposToLexForm(str)
    .toLowerCase()
    .replace(/[^a-zA-Z\s]+/g, "");
  const tokenized = tokenizer.tokenize(lexed);

  // Spell check
  const spellCorrector = new SpellCorrector();
  spellCorrector.loadDictionary();
  const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");
  const fixedSpelling = tokenized.map((word) => spellCorrector.correct(word));

  // Remove stopwords
  const stopWordsRemoved = removeStopwords(fixedSpelling);

  // Analyze sentiment
  const analyzed = await analyzer.getSentiment(stopWordsRemoved);
  if (analyzed >= 1) {
    return "happy";
  } else if (analyzed === 0) {
    return "blank";
  } else {
    return "sad";
  }
};
