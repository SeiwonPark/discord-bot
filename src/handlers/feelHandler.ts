// @ts-ignore
import aposToLexForm from "apos-to-lex-form";
// @ts-ignore
import SpellCorrector from "spelling-corrector";
import { WordTokenizer, SentimentAnalyzer, PorterStemmer } from "natural";
import { removeStopwords } from "stopword";
import { Client, Interaction, CommandInteraction } from "discord.js";
import { config } from "dotenv";
import fetch from "node-fetch";

config();
const GFYCAT_CLIENT_ID = process.env.GFYCAT_CLIENT_ID as string;
const GFYCAT_CLIENT_SECRET = process.env.GFYCAT_CLIENT_SECRET as string;
const FEELINGS = {
  positive: "happy",
  neutral: "blank stare",
  negative: "thoughful sympathetic hug",
};

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
  let search_text;
  Object.entries(FEELINGS).find(([key, value]) => {
    if (key == res) {
      search_text = value;
    }
  });

  // Get Gfycat authorization token
  const body = {
    grant_type: "client_credentials",
    client_id: GFYCAT_CLIENT_ID,
    client_secret: GFYCAT_CLIENT_SECRET,
  };
  const response = await (
    await fetch("https://api.gfycat.com/v1/oauth/token", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
  ).text();
  const token = JSON.parse(response).access_token;

  // Get Gfycat GIF image
  const query = new URLSearchParams({
    search_text: search_text || "blank stare",
  });

  const gfycatGif = await (
    await fetch(`https://api.gfycat.com/v1/stickers/search?${query}`, {
      method: "get",
      headers: { "Content-Type": "application/json", Token: token },
    })
  ).text();

  const gifURL = JSON.parse(gfycatGif).gfycats[0].max2mbGif;

  await interaction.followUp({
    files: [gifURL],
    ephemeral: true,
  });
};

const analyzeSentiment = async (text: string): Promise<string> => {
  if (!text.trim()) {
    return "neutral";
  }

  // Tokenize sentence
  const tokenizer = new WordTokenizer();
  const lexed = aposToLexForm(text)
    .toLowerCase()
    .replace(/[^a-zA-Z\s]+/g, "");
  const tokenized = tokenizer.tokenize(lexed);

  // Spell check
  const spellCorrector = new SpellCorrector();
  spellCorrector.loadDictionary();
  const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");
  const spellCorrected = tokenized.map((token: string) =>
    spellCorrector.correct(token)
  );

  // Remove stopwords
  const stopWordsRemoved = removeStopwords(spellCorrected);

  // Analyze sentiment
  const result = analyzer.getSentiment(stopWordsRemoved);
  if (result >= 1) {
    return "positive";
  } else if (result == 0) {
    return "neutral";
  } else {
    return "negative";
  }
};
