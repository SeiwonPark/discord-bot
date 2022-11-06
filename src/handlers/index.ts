import { Client } from "discord.js";
import pingCommandHandler from "./pingHandler";
import chatCommandHandler from "./chatHandler";
import memeCommandHandler from "./memeHandler";

export default (client: Client): void => {
  pingCommandHandler(client);
  chatCommandHandler(client);
  memeCommandHandler(client);
};
